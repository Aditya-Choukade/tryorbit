import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden">
      {/* eslint-disable @next/next/no-img-element */}
      {/* TopNavBar */}
<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 rounded-full mt-6 mx-auto w-[90%] max-w-7xl bg-white/70 backdrop-blur-xl shadow-[0_10_40px_-10px_rgba(141,123,104,0.1)]">
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><div className="text-2xl font-black tracking-tighter text-stone-900">Orbit</div></div>
<div className="hidden md:flex gap-8 items-center">
<a className="text-stone-900 border-b-2 border-orange-500 pb-1 font-inter tracking-tight font-black uppercase text-[10px]" href="#">Platform</a>
<a className="text-stone-500 font-medium hover:text-orange-500 transition-colors duration-300 font-inter tracking-tight font-black uppercase text-[10px]" href="#">Case Studies</a>
<a className="text-stone-500 font-medium hover:text-orange-500 transition-colors duration-300 font-inter tracking-tight font-black uppercase text-[10px]" href="#">Intelligence</a>
<a className="text-stone-500 font-medium hover:text-orange-500 transition-colors duration-300 font-inter tracking-tight font-black uppercase text-[10px]" href="#">Pricing</a>
</div>
<Link href="/dashboard" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] scale-95 active:scale-90 transition-transform shadow-lg shadow-primary/20 inline-flex">
            Launch App
        </Link>
</nav>
{/* Hero Section */}
<header className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
<div className="grid lg:grid-cols-2 gap-16 items-center">
<div className="space-y-8">
<div className="flex flex-col gap-6 items-start">
  <a href="https://www.producthunt.com/products/orbit-372?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-orbit-2027" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
    <img alt="Orbit - Discover real problems worth building startups for. | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1125111&theme=light&t=1776409081995" />
  </a>
  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Intelligence Engine v1.0</p>
</div>
<h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] leading-[0.9] text-on-surface">
                    Discover Problems <span className="serif-italic font-light text-primary">Worth</span> Building For.
                </h1>
<p className="text-2xl font-light text-on-surface-variant max-w-xl leading-relaxed">
                    Orbit scans real user complaints across the web and turns them into startup-ready ideas. <span className="font-bold text-on-surface">Stop guessing.</span>
</p>
<div className="flex flex-wrap gap-4 pt-4">
<Link href="/dashboard" className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-xl shadow-primary/20 inline-flex">
                        Start Exploring
                    </Link>
<button className="border-2 border-outline-variant px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-surface-container-high transition-all">
                        Watch Demo
                    </button>
