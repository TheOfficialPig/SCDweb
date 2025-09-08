/**
 * Shared types for the Auto Detailing app (client + server)
 */

// Generic helpers
export type ID = string;

// Products / Store
export type ProductCategory = "cleaners" | "wax" | "accessories" | "gift" | "membership";
export interface Product {
  id: ID;
  name: string;
  description: string;
  price: number; // cents
  image: string;
  category: ProductCategory;
  stock?: number | null;
  active: boolean;
}

export interface OrderItem {
  productId: ID;
  name: string;
  unitPrice: number; // cents
  quantity: number;
  image?: string;
}

export type PaymentProvider = "stripe" | "paypal" | "apple-pay" | "manual";
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed";

export interface Order {
  id: ID;
  clientId: ID | null;
  items: OrderItem[];
  subtotal: number; // cents
  tax: number; // cents
  total: number; // cents
  status: PaymentStatus;
  provider: PaymentProvider;
  createdAt: string;
}

// Clients / Vehicles / Jobs
export interface Vehicle {
  id: ID;
  make: string;
  model: string;
  year: number | string;
}

export interface Client {
  id: ID;
  name: string;
  email: string;
  phone: string;
  vehicles: Vehicle[];
  notes?: string;
  createdAt: string;
}

export type JobStatus = "quote" | "scheduled" | "in_progress" | "completed";

export interface Job {
  id: ID;
  clientId: ID;
  vehicle: Vehicle;
  serviceType: string; // Interior | Exterior | Full Detail | Add-ons
  preferredDate?: string | null;
  scheduledAt?: string | null;
  status: JobStatus;
  beforePhotos?: string[];
  afterPhotos?: string[];
  notes?: string;
  createdAt: string;
}

export interface Invoice {
  id: ID;
  clientId: ID;
  jobId: ID | null;
  orderId: ID | null;
  amount: number; // cents
  status: PaymentStatus;
  issuedAt: string;
  paidAt?: string | null;
}

// Messaging
export interface Message {
  id: ID;
  from: ID; // clientId or staffId
  to: ID; // clientId or staffId
  body: string;
  createdAt: string;
}

// Staff
export type StaffRole = "owner" | "manager" | "lead" | "tech" | "admin";
export interface Staff {
  id: ID;
  name: string;
  email: string;
  role: StaffRole;
  createdAt: string;
}

// Quote request payload
export interface QuoteRequestPayload {
  name: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceType: string;
  preferredDate?: string;
}

export interface QuoteResponse {
  client: Client;
  job: Job;
}

// Simple API response helpers
export interface ApiList<T> {
  items: T[];
}

export interface ApiOk {
  ok: true;
}

/** Example response type for /api/demo */
export interface DemoResponse {
  message: string;
}
