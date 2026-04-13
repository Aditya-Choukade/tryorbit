import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30">
      {/* eslint-disable @next/next/no-img-element */}
      {/* TopAppBar Shell (Suppressed Navigation for Task Focus) */}
<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 rounded-full mt-6 mx-auto w-[90%] max-w-7xl bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(141,123,104,0.1)] border border-outline-variant/30">
<Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-stone-900">
  <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" />
  Orbit
</Link>
<div className="flex items-center gap-6">
<span className="text-stone-500 font-label text-[10px] uppercase tracking-[0.3em] font-bold">Step 3 — Final</span>
<span className="material-symbols-outlined text-stone-500 hover:text-stone-900 cursor-pointer" data-icon="account_circle">account_circle</span>
</div>
</nav>
<main className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
<div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
{/* Hero Content Section */}
<div className="lg:col-span-7 flex flex-col items-start text-left">
<div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant">System Initialized</span>
</div>
<h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-on-surface mb-8">
                    You're <span className="italic font-normal font-serif">all</span> set.
                </h1>
<p className="text-xl md:text-2xl font-light text-on-surface-variant max-w-xl mb-12 leading-relaxed">
                    Your personalized problem discovery engine is ready to scan, analyze, and illuminate the blind spots in your market.
                </p>
<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
<Link href="/dashboard" className="px-10 py-5 bg-primary text-white rounded-full font-black tracking-tight text-lg editorial-shadow hover:opacity-90 transition-all active:scale-95 inline-flex items-center justify-center">
                        Go to Dashboard
                    </Link>
<button className="px-10 py-5 border-2 border-outline-variant text-on-surface rounded-full font-bold tracking-tight text-lg hover:bg-surface-bright transition-colors">
                        View Config
                    </button>
</div>
</div>
{/* Visual Representation Section (Bento/Magazine Style) */}
<div className="lg:col-span-5 relative">
<div className="relative z-10 p-12 aspect-square rounded-xl bg-surface-bright editorial-shadow flex items-center justify-center overflow-hidden">
{/* Abstract Orbit Graphic */}
<div className="absolute inset-0 opacity-10 pointer-events-none">
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[0.5px] border-secondary rounded-full"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[0.5px] border-secondary rounded-full"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-[0.5px] border-secondary rounded-full"></div>
</div>
<div className="relative flex flex-col items-center">
<div className="w-32 h-32 md:w-48 md:h-48 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_20px_50px_-10px_rgba(255,127,106,0.4)] mb-8">
<span className="material-symbols-outlined !text-6xl md:!text-8xl" data-icon="check_circle" data-weight="fill" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span>
</div>
<div className="text-center">
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2">Orbit Score</span>
<div className="text-4xl font-black text-on-surface">99.2%</div>
</div>
</div>
</div>
{/* Floating Editorial Cards */}
<div className="absolute -top-6 -right-6 w-40 p-4 bg-tertiary text-white rounded-lg editorial-shadow hidden md:block">
<span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-50 block mb-2">Engine Status</span>
<div className="flex items-center justify-between">
<span className="text-xs font-bold">Active</span>
<div className="w-2 h-2 rounded-full bg-green-400"></div>
</div>
</div>
<div className="absolute -bottom-10 -left-10 w-64 p-6 bg-surface-bright rounded-lg editorial-shadow hidden md:block">
<div className="flex gap-4 items-center">
<div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="rocket_launch">rocket_launch</span>
</div>
<div>
<span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 block">Discovery</span>
<span className="text-sm font-black text-on-surface">Real-time Sync</span>
</div>
</div>
</div>
</div>
</div>
</main>
{/* Content Sections for Value Reinforcement */}
<section className="bg-surface py-32 px-8">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
<div className="max-w-2xl">
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block">Next Steps</span>
<h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-on-surface">
                        Harness the power of <br/><span className="italic font-serif font-normal">contextual</span> intelligence.
                    </h2>
