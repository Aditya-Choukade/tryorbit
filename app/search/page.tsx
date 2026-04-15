"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface Problem {
  id: string;
  problem: string;
  industry: string;
  summary: string;
  orbitScore: number;
  scoreLabel: string;
  subreddit: string;
  upvotes: number;
  url: string;
}

// Skeleton and styling helpers
function SkeletonCard({ index }: { index: number }) {
  return (
    <div 
      className="bg-white rounded-xl border border-outline-variant p-4 flex items-center gap-6 animate-shimmer opacity-60"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="w-12 h-12 rounded-lg bg-surface-container shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-2 w-24 bg-surface-container rounded" />
        <div className="h-4 w-full bg-surface-container rounded" />
      </div>
      <div className="w-16 h-4 bg-surface-container rounded ml-auto" />
    </div>
  );
}

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color = label === "High Opportunity" ? "text-primary" : label === "Medium" ? "text-amber-500" : "text-slate-400";
  return (
    <div className="w-14 h-14 rounded-2xl bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant group-hover:bg-primary/5 transition-colors">
      <span className={`text-lg font-black ${color}`}>{score}</span>
      <span className="text-[7px] font-black text-secondary/40 uppercase tracking-tighter">ORBIT</span>
    </div>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [inputValue, setInputValue] = useState(initialQ);
  const [results, setResults] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
      const json = await res.json();
      setResults(json.success ? json.data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search on load if q param is present
  useEffect(() => {
    if (initialQ) doSearch(initialQ);
  }, [initialQ, doSearch]);

  // Debounced real-time search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== query) {
        setQuery(inputValue);
        doSearch(inputValue);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue, query, doSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setQuery(inputValue);
    doSearch(inputValue);
  }

  return (
    <div className="text-on-surface flex flex-col min-h-screen bg-background">
      {/* eslint-disable @next/next/no-img-element */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-outline shadow-sm transition-all">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-primary transition-colors">Orbit</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-primary transition-colors" href="/dashboard">Feed</Link>
            <Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-primary transition-colors" href="/validate">Validate Idea</Link>
          </div>
        </div>

        {/* Active search bar */}
        <div className="flex-1 max-w-xl px-8">
          <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-2xl px-4 py-2 gap-3 ring-2 ring-primary/10 border border-outline focus-within:ring-primary/30 transition-all shadow-sm group">
            <span className="material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors">search</span>
            <input
              id="search-input"
              name="q"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs w-full font-bold text-on-surface"
              placeholder="Search problems (e.g. Fintech, SaaS, payments...)"
              autoFocus
              type="text"
            />
            {inputValue && (
              <button type="button" onClick={() => { setInputValue(""); setQuery(""); setResults([]); setSearched(false); }}
                className="material-symbols-outlined text-secondary text-sm hover:text-primary p-1 rounded-full hover:bg-surface-container transition-all">close</button>
            )}
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="bg-on-surface text-surface px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-sm">
            Exit Search
          </Link>
        </div>
      </nav>

      <main className="flex-1 pt-[81px] pb-20 px-8 max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="mb-10 animate-fade-in-up">
            {searched ? (
              <div>
                <h1 className="text-3xl font-black tracking-tight leading-none mb-2">Search results</h1>
                <p className="text-xs text-secondary font-bold uppercase tracking-widest opacity-60">
                   {loading ? "Searching vault..." : `Found ${results.length} validated gaps`}
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-black tracking-tighter leading-none mb-2 text-on-surface">Decision <span className="italic font-normal text-primary font-serif">Cloud</span></h1>
                <p className="text-xs text-secondary font-bold uppercase tracking-widest opacity-60">Real-time market gap extraction from live social signals.</p>
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <SkeletonCard key={i} index={i} />)}
            </div>
          )}

          {/* Empty initial state */}
          {!loading && !searched && (
            <div className="flex flex-col items-center justify-center py-40 animate-fade-in-up">
              <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-secondary/30">saved_search</span>
              </div>
              <h2 className="text-xl font-black mb-2 tracking-tight">Ready to scan the markets?</h2>
              <p className="text-sm text-secondary/60 mb-10 max-w-xs text-center font-medium">Search across our database of high-urgency business problems.</p>
              
              <div className="flex gap-2 flex-wrap justify-center max-w-md">
                {["Fintech", "SaaS", "payments", "freelance", "hiring", "real estate", "health"].map((hint, i) => (
                  <button 
                    key={hint} 
                    onClick={() => { setInputValue(hint); setQuery(hint); doSearch(hint); }}
                    className="px-4 py-2 bg-white border border-outline rounded-xl text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary hover:border-primary/40 hover:shadow-sm transition-all animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && searched && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 animate-fade-in-up text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-400">
                <span className="material-symbols-outlined text-4xl">search_off</span>
              </div>
              <h3 className="text-xl font-black mb-2">No matching signals</h3>
              <p className="text-sm text-secondary font-medium italic">&quot;{query}&quot; didn't trigger any gaps in our database</p>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="space-y-4">
              {results.map((problem, idx) => (
                <div 
                  key={problem.id} 
                  className="bg-white rounded-2xl border border-outline hover:border-primary/30 p-5 transition-all group flex items-center gap-6 shadow-sm hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <ScoreBadge score={problem.orbitScore} label={problem.scoreLabel} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 overflow-hidden">
                      <span className="text-[9px] font-black tracking-[0.2em] uppercase text-primary bg-primary/5 px-2 py-0.5 rounded">{problem.industry}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant shrink-0" />
                      <span className="text-[10px] font-bold text-secondary line-clamp-1">{problem.scoreLabel} ({problem.orbitScore}%)</span>
                    </div>
                    <h4 className="text-[15px] font-black text-on-surface leading-tight group-hover:text-primary transition-colors">
                      {problem.problem}
                    </h4>
                  </div>
                  <div className="hidden sm:block max-w-sm shrink-0 border-l border-outline-variant pl-4">
                    <p className="text-[11px] text-secondary font-medium leading-relaxed italic font-serif line-clamp-1">&quot;{problem.summary}&quot;</p>
                  </div>
                  <div className="flex items-center gap-4 ml-auto shrink-0">
                    <Link href={`/problem/${problem.id}`}
                      className="bg-on-surface text-surface px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-primary transition-all active:scale-95 shadow-sm">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
      </main>
    </div>
  );
}
