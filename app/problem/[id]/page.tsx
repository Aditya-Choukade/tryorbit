"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShareModal from "@/app/components/ShareModal";
import { useSavedProblems } from "@/app/hooks/useSavedProblems";

interface ProblemDetail {
  id: string;
  problem: string;
  industry: string;
  summary: string;
  tags: string[];
  complaints: string[];
  rootCause: string;
  opportunity: string;
  orbitScore: number;
  scoreLabel: string;
  source: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  url: string;
}

function ScoreBadgeColor(label: string) {
  if (label === 'High Opportunity') return '#FF7F6A';
  if (label === 'Medium') return '#f59e0b';
  return '#94a3b8';
}

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  const { toggleSave, isSaved } = useSavedProblems();

  useEffect(() => {
    if (!id) return;

    async function fetchDetail() {
      try {
        const res = await fetch(`/api/problems/${id}`, { cache: "no-store" });
        const json = await res.json();

        if (json.success && json.data) {
          setProblem(json.data);
        } else {
          setError(json.message || "Problem not found.");
        }
      } catch {
        setError("Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  return (
    <div className="selection:bg-primary selection:text-white">
      {/* eslint-disable @next/next/no-img-element */}
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl flex items-center px-6 py-3 border-b border-outline shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
        {/* Left: Branding & Back Navigation */}
        <div className="flex items-center gap-5 w-1/3">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden lg:block text-xl font-black tracking-tighter text-slate-900 group-hover:text-primary transition-colors">Orbit</span>
          </Link>
          <div className="h-5 w-px bg-outline hidden md:block"></div>
          <Link href="/dashboard" className="hidden md:flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-['Inter'] text-[11px] font-bold tracking-wider uppercase">Back to Feed</span>
          </Link>
        </div>

        {/* Center: Context Pill */}
        <div className="flex-1 flex justify-center">
          {problem ? (
             <div className="flex items-center gap-3 bg-surface-container-lowest px-5 py-1.5 rounded-full border border-outline/60 shadow-inner">
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{problem.industry}</span>
               <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
               <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[11px]">dynamic_feed</span>
                  {problem.source}
               </span>
             </div>
          ) : (
             <div className="h-7 w-40 bg-surface-container animate-pulse rounded-full"></div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          {problem && (
            <>
              {/* Desktop Save Button */}
              <button 
                onClick={(e) => { e.preventDefault(); toggleSave(problem); }}
                className="hidden md:flex items-center gap-2 bg-white hover:bg-surface-container-lowest px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors border border-outline-variant shadow-sm active:scale-95"
              >
                <span className={`material-symbols-outlined text-[14px] ${isSaved(problem.id) ? 'fill-current text-primary' : ''}`} style={isSaved(problem.id) ? {fontVariationSettings: "'FILL' 1"} : {}}>bookmark</span>
                {isSaved(problem.id) ? 'Saved' : 'Save'}
              </button>
              {/* Mobile Save Icon */}
              <button 
                onClick={(e) => { e.preventDefault(); toggleSave(problem); }}
                className="flex md:hidden items-center justify-center w-9 h-9 bg-white hover:bg-surface-container-lowest rounded-xl text-secondary hover:text-primary transition-colors border border-outline-variant shadow-sm active:scale-95"
              >
                <span className={`material-symbols-outlined text-[16px] ${isSaved(problem.id) ? 'fill-current text-primary' : ''}`} style={isSaved(problem.id) ? {fontVariationSettings: "'FILL' 1"} : {}}>bookmark</span>
              </button>
              
              {/* View Original External Link */}
              <a href={problem.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 bg-white hover:bg-surface-container-lowest rounded-xl text-secondary hover:text-primary transition-colors border border-outline-variant shadow-sm active:scale-95 group" title="View Source">
                <span className="material-symbols-outlined text-[16px] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">arrow_outward</span>
              </a>
            </>
          )}
        </div>
      </nav>

      {/* ── Loading State ── */}
      {loading && (
        <main className="pt-40 pb-40 px-8 max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-stone-500 font-medium">Loading problem insights...</p>
        </main>
      )}

      {/* ── Error State ── */}
      {!loading && error && (
        <main className="pt-40 pb-40 px-8 max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
          <span className="material-symbols-outlined text-5xl text-red-400">error</span>
          <h1 className="text-2xl font-black text-stone-900">Problem Not Found</h1>
          <p className="text-stone-500 text-center max-w-md">{error}</p>
          <Link href="/dashboard" className="mt-4 px-8 py-3 bg-primary text-white rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">
            Back to Dashboard
          </Link>
        </main>
      )}

      {/* ── Main Content ── */}
      {!loading && !error && problem && (
        <main className="pt-32 pb-40 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Main Content */}
          <div className="lg:col-span-8 space-y-16">

            {/* Problem Title & Summary */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-primary/10 text-primary">{problem.industry}</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400">via r/{problem.subreddit}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-[-0.04em] leading-[0.95] text-stone-900">
                {problem.problem.split(' ').map((word, i) =>
                  i === 0
                    ? <span key={i} className="italic font-serif font-light text-primary">{word} </span>
                    : word + ' '
                )}
              </h1>
              <p className="text-xl font-light text-stone-500 max-w-2xl leading-relaxed">
                {problem.summary}
              </p>
            </section>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Orbit Score Card */}
              <div className="rounded-xl p-12 bg-white editorial-shadow border border-stone-200/50 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative w-40 h-40 rounded-full orbit-ring p-[3px]">
                  <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="text-5xl font-black tracking-tighter text-stone-900">{problem.orbitScore}</span>
                    <span className="font-inter text-[10px] font-bold tracking-widest uppercase text-stone-400">Orbit Score</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-inter text-[10px] font-black tracking-widest uppercase" style={{ color: ScoreBadgeColor(problem.scoreLabel) }}>
                    {problem.scoreLabel}
                  </div>
                  <p className="text-xs text-stone-400 font-light">Based on engagement + signal intensity</p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="rounded-xl p-8 bg-white editorial-shadow border border-stone-200/50 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-6">Signal Metrics</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                      <span className="text-xs font-medium text-stone-500">Reddit Upvotes</span>
                      <span className="text-sm font-black text-stone-900">↑ {problem.upvotes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                      <span className="text-xs font-medium text-stone-500">Comments</span>
                      <span className="text-sm font-black text-stone-900">{problem.comments.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                      <span className="text-xs font-medium text-stone-500">Source</span>
                      <span className="text-sm font-black text-stone-900">{problem.source} / r/{problem.subreddit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-stone-500">Score Label</span>
                      <span className="text-sm font-black" style={{ color: ScoreBadgeColor(problem.scoreLabel) }}>{problem.scoreLabel}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  View original post <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Real Complaints */}
            {problem.complaints && problem.complaints.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400">Real User Complaints</h2>
                <div className="space-y-4">
                  {problem.complaints.map((complaint, i) => (
                    <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">format_quote</span>
                      <p className="text-sm text-stone-700 font-light italic leading-relaxed">&quot;{complaint}&quot;</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Root Cause */}
            {problem.rootCause && (
              <section className="space-y-4">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400">Root Cause</h2>
                <div className="p-6 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-sm text-amber-900 leading-relaxed">{problem.rootCause}</p>
                </div>
              </section>
            )}

            {/* Opportunity */}
            {problem.opportunity && (
              <section className="space-y-4">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400">Startup Opportunity</h2>
                <div className="p-6 rounded-xl bg-green-50 border border-green-100">
                  <p className="text-sm text-green-900 leading-relaxed">{problem.opportunity}</p>
                </div>
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  Build This
                </button>
              </section>
            )}

          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Tags */}
            {problem.tags && problem.tags.length > 0 && (
              <div className="bg-white rounded-xl border border-stone-200/50 p-6 space-y-4 editorial-shadow">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">Pain Tags</p>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-primary/5 text-primary px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Opportunity CTA box */}
            <div className="bg-stone-900 rounded-xl p-6 space-y-4 text-white">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">Ready to Build?</p>
              <p className="text-sm font-light text-stone-300 leading-relaxed">
                This problem has been validated by real users. Start building your solution today.
              </p>
              <button
                onClick={() => setIsShareOpen(true)}
                className="block w-full text-center bg-primary text-white px-6 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
              >
                Build This →
              </button>
            </div>

            {/* Back to feed */}
            <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Discovery Feed
            </Link>

          </aside>
        </main>
      )}

      {/* Share Modal Integration */}
      <ShareModal 
        problem={problem} 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
      />
    </div>
  );
}
