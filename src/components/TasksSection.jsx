import ScrollReveal from './ScrollReveal';

const tasks = [
  'Social Media Creatives',
  'Digital Ads & Campaign Visuals',
  'Presentation Decks & Brand Assets',
  'Moodboards & Visual Direction',
  'Brainstorming & Concept Ideas',
  'Design Research & Inspiration',
  'Brand Activation Shoot Prep',
];

export default function TasksSection() {
  return (
    <ScrollReveal>
      <section className="py-20 sm:py-[86px] px-[5vw] border-b border-border relative overflow-hidden">
        {/* Subtle ambient glow behind content */}
        <div
          className="absolute top-1/2 left-0 w-full h-[80%] -translate-y-1/2 pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,82,16,0.06) 0%, transparent 70%)' }}
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
          {/* Section label — premium pill with breathing dot */}
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
            01 — What You'll Work On
          </div>

          {/* Heading — with subtle depth and accent line */}
          <div className="relative">
            <div className="absolute -left-1 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/40 to-transparent hidden sm:block" aria-hidden />
            <h2
              className="font-bebas text-[clamp(40px,5.8vw,72px)] leading-[0.92] tracking-[0.03em] text-[#f0ede6] mb-4 pl-0 sm:pl-4"
              style={{ textShadow: '0 0 40px rgba(255,82,16,0.08)' }}
            >
              Real work.
              <br />
              <span className="text-orange drop-shadow-[0_0_20px_rgba(255,82,16,0.25)]">No coffee runs.</span>
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#d0cdc6] leading-[1.8] max-w-[540px] font-normal tracking-[0.035em] border-l-2 border-orange/30 pl-4 sm:pl-5 ml-0 sm:ml-4">
            You'll work on live campaigns, real brands, and actual deliverables from day one.
          </p>

          {/* Task grid — premium cards with hover delight */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[1px] sm:gap-1 mt-12 sm:mt-14">
            {tasks.map((task, i) => (
              <div
                key={i}
                className="task-card group bg-gradient-to-br from-s2 to-s2/95 p-6 sm:p-7 sm:px-6 border border-border relative overflow-hidden cursor-default hover:from-s1 hover:to-s1/95 hover:border-orange/25 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,82,16,0.06)] hover:-translate-y-1 transition-all duration-300 rounded-md"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden />
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange/20 font-mono text-[12px] font-bold text-orange ring-2 ring-orange/10 group-hover:bg-orange/30 group-hover:ring-orange/20 transition-all duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-orange/0 group-hover:text-orange/80 text-[18px] font-light transition-all duration-300 -translate-x-2 group-hover:translate-x-0">→</span>
                </div>
                <h3 className="text-[14px] sm:text-[15px] font-semibold leading-[1.5] text-[#f0ede6] tracking-[0.02em] group-hover:text-white transition-colors duration-300">
                  {task}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
