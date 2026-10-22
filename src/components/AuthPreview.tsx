import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Boxes, Sparkles } from "lucide-react";
import "@lovable.dev/cloud-auth-js/styles.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";

export function AuthPreview({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate();
  const { user, name: current } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    if (signup) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { display_name: name } } });
      if (error) setMsg({ ok: false, text: error.message });
      else if (!data.session) setMsg({ ok: true, text: "Almost done! Check your email and click the link to confirm your account." });
      else navigate({ to: "/" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ ok: false, text: error.message === "Invalid login credentials" ? "Wrong email or password." : error.message });
      else navigate({ to: "/" });
    }
    setBusy(false);
  }

  async function social(p: "google" | "lovable") {
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin });
    if (r.error) setMsg({ ok: false, text: "Sign-in did not finish. Please try again." });
    else if (!r.redirected) navigate({ to: "/" });
  }

  return (
    <div className="mx-auto grid min-h-[540px] max-w-4xl items-center gap-10 px-3 py-10 md:grid-cols-2">
      <div>
        <Sparkles className="mb-6 h-9 w-9 text-primary" />
        <p className="mb-3 text-sm font-semibold text-primary">Nexus · Made for Indian teams</p>
        <h1 className="text-4xl font-semibold leading-tight">{signup ? "Your next design system starts here." : "Welcome back to Nexus."}</h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">Your colours, building blocks and code. One shared language for every screen your team creates.</p>
        <div className="mt-8 flex items-center gap-3 text-sm"><Boxes className="h-5 w-5 text-primary" /> Web · iOS · Android</div>
      </div>
      <section className="glass p-7 sm:p-8" aria-label={signup ? "Create account" : "Sign in"}>
        {user ? (
          <>
            <h2 className="text-2xl font-semibold">You're signed in</h2>
            <p className="mt-3 text-sm text-muted-foreground">Signed in as {current}.</p>
            <Button asChild className="mt-6 w-full"><Link to="/">Go to your workspace</Link></Button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">{signup ? "Create your account" : "Log in"}</h2>
            <div className="mt-5 grid gap-2">
              <Button type="button" variant="outline" className="w-full" onClick={() => social("google")}>Continue with Google</Button>
              <button type="button" className="lovable-auth-button" onClick={() => social("lovable")}>Continue with Lovable</button>
            </div>
            <p className="my-4 text-center text-xs text-muted-foreground">or use your email</p>
            <form onSubmit={submit} className="grid gap-3">
              {signup && <Input aria-label="Your name" placeholder="Your name, e.g. Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} required maxLength={60} />}
              <Input aria-label="Email" type="email" placeholder="you@company.in" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input aria-label="Password" type="password" placeholder="Password (6+ characters)" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="submit" size="lg" disabled={busy}>{busy ? "Please wait…" : signup ? "Create account" : "Log in"}</Button>
            </form>
            {msg && <p role="status" className={`mt-4 text-sm ${msg.ok ? "text-success" : "text-destructive"}`}>{msg.text}</p>}
            <p className="mt-6 text-sm text-muted-foreground">{signup ? "Already have an account?" : "New to Nexus?"} <Link to={signup ? "/login" : "/signup"} className="font-semibold text-primary underline underline-offset-4">{signup ? "Log in" : "Join Nexus"}</Link></p>
          </>
        )}
      </section>
    </div>
  );
}