</div>
</div>
{/* Dashboard Mockup (Hero) */}
<div className="relative group">
<div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl -z-10 group-hover:bg-primary/10 transition-colors"></div>
<div className="bg-surface-bright rounded-xl p-6 editorial-shadow border border-outline-variant transform rotate-2 hover:rotate-0 transition-transform duration-700">
<div className="flex items-center gap-2 mb-8">
<div className="w-3 h-3 rounded-full bg-error/20"></div>
<div className="w-3 h-3 rounded-full bg-primary/20"></div>
<div className="w-3 h-3 rounded-full bg-secondary/20"></div>
<div className="ml-4 h-4 w-32 bg-surface-container rounded-full"></div>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="h-40 bg-surface-container-low rounded-lg p-4 flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary" data-icon="hub">hub</span>
<span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">92% Match</span>
</div>
<div className="text-sm font-black uppercase tracking-tight">Supply Chain Fragility</div>
</div>
<div className="h-40 bg-primary text-white rounded-lg p-4 flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined" data-icon="trending_up">trending_up</span>
<span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">Trending</span>
</div>
<div className="text-sm font-black uppercase tracking-tight">LLM Observability</div>
</div>
<div className="col-span-2 h-48 bg-tertiary text-white rounded-lg p-6 overflow-hidden relative">
<div className="relative z-10">
<p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">Market Gap Identified</p>
<h3 className="text-xl font-bold mb-4">Fragmented data in precision agriculture...</h3>
<div className="flex gap-2">
<div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase">Reddit</div>
<div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase">HN</div>
</div>
</div>
<div className="absolute right-[-20px] bottom-[-20px] opacity-10">
<span className="material-symbols-outlined !text-9xl" data-icon="analytics">analytics</span>
</div>
</div>
</div>
</div>
</div>
</div>
</header>
{/* Product Showcase */}
<section className="py-32 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-6">
<div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
<div className="max-w-2xl">
<p className="text-[10px] font-bold tracking-[0.3em] uppercase text-on-surface-variant mb-4">Capability Spectrum</p>
<h2 className="text-5xl font-black tracking-tighter text-on-surface leading-none">High-Fidelity <span className="serif-italic font-light">Validation</span></h2>
</div>
<div className="hidden md:block h-[2px] flex-grow mx-12 bg-outline-variant mb-4"></div>
</div>
{/* Bento Grid Showcase */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
{/* Real-time Orbit Feed */}
<div className="md:col-span-7 bg-surface-bright rounded-xl p-12 editorial-shadow border border-outline-variant flex flex-col justify-between min-h-[500px]">
<div>
<div className="flex items-center gap-4 mb-8">
<span className="p-3 bg-primary-fixed rounded-2xl">
<span className="material-symbols-outlined text-primary" data-icon="rss_feed">rss_feed</span>
</span>
<h3 className="text-2xl font-black uppercase tracking-tighter">Real-time Orbit Feed</h3>
</div>
<div className="space-y-4">
<div className="p-6 bg-surface-container rounded-lg border-l-4 border-primary">
<div className="flex justify-between mb-2">
<span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">User Complaint #8293</span>
<span className="text-[10px] font-black uppercase tracking-widest text-primary">Urgent</span>
</div>
<p className="text-lg font-medium">"I would pay $100/mo for a tool that manages multi-cloud egress costs without the AWS console headache."</p>
</div>
<div className="p-6 bg-surface-container/50 rounded-lg opacity-60">
<p className="text-sm">"Why is it so hard to find local hardware engineers for short-term prototyping?"</p>
</div>
</div>
</div>
<img className="w-full h-48 object-cover rounded-xl mt-8 grayscale hover:grayscale-0 transition-all duration-700" data-alt="abstract data visualization with soft orange and grey tones showing connections and nodes in a futuristic style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3-I3XcVtaYblBGA22buV3YN_QuRlCo7iD4PaaKZwH8lmHWZRHPB8N-3IXByr45lSSByrO-DHSTguX3EcbPovCY7tbUkbhB4bnfVbKMCvUq4-skBsyDaq60a7L-b5hoFB4IxG3OCOjvIRvvUo4TNiz9vsnKlhVUblCKytplIp2qbPqJtFpyGS2STPpszL_GDO8f8ZCZKGNYhzImZqCgNE7mkjz5dnkWWtt_g-tb4CqBSWk5sTCIKC7nq2E5BxLpycPH-HtWYyKZtU"/>
</div>
{/* Decision Intelligence */}
<div className="md:col-span-5 bg-tertiary text-white rounded-xl p-12 flex flex-col justify-between min-h-[500px]">
<div>
<div className="flex justify-between items-start mb-12">
<h3 className="text-4xl font-black uppercase tracking-tighter leading-none">Orbit Score</h3>
<div className="text-6xl font-black text-primary">87</div>
</div>
<div className="space-y-8">
<div>
<p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Why this matters</p>
<p className="text-xl font-light leading-relaxed">High saturation of complaints in the <span className="font-bold text-primary">FinOps</span> sector combined with low existing solution sentiment.</p>
</div>
<div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
<div className="w-[87%] h-full bg-primary"></div>
</div>
</div>
</div>
<div className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
<div className="flex gap-4 items-center">
<span className="material-symbols-outlined text-primary" data-icon="lightbulb">lightbulb</span>
<p className="text-[10px] font-bold tracking-[0.2em] uppercase">Intelligence Insight: Pivot to mid-market</p>
</div>
</div>
</div>
{/* Validation Engine */}
<div className="md:col-span-12 bg-white rounded-xl p-12 editorial-shadow border border-outline-variant">
<div className="grid md:grid-cols-2 gap-16 items-center">
<div>
<h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Validation Engine</h3>
<p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                                One input. Total clarity. Drop a URL, a tweet, or a sentence. Orbit does the heavy lifting to find the commercial viability.
                            </p>
<form action="/validate" method="GET" className="relative">
<input name="idea" className="w-full p-6 bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-on-surface-variant/50" placeholder="Enter a problem or URL..." type="text" required/>
<button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-on-surface text-white p-3 rounded-xl inline-flex hover:scale-105 transition-transform">
<span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</form>
</div>
<div className="bg-surface rounded-3xl p-8 border border-outline-variant">
<div className="space-y-4">
<div className="flex items-center gap-4 text-sm font-bold text-on-surface-variant">
<span className="material-symbols-outlined text-primary" data-icon="check_circle" data-weight="fill">check_circle</span>
                                    Cross-referencing 14,000 threads...
                                </div>
<div className="flex items-center gap-4 text-sm font-bold text-on-surface-variant">
<span className="material-symbols-outlined text-primary" data-icon="check_circle" data-weight="fill">check_circle</span>
                                    Analyzing competitor landscape...
                                </div>
<div className="flex items-center gap-4 text-sm font-bold text-on-surface-variant opacity-40">
<span className="material-symbols-outlined" data-icon="circle">circle</span>
                                    Generating PRD &amp; Logic framework...
                                </div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Process Section */}
