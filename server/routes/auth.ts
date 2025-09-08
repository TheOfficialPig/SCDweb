import { RequestHandler } from "express";
import crypto from "crypto";
import { db } from "../data/store.js";

function hash(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

/**
 * Check if email exists in system
 */
export const checkEmail: RequestHandler = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  db.users = db.users || [];

  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (user) {
    return res.json({
      exists: true,
      needsPassword: !!user.passwordHash,
      role: user.role,
    });
  }
  return res.json({ exists: false });
};

/**
 * Register a new client (not staff)
 */
export const register: RequestHandler = (req, res) => {
  const { name, email, role } = req.body as {
    name?: string;
    email: string;
    role: string;
  };

  if (!email) return res.status(400).json({ error: "Email required" });

  const emailLower = email.toLowerCase();

  // only allow gmail addresses
  if (!emailLower.endsWith("@gmail.com")) {
    return res.status(400).json({ error: "Only Gmail addresses allowed" });
  }

  db.users = db.users || [];

  // prevent creating staff via register
  const normalizedRole = role === "staff" || role === "owner" ? "client" : role;

  const existing = db.users.find((u) => u.email.toLowerCase() === emailLower);
  if (existing) return res.status(400).json({ error: "User already exists" });

  const user = {
    id: `user_${Math.random().toString(36).slice(2, 9)}`,
    name: name || email.split("@")[0],
    email: emailLower,
    role: normalizedRole,
    createdAt: new Date().toISOString(),
  } as any;

  db.users.push(user);

  return res.status(201).json({ ok: true, user, needsPassword: true });
};

/**
 * Set a password for a user
 */
export const setPassword: RequestHandler = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  db.users = db.users || [];

  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) return res.status(404).json({ error: "User not found" });

  user.passwordHash = hash(password);

  return res.json({ ok: true });
};

/**
 * Login: staff or client
 */
export const login: RequestHandler = (req, res) => {
  try {
    const { email, password, role } = req.body as {
      email: string;
      password?: string;
      role?: string;
    };

    console.log("[auth.login] payload:", { email, role });

    if (!email) return res.status(400).json({ error: "Email required" });

    const emailLower = email.toLowerCase();

    // ---- STAFF LOGIN ----
    if (role === "staff") {
      console.log("[auth.login] staff login attempt for", emailLower);

      if (!emailLower.endsWith("@gmail.com")) {
        return res.status(403).json({ error: "Staff must use Gmail" });
      }

      db.staff = db.staff || [];

      const staff = db.staff.find(
        (s) => s.email.toLowerCase() === emailLower,
      );
      if (!staff) {
        console.log("[auth.login] staff not found in db.staff:", emailLower);
        return res.status(403).json({ error: "Staff not registered" });
      }

      // if staff has passwordHash require password
      if (staff.passwordHash) {
        if (!password) {
          return res.status(400).json({ error: "Password required for staff" });
        }
        if (staff.passwordHash !== hash(password)) {
          return res.status(403).json({ error: "Invalid credentials" });
        }
      }

      return res.json({
        ok: true,
        user: {
          id: staff.id,
          name: staff.name,
          email: staff.email,
          role: staff.role,
        },
      });
    }

    // ---- CLIENT LOGIN ----
    if (!emailLower.endsWith("@gmail.com")) {
      return res.status(400).json({ error: "Clients must use Gmail" });
    }

    db.users = db.users || [];

    const user = db.users.find(
      (u) => u.email.toLowerCase() === emailLower,
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.passwordHash) {
      // needs to set password
      return res.status(200).json({ ok: false, needsPassword: true });
    }

    if (!password) {
      return res.status(400).json({ error: "Password required" });
    }
    if (user.passwordHash !== hash(password)) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    return res.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    console.error("❌ [auth.login] unexpected error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};
