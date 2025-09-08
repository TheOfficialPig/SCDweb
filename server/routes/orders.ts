import { RequestHandler } from "express";
import { ApiOk, Order, OrderItem, PaymentStatus } from "@shared/api";
import { db } from "../data/store.js";

function calcOrder(items: OrderItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

export const createOrder: RequestHandler = (req, res) => {
  const { items, clientId, provider } = req.body as {
    items: OrderItem[];
    clientId?: string | null;
    provider?: string;
  };
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "No items in order" });
  }
  const { subtotal, tax, total } = calcOrder(items);
  const order: Order = {
    id: `order_${Math.random().toString(36).slice(2, 10)}`,
    clientId: clientId ?? null,
    items,
    subtotal,
    tax,
    total,
    status: (provider ? "paid" : "unpaid") as PaymentStatus,
    provider: (provider ?? "manual") as any,
    createdAt: new Date().toISOString(),
  };
  db.orders.push(order);
  const ok: ApiOk = { ok: true };
  res.status(201).json({ ...ok, order });
};
