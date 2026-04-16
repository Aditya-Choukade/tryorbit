"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

interface ValidationResult {
  verdict: "Build" | "Validate Further" | "High Risk";
  score: number;
  marketSize: string;
  targetCustomer: string;
  competitors: string[];
  keyRisks: string[];
  uniqueAngle: string;
  firstStep: string;
}

const VERDICT_STYLES: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  "Build":            { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "rocket_launch" },
  "Validate Further": { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   icon: "labs" },
  "High Risk":        { bg: "bg-red-50",     border: "border-red-200",     text: "text-red-700",     icon: "warning" },
};

export default function ValidatePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const passedIdea = searchParams.get('idea');
    if (passedIdea) {
      setIdea(passedIdea);
      // Auto-trigger validation if desired, or let user click
    }
  }, []);

  async function handleValidate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!idea.trim() || idea.trim().length < 10) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
      } else {
        setError(json.message || "Validation failed. Try again.");
      }
    } catch {
      setError("Could not reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  const verdictStyle = result ? (VERDICT_STYLES[result.verdict] ?? VERDICT_STYLES["Validate Further"]) : null;

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[81px] pb-32">
        <section className="px-12 max-w-5xl mx-auto">

          {/* Hero */}
          <div className={`text-center transition-all duration-700 ${result ? "mb-16 pt-10" : "mb-32 pt-24"} animate-fade-in-up`}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 block opacity-60">Insight Generation Engine</span>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 text-on-surface">
              What are you <br />
              <span className="font-serif italic font-light text-primary">building?</span>
            </h1>

            {/* Input Container */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <form onSubmit={handleValidate} className="relative flex items-center bg-white border border-outline rounded-3xl p-3 pr-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.08)] focus-within:border-primary/50 transition-all duration-300 ring-4 ring-transparent focus-within:ring-primary/5">
                <input
                  id="idea-input"
                  value={idea}
                  onChange={e => setIdea(e.target.value)}
                  className="w-full bg-transparent border-none py-4 px-6 text-xl focus:ring-0 placeholder:text-secondary/40 font-light text-on-surface"
                  placeholder="Describe your startup idea..."
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || idea.trim().length < 10}
                  className="bg-on-surface hover:bg-primary disabled:bg-surface-container-highest text-surface w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-black/5 active:scale-95 shrink-0"
                >
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-2xl font-black">arrow_forward</span>
                  }
                </button>
              </form>
              <div className="mt-8 flex justify-center gap-8 animate-fade-in-up stagger-1">
                {["Growth Model", "Target Market", "Key Risks", "Competitive Edge"].map((feat, i) => (
                  <div key={feat} className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[9px] font-black text-secondary uppercase tracking-widest">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-6 animate-fade-in-up">
               <div className="relative">
                 <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl animate-pulse">auto_awesome</span>
                 </div>
               </div>
              <div className="text-center">
                <p className="text-sm text-on-surface font-black uppercase tracking-widest animate-pulse">Synthesizing Market Intel</p>
                <p className="text-[10px] text-secondary mt-1 font-bold uppercase tracking-widest opacity-60">This typically takes 20 seconds</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="max-w-2xl mx-auto bg-red-50 border border-red-100 rounded-2xl px-6 py-4 flex items-center gap-4 animate-fade-in-up">
              <span className="material-symbols-outlined text-red-500">error_outline</span>
              <p className="text-sm text-red-800 font-bold">{error}</p>
              <button onClick={() => setError(null)} className="ml-auto text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Dismiss</button>
            </div>
          )}

          {/* Results */}
          {result && !loading && verdictStyle && (
            <div className="space-y-8 animate-fade-in-up">

              {/* Verdict + Score */}
              <div className={`rounded-3xl p-10 border-2 magazine-shadow flex flex-col md:flex-row items-center gap-10 ${verdictStyle.bg} ${verdictStyle.border}`}>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary/60 mb-4">AI Validation Verdict</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${verdictStyle.bg} border-2 ${verdictStyle.border} flex items-center justify-center shadow-sm`}>
                       <span className={`material-symbols-outlined text-3xl ${verdictStyle.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>{verdictStyle.icon}</span>
                    </div>
                    <h2 className={`text-5xl font-black tracking-tighter ${verdictStyle.text}`}>{result.verdict}</h2>
                  </div>
                  <p className="text-lg text-on-surface font-light leading-relaxed font-serif italic italic">&quot;{result.uniqueAngle}&quot;</p>
                </div>
                
                <div className="text-center shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-black/5 pt-8 md:pt-0 md:pl-10">
                  <div className="relative inline-block">
                    <span className={`text-8xl font-black ${verdictStyle.text} tracking-tighter`}>{result.score}</span>
                    <span className={`text-xl font-black ${verdictStyle.text} absolute -top-1 -right-4`}>%</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mt-2">Demand Index</p>
                  <div className="w-32 h-2 bg-white/60 rounded-full mt-4 overflow-hidden mx-auto shadow-inner">
                    <div className="h-full bg-current rounded-full transition-all duration-1000 ease-out" style={{ width: `${result.score}%`, color: result.score > 70 ? '#10b981' : (result.score > 40 ? '#f59e0b' : '#ef4444') }} />
                  </div>
                </div>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                 {[
                   { label: "Market Dynamics", val: result.marketSize, icon: "analytics", color: "text-blue-500" },
                   { label: "High-Intent Persona", val: result.targetCustomer, icon: "target", color: "text-purple-500" }
                 ].map((item, i) => (
                   <div key={i} className="bg-white p-8 rounded-3xl border border-outline shadow-sm hover:border-primary/20 transition-all stagger-1 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                     <div className="flex items-center gap-3 mb-6">
                       <span className={`material-symbols-outlined ${item.color} text-2xl`}>{item.icon}</span>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40">{item.label}</p>
                     </div>
                     <p className="text-[15px] text-on-surface font-medium leading-relaxed">{item.val}</p>
                   </div>
                 ))}

                {/* Competitors */}
                <div className="bg-white p-8 rounded-3xl border border-outline shadow-sm hover:border-primary/20 transition-all animate-fade-in-up stagger-2">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-amber-500 text-2xl">swords</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40">Competitor Landscape</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {result.competitors.map((c, i) => (
                      <span key={i} className="px-4 py-1.5 bg-surface-container rounded-xl text-[10px] font-black text-secondary tracking-widest uppercase hover:text-primary transition-colors cursor-default border border-outline-variant">{c}</span>
                    ))}
                    {result.competitors.length === 0 && <span className="text-xs italic text-secondary/40 uppercase font-black">Open Market Field</span>}
                  </div>
                </div>

                {/* Key Risks */}
                <div className="bg-white p-8 rounded-3xl border border-outline shadow-sm hover:border-primary/20 transition-all animate-fade-in-up stagger-3">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-red-500 text-2xl">distance</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40">Critical Risk Profile</p>
                  </div>
                  <ul className="space-y-4">
                    {result.keyRisks.map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0 shadow-sm" />
                        <span className="text-sm text-on-surface font-light leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Roadmap */}
              <div className="bg-on-surface text-surface rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl animate-fade-in-up stagger-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                   <span className="material-symbols-outlined text-primary text-3xl">map</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2">Strategy: Phase 01</p>
                  <p className="text-xl text-surface font-black tracking-tight leading-tight">{result.firstStep}</p>
                </div>
                <button 
                  onClick={() => { setResult(null); setIdea(""); setError(null); }}
                  className="px-8 py-3 bg-white text-on-surface rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5 whitespace-nowrap"
                >
                  Start New Analysis
                </button>
              </div>

            </div>
          )}
        </section>
      </main>
    </div>
  );
}
