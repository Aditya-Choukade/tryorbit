"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Page() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProblems() {
      try {
        // Call our own Next.js proxy instead of the backend directly.
        // This avoids CORS errors and browser network issues entirely.
        const res = await fetch("/api/problems", { cache: "no-store" });
        const json = await res.json();

        if (json.success && json.data.length > 0) {
          setProblems(json.data);
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
    fetchProblems();
  }, []);

  // Compute category counts from real data
  const categoryCounts: Record<string, number> = {};
  problems.forEach((p) => {
    categoryCounts[p.industry] = (categoryCounts[p.industry] || 0) + 1;
  });

  // The first problem becomes the hero card
  const heroProblem = problems[0] || null;
  const heroScore = heroProblem ? heroProblem.orbitScore : 0;
  const heroLabel = heroProblem ? heroProblem.scoreLabel : '';

  // The rest go into the feed
  const feedProblems = problems.slice(1);

  return (
    <div className="text-on-surface flex flex-col">
      {/* eslint-disable @next/next/no-img-element */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-outline shadow-sm">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><span className="text-xl font-black tracking-tighter text-slate-900">Orbit</span></div>
<div className="hidden md:flex items-center gap-6">
<Link className="text-[#FF7F6A] text-sm font-bold border-b-2 border-[#FF7F6A] font-['Inter'] transition-colors duration-300" href="#">Feed</Link>
<Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-[#FF7F6A] transition-colors duration-300" href="/validate">Validate Idea</Link>
</div>
</div>
<div className="flex-1 max-w-xl px-8 relative group">
<form action="/search" className="flex items-center bg-surface-container-high rounded-xl px-4 py-1.5 gap-3 transition-all focus-within:ring-2 focus-within:ring-primary/20">
<span className="material-symbols-outlined text-on-surface-variant text-xl">search</span>
<input name="q" className="bg-transparent border-none focus:ring-0 text-xs w-full font-medium" placeholder="Search problems (e.g. Fintech)..." type="text"/>
</form>
</div>
<div className="flex items-center gap-4">
<button className="bg-on-surface text-surface px-4 py-2 rounded-lg font-bold text-[9px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 duration-200">
            New Discovery
        </button>
<button className="material-symbols-outlined text-on-surface-variant p-1.5 hover:bg-surface-container rounded-full transition-colors">notifications</button>
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline">
<img alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzEtQ0zxP4hscHxfuquKtAwx0wIub6vket9h8rnmNb5R-pcR6zuJnqZoJUagNfmPYpzqxQNiBgzvz2mpKjh0IkKj4BobbooDh4706GG5Ezg742LqEumCdsdaDR4y3Arw64JNxDBkMymRhVLqNEUmGWShf6eWytN0Gu6aryva7EwonxVy74Hs_a6eHjh98Omre2qpqW12024Wpx_JNnJvoarNANd4xMR6w_4h3_m4cBZFKu38FwQYd3OXR5JtqNrQvfYkIi59sNKQU5"/>
</div>
</div>
</nav>
<div className="flex flex-1 pt-[61px] overflow-hidden max-w-full">
<aside className="w-[320px] bg-white border-r border-outline flex flex-col p-8 shrink-0 overflow-y-auto custom-scrollbar">
<div className="sticky top-0 bg-white pb-6">
<h1 className="text-4xl font-black tracking-tighter leading-none mb-2">Decision <span className="italic font-normal text-primary font-serif">Engine</span></h1>
<p className="text-on-surface-variant text-xs font-light leading-relaxed">High-conviction market gaps algorithmically curated.</p>
</div>
<div className="mt-8 space-y-8">
<div>
<span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary block mb-4">Categories</span>
<div className="flex flex-col gap-1">
<button className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-surface-container text-xs font-bold">
<span>All Opportunities</span>
<span className="bg-white px-1.5 py-0.5 rounded text-[10px]">{problems.length}</span>
</button>
{Object.entries(categoryCounts).map(([industry, count]) => (
<button key={industry} className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-container text-xs font-medium text-on-surface-variant transition-colors">
<span>{industry}</span>
<span className="text-[10px]">{count}</span>
</button>
))}
</div>
</div>
<div className="pt-8 mt-auto border-t border-outline">
<div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Pro Feature</p>
<p className="text-xs leading-relaxed text-on-surface-variant mb-4 font-medium">Export raw signal data for custom validation models.</p>
<button className="w-full py-2 bg-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-widest">Upgrade to Analyst</button>
</div>
</div>
</div>
</aside>
<main className="flex-1 overflow-y-auto custom-scrollbar bg-surface px-8 py-8">

{/* ── Loading State ── */}
{loading && (
<div className="flex flex-col items-center justify-center py-32 gap-4">
  <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  <p className="text-sm text-on-surface-variant font-medium animate-pulse">Scanning Reddit for market signals...</p>
  <p className="text-[10px] text-secondary uppercase tracking-widest">This may take 30–60 seconds</p>
</div>
)}

{/* ── Error State ── */}
{error && !loading && (
<div className="flex flex-col items-center justify-center py-32 gap-4">
  <span className="material-symbols-outlined text-4xl text-red-400">error</span>
  <p className="text-sm text-on-surface-variant font-medium">{error}</p>
  <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all">Retry</button>
</div>
)}

{/* ── Empty State ── */}
{!loading && !error && problems.length === 0 && (
<div className="flex flex-col items-center justify-center py-32 gap-4">
  <span className="material-symbols-outlined text-4xl text-secondary">inbox</span>
  <p className="text-sm text-on-surface-variant font-medium">No problems found</p>
  <p className="text-xs text-secondary">Try a different subreddit or check back later.</p>
</div>
)}

{/* ── Hero Card (Best Opportunity) ── */}
{!loading && !error && heroProblem && (
<section className="mb-10">
<div className="bg-surface-bright rounded-2xl p-8 magazine-shadow border border-primary/10 relative overflow-hidden flex items-center gap-10">
<div className="flex-1 relative z-10">
<div className="inline-flex items-center gap-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full mb-4">
<span className="material-symbols-outlined text-[10px]" data-weight="fill">verified</span>
<span className="text-[9px] font-bold tracking-[0.2em] uppercase">Best Opportunity Today</span>
</div>
<h2 className="text-2xl font-black tracking-tight mb-2">{heroProblem.problem}</h2>
<p className="text-sm text-on-surface-variant font-light mb-6 italic font-serif">&quot;{heroProblem.summary}&quot;</p>
<div className="flex gap-10 items-center">
<div>
<span className="text-[8px] font-bold tracking-[0.2em] uppercase text-secondary block">Industry</span>
<p className="text-[11px] font-bold text-on-surface">{heroProblem.industry}</p>
</div>
<div>
<span className="text-[8px] font-bold tracking-[0.2em] uppercase text-secondary block">Source</span>
<p className="text-[11px] font-bold text-on-surface">r/{heroProblem.subreddit}</p>
</div>
<div>
<span className="text-[8px] font-bold tracking-[0.2em] uppercase text-secondary block">Upvotes</span>
<p className="text-[11px] font-bold text-on-surface">{heroProblem.upvotes}</p>
</div>
<div className="flex gap-2 ml-auto">
<a href={heroProblem.url} target="_blank" rel="noopener noreferrer" className="bg-[#FF7F6A] text-white px-5 py-2.5 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:scale-105 transition-all">View on Reddit</a>
<Link href={`/problem/${heroProblem.id}`} className="border border-outline px-5 py-2.5 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-surface transition-all inline-flex items-center">Details</Link>
</div>
</div>
{/* Tags */}
{heroProblem.tags.length > 0 && (
<div className="flex gap-2 mt-4">
  {heroProblem.tags.map((tag, i) => (
    <span key={i} className="text-[9px] font-bold bg-primary/5 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest">#{tag}</span>
  ))}
</div>
)}
</div>
<div className="w-40 h-40 shrink-0 bg-surface-container-low rounded-xl p-4 flex flex-col items-center justify-center relative">
<div className="orbit-ring w-24 h-24 rounded-full flex items-center justify-center p-2">
<div className="w-full h-full bg-surface-bright rounded-full flex flex-col items-center justify-center">
<span className="text-xl font-black">{heroScore}</span>
<span className="text-[7px] font-bold tracking-widest uppercase" style={{color: heroLabel === 'High Opportunity' ? '#FF7F6A' : '#94a3b8'}}>{heroLabel === 'High Opportunity' ? 'High' : heroLabel}</span>
</div>
</div>
</div>
</div>
</section>
)}

{/* ── Discovery Feed ── */}
{!loading && !error && feedProblems.length > 0 && (
<section>
<div className="flex items-center justify-between mb-6">
<div>
<h3 className="text-lg font-black tracking-tight">Discovery Feed</h3>
<p className="text-xs text-on-surface-variant">Showing {problems.length} AI-processed signals from Reddit.</p>
</div>
<div className="flex items-center gap-2">
<span className="text-[10px] font-bold text-secondary uppercase mr-2">Sort by</span>
<select className="bg-surface-bright border-outline rounded-lg text-[10px] font-bold uppercase tracking-widest focus:ring-primary py-1 px-3">
<option>Orbit Score</option>
<option>Newest</option>
<option>Trend Strength</option>
</select>
</div>
</div>
<div className="space-y-3">
{feedProblems.map((problem, index) => {
  return (
    <div key={index} className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6">
      <div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
                  <span className="text-sm font-black text-on-surface">{problem.orbitScore}</span>
        <span className="text-[7px] font-bold text-secondary uppercase">{problem.scoreLabel === 'High Opportunity' ? 'High' : problem.scoreLabel === 'Medium' ? 'Med' : 'Low'}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">{problem.industry}</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
          <span className="text-[9px] font-medium text-on-surface-variant">{confidenceLabel(problem.scoreLabel, problem.orbitScore)}</span>
        </div>
        <h4 className="text-sm font-bold text-on-surface leading-tight">{problem.problem}</h4>
        {problem.tags.length > 0 && (
          <div className="flex gap-1.5 mt-1.5">
            {problem.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[8px] font-medium bg-surface-container text-secondary px-1.5 py-0.5 rounded">#{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="hidden xl:block max-w-sm">
        <p className="text-[11px] text-on-surface-variant line-clamp-1 italic">&quot;{problem.summary}&quot;</p>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
        <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Source</a>
        <Link href={`/problem/${problem.id}`} className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
      </div>
    </div>
  );
})}
</div>
</section>
)}

</main>
</div>
    </div>
  );
}
