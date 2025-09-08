import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SetPassword from "./pages/SetPassword";

import ClientDashboard from "./pages/client/dashboard";
import MyVehicles from "./pages/client/vehicles";
import MyJobs from "./pages/client/jobs";
import PaymentsAndInvoices from "./pages/client/payments";
import Rewards from "./pages/client/rewards";
import SupportMessages from "./pages/client/support";

import StaffOverview from "./pages/staff/dashboard";
import StaffClients from "./pages/staff/clients";
import StaffJobs from "./pages/staff/jobs";
import StaffInvoices from "./pages/staff/invoices";
import StaffProducts from "./pages/staff/products";
import StaffReports from "./pages/staff/reports";
import StaffManagement from "./pages/staff/staff-management";
import StaffMessaging from "./pages/staff/messaging";

import { AuthProvider, RequireAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/set-password" element={<SetPassword />} />

            {/* Client protected routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth role="client">
                  <ClientDashboard />
                </RequireAuth>
              }
            />
            <Route path="/dashboard/vehicles" element={<RequireAuth role="client"><MyVehicles /></RequireAuth>} />
            <Route path="/dashboard/jobs" element={<RequireAuth role="client"><MyJobs /></RequireAuth>} />
            <Route path="/dashboard/payments" element={<RequireAuth role="client"><PaymentsAndInvoices /></RequireAuth>} />
            <Route path="/dashboard/rewards" element={<RequireAuth role="client"><Rewards /></RequireAuth>} />
            <Route path="/dashboard/support" element={<RequireAuth role="client"><SupportMessages /></RequireAuth>} />

            {/* Staff protected routes */}
            <Route path="/staff" element={<RequireAuth role="staff"><StaffOverview /></RequireAuth>} />
            <Route path="/staff/clients" element={<RequireAuth role="staff"><StaffClients /></RequireAuth>} />
            <Route path="/staff/jobs" element={<RequireAuth role="staff"><StaffJobs /></RequireAuth>} />
            <Route path="/staff/invoices" element={<RequireAuth role="staff"><StaffInvoices /></RequireAuth>} />
            <Route path="/staff/services" element={<RequireAuth role="staff"><StaffProducts /></RequireAuth>} />
            <Route path="/staff/reports" element={<RequireAuth role="staff"><StaffReports /></RequireAuth>} />
            <Route path="/staff/staff-management" element={<RequireAuth role="staff"><StaffManagement /></RequireAuth>} />
            <Route path="/staff/messaging" element={<RequireAuth role="staff"><StaffMessaging /></RequireAuth>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
