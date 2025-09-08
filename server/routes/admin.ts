import { RequestHandler } from "express";
import { ApiList, Client, Job, Order } from "@shared/api";
import { db } from "../data/store.js";

export const listClients: RequestHandler = (_req, res) => {
  const payload: ApiList<Client> = { items: db.clients };
  res.json(payload);
};

export const listJobs: RequestHandler = (_req, res) => {
  const payload: ApiList<Job> = { items: db.jobs };
  res.json(payload);
};

export const listOrders: RequestHandler = (_req, res) => {
  const payload: ApiList<Order> = { items: db.orders };
  res.json(payload);
};
