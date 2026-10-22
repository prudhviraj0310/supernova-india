import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });
    supabase.auth.getUser().then(({ data: d }) => { setUser(d.user ?? null); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  const name = (user?.user_metadata?.display_name as string | undefined) ?? (user?.user_metadata?.full_name as string | undefined) ?? user?.email?.split("@")[0];
  return { user, ready, name };
}
