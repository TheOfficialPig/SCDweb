import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { createQuote, pingQuote } from "./routes/quote.js";
import { createOrder } from "./routes/orders.js";
import { listClients, listJobs, listOrders } from "./routes/admin.js";
import { importAuthRoutes } from "./routes/_auth_loader.js";

export function createServer() {
  const app = express();

  // Safety: wrap route registration methods to prevent crashes from malformed paths
  const methodsToWrap = ["get", "post", "put", "delete", "patch", "use", "all"] as const;
  for (const m of methodsToWrap) {
    const orig = (app as any)[m].bind(app);
    (app as any)[m] = function (path: any, ...handlers: any[]) {
      try {
        // validate path type
        if (typeof path === "string") {
          // reject bare absolute URLs
          if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith(":/")) {
            console.error("Skipping unsafe route registration:", path);
            return app;
          }
        }
        return orig(path, ...handlers);
      } catch (err) {
        console.error("Route registration failed for", path, err && err.stack ? err.stack : err);
        return app;
      }
    };
  }

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health / demo
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app.get("/api/demo", handleDemo);

  // Public APIs
  app.post("/api/quote", createQuote);
  app.get("/api/quote/ping", pingQuote);

  // Auth
  importAuthRoutes(app);

  // Checkout
  app.post("/api/orders", createOrder);

  // Staff admin APIs
  app.get("/api/admin/clients", listClients);
  app.get("/api/admin/jobs", listJobs);
  app.get("/api/admin/orders", listOrders);

  return app;
}
