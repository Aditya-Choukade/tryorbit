import Link from "next/link";

export default function Page() {
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
<span className="bg-white px-1.5 py-0.5 rounded text-[10px]">42</span>
</button>
<button className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-container text-xs font-medium text-on-surface-variant transition-colors">
<span>Fintech</span>
<span className="text-[10px]">12</span>
</button>
<button className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-container text-xs font-medium text-on-surface-variant transition-colors">
<span>SaaS</span>
<span className="text-[10px]">8</span>
</button>
<button className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-container text-xs font-medium text-on-surface-variant transition-colors">
<span>Health</span>
<span className="text-[10px]">15</span>
</button>
<button className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-container text-xs font-medium text-on-surface-variant transition-colors">
<span>Logistics</span>
<span className="text-[10px]">7</span>
</button>
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
<section className="mb-10">
<div className="bg-surface-bright rounded-2xl p-8 magazine-shadow border border-primary/10 relative overflow-hidden flex items-center gap-10">
<div className="flex-1 relative z-10">
<div className="inline-flex items-center gap-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full mb-4">
<span className="material-symbols-outlined text-[10px]" data-weight="fill">verified</span>
<span className="text-[9px] font-bold tracking-[0.2em] uppercase">Best Opportunity Today</span>
</div>
<h2 className="text-2xl font-black tracking-tight mb-2">Cross-border payment friction for Tier-2 suppliers</h2>
<p className="text-sm text-on-surface-variant font-light mb-6 italic font-serif">"Affects merchant cash flow in SE Asia and Latin America."</p>
<div className="flex gap-10 items-center">
<div>
<span className="text-[8px] font-bold tracking-[0.2em] uppercase text-secondary block">Action</span>
<p className="text-[11px] font-bold text-on-surface">Multi-currency API</p>
</div>
<div>
<span className="text-[8px] font-bold tracking-[0.2em] uppercase text-secondary block">Timeframe</span>
<p className="text-[11px] font-bold text-on-surface">4-6 weeks</p>
</div>
<div>
<span className="text-[8px] font-bold tracking-[0.2em] uppercase text-secondary block">Monetization</span>
<p className="text-[11px] font-bold text-on-surface">0.5% txn fee</p>
</div>
<div className="flex gap-2 ml-auto">
<button className="bg-[#FF7F6A] text-white px-5 py-2.5 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:scale-105 transition-all">Build This</button>
<Link href="/problem/1" className="border border-outline px-5 py-2.5 rounded-lg font-bold text-[10px] tracking-widest uppercase hover:bg-surface transition-all inline-flex items-center">Details</Link>
</div>
</div>
</div>
<div className="w-40 h-40 shrink-0 bg-surface-container-low rounded-xl p-4 flex flex-col items-center justify-center relative">
<div className="orbit-ring w-24 h-24 rounded-full flex items-center justify-center p-2">
<div className="w-full h-full bg-surface-bright rounded-full flex flex-col items-center justify-center">
<span className="text-xl font-black">82</span>
<span className="text-[7px] font-bold tracking-widest text-secondary uppercase">Score</span>
</div>
</div>
<div className="absolute bottom-2 right-2 flex flex-col items-end">
<span className="text-[8px] font-bold text-primary">+12%</span>
<span className="text-[7px] text-secondary uppercase tracking-widest">Trend</span>
</div>
</div>
</div>
</section>
<section>
<div className="flex items-center justify-between mb-6">
<div>
<h3 className="text-lg font-black tracking-tight">Discovery Feed</h3>
<p className="text-xs text-on-surface-variant">Scanning 1,429 signals for market inefficiencies.</p>
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
<div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6">
<div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
<span className="text-sm font-black text-on-surface">74</span>
<span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">Fintech</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-[9px] font-medium text-on-surface-variant">High Confidence (89%)</span>
</div>
<h4 className="text-sm font-bold text-on-surface leading-tight">Post-purchase tax reclaim for expats</h4>
</div>
<div className="hidden xl:block max-w-sm">
<p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"High friction manual process for claiming VAT refunds at EU borders."</p>
</div>
<div className="flex items-center gap-4 ml-auto">
<button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
<button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
<Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
</div>
</div>
<div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6">
<div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
<span className="text-sm font-black text-on-surface">68</span>
<span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">Health</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-[9px] font-medium text-on-surface-variant">Moderate (72%)</span>
</div>
<h4 className="text-sm font-bold text-on-surface leading-tight">Patient intake automation for dental clinics</h4>
</div>
<div className="hidden xl:block max-w-sm">
<p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Administrative burnout caused by legacy form software in US practices."</p>
</div>
<div className="flex items-center gap-4 ml-auto">
<button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
<button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
<Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
</div>
</div>
<div className="bg-on-surface rounded-xl p-4 overflow-hidden relative flex items-center gap-6 text-white group">
<img alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQb0SF-Q1lt8J4JizKxSH0dhdxB7aFVnHJuzuFk09AL2vJb-bPHOznoUFBMbFQiS3CDDoWPV0F1JUOVh70wYKzt94-9Htn05ijkO4IJyxK18t1eRx5Ha_4Qsvv-njSKL-2IIYQb5oumJO_07VBfsLsiGaponWjibmjQl7WMBtavJ3GFgY-tMMVVbcD24mEw8ADv7WiEb5CZKpeI4GB3g9j6oxLlV1NOGzsGFIGW8Bt0BrZbpKr_Jl7nYlufDIloYxv1KbnyoYqiJAR"/>
<div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center shrink-0 border border-white/20 relative z-10">
<span className="text-sm font-black text-primary">91</span>
<span className="text-[7px] font-bold text-white/60 uppercase">High</span>
</div>
<div className="flex-1 relative z-10">
<div className="flex items-center gap-3 mb-1">
<span className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary">Market Alert</span>
<span className="w-1 h-1 rounded-full bg-white/20"></span>
</div>
<h4 className="text-sm font-bold text-white leading-tight">Supply chain transparency for boutique roasteries</h4>
</div>
<div className="relative z-10 ml-auto">
<button className="text-[10px] font-bold uppercase text-primary hover:text-white transition-all bg-white/5 border border-primary/40 px-4 py-2 rounded-lg">Explore Gap</button>
</div>
</div>
<div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6">
<div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
<span className="text-sm font-black text-on-surface">79</span>
<span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">SaaS</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-[9px] font-medium text-on-surface-variant">Rising Trend (+8%)</span>
</div>
<h4 className="text-sm font-bold text-on-surface leading-tight">AI legal-doc summarizer for SMB leases</h4>
</div>
<div className="hidden xl:block max-w-sm">
<p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Small business owners lack clarity on commercial lease terms."</p>
</div>
<div className="flex items-center gap-4 ml-auto">
<button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
<button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
<Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
</div>
</div>
<div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6">
<div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
<span className="text-sm font-black text-on-surface">85</span>
<span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">E-commerce</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-[9px] font-medium text-on-surface-variant">Critical Issue (40% fail)</span>
</div>
<h4 className="text-sm font-bold text-on-surface leading-tight">Localized checkout components for West Africa</h4>
</div>
<div className="hidden xl:block max-w-sm">
<p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Mobile money integration gaps in Nigeria and Ghana stores."</p>
</div>
<div className="flex items-center gap-4 ml-auto">
<button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
<button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
<Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
</div>
</div>
<div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6">
<div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
<span className="text-sm font-black text-on-surface">81</span>
<span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">Logistics</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-[9px] font-medium text-on-surface-variant">Stable Market</span>
</div>
<h4 className="text-sm font-bold text-on-surface leading-tight">Last-mile routing for micro-warehouses</h4>
</div>
<div className="hidden xl:block max-w-sm">
<p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Urban congestion requires dynamic routing for specialized couriers."</p>
</div>
<div className="flex items-center gap-4 ml-auto">
<button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
<button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
<Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
</div>
</div>
</div>
<div className="mt-8 flex justify-center">
<button className="flex items-center gap-2 px-6 py-3 border border-outline rounded-full text-xs font-bold text-secondary uppercase tracking-[0.2em] hover:bg-white transition-all">
                    Load More Signals
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
</button>
</div>
</section>
</main>
</div>
    </div>
  );
}
