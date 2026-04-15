"use client";

import { useState, useEffect } from "react";

interface Problem {
  id: string;
  problem: string;
  industry: string;
  summary: string;
}

interface ShareModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ problem, isOpen, onClose }: ShareModalProps) {
  const [postContent, setPostContent] = useState("");
  const [activeTab, setActiveTab] = useState<"x" | "linkedin">("x");

  useEffect(() => {
    if (problem) {
      const template = `🚀 Found a massive market gap on @Orbit: "${problem.problem}"\n\nI'm claiming this as my next build. Who's in? #BuildInPublic #OrbitAI`;
      setPostContent(template);
    }
  }, [problem]);

  if (!isOpen || !problem) return null;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postContent)}`;
    window.open(url, "_blank");
  };

  const handleLinkedInShare = () => {
    navigator.clipboard.writeText(postContent);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/problem/' + problem.id)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl bg-[#0F1115] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 animate-fade-in-up">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side: Preview/Generator */}
          <div className="flex-1 p-8 lg:p-10 border-r border-white/5 relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary text-xl">rocket_launch</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 block leading-none mb-1">Gap Claimed</span>
                <h3 className="text-xl font-black text-white tracking-tight">Build in Public</h3>
              </div>
            </div>

            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl -m-0.5 pointer-events-none" />
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full h-56 bg-[#16191E] border border-white/10 rounded-3xl p-6 text-sm font-medium leading-relaxed resize-none text-slate-300 focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all outline-none"
                placeholder="Write your announcement..."
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                 <span className="text-[10px] font-black text-slate-500 mr-2">{postContent.length}/280</span>
                 <button 
                  onClick={() => { navigator.clipboard.writeText(postContent); alert("Copied!"); }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-xl text-slate-400 hover:text-white transition-all scale-90"
                 >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                 </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={handleTwitterShare}
                className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Post to X
              </button>
              <button 
                onClick={handleLinkedInShare}
                className="flex-1 flex items-center justify-center gap-3 bg-[#0077B5] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#005a8a] transition-all active:scale-95 shadow-xl shadow-blue-500/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.89 0-1.52.61-1.52 1.93V19h-3v-9h3v1.3c.39-.58 1.15-1.3 2.54-1.3 1.9 0 3.36 1.32 3.36 4.13V19z"/></svg>
                LinkedIn
              </button>
            </div>
          </div>

          {/* Right Side: Social Context/Advice */}
          <div className="lg:w-72 bg-white/5 p-8 lg:p-10 flex flex-col relative z-0">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 mt-2">Claim Strategy</h4>
            
            <div className="space-y-8">
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                  <span className="text-[11px] font-black text-slate-3200 uppercase tracking-widest">Authority</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Claiming the problem early establishes you as the domain leader before the solution exists.</p>
              </div>

              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">groups</span>
                  <span className="text-[11px] font-black text-slate-200 uppercase tracking-widest">Engagement</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Orbit cards are optimized to trigger &quot;Me too&quot; responses from frustrated users.</p>
              </div>

              <div className="bg-[#1C2026] p-5 rounded-2xl border border-white/5 mt-auto">
                <div className="flex -space-x-2 mb-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#1C2026] bg-slate-700 animate-pulse" />
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 font-bold">14 Orbit users already claimed similar gaps today.</p>
              </div>
            </div>

            <button onClick={onClose} className="mt-10 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
