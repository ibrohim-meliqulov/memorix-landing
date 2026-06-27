'use client'

import { useState } from 'react'

const BOT_URL = 'https://t.me/memorix_uz_bot'
const APP_URL = 'https://memorix-front.vercel.app'

const features = [
  { icon: '✨', title: 'AI bilan flashcard', desc: 'Matn yoki rasm yuboring — AI o\'zi so\'zlarni ajratib, tarjima va misol jumla yozadi.' },
  { icon: '🔄', title: 'Flip kartalar', desc: 'So\'zni ko\'ring, bosing — orqasida tarjima chiqadi. Oddiy va samarali.' },
  { icon: '🎮', title: 'Quiz rejimi', desc: '4 ta variant yoki yozish orqali bilimingizni sinab ko\'ring.' },
  { icon: '📊', title: 'Statistika', desc: 'Ketma-ket kunlar, haftalik grafik va jami o\'rganilgan so\'zlar.' },
  { icon: '🌐', title: '3 ta til', desc: 'Inglizcha, ruscha va koreycha — har biri uchun alohida to\'plam.' },
  { icon: '🔊', title: 'Talaffuz', desc: 'Har bir so\'zning to\'g\'ri talaffuzini eshiting.' },
]

const steps = [
  { num: '1', title: 'Botni oching', desc: '@memorix_uz_bot ga /start yuboring.' },
  { num: '2', title: 'To\'plam yarating', desc: 'Matn yoki rasm yuboring — AI flashcard yaratadi.' },
  { num: '3', title: 'O\'rganing', desc: 'Flip kartalar yoki Quiz bilan o\'rganing.' },
  { num: '4', title: 'Natijani kuzating', desc: 'Statistika va streak bilan motivatsiyangizni saqlang.' },
]

const faqs = [
  { q: 'Memorix bepulmi?', a: 'Ha! Bepul rejada 3 ta to\'plam va 30 ta so\'z. Starter (9,900 so\'m) va Premium (29,900 so\'m) rejalar ham mavjud.' },
  { q: 'AI qanday ishlaydi?', a: 'Siz matn yoki rasm yuborasiz — AI o\'zi muhim so\'zlarni ajratib, o\'zbek tiliga tarjima qiladi va misol jumla yozadi.' },
  { q: 'Qaysi tillarni o\'rganish mumkin?', a: 'Hozirda inglizcha, ruscha va koreycha. Yangi tillar qo\'shilmoqda.' },
  { q: 'Quiz rejimi qanday?', a: '4 ta variant yoki yozish rejimi. Aralash rejimda ikkalasi ham bo\'ladi.' },
  { q: 'Spaced repetition bormi?', a: 'Ha, Premium rejada SM-2 algoritmi asosida spaced repetition ishlaydi.' },
  { q: 'Saytdan ham foydalanish mumkinmi?', a: 'Hozirda Telegram Mini App orqali ishlaydi. Tez orada web versiya ham chiqadi.' },
]

