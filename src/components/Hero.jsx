export default function Hero({ onApply }) {
  return (
    <section className="min-h-0 h-auto sm:min-h-screen sm:h-screen sm:max-h-[100dvh] flex flex-col justify-start sm:justify-center items-center sm:items-stretch px-5 pt-[72px] pb-4 sm:pb-8 sm:px-[5vw] relative overflow-hidden border-b border-border">
      {/* Grid Background */}
      <div className="hero-grid" />

      {/* Glow (center) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[660px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,82,16,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Center: single vertical line — clean doesn’t */}
      <div className="absolute inset-0 left-[32%] right-[32%] xl:left-[40%] xl:right-[35%] pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute left-1/2 top-[15%] bottom-[20%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-orange/35 xl:via-orange/45 to-transparent" />
        <div
          className="absolute left-0 top-[35%] w-full h-px bg-gradient-to-r from-transparent via-orange/20 xl:via-orange/30 to-transparent"
          style={{ transform: 'rotate(-8deg)', transformOrigin: 'center center' }}
        />
        <div
          className="absolute left-0 top-[55%] w-full h-px bg-gradient-to-r from-transparent via-orange/15 xl:via-orange/25 to-transparent"
          style={{ transform: 'rotate(6deg)', transformOrigin: 'center center' }}
        />
        {[
          { top: '32%', w: 3 },
          { top: '42%', w: 4 },
          { top: '52%', w: 3 },
          { top: '62%', w: 3 },
          { top: '72%', w: 2 },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute left-1/2 rounded-full bg-orange/30 xl:bg-orange/40 -translate-x-1/2"
            style={{ top: d.top, width: d.w, height: d.w }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center min-w-[140px] xl:min-w-[160px]">
          <p className="font-mono text-[10px] xl:text-[11px] tracking-[0.2em] uppercase text-muted/90 xl:text-[#d0cdc6]">3–6 Months</p>
          <p className="font-mono text-[10px] xl:text-[11px] tracking-[0.18em] uppercase text-muted/80 xl:text-[#c8c5be] mt-1">Dubai Media City</p>
          <p className="font-sans text-[11px] xl:text-[12px] text-muted/70 xl:text-[#c0bdb6] mt-2 font-normal tracking-wide">Stipend + Certificate</p>
        </div>
      </div>

      {/* Right: gradient + one circle + two lines; on xl stronger so it fills the space */}
      <div className="absolute inset-0 left-[45%] pointer-events-none hidden md:block" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, transparent 0%, rgba(255,82,16,0.04) 50%, rgba(255,82,16,0.08) 100%)',
          }}
        />
        <div className="absolute top-1/2 right-[15%] w-[260px] h-[260px] xl:w-[320px] xl:h-[320px] -translate-y-1/2 translate-x-1/2 rounded-full border border-orange/[0.08] xl:border-orange/[0.12]" />
        <div
          className="absolute top-[38%] right-0 w-[100%] h-px bg-gradient-to-l from-orange/12 to-transparent"
          style={{ transform: 'rotate(-6deg)', transformOrigin: 'right center' }}
        />
        <div
          className="absolute top-[58%] right-0 w-[90%] h-px bg-gradient-to-l from-orange/8 to-transparent"
          style={{ transform: 'rotate(4deg)', transformOrigin: 'right center' }}
        />
      </div>

      {/* Right text — desktop; larger on xl so it holds the space */}
      <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 hidden md:block max-w-[260px] xl:max-w-[320px] text-right pointer-events-none">
        <div className="border-l-2 border-orange/50 xl:border-l-[3px] xl:border-orange/60 pl-4 xl:pl-5 py-0.5">
          <p className="font-bebas text-[24px] sm:text-[28px] xl:text-[34px] 2xl:text-[38px] leading-tight tracking-[0.05em] text-[#f0ede6]">
            Dream · Build · Scale
          </p>
          <p className="font-sans text-[12px] xl:text-[13px] text-muted mt-1.5 font-normal tracking-[0.05em]">
            Growth strategists. Real work. Dubai.
          </p>
        </div>
      </div>

      {/* Right text — only from sm so it doesn't overlap title on narrow screens */}
      <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 hidden sm:block md:hidden max-w-[100px] text-right pointer-events-none">
        <div className="border-l-2 border-orange/40 pl-2 py-0.5">
          <p className="font-bebas text-[14px] leading-tight text-[#f0ede6]">Dream · Build · Scale</p>
          <p className="font-sans text-[10px] text-muted mt-0.5">Real work. Dubai.</p>
        </div>
      </div>

      {/* Main content: on xl/2xl cap width so large screens don't look stretched; on mobile center everything */}
      <div className="w-full xl:max-w-[680px] 2xl:max-w-[720px] flex flex-col items-center sm:items-start">
      {/* Tag — loveable pill: soft glow, breathing dot, premium feel */}
      <div
        className="group inline-flex items-center gap-3 rounded-full border border-orange/30 bg-gradient-to-r from-orange/20 via-orange/12 to-transparent px-5 py-2.5 font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-orange/95 mb-4 animate-fadeUp w-fit backdrop-blur-md transition-all duration-300 hover:border-orange/50 hover:from-orange/25 hover:via-orange/15 hover:shadow-[0_0_28px_-6px_rgba(255,82,16,0.25)] sm:hover:-translate-y-0.5"
        style={{
          boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 24px -8px rgba(255,82,16,0.15)',
        }}
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
          <span className="absolute inset-0 rounded-full bg-orange/90 shadow-[0_0_10px_2px_rgba(255,82,16,0.5)] animate-pulse" />
          <span className="absolute inset-0 rounded-full bg-orange blur-md opacity-60 animate-pulse" style={{ animationDuration: '2s' }} />
        </span>
        <span className="tracking-wide">Now Hiring <span className="text-orange/70">·</span> Dubai Media City</span>
      </div>

      {/* Title — slightly smaller on very small screens to avoid overlap */}
      <h1 className="font-bebas text-[clamp(36px,8.5vw,120px)] leading-[0.9] tracking-[0.02em] uppercase animate-[fadeUp_0.65s_0.08s_ease_both] max-w-[85vw] sm:max-w-none text-center sm:text-left">
        Creative
        <br />
        <span className="text-orange">Intern</span>
        <br />
        Wanted.
      </h1>

      {/* Dream · Build · Scale — on mobile show below title, centered (design line) */}
      <div className="md:hidden mt-3 text-center">
        <p className="font-bebas text-[18px] leading-tight tracking-[0.05em] text-[#f0ede6]">Dream · Build · Scale</p>
        <p className="font-sans text-[11px] text-muted mt-1">Real work. Dubai.</p>
      </div>

      {/* Meta row: strip + right filler; on mobile both centered */}
      <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4 animate-[fadeUp_0.65s_0.18s_ease_both] w-full">
        <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 sm:gap-x-6 rounded-r border border-white/[0.06] border-l-[3px] border-l-orange/70 bg-white/[0.03] pl-3 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 font-mono text-[11px] sm:text-[12px] tracking-[0.08em] w-fit mx-auto sm:mx-0">
          {['Scalify — Dubai', '3–6 Months', 'Design / Comms / Visual Arts', 'Stipend + Certificate'].map(
            (text, i) => (
              <span key={i} className="flex items-center gap-2 sm:gap-2.5 text-[#d8d5ce] transition-colors hover:text-[#f0ede6]">
                <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" aria-hidden />
                <span className="font-medium">{text}</span>
              </span>
            )
          )}
        </div>
        <p className="font-sans text-[11px] sm:text-[12px] text-muted/90 tracking-[0.06em] max-w-[200px] w-full sm:w-auto text-center sm:text-right sm:mr-14 md:mr-20">
          Paid stipend · Certificate · Scroll to apply
        </p>
      </div>
      </div>

      {/* Scroll hint — compact; on mobile move in so it doesn't overlap */}
      <div
        className="scroll-hint absolute bottom-4 right-3 sm:right-[5vw] font-mono text-[8px] text-muted/80 tracking-[0.2em] flex items-center gap-2"
        style={{ writingMode: 'vertical-rl' }}
      >
        SCROLL
        <span className="block w-px h-6 sm:h-8 bg-gradient-to-b from-orange/60 to-transparent" />
      </div>
    </section>
  );
}
