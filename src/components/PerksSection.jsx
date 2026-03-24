import ScrollReveal from './ScrollReveal';

const iconClass = 'w-6 h-6 sm:w-7 sm:h-7 text-orange/80 group-hover:text-orange transition-colors duration-300';

const icons = {
  stipend: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  ),
  certificate: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
      <path d="M12 9v8" />
    </svg>
  ),
  brand: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  ),
  portfolio: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  agency: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v.01" />
      <path d="M9 12v.01" />
      <path d="M9 15v.01" />
      <path d="M9 18v.01" />
    </svg>
  ),
  mentorship: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const perks = [
  { iconKey: 'stipend', title: 'Monthly Stipend', desc: 'Your time and talent are valued. Compensation is included for every month of your internship.' },
  { iconKey: 'certificate', title: 'Official Certificate', desc: 'Walk away with a completion certificate from a real Dubai agency. It means something here.' },
  { iconKey: 'brand', title: 'Brand Activation', desc: 'On-ground experience working with real brands, from concept all the way to execution.' },
  { iconKey: 'portfolio', title: 'Portfolio Gold', desc: 'Live campaigns, real assets, actual results — everything you produce is yours to show off.' },
  { iconKey: 'agency', title: 'Agency Culture', desc: 'Inside a fast-moving creative team in the heart of Dubai Media City. Zero filter. Real work.' },
  { iconKey: 'mentorship', title: 'Mentorship', desc: "Work directly alongside senior creatives who've worked with major regional and global brands." }
];

export default function PerksSection() {
  return (
    <ScrollReveal>
      <section className="py-20 sm:py-[86px] px-[5vw] border-b border-border relative bg-s1 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-0 w-full h-[70%] -translate-y-1/2 pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,82,16,0.07) 0%, transparent 65%)' }}
          aria-hidden
        />
        {/* Right-side: layered glow + one arc + soft light streak — md+ only */}
        <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 90% at 105% 50%, rgba(255,82,16,0.05) 0%, rgba(255,82,16,0.02) 28%, transparent 52%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 50% 65% at 90% 50%, rgba(255,82,16,0.035) 0%, transparent 48%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'linear-gradient(168deg, transparent 45%, rgba(255,82,16,0.03) 70%, transparent 85%)',
            }}
          />
          <div
            className="absolute top-1/2 right-0 w-[min(400px,44vw)] h-[min(400px,44vw)] -translate-y-1/2 translate-x-[47%] rounded-full border border-white/[0.055]"
            aria-hidden
          />
        </div>

        <div className="relative">
          {/* Section label — hero-style pill */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full border border-orange/50 bg-gradient-to-r from-orange/15 via-orange/8 to-transparent px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.24em] uppercase text-orange mb-6 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 0 1px rgba(255,82,16,0.08) inset, 0 0 24px -4px rgba(255,82,16,0.2)',
            }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inset-0 rounded-full bg-orange animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-orange/60 blur-[3px]" />
            </span>
            02 — What You'll Get
          </div>

          {/* Heading — hero impact with accent */}
          <div className="relative">
            <div className="absolute -left-1 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/40 to-transparent hidden sm:block" aria-hidden />
            <h2
              className="font-bebas text-[clamp(40px,5.8vw,72px)] leading-[0.92] tracking-[0.03em] text-[#f0ede6] mb-4 pl-0 sm:pl-4"
              style={{ textShadow: '0 0 40px rgba(255,82,16,0.08)' }}
            >
              More than
              <br />
              <span className="text-orange drop-shadow-[0_0_20px_rgba(255,82,16,0.25)]">a line on your CV.</span>
            </h2>
          </div>

          {/* Perk cards — hero-level polish */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] sm:gap-1 mt-12 sm:mt-14">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="perk group relative bg-gradient-to-br from-s1 to-s2/80 border border-border p-6 sm:p-8 rounded-md overflow-hidden hover:from-s2 hover:to-s1 hover:border-orange/25 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,82,16,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] mb-4 transition-all duration-300 group-hover:scale-105 group-hover:border-orange/25 group-hover:bg-orange/5">
                    {icons[perk.iconKey]}
                  </div>
                  <h3 className="font-bebas text-[22px] sm:text-[24px] text-orange tracking-[0.02em] mb-2 drop-shadow-[0_0_16px_rgba(255,82,16,0.2)]">
                    {perk.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#c8c5be] leading-[1.7] font-normal tracking-[0.03em] group-hover:text-[#d8d5ce] transition-colors duration-300">
                    {perk.desc}
                  </p>
                  <span className="inline-block mt-3 text-orange/0 group-hover:text-orange/70 text-[20px] font-light transition-all duration-300 translate-x-0 group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
