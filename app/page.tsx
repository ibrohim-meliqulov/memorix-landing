'use client'

import { useState } from 'react'

const BOT_URL = 'https://t.me/memorix_uz_bot'
const AUTH_URL = '/auth'
const APP_URL = 'https://memorix-front.vercel.app'

const features = [
  { icon: '✨', title: 'AI bilan flashcard', desc: "Matn yoki rasm yuboring — AI o'zi so'zlarni ajratib, tarjima va misol jumla yozadi.", color: '#ede9fe', iconBg: '#7c3aed' },
  { icon: '🔄', title: '3D Flip kartalar', desc: "So'zni ko'ring, bosing — orqasida tarjima chiqadi. Oddiy va samarali.", color: '#dbeafe', iconBg: '#2563eb' },
  { icon: '🎮', title: 'Quiz rejimi', desc: "4 ta variant yoki yozish orqali bilimingizni sinab ko'ring. Natijani ko'ring.", color: '#d1fae5', iconBg: '#059669' },
  { icon: '📊', title: 'Statistika', desc: "Ketma-ket kunlar, haftalik grafik va jami o'rganilgan so'zlar — kuzating.", color: '#fce7f3', iconBg: '#db2777' },
  { icon: '🌐', title: '3 ta til', desc: "Inglizcha, ruscha va koreycha — har biri uchun alohida to'plam yarating.", color: '#fef3c7', iconBg: '#d97706' },
  { icon: '🔊', title: 'Talaffuz', desc: "Har bir so'zning to'g'ri talaffuzini eshiting — Dictionary API orqali.", color: '#e0f2fe', iconBg: '#0284c7' },
]

const steps = [
  { num: '1', emoji: '📱', title: 'Botni oching', desc: '@memorix_uz_bot ga /start yuboring yoki saytdan kiring.' },
  { num: '2', emoji: '✨', title: "To'plam yarating", desc: "Matn yoki rasm yuboring — AI flashcard o'zi yaratadi." },
  { num: '3', emoji: '🎯', title: "O'rganing", desc: "Flip kartalar yoki Quiz bilan o'rganing. Talaffuzni eshiting." },
  { num: '4', emoji: '🔥', title: 'Natijani kuzating', desc: "Streak va statistika bilan motivatsiyangizni saqlang." },
]

const faqs = [
  { q: 'Memorix bepulmi?', a: "Ha! Bepul rejada 3 ta to'plam va 30 ta so'z. Starter (9,900 so'm/oy) va Premium (29,900 so'm/oy) rejalar ham mavjud." },
  { q: 'AI qanday ishlaydi?', a: "Siz matn yoki rasm yuborasiz — AI muhim so'zlarni ajratib, o'zbek tiliga tarjima qiladi va misol jumla yozadi." },
  { q: "Qaysi tillarni o'rganish mumkin?", a: "Hozirda inglizcha, ruscha va koreycha. Yangi tillar qo'shilmoqda." },
  { q: 'Quiz rejimi qanday?', a: "4 ta variant yoki yozish rejimi. Aralash rejimda ikkalasi ham bo'ladi. Natija foizda ko'rsatiladi." },
  { q: 'Spaced repetition bormi?', a: "Ha, Premium rejada SM-2 algoritmi asosida spaced repetition ishlaydi." },
  { q: "Saytdan ham foydalanish mumkinmi?", a: "Hozirda Telegram Mini App orqali ishlaydi — saytdan boshlasangiz ham bot orqali kirasiz. Tez orada to'liq web versiya chiqadi." },
]

// ── LOGO ──
function CardLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="2" y="5" width="18" height="13" rx="3" fill="#93c5fd" opacity="0.6" />
      <rect x="6" y="9" width="18" height="13" rx="3" fill="#2563eb" />
      <text x="15" y="19" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">Aa</text>
    </svg>
  )
}

// ── MOCKUP ──
function AppMockup() {
  return (
    <div style={{
      width: 260, background: '#1e1b4b', borderRadius: 24,
      padding: '20px 16px', boxShadow: '0 32px 80px rgba(37,99,235,0.25), 0 8px 32px rgba(0,0,0,0.15)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>🧠 Memorix</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'white', fontWeight: 700 }}>I</div>
      </div>
      {/* Flip card */}
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 16px', textAlign: 'center', marginBottom: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 6 }}>desert</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>👆 Bosing — tarjimani ko'ring</div>
      </div>
      {/* Speak btn */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '6px 14px', fontSize: 12, color: 'white' }}>🔊 Talaffuz</div>
      </div>
      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px', textAlign: 'center', fontSize: 13, color: '#fca5a5', fontWeight: 600 }}>✗ Bilmadim</div>
        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '10px', textAlign: 'center', fontSize: 13, color: '#6ee7b7', fontWeight: 600 }}>✓ Bildim</div>
      </div>
      {/* Progress */}
      <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 100, height: 4, overflow: 'hidden' }}>
        <div style={{ width: '40%', height: '100%', background: 'linear-gradient(90deg,#7c3aed,#2563eb)', borderRadius: 100 }}></div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 6 }}>2 / 5 so'z</div>
    </div>
  )
}

