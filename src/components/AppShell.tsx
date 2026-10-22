import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Home, Palette, Boxes, Code2, Figma, Bot, BookOpen, HeartPulse, Search, Bell, Sparkles,
  FileText, Plug, Newspaper, Users, Building2, GraduationCap, Layers, BrainCircuit, Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { activity } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

const productNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/styles", label: "Colours & styles", icon: Palette },
  { to: "/components", label: "Building blocks", icon: Boxes },
  { to: "/figma", label: "Figma sync", icon: Figma },
  { to: "/export", label: "Get code", icon: Code2 },
  { to: "/ai", label: "AI helper", icon: Bot },
  { to: "/guide", label: "Guide", icon: BookOpen },
  { to: "/health", label: "System health", icon: HeartPulse },
] as const;

const resourceNav = [
  { to: "/docs", label: "Documentation", icon: FileText },
  { to: "/integrations", label: "Integrations", icon: Plug },
  { to: "/dsm", label: "Design system mgmt", icon: Layers },
  { to: "/for-ai", label: "For AI", icon: BrainCircuit },
  { to: "/contexts-101", label: "Contexts 101", icon: GraduationCap },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/blog", label: "Blog", icon: Newspaper },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/enterprise", label: "Enterprise", icon: Building2 },
] as const;

const allNav = [...productNav, ...resourceNav];

function NavIcon({ n, path }: { n: (typeof allNav)[number]; path: string }) {
  const active = n.to === path;
  return (
    <Link to={n.to} title={n.label} aria-label={n.label}
      className={`group relative grid h-11 w-11 place-items-center rounded-full transition ${active ? "bg-primary text-primary-foreground shadow-lg" : "glass !rounded-full text-muted-foreground hover:text-foreground"}`}>
      <n.icon className="h-[18px] w-[18px]" />
      <span className="pointer-events-none absolute left-14 z-20 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1 text-xs text-background opacity-0 transition group-hover:opacity-100">{n.label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const current = allNav.find((n) => n.to === path);
  const [panel, setPanel] = useState<"search" | "notifications" | "menu" | null>(null);
  const [query, setQuery] = useState("");
  const { user, name } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  async function signOut() { await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); setPanel(null); navigate({ to: "/login", replace: true }); }
  const results = allNav.filter((n) => n.label.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-surface shadow-[var(--shadow-float)]">
        <div className="mist pointer-events-none absolute inset-x-0 top-0 h-72" />
        <header className="relative flex items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="truncate text-xl font-semibold italic tracking-tight">nexus</span>
          </Link>
          <div className="hidden text-sm text-muted-foreground md:block">{current?.label}</div>
          <div className="flex shrink-0 items-center gap-2">
            <Button aria-label="Search" title="Search pages" variant="outline" size="icon" className="glass h-10 w-10 !rounded-full" onClick={() => { setQuery(""); setPanel("search"); }}><Search /></Button>
            <Button aria-label="Notifications" title="Recent activity" variant="outline" size="icon" className="glass h-10 w-10 !rounded-full" onClick={() => setPanel("notifications")}><Bell /></Button>
            {user ? <>
              <span className="hidden max-w-40 truncate text-sm font-medium sm:block">{name}</span>
              <Button variant="outline" className="hidden rounded-full sm:flex" onClick={signOut}>Log out</Button>
            </> : <>
              <Button asChild variant="outline" className="hidden rounded-full sm:flex"><Link to="/login">Log in</Link></Button>
              <Button asChild className="hidden rounded-full sm:flex"><Link to="/signup">Join Nexus</Link></Button>
            </>}
          </div>
        </header>
        <div className="relative flex gap-4 px-3 pb-20 sm:px-5 md:pb-5">
          <nav className="hidden w-14 shrink-0 flex-col items-center gap-3 pt-6 md:flex">
            {productNav.map((n) => <NavIcon key={n.to} n={n} path={path} />)}
            <span className="my-1 h-px w-8 bg-border" aria-hidden />
            {resourceNav.map((n) => <NavIcon key={n.to} n={n} path={path} />)}
          </nav>
          <main className="min-w-0 flex-1">
            <p className="mb-4 px-1 text-xs text-muted-foreground">{user ? `Signed in as ${name}` : "Sample library · Log in to save your own styles"}</p>
            {children}
          </main>
        </div>
      </div>
      <nav className="glass fixed inset-x-3 bottom-3 z-30 flex justify-between overflow-x-auto p-1.5 md:hidden">
        {productNav.slice(0, 4).map((n) => (
          <Link key={n.to} to={n.to} aria-label={n.label}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${n.to === path ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            <n.icon className="h-[18px] w-[18px]" />
          </Link>
        ))}
        <Button variant="ghost" size="icon" aria-label="All pages" className="h-11 w-11 shrink-0 rounded-full" onClick={() => setPanel("menu")}><Menu /></Button>
      </nav>
      <Dialog open={panel !== null} onOpenChange={(open) => { if (!open) setPanel(null); }}>
        <DialogContent className="max-h-[85dvh] max-w-[calc(100%-2rem)] overflow-y-auto rounded-lg sm:max-w-lg">
          <DialogTitle>{panel === "search" ? "Search Nexus" : panel === "notifications" ? "Recent activity" : "All pages"}</DialogTitle>
          <DialogDescription>{panel === "notifications" ? "Sample team activity · times shown in IST" : "Product, resources and your workspace"}</DialogDescription>
          {panel === "search" && <Input aria-label="Search pages" placeholder="Search pages…" value={query} onChange={(e) => setQuery(e.target.value)} />}
          {panel === "notifications" ? <ul className="space-y-4">{activity.map((a) => <li key={a.who} className="border-b pb-3"><p className="text-sm font-semibold">{a.who}</p><p className="mt-1 text-sm text-muted-foreground">{a.what}</p><p className="mt-1 text-xs text-muted-foreground">{a.when} IST</p></li>)}</ul> : <div className="grid gap-1 sm:grid-cols-2">
            {(panel === "search" ? results : allNav).map((n) => <Button key={n.to} asChild variant="ghost" className="justify-start whitespace-normal text-left"><Link to={n.to} onClick={() => setPanel(null)}><n.icon />{n.label}</Link></Button>)}
            {panel === "search" && results.length === 0 && <p className="py-4 text-sm text-muted-foreground">No pages found for “{query}”.</p>}
            {panel === "menu" && user && <Button variant="outline" onClick={signOut}>Log out</Button>}
            {panel === "menu" && !user && <><Button asChild variant="outline"><Link to="/login" onClick={() => setPanel(null)}>Log in</Link></Button><Button asChild><Link to="/signup" onClick={() => setPanel(null)}>Join Nexus</Link></Button></>}
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function Card({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`glass p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-2">
          {title && <h2 className="text-sm font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageIntro({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-4 px-1">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}
