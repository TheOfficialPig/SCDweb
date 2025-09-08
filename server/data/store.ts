import {
  Client,
  ID,
  Invoice,
  Job,
  Order,
  Product,
  Staff,
  Vehicle,
} from "@shared/api";

function id(prefix: string = "id"): ID {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

// In-memory store (non-persistent)
export const db = {
  products: [] as Product[],
  clients: [] as Client[],
  jobs: [] as Job[],
  invoices: [] as Invoice[],
  orders: [] as Order[],
  staff: [] as Staff[],
};

// Seed initial data
function seed() {
  if (db.products.length === 0) {
    db.products.push(
      {
        id: id("prod"),
        name: "pH Neutral Car Shampoo",
        description: "Gentle, high-foaming wash safe for all finishes.",
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1606676539949-9b57c5f78f9a?q=80&w=1400&auto=format&fit=crop",
        category: "cleaners",
        stock: 50,
        active: true,
      },
      {
        id: id("prod"),
        name: "Ceramic Wax Pro",
        description: "Long-lasting hydrophobic protection and deep gloss.",
        price: 3999,
        image:
          "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1400&auto=format&fit=crop",
        category: "wax",
        stock: 30,
        active: true,
      },
      {
        id: id("prod"),
        name: "Microfiber Towel 6-Pack",
        description: "Ultra-soft edgeless towels for streak-free finish.",
        price: 1999,
        image:
          "https://images.unsplash.com/photo-1664899346603-4eac3a25a085?q=80&w=1400&auto=format&fit=crop",
        category: "accessories",
        stock: 100,
        active: true,
      },
      {
        id: id("prod"),
        name: "Gift Card",
        description: "Give the gift of a showroom shine.",
        price: 5000,
        image:
          "https://images.unsplash.com/photo-1610082219800-7cc0a2f87c7c?q=80&w=1400&auto=format&fit=crop",
        category: "gift",
        stock: null,
        active: true,
      },
      {
        id: id("prod"),
        name: "Monthly Interior Clean Membership",
        description: "Keep your interior spotless all year. Billed monthly.",
        price: 2999,
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
        category: "membership",
        stock: null,
        active: true,
      },
    );
  }

  if (db.staff.length === 0) {
    db.staff.push(
      {
        id: id("staff"),
        name: "Gage Garton",
        email: "GageGarton999@gmail.com",
        role: "owner",
        createdAt: new Date().toISOString(),
      },
      {
        id: id("staff"),
        name: "Sam Lee",
        email: "sam.lee@gmail.com",
        role: "tech",
        createdAt: new Date().toISOString(),
      },
    );
  }
}

seed();

export function createClient(params: {
  name: string;
  email: string;
  phone: string;
}): Client {
  const client: Client = {
    id: id("client"),
    name: params.name,
    email: params.email,
    phone: params.phone,
    vehicles: [],
    createdAt: new Date().toISOString(),
  };
  db.clients.push(client);
  return client;
}

export function addVehicle(clientId: ID, v: Omit<Vehicle, "id">): Vehicle {
  const client = db.clients.find((c) => c.id === clientId);
  if (!client) throw new Error("Client not found");
  const vehicle: Vehicle = { id: id("veh"), ...v };
  client.vehicles.push(vehicle);
  return vehicle;
}

export function createJob(params: {
  clientId: ID;
  vehicle: Vehicle;
  serviceType: string;
  preferredDate?: string | null;
}): Job {
  const job: Job = {
    id: id("job"),
    clientId: params.clientId,
    vehicle: params.vehicle,
    serviceType: params.serviceType,
    preferredDate: params.preferredDate ?? null,
    scheduledAt: null,
    status: "quote",
    beforePhotos: [],
    afterPhotos: [],
    createdAt: new Date().toISOString(),
  };
  db.jobs.push(job);
  return job;
}
