import { RequestHandler } from "express";
import { ApiOk, QuoteRequestPayload, QuoteResponse } from "@shared/api";
import { addVehicle, createClient, createJob } from "../data/store.js";

export const createQuote: RequestHandler = (req, res) => {
  const body: QuoteRequestPayload = req.body;
  if (!body?.name || !body?.email || !body?.phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const client = createClient({
    name: body.name,
    email: body.email,
    phone: body.phone,
  });
  const vehicle = addVehicle(client.id, {
    make: body.vehicleMake,
    model: body.vehicleModel,
    year: body.vehicleYear,
  });

  const job = createJob({
    clientId: client.id,
    vehicle,
    serviceType: body.serviceType,
    preferredDate: body.preferredDate ?? null,
  });

  const payload: QuoteResponse = { client, job };

  // Simulate staff notification (email/push could be integrated here)
  console.log("New quote request:", { client: client.email, job: job.id });

  res.status(201).json(payload);
};

export const pingQuote: RequestHandler = (_req, res) => {
  const ok: ApiOk = { ok: true };
  res.json(ok);
};
