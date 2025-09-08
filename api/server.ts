import serverless from "serverless-http";

let handler: any = null;

function isExpressApp(obj: any) {
  return obj && typeof obj.use === "function" && typeof obj.get === "function";
}

async function ensureHandler() {
  if (handler) return handler;
  const mod = await import("../dist/server/node-build.mjs");

  // Possible shapes:
  // - export function createServer() { return app }
  // - export default function createServer() { return app }
  // - export default app (Express instance)
  // - export const app = express();

  let createServer: any = undefined;

  if (typeof mod.createServer === "function") {
    createServer = mod.createServer;
  } else if (mod.default) {
    if (typeof mod.default === "function") {
      // default might be a factory that returns app
      createServer = mod.default;
    } else if (isExpressApp(mod.default)) {
      createServer = () => mod.default;
    }
  } else if (isExpressApp(mod.app)) {
    createServer = () => mod.app;
  }

  if (!createServer) {
    // attach module keys for debugging
    const keys = Object.keys(mod).join(",");
    throw new Error(
      `Built server bundle does not export a createServer function. Available exports: ${keys}`,
    );
  }

  const app = await createServer();
  handler = serverless(app);
  return handler;
}

export default async function (req: any, res: any) {
  const h = await ensureHandler();
  return h(req, res);
}
