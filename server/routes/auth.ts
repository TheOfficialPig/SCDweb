import { RequestHandler } from "express";
import crypto from "crypto";
import { db } from "../data/store";

function hash(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

export const checkEmail: RequestHandler = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });
  const user = db.users?.find(
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

export const register: RequestHandler = (req, res) => {
  const { name, email, role } = req.body as {
    name?: string;
    email: string;
    role: string;
  };
  if (!email) return res.status(400).json({ error: "Email required" });
  const emailLower = email.toLowerCase();
  // only allow gmail addresses
  if (!emailLower.endsWith("@gmail.com"))
    return res.status(400).json({ error: "Only Gmail addresses allowed" });

  // staff registration only server-side; prevent creating staff via register
  const normalizedRole = role === "staff" || role === "owner" ? "client" : role;
  const existing = db.users?.find((u) => u.email.toLowerCase() === emailLower);
  if (existing) return res.status(400).json({ error: "User already exists" });

  const user = {
    id: `user_${Math.random().toString(36).slice(2, 9)}`,
    name: name || email.split("@")[0],
    email: emailLower,
    role: normalizedRole,
    createdAt: new Date().toISOString(),
  } as any;
  db.users = db.users || [];
  db.users.push(user);
  return res.status(201).json({ ok: true, user, needsPassword: true });
};

export const setPassword: RequestHandler = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  const user = (db.users || []).find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  user.passwordHash = hash(password);
  return res.json({ ok: true });
};

export const login: RequestHandler = (req, res) => {
  const { email, password, role } = req.body as {
    email: string;
    password?: string;
    role?: string;
  };
  console.log("[auth.login] payload:", { email, role });
  if (!email) return res.status(400).json({ error: "Email required" });
  const emailLower = email.toLowerCase();
  // Staff access: only allow if email in db.staff and gmail
  if (role === "staff") {
    console.log("[auth.login] staff login attempt for", emailLower);
    if (!emailLower.endsWith("@gmail.com"))
      return res.status(403).json({ error: "Staff must use Gmail" });
    const staff = db.staff.find((s) => s.email.toLowerCase() === emailLower);
    if (!staff) {
      console.log(
        "[auth.login] staff not found in db.staff",
        emailLower,
        db.staff.map((s) => s.email),
      );
      return res.status(403).json({ error: "Staff not registered" });
    }
    // if staff has passwordHash require password
    if (staff.passwordHash) {
      if (!password)
        return res.status(400).json({ error: "Password required for staff" });
      if (staff.passwordHash !== hash(password))
        return res.status(403).json({ error: "Invalid credentials" });
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

  // Clients: must be Gmail
  if (!emailLower.endsWith("@gmail.com"))
    return res.status(400).json({ error: "Clients must use Gmail" });
  const user = (db.users || []).find(
    (u) => u.email.toLowerCase() === emailLower,
  );
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (!user.passwordHash) {
    // needs to set password
    return res.status(200).json({ ok: false, needsPassword: true });
  }
  // verify password
  if (!password) return res.status(400).json({ error: "Password required" });
  if (user.passwordHash !== hash(password))
    return res.status(403).json({ error: "Invalid credentials" });
  return res.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};
