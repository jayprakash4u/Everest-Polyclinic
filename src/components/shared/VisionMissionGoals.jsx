'use client';

import { useEffect, useRef, useState } from 'react';

const items = [
  {
    id: 'vision',
    title: 'Vision',
    description:
      'To be the most trusted home healthcare provider, delivering compassionate and high-quality medical services that empower patients to live healthier, more fulfilling lives in the comfort of their homes.',
    color: '#4FC3A1',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <ellipse cx="20" cy="20" rx="18" ry="10" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="5" stroke="white" strokeWidth="2.2"/>
        <circle cx="20" cy="20" r="2" fill="white"/>
        <line x1="20" y1="6" x2="20" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="20" y1="34" x2="20" y2="37" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'mission',
    title: 'Mission',
    description:
      'To provide personalized, compassionate, and professional healthcare services at home — from skilled nursing and physiotherapy to telemedicine and palliative care — ensuring every patient receives dignified and expert attention.',
    color: '#0B3F7E',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M20 6 C20 6 14 10 14 18 C14 22 17 25 20 26 C23 25 26 22 26 18 C26 10 20 6 20 6Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M14 24 L10 34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M26 24 L30 34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="30" x2="28" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="17" r="3" fill="white" opacity="0.8"/>
      </svg>
    ),
  },
  {
    id: 'goals',
    title: 'Goals',
    description:
      'To expand access to quality home healthcare across all communities, continuously improve patient outcomes through evidence-based practices, and build a team of dedicated professionals committed to excellence in care.',
    color: '#2A7A5E',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <circle cx="20" cy="20" r="16" stroke="white" strokeWidth="2"/>
        <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="2"/>
        <circle cx="20" cy="20" r="4" fill="white"/>
        <line x1="20" y1="4" x2="20" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="20" y1="32" x2="20" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="8" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="32" y1="20" x2="36" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function VisionMissionGoals() {
  const [visible, setVisible] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((_, i) => {
              setTimeout(() => {
                setVisible((prev) => [...prev, i]);
              }, i * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        display: 'flex',
        width: '100%',
        minHeight: '700px',
        fontFamily: "'Segoe UI', Georgia, sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* LEFT — Image with teal overlay + rotated title */}
      <div
        style={{
          position: 'relative',
          width: '38%',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url('/images/about-vision-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Teal overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(11,63,126,0.85) 0%, rgba(79,195,161,0.80) 100%)',
          }}
        />
        {/* Rotated vertical title */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              transform: 'rotate(-90deg)',
              whiteSpace: 'nowrap',
              fontSize: '28px',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: 'Georgia, serif',
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            Our Vision
          </span>
        </div>
        {/* Decorative dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            width: '80px',
            height: '80px',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)',
            backgroundSize: '10px 10px',
            zIndex: 2,
          }}
        />
      </div>

      {/* RIGHT — White content area */}
      <div
        style={{
          flex: 1,
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 56px 48px 64px',
          gap: '0',
          position: 'relative',
        }}
      >
        {/* Top green bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(to right, #4FC3A1, #0B3F7E)',
          }}
        />

        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '28px',
              padding: '28px 0',
              borderBottom: index < items.length - 1 ? '1px solid #f0f0f0' : 'none',
              opacity: visible.includes(index) ? 1 : 0,
              transform: visible.includes(index) ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              position: 'relative',
            }}
          >
            {/* Icon circle — sits on the left edge, overlapping the image */}
            <div
              style={{
                position: 'relative',
                marginLeft: '-88px',
                flexShrink: 0,
                zIndex: 3,
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 6px 24px ${item.color}55`,
                  border: '3px solid #ffffff',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.12)';
                  e.currentTarget.style.boxShadow = `0 10px 32px ${item.color}88`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 6px 24px ${item.color}55`;
                }}
              >
                {item.icon}
              </div>
            </div>

            {/* Text content */}
            <div style={{ flex: 1, paddingTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '4px',
                    height: '24px',
                    background: item.color,
                    borderRadius: '2px',
                  }}
                />
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#0B3F7E',
                    margin: 0,
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '0.5px',
                  }}
                >
                  {item.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#555',
                  lineHeight: '1.75',
                  margin: 0,
                  maxWidth: '520px',
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {/* Bottom green bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(to right, #4FC3A1, #0B3F7E)',
          }}
        />
      </div>
    </section>
  );
}
