import serverless from "serverless-http";

let handler: any = null;

async function ensureHandler() {
  if (handler) return handler;
  const mod = await import("../dist/server/node-build.mjs");
  // The built bundle may export createServer as a named export, default export, or just execute on import.
  const createServer = mod.createServer || (mod.default && (mod.default.createServer || (typeof mod.default === "function" ? mod.default : undefined)));
  if (!createServer) {
    throw new Error("Built server bundle does not export a createServer function");
  }
  handler = serverless(createServer());
  return handler;
}

export default async function (req: any, res: any) {
  const h = await ensureHandler();
  return h(req, res);
}
