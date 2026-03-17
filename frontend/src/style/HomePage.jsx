import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Utility: animated counter hook
───────────────────────────────────────────── */
function useCountUp(target, duration = 1800, trigger) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return value;
}


/* ─────────────────────────────────────────────
   Core components data
───────────────────────────────────────────── */
const CORE_COMPONENTS = [
  {
    num: '01',
    title: 'Notice & Assignment Parsing',
    description:
      'AI-powered parsing of college notices, assignment sheets, and academic notifications. Automatically extracts key information like dates, deadlines, and requirements.',
    tags: ['OCR', 'NLP', 'OpenRouter AI'],
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  {
    num: '02',
    title: 'Smart Event Extraction',
    description:
      'Uses advanced LLMs to understand context, convert unstructured text into structured event data with title, date, time, and description.',
    tags: ['GPT-4o', 'AI Processing', 'Data Extraction'],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
  },
  {
    num: '03',
    title: 'Google Calendar Integration',
    description:
      'Automatically sync extracted events to your Google Calendar. Never miss important deadlines with built-in reminders and notifications.',
    tags: ['Google API', 'Calendar Sync', 'OAuth'],
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
  },
  {
    num: '04',
    title: 'WhatsApp Reminders',
    description:
      'Get instant WhatsApp notifications before important dates. Customizable alert times to ensure you never miss a single deadline.',
    tags: ['WhatsApp API', 'Notifications', 'n8n Automation'],
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  },
  {
    num: '05',
    title: 'Student Registration',
    description:
      'One-time secure registration linking your Gmail and WhatsApp. All your student data is encrypted and GDPR-compliant.',
    tags: ['Supabase Auth', 'Security', 'Privacy'],
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)',
  },
  {
    num: '06',
    title: 'Dashboard & Analytics',
    description:
      'Track all your events, deadlines, and reminders in one place. View upcoming assignments and manage your academic schedule effortlessly.',
    tags: ['Analytics', 'Dashboard', 'Event Tracking'],
    gradient: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
  },
];


/* ─────────────────────────────────────────────
   Stats data
───────────────────────────────────────────── */
const STATS = [
  { value: 100, suffix: '%', label: 'Smart Parsing' },
  { value: 50, suffix: '+', label: 'Students Registered' },
  { value: 1000, suffix: '+', label: 'Events Tracked' },
  { value: 24, suffix: 'h', label: 'Advance Notice' },
];

