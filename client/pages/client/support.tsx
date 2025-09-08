import ClientDashboardLayout from "@/components/layout/ClientDashboardLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SupportMessages() {
  const [messages, setMessages] = useState<{ id: string; body: string }[]>([]);
  const [text, setText] = useState("");

  function send() {
    if (!text) return;
    setMessages((s) => [...s, { id: Math.random().toString(36).slice(2), body: text }]);
    setText("");
  }

  return (
    <ClientDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Support Messages</h1>
        <p className="mt-2 text-muted-foreground">Chat with our team or request service</p>

        <div className="mt-6 grid gap-4">
          <div className="rounded-lg border p-4">
            {messages.length === 0 && <div className="text-sm text-muted-foreground">No messages yet</div>}
            {messages.map((m) => (
              <div key={m.id} className="mt-2 rounded-md bg-muted/20 p-3">{m.body}</div>
            ))}
          </div>

          <div>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} />
            <div className="mt-2 flex justify-end">
              <Button onClick={send}>Send</Button>
            </div>
          </div>
        </div>
      </section>
    </ClientDashboardLayout>
  );
}