<section className="py-32 bg-surface">
<div className="max-w-7xl mx-auto px-6">
<div className="grid md:grid-cols-3 gap-16 relative">
{/* Step 1 */}
<div className="space-y-6">
<div className="text-8xl font-black text-on-surface/5 absolute -top-12 -z-10">01</div>
<div className="p-4 bg-surface-bright w-fit rounded-2xl shadow-sm border border-outline-variant">
<span className="material-symbols-outlined text-primary" data-icon="search_insights">search_insights</span>
</div>
<h3 className="text-2xl font-black uppercase tracking-tight">1. Discover</h3>
<p className="text-on-surface-variant leading-relaxed">Continuous ingestion from <span className="font-bold text-on-surface">Reddit</span>, <span className="font-bold text-on-surface">HackerNews</span>, and <span className="font-bold text-on-surface">Twitter</span>. We find where the pain is loudest.</p>
</div>
{/* Step 2 */}
<div className="space-y-6">
<div className="text-8xl font-black text-on-surface/5 absolute -top-12 md:left-1/3 -z-10">02</div>
<div className="p-4 bg-surface-bright w-fit rounded-2xl shadow-sm border border-outline-variant">
<span className="material-symbols-outlined text-primary" data-icon="architecture">architecture</span>
</div>
<h3 className="text-2xl font-black uppercase tracking-tight">2. Structure</h3>
<p className="text-on-surface-variant leading-relaxed">Our AI models extract intent and categorize problems by severity, frequency, and willingness to pay. No more noise.</p>
</div>
{/* Step 3 */}
<div className="space-y-6">
<div className="text-8xl font-black text-on-surface/5 absolute -top-12 md:left-2/3 -z-10">03</div>
<div className="p-4 bg-surface-bright w-fit rounded-2xl shadow-sm border border-outline-variant">
<span className="material-symbols-outlined text-primary" data-icon="rocket_launch">rocket_launch</span>
</div>
<h3 className="text-2xl font-black uppercase tracking-tight">3. Build</h3>
<p className="text-on-surface-variant leading-relaxed">Export validated opportunities directly to PRDs or boilerplate code. Start day one with a product people actually want.</p>
</div>
</div>
</div>
</section>
{/* Final CTA Section */}
<section className="py-32 px-6">
<div className="max-w-5xl mx-auto bg-primary rounded-xl p-16 md:p-24 text-center text-on-primary overflow-hidden relative">
<div className="relative z-10">
<h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
                    Stop guessing startup ideas. <span className="serif-italic font-light opacity-80">Start building</span> what matters.
                </h2>
<div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mt-12">
<input suppressHydrationWarning className="flex-grow p-5 rounded-full bg-white text-on-surface border-none text-lg focus:ring-0" placeholder="you@company.com" type="email"/>
<Link href="/login" className="bg-on-surface text-white px-8 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform inline-flex whitespace-nowrap">
                        Start Building
                    </Link>
</div>
<p className="mt-8 text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">Join 2,500+ founders using Orbit</p>
</div>
{/* Decorative Elements */}
<div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
<div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
</div>
</section>
{/* Footer */}
<footer className="w-full px-12 py-24 flex flex-col md:flex-row justify-between items-center gap-8 bg-stone-50 border-t-0">
<div className="space-y-4">
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><div className="text-xl font-black text-stone-900">Orbit</div></div>
<p className="font-inter text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">© 2024 Orbit Intelligence. All rights reserved.</p>
</div>
<div className="flex gap-12">
<div className="flex flex-col gap-4">
<p className="font-inter text-[10px] font-bold tracking-[0.3em] uppercase text-stone-900">Company</p>
<a className="font-inter text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-all opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
<a className="font-inter text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-all opacity-80 hover:opacity-100" href="#">Terms of Service</a>
</div>
<div className="flex flex-col gap-4">
<p className="font-inter text-[10px] font-bold tracking-[0.3em] uppercase text-stone-900">Social</p>
<a className="font-inter text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-all opacity-80 hover:opacity-100" href="#">LinkedIn</a>
<a className="font-inter text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-all opacity-80 hover:opacity-100" href="#">Instagram</a>
</div>
</div>
</footer>
    </div>
  );
}
