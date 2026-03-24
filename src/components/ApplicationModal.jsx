import { useState, useRef, useEffect } from 'react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  location: '',
  experience: '',
  linkedin: '',
  portfolio: '',
  otherlink: '',
  message: '',
};

// ── SVG Icons (no emoji) ──
const IconDoc = () => (
  <svg className="w-7 h-7 text-orange/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);
const IconFolder = () => (
  <svg className="w-7 h-7 text-orange/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <path d="M2 10h20" />
  </svg>
);

export default function ApplicationModal({ isOpen, onClose, showToast }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [files, setFiles] = useState({ resume: null, cover: null, projects: [] });
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('next');
  const formRef = useRef(null);
  const overlayRef = useRef(null);

  const STEPS = [
    { id: 0, label: 'Personal', short: '01' },
    { id: 1, label: 'Application', short: '02' },
    { id: 2, label: 'Documents', short: '03' },
    { id: 3, label: 'Intro', short: '04' },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setDirection('next');
      if (overlayRef.current) overlayRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleFile = (type, e) => {
    const selected = Array.from(e.target.files);
    const oversized = selected.some((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      showToast('File too large. Max 5 MB each.', 'err');
      e.target.value = '';
      return;
    }
    if (type === 'projects') {
      setFiles((prev) => ({ ...prev, projects: selected }));
    } else {
      setFiles((prev) => ({ ...prev, [type]: selected[0] || null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.phone.trim()) errs.phone = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.experience) errs.experience = true;
    if (!files.resume) errs.resume = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const isStepComplete = (s) => {
    if (s === 0) return form.name.trim() && form.phone.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (s === 1) return !!form.experience;
    if (s === 2) return !!files.resume;
    if (s === 3) return true;
    return false;
  };

  const validateStep = (s) => {
    const errs = {};
    if (s === 0) {
      if (!form.name.trim()) errs.name = true;
      if (!form.phone.trim()) errs.phone = true;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    }
    if (s === 1) {
      if (!form.experience) errs.experience = true;
    }
    if (s === 2) {
      if (!files.resume) errs.resume = true;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canProceed = isStepComplete(step);

  const goNext = () => {
    if (!canProceed || !validateStep(step)) {
      showToast('Please complete required fields.', 'err');
      return;
    }
    setDirection('next');
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const goBack = () => {
    setDirection('prev');
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fill in all required fields.', 'err');
      return;
    }
    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', form.name);
      formDataToSend.append('email', form.email);
      formDataToSend.append('phone', form.phone);
      formDataToSend.append('location', form.location);
      formDataToSend.append('experience', form.experience);
      formDataToSend.append('linkedin', form.linkedin);
      formDataToSend.append('portfolio', form.portfolio);
      formDataToSend.append('otherlink', form.otherlink);
      formDataToSend.append('message', form.message);
      formDataToSend.append('appliedAt', new Date().toISOString());
      if (files.resume) formDataToSend.append('resume', files.resume);
      if (files.cover) formDataToSend.append('coverLetter', files.cover);
      if (files.projects?.length) files.projects.forEach((f, i) => formDataToSend.append(`project${i + 1}`, f));

      const apiBase = process.env.REACT_APP_API_URL;
      const url = apiBase ? `${apiBase}/api/applications` : '/api/applications';
      const response = await fetch(url, { method: 'POST', body: formDataToSend });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const msg = data.details || data.error || 'Failed to submit application';
        throw new Error(msg);
      }
      setSubmitting(false);
      setSuccess(true);
      showToast(data.message || 'Application submitted successfully!', 'ok');
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      showToast(err.message || 'Failed to submit application. Please try again.', 'err');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm(initialForm);
      setErrors({});
      setSuccess(false);
      setFiles({ resume: null, cover: null, projects: [] });
      setStep(0);
    }, 350);
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto py-6 px-4 transition-all duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      style={{ background: 'rgba(4,4,4,0.94)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* High-level overlay design on laptop/large — fills empty space, hidden on mobile */}
      <div className="fixed inset-0 pointer-events-none hidden lg:block overflow-hidden" aria-hidden>
        {/* Vignette: darker edges, focus on center */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 45%, transparent 0%, transparent 45%, rgba(0,0,0,0.25) 100%)',
          }}
        />
        {/* Warm gradient orbs in empty corners */}
        <div className="absolute -left-[8%] top-[10%] w-[520px] h-[520px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,82,16,0.11) 0%, transparent 55%)' }} />
        <div className="absolute -right-[6%] bottom-[5%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,82,16,0.09) 0%, transparent 52%)' }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,1100px)] h-[80vh] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(255,82,16,0.055) 0%, transparent 50%)' }} />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Large editorial type in empty space */}
        <span className="absolute left-[6%] top-[18%] font-bebas text-[clamp(72px,12vw,160px)] leading-none tracking-wide text-white/[0.045] select-none">APPLY</span>
        <span className="absolute right-[5%] bottom-[22%] font-bebas text-[clamp(72px,12vw,160px)] leading-none tracking-wide text-white/[0.04] select-none">ROLE</span>
        <span className="absolute left-[8%] bottom-[15%] font-mono text-[11px] tracking-[0.35em] uppercase text-orange/[0.08]">01 — 04</span>
        <span className="absolute right-[8%] top-[12%] font-mono text-[11px] tracking-[0.35em] uppercase text-orange/[0.07]">Dubai</span>
        {/* Soft frame: stage around content */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[900px] h-[88vh] rounded-[2rem] border border-white/[0.06]"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)' }}
        />
        {/* Arc shapes — left and right */}
        <div className="absolute left-[1%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-white/[0.06]" style={{ clipPath: 'inset(0 100% 0 0)' }} />
        <div className="absolute right-[1%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-white/[0.06]" style={{ clipPath: 'inset(0 0 0 100%)' }} />
        {/* Diagonal lines */}
        <div className="absolute left-[10%] top-[25%] w-px h-[220px] bg-gradient-to-b from-transparent via-orange/12 to-transparent" style={{ transform: 'rotate(-18deg)' }} />
        <div className="absolute right-[10%] bottom-[28%] w-px h-[200px] bg-gradient-to-b from-transparent via-orange/10 to-transparent" style={{ transform: 'rotate(15deg)' }} />
        <div className="absolute left-[18%] bottom-[20%] w-px h-[120px] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" style={{ transform: 'rotate(8deg)' }} />
        <div className="absolute right-[20%] top-[25%] w-px h-[100px] bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" style={{ transform: 'rotate(-10deg)' }} />
      </div>

      <div
        className="w-full max-w-[700px] lg:max-w-[780px] relative rounded-2xl overflow-hidden animate-slideUp"
        style={{
          background: 'linear-gradient(180deg, #141414 0%, #0d0d0d 100%)',
          boxShadow: '0 32px 64px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange/80 to-transparent" aria-hidden />

        {/* Header + progress */}
        <header className="relative px-8 sm:px-10 pt-8 pb-5 border-b border-white/[0.06]">
          <div className="absolute top-0 right-0 pt-6 pr-8 sm:pr-10">
            <button
              type="button"
              onClick={handleClose}
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] text-[#9a9790] flex items-center justify-center hover:bg-orange hover:border-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] transition-all duration-200"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M2 2l10 10M12 2L2 12" /></svg>
            </button>
          </div>
          <div className="pr-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-orange mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" aria-hidden />
              Creative Intern · Scalify Dubai
            </span>
            <h2 className="font-bebas text-[clamp(28px,4.5vw,42px)] leading-[0.92] tracking-[0.02em] text-[#f8f6f1]">
              Apply for <span className="text-orange" style={{ textShadow: '0 0 40px rgba(255,82,16,0.25)' }}>this role</span>
            </h2>
            {/* Step progress: current highlighted only when complete; click previous steps to go back */}
            <div className="flex items-center gap-2 mt-4">
              {STEPS.map((s, i) => {
                const isPast = step > s.id;
                const isCurrent = step === s.id;
                const canGoBack = s.id < step;
                return (
                  <div key={s.id} className="flex items-center">
                    {canGoBack ? (
                      <button
                        type="button"
                        onClick={() => { setDirection('prev'); setStep(s.id); }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[11px] font-bold transition-all duration-300 bg-orange/20 text-orange border border-orange/40 hover:bg-orange/30 hover:border-orange/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
                        aria-label={`Go back to step ${s.id + 1}`}
                      >
                        ✓
                      </button>
                    ) : (
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[11px] font-bold transition-all duration-300 ${
                          isCurrent
                            ? canProceed
                              ? 'bg-orange text-white border border-orange shadow-[0_0_20px_-4px_rgba(255,82,16,0.4)]'
                              : 'bg-white/[0.08] text-[#8a8882] border border-white/[0.12]'
                            : 'bg-white/[0.06] text-[#6a6862] border border-white/[0.08]'
                        }`}
                      >
                        {isPast ? '✓' : s.short}
                      </span>
                    )}
                    {i < STEPS.length - 1 && (
                      <span className={`mx-1 w-6 h-0.5 rounded transition-colors ${step > s.id ? 'bg-orange/50' : 'bg-white/[0.08]'}`} aria-hidden />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {!success ? (
          <form ref={formRef} onSubmit={handleSubmit} className="p-8 sm:p-10 pb-10">
            <div className="min-h-[280px] relative overflow-hidden">
              {/* Step 0: Personal */}
              {step === 0 && (
                <div key="0" className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 ${direction === 'next' ? 'animate-stepSlideNext' : 'animate-stepSlidePrev'}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange/15 border border-orange/30 font-mono text-[11px] font-bold text-orange">01</span>
                    <h3 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8c5be]">Personal details</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Full name" required name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" error={errors.name} errorMsg="Required" />
                    <FormField label="Email address" required name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" error={errors.email} errorMsg="Valid email required" />
                    <FormField label="Phone number" required name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+971 50 000 0000" error={errors.phone} errorMsg="Required" />
                    <FormField label="Location" name="location" value={form.location} onChange={handleChange} placeholder="Dubai, UAE" />
                  </div>
                </div>
              )}

              {/* Step 1: Application */}
              {step === 1 && (
                <div key="1" className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 ${direction === 'next' ? 'animate-stepSlideNext' : 'animate-stepSlidePrev'}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange/15 border border-orange/30 font-mono text-[11px] font-bold text-orange">02</span>
                    <h3 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8c5be]">Application details</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className={errors.experience ? 'invalid' : ''}>
                      <Label>Years of experience <Required /></Label>
                      <select name="experience" value={form.experience} onChange={handleChange} className={inputBase}>
                        <option value="">Select...</option>
                        <option>0–1 years (Student / Fresh Grad)</option>
                        <option>1–2 years</option>
                        <option>2–4 years</option>
                        <option>4+ years</option>
                      </select>
                      {errors.experience && <ErrorText>Please select experience level</ErrorText>}
                    </div>
                    <FormField label="LinkedIn profile" name="linkedin" type="url" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/you" />
                    <FormField label="Portfolio / website" name="portfolio" type="url" value={form.portfolio} onChange={handleChange} placeholder="https://yourportfolio.com" />
                    <FormField label="Other link" name="otherlink" type="url" value={form.otherlink} onChange={handleChange} placeholder="Behance, Dribbble, GitHub…" />
                  </div>
                </div>
              )}

              {/* Step 2: Documents */}
              {step === 2 && (
                <div key="2" className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 ${direction === 'next' ? 'animate-stepSlideNext' : 'animate-stepSlidePrev'}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange/15 border border-orange/30 font-mono text-[11px] font-bold text-orange">03</span>
                    <h3 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8c5be]">Documents</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FileZone label="Resume / CV" required file={files.resume} onChange={(e) => handleFile('resume', e)} accept=".pdf,.doc,.docx" text="Upload resume" subtext="PDF, DOC — max 5 MB" Icon={IconDoc} error={errors.resume} errorMsg="Resume required" />
                    <FileZone label="Cover letter" file={files.cover} onChange={(e) => handleFile('cover', e)} accept=".pdf,.doc,.docx" text="Upload cover letter" subtext="PDF, DOC — max 5 MB" Icon={IconDoc} />
                  </div>
                  <div className="mt-5">
                    <FileZone label="Projects / work samples" file={files.projects.length ? files.projects : null} onChange={(e) => handleFile('projects', e)} accept=".pdf,.jpg,.jpeg,.png,.zip" multiple text="Upload projects or work samples" subtext="PDF, images, ZIP — up to 3 files, 5 MB each" Icon={IconFolder} />
                  </div>
                </div>
              )}

              {/* Step 3: Intro — tighter on mobile */}
              {step === 3 && (
                <div key="3" className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-7 ${direction === 'next' ? 'animate-stepSlideNext' : 'animate-stepSlidePrev'}`}>
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-orange/15 border border-orange/30 font-mono text-[10px] sm:text-[11px] font-bold text-orange">04</span>
                    <h3 className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#c8c5be]">Introduce yourself</h3>
                  </div>
                  <div>
                    <Label>Short message / introduction</Label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us why you're the right fit, what drives you, what you've been working on lately — anything that helps us understand who you are beyond your CV."
                      className={`${inputBase} min-h-[100px] sm:min-h-[120px] resize-y placeholder:text-[#4a4a4a] text-[14px] sm:text-[15px]`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer: Back + Next / Send — stacked on mobile, row on larger */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/[0.06]">
              <div className="order-2 sm:order-1">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full border-2 border-white/[0.12] bg-white/[0.04] text-[#c8c5be] font-semibold text-[13px] sm:text-[14px] tracking-[0.04em] py-2.5 sm:py-3 px-4 sm:px-5 hover:border-orange/40 hover:bg-orange/10 hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    Back
                  </button>
                ) : (
                  <p className="text-[12px] sm:text-[13px] text-[#7a7872]">Step {step + 1} of 4</p>
                )}
              </div>
              {step < 3 ? (
                <div className="order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canProceed}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bebas text-[16px] tracking-[0.1em] uppercase py-3 px-6 rounded-full border-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]
                      ${canProceed
                        ? 'bg-orange text-white cursor-pointer shadow-[0_2px_12px_-2px_rgba(255,82,16,0.4)] hover:bg-[#e64a0d] hover:shadow-[0_4px_20px_-4px_rgba(255,82,16,0.45)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-orange'
                        : 'bg-white/[0.06] text-[#5a5852] border border-white/[0.1] cursor-not-allowed'}
                    `}
                  >
                    Next
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange text-white border-0 font-bebas text-[15px] sm:text-[17px] tracking-[0.1em] uppercase py-2.5 sm:py-3 px-5 sm:px-6 rounded-full cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:bg-[#e64a0d] hover:shadow-[0_4px_20px_-4px_rgba(255,82,16,0.45)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] shadow-[0_2px_12px_-2px_rgba(255,82,16,0.4)]"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send application
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        ) : (
          /* Success state */
          <div className="py-20 px-8 sm:px-12 text-center">
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-[40px] text-green-400 animate-pop"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.06) 100%)', border: '1px solid rgba(34,197,94,0.35)' }}
            >
              ✓
            </div>
            <h3 className="font-bebas text-[40px] sm:text-[44px] tracking-[0.02em] text-[#f8f6f1] mb-3">You're in.</h3>
            <p className="text-[15px] text-[#9a9790] leading-relaxed max-w-[360px] mx-auto mb-2">
              We've received your application and will get back to you within 3–5 business days.
            </p>
            <p className="text-[13px] text-[#7a7872] mb-8">Thank you for applying. 🙌</p>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] text-[#e8e6e1] text-[14px] font-semibold tracking-[0.03em] hover:border-orange/50 hover:bg-orange/10 hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="block text-[13px] font-medium text-[#c8c5be] mb-2 tracking-[0.02em]">
      {children}
    </label>
  );
}
function Required() {
  return <span className="text-orange ml-0.5">*</span>;
}
function ErrorText({ children }) {
  return <p className="text-[12px] text-red-400/90 mt-1.5">{children}</p>;
}

const inputBase = 'w-full rounded-lg border border-white/[0.08] bg-[#0f0f0f] text-[#f2f0eb] py-3.5 px-4 text-[15px] tracking-[0.02em] outline-none transition-all placeholder:text-[#4a4a4a] focus:border-orange/60 focus:ring-2 focus:ring-orange/20 focus:ring-offset-0';

function FormField({ label, required, name, type = 'text', value, onChange, placeholder, error, errorMsg }) {
  return (
    <div className={error ? 'invalid' : ''}>
      <Label>{label} {required && <Required />}</Label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputBase}
      />
      {errorMsg && error && <ErrorText>{errorMsg}</ErrorText>}
    </div>
  );
}

function FileZone({ label, required, file, onChange, accept, multiple, text, subtext, Icon, error, errorMsg }) {
  const hasFile = multiple ? file && file.length > 0 : !!file;
  const fileName = multiple ? file?.map((f) => f.name).join(', ') : file?.name;

  return (
    <div>
      <Label>{label} {required && <Required />}</Label>
      <label
        className={`
          flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 min-h-[120px] p-5 text-center
          ${hasFile ? 'border-orange/50 bg-orange/5' : error ? 'border-red-500/50 bg-red-500/5' : 'border-white/[0.08] bg-white/[0.02] hover:border-orange/40 hover:bg-orange/[0.03]'}
        `}
      >
        <input type="file" accept={accept} multiple={multiple} onChange={onChange} className="sr-only" />
        {hasFile ? (
          <>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/20 text-orange text-lg font-bold mb-2">✓</span>
            <span className="text-[13px] font-medium text-[#e8e6e1] truncate max-w-full px-2">{fileName}</span>
          </>
        ) : (
          <>
            <span className="mb-2"><Icon /></span>
            <span className="text-[14px] font-medium text-[#e0ddd6] tracking-[0.02em]">{text}</span>
            <span className="text-[12px] text-[#6a6862] mt-0.5">{subtext}</span>
          </>
        )}
      </label>
      {error && errorMsg && <ErrorText>{errorMsg}</ErrorText>}
    </div>
  );
}
