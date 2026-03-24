import ScrollReveal from './ScrollReveal';

export default function CTASection({ onApply }) {
  return (
    <ScrollReveal>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(255,82,16,0.08) 0%, transparent 55%)' }}
          aria-hidden
        />
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[5vw] items-center py-20 sm:py-24 px-[5vw]">
          {/* Left — headline */}
          <div className="relative">
            <div className="absolute -left-1 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/40 to-transparent hidden md:block" aria-hidden />
            <h2
              className="font-bebas text-[clamp(44px,8vw,100px)] leading-[0.92] tracking-[0.03em] text-[#f0ede6] pl-0 md:pl-4"
              style={{ textShadow: '0 0 50px rgba(255,82,16,0.1)' }}
            >
              Ready
              <br />
              to make
              <br />
              <span className="text-orange drop-shadow-[0_0_24px_rgba(255,82,16,0.3)]">real</span>
              <br />
              things?
            </h2>
          </div>

          {/* Right — apply info + CTAs */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7 font-mono text-[12px] sm:text-[13px] tracking-[0.06em] leading-[1.85] text-[#c8c5be]">
              <p className="text-[#f0ede6] font-semibold tracking-[0.12em] uppercase mb-4">Apply now</p>
              <p className="mb-1">Drop your application to:</p>
              <a href="mailto:jovine@scalify.ae" className="text-orange hover:text-orange/90 transition-colors font-medium break-all">
                jovine@scalify.ae
              </a>
              <p className="mt-4 mb-1">Location:</p>
              <p className="text-[#f0ede6]">
                G01, Boutique Villa 9<br />
                Dubai Media City, Dubai, UAE
              </p>
              <p className="mt-4">
                Duration: <span className="text-[#f0ede6] font-medium">3–6 Months</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onApply}
                className="inline-flex items-center justify-center gap-2.5 bg-orange text-white border-none font-bebas text-[15px] sm:text-[17px] leading-none tracking-[0.07em] pl-7 pr-6 py-3 sm:py-3.5 min-h-[44px] sm:min-h-[48px] rounded-full cursor-pointer shadow-[0_2px_20px_rgba(255,82,16,0.4)] hover:bg-orange-d hover:shadow-[0_6px_28px_rgba(255,82,16,0.45)] hover:translate-x-1 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-200"
              >
                <span className="inline-flex items-center gap-2.5 leading-none">
                  Apply for this Role
                  <span className="text-[16px] sm:text-[18px] font-light inline-block" style={{ lineHeight: 1 }} aria-hidden>→</span>
                </span>
              </button>
              <a
                href="https://wa.me/971568633879?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20the%20Creative%20Intern%20role%20at%20Scalify!"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border-2 border-white/15 text-[#e0ddd6] font-mono text-[12px] px-5 py-3.5 rounded-full tracking-[0.06em] hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-200"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
