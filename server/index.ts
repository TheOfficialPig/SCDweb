import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { listProducts } from "./routes/products";
import { createQuote, pingQuote } from "./routes/quote";
import { createOrder } from "./routes/orders";
import { listClients, listJobs, listOrders } from "./routes/admin";

export function createServer() {
  const app = express();

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
  app.get("/api/products", listProducts);
  app.post("/api/quote", createQuote);
  app.get("/api/quote/ping", pingQuote);

  // Checkout
  app.post("/api/orders", createOrder);

  // Staff admin APIs
  app.get("/api/admin/clients", listClients);
  app.get("/api/admin/jobs", listJobs);
  app.get("/api/admin/orders", listOrders);

  return app;
}
