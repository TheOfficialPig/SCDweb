import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";
import { useState, useEffect } from "react";

export default function StaffJobs() {
  const [clients, setClients] = useState<any[]>([]);
  const [clientId, setClientId] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(()=>{ fetch('/api/admin/clients').then(r=>r.json()).then(d=>setClients(d.items||[])).catch(()=>setClients([])); },[]);

  async function submit(e: React.FormEvent){
    e.preventDefault(); setMessage(null);
    const vehicle = { make, model, year };
    const res = await fetch('/api/admin/jobs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({clientId, vehicle, serviceType})});
    const data = await res.json();
    if(res.ok){ setMessage('Job created'); setMake(''); setModel(''); setYear(''); setServiceType(''); }
    else setMessage(data?.error||'Failed');
  }

  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Jobs & Appointments</h1>
        <p className="mt-2 text-muted-foreground">Manage quotes, schedule jobs, upload photos, assign staff</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form onSubmit={submit} className="rounded-lg border p-6">
            <div>
              <label className="block text-sm">Client</label>
              <select value={clientId} onChange={(e)=>setClientId(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2">
                <option value="">Select client</option>
                {clients.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <input value={make} onChange={(e)=>setMake(e.target.value)} placeholder="Make" className="rounded-md border px-3 py-2" />
              <input value={model} onChange={(e)=>setModel(e.target.value)} placeholder="Model" className="rounded-md border px-3 py-2" />
              <input value={year} onChange={(e)=>setYear(e.target.value)} placeholder="Year" className="rounded-md border px-3 py-2" />
            </div>
            <div className="mt-3">
              <label className="block text-sm">Service Type</label>
              <input value={serviceType} onChange={(e)=>setServiceType(e.target.value)} placeholder="Full Detail" className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>
            <div className="mt-4">
              <button type="submit" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Create Job</button>
            </div>
            {message && <div className="mt-3 text-sm">{message}</div>}
          </form>

          <div className="rounded-lg border p-6">
            <div className="font-semibold">Recent Jobs</div>
            <div className="mt-2 text-sm text-muted-foreground">Jobs are stored in-memory on the server.</div>
          </div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
