import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { enterpriseFeatures } from "@/lib/data";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "Enterprise — Nexus Design OS" },
      { name: "description", content: "Explore planned security, access and support capabilities for large Indian organisations using Nexus." },
      { property: "og:title", content: "Enterprise — Nexus Design OS" },
      { property: "og:description", content: "Security, compliance and support for large Indian teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EnterprisePage,
});

function EnterprisePage() {
  return (
    <div>
      <PageIntro title="Nexus for Enterprise" hint="Planned capabilities for larger Indian teams. These services are not available in this preview." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {enterpriseFeatures.map((f) => (
          <Card key={f.title}>
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-base font-semibold">{f.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </Card>
        ))}
      </div>
      <Card className="gradient-card mt-4 border-0 text-primary-foreground">
        <h2 className="text-lg font-semibold">Enterprise enquiries</h2>
        <p className="mt-1 max-w-xl text-sm opacity-90">
          A verified contact and booking service have not been provided yet. No support hours, hosting region or service agreement are confirmed.
        </p>
      </Card>
    </div>
  );
}
