import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body antialiased">
      {/* eslint-disable @next/next/no-img-element */}
      {/* Top Navigation Bar */}
<nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-outline shadow-sm">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><span className="text-xl font-black tracking-tighter text-slate-900">Orbit</span></div>
<div className="hidden md:flex items-center gap-6">
<Link className="text-slate-500 text-sm font-medium font-['Inter'] hover:text-[#FF7F6A] transition-colors duration-300" href="/dashboard">Feed</Link>
<Link className="text-[#FF7F6A] text-sm font-bold border-b-2 border-[#FF7F6A] font-['Inter'] transition-colors duration-300" href="/validate">Validate Idea</Link>
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
{/* Main Content Area */}
<main className="min-h-screen pt-[64px]">
<section className="p-12 max-w-6xl mx-auto">
{/* Hero Input Section */}
<div className="mb-32 text-center">
<span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-8 block opacity-80">The Validation Engine</span>
<h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-16 text-on-surface">
                    What are you <br/>
<span className="font-serif italic font-light text-secondary">building?</span>
</h2>
{/* Minimalistic Chat-style Input */}
<div className="max-w-2xl mx-auto relative group">
<div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
<div className="relative flex items-center bg-white border border-outline rounded-2xl p-2 pr-3 chat-input-shadow focus-within:border-primary/50 transition-all duration-300">
<input className="w-full bg-transparent border-none py-4 px-6 text-lg focus:ring-0 placeholder:text-secondary/40 font-light text-on-surface" placeholder="Describe your startup idea..." type="text"/>
<Link href="/prepare" className="bg-primary hover:bg-primary/90 text-on-primary w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-primary/10 active:scale-95 inline-flex">
<span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
<div className="mt-4 flex justify-center gap-6">
<span className="text-[10px] text-secondary/60 uppercase tracking-widest">Market Size</span>
<span className="text-[10px] text-secondary/60 uppercase tracking-widest">Competition</span>
<span className="text-[10px] text-secondary/60 uppercase tracking-widest">Sentiment</span>
</div>
</div>
</div>
{/* Dashboard Style Content */}
<div className="editorial-grid">
{/* Related Market Problems */}
<div className="col-span-12 lg:col-span-7">
<div className="flex justify-between items-end mb-8">
<div>
<p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Market Signals</p>
<h3 className="text-3xl font-black tracking-tighter text-on-surface">Related Market Problems</h3>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Card 1 */}
<div className="bg-white p-8 rounded-xl border border-outline premium-card-shadow group hover:border-primary/30 transition-all">
<div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center mb-6 text-primary">
<span className="material-symbols-outlined text-xl" data-icon="search_insights">search_insights</span>
</div>
<h4 className="text-xl font-bold mb-3 tracking-tight text-on-surface">Inefficient Data Indexing</h4>
<p className="text-secondary font-light leading-relaxed mb-6 text-sm">Current AI models struggle with real-time vectorization of unstructured legal documents.</p>
<div className="flex items-center gap-2">
<span className="text-[9px] font-bold uppercase tracking-widest text-primary py-1 px-3 bg-primary/10 rounded-full">High Urgency</span>
</div>
</div>
{/* Card 2 */}
<div className="bg-white p-8 rounded-xl border border-outline premium-card-shadow group hover:border-primary/30 transition-all">
<div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center mb-6 text-primary">
<span className="material-symbols-outlined text-xl" data-icon="account_tree">account_tree</span>
</div>
<h4 className="text-xl font-bold mb-3 tracking-tight text-on-surface">Fragmented Tooling</h4>
<p className="text-secondary font-light leading-relaxed mb-6 text-sm">SMEs use an average of 12 disparate tools for customer lifecycle management.</p>
<div className="flex items-center gap-2">
<span className="text-[9px] font-bold uppercase tracking-widest text-secondary py-1 px-3 bg-surface-container-high rounded-full">Growth Trend</span>
</div>
</div>
</div>
</div>
{/* Demand Insight */}
<div className="col-span-12 lg:col-span-5">
<div className="bg-white p-10 rounded-xl border border-outline premium-card-shadow h-full flex flex-col">
<p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-8">Intelligence Report</p>
<div className="mb-12">
<div className="flex justify-between items-baseline mb-4">
<h3 className="text-4xl font-black tracking-tighter text-on-surface">Demand Insight</h3>
<div className="text-right">
<span className="text-5xl font-black text-primary">88</span>
<span className="text-lg font-light text-secondary/40">/100</span>
</div>
</div>
<div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{ width: "88%" }}></div>
</div>
</div>
<div className="space-y-6 flex-1">
<p className="text-lg font-light leading-relaxed text-on-surface">
                                Your idea sits in a <span className="font-bold text-primary">high-velocity corridor</span>. Market heat is concentrated in generative AI for boutique legal firms.
                            </p>
<p className="text-secondary leading-relaxed font-light text-sm">
                                Competitive analysis reveals a gap in "Human-in-the-loop" verification layers. Your proposal addresses the <span className="italic font-serif text-on-surface">accuracy deficit</span>.
                            </p>
</div>
<div className="pt-8 border-t border-outline mt-8">
<div className="flex items-center justify-between">
<div>
<p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">Verdict</p>
<p className="font-bold text-on-surface">Strong "Build" Signal</p>
</div>
<span className="material-symbols-outlined text-primary scale-125" data-icon="verified" data-weight="fill" style={{ fontVariationSettings: "\'FILL\' 1" }}>verified</span>
</div>
</div>
</div>
</div>
</div>
{/* Footer Quote / Visual */}
<div className="mt-32 pt-16 border-t border-outline text-center">
<p className="text-secondary/60 font-light italic max-w-xl mx-auto text-sm">
                    "The best way to predict the future is to invent it, but the second best way is to validate the demand for it algorithmically."
                </p>
</div>
</section>
</main>
    </div>
  );
}
