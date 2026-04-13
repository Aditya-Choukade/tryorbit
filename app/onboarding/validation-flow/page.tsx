export default function Page() {
  return (
    <div className="selection:bg-primary/20 selection:text-primary">
      {/* eslint-disable @next/next/no-img-element */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-3 w-[90%] max-w-5xl rounded-full border border-white/20 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300 font-['Inter']">
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><div className="text-xl font-black tracking-tighter text-[var(--text-main)]">Orbit</div></div>
<div className="hidden md:flex items-center gap-8">
<a className="text-[var(--text-muted)] font-medium hover:text-[var(--accent-coral)] transition-colors" href="#">Product</a>
<a className="text-[var(--text-muted)] font-medium hover:text-[var(--accent-coral)] transition-colors" href="#">Contact</a>
<button className="accent-button px-5 py-2 rounded-full font-bold text-xs">Join Waitlist</button>
</div>
</nav>
<section className="relative min-h-screen pt-44 pb-20 px-6 flex flex-col items-center">
<div className="max-w-5xl w-full text-center relative z-10 mb-20">
<h1 className="text-6xl md:text-8xl font-black text-[var(--text-main)] tracking-[-0.05em] leading-[0.95] mb-10">
            Discover Problems Worth <span className="text-[var(--accent-coral)]">Building For</span>
</h1>
<p className="text-xl md:text-2xl text-[var(--text-muted)] font-normal max-w-3xl mx-auto mb-12 leading-relaxed">
            Orbit scans real user complaints across the web and turns them into startup-ready ideas with high execution potential.
        </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
<input className="w-full bg-white border border-[var(--border-soft)] rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-[var(--text-muted)]/50 shadow-sm" placeholder="Enter your email" type="email"/>
<button className="w-full sm:w-auto accent-button font-bold px-10 py-5 rounded-2xl whitespace-nowrap shadow-xl shadow-primary/10">
                Get Early Access
            </button>
</div>
<div className="mt-10">
<button className="text-[var(--text-muted)] hover:text-primary font-semibold flex items-center gap-2 mx-auto transition-colors">
<span className="material-symbols-outlined text-base">rocket_launch</span>
                Explore Problems
            </button>
</div>
</div>
<div className="w-full max-w-6xl mx-auto relative px-4">
<div className="bg-white p-4 md:p-8 rounded-[3rem] magazine-shadow border border-[var(--border-soft)]">
<div className="flex items-center justify-between mb-12">
<div className="flex gap-2">
<div className="w-2.5 h-2.5 rounded-full bg-[#E5E1DA]"></div>
<div className="w-2.5 h-2.5 rounded-full bg-[#E5E1DA]"></div>
<div className="w-2.5 h-2.5 rounded-full bg-[#E5E1DA]"></div>
</div>
<div className="h-10 w-64 bg-[var(--bg-soft)] rounded-xl border border-[var(--border-soft)]"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="group p-2">
<div className="flex justify-between items-start mb-6">
<span className="px-3 py-1 secondary-tag text-[0.65rem] font-bold rounded-lg uppercase tracking-wider">Fintech</span>
<div className="text-3xl font-black text-[var(--accent-coral)]">82</div>
</div>
<h3 className="text-xl font-bold text-[var(--text-main)] mb-3">UPI refunds take too long</h3>
<p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">Users complain about 5-7 day waiting periods for failed transactions.</p>
<div className="h-2 w-full bg-[var(--bg-soft)] rounded-full overflow-hidden">
<div className="h-full w-[82%] bg-[var(--accent-coral)]"></div>
</div>
<div className="mt-3 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Orbit Score</div>
</div>
<div className="group p-2">
<div className="flex justify-between items-start mb-6">
<span className="px-3 py-1 secondary-tag text-[0.65rem] font-bold rounded-lg uppercase tracking-wider">Logistics</span>
<div className="text-3xl font-black text-[var(--earthy-secondary)]">74</div>
</div>
<h3 className="text-xl font-bold text-[var(--text-main)] mb-3">Last-mile address errors</h3>
<p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">Local delivery partners struggle with non-standardized apartment tags.</p>
<div className="h-2 w-full bg-[var(--bg-soft)] rounded-full overflow-hidden">
<div className="h-full w-[74%] bg-[var(--earthy-secondary)]"></div>
</div>
<div className="mt-3 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Orbit Score</div>
</div>
<div className="group p-2">
<div className="flex justify-between items-start mb-6">
<span className="px-3 py-1 secondary-tag text-[0.65rem] font-bold rounded-lg uppercase tracking-wider text-[var(--accent-coral)] bg-primary/10">Health</span>
<div className="text-3xl font-black text-[var(--accent-coral)]">91</div>
</div>
<h3 className="text-xl font-bold text-[var(--text-main)] mb-3">Chronic care data silo</h3>
<p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">Patients are unable to sync glucose data with dietary apps automatically.</p>
<div className="h-2 w-full bg-[var(--bg-soft)] rounded-full overflow-hidden">
<div className="h-full w-[91%] bg-[var(--accent-coral)]"></div>
</div>
<div className="mt-3 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Orbit Score</div>
</div>
</div>
</div>
</div>
</section>
<section className="py-40 px-6 max-w-7xl mx-auto">
<div className="grid md:grid-cols-2 gap-20 items-start mb-32">
<div>
<span className="text-[var(--accent-coral)] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">The Process</span>
<h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] tracking-tight leading-[0.9]">Three steps to your next <span className="italic font-serif">billion-dollar</span> idea.</h2>
</div>
<div className="md:pt-16">
<p className="text-[var(--text-muted)] text-2xl font-light leading-relaxed">Our proprietary engine does the heavy lifting while you focus on building.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-[var(--border-soft)] pt-20">
<div className="space-y-8">
<div className="w-14 h-14 bg-white rounded-full flex items-center justify-center magazine-shadow text-[var(--accent-coral)]">
<span className="material-symbols-outlined text-2xl">search_insights</span>
</div>
<div>
<h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">1. Discover</h3>
<p className="text-[var(--text-muted)] text-lg leading-relaxed font-light">Orbit crawls Reddit, Twitter, and niche forums to aggregate recurring frustrations and hidden market gaps.</p>
</div>
</div>
<div className="space-y-8">
<div className="w-14 h-14 bg-white rounded-full flex items-center justify-center magazine-shadow text-[var(--earthy-secondary)]">
<span className="material-symbols-outlined text-2xl">psychology_alt</span>
</div>
<div>
<h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">2. AI Structures</h3>
<p className="text-[var(--text-muted)] text-lg leading-relaxed font-light">Our AI analyzes complaint sentiment, market size, and technical feasibility to score every opportunity.</p>
</div>
</div>
<div className="space-y-8">
<div className="w-14 h-14 bg-white rounded-full flex items-center justify-center magazine-shadow text-[var(--accent-coral)]">
<span className="material-symbols-outlined text-2xl">construction</span>
</div>
<div>
<h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">3. Build</h3>
<p className="text-[var(--text-muted)] text-lg leading-relaxed font-light">Get a comprehensive brief with suggested tech stacks, competitor analysis, and MVP roadmaps.</p>
</div>
</div>
</div>
</section>
<section className="py-40 px-6 max-w-7xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-12 gap-10">
<div className="md:col-span-7 bg-white rounded-[3rem] p-12 flex flex-col justify-between magazine-shadow border border-[var(--border-soft)] min-h-[450px]">
<div className="space-y-6">
<div className="w-12 h-12 bg-[var(--bg-soft)] rounded-2xl flex items-center justify-center text-[var(--accent-coral)]">
<span className="material-symbols-outlined">dynamic_feed</span>
</div>
<h3 className="text-4xl font-bold text-[var(--text-main)]">Real-time Orbit Feed</h3>
<p className="text-[var(--text-muted)] text-xl leading-relaxed font-light max-w-md">Stay updated with a live stream of high-intent complaints as they happen across 50+ industries.</p>
</div>
<div className="mt-8 pt-8 border-t border-[var(--border-soft)]">
<span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]/50">Live Analytics</span>
</div>
</div>
<div className="md:col-span-5 bg-[var(--earthy-secondary)] rounded-[3rem] p-12 flex flex-col justify-between text-white magazine-shadow">
<span className="material-symbols-outlined text-5xl" data-weight="fill">auto_awesome</span>
<div>
<h3 className="text-3xl font-bold mb-4">Build With AI</h3>
<p className="text-white/80 text-lg leading-relaxed font-light">One-click export to major frameworks with pre-written business logic based on user pain points.</p>
</div>
</div>
<div className="md:col-span-5 bg-white rounded-[3rem] p-12 magazine-shadow border border-[var(--border-soft)] flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-8">
<span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-coral)]"></span>
<span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Market Readiness</span>
</div>
<h3 className="text-3xl font-bold text-[var(--text-main)] mb-4">Deep AI Insights</h3>
<p className="text-[var(--text-muted)] text-lg leading-relaxed font-light mb-10">We don't just find problems; we find the underlying 'Why' through multi-layered analysis.</p>
</div>
<img className="w-full h-48 object-cover rounded-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH1k4avfeaVY8MSeqyh3NlBCRlSivrA-SB5TUdq0Op4pqysvTmRrVbKMgbYmMNeXpIoD0puKITOJAIQOHo68tHAdHBLyrWJFqiTZKkrQp8SNcJ_hGHYRo3E3ADhhQkcVyOKM6MmZOkF218ES56ps2jNBfYkjEtLrEWmRIAITWKFWcfznI1g1nJ1LQ_GSHelpH0rqEFslpcUD1tPpGgN7XrPwF1o4iv07ja5nZQsRWp7J8iGpJOM2PXL0TjEYmdoJjhlLtJ061NUV9S"/>
</div>
<div className="md:col-span-7 bg-[var(--bg-soft)] rounded-[3rem] p-12 flex flex-col justify-center border border-[var(--border-soft)]">
<div className="max-w-xl">
<h3 className="text-4xl font-bold text-[var(--text-main)] mb-6 leading-tight">Feasibility Analysis that goes beyond code.</h3>
<p className="text-[var(--text-muted)] text-xl font-light leading-relaxed">Every problem card includes a regulatory risk assessment, estimated time to build (ETB), and potential monetization models.</p>
</div>
</div>
</div>
</section>
<section className="py-40 px-6">
<div className="max-w-6xl mx-auto bg-white rounded-[4rem] magazine-shadow border border-[var(--border-soft)] px-10 py-24 md:py-32 text-center relative overflow-hidden">
<div className="max-w-3xl mx-auto relative z-10">
<h2 className="text-5xl md:text-7xl font-black text-[var(--text-main)] tracking-tight mb-10 leading-[0.95]">
                Stop guessing startup ideas.<br/>Start building what matters.
            </h2>
