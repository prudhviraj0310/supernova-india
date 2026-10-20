import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, PageIntro } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { components } from "@/lib/data";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Building blocks — Nexus" },
      { name: "description", content: "Reusable buttons, inputs and cards — see them live and check their status." },
      { property: "og:title", content: "Building blocks — Nexus" },
      { property: "og:description", content: "Reusable UI building blocks with live preview." },
    ],
  }),
  component: Blocks,
});

const tone: Record<string, string> = {
  Ready: "bg-success-soft text-success",
  "In review": "bg-warning-soft text-warning",
  "In progress": "bg-accent text-accent-foreground",
  Planned: "bg-muted text-muted-foreground",
};

function Blocks() {
  const [sel, setSel] = useState(components[0]);
  const [on, setOn] = useState(true);
  const [feedback, setFeedback] = useState("");
  if (!sel) return null;
  return (
    <>
      <PageIntro title="Building blocks" hint="Ready-made pieces your team reuses so every screen looks and works the same." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card title="All blocks" className="lg:col-span-5">
          <ul className="space-y-2">
            {components.map((c) => (
              <li key={c.name}>
                <Button variant="ghost" onClick={() => { setSel(c); setFeedback(""); }} className={`tile flex h-auto w-full whitespace-normal items-center gap-3 p-3 text-left ${sel.name === c.name ? "ring-2 ring-ring" : ""}`}>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{c.name}</span><span className="block text-xs text-muted-foreground">{c.desc}</span></span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${tone[c.status]}`}>{c.status}</span>
                </Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card title={`Live preview · ${sel.name}`} className="lg:col-span-7">
          <div className="tile grid min-h-64 place-items-center p-4 sm:p-8">
            {sel.name === "Button" && <div className="flex flex-wrap justify-center gap-3"><Button onClick={() => setFeedback("Sample payment selected — no money was moved.")} className="h-11 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Pay ₹250</Button><Button variant="outline" onClick={() => setFeedback("Sample action cancelled.")} className="h-11 rounded-full border px-6 text-sm">Cancel</Button></div>}
            {sel.name === "Input" && <input placeholder="Enter mobile number" defaultValue="+91 " className="h-11 w-full max-w-72 rounded-xl border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring" />}
            {sel.name === "Card" && <div className="glass w-full max-w-64 p-4"><p className="text-xs text-muted-foreground">Order #2041</p><p className="mt-1 text-lg font-semibold">₹1,299</p><p className="text-xs text-success">Delivered</p></div>}
            {sel.name === "Badge" && <div className="flex gap-2">{["New", "Paid", "Pending"].map((b) => <span key={b} className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{b}</span>)}</div>}
            {sel.name === "Switch" && <Switch aria-label="Enable notifications" checked={on} onCheckedChange={setOn} />}
            {!["Button", "Input", "Card", "Badge", "Switch"].includes(sel.name) && <p className="text-sm text-muted-foreground">Preview coming once this block is ready.</p>}
          </div>
          <p role="status" className="mt-3 text-xs text-muted-foreground">{feedback}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="tile p-3"><p className="text-xs text-muted-foreground">Used in screens</p><p className="text-xl font-medium">{sel.usage.toLocaleString("en-IN")}</p></div>
            <div className="tile p-3"><p className="text-xs text-muted-foreground">Works on</p><p className="text-sm font-medium">Web · iOS · Android</p></div>
          </div>
        </Card>
      </div>
    </>
  );
}
