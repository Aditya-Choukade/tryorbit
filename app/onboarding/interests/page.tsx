import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30">
      {/* eslint-disable @next/next/no-img-element */}
      {/* Top Navigation Bar (Shared Component Logic) */}
<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 rounded-full mt-6 mx-auto w-[90%] max-w-7xl bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(141,123,104,0.1)] border border-outline-variant/30">
<Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-stone-900">
  <img src="/orbit-logo.png" alt="Orbit Logo" className="w-6 h-6 object-contain" />
  Orbit
</Link>
<div className="flex items-center gap-6">
<span className="text-stone-500 font-label text-[10px] uppercase tracking-[0.3em] font-bold">Step 2 of 3</span>
<span className="material-symbols-outlined text-stone-500 hover:text-stone-900 cursor-pointer" data-icon="account_circle">account_circle</span>
</div>
</nav>
{/* Main Content Canvas */}
<main className="min-h-screen pt-32 pb-40 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start">
{/* Header Section */}
<header className="mb-16 max-w-3xl">
<h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                What are you <br/> <span className="italic font-normal font-[Newsreader] text-primary">interested</span> in?
            </h1>
<p className="text-xl md:text-2xl font-light text-on-surface-variant leading-relaxed">
                Select your focus areas to personalize your discovery feed.
            </p>
</header>
{/* Interest Selection Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
{/* Fintech Card */}
<div className="group relative bg-surface-bright p-12 rounded-xl magazine-shadow border-2 border-transparent transition-all duration-500 hover:scale-[1.02] cursor-pointer purple-glow-active">
<div className="mb-12 flex justify-between items-start">
<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-4xl" data-icon="payments">payments</span>
</div>
<div className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center bg-secondary-fixed text-on-secondary-fixed">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\'FILL\' 1" }}>check</span>
</div>
</div>
<h3 className="text-3xl font-black tracking-tight mb-4">Fintech</h3>
<p className="text-on-surface-variant font-light leading-snug mb-8">Neobanking, blockchain assets, and the future of digital liquidity.</p>
<div className="h-[200px] w-full rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
<img alt="Abstract digital banking interface" className="w-full h-full object-cover" data-alt="Modern minimalist aesthetic of digital currency flowing through sleek geometric glass structures with soft neon accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsN71B98lEk1UbHZCOTH_gwnHp08pmrWUaHx3Vos77nEBjJjtKQkHsMvYjYgEd-wucEpOoDmSr0vB9nSUqopUBLWGJRny-_UwF6uk7kWU24QjFRNq9C-6SwMvAlz4zrRkQYtQpiUX9SX9deLx2YQvxtpN_t7HnpMrV0peImrn9pu2jEj-cg3GBs4387-RjC1GwJ4xOlnyypW93LGlWIFwVdfN6ZGepFFD0miseKjbkRRAs4S_Kq-pcdXpfgq5sQo3Gnt25662jo9g"/>
</div>
</div>
{/* SaaS Card */}
<div className="group relative bg-surface-bright p-12 rounded-xl magazine-shadow border-2 border-outline-variant transition-all duration-500 hover:scale-[1.02] cursor-pointer hover:border-outline">
<div className="mb-12 flex justify-between items-start">
<div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-4xl" data-icon="cloud">cloud</span>
</div>
<div className="w-8 h-8 rounded-full border-2 border-outline-variant"></div>
</div>
<h3 className="text-3xl font-black tracking-tight mb-4">SaaS</h3>
<p className="text-on-surface-variant font-light leading-snug mb-8">Cloud infrastructure, enterprise scaling, and product-led growth.</p>
<div className="h-[200px] w-full rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
<img alt="Satellite data network" className="w-full h-full object-cover" data-alt="Hyper-detailed macro shot of shimmering fiber optic cables glowing with soft blue and white light in a dark tech environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDGaEOB3cvPm8pa5e7_ie2UsxKyqet6NR1i9ezxQZoCTZbsYbKxVZIsPvz6tMGKAnoQehS6rM40DsyHdcpyBZJVI4txy7lMq5SnDreMmp5niyArGcm--UTgo5czs8t3XszmE1KpTpaHgOiW7g42AQqpjcu-o6R_Gxaaw-9ZSaCLH0mQHak6sJc-LGzTNGLK3cAooRoqjaxoY3YUfiW_mi8M2Fv-lQ1bBGoBnXfgSJ4yh1rWzHteSKyzwrCOXQtWQyZNv12kYOWAN4"/>
</div>
</div>
{/* Health Card */}
<div className="group relative bg-surface-bright p-12 rounded-xl magazine-shadow border-2 border-outline-variant transition-all duration-500 hover:scale-[1.02] cursor-pointer hover:border-outline">
<div className="mb-12 flex justify-between items-start">
<div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-4xl" data-icon="favorite">favorite</span>
</div>
<div className="w-8 h-8 rounded-full border-2 border-outline-variant"></div>
</div>
<h3 className="text-3xl font-black tracking-tight mb-4">Health</h3>
<p className="text-on-surface-variant font-light leading-snug mb-8">Biotech breakthroughs, personalized wellness, and longevity tech.</p>
<div className="h-[200px] w-full rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
<img alt="Modern medical laboratory" className="w-full h-full object-cover" data-alt="Sun-drenched minimalist laboratory with clean white surfaces and organic biological samples in elegant glass vessels" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-2aEWonDHXaxPHKvlrFfzfsuk1-2gxL3g17d6FIGMKAS6lcq0ZFpxH69dseCNUkzUNqaAl35x-GK7kVPXLv3Z9TvJHjBCSW-LALbYQMHdreBIPk1oXkallZGbnE-tZ9zD8MPHO0cTgKGE6Lifxw2OEFlPVLe9kEGJDgtrnUU9YXFiIjYzkBoyh1WtVjD1cS1vR4eq6GX3wM28170-tNRUKCOo3dxSdPeSXr4ZQG66JDymtuTfpmLOIZO5IDAZYp82XZtahYF1ddw"/>
</div>
</div>
</div>
{/* Action Section */}
<footer className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-outline-variant">
<div className="flex items-center gap-4">
<span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">Selection Count</span>
<div className="flex gap-1">
<div className="w-8 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
</div>
</div>
<Link href="/onboarding/complete" className="w-full md:w-auto px-12 py-6 bg-primary text-white rounded-full font-black text-lg shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all text-center">
                Personalize My Feed
            </Link>
</footer>
</main>
{/* Contextual Element: Progress Orbit */}
<div className="fixed bottom-12 left-12 hidden lg:block">
<div className="relative w-24 h-24">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container-high" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
<circle className="text-primary" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="125.6" strokeWidth="8"></circle>
</svg>
<div className="absolute inset-0 flex items-center justify-center font-black text-primary">
                50%
            </div>
</div>
</div>
    </div>
  );
}
