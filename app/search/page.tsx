import Link from "next/link";

export default function Page() {
  return (
    <div className="text-on-surface flex flex-col">
      {/* eslint-disable @next/next/no-img-element */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-outline shadow-sm">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><span className="text-xl font-black tracking-tighter text-slate-900">Orbit</span></div>
<div className="hidden md:flex items-center gap-6">
<Link className="text-slate-500 text-sm font-medium border-b-2 border-transparent font-['Inter'] hover:text-[#FF7F6A] transition-colors duration-300" href="/dashboard">Feed</Link>
<Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-[#FF7F6A] transition-colors duration-300" href="/validate">Validate Idea</Link>
</div>
</div>
<div className="flex-1 max-w-xl px-8 relative group">
<form action="/search" className="flex items-center bg-white rounded-xl px-4 py-1.5 gap-3 transition-all ring-2 ring-primary/40 shadow-[0_0_15px_rgba(255,127,106,0.1)]">
<span className="material-symbols-outlined text-primary text-xl">search</span>
<input name="q" className="bg-transparent border-none focus:ring-0 text-xs w-full font-bold text-on-surface" defaultValue="Fintech" type="text"/>
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
<div className="sticky top-0 bg-white pb-6 z-10">
<h1 className="text-4xl font-black tracking-tighter leading-none mb-2">Decision <span className="italic font-normal text-primary font-serif">Engine</span></h1>
<p className="text-on-surface-variant text-xs font-light leading-relaxed">High-conviction market gaps algorithmically curated.</p>
</div>
<div className="mt-8 space-y-8">
<div>
<span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary block mb-4">Categories</span>
<div className="flex flex-col gap-1">
<button className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-surface-container text-xs font-medium text-on-surface-variant transition-colors">
<span>All Opportunities</span>
<span className="text-[10px]">42</span>
</button>
<button className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-bold transition-colors">
<span>Fintech</span>
<span className="bg-primary/20 px-1.5 py-0.5 rounded text-[10px] text-primary">12</span>
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
<main className="flex-1 overflow-y-auto custom-scrollbar bg-surface px-8 py-8 min-h-screen">
    <div className="mb-8 flex items-end justify-between">
        <div>
            <h2 className="text-3xl font-black tracking-tight">Search Results</h2>
            <p className="text-sm text-on-surface-variant font-medium mt-1">Showing 12 opportunities for <span className="text-primary italic font-serif">"Fintech"</span></p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-secondary uppercase mr-2">Sort by</span>
            <select className="bg-white border border-outline rounded-lg text-[10px] font-bold uppercase tracking-widest focus:ring-primary py-2 px-4 shadow-sm outline-none">
            <option>Orbit Score</option>
            <option>Match Rating</option>
            <option>Newest</option>
            </select>
        </div>
    </div>

    {/* Search result cards */}
    <div className="space-y-3">
        {/* Item 1 */}
        <div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
                <span className="text-sm font-black text-on-surface">88</span>
                <span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">Fintech</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="text-[9px] font-medium text-emerald-600">Very High Confidence (94%)</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors duration-200">Automated reconciliation for cross-border B2B payouts</h4>
            </div>
            <div className="hidden xl:block max-w-sm">
                <p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Painful FX spread and delay reconciliation across 14 currencies."</p>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
                <button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
                <Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
            </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
                <span className="text-sm font-black text-on-surface">76</span>
                <span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">Fintech</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="text-[9px] font-medium text-emerald-600">High Confidence (82%)</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors duration-200">Fraud dispute API for emerging market neobanks</h4>
            </div>
            <div className="hidden xl:block max-w-sm">
                <p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Manual dispute resolution takes 45 days, causing 12% churn."</p>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
                <button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
                <Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
            </div>
        </div>
        
        {/* Item 3 */}
        <div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
                <span className="text-sm font-black text-on-surface">71</span>
                <span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">Fintech</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="text-[9px] font-medium text-amber-600">Moderate (68%)</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors duration-200">Embeddable payroll advances for gig-economy platforms</h4>
            </div>
            <div className="hidden xl:block max-w-sm">
                <p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Contractors churning because API providers take 2 days to clear."</p>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
                <button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
                <Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
            </div>
        </div>
        
        {/* Item 4 */}
        <div className="bg-white rounded-xl border border-outline hover:border-primary/30 p-4 transition-all group flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-surface-container flex flex-col items-center justify-center shrink-0 border border-outline-variant">
                <span className="text-sm font-black text-on-surface">65</span>
                <span className="text-[7px] font-bold text-secondary uppercase">Orbit</span>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-secondary">Fintech</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="text-[9px] font-medium text-amber-600">Moderate (61%)</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors duration-200">Dynamic lending risk scoring for Shopify merchants</h4>
            </div>
            <div className="hidden xl:block max-w-sm">
                <p className="text-[11px] text-on-surface-variant line-clamp-1 italic">"Traditional credit bureaus fail to accurately score seasonal D2C brands."</p>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <button className="material-symbols-outlined text-secondary text-lg hover:text-primary transition-colors">bookmark</button>
                <button className="text-[10px] font-bold uppercase text-primary border-b border-primary/20 hover:border-primary transition-all">Build</button>
                <Link href="/problem/1" className="text-[10px] font-bold uppercase text-on-surface-variant hover:text-on-surface transition-all">Details</Link>
            </div>
        </div>
    </div>
</main>
</div>
    </div>
  );
}
