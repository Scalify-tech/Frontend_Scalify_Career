export default function Ticker() {
  const items = [
    'Monthly Stipend',
    'Completion Certificate',
    'Real Brand Campaigns',
    'Brand Activation Experience',
    'Agency Exposure',
    'Portfolio-Ready Work',
  ];

  const track = [...items, ...items];

  return (
    <div
      className="relative py-5 sm:py-6 overflow-hidden whitespace-nowrap"
      style={{
        background: 'linear-gradient(90deg, #e64a0d 0%, #ff5210 20%, #ff6b2c 50%, #ff5210 80%, #e64a0d 100%)',
        boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15), 0 8px 32px -8px rgba(255,82,16,0.45)',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      {/* Subtle moving shine */}
      <div
        className="absolute inset-0 pointer-events-none animate-tickerShimmer opacity-30"
        style={{
          background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 100%)',
          width: '50%',
        }}
      />

      <div
        className="relative inline-flex items-center gap-12 sm:gap-16 animate-ticker font-bebas text-[20px] sm:text-[24px] tracking-[0.15em] uppercase"
        style={{
          color: '#0a0a0a',
          textShadow: '0 1px 0 rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.12)',
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4">
            <span
              className="w-2 h-2 rotate-45 shrink-0 bg-[#0a0a0a]/70"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.2)' }}
              aria-hidden
            />
            <span className="font-bold tracking-wider">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
