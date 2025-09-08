import { Express } from "express";
import { checkEmail, register, setPassword, login } from "./auth";

export function importAuthRoutes(app: Express) {
  app.post('/api/auth/check', checkEmail);
  app.post('/api/auth/register', register);
  app.post('/api/auth/set-password', setPassword);
  app.post('/api/auth/login', login);
}
