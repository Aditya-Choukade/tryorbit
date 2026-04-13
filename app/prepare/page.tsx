import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/20 min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* eslint-disable @next/next/no-img-element */}
      {/* TopNavBar */}
<header className="fixed top-0 w-full flex justify-between items-center px-8 h-20 z-50 bg-[#F8F7F4]/70 backdrop-blur-xl">
<div className="flex items-center gap-2"><img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" /><div className="text-2xl font-black tracking-tighter text-stone-900">Orbit</div></div>
<div className="flex items-center gap-6">
<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Status: Synthesizing</span>
<div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline flex items-center justify-center">
<span className="material-symbols-outlined text-sm text-stone-500">account_circle</span>
</div>
</div>
</header>
{/* Main Content Canvas */}
<main className="relative w-full h-screen flex items-center justify-center atmospheric-blur">
{/* Background Elements */}
<div className="absolute inset-0 orbit-glow pointer-events-none"></div>
{/* Loading Container */}
<div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
{/* Sophisticated Progress Ring Component */}
<div className="relative mb-16 flex items-center justify-center">
{/* Inner Core Glow */}
<div className="absolute w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
{/* Refined Outer Ring */}
<div className="w-48 h-48 rounded-full border-2 border-primary/5 flex items-center justify-center animate-pulse-ring">
<div className="w-40 h-40 rounded-full border border-primary/10 flex items-center justify-center">
<div className="w-32 h-32 rounded-full border-t-2 border-primary animate-spin" style={{ animationDuration: "1.5s" }}></div>
</div>
</div>
{/* Floating Elements */}
<div className="absolute -top-4 -right-8 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-outline">
<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Market Analysis</span>
</div>
<div className="absolute -bottom-6 -left-12 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-outline">
<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Data Synthesis</span>
</div>
</div>
{/* Typography Lockup */}
<div className="space-y-6">
<h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface leading-[0.9]">
                    Preparing your <span className="italic font-light text-primary">idea...</span>
</h1>
<div className="flex flex-col items-center gap-4">
<p className="text-on-surface-variant text-lg font-light max-w-md">
                        Orbit is crunching market signals and problem vectors to architect your startup brief.
                    </p>
{/* Progress Metadata */}
<div className="w-full max-w-xs mt-8 space-y-2">
<div className="flex justify-between items-end">
<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Orbit Score Projection</span>
<span className="text-sm font-bold text-primary">84%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary w-4/5 rounded-full"></div>
</div>
</div>
<Link href="/problem/1" className="mt-8 bg-primary hover:bg-primary/90 text-on-primary px-8 py-4 rounded-full font-bold tracking-widest text-xs uppercase shadow-lg shadow-primary/10 transition-all active:scale-95 inline-flex">View Details</Link>
</div>
</div>
</div>
{/* Decorative Magazine Elements */}
<div className="absolute bottom-12 left-12 hidden lg:block">
<div className="flex flex-col gap-1 border-l border-outline pl-4">
<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Engine V.4.2</span>
<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Problem Discovery Suite</span>
</div>
</div>
<div className="absolute bottom-12 right-12 hidden lg:block">
<div className="text-right">
<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">System Time</span>
<p className="text-xl font-black text-on-surface">00:04:21</p>
</div>
</div>
</main>
{/* Side Decoration (Subtle Grid) */}
<div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#0C0A09 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
    </div>
  );
}
