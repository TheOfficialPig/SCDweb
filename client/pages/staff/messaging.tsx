import Layout from "@/components/layout/Layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";

export default function Messaging() {
  const [msgs, setMsgs] = useState<{ id: string; body: string }[]>([]);
  const [text, setText] = useState("");
  function send() {
    if (!text) return;
    setMsgs((s) => [...s, { id: Math.random().toString(36).slice(2), body: text }]);
    setText("");
  }
  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Messaging</h1>
        <p className="mt-2 text-muted-foreground">Staff ↔ Client and internal chat</p>
        <div className="mt-6">
          <div className="rounded-lg border p-4">
            {msgs.length === 0 && <div className="text-sm text-muted-foreground">No messages yet</div>}
            {msgs.map((m) => (
              <div key={m.id} className="mt-2 rounded-md bg-muted/20 p-3">{m.body}</div>
            ))}
          </div>
          <div className="mt-4">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} />
            <div className="mt-2 flex justify-end">
              <Button onClick={send}>Send</Button>
            </div>
          </div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
