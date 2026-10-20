import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { healthChecks } from "@/lib/data";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "System health — Nexus" },
      { name: "description", content: "A simple check of every part of the system — what works and what still needs setup." },
      { property: "og:title", content: "System health — Nexus" },
      { property: "og:description", content: "See what's working and what needs attention." },
    ],
  }),
  component: Health,
});

const icon = { ok: CheckCircle2, warn: AlertTriangle, bad: XCircle };
const color = { ok: "text-success", warn: "text-warning", bad: "text-destructive" };

function Health() {
  const ok = healthChecks.filter((h) => h.status === "ok").length;
  return (
    <>
      <PageIntro title="System health" hint="Current preview capabilities and setup limits. This is not live service monitoring." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <p className="text-xs text-muted-foreground">Overall</p>
          <p className="mt-3 text-5xl font-light">{ok}/{healthChecks.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">areas fully working</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(ok / healthChecks.length) * 100}%` }} /></div>
        </Card>
        <Card title="Every part, checked" className="lg:col-span-8">
          <ul className="space-y-2">
            {healthChecks.map((h) => {
              const I = icon[h.status];
              return (
                <li key={h.area} className="tile flex items-center gap-3 p-3">
                  <I className={`h-5 w-5 shrink-0 ${color[h.status]}`} />
                  <div className="min-w-0"><p className="text-sm font-medium">{h.area}</p><p className="text-xs text-muted-foreground">{h.note}</p></div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </>
  );
}
