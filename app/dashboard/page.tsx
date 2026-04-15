"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSavedProblems } from "../hooks/useSavedProblems";

// Type definition for a problem from the API
interface Problem {
  id: string;
  problem: string;
  industry: string;
  summary: string;
  tags: string[];
  source: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  url: string;
  orbitScore: number;    // 0–100 from backend scoreService
  scoreLabel: string;   // "High Opportunity" | "Medium" | "Low"
}

// Map scoreLabel to a confidence display string
function confidenceLabel(scoreLabel: string, orbitScore: number): string {
  if (scoreLabel === 'High Opportunity') return `Very High (${orbitScore}%)`;
  if (scoreLabel === 'Medium') return `Moderate (${orbitScore}%)`;
  return `Low (${orbitScore}%)`;
}

// Skeleton loading card to keep layout while fetching
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
        <div className="h-2 w-3/4 bg-surface-container rounded" />
      </div>
      <div className="w-24 h-4 bg-surface-container rounded ml-auto hidden xl:block" />
    </div>
  );
}

export default function Page() {
  const { savedProblems, toggleSave, isSaved } = useSavedProblems();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [sortBy, setSortBy] = useState<'orbit_score' | 'newest' | 'trend'>('orbit_score');
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  
  // To avoid counts jumping while filtering
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  async function fetchProblems(sort = sortBy, industry = industryFilter, isInitial = false) {
    if (isInitial) setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ sort });
      if (industry) params.set('industry', industry);
      const res = await fetch(`/api/problems?${params}`, { cache: "no-store" });
      const json = await res.json();

      if (json.syncing) {
        setSyncing(true);
        if (isInitial) setProblems([]);
        setTimeout(() => fetchProblems(sort, industry, false), 15000);
        return;
      }

      setSyncing(false);
      setIsFallback(!!json.fallback);

      if (json.success && json.data.length > 0) {
        setProblems(json.data);
        
        // Update counts once if we have all data (only when filter is null for accurate total sidebar)
        if (!industry) {
          const counts: Record<string, number> = {};
          json.data.forEach((p: Problem) => {
            counts[p.industry] = (counts[p.industry] || 0) + 1;
          });
          setCategoryCounts(counts);
        }
      } else {
        setProblems([]);
      }
    } catch (err) {
      console.error("Failed to fetch problems:", err);
      setError("Failed to load problems. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Scroll to top of main content area on filter change
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProblems(sortBy, industryFilter, problems.length === 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, industryFilter]);

  // Manual sync trigger
  async function triggerSync() {
    setSyncing(true);
    try {
      await fetch("/api/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      setTimeout(() => window.location.reload(), 15000); 
    } catch { setSyncing(false); }
  }

  // Segmenting problems
  const heroProblem = problems[0] || null;
  const heroScore = heroProblem ? heroProblem.orbitScore : 0;
  const heroLabel = heroProblem ? heroProblem.scoreLabel : '';
  const feedProblems = problems.slice(1);

  return (
    <div className="text-on-surface flex flex-col h-screen overflow-hidden bg-background">
      {/* eslint-disable @next/next/no-img-element */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-outline shadow-sm transition-all">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-primary transition-colors">Orbit</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link className="text-primary text-sm font-bold border-b-2 border-primary font-['Inter'] relative py-1" href="/dashboard">Feed</Link>
            <Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-primary transition-colors py-1" href="/validate">Validate Idea</Link>
            <Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-primary transition-colors py-1 flex items-center gap-1.5" href="/saved">
              Saved
              {savedProblems.length > 0 && (
                <span className="bg-primary/10 text-primary text-[9px] px-1.5 rounded-full font-black">
                  {savedProblems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-xl px-8 relative">
          <form action="/search" className="flex items-center bg-surface-container rounded-2xl px-4 py-2 gap-3 transition-all focus-within:ring-2 focus-within:ring-primary/20 border border-transparent focus-within:border-primary/20 focus-within:bg-white group">
            <span className="material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors">search</span>
            <input name="q" className="bg-transparent border-none focus:ring-0 text-xs w-full font-medium" placeholder="Search problems (e.g. Fintech)..." type="text"/>
            <div className="hidden sm:flex items-center gap-1 opacity-40 group-focus-within:opacity-0 transition-opacity">
              <span className="text-[10px] border border-outline rounded px-1 px-1.5">⌘</span>
              <span className="text-[10px] border border-outline rounded px-1 px-1.5">K</span>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={triggerSync} className="bg-on-surface text-surface px-4 py-2 rounded-lg font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-lg shadow-black/5">
            Collect Signal
          </button>
          <div className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center overflow-hidden border border-outline hover:border-primary transition-colors cursor-pointer">
            <img alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzEtQ0zxP4hscHxfuquKtAwx0wIub6vket9h8rnmNb5R-pcR6zuJnqZoJUagNfmPYpzqxQNiBgzvz2mpKjh0IkKj4BobbooDh4706GG5Ezg742LqEumCdsdaDR4y3Arw64JNxDBkMymRhVLqNEUmGWShf6eWytN0Gu6aryva7EwonxVy74Hs_a6eHjh98Omre2qpqW12024Wpx_JNnJvoarNANd4xMR6w_4h3_m4cBZFKu38FwQYd3OXR5JtqNrQvfYkIi59sNKQU5"/>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-[61px] overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[280px] bg-white border-r border-outline flex flex-col p-8 shrink-0 overflow-y-auto custom-scrollbar">
          <div className="sticky top-0 bg-white pb-6">
            <h1 className="text-3xl font-black tracking-tighter leading-none mb-2">Decision <span className="italic font-normal text-primary font-serif">Engine</span></h1>
            <p className="text-on-surface-variant text-[10px] font-medium leading-relaxed uppercase tracking-widest opacity-60">Curation Service v5.0</p>
          </div>
          
          <div className="mt-8 space-y-8 flex-1">
            <div>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-secondary block mb-4">Categories</span>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setIndustryFilter(null)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group active-category-pill ${
                    !industryFilter ? 'bg-primary/5 text-primary' : 'hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  <span>All Signals</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${!industryFilter ? 'bg-primary/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                    {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
                  </span>
                </button>

                {Object.entries(categoryCounts).sort().map(([industry, count]) => (
                  <button
                    key={industry}
                    onClick={() => setIndustryFilter(industryFilter === industry ? null : industry)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                      industryFilter === industry
                        ? 'bg-primary/5 text-primary font-bold active-category-pill'
                        : 'hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{industry}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${industryFilter === industry ? 'bg-primary/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-outline">
            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 group cursor-pointer hover:bg-primary/10 transition-colors">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[12px]">auto_awesome</span> PRO ACCESS
              </p>
              <p className="text-[11px] leading-relaxed text-secondary mb-4 font-medium">Get raw Reddit export & custom scoring models.</p>
              <button className="w-full py-2.5 bg-on-surface text-surface rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">Upgrade Plan</button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main ref={containerRef} className="flex-1 overflow-y-auto bg-surface px-8 py-8 relative custom-scrollbar">
          
          {/* Status Messages */}
          <div className="max-w-4xl mx-auto space-y-4 mb-8">
            {syncing && (
              <div className="flex items-center gap-4 px-5 py-4 bg-primary/5 border border-primary/20 rounded-2xl animate-fade-in-up">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Collecting Market Signals</p>
                  <p className="text-[10px] text-secondary mt-0.5">AI is extracting pain-points from /r/entrepreneur. Updating feed in 15s.</p>
                </div>
              </div>
            )}
            
            {isFallback && !syncing && (
              <div className="flex items-center gap-4 px-5 py-3 bg-amber-50 border border-amber-200 rounded-2xl animate-fade-in-up">
                <span className="material-symbols-outlined text-amber-500 text-lg">database_off</span>
                <p className="text-xs text-amber-900 font-bold flex-1">Database connection is currently limited. Data may be stale.</p>
                <button onClick={triggerSync} className="text-[10px] font-black uppercase text-amber-700 hover:text-amber-900 transition-colors underline">Refresh Now</button>
              </div>
            )}
          </div>

          {/* Loading Skeletons */}
          {loading && problems.length === 0 && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="h-48 w-full rounded-2xl bg-surface-container animate-shimmer mb-10" />
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} index={i} />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && problems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-red-500 text-3xl">cloud_off</span>
              </div>
              <h3 className="text-lg font-bold mb-1">Retrieval Failed</h3>
              <p className="text-sm text-secondary max-w-xs">{error}</p>
              <button onClick={() => fetchProblems()} className="mt-6 px-8 py-2.5 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all">Retry Fetch</button>
            </div>
          )}

          {/* Actual Feed Content */}
          {!loading && problems.length === 0 && !syncing && (
             <div className="flex flex-col items-center justify-center py-40 animate-fade-in-up text-center">
               <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
                 <span className="material-symbols-outlined text-secondary/40 text-4xl">inventory_2</span>
               </div>
               <h3 className="text-xl font-black mb-2 tracking-tight">Zero Signals Available</h3>
               <p className="text-sm text-secondary/60 max-w-xs mx-auto mb-8 font-medium italic">We haven't indexed any problems for {industryFilter || 'this sector'} yet.</p>
               <button onClick={triggerSync} className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">Trigger AI Scanner</button>
             </div>
          )}

          <div className={`max-w-4xl mx-auto transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
            {/* Hero Card */}
            {heroProblem && (
              <div className="mb-12 animate-fade-in-up">
                <div className="bg-white rounded-3xl p-10 magazine-shadow border border-outline relative overflow-hidden flex flex-col md:flex-row items-center gap-10 hover:border-primary/20 transition-all group">
                  <div className="flex-1 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-6">
                      <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-[9px] font-black tracking-[0.3em] uppercase">Premium Market Gap</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter mb-4 text-on-surface leading-[1.1] group-hover:text-primary transition-colors">{heroProblem.problem}</h2>
                    <p className="text-base text-secondary font-light mb-8 italic font-serif leading-relaxed line-clamp-2">&quot;{heroProblem.summary}&quot;</p>
                    
                    <div className="flex flex-wrap gap-8 items-center">
                      <div className="flex gap-8">
                        <div>
                          <span className="text-[8px] font-black tracking-[0.2em] uppercase text-secondary/40 block mb-1">Industry</span>
                          <p className="text-[11px] font-black text-on-surface">{heroProblem.industry}</p>
                        </div>
                        <div>
                          <span className="text-[8px] font-black tracking-[0.2em] uppercase text-secondary/40 block mb-1">Source</span>
                          <p className="text-[11px] font-black text-on-surface">r/{heroProblem.subreddit}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 ml-auto">
                        <a href={heroProblem.url} target="_blank" rel="noopener noreferrer" className="bg-on-surface text-surface px-6 py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-primary transition-all active:scale-95">Reddit Link</a>
                        <Link href={`/problem/${heroProblem.id}`} className="bg-surface-container px-6 py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-surface-container-high transition-all border border-outline-variant">Explore Gap</Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-44 h-44 shrink-0 bg-surface-container-low rounded-3xl p-6 flex flex-col items-center justify-center relative border border-outline shadow-inner">
                    <div className="orbit-glow absolute inset-0 rounded-3xl" />
                    <div className="relative flex flex-col items-center">
                      <span className="text-5xl font-black text-on-surface mb-1">{heroScore}</span>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${heroLabel === 'High Opportunity' ? 'bg-primary' : 'bg-secondary'}`} />
                        <span className="text-[10px] font-black tracking-widest uppercase text-secondary">{heroLabel === 'High Opportunity' ? 'High' : (heroLabel === 'Medium' ? 'Med' : 'Low')}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 text-[7px] font-bold text-secondary uppercase tracking-[0.2em] opacity-40">ORBIT SCORE</div>
                  </div>
                </div>
              </div>
            )}

            {/* Discovery Feed */}
            {feedProblems.length > 0 && (
              <div className="animate-fade-in-up stagger-1">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                       Market Discovery Feed
                       {industryFilter && <span className="text-primary italic font-serif text-sm font-light">in {industryFilter}</span>}
                    </h3>
                    <p className="text-[11px] font-medium text-secondary/60 uppercase tracking-widest mt-1">Found {problems.length} validated opportunities</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Curation:</span>
                    <div className="flex bg-surface-container p-1 rounded-xl">
                      {['orbit_score', 'newest', 'trend'].map((s) => (
                        <button 
                          key={s}
                          onClick={() => setSortBy(s as any)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            sortBy === s ? 'bg-white text-primary shadow-sm' : 'text-secondary/50 hover:text-secondary'
                          }`}
                        >
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {loading && feedProblems.length > 0 ? (
                    // Subtle loading state when we already have data
                    [...Array(6)].map((_, i) => <SkeletonCard key={i} index={i} />)
                  ) : (
                    feedProblems.map((problem, idx) => (
                      <div 
                        key={problem.id} 
                        className="bg-white rounded-2xl border border-outline p-5 flex items-center gap-6 transition-all hover:border-primary/30 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] group cursor-default animate-fade-in-up"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant group-hover:bg-primary/5 transition-colors">
                          <span className={`text-lg font-black ${problem.orbitScore > 70 ? 'text-primary' : 'text-on-surface'}`}>{problem.orbitScore}</span>
                          <span className="text-[7px] font-black text-secondary/40 uppercase tracking-tighter">ORBIT</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5 overflow-hidden">
                            <span className="text-[9px] font-black tracking-[0.2em] uppercase text-primary bg-primary/5 px-2 py-0.5 rounded shrink-0">{problem.industry}</span>
                            <span className="w-1 h-1 rounded-full bg-outline-variant shrink-0" />
                            <span className="text-[10px] font-bold text-secondary line-clamp-1">{confidenceLabel(problem.scoreLabel, problem.orbitScore)}</span>
                          </div>
                          <h4 className="text-[15px] font-black text-on-surface leading-tight group-hover:text-primary transition-colors duration-200">{problem.problem}</h4>
                          <div className="flex gap-2 mt-2">
                             {problem.tags.slice(0, 3).map((tag, i) => (
                               <span key={i} className="text-[9px] font-bold text-secondary uppercase tracking-widest opacity-40">#{tag}</span>
                             ))}
                          </div>
                        </div>

                        <div className="hidden lg:block max-w-[280px] shrink-0 border-l border-outline-variant pl-6">
                          <p className="text-[11px] text-secondary font-medium leading-relaxed italic font-serif line-clamp-2">&quot;{problem.summary}&quot;</p>
                        </div>

                        <div className="flex items-center gap-3 ml-auto pl-4">
                          <button 
                            onClick={() => toggleSave(problem)}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                              isSaved(problem.id) 
                                ? "bg-primary/10 text-primary" 
                                : "bg-surface-container text-secondary hover:text-primary hover:bg-primary/10"
                            }`}
                          >
                            <span className="material-symbols-outlined text-lg" style={isSaved(problem.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                              {isSaved(problem.id) ? "bookmark" : "bookmark"}
                            </span>
                          </button>
                          <Link href={`/problem/${problem.id}`} className="bg-on-surface text-surface px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-primary transition-all active:scale-95 shadow-sm shadow-black/5">Open Gap</Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
