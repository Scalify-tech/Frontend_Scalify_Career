import ScrollReveal from './ScrollReveal';

const requirements = [
  'Students or fresh grads in Design, Visual Communication, or Mass Comm',
  'A portfolio — student projects and personal work absolutely count',
  'A sharp eye for design and obsessive attention to detail',
  'Positive attitude and a genuine hunger to learn and grow fast',
  "Someone who takes initiative and doesn't wait to be told what to do"
];

const hotSkills = ['Photoshop', 'Illustrator'];
const otherSkills = ['InDesign', 'Canva', 'Figma', 'Art Direction', 'Visual Thinking', 'Storytelling'];

export default function WhoSection() {
  return (
    <ScrollReveal>
      <section className="py-20 sm:py-[86px] px-[5vw] border-b border-border relative overflow-hidden">
        <div
          className="absolute top-1/2 left-0 w-full h-[60%] -translate-y-1/2 pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,82,16,0.06) 0%, transparent 65%)' }}
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
          {/* Section label — hero pill */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full border border-orange/50 bg-gradient-to-r from-orange/15 via-orange/8 to-transparent px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.24em] uppercase text-orange mb-6 backdrop-blur-sm"
            style={{ boxShadow: '0 0 0 1px rgba(255,82,16,0.08) inset, 0 0 24px -4px rgba(255,82,16,0.2)' }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inset-0 rounded-full bg-orange animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-orange/60 blur-[3px]" />
            </span>
            03 — Who We're Looking For
          </div>

          {/* Heading */}
          <div className="relative">
            <div className="absolute -left-1 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/40 to-transparent hidden sm:block" aria-hidden />
            <h2
              className="font-bebas text-[clamp(40px,5.8vw,72px)] leading-[0.92] tracking-[0.03em] text-[#f0ede6] mb-4 pl-0 sm:pl-4"
              style={{ textShadow: '0 0 40px rgba(255,82,16,0.08)' }}
            >
              Got taste?
              <br />
              <span className="text-orange drop-shadow-[0_0_20px_rgba(255,82,16,0.25)]">Apply.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[5vw] items-start mt-12">
            {/* Requirements List */}
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
              {requirements.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-4 px-4 border-b border-border last:border-0 text-[14px] sm:text-[15px] text-[#d8d5ce] font-normal leading-[1.65] hover:text-[#f0ede6] transition-colors tracking-[0.02em]"
                >
                  <span className="text-orange mt-0.5 flex-shrink-0 text-[16px] font-light">→</span>
                  {item}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/5 px-4 py-2 font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-orange mb-4"
                style={{ boxShadow: '0 0 0 1px rgba(255,82,16,0.06) inset' }}
              >
                Tools & Skills
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {hotSkills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-3.5 py-2 rounded-md border border-orange/60 bg-orange/10 text-orange tracking-[0.04em] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
                {otherSkills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-3.5 py-2 rounded-md border border-white/10 bg-white/[0.02] text-[#c8c5be] tracking-[0.04em] cursor-default hover:border-orange/30 hover:text-orange/90 hover:bg-orange/5 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-[13px] text-[#b8b5ae] mt-5 leading-[1.75] font-normal tracking-[0.03em] border-l-2 border-orange/30 pl-4">
                <span className="text-orange font-medium">Hot = must have</span> · The rest are a welcome bonus.
                <br />
                <span className="text-[#c8c5be]">What matters most: your eye, your curiosity, your drive.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