// ── LOGO ──────────────────────────────────────────────────────
function CardLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="18" height="13" rx="3" fill="url(#g1)" opacity="0.5" />
      <rect x="6" y="9" width="18" height="13" rx="3" fill="url(#g2)" />
      <text x="15" y="19" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">Aa</text>
      <defs>
        <linearGradient id="g1" x1="2" y1="5" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="g2" x1="6" y1="9" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── NAV ──────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(8, 16, 40, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <CardLogo size={28} />
          <span style={{ fontSize: 18, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Memorix</span>
        </a>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links">
          {['#features:Xususiyatlar', '#how:Qanday ishlaydi', '#pricing:Narxlar', '#faq:FAQ'].map(item => {
            const [href, label] = item.split(':')
            return (
              <a key={href} href={href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                {label}
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <a href={BOT_URL} target="_blank" rel="noopener noreferrer" style={{
          background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
          color: 'white', fontSize: 14, fontWeight: 600,
          padding: '9px 20px', borderRadius: 8, textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
          transition: 'opacity 0.2s',
        }}>
          Boshlash →
        </a>
      </div>
    </nav>
  )
}

// ── HERO ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle bg gradient */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 24, color: '#93c5fd', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span>
          AI yordamida flashcard yaratish
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20, color: 'white' }}>
          So&apos;zlarni tez va oson{' '}
          <span style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            o&apos;rganing
          </span>
        </h1>

        {/* Sub */}
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Matn yoki rasm yuboring — AI o&apos;zi muhim so&apos;zlarni ajratib flashcard yaratadi.
          Inglizcha, ruscha, koreycha. Telegram orqali bepul.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer" style={{
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: 'white', fontWeight: 700, padding: '14px 28px',
            borderRadius: 10, textDecoration: 'none', fontSize: 15,
            boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            🚀 Bepul boshlash
          </a>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{
            color: 'white', fontWeight: 600, padding: '14px 28px',
            borderRadius: 10, textDecoration: 'none', fontSize: 15,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            📱 Mini App
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { num: '3', label: "O'rganish tili" },
            { num: 'AI', label: 'Avtomatik flashcard' },
            { num: 'Bepul', label: 'Boshlash' },
            { num: '5+', label: "O'rganish rejimi" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#60a5fa' }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FEATURES ──────────────────────────────────────────────────
function Features() {
  return (
    <section id="features" style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Xususiyatlar</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>Hamma narsa bir joyda</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 400 }}>O&apos;rganishni qiziqarli va samarali qiladigan vositalar</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {features.map(f => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, padding: '24px 24px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'white' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── HOW ──────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Jarayon</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>Qanday ishlaydi?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>4 ta oddiy qadam — va siz o&apos;rganishni boshladingiz</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 800, color: 'white',
                boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
              }}>
                {s.num}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: 'white' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRICING ──────────────────────────────────────────────────
function Pricing() {
  const [yearly, setYearly] = useState(false)

  const plans = [
    {
      name: 'Free', price: '0', period: "so'm / oy — abadiy",
      features: ["3 ta to'plam", '30 ta so\'z', 'AI flashcard', '3 ta til', 'Flip kartalar'],
      missing: ['Statistika', 'Quiz', 'Spaced rep.'],
      cta: 'Bepul boshlash', href: BOT_URL, style: 'outline',
    },
    {
      name: '⚡ Starter',
      price: yearly ? '6,930' : '9,900',
      period: yearly ? `so'm / oy · 83,160/yil` : "so'm / oy",
      features: ["10 ta to'plam", "100 ta so'z", 'AI flashcard', '3 ta til', 'Flip kartalar', 'Statistika', 'Quiz'],
      missing: ['Spaced rep.'],
      cta: 'Starter olish', href: `${BOT_URL}?start=starter`, style: 'blue',
    },
    {
      name: '👑 Premium',
      price: yearly ? '20,930' : '29,900',
      period: yearly ? `so'm / oy · 249,900/yil` : "so'm / oy",
      features: ["Cheksiz to'plam", "Cheksiz so'z", 'AI flashcard', '3 ta til', 'Flip kartalar', 'Statistika', 'Quiz', 'Spaced rep.'],
      missing: [],
      cta: 'Premium olish', href: `${BOT_URL}?start=premium`, style: 'primary', recommended: true,
    },
  ]

  return (
    <section id="pricing" style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Narxlar</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Hammaga mos narx</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 36 }}>Bepul boshlang, kerakli paytda yangilang</p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 4, marginBottom: 40 }}>
          {['Oylik', 'Yillik (−30%)'].map((t, i) => (
            <button key={t} onClick={() => setYearly(i === 1)} style={{
              padding: '8px 20px', borderRadius: 7, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              background: (i === 1) === yearly ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'transparent',
              color: (i === 1) === yearly ? 'white' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
            }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, textAlign: 'left' }}>
          {plans.map(p => (
            <div key={p.name} style={{
              background: p.recommended ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${p.recommended ? 'rgba(37,99,235,0.4)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 14, padding: 28, position: 'relative', overflow: 'hidden',
            }}>
              {p.recommended && (
                <div style={{ position: 'absolute', top: 16, right: 0, background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 14px 3px 10px', borderRadius: '100px 0 0 100px', letterSpacing: '0.05em' }}>
                  TAVSIYA
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 700, color: p.recommended ? '#93c5fd' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{p.name}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>{p.period}</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
                {p.missing.map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>✗</span> {f}
                  </li>
                ))}
              </ul>
              <a href={p.href} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 8,
                fontSize: 14, fontWeight: 700, textDecoration: 'none', color: 'white',
                background: p.style === 'primary' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                  : p.style === 'blue' ? 'rgba(37,99,235,0.2)'
                    : 'rgba(255,255,255,0.06)',
                border: p.style === 'outline' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'opacity 0.2s',
              }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ──────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>FAQ</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 40 }}>Ko&apos;p so&apos;raladigan savollar</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${open === i ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', padding: '16px 20px', textAlign: 'left', background: 'none',
                border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 15, fontWeight: 600, color: 'white', fontFamily: 'inherit', gap: 12,
              }}>
                {faq.q}
                <span style={{ color: '#60a5fa', fontSize: 18, flexShrink: 0, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 16px', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ paddingTop: 14 }}>{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Boshqa savollar?{' '}
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>
            @memorix_uz_bot ga yozing →
          </a>
        </div>
      </div>
    </section>
  )
}

// ── CTA ──────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          padding: '56px 40px', borderRadius: 20, position: 'relative', overflow: 'hidden',
          background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
        }}>
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>Bugundan boshlang</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28, lineHeight: 1.6 }}>
              AI bilan flashcard yarating. Bepul. Telegram orqali. Hoziroq.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={BOT_URL} target="_blank" rel="noopener noreferrer" style={{
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white',
                fontWeight: 700, padding: '13px 26px', borderRadius: 9, textDecoration: 'none',
                fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 6px 20px rgba(37,99,235,0.35)',
              }}>
                🚀 Telegram botni ochish
              </a>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{
                color: 'white', fontWeight: 600, padding: '13px 26px', borderRadius: 9,
                textDecoration: 'none', fontSize: 15,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              }}>
                📱 Mini App
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '36px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        <CardLogo size={22} />
        <span style={{ fontWeight: 700, fontSize: 15 }}>Memorix</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
        {[['Telegram bot', BOT_URL], ['Xususiyatlar', '#features'], ['Narxlar', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            {label}
          </a>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Memorix. Barcha huquqlar himoyalangan.</div>
    </footer>
  )
}

// ── PAGE ────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}