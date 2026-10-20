import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { customers } from "@/lib/data";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Nexus Design OS" },
      { name: "description", content: "Illustrative design-system use cases for Indian fintech, edtech, commerce and healthtech teams." },
      { property: "og:title", content: "Customers — Nexus Design OS" },
      { property: "og:description", content: "Sample design-system stories for Indian product teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <div>
      <PageIntro title="Customers" hint="Illustrative stories for Indian teams. Company names, quotes and results below are fictional examples, not verified testimonials." />
      <div className="grid gap-4 sm:grid-cols-2">
        {customers.map((c) => (
          <Card key={c.company}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold">{c.company}</h2>
                <p className="text-xs text-muted-foreground">{c.industry}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">{c.stat}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Quote className="h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-sm leading-relaxed">{c.quote}</p>
            </div>
            <p className="mt-3 text-xs font-medium text-muted-foreground">— {c.person}</p>
          </Card>
        ))}
      </div>
      <Card className="gradient-card mt-4 border-0 text-primary-foreground">
        <h2 className="text-lg font-semibold">Real stories come next</h2>
        <p className="mt-1 max-w-xl text-sm opacity-90">Verified customer stories can replace these examples when they are available.</p>
      </Card>
    </div>
  );
}
