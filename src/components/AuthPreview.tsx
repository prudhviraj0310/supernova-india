import { Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthPreview({ signup = false }: { signup?: boolean }) {
  return (
    <div className="mx-auto grid min-h-[540px] max-w-4xl items-center gap-10 px-3 py-10 md:grid-cols-2">
      <div>
        <Sparkles className="mb-6 h-9 w-9 text-primary" />
        <p className="mb-3 text-sm font-semibold text-primary">Nexus · Made for Indian teams</p>
        <h1 className="text-4xl font-semibold leading-tight">{signup ? "Your next design system starts here." : "Welcome back to Nexus."}</h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">Your colours, building blocks and code. One shared language for every screen your team creates.</p>
        <div className="mt-8 flex items-center gap-3 text-sm"><Boxes className="h-5 w-5 text-primary" /> Web · iOS · Android</div>
      </div>
      <section className="glass p-7 sm:p-8" aria-label={signup ? "Account registration" : "Sign in"}>
        <span className="rounded-full bg-warning-soft px-3 py-1 text-xs font-semibold text-warning">Preview workspace</span>
        <h2 className="mt-5 text-2xl font-semibold">{signup ? "Explore Nexus" : "Open the workspace"}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Real accounts are not available yet. Explore the sample workspace without an email or password. Nothing is saved to an account.</p>
        <Button asChild className="mt-6 w-full" size="lg"><Link to="/">Continue to demo <ArrowRight /></Link></Button>
        <p className="mt-6 text-sm text-muted-foreground">{signup ? "Already looking for sign in?" : "New to Nexus?"} <Link to={signup ? "/login" : "/signup"} className="font-semibold text-primary underline underline-offset-4">{signup ? "Log in" : "Join Nexus"}</Link></p>
      </section>
    </div>
  );
}