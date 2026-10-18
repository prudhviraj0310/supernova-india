import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Home, Palette, Boxes, Code2, Figma, Bot, BookOpen, HeartPulse, Search, Bell, Sparkles,
} from "lucide-react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/styles", label: "Colours & styles", icon: Palette },
  { to: "/components", label: "Building blocks", icon: Boxes },
  { to: "/figma", label: "Figma sync", icon: Figma },
  { to: "/export", label: "Get code", icon: Code2 },
  { to: "/ai", label: "AI helper", icon: Bot },
  { to: "/guide", label: "Guide", icon: BookOpen },
  { to: "/health", label: "System health", icon: HeartPulse },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const current = nav.find((n) => n.to === path);
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
            <button aria-label="Search" className="glass grid h-10 w-10 place-items-center !rounded-full"><Search className="h-4 w-4" /></button>
            <button aria-label="Notifications" className="glass grid h-10 w-10 place-items-center !rounded-full"><Bell className="h-4 w-4" /></button>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">PN</span>
          </div>
        </header>
        <div className="relative flex gap-4 px-3 pb-20 sm:px-5 md:pb-5">
          <nav className="hidden w-14 shrink-0 flex-col items-center gap-3 pt-6 md:flex">
            {nav.map((n) => {
              const active = n.to === path;
              return (
                <Link key={n.to} to={n.to} title={n.label} aria-label={n.label}
                  className={`group relative grid h-11 w-11 place-items-center rounded-full transition ${active ? "bg-primary text-primary-foreground shadow-lg" : "glass !rounded-full text-muted-foreground hover:text-foreground"}`}>
                  <n.icon className="h-[18px] w-[18px]" />
                  <span className="pointer-events-none absolute left-14 z-20 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1 text-xs text-background opacity-0 transition group-hover:opacity-100">{n.label}</span>
                </Link>
              );
            })}
          </nav>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <nav className="glass fixed inset-x-3 bottom-3 z-30 flex justify-between overflow-x-auto p-1.5 md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} aria-label={n.label}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${n.to === path ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            <n.icon className="h-[18px] w-[18px]" />
          </Link>
        ))}
      </nav>
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
