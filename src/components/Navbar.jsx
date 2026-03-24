import React, { useState, useEffect } from 'react';

const MENU_CLOSE_DURATION = 300;

export default function Navbar({ onApply }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (mobileOpen && !closing) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, closing]);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => {
      setMobileOpen(false);
      setClosing(false);
    }, MENU_CLOSE_DURATION);
    return () => clearTimeout(t);
  }, [closing]);

  const closeMenu = () => {
    if (!mobileOpen) return;
    setClosing(true);
  };

  const navLinks = [
    { label: 'Services', href: 'https://scalify.ae/services' },
    { label: 'About', href: 'https://scalify.ae/about' },
    { label: 'Contact', href: 'https://scalify.ae/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[800] h-16 flex items-center justify-between px-4 sm:px-[5vw] bg-bg/[0.92] backdrop-blur-[18px] border-b border-border">
        <a
          href="https://scalify.ae"
          target="_blank"
          rel="noreferrer"
          className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded flex-shrink-0"
        >
          <img
            src="/scalify-logo.svg"
            alt="Scalify"
            className="h-9 sm:h-10 w-auto object-contain opacity-0 animate-logoReveal transition-transform duration-300 ease-out group-hover:scale-110 group-hover:brightness-110"
            style={{ filter: 'none' }}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="underline-lr text-[13px] font-medium text-[#e0ddd6] hover:text-[#f0ede6] focus-visible:text-[#f0ede6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-colors tracking-[0.04em]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile: Apply Now then Hamburger (hamburger on far right) */}
        <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
          <button
            onClick={onApply}
            className="bg-orange text-white border-none px-4 py-2.5 rounded-full text-[12px] font-semibold shadow-[0_2px_12px_rgba(255,82,16,0.35)] hover:bg-orange-d hover:shadow-[0_4px_16px_rgba(255,82,16,0.4)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-200 tracking-[0.03em]"
          >
            Apply Now
          </button>
          <button
            type="button"
            onClick={() => (mobileOpen ? closeMenu() : setMobileOpen(true))}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#f0ede6] hover:border-orange/50 hover:bg-orange/10 hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg min-w-[40px] min-h-[40px] transition-all duration-200 active:scale-95"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-inherit" aria-hidden>
                <path d="M2 2l14 14M16 2L2 16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-inherit" aria-hidden>
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Apply Now */}
        <div className="hidden sm:block">
          <button
            onClick={onApply}
            className="bg-orange text-white border-none px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer shadow-[0_2px_12px_rgba(255,82,16,0.35)] hover:bg-orange-d hover:shadow-[0_4px_20px_rgba(255,82,16,0.4)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-200 tracking-[0.03em]"
          >
            Apply Now
          </button>
        </div>
      </nav>

      {/* Mobile menu: slide-in from right, close with slide-out + fade */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[850] sm:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {/* Backdrop — fades in / out */}
          <div
            className={`absolute inset-0 bg-bg/90 backdrop-blur-md ${closing ? 'animate-menuBackdropOut' : 'animate-menuBackdrop'}`}
            onClick={closeMenu}
            aria-hidden
          />

          {/* Panel — slides in / out */}
          <div
            className={`relative w-[min(85%,320px)] ml-auto h-full bg-s1 border-l border-border shadow-[-8px_0_32px_rgba(0,0,0,0.4)] flex flex-col ${closing ? 'animate-menuPanelSlideOut' : 'animate-menuPanelSlide'}`}
          >
            {/* Close button */}
            <div className="flex justify-end p-4 animate-menuItemIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <button
                type="button"
                onClick={closeMenu}
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white/15 bg-s2/90 text-[#f0ede6] hover:border-orange hover:bg-orange/10 hover:text-orange active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-200"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="shrink-0" aria-hidden>
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>

            {/* Nav links — staggered slide-in */}
            <nav className="flex flex-col gap-0 px-5 pt-4 pb-6">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="underline-lr text-[18px] font-medium text-[#f0ede6] py-4 px-4 rounded-r border-b border-border hover:bg-s2 hover:text-orange transition-colors active:bg-s3 animate-menuItemIn"
                  style={{ animationDelay: `${0.18 + i * 0.06}s`, animationFillMode: 'both' }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { closeMenu(); onApply(); }}
                className="mt-5 w-full bg-orange text-white border-none py-4 px-5 rounded-full text-[16px] font-semibold shadow-[0_2px_12px_rgba(255,82,16,0.35)] hover:bg-orange-d hover:shadow-[0_4px_20px_rgba(255,82,16,0.4)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-all duration-200 animate-menuItemIn"
                style={{ animationDelay: '0.42s', animationFillMode: 'both' }}
              >
                Apply Now
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