// ── NAV ──
function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(248,250,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(37,99,235,0.08)',
      boxShadow: '0 1px 12px rgba(37,99,235,0.06)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <CardLogo size={28} />
          <span style={{ fontSize: 18, fontWeight: 800, color: '#1e3a8a', letterSpacing: '-0.02em' }}>Memorix</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[['#features', 'Xususiyatlar'], ['#pricing', 'Narxlar'], ['#faq', 'FAQ']].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 14, color: '#475569', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1e3a8a')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}>
              {label}
            </a>
          ))}
        </div>

        <a href={AUTH_URL} style={{
          background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
          color: 'white', fontSize: 14, fontWeight: 600,
          padding: '9px 20px', borderRadius: 8, textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
        }}>
          Boshlash →
        </a>
      </div>
    </nav>
  )
}

// ── HERO ──
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f0ff 100%)',
    }}>
      {/* bg circles */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
        {/* Left */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600, marginBottom: 24, color: '#2563eb', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', display: 'inline-block' }} />
            AI yordamida flashcard yaratish
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20, color: '#0f172a' }}>
            So&apos;zlarni{' '}
            <span style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              10x tezroq
            </span>
            <br />o&apos;rganing
          </h1>

          <p style={{ fontSize: 18, color: '#475569', maxWidth: 480, marginBottom: 36, lineHeight: 1.7 }}>
            Matn yoki rasm yuboring — AI o&apos;zi muhim so&apos;zlarni ajratib flashcard yaratadi.
            Inglizcha, ruscha, koreycha. Telegram orqali bepul.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            <a href={AUTH_URL} style={{
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white',
              fontWeight: 700, padding: '14px 28px', borderRadius: 10, textDecoration: 'none',
              fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
            }}>
              🚀 Bepul boshlash
            </a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{
              color: '#2563eb', fontWeight: 600, padding: '14px 28px', borderRadius: 10,
              textDecoration: 'none', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', border: '1px solid rgba(37,99,235,0.2)',
              boxShadow: '0 2px 8px rgba(37,99,235,0.1)',
            }}>
              📱 Mini App
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { num: '3', label: "O'rganish tili" },
              { num: 'AI', label: 'Avtomatik flashcard' },
              { num: 'Bepul', label: 'Boshlash' },
              { num: '5+', label: "O'rganish rejimi" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#2563eb' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-float">
          <AppMockup />
        </div>
      </div>
    </section>
  )
}