<p className="text-[var(--text-muted)] text-2xl font-light mb-16">
                Join 2,500+ builders receiving validated problems directly in their inbox every week.
            </p>
<div className="flex flex-col sm:flex-row gap-6 justify-center">
<button className="accent-button font-black px-14 py-6 rounded-3xl text-xl shadow-2xl shadow-primary/20">Join Waitlist</button>
<button className="bg-transparent text-[var(--text-main)] border-2 border-[var(--border-soft)] px-14 py-6 rounded-3xl text-xl font-bold hover:bg-[var(--bg-soft)] transition-colors">Contact Sales</button>
</div>
</div>
</div>
</section>
<footer className="py-20 px-8 border-t border-[var(--border-soft)]">
<div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
<div className="flex flex-col items-center md:items-start gap-4">
<div className="text-2xl font-black text-[var(--text-main)]">Orbit Celestial</div>
<p className="text-sm font-['Inter'] tracking-widest uppercase text-[var(--text-muted)]/60 text-center md:text-left">© 2024 Orbit Celestial. All rights reserved.</p>
</div>
<div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
<a className="text-[var(--text-muted)] hover:text-primary transition-colors text-sm font-bold tracking-widest uppercase" href="#">Privacy</a>
<a className="text-[var(--text-muted)] hover:text-primary transition-colors text-sm font-bold tracking-widest uppercase" href="#">Terms</a>
<a className="text-[var(--text-muted)] hover:text-primary transition-colors text-sm font-bold tracking-widest uppercase" href="#">Twitter</a>
<a className="text-[var(--accent-coral)] hover:text-primary transition-colors text-sm font-bold tracking-widest uppercase" href="#">Github</a>
</div>
</div>
</footer>
    </div>
  );
}
