import Link from "next/link";

export default function Page() {
  return (
    <div className="antialiased overflow-x-hidden">
      {/* eslint-disable @next/next/no-img-element */}
      {/* TopNavBar: Execution of Shared Component JSON */}
<nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 bg-white/70 backdrop-blur-xl border border-outline/30 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
<div className="flex justify-between items-center px-8 py-4">
<Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-on-surface">
  <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" />
  Orbit
</Link>
<div className="hidden md:flex gap-8 items-center">
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-inter tracking-tight font-black uppercase text-[10px]" href="#">Platform</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-inter tracking-tight font-black uppercase text-[10px]" href="#">Vision</a>
<a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-inter tracking-tight font-black uppercase text-[10px]" href="#">Journal</a>
</div>
<div className="flex items-center gap-4">
<Link href="/onboarding/welcome" className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest scale-95 active:duration-75 hover:shadow-lg hover:shadow-primary/20 transition-all inline-flex items-center">
        Sign In
      </Link>
</div>
</div>
</nav>
{/* Background Decoration */}
<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] celestial-glow rounded-full blur-[120px]"></div>
<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] celestial-glow rounded-full blur-[150px]"></div>
</div>
{/* Main Content Canvas */}
<main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
{/* Success Header Section */}
<div className="text-center max-w-3xl mb-16">
<div className="inline-flex items-center gap-2 mb-8 bg-surface-container-high/60 backdrop-blur-md border border-outline/50 px-4 py-2 rounded-full shadow-sm">
<span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "\'FILL\' 1" }}>check_circle</span>
<span className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Successfully Registered</span>
</div>
<h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] leading-[0.9] mb-8 text-on-surface">
            You're <span className="italic font-light font-serif">on</span> the list.
        </h1>
<p className="text-xl md:text-2xl font-light text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Thanks for joining the waitlist for Orbit. We're excited to have you on board.
        </p>
</div>
{/* Referral Bento Grid */}
<div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6">
{/* Position Card */}
<div className="md:col-span-5 bg-white border border-outline/40 rounded-xl p-10 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] backdrop-blur-sm">
<div>
<p className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-2">Your Position</p>
<div className="text-7xl font-black orbit-gradient-text leading-none">#420</div>
</div>
<div className="mt-8">
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[65%] rounded-full shadow-[0_0_15px_rgba(255,127,106,0.2)]"></div>
</div>
<p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Top 5% of early adopters</p>
</div>
</div>
{/* Referral Link Card */}
<div className="md:col-span-7 bg-surface-container-low border border-outline/40 rounded-xl p-10 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)]">
<div>
<h3 className="text-2xl font-bold mb-4 text-on-surface">Climb the leaderboard</h3>
<p className="text-on-surface-variant font-light mb-8">Share your unique link with colleagues to jump ahead in the queue for early beta access.</p>
</div>
<div className="space-y-4">
<div className="relative">
<input className="w-full bg-white border border-outline/40 rounded-2xl py-5 px-6 font-mono text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary/30 outline-none text-on-surface" readOnly type="text" value="https://orbit.app/ref/x92ks8"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 bg-on-surface text-surface-bright px-4 py-2 rounded-xl text-xs font-bold hover:bg-on-surface/90 transition-colors shadow-sm">
                        Copy
                    </button>
</div>
<div className="flex items-center gap-3 pt-4">
<p className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant mr-2">Share via</p>
<button className="w-12 h-12 rounded-full bg-white border border-outline/40 flex items-center justify-center hover:scale-105 hover:shadow-md transition-all text-on-surface">
<span className="material-symbols-outlined text-lg">brand_awareness</span> {/* Representation for X/Twitter */}
</button>
<button className="w-12 h-12 rounded-full bg-white border border-outline/40 flex items-center justify-center hover:scale-105 hover:shadow-md transition-all text-on-surface">
<span className="material-symbols-outlined text-lg">hub</span> {/* Representation for LinkedIn */}
</button>
<button className="w-12 h-12 rounded-full bg-white border border-outline/40 flex items-center justify-center hover:scale-105 hover:shadow-md transition-all text-on-surface">
<span className="material-symbols-outlined text-lg">alternate_email</span> {/* Representation for Threads */}
</button>
</div>
</div>
</div>
</div>
{/* Secondary Info */}
<div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl text-center md:text-left">
<div>
<p className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Beta Access</p>
<p className="text-sm text-on-surface-variant leading-relaxed">Rollout begins Q3 2024. Keep an eye on your inbox for the invitation key.</p>
</div>
<div>
<p className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Next Steps</p>
<p className="text-sm text-on-surface-variant leading-relaxed">Complete your profile on our platform to get personalized intelligence insights.</p>
</div>
<div>
<p className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Community</p>
<p className="text-sm text-on-surface-variant leading-relaxed">Join 4,000+ other pioneers in our Discord to shape the future of Orbit.</p>
</div>
</div>
</main>
{/* Footer: Execution of Shared Component JSON */}
<footer className="w-full py-12 bg-white border-t border-outline/30 mt-24">
<div className="flex flex-col items-center gap-4 w-full px-8">
<div className="text-lg font-black text-on-surface">Orbit</div>
<div className="flex gap-8">
<a className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary hover:underline decoration-primary decoration-2 underline-offset-4 transition-all" href="#">Privacy</a>
<a className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary hover:underline decoration-primary decoration-2 underline-offset-4 transition-all" href="#">Terms</a>
<a className="font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary hover:underline decoration-primary decoration-2 underline-offset-4 transition-all" href="#">Contact</a>
</div>
<p className="mt-4 font-inter text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/60">© 2024 Orbit Intelligence. Editorial Precision.</p>
</div>
</footer>
    </div>
  );
}