// ── FEATURES ──
function Features() {
  return (
    <section id="features" style={{ padding: '90px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Xususiyatlar</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10, color: '#0f172a' }}>Hamma narsa bir joyda</h2>
          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 420, lineHeight: 1.6 }}>O&apos;rganishni qiziqarli va samarali qiladigan barcha vositalar</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {features.map(f => (
            <div key={f.title}
              className="card-hover"
              style={{
                background: f.color, borderRadius: 16, padding: '28px 24px',
                border: '1px solid rgba(0,0,0,0.04)',
              }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: f.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 16,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── HOW ──
function HowItWorks() {
  return (
    <section id="how" style={{ padding: '90px 24px', background: '#f8faff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Jarayon</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10, color: '#0f172a' }}>Qanday ishlaydi?</h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>4 ta oddiy qadam — va siz o&apos;rganishni boshladingiz</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ position: 'relative' }}>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', top: 20, left: 'calc(50% + 20px)', width: 'calc(100% - 40px)', height: 1, background: 'rgba(37,99,235,0.15)', display: 'none' }} />
              )}
              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 16,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800, color: 'white',
                boxShadow: '0 6px 20px rgba(37,99,235,0.25)',
              }}>
                {s.num}
              </div>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRICING ──
function Pricing() {
  const [yearly, setYearly] = useState(false)

  const plans = [
    {
      name: 'Free', price: '0', period: "so'm / oy — abadiy",
      features: ["3 ta to'plam", "30 ta so'z", 'AI flashcard', '3 ta til', 'Flip kartalar', 'Quiz'],
      missing: ['Statistika', 'Spaced rep.', 'Ustuvorlik'],
      cta: 'Bepul boshlash', href: AUTH_URL, style: 'outline',
    },
    {
      name: '⚡ Starter',
      price: yearly ? '6,930' : '9,900',
      period: yearly ? "so'm / oy · 83,160/yil" : "so'm / oy",
      features: ["10 ta to'plam", "100 ta so'z", 'AI flashcard', '3 ta til', 'Flip kartalar', 'Quiz', 'Statistika'],
      missing: ['Spaced rep.'],
      cta: 'Starter olish', href: `${BOT_URL}?start=starter`, style: 'blue',
    },
    {
      name: '👑 Premium',
      price: yearly ? '20,930' : '29,900',
      period: yearly ? "so'm / oy · 249,900/yil" : "so'm / oy",
      features: ["Cheksiz to'plam", "Cheksiz so'z", 'AI flashcard', '3 ta til', 'Flip kartalar', 'Quiz', 'Statistika', 'Spaced rep.', 'Ustuvorlik'],
      missing: [],
      cta: 'Premium olish', href: `${BOT_URL}?start=premium`, style: 'primary', recommended: true,
    },
  ]

  return (
    <section id="pricing" style={{ padding: '90px 24px', background: 'white' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Narxlar</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8, color: '#0f172a' }}>Hammaga mos narx</h2>
        <p style={{ color: '#64748b', fontSize: 16, marginBottom: 36 }}>Bepul boshlang, kerakli paytda yangilang</p>

        <div style={{ display: 'inline-flex', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 10, padding: 4, marginBottom: 40 }}>
          {['Oylik', 'Yillik (−30%)'].map((t, i) => (
            <button key={t} onClick={() => setYearly(i === 1)} style={{
              padding: '8px 20px', borderRadius: 7, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              background: (i === 1) === yearly ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'transparent',
              color: (i === 1) === yearly ? 'white' : '#64748b',
              transition: 'all 0.2s',
            }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, textAlign: 'left' }}>
          {plans.map(p => (
            <div key={p.name} style={{
              background: p.recommended ? '#eff6ff' : '#f8faff',
              border: `1px solid ${p.recommended ? '#bfdbfe' : '#e2e8f0'}`,
              borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden',
              boxShadow: p.recommended ? '0 8px 32px rgba(37,99,235,0.12)' : 'none',
            }}>
              {p.recommended && (
                <div style={{ position: 'absolute', top: 16, right: 0, background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 14px 3px 10px', borderRadius: '100px 0 0 100px', letterSpacing: '0.05em' }}>
                  TAVSIYA
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 700, color: p.recommended ? '#2563eb' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{p.name}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24 }}>{p.period}</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: '#334155', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#2563eb', fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
                {p.missing.map(f => (
                  <li key={f} style={{ fontSize: 14, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>✗</span> {f}
                  </li>
                ))}
              </ul>
              <a href={p.href} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 8,
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                color: p.style === 'outline' ? '#2563eb' : 'white',
                background: p.style === 'primary' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                  : p.style === 'blue' ? '#1d4ed8'
                    : 'transparent',
                border: p.style === 'outline' ? '1.5px solid #2563eb' : 'none',
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

// ── FAQ ──
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: '90px 24px', background: '#f8faff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>FAQ</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 40, color: '#0f172a' }}>
          Ko&apos;p so&apos;raladigan savollar
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: 'white',
              border: `1px solid ${open === i ? '#bfdbfe' : '#e2e8f0'}`,
              borderRadius: 12, overflow: 'hidden',
              boxShadow: open === i ? '0 4px 20px rgba(37,99,235,0.08)' : 'none',
              transition: 'all 0.2s',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', padding: '18px 20px', textAlign: 'left', background: 'none',
                border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 15, fontWeight: 600, color: '#0f172a', fontFamily: 'inherit', gap: 12,
              }}>
                {faq.q}
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: open === i ? '#2563eb' : '#f1f5f9',
                  color: open === i ? 'white' : '#94a3b8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                  transition: 'all 0.2s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#64748b', lineHeight: 1.7, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ paddingTop: 14 }}>{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: '#94a3b8' }}>
          Boshqa savollar?{' '}
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
            @memorix_uz_bot ga yozing →
          </a>
        </div>
      </div>
    </section>
  )
}

// ── CTA ──
function CTA() {
  return (
    <section style={{ padding: '90px 24px', background: 'white' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          padding: '60px 40px', borderRadius: 24,
          background: 'linear-gradient(135deg, #eff6ff, #f5f0ff)',
          border: '1px solid #bfdbfe',
          boxShadow: '0 8px 40px rgba(37,99,235,0.1)',
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🧠</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12, color: '#0f172a' }}>
            Bugundan boshlang!
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>
            AI bilan flashcard yarating. Bepul. Telegram orqali. Hoziroq.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={AUTH_URL} style={{
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white',
              fontWeight: 700, padding: '14px 28px', borderRadius: 10, textDecoration: 'none',
              fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
            }}>
              🚀 Bepul boshlash
            </a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{
              color: '#2563eb', fontWeight: 600, padding: '14px 28px', borderRadius: 10,
              textDecoration: 'none', fontSize: 15,
              background: 'white', border: '1.5px solid #bfdbfe',
            }}>
              📱 Mini App
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ──
function Footer() {
  return (
    <footer style={{ padding: '40px 24px', borderTop: '1px solid #e2e8f0', background: '#f8faff', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        <CardLogo size={22} />
        <span style={{ fontWeight: 700, fontSize: 15, color: '#1e3a8a' }}>Memorix</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
        {[['Telegram bot', BOT_URL], ['Xususiyatlar', '#features'], ['Narxlar', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
            style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>
            {label}
          </a>
        ))}
      </div>
      <div style={{ fontSize: 12, color: '#cbd5e1' }}>© 2026 Memorix. Barcha huquqlar himoyalangan.</div>
    </footer>
  )
}

// ── PAGE ──
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