"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      if (isSignUp) {
        setMessage("Check your email for a confirmation link.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <Link href="/" className="mb-12 flex items-center gap-3 group animate-fade-in-up">
        <img src="/orbit-logo.png" alt="Orbit Logo" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-3xl font-black tracking-tighter">Orbit</span>
      </Link>

      <div className="w-full max-w-md bg-white border border-outline rounded-3xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] animate-fade-in-up">
        <h2 className="text-3xl font-black tracking-tight mb-2">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-sm text-secondary font-medium mb-10">
          {isSignUp 
            ? "Start finding your next high-demand market gap." 
            : "Sign in to access your personalized feed and saved gaps."
          }
        </p>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container border border-outline px-5 py-4 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline px-5 py-4 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-xs font-bold border ${message.includes("Check") ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-on-surface text-surface py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-xl shadow-black/5 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : null}
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-outline text-center">
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(null); }}
            className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up Free"}
          </button>
        </div>
      </div>

      <div className="mt-12 text-center text-[10px] font-black uppercase tracking-widest text-secondary/40">
        Secured by Supabase Auth
      </div>
    </div>
  );
}
