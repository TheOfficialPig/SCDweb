import { RequestHandler } from "express";
import { ApiList, Product } from "@shared/api";
import { db } from "../data/store.js";

export const listProducts: RequestHandler = (_req, res) => {
  const active = db.products.filter((p) => p.active);
  const payload: ApiList<Product> = { items: active };
  res.json(payload);
};
