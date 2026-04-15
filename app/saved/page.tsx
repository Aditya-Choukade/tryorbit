"use client";

import Link from "next/link";
import { useSavedProblems } from "../hooks/useSavedProblems";

export default function SavedPage() {
  const { savedProblems, toggleSave } = useSavedProblems();

  return (
    <div className="text-on-surface flex flex-col min-h-screen bg-background">
      {/* Navbar - duplicated for now, matching the new smooth style */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-outline shadow-sm transition-all">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-primary transition-colors">Orbit</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-primary transition-colors" href="/dashboard">Feed</Link>
            <Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-primary transition-colors" href="/validate">Validate Idea</Link>
            <Link className="text-primary text-sm font-bold border-b-2 border-primary font-['Inter']" href="/saved">Saved</Link>
          </div>
        </div>
        <div className="flex-1 max-w-xl px-8">
           <form action="/search" className="flex items-center bg-surface-container rounded-2xl px-4 py-2 gap-3 transition-all focus-within:ring-2 focus-within:ring-primary/20 border border-transparent focus-within:border-primary/20 focus-within:bg-white group">
             <span className="material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors">search</span>
             <input name="q" className="bg-transparent border-none focus:ring-0 text-xs w-full font-bold text-on-surface" placeholder="Search signals..." type="text" />
           </form>
        </div>
      </nav>

      <main className="flex-1 pt-[81px] pb-20 px-8 max-w-5xl mx-auto w-full">
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-black tracking-tighter mb-2">Saved Opportunities</h1>
          <p className="text-xs text-secondary font-bold uppercase tracking-widest opacity-60">
            {savedProblems.length} bookmarked market gaps
          </p>
        </div>

        {savedProblems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 animate-fade-in-up">
            <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-secondary/30">bookmark</span>
            </div>
            <h2 className="text-xl font-black mb-2 tracking-tight">Your vault is empty</h2>
            <p className="text-sm text-secondary/60 mb-10 max-w-xs text-center font-medium">Bookmark problems from your feed to save for later.</p>
            <Link href="/dashboard" className="bg-on-surface text-surface px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-xl shadow-black/5">Explore Feed</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedProblems.map((problem, idx) => (
              <div 
                key={problem.id} 
                className="bg-white rounded-2xl border border-outline hover:border-primary/30 p-5 transition-all group flex items-center gap-6 shadow-sm hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant group-hover:bg-primary/5 transition-colors">
                  <span className={`text-lg font-black text-on-surface`}>{problem.orbitScore}</span>
                  <span className="text-[7px] font-black text-secondary/40 uppercase tracking-tighter">ORBIT</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 overflow-hidden">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase text-primary bg-primary/5 px-2 py-0.5 rounded shrink-0">{problem.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant shrink-0" />
                    <span className="text-[10px] font-bold text-secondary line-clamp-1">{problem.scoreLabel}</span>
                  </div>
                  <h4 className="text-[15px] font-black text-on-surface leading-tight group-hover:text-primary transition-colors">
                    {problem.problem}
                  </h4>
                </div>

                <div className="hidden lg:block max-w-[280px] shrink-0 border-l border-outline-variant pl-6">
                  <p className="text-[11px] text-secondary font-medium leading-relaxed italic font-serif line-clamp-2">&quot;{problem.summary}&quot;</p>
                </div>

                <div className="flex items-center gap-3 ml-auto pl-4">
                  <button 
                    onClick={() => toggleSave(problem)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary transition-all"
                  >
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                  </button>
                  <Link href={`/problem/${problem.id}`} className="bg-on-surface text-surface px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-primary transition-all active:scale-95 shadow-sm shadow-black/5">Open</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
