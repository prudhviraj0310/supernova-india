import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, PageIntro } from "@/components/AppShell";

export const Route = createFileRoute("/figma")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Figma sync — Nexus" },
      { name: "description", content: "Pull the latest colours and styles from your Figma file and review changes before applying." },
      { property: "og:title", content: "Figma sync — Nexus" },
      { property: "og:description", content: "Bring design changes from Figma in three simple steps." },
    ],
  }),
  component: FigmaPage,
});

const changes = [
  { kind: "Changed", name: "Main brand colour", from: "#3b82f6", to: "#2f6fe0" },
  { kind: "Added", name: "Success green", from: "—", to: "#16a34a" },
  { kind: "Removed", name: "Old pink accent", from: "#ff007f", to: "—" },
];

function FigmaPage() {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const check = () => { setBusy(true); setTimeout(() => { setBusy(false); setStep(2); }, 900); };
  return (
    <>
      <PageIntro title="Figma sync" hint="Try a sample review of three changes. This does not connect to Figma or change your library." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card title="3 simple steps" className="lg:col-span-4">
          {["Connect your Figma file", "Review what changed", "Apply the changes"].map((s, i) => (
            <div key={s} className="mb-3 flex items-center gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${step > i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
              <span className="text-sm">{s}</span>
            </div>
          ))}
          <label className="mt-4 block text-xs text-muted-foreground">Sample Figma file</label>
          <input aria-label="Sample Figma file" readOnly defaultValue="4s7xK0m2zN_core_ui_kit" className="mt-1 h-11 w-full rounded-xl border bg-surface px-3 text-sm" />
          <Button disabled={busy} onClick={check} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground">
            <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} /> Preview changes
          </Button>
        </Card>
        <Card title="What changed" className="lg:col-span-8">
          {step === 1 && <p className="text-sm text-muted-foreground">Press “Preview changes” to compare Figma with your library.</p>}
          {step >= 2 && (
            <>
              <ul className="space-y-2">
                {changes.map((c) => (
                  <li key={c.name} className="tile flex flex-wrap items-center gap-3 p-3">
                    <span className={`w-20 shrink-0 rounded-full px-2 py-0.5 text-center text-[10px] font-semibold ${c.kind === "Added" ? "bg-success-soft text-success" : c.kind === "Removed" ? "bg-danger-soft text-destructive" : "bg-warning-soft text-warning"}`}>{c.kind}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{c.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{c.from} → {c.to}</span>
                  </li>
                ))}
              </ul>
              {step === 2 ? (
                <Button onClick={() => setStep(3)} className="mt-4 h-11 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Approve sample changes</Button>
              ) : (
                <p className="mt-4 flex items-center gap-2 text-sm text-success"><CheckCircle2 className="h-4 w-4" /> Review complete. No real library was changed.</p>
              )}
            </>
          )}
        </Card>
      </div>
    </>
  );
}
