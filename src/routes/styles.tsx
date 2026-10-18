import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { tokens } from "@/lib/data";

export const Route = createFileRoute("/styles")({
  head: () => ({
    meta: [
      { title: "Colours & styles — Nexus" },
      { name: "description", content: "Every brand colour, spacing and text size your team uses, explained in plain words." },
      { property: "og:title", content: "Colours & styles — Nexus" },
      { property: "og:description", content: "Your brand colours, spacing and text sizes in one place." },
    ],
  }),
  component: Styles,
});

const tabs = [
  { id: "all", l: "All" }, { id: "color", l: "Colours" }, { id: "spacing", l: "Spacing" },
  { id: "radius", l: "Corners" }, { id: "type", l: "Text" },
];

function Styles() {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const list = useMemo(
    () => tokens.filter((t) => (tab === "all" || t.type === tab) && (t.path + t.plain).toLowerCase().includes(q.toLowerCase())),
    [tab, q],
  );
  return (
    <>
      <PageIntro title="Colours & styles" hint="These are the shared rules for how your product looks. Change one here and every app updates." />
      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-full px-4 py-1.5 text-sm ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t.l}</button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, e.g. blue" className="h-10 rounded-full border bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-64" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => (
            <div key={t.path} className="tile flex items-center gap-3 p-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border bg-card text-xs font-semibold"
                style={t.type === "color" ? { background: t.value } : undefined}>
                {t.type === "spacing" && <span className="block h-2 rounded bg-primary" style={{ width: t.value }} />}
                {t.type === "radius" && <span className="block h-6 w-6 border-2 border-primary" style={{ borderRadius: t.value }} />}
                {t.type === "type" && "Aa"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.plain} {"deprecated" in t && <span className="ml-1 rounded-full bg-warning-soft px-2 text-[10px] text-warning">retiring</span>}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">{t.path} · {t.value}</p>
              </div>
              <button aria-label="Copy name" onClick={() => { navigator.clipboard?.writeText(t.path); setCopied(t.path); setTimeout(() => setCopied(null), 1200); }} className="shrink-0 text-muted-foreground hover:text-foreground">
                {copied === t.path ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          ))}
          {list.length === 0 && <p className="text-sm text-muted-foreground">Nothing matches “{q}”.</p>}
        </div>
      </Card>
    </>
  );
}
