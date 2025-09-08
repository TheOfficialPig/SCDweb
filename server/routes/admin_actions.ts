import { RequestHandler } from "express";
import { db, createClient, createJob } from "../data/store.js";
import { Invoice, Staff } from "@shared/api";
import crypto from "crypto";

function hash(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

export const createStaff: RequestHandler = (req, res) => {
  const { name, email, role, password } = req.body as {
    name: string;
    email: string;
    role?: string;
    password?: string;
  };
  if (!name || !email)
    return res.status(400).json({ error: "name and email required" });
  const emailLower = email.toLowerCase();
  if (!emailLower.endsWith("@gmail.com"))
    return res.status(400).json({ error: "Staff must use Gmail address" });
  if (db.staff.find((s) => s.email.toLowerCase() === emailLower))
    return res.status(400).json({ error: "Staff already exists" });
  const staff: Staff & { passwordHash?: string } = {
    id: `staff_${Math.random().toString(36).slice(2, 9)}`,
    name,
    email: emailLower,
    role: (role as any) || "tech",
    createdAt: new Date().toISOString(),
  } as any;
  if (password) staff.passwordHash = hash(password);
  db.staff.push(staff as any);
  res.status(201).json({ ok: true, staff });
};

export const createClientAdmin: RequestHandler = (req, res) => {
  const { name, email, phone } = req.body as {
    name: string;
    email: string;
    phone?: string;
  };
  if (!name || !email)
    return res.status(400).json({ error: "name and email required" });
  const client = createClient({ name, email, phone: phone || "" });
  res.status(201).json({ ok: true, client });
};

export const createJobAdmin: RequestHandler = (req, res) => {
  const { clientId, vehicle, serviceType, preferredDate } = req.body as {
    clientId: string;
    vehicle: any;
    serviceType: string;
    preferredDate?: string;
  };
  if (!clientId || !vehicle || !serviceType)
    return res
      .status(400)
      .json({ error: "clientId, vehicle, serviceType required" });
  try {
    const job = createJob({ clientId, vehicle, serviceType, preferredDate });
    res.status(201).json({ ok: true, job });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const createInvoiceAdmin: RequestHandler = (req, res) => {
  const { clientId, jobId, amount } = req.body as {
    clientId: string;
    jobId?: string;
    amount: number;
  };
  if (!clientId || !amount)
    return res.status(400).json({ error: "clientId and amount required" });
  const invoice: Invoice = {
    id: `inv_${Math.random().toString(36).slice(2, 9)}`,
    clientId,
    jobId: jobId || null,
    orderId: null,
    amount: Math.round(amount),
    status: "unpaid",
    issuedAt: new Date().toISOString(),
  };
  db.invoices.push(invoice);
  res.status(201).json({ ok: true, invoice });
};