/* ─────────────────────────────────────────────
   Inline style tokens
───────────────────────────────────────────── */
const token = {
  purple: '#7c3aed',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  textMuted: 'rgba(255,255,255,0.55)',
  textDim: 'rgba(255,255,255,0.35)',
  border: 'rgba(124,58,237,0.18)',
  cardBg: 'rgba(255,255,255,0.03)',
  cardBgHover: 'rgba(124,58,237,0.08)',
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function Badge({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.7rem',
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: '999px',
      background: 'rgba(124,58,237,0.18)',
      color: token.violet,
      border: '1px solid rgba(124,58,237,0.3)',
      letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

function GlowButton({ children, onClick, primary = true, style = {} }) {
  const [hovered, setHovered] = useState(false);
  const base = primary ? {
    background: hovered
      ? 'linear-gradient(135deg,#8b5cf6,#4f46e5)'
      : 'linear-gradient(135deg,#7c3aed,#4f46e5)',
    boxShadow: hovered
      ? '0 0 40px rgba(124,58,237,0.55), 0 4px 20px rgba(79,70,229,0.4)'
      : '0 0 24px rgba(124,58,237,0.35)',
    color: 'white',
    border: 'none',
  } : {
    background: hovered ? 'rgba(124,58,237,0.12)' : 'transparent',
    color: hovered ? 'white' : token.textMuted,
    border: '1px solid rgba(124,58,237,0.3)',
    boxShadow: 'none',
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        borderRadius: '12px',
        padding: '12px 28px',
        fontSize: '0.9rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.25s',
        fontFamily: 'inherit',
        ...base,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ── Hero Section ── */
function HeroSection() {
  return (
    <section style={{
      textAlign: 'center',
      padding: '80px 24px 60px',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Headline */}
      <h1 style={{
        fontSize: 'clamp(2.2rem, 6vw, 4rem)',
        fontWeight: 800,
        lineHeight: 1.15,
        margin: '0 0 24px',
        letterSpacing: '-0.03em',
        background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 60%, #6366f1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        CampusFlow<br />Smart Campus Assistant
      </h1>

      {/* Sub-headline */}
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        color: token.textMuted,
        lineHeight: 1.7,
        maxWidth: '680px',
        margin: '0 auto 40px',
      }}>
        Convert college notices, assignments, and deadlines into automated reminders. AI-powered event parsing with Google Calendar sync and WhatsApp notifications for effortless academic management.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <GlowButton primary>✨ Get Started</GlowButton>
        <GlowButton primary={false}>Learn More →</GlowButton>
      </div>

      {/* Floating code snippet preview */}
      <div style={{
        marginTop: '56px',
        background: 'rgba(10,8,25,0.7)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: '16px',
        padding: '24px',
        backdropFilter: 'blur(12px)',
        textAlign: 'left',
        fontFamily: '"Fira Code", "Cascadia Code", monospace',
        fontSize: '0.8rem',
        lineHeight: 1.8,
        boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(124,58,237,0.1)',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {['#ff5f57','#ffbd2e','#28c840'].map(c => (
            <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ color: token.textDim }}>{'# CampusFlow Event Processor'}</div>
        <div><span style={{ color: '#a78bfa' }}>✓</span> <span style={{ color: '#6ee7b7' }}>Notice received</span> <span style={{ color: token.textDim }}>— "MidTerm Exams Schedule"</span></div>
        <div><span style={{ color: '#a78bfa' }}>✓</span> <span style={{ color: '#93c5fd' }}>Parsing with AI</span> <span style={{ color: token.textDim }}>— OpenRouter GPT-4o</span></div>
        <div><span style={{ color: '#a78bfa' }}>✓</span> <span style={{ color: '#fbbf24' }}>Extracting events</span> <span style={{ color: token.textDim }}>— Math Exam: 2026-04-15 10:00</span></div>
        <div><span style={{ color: '#a78bfa' }}>✓</span> <span style={{ color: '#6ee7b7' }}>Syncing to Calendar</span> <span style={{ color: token.textDim }}>— Google Calendar API</span></div>
        <div><span style={{ color: '#a78bfa' }}>✓</span> <span style={{ color: '#6ee7b7' }}>Scheduling reminder</span> <span style={{ color: token.textDim }}>— WhatsApp alert 24h before</span></div>
        <div style={{ marginTop: '8px' }}><span style={{ color: '#a78bfa' }}>🎉 Success:</span> <span style={{ color: '#e2e8f0' }}>"Event added to calendar and reminder set!"</span></div>
      </div>
    </section>
  );
}

/* ── Stats Bar ── */
function StatsBar() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const counts = [
    useCountUp(STATS[0].value, 1400, visible),
    useCountUp(STATS[1].value, 1000, visible),
    useCountUp(STATS[2].value, 1600, visible),
    useCountUp(STATS[3].value, 800, visible),
  ];

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '1px',
      background: 'rgba(124,58,237,0.12)',
      border: '1px solid rgba(124,58,237,0.15)',
      borderRadius: '16px',
      overflow: 'hidden',
      maxWidth: '860px',
      margin: '0 auto 80px',
    }}>
      {STATS.map((s, i) => (
        <div key={s.label} style={{
          background: '#0a0a0f',
          padding: '32px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg,#a78bfa,#6366f1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            {counts[i]}{s.suffix}
          </div>
          <div style={{ fontSize: '0.8rem', color: token.textMuted, fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}


/* ── Section header helper ── */
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
      <div style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        color: token.violet,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        {eyebrow}
      </div>
      <h2 style={{
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
        fontWeight: 800,
        margin: '0 0 16px',
        letterSpacing: '-0.02em',
        color: 'white',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          color: token.textMuted,
          fontSize: '1rem',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Core Components Cards ── */
function CoreComponents() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 24px' }}>
      <SectionHeader
        eyebrow="Core Components"
        title="Six Agents, One Pipeline"
        subtitle="Each component is an intelligent agent, working in coordination to deliver adaptive, end-to-end API testing."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
      }}>
        {CORE_COMPONENTS.map((c, i) => (
          <div
            key={c.num}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? token.cardBgHover : token.cardBg,
              border: hovered === i
                ? '1px solid rgba(124,58,237,0.35)'
                : `1px solid ${token.border}`,
              borderRadius: '18px',
              padding: '28px',
              transition: 'all 0.3s',
              transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hovered === i
                ? '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.15)'
                : '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            {/* Number + Icon row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <span style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: token.textDim,
                letterSpacing: '0.05em',
              }}>
                {c.num}
              </span>

            </div>

            <h3 style={{
              margin: '0 0 10px',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.01em',
            }}>
              {c.title}
            </h3>
            <p style={{
              margin: '0 0 20px',
              fontSize: '0.875rem',
              color: token.textMuted,
              lineHeight: 1.65,
            }}>
              {c.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {c.tags.map(t => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────
   Main HomePage export
───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ color: 'white', fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: '80px' }}>
      <HeroSection />
      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 24px' }}>
        <StatsBar />
      </div>
      <CoreComponents />
    </div>
  );
}
