import Link from "next/link";

export default function Page() {
  return (
    <div className="selection:bg-primary selection:text-white">
      {/* eslint-disable @next/next/no-img-element */}
      {/* Top Navigation Bar */}
<nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 py-4 border-b border-stone-200/50 transition-colors duration-300">
<div className="flex items-center gap-6">
<Link href="/dashboard" className="flex items-center gap-2 group active:scale-95 duration-200">
<span className="material-symbols-outlined text-stone-500 group-hover:text-primary">arrow_back</span>
<span className="font-inter tracking-tight font-black uppercase text-[10px] text-stone-400 group-hover:text-stone-600">Back to Feed</span>
</Link>
<div className="h-4 w-px bg-stone-200"></div>
<div className="flex items-center gap-2">
<span className="font-inter tracking-tight font-black uppercase text-[10px] text-orange-500">Fintech</span>
<span className="text-stone-300 text-[10px]">•</span>
<span className="font-inter tracking-tight font-black uppercase text-[10px] text-stone-400">Source: Reddit</span>
</div>
</div>
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><div className="text-2xl font-black tracking-tighter text-stone-900">Orbit</div></div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-stone-500 hover:text-stone-900 transition-opacity active:scale-95 duration-200">bookmark</button>
<button className="material-symbols-outlined text-stone-500 hover:text-stone-900 transition-opacity active:scale-95 duration-200">share</button>
</div>
</nav>
<main className="pt-32 pb-40 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
{/* Main Content Area */}
<div className="lg:col-span-8 space-y-16">
{/* Problem Title & Summary */}
<section className="space-y-6">
<h1 className="text-6xl md:text-7xl font-black tracking-[-0.05em] leading-[0.95] text-stone-900">
                    Merchant onboarding is too <span className="italic font-serif font-light text-primary">long and hostile</span> for Tier-2 suppliers
                </h1>
<p className="text-2xl font-light text-stone-500 max-w-2xl leading-relaxed">
                    AI Analysis indicates a systemic friction point in mid-market payment infrastructure where manual compliance checks are causing a 40% abandonment rate during the final stage of KYC.
                </p>
</section>
{/* Metrics Bento Row */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Orbit Score Card */}
<div className="rounded-xl p-12 bg-white editorial-shadow border border-stone-200/50 flex flex-col items-center justify-center text-center space-y-6">
<div className="relative w-48 h-48 rounded-full orbit-ring p-[3px]">
<div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
<span className="text-6xl font-black tracking-tighter text-stone-900">82</span>
<span className="font-inter text-[10px] font-bold tracking-widest uppercase text-stone-400">Orbit Score</span>
</div>
</div>
<div className="space-y-1">
<div className="font-inter text-[10px] font-black tracking-widest uppercase text-primary">High Opportunity</div>
<div className="text-sm text-stone-500 flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-xs">trending_up</span>
                            +12% this week
                        </div>
</div>
</div>
{/* AI Quick Insight */}
<div className="rounded-xl p-12 bg-white editorial-shadow border border-stone-200/50 flex flex-col justify-between">
<span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "\'FILL\' 1" }}>psychology</span>
<div className="space-y-4">
<h3 className="font-inter text-[10px] font-black tracking-widest uppercase text-stone-400">Root Cause</h3>
<p className="text-xl font-medium text-stone-800">Fragmented legacy databases fail to cross-verify mid-market entities in real-time, forcing redundant document uploads.</p>
</div>
</div>
</div>
{/* User Complaints */}
<section className="space-y-8">
<h2 className="text-3xl font-black tracking-tight text-stone-900">Voice of the Market</h2>
<div className="grid grid-cols-1 gap-6">
<div className="rounded-lg p-8 border border-stone-200 bg-white hover:bg-stone-50 transition-colors">
<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-stone-100" data-alt="minimalist geometric avatar of a reddit user with warm orange tones"></div>
<span className="font-inter text-[10px] font-black tracking-widest uppercase text-stone-400">u/fintech_lead</span>
</div>
<p className="text-stone-600 italic">"We spent 4 weeks just trying to verify our secondary distributors. The portal kept crashing and asking for PDFs we already uploaded thrice."</p>
</div>
<div className="rounded-lg p-8 border border-stone-200 bg-white hover:bg-stone-50 transition-colors">
<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-stone-100" data-alt="minimalist geometric avatar of a reddit user with cool blue tones"></div>
<span className="font-inter text-[10px] font-black tracking-widest uppercase text-stone-400">u/supplier_ops_12</span>
</div>
<p className="text-stone-600 italic">"Why does it take a banking license to sell industrial parts? The KYC flow for mid-sized merchants is literal hell."</p>
</div>
<div className="rounded-lg p-8 border border-stone-200 bg-white hover:bg-stone-50 transition-colors">
<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-stone-100" data-alt="minimalist geometric avatar of a reddit user with soft grey tones"></div>
<span className="font-inter text-[10px] font-black tracking-widest uppercase text-stone-400">u/growth_hacker_x</span>
</div>
<p className="text-stone-600 italic">"We lost 3 major enterprise contracts this quarter because their sub-merchants couldn't pass onboarding fast enough."</p>
</div>
</div>
</section>
{/* The Opportunity Section */}
<section className="rounded-xl p-12 bg-primary text-on-primary editorial-shadow relative overflow-hidden">
<div className="relative z-10 space-y-6">
<h2 className="text-4xl font-black tracking-tight">The Opportunity</h2>
<p className="text-2xl font-light leading-relaxed">
                        Develop a <span className="font-black">Unified Reconciliation API</span> that acts as a middleware between legacy banking stacks and modern merchant portals. By automating Tier-2 verification via localized business registries, onboarding time can be reduced from 14 days to 4 minutes.
                    </p>
</div>
{/* Decorative element */}
<div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
</section>
</div>
{/* Sidebar / Action Panel */}
<aside className="lg:col-span-4 space-y-8">
<div className="sticky top-32 glass-panel rounded-xl p-8 editorial-shadow border border-stone-200/50 space-y-10">
{/* Action Buttons */}
<div className="space-y-4">
<Link href="/prepare" className="w-full block text-center bg-primary text-on-primary py-6 rounded-full font-black tracking-tighter text-xl shadow-[0_10px_20px_rgba(255,127,106,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
                        Build This
                    </Link>
<button className="w-full border-2 border-stone-200 py-6 rounded-full font-black tracking-tighter text-xl text-stone-600 hover:bg-stone-50 transition-all">
                        Save for Later
                    </button>
</div>
{/* Impact Tags */}
<div className="space-y-6">
<h4 className="font-inter text-[10px] font-black tracking-widest uppercase text-stone-400">Market Indicators</h4>
<div className="flex flex-wrap gap-2">
<span className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Frustration: High
                        </span>
<span className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-500 flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                            Urgent
                        </span>
<span className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-500 flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                            Global Scale
                        </span>
</div>
</div>
{/* Market Data Teaser */}
<div className="pt-10 border-t border-stone-100 space-y-4">
<div className="flex justify-between items-end">
<div>
<div className="font-inter text-[10px] font-black tracking-widest uppercase text-stone-400">Estimated TAM</div>
<div className="text-3xl font-black text-stone-900">$4.2B</div>
</div>
<div className="text-right">
<div className="font-inter text-[10px] font-black tracking-widest uppercase text-stone-400">CAGR</div>
<div className="text-xl font-black text-orange-600">18.4%</div>
</div>
</div>
</div>
</div>
</aside>
</main>

    </div>
  );
}
