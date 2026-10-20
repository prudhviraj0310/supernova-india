import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Eye, EyeOff, RefreshCw, Download, Bot, Plus, Palette, Boxes, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/AppShell";
import { activity, components, tokens } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Nexus — Your design system, made simple" },
      { name: "description", content: "One place for your brand colours, building blocks and ready-to-use code for web, iOS and Android." },
      { property: "og:title", content: "Nexus — Your design system, made simple" },
      { property: "og:description", content: "Brand colours, building blocks and code for every platform, in one simple dashboard." },
    ],
  }),
  component: Home,
});

const week = [40, 72, 100, 55, 48, 30, 22];

function Home() {
  const [show, setShow] = useState(true);
  const colours = tokens.filter((t) => t.type === "color");
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="grid gap-4 lg:col-span-4">
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Namaste, Prudhvi 👋 · Styles in your library</span>
            <Link to="/styles" aria-label="Open styles" className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-5xl font-light tracking-tight">{show ? tokens.length : "••"}</span>
            <Button variant="ghost" size="icon" aria-label="Toggle style count" onClick={() => setShow(!show)} className="text-muted-foreground">{show ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</Button>
          </div>
          <div className="mt-2 inline-flex rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">Sample library · Figma not connected</div>
          <p className="mt-6 mb-3 text-xs font-semibold">Quick actions</p>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { to: "/figma", icon: RefreshCw, l: "Sync Figma" },
              { to: "/styles", icon: Plus, l: "Add style" },
              { to: "/export", icon: Download, l: "Get code" },
              { to: "/ai", icon: Bot, l: "AI helper" },
            ].map((a) => (
              <Link key={a.l} to={a.to} className="flex flex-col items-center gap-1.5">
                <span className="glass grid h-11 w-11 place-items-center !rounded-full"><a.icon className="h-4 w-4" /></span>{a.l}
              </Link>
            ))}
          </div>
        </Card>
        <Card title="Recent activity" action={<span className="text-xs text-muted-foreground">Team</span>}>
          <ul className="space-y-3">
            {activity.map((a) => (
              <li key={a.who + a.when} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{a.who.split(" ").map((w) => w[0]).join("")}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.who}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.what} · {a.when}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold">{a.tag}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid content-start gap-4 lg:col-span-5">
        <div className="grid grid-cols-2 gap-4">
          <Card><p className="text-xs text-muted-foreground">Building blocks ready</p><div className="mt-5 flex items-center justify-between"><span className="text-2xl font-medium">{components.filter((c) => c.status === "Ready").length}/{components.length}</span><span className="rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-semibold text-success">+1 this week</span></div></Card>
          <Card><p className="text-xs text-muted-foreground">Issues to fix</p><div className="mt-5 flex items-center justify-between"><span className="text-2xl font-medium">3</span><span className="rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-semibold text-destructive">needs care</span></div></Card>
        </div>
        <Card title="Code downloads" action={<span className="text-xs text-muted-foreground">This week</span>}>
          <div className="flex items-end justify-between">
            <div><span className="text-4xl font-light">7.3K</span><p className="mt-1 text-xs text-success">↑ 4.2% vs last week</p></div>
            <div className="flex h-24 items-end gap-2">
              {week.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-3 rounded-full ${i === 2 ? "bg-primary" : "bg-muted"}`} style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-muted-foreground">{"SMTWTFS"[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card title="What's next" action={<Link to="/health" className="text-xs text-muted-foreground">View all</Link>}>
          <ul className="space-y-2">
            {[
              { icon: Palette, t: "Retire the old pink accent", s: "Used in 4 screens", d: "Due tomorrow" },
              { icon: Boxes, t: "Finish the Modal block", s: "Design review pending", d: "In 3 days" },
              { icon: FileCode2, t: "Connect GitHub", s: "Send code updates automatically", d: "Setup" },
              { icon: RefreshCw, t: "Add Figma access key", s: "Enable live sync", d: "Setup" },
            ].map((x) => (
              <li key={x.t} className="tile flex items-center gap-3 p-3">
                <span className="glass grid h-9 w-9 shrink-0 place-items-center !rounded-full"><x.icon className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{x.t}</p><p className="truncate text-xs text-muted-foreground">{x.s}</p></div>
                <span className="shrink-0 text-xs text-muted-foreground">{x.d}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid content-start gap-4 lg:col-span-3">
        <Card title="Your brand colours">
          <div className="grid grid-cols-4 gap-2">
            {colours.map((c) => (
              <div key={c.path} title={c.plain} className="aspect-square rounded-xl border" style={{ background: c.value }} />
            ))}
          </div>
          <Link to="/styles" className="mt-4 flex h-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">See all styles</Link>
        </Card>
        <Card title="Design system card">
          <div className="gradient-card relative aspect-[1.6] overflow-hidden rounded-2xl p-4 text-primary-foreground">
            <span className="text-lg font-semibold italic text-primary/60">nexus</span>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <span className="text-xs">v2.4 · Web · iOS · Android</span>
              <span className="text-lg font-bold italic">DS</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
