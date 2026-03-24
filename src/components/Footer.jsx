const socials = [
  { label: 'in', href: 'https://www.linkedin.com/company/scalifyuae/' },
  { label: 'ig', href: 'https://www.instagram.com/scalify.uae/' },
  { label: 'fb', href: 'https://www.facebook.com/scalifyuae' },
  { label: '📍', href: 'https://maps.app.goo.gl/UFvCo7SB2XvFcg4t7' },
];

const explore = [
  { label: 'Home', href: 'https://scalify.ae/' },
  { label: 'Services', href: 'https://scalify.ae/services' },
  { label: 'About', href: 'https://scalify.ae/about' },
  { label: 'Blog', href: 'https://scalify.ae/blogs/' },
  { label: 'Contact', href: 'https://scalify.ae/contact' },
];

const services = [
  { label: 'Vision & Strategy', href: 'https://scalify.ae/services/dream/consulting' },
  { label: 'E-commerce', href: 'https://scalify.ae/services/build/e-commerce' },
  { label: 'Content & Storytelling', href: 'https://scalify.ae/services/build/content-storytelling' },
  { label: 'Technology & AI', href: 'https://scalify.ae/services/build/ai' },
];

export default function Footer() {
  return (
    <footer className="bg-s1 border-t border-border">
      {/* Top */}
      <div className="py-16 sm:py-20 px-[5vw] pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-12 border-b border-border">
        {/* Brand */}
        <div>
          <a
            href="https://scalify.ae"
            target="_blank"
            rel="noreferrer"
            className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
          >
            <img
              src="/scalify-logo.svg"
              alt="Scalify"
              className="h-8 sm:h-9 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
            />
          </a>
          <p className="text-[14px] text-[#b8b5ae] leading-[1.8] max-w-[280px] mb-6 font-normal tracking-[0.03em]">
            Growth strategists helping brands go from "promising startup" → "category leader." Dream. Build. Scale.
          </p>
          <div className="flex gap-2">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[12px] font-mono font-semibold text-[#d0cdc6] hover:bg-orange hover:border-orange hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#e0ddd6] mb-5 pl-3 border-l-2 border-orange/60">
            Explore
          </h4>
          {explore.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="underline-lr block w-fit text-[15px] text-[#d0cdc6] mb-3.5 hover:text-[#f0ede6] transition-colors font-medium tracking-[0.03em]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#e0ddd6] mb-5 pl-3 border-l-2 border-orange/60">
            Services
          </h4>
          {services.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="underline-lr block w-fit text-[15px] text-[#d0cdc6] mb-3.5 hover:text-[#f0ede6] transition-colors font-medium tracking-[0.03em]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#e0ddd6] mb-5 pl-3 border-l-2 border-orange/60">
            Get in Touch
          </h4>
          <div className="text-[14px] text-[#c8c5be] leading-[1.8] font-normal tracking-[0.02em]">
            <a href="tel:+971568633879" className="text-orange font-medium hover:text-orange/90 transition-colors">
              +971 56 863 3879
            </a>
            <br />
            <a href="mailto:hello@scalify.ae" className="text-orange font-medium hover:text-orange/90 transition-colors break-all">
              hello@scalify.ae
            </a>
            <div className="mt-4 flex flex-col gap-1">
              <div className="text-[13px] text-[#a8a5a0]">
                <strong className="text-[#c8c5be] block mb-0.5">Dubai Office</strong>
                G01, Boutique Villa 9<br />
                Dubai Media City, UAE
              </div>
              <div className="text-[13px] text-[#a8a5a0] mt-3">
                <strong className="text-[#c8c5be] block mb-0.5">Also in</strong>
                Sweden · Ireland
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-6 px-[5vw] flex justify-between items-center flex-wrap gap-4">
        <span className="font-mono text-[11px] text-[#888682] tracking-[0.06em]">
          © Scalify FZE 2026 · All Rights Reserved
        </span>
        <span className="font-bebas text-[15px] tracking-[0.12em] text-[#a8a5a0]">
          Dream · Build · Scale
        </span>
        <div className="flex gap-5">
          <a
            href="https://scalify.ae/privacy-policy/"
            target="_blank"
            rel="noreferrer"
            className="text-[12px] text-[#888682] hover:text-[#c8c5be] transition-colors tracking-[0.02em] underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="https://scalify.ae/refund-policy/"
            target="_blank"
            rel="noreferrer"
            className="text-[12px] text-[#888682] hover:text-[#c8c5be] transition-colors tracking-[0.02em] underline-offset-4 hover:underline"
          >
            Refund Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