</div>
<div className="text-stone-500 font-light text-lg max-w-sm">
                    Explore how Orbit transforms raw data into actionable problem-solving pathways.
                </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
{/* Card 1 */}
<div className="group">
<div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 relative">
<img alt="Digital grid interface" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="Modern high-tech digital grid interface with glowing blue lines and abstract data visualization points in a dark studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwbPtRKvM-gtzxK9MrmIUpeJBG8YV7QWdjZwdO8RDveXaBPNFs0vK92qHynYrQ7YmL70VoepOmFGBp3JJLISrwN4YdNYkBFl3dCPubU29sHWOWzezbYz-yJ0UzvZjQ3EITtB8XOHNM1sANKTJUhCrMNcf3xHeKBBGo_YDbmVsdv8gjxhxtyJDG3bWA_M4nUHzPgPXT6xDhHCzi_-ObMq9Bgbow2HEK-aDF71fvDzRlZlrF6-fTqPtUwGEv2N_Em0p3R4UiSpwlQ9s"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<div className="absolute bottom-6 left-6">
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white opacity-80 block mb-2">Module 01</span>
<h3 className="text-2xl font-black text-white tracking-tight">Market Scanning</h3>
</div>
</div>
<p className="text-stone-500 font-light leading-relaxed">Autonomous identification of recurring customer pain points across 50+ channels.</p>
</div>
{/* Card 2 */}
<div className="group">
<div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 relative">
<img alt="Circuit board close up" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="Macro photography of a sleek circuit board with golden traces and integrated chips under dramatic orange rim lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj6XBAUlhI-FenizgAQRjz7-id3NPex5ekKLfpZ5AhRAN3S0X0GZdURxx_MxAaNBaVazHAap2OtpC04BC3JUmmXHSX2oK7w1dGbCR51-tgp3PZx2rFSQPU8o8JFYjY681zYSZdY8ABm3FnbVWFP-1-Bl3-6smD1R3ByBWdiPYr7Wb0NasfXiWrRaQKdQ7K5M3dR9VwLDcZP44-LTIWTX-gMQJ-e9eZ-4OgLE0FOMtCOFbOLeBDhI5NuzL39y8TpapixdZgMgRcsVI"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<div className="absolute bottom-6 left-6">
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white opacity-80 block mb-2">Module 02</span>
<h3 className="text-2xl font-black text-white tracking-tight">Pattern Matching</h3>
</div>
</div>
<p className="text-stone-500 font-light leading-relaxed">AI-driven clustering that reveals the hidden architecture of user frustrations.</p>
</div>
{/* Card 3 */}
<div className="group">
<div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 relative">
<img alt="Satellite view of Earth" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="Cinematic wide shot of Earth from space showing atmospheric glow and city lights at night with high contrast and deep shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoNn9kDuYwPdlyPhmqPc1NgmaBqVU0o4ErdvNIz2hYif4VF6QksRQtzx41PSJQDBWoOwx-v1VS-4FPVsuyNwOov5Qvb78ZmYtAh5wLwVNKXSmhaBQfaG0x4_64WckGOLf7Sdt3MbwR5UDjf0PvjzDzoCDddLUsRvTpLmErKhrpPvKnkRLiknH3bf7aAqHrlMUkcerZY-HSR0dcAds5VXNY_TGgKeEM2vP9Scg42YMdbSBXBSt-jjmpeNv5dF_ZNNYOoipqmZt49mM"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<div className="absolute bottom-6 left-6">
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white opacity-80 block mb-2">Module 03</span>
<h3 className="text-2xl font-black text-white tracking-tight">Signal Amplification</h3>
</div>
</div>
<p className="text-stone-500 font-light leading-relaxed">Prioritize opportunities by filtering noise and focusing on high-value signals.</p>
</div>
</div>
</div>
</section>
{/* Footer / Bottom Branding */}
<footer className="py-20 bg-background text-center">
<div className="inline-block mb-8">
<div className="text-4xl font-black tracking-[-0.05em] text-[#FF7F6A] font-headline">Orbit</div>
</div>
<div className="text-[10px] uppercase tracking-[0.5em] font-bold text-stone-400 mb-12">Intelligence Grounded in Reality</div>
<div className="flex justify-center gap-8 text-stone-500 text-sm font-medium">
<a className="hover:text-primary transition-colors" href="#">Documentation</a>
<a className="hover:text-primary transition-colors" href="#">Privacy</a>
<a className="hover:text-primary transition-colors" href="#">System Status</a>
</div>
</footer>
{/* No bottom nav bar because this is a final onboarding state - focus on the primary action */}
    </div>
  );
}
