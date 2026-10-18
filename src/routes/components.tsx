import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, PageIntro } from "@/components/AppShell";
import { components } from "@/lib/data";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
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
  const [sel, setSel] = useState(components[0]!);
  const [on, setOn] = useState(true);
  return (
    <>
      <PageIntro title="Building blocks" hint="Ready-made pieces your team reuses so every screen looks and works the same." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card title="All blocks" className="lg:col-span-5">
          <ul className="space-y-2">
            {components.map((c) => (
              <li key={c.name}>
                <button onClick={() => setSel(c)} className={`tile flex w-full items-center gap-3 p-3 text-left ${sel.name === c.name ? "ring-2 ring-ring" : ""}`}>
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{c.name}</p><p className="truncate text-xs text-muted-foreground">{c.desc}</p></div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${tone[c.status]}`}>{c.status}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card title={`Live preview · ${sel.name}`} className="lg:col-span-7">
          <div className="tile grid min-h-64 place-items-center p-8">
            {sel.name === "Button" && <div className="flex gap-3"><button className="h-11 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Pay ₹250</button><button className="h-11 rounded-full border px-6 text-sm">Cancel</button></div>}
            {sel.name === "Input" && <input placeholder="Enter mobile number" defaultValue="+91 " className="h-11 w-72 rounded-xl border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring" />}
            {sel.name === "Card" && <div className="glass w-64 p-4"><p className="text-xs text-muted-foreground">Order #2041</p><p className="mt-1 text-lg font-semibold">₹1,299</p><p className="text-xs text-success">Delivered</p></div>}
            {sel.name === "Badge" && <div className="flex gap-2">{["New", "Paid", "Pending"].map((b) => <span key={b} className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{b}</span>)}</div>}
            {sel.name === "Switch" && <button aria-label="Toggle" onClick={() => setOn(!on)} className={`flex h-7 w-12 items-center rounded-full p-1 transition ${on ? "bg-primary" : "bg-muted"}`}><span className={`h-5 w-5 rounded-full bg-card transition ${on ? "translate-x-5" : ""}`} /></button>}
            {!["Button", "Input", "Card", "Badge", "Switch"].includes(sel.name) && <p className="text-sm text-muted-foreground">Preview coming once this block is ready.</p>}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="tile p-3"><p className="text-xs text-muted-foreground">Used in screens</p><p className="text-xl font-medium">{sel.usage.toLocaleString("en-IN")}</p></div>
            <div className="tile p-3"><p className="text-xs text-muted-foreground">Works on</p><p className="text-sm font-medium">Web · iOS · Android</p></div>
          </div>
        </Card>
      </div>
    </>
  );
}
