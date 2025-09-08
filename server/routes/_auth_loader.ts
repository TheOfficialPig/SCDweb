import { Express } from "express";
import { checkEmail, register, setPassword, login } from "./auth";
import {
  createStaff,
  createClientAdmin,
  createJobAdmin,
  createInvoiceAdmin,
} from "./admin_actions";

export function importAuthRoutes(app: Express) {
  app.post("/api/auth/check", checkEmail);
  app.post("/api/auth/register", register);
  app.post("/api/auth/set-password", setPassword);
  app.post("/api/auth/login", login);

  // admin create endpoints
  app.post("/api/admin/staff", createStaff);
  app.post("/api/admin/clients", createClientAdmin);
  app.post("/api/admin/jobs", createJobAdmin);
  app.post("/api/admin/invoices", createInvoiceAdmin);
}
