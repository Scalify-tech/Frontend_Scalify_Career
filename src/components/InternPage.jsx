import React, { useState, useEffect, useRef } from 'react';

const InternPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorRing, setCursorRing] = useState({ x: 0, y: 0 });
  const [cursorScale, setCursorScale] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    otherlink: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [files, setFiles] = useState({
    resume: null,
    cover: null,
    projects: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const ringRef = useRef({ x: 0, y: 0 });

  // Cursor animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      ringRef.current.x += (cursorPos.x - ringRef.current.x) * 0.11;
      ringRef.current.y += (cursorPos.y - ringRef.current.y) * 0.11;
      setCursorRing({ x: ringRef.current.x, y: ringRef.current.y });
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [cursorPos.x, cursorPos.y]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-8');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        experience: '',
        linkedin: '',
        portfolio: '',
        otherlink: '',
        message: ''
      });
      setFormErrors({});
      setFiles({ resume: null, cover: null, projects: [] });
    }, 350);
  };

  const showToastMessage = (message, type = 'ok') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (e, type) => {
    const selectedFiles = Array.from(e.target.files);
    const oversized = selectedFiles.some((f) => f.size > 5 * 1024 * 1024);

    if (oversized) {
      showToastMessage('File too large. Max 5 MB each.', 'err');
      e.target.value = '';
      return;
    }

    if (type === 'projects') {
      setFiles((prev) => ({ ...prev, projects: selectedFiles }));
    } else {
      setFiles((prev) => ({ ...prev, [type]: selectedFiles[0] }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = true;
    if (!formData.phone.trim()) errors.phone = true;
    if (!formData.experience) errors.experience = true;
    if (!files.resume) errors.resume = true;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToastMessage('Please fill in all required fields.', 'err');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare FormData for file upload
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('otherlink', formData.otherlink);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('appliedAt', new Date().toISOString());
      
      // Append files
      if (files.resume) {
        formDataToSend.append('resume', files.resume);
      }
      if (files.cover) {
        formDataToSend.append('coverLetter', files.cover);
      }
      if (files.projects.length > 0) {
        files.projects.forEach((file, index) => {
          formDataToSend.append(`project${index + 1}`, file);
        });
      }

      // Send to backend API (default: same-origin /api/applications)
      const apiBase = process.env.REACT_APP_API_URL;
      const url = apiBase ? `${apiBase}/api/applications` : '/api/applications';
      const response = await fetch(url, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      
      setIsSubmitting(false);
      setShowSuccess(true);
      showToastMessage('Application submitted successfully!', 'ok');
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
      showToastMessage('Failed to submit application. Please try again.', 'err');
    }
  };

  return (
    <div className="bg-bg text-text font-dm overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-[9px] h-[9px] bg-orange rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-150"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
        }}
      />
      <div
        className="fixed w-[34px] h-[34px] border border-orange/55 rounded-full pointer-events-none z-[9998] transition-all duration-200"
        style={{
          left: `${cursorRing.x}px`,
          top: `${cursorRing.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
        }}
      />

      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-[1100] bg-s2 border border-border rounded-r px-[18px] py-[13px] text-[13px] font-medium shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${toast.type === 'ok' ? 'border-l-[3px] border-l-green-500' : 'border-l-[3px] border-l-red-500'}`}
        >
          {toast.message}
        </div>
      )}

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[800] h-16 flex items-center justify-between px-[5vw] bg-bg/[0.88] backdrop-blur-[18px] border-b border-border">
        <a href="https://scalify.ae" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
          <span className="font-bebas text-[22px] tracking-wider">SCALIFY</span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          <a href="https://scalify.ae/services" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-muted hover:text-text transition-colors">
            Services
          </a>
          <a href="https://scalify.ae/about" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-muted hover:text-text transition-colors">
            About
          </a>
          <a href="https://scalify.ae/contact" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-muted hover:text-text transition-colors">
            Contact
          </a>
        </div>
        <button
          onClick={openModal}
          className="bg-orange text-white border-none px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer shadow-[0_2px_12px_rgba(255,82,16,0.35)] hover:bg-orange-d hover:shadow-[0_4px_20px_rgba(255,82,16,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Apply Now
        </button>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end p-[5vw] pt-[100px] relative overflow-hidden border-b border-border">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#161616 1px, transparent 1px), linear-gradient(90deg, #161616 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[660px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,82,16,0.13) 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/[0.28] text-orange rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase mb-8 animate-fadeUp">
            <span className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
            Now Hiring · Dubai Media City
          </div>
          <h1 className="font-bebas text-[clamp(52px,10.5vw,136px)] leading-[0.92] tracking-[0.015em] uppercase animate-fadeUp animation-delay-100">
            Creative
            <br />
            <span className="text-orange">Intern</span>
            <br />
            Wanted.
          </h1>
          <div className="flex flex-wrap gap-9 mt-8 font-mono text-[11px] text-muted tracking-[0.08em] animate-fadeUp animation-delay-200">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              Scalify — Dubai
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              3–6 Months
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              Design / Comms / Visual Arts
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              Stipend + Certificate
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-[5vw] font-mono text-[9px] text-muted tracking-[0.2em] [writing-mode:vertical-rl] flex items-center gap-2.5 animate-fadeIn animation-delay-1000">
          SCROLL
          <span className="block w-px h-14 bg-gradient-to-b from-orange to-transparent animate-grow animation-delay-1500" />
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-orange py-3.5 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-14 animate-ticker font-bebas text-[17px] tracking-[0.07em] text-[#0a0a0a]">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span>✦ Monthly Stipend</span>
              <span>✦ Completion Certificate</span>
              <span>✦ Real Brand Campaigns</span>
              <span>✦ Brand Activation Experience</span>
              <span>✦ Agency Exposure</span>
              <span>✦ Portfolio-Ready Work</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <section className="py-[86px] px-[5vw] border-b border-border reveal opacity-0 translate-y-8 transition-all duration-[650ms]">
        <div className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-orange border border-orange/30 px-3.5 py-1.5 rounded-full mb-4.5">
          01 — What You'll Work On
        </div>
        <h2 className="font-bebas text-[clamp(34px,5vw,62px)] leading-none mb-3">
          Real work.
          <br />
          No coffee runs.
        </h2>
        <p className="text-[15px] text-muted leading-[1.75] max-w-[520px] font-light">
          You'll work on live campaigns, real brands, and actual deliverables from day one.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(215px,1fr))] gap-0.5 mt-11">
          {[
            { num: '01', title: 'Social Media Creatives' },
            { num: '02', title: 'Digital Ads & Campaign Visuals' },
            { num: '03', title: 'Presentation Decks & Brand Assets' },
            { num: '04', title: 'Moodboards & Visual Direction' },
            { num: '05', title: 'Brainstorming & Concept Ideas' },
            { num: '06', title: 'Design Research & Inspiration' },
            { num: '07', title: 'Brand Activation Shoot Prep' },
          ].map((task) => (
            <div
              key={task.num}
              className="bg-s2 p-7 px-6 border border-border relative overflow-hidden transition-all duration-200 hover:bg-s1 hover:-translate-y-1 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-0 before:bg-orange before:transition-all before:duration-300 hover:before:h-full"
            >
              <div className="font-mono text-[10px] text-orange mb-2.5">{task.num}</div>
              <h3 className="text-[14px] font-medium leading-[1.45] text-cream">{task.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-[86px] px-[5vw] border-b border-border bg-s1 reveal opacity-0 translate-y-8 transition-all duration-[650ms]">
        <div className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-orange border border-orange/30 px-3.5 py-1.5 rounded-full mb-4.5">
          02 — What You'll Get
        </div>
        <h2 className="font-bebas text-[clamp(34px,5vw,62px)] leading-none mb-3">
          More than
          <br />a line on your CV.
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-0.5 mt-10">
          {[
            { icon: '💰', title: 'Monthly Stipend', desc: 'Your time and talent are valued. Compensation is included for every month of your internship.' },
            { icon: '📜', title: 'Official Certificate', desc: 'Walk away with a completion certificate from a real Dubai agency. It means something here.' },
            { icon: '🏷️', title: 'Brand Activation', desc: 'On-ground experience working with real brands, from concept all the way to execution.' },
            { icon: '🎨', title: 'Portfolio Gold', desc: 'Live campaigns, real assets, actual results — everything you produce is yours to show off.' },
            { icon: '🚀', title: 'Agency Culture', desc: 'Inside a fast-moving creative team in the heart of Dubai Media City. Zero filter. Real work.' },
            { icon: '🧠', title: 'Mentorship', desc: "Work directly alongside senior creatives who've worked with major regional and global brands." },
          ].map((perk, i) => (
            <div
              key={i}
              className="bg-s1 border border-border p-[30px] px-[26px] transition-all duration-250 hover:border-orange hover:-translate-y-1"
            >
              <div className="text-[26px] mb-3.5">{perk.icon}</div>
              <h3 className="font-bebas text-[22px] text-orange mb-2">{perk.title}</h3>
              <p className="text-[13px] text-muted leading-[1.7] font-light">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who Section */}
      <section className="py-[86px] px-[5vw] border-b border-border reveal opacity-0 translate-y-8 transition-all duration-[650ms]">
        <div className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-orange border border-orange/30 px-3.5 py-1.5 rounded-full mb-4.5">
          03 — Who We're Looking For
        </div>
        <h2 className="font-bebas text-[clamp(34px,5vw,62px)] leading-none mb-3">
          Got taste?
          <br />
          Apply.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] mt-10">
          <div>
            {[
              'Students or fresh grads in Design, Visual Communication, or Mass Comm',
              'A portfolio — student projects and personal work absolutely count',
              'A sharp eye for design and obsessive attention to detail',
              'Positive attitude and a genuine hunger to learn and grow fast',
              "Someone who takes initiative and doesn't wait to be told what to do",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3.5 py-4 border-b border-border text-[14px] text-cream font-light leading-[1.55] transition-colors hover:text-white">
                <span className="text-orange text-[13px] mt-px flex-shrink-0">→</span>
                {item}
              </div>
            ))}
          </div>
          <div>
            <div className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-orange border border-orange/30 px-3.5 py-1.5 rounded-full mb-4">
              Tools & Skills
            </div>
            <div className="flex flex-wrap gap-2.5">
              {['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'Figma', 'Art Direction', 'Visual Thinking', 'Storytelling'].map((tag, i) => (
                <span
                  key={i}
                  className={`font-mono text-[10px] px-3.5 py-2 border border-border text-muted tracking-[0.04em] transition-all cursor-default hover:border-orange hover:text-orange ${
                    i < 2 ? 'border-orange text-orange' : ''
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[12px] text-muted mt-4.5 leading-[1.7] font-light">
              <span className="text-orange">Hot = must have</span> &nbsp;·&nbsp; The rest are a welcome bonus.
              <br />
              What matters most: your eye, your curiosity, your drive.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-0 border-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] items-center p-[9vw] px-[5vw]">
          <div>
            <h2 className="font-bebas text-[clamp(46px,8.5vw,108px)] leading-[0.93] uppercase">
              Ready
              <br />
              to make
              <br />
              <em className="text-orange not-italic block">real</em>
              things?
            </h2>
          </div>
          <div className="flex flex-col gap-4.5">
            <div className="font-mono text-[11px] text-muted tracking-[0.07em] leading-8">
              <strong className="text-text">APPLY NOW</strong>
              <br />
              <br />
              Drop your application to:
              <br />
              <strong className="text-text">jovine@scalify.ae</strong>
              <br />
              <br />
              Location:
              <br />
              <strong className="text-text">
                G01, Boutique Villa 9
                <br />
                Dubai Media City, Dubai, UAE
              </strong>
              <br />
              <br />
              Duration: <strong className="text-text">3–6 Months</strong>
            </div>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-3.5 bg-orange text-white border-none font-bebas text-[20px] tracking-[0.07em] px-[30px] py-[17px] cursor-pointer transition-all duration-200 hover:bg-orange-d hover:translate-x-1 self-start"
            >
              Apply for this Role
              <span>→</span>
            </button>
            <a
              href="https://wa.me/971568633879?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20the%20Creative%20Intern%20role%20at%20Scalify!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-border text-text font-mono text-[11px] px-[22px] py-[13px] transition-all duration-200 hover:border-[#25D366] hover:text-[#25D366] self-start"
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-s1 border-t border-border">
        <div className="py-16 px-[5vw] pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-12 border-b border-border">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bebas text-[24px] tracking-wider text-text">SCALIFY</span>
            </div>
            <p className="text-[13px] text-muted leading-[1.75] max-w-[260px] mb-5.5 font-light">
              Growth strategists helping brands go from "promising startup" → "category leader." Dream. Build. Scale.
            </p>
            <div className="flex gap-2.5">
              {[
                { label: 'in', url: 'https://www.linkedin.com/company/scalifyuae/' },
                { label: 'ig', url: 'https://www.instagram.com/scalify.uae/' },
                { label: 'fb', url: 'https://www.facebook.com/scalifyuae' },
                { label: '📍', url: 'https://maps.app.goo.gl/UFvCo7SB2XvFcg4t7' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] bg-s2 border border-border rounded-r flex items-center justify-center font-mono text-[11px] font-bold transition-all hover:bg-orange hover:border-orange"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted mb-4">Explore</h4>
            {['Home', 'Services', 'About', 'Blog', 'Contact'].map((link, i) => (
              <a
                key={i}
                href={`https://scalify.ae/${link.toLowerCase() === 'home' ? '' : link === 'Blog' ? 'blogs/' : link.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[13px] text-muted mb-2.5 transition-colors hover:text-text font-light"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted mb-4">Services</h4>
            {[
              { name: 'Vision & Strategy', url: 'https://scalify.ae/services/dream/consulting' },
              { name: 'E-commerce', url: 'https://scalify.ae/services/build/e-commerce' },
              { name: 'Content & Storytelling', url: 'https://scalify.ae/services/build/content-storytelling' },
              { name: 'Technology & AI', url: 'https://scalify.ae/services/build/ai' },
            ].map((service, i) => (
              <a key={i} href={service.url} target="_blank" rel="noopener noreferrer" className="block text-[13px] text-muted mb-2.5 transition-colors hover:text-text font-light">
                {service.name}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted mb-4">Get in Touch</h4>
            <div className="text-[13px] text-muted leading-[1.8] font-light">
              <a href="tel:+971568633879" className="text-orange transition-opacity hover:opacity-75">
                +971 56 863 3879
              </a>
              <br />
              <a href="mailto:sales@scalify.ae" className="text-orange transition-opacity hover:opacity-75">
                sales@scalify.ae
              </a>
              <div className="mt-4 flex flex-col gap-1">
                <div className="text-[12px] text-muted2 font-light">
                  <strong className="text-muted block mb-0.5 text-[12px] font-medium">Dubai Office</strong>
                  G01, Boutique Villa 9
                  <br />
                  Dubai Media City, UAE
                </div>
                <div className="text-[12px] text-muted2 font-light mt-2.5">
                  <strong className="text-muted">Also in</strong>
                  Sweden &nbsp;·&nbsp; Ireland
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 px-[5vw] flex justify-between items-center flex-wrap gap-2.5">
          <span className="font-mono text-[10px] text-muted2 tracking-[0.06em]">© Scalify FZE 2026 &nbsp;·&nbsp; All Rights Reserved</span>
          <span className="font-bebas text-[14px] tracking-[0.1em] text-muted">Dream | Build | Scale</span>
          <div className="flex gap-4">
            <a href="https://scalify.ae/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted2 transition-colors hover:text-muted">
              Privacy Policy
            </a>
            <a href="https://scalify.ae/refund-policy/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted2 transition-colors hover:text-muted">
              Refund Policy
            </a>
          </div>
        </div>
      </footer>

      {/* Application Modal */}
      {modalOpen && (
        <div
          className={`fixed inset-0 z-[1000] bg-[rgba(5,5,5,0.92)] backdrop-blur-[12px] flex items-start justify-center overflow-y-auto p-8 pb-[60px] transition-opacity duration-[350ms] ${
            modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-s1 border border-border rounded-xl w-full max-w-[680px] relative animate-slideUp">
            {!showSuccess ? (
              <>
                {/* Header */}
                <div className="p-8 px-9 pb-6 border-b border-border flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-orange border border-orange/30 px-3.5 py-1.5 rounded-full mb-2.5">
                      Creative Intern · Scalify Dubai
                    </div>
                    <h2 className="font-bebas text-[clamp(26px,4vw,38px)] leading-none m-0">
                      Apply for
                      <br />
                      <span className="text-orange">this Role</span>
                    </h2>
                    <p className="text-[13px] text-muted mt-2 leading-[1.6] font-light">Takes less than 5 minutes. We'll reply within 3–5 business days.</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-[38px] h-[38px] bg-s3 border border-border rounded-full text-muted text-[18px] cursor-pointer flex items-center justify-center flex-shrink-0 transition-all hover:bg-orange hover:border-orange hover:text-white"
                  >
                    ×
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-7 px-9 pb-9">
                  {/* Personal Details */}
                  <div className="mb-7">
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-orange mb-4 pb-2.5 border-b border-border">Personal Details</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className={`mb-3.5 ${formErrors.name ? 'invalid' : ''}`}>
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">
                          Full Name <span className="text-orange ml-0.5">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Jane Smith"
                          className={`w-full bg-s2 border ${formErrors.name ? 'border-red-500' : 'border-border'} text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]`}
                        />
                        {formErrors.name && <div className="text-[11px] text-red-400 mt-1.5">Please enter your full name.</div>}
                      </div>
                      <div className={`mb-3.5 ${formErrors.email ? 'invalid' : ''}`}>
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">
                          Email Address <span className="text-orange ml-0.5">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="jane@example.com"
                          className={`w-full bg-s2 border ${formErrors.email ? 'border-red-500' : 'border-border'} text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]`}
                        />
                        {formErrors.email && <div className="text-[11px] text-red-400 mt-1.5">Please enter a valid email.</div>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className={`mb-3.5 ${formErrors.phone ? 'invalid' : ''}`}>
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">
                          Phone Number <span className="text-orange ml-0.5">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+971 50 000 0000"
                          className={`w-full bg-s2 border ${formErrors.phone ? 'border-red-500' : 'border-border'} text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]`}
                        />
                        {formErrors.phone && <div className="text-[11px] text-red-400 mt-1.5">Please enter your phone number.</div>}
                      </div>
                      <div className="mb-3.5">
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Dubai, UAE"
                          className="w-full bg-s2 border border-border text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="mb-7">
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-orange mb-4 pb-2.5 border-b border-border">Application Details</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className={`mb-3.5 ${formErrors.experience ? 'invalid' : ''}`}>
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">
                          Years of Experience <span className="text-orange ml-0.5">*</span>
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className={`w-full bg-s2 border ${formErrors.experience ? 'border-red-500' : 'border-border'} text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]`}
                        >
                          <option value="">Select...</option>
                          <option>0–1 years (Student / Fresh Grad)</option>
                          <option>1–2 years</option>
                          <option>2–4 years</option>
                          <option>4+ years</option>
                        </select>
                        {formErrors.experience && <div className="text-[11px] text-red-400 mt-1.5">Please select your experience level.</div>}
                      </div>
                      <div className="mb-3.5">
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">LinkedIn Profile</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/you"
                          className="w-full bg-s2 border border-border text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="mb-3.5">
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">Portfolio / Website</label>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                          className="w-full bg-s2 border border-border text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]"
                        />
                      </div>
                      <div className="mb-3.5">
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">Other Relevant Link</label>
                        <input
                          type="url"
                          name="otherlink"
                          value={formData.otherlink}
                          onChange={handleInputChange}
                          placeholder="Behance, Dribbble, GitHub…"
                          className="w-full bg-s2 border border-border text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="mb-7">
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-orange mb-4 pb-2.5 border-b border-border">Documents (Resume Required)</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="mb-3.5">
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">
                          Resume / CV <span className="text-orange ml-0.5">*</span>
                        </label>
                        <div
                          className={`bg-s2 border-2 border-dashed ${files.resume ? 'border-orange border-solid' : formErrors.resume ? 'border-red-500' : 'border-border'} rounded-r p-6 px-5 text-center cursor-pointer transition-all hover:border-orange hover:bg-orange/[0.04] relative`}
                        >
                          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resume')} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                          <div className="text-2xl mb-1.5">📄</div>
                          <div className="text-[13px] text-muted leading-[1.5]">
                            <strong className="text-text">Upload Resume</strong>
                            <br />
                            PDF, DOC — max 5 MB
                          </div>
                          {files.resume && <div className="text-[11px] text-orange font-semibold mt-2">✓ {files.resume.name}</div>}
                        </div>
                        {formErrors.resume && <div className="text-[11px] text-red-400 mt-1.5">Please upload your resume.</div>}
                      </div>
                      <div className="mb-3.5">
                        <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">Cover Letter</label>
                        <div
                          className={`bg-s2 border-2 border-dashed ${files.cover ? 'border-orange border-solid' : 'border-border'} rounded-r p-6 px-5 text-center cursor-pointer transition-all hover:border-orange hover:bg-orange/[0.04] relative`}
                        >
                          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'cover')} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                          <div className="text-2xl mb-1.5">📝</div>
                          <div className="text-[13px] text-muted leading-[1.5]">
                            <strong className="text-text">Upload Cover Letter</strong>
                            <br />
                            PDF, DOC — max 5 MB
                          </div>
                          {files.cover && <div className="text-[11px] text-orange font-semibold mt-2">✓ {files.cover.name}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3.5 mt-1">
                      <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">Projects / Work Samples</label>
                      <div
                        className={`bg-s2 border-2 border-dashed ${files.projects.length ? 'border-orange border-solid' : 'border-border'} rounded-r p-6 px-5 text-center cursor-pointer transition-all hover:border-orange hover:bg-orange/[0.04] relative`}
                      >
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png,.zip" multiple onChange={(e) => handleFileChange(e, 'projects')} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                        <div className="text-2xl mb-1.5">🗂️</div>
                        <div className="text-[13px] text-muted leading-[1.5]">
                          <strong className="text-text">Upload Projects or Work Samples</strong>
                          <br />
                          PDF, Images, ZIP — up to 3 files, max 5 MB each
                        </div>
                        {files.projects.length > 0 && (
                          <div className="text-[11px] text-orange font-semibold mt-2">✓ {files.projects.map((f) => f.name).join(' · ')}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-orange mb-4 pb-2.5 border-b border-border">Introduce Yourself</div>
                    <div className="mb-3.5">
                      <label className="block text-[12px] font-medium text-muted mb-2 tracking-[0.03em]">Short Message / Introduction</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us why you're the right fit, what drives you, what you've been working on lately — anything that helps us understand who you are beyond your CV."
                        className="w-full bg-s2 border border-border text-text rounded-r px-4 py-3 text-[14px] outline-none transition-all resize-y min-h-[100px] focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,82,16,0.1)]"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2.5 bg-orange text-white border-none font-bebas text-[19px] tracking-[0.07em] px-7 py-3.5 rounded-r cursor-pointer transition-all hover:bg-orange-d hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <span>{isSubmitting ? 'Preparing...' : 'Send Application'}</span>
                      {isSubmitting && <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />}
                    </button>
                    <p className="text-[11px] text-muted leading-[1.6] font-light">
                      Submitting opens your email client pre-filled with all your details.
                      <br />
                      Attach your files there and hit send — done. ✓
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="p-[60px] px-9 text-center">
                <div className="w-[72px] h-[72px] bg-green-500/[0.12] border border-green-500/30 rounded-full flex items-center justify-center text-[30px] mx-auto mb-6 animate-pop">
                  ✓
                </div>
                <h3 className="font-bebas text-[36px] mb-2.5">Application Ready!</h3>
                <p className="text-[14px] text-muted leading-[1.7] max-w-[380px] mx-auto mb-7">
                  Your email client has opened with everything pre-filled. Just attach your files and hit <strong>Send</strong> — we'll take it from there.
                </p>
                <p className="text-[12px] text-muted mt-[-12px] mb-6">We reply within 3–5 business days. 🙌</p>
                <button
                  onClick={closeModal}
                  className="bg-s3 border border-border text-text px-6 py-3 rounded-r text-[14px] font-medium cursor-pointer transition-all hover:border-orange hover:text-orange"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternPage;
