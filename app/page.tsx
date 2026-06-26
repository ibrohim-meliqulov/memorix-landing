'use client'

import { useState } from 'react'

const BOT_URL = 'https://t.me/memorix_uz_bot'
const APP_URL = 'https://memorix-front.vercel.app'

// ── DATA ──────────────────────────────────────────────────────
const features = [
  {
    icon: '✨',
    color: 'from-purple-600 to-purple-400',
    title: 'AI bilan flashcard',
    desc: 'Matn yoki rasm yuboring — AI o\'zi muhim so\'zlarni ajratib, tarjima va misol jumla yozadi. Bir zumda 15 ta so\'z!',
  },
  {
    icon: '🔄',
    color: 'from-blue-500 to-indigo-500',
    title: '3D Flip kartalar',
    desc: 'So\'zni ko\'ring, bosing — orqasida tarjima va misol gap chiqadi. Miya yaxshi eslab qoladi!',
  },
  {
    icon: '🎮',
    color: 'from-green-500 to-teal-500',
    title: 'Quiz rejimi',
    desc: '4 ta variant yoki yozish orqali bilimingizni sinab ko\'ring. Ko\'p tanlov va typing — ikkalasi ham bor.',
  },
  {
    icon: '📊',
    color: 'from-pink-500 to-purple-500',
    title: 'Statistika & Streak',
    desc: 'Ketma-ket kunlar, haftalik grafik, jami o\'rganilgan so\'zlar. Duolingo kabi — motivatsiya oshadi!',
  },
  {
    icon: '🌐',
    color: 'from-amber-500 to-orange-500',
    title: '3 ta o\'rganish tili',
    desc: 'Inglizcha, ruscha va koreycha — har biri uchun alohida to\'plam. Yana yangi tillar qo\'shilmoqda.',
  },
  {
    icon: '🔊',
    color: 'from-teal-500 to-cyan-500',
    title: 'Talaffuz',
    desc: 'Har bir so\'zning to\'g\'ri talaffuzini eshiting. Ingliz tili uchun Dictionary API, boshqalar uchun TTS.',
  },
]

const steps = [
  { num: '1', title: 'Telegram botni oching', desc: '@memorix_uz_bot ga /start yuboring. Bir zumda ro\'yxatdan o\'tiladi.' },
  { num: '2', title: 'To\'plam yarating', desc: 'Matn yozing yoki rasm yuklang — AI o\'zi so\'zlarni ajratadi va flashcard yaratadi.' },
  { num: '3', title: 'O\'rganishni boshlang', desc: 'Flip kartalar yoki Quiz rejimida o\'rganing. Kunlik streak saqlang!' },
  { num: '4', title: 'Natijani ko\'ring', desc: 'Statistika sahifasida haftalik progress va jami o\'rganilgan so\'zlarni kuzating.' },
]

const faqs = [
  {
    q: 'Memorix bepulmi?',
    a: 'Ha! Bepul rejada 3 ta to\'plam va 30 ta so\'z yaratish mumkin. Bu boshlash uchun yetarli. Keyinchalik Starter (9,900 so\'m) yoki Premium (29,900 so\'m) rejaga o\'tish mumkin.',
  },
  {
    q: 'AI qanday ishlaydi?',
    a: 'Siz inglizcha matn yoki rasm yuborasiz — AI (Google Gemini) o\'zi muhim so\'zlarni ajratib, o\'zbek tiliga tarjima qiladi va misol jumla yozadi. Bir bosishda 15 ta so\'z!',
  },
  {
    q: 'Qaysi tillarni o\'rganish mumkin?',
    a: 'Hozirda inglizcha, ruscha va koreycha. Yana yangi tillar qo\'shilmoqda. O\'zbek tili ham tez orada!',
  },
  {
    q: 'Quiz rejimi qanday ishlaydi?',
    a: 'Ikki rejim bor: Ko\'p tanlov (4 variant) va Yozish (o\'zingiz tarjimasini yozasiz). Aralash rejimda ikkalasi ham bo\'ladi. Natijada necha foiz to\'g\'ri ekaningizni ko\'rasiz.',
  },
  {
    q: 'Spaced repetition bormi?',
    a: 'Ha, Premium rejada SM-2 algoritmi asosida spaced repetition ishlaydi. Bu eng samarali eslab qolish usuli — faqat unutmoq bo\'lganda qaytib ko\'rsatadi.',
  },
  {
    q: 'Saytdan ham foydalanish mumkinmi?',
    a: 'Hozirda Telegram Mini App orqali ishlaydi. Tez orada to\'liq web versiya ham chiqadi!',
  },
]

const planFeatures = {
  free:    ['3 ta to\'plam', '30 ta so\'z', 'AI flashcard', '3 ta til', 'Flip kartalar'],
  starter: ['10 ta to\'plam', '100 ta so\'z', 'AI flashcard', '3 ta til', 'Flip kartalar', 'Statistika', 'Quiz rejimi'],
  premium: ['Cheksiz to\'plam', 'Cheksiz so\'z', 'AI flashcard', '3 ta til', 'Flip kartalar', 'Statistika', 'Quiz rejimi', 'Spaced repetition', 'Ustuvorlik'],
}

// ── COMPONENTS ────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{ background: 'rgba(8,0,26,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <a href="#" className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ background: '#a855f7', boxShadow: '0 0 16px #a855f7' }}></div>
        <span className="text-xl font-extrabold tracking-tight">Memorix</span>
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Xususiyatlar</a>
        <a href="#how" className="text-sm text-white/60 hover:text-white transition-colors">Qanday ishlaydi</a>
        <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Narxlar</a>
        <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a>
      </div>
      <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
        className="btn-grad text-white text-sm font-bold px-5 py-2.5 rounded-full">
        Boshlash →
      </a>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-28 pb-20 relative">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animate-drift1 absolute w-96 h-96 rounded-full -top-20 -left-20 opacity-30"
          style={{ background: '#6C5CE7', filter: 'blur(80px)' }}></div>
        <div className="animate-drift2 absolute w-80 h-80 rounded-full top-60 -right-20 opacity-25"
          style={{ background: '#a855f7', filter: 'blur(80px)' }}></div>
        <div className="animate-drift3 absolute w-64 h-64 rounded-full bottom-40 opacity-20"
          style={{ background: '#0ea5e9', filter: 'blur(80px)', left: '35%' }}></div>
      </div>

      <div className="animate-fadeUp">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-7"
          style={{ background: 'rgba(108,92,231,0.15)', border: '1px solid rgba(108,92,231,0.3)', color: '#c4b5fd' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" style={{ boxShadow: '0 0 8px #a855f7' }}></span>
          AI yordamida o&apos;rganish
        </div>
      </div>

      <h1 className="animate-fadeUp delay-100 text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
        So&apos;zlarni{' '}
        <span className="grad-text">10x tezroq</span>
        <br />o&apos;rganing
      </h1>

      <p className="animate-fadeUp delay-200 text-lg md:text-xl text-white/55 max-w-lg leading-relaxed mb-10">
        AI matn yoki rasmdan so&apos;zlarni o&apos;zi ajratadi. Siz faqat o&apos;rganing —
        inglizcha, ruscha, koreycha. Telegram orqali bepul!
      </p>

      <div className="animate-fadeUp delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-14">
        <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
          className="btn-grad text-white font-bold px-8 py-4 rounded-full text-lg flex items-center gap-2 justify-center">
          🚀 Bepul boshlash
        </a>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer"
          className="glass text-white font-semibold px-8 py-4 rounded-full text-lg flex items-center gap-2 justify-center hover:bg-white/10 transition-colors">
          📱 Mini App ni ochish
        </a>
      </div>

      <div className="animate-fadeUp delay-400 flex gap-10 md:gap-16 justify-center flex-wrap">
        {[
          { num: '3', label: "O'rganish tili" },
          { num: 'AI', label: 'Avtomatik flashcard' },
          { num: '100%', label: 'Bepul boshlash' },
          { num: '5+', label: "O'rganish rejimi" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-extrabold grad-text">{s.num}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#c4b5fd' }}>
          ✨ Xususiyatlar
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Hamma narsa bir joyda</h2>
        <p className="text-white/50 text-lg mb-14 max-w-md">O&apos;rganishni qiziqarli va samarali qiladigan barcha vositalar</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-7 card-hover">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 opacity-90`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="py-24 px-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#c4b5fd' }}>
          🎯 Jarayon
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Qanday ishlaydi?</h2>
        <p className="text-white/50 text-lg mb-14">4 ta oddiy qadam — va siz o&apos;rganishni boshladingiz</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-1/2 w-full h-px"
                  style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.4), transparent)' }}></div>
              )}
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-black relative z-10"
                style={{ background: 'linear-gradient(135deg, #6C5CE7, #a855f7)', boxShadow: '0 8px 24px rgba(108,92,231,0.4)' }}>
                {s.num}
              </div>
              <h3 className="font-bold text-base mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [yearly, setYearly] = useState(false)

  const prices = {
    starter: yearly ? '6,930' : '9,900',
    premium: yearly ? '20,930' : '29,900',
    starterYear: '83,160',
    premiumYear: '249,900',
  }

  return (
    <section id="pricing" className="py-24 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#c4b5fd' }}>
          💰 Narxlar
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Hammaga mos narx</h2>
        <p className="text-white/50 text-lg mb-10">Bepul boshlang, kerakli paytda yangilang</p>

        {/* Toggle */}
        <div className="inline-flex glass rounded-full p-1 mb-12">
          <button onClick={() => setYearly(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${!yearly ? 'text-white' : 'text-white/50'}`}
            style={!yearly ? { background: 'linear-gradient(135deg, #6C5CE7, #a855f7)' } : {}}>
            Oylik
          </button>
          <button onClick={() => setYearly(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${yearly ? 'text-white' : 'text-white/50'}`}
            style={yearly ? { background: 'linear-gradient(135deg, #6C5CE7, #a855f7)' } : {}}>
            Yillik
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">−30%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* FREE */}
          <div className="glass rounded-3xl p-8 text-left">
            <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Free</div>
            <div className="text-4xl font-black mb-1">0</div>
            <div className="text-sm text-white/40 mb-6">so&apos;m / oy — abadiy</div>
            <ul className="space-y-2.5 mb-8">
              {planFeatures.free.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="text-green-400 font-bold">✓</span> {f}
                </li>
              ))}
              {['Statistika', 'Quiz rejimi', 'Spaced repetition'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/25">
                  <span>✗</span> {f}
                </li>
              ))}
            </ul>
            <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
              className="block text-center py-3.5 rounded-xl text-sm font-bold transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              Bepul boshlash
            </a>
          </div>

          {/* STARTER */}
          <div className="rounded-3xl p-8 text-left relative"
            style={{ background: 'linear-gradient(145deg, rgba(14,165,233,0.15), rgba(99,102,241,0.1))', border: '1px solid rgba(14,165,233,0.3)' }}>
            <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#7dd3fc' }}>⚡ Starter</div>
            <div className="text-4xl font-black mb-1">{prices.starter}</div>
            <div className="text-sm mb-6" style={{ color: '#7dd3fc' }}>
              so&apos;m / oy{yearly && <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">{prices.starterYear}/yil</span>}
            </div>
            <ul className="space-y-2.5 mb-8">
              {planFeatures.starter.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="text-green-400 font-bold">✓</span> {f}
                </li>
              ))}
              {['Spaced repetition'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/25">
                  <span>✗</span> {f}
                </li>
              ))}
            </ul>
            <a href={`${BOT_URL}?start=starter`} target="_blank" rel="noopener noreferrer"
              className="block text-center py-3.5 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}>
              Starter olish
            </a>
          </div>

          {/* PREMIUM */}
          <div className="rounded-3xl p-8 text-left relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, rgba(108,92,231,0.2), rgba(168,85,247,0.15))', border: '1px solid rgba(168,85,247,0.4)' }}>
            <div className="absolute top-5 right-0 text-xs font-black text-white px-4 py-1 rounded-l-full"
              style={{ background: 'linear-gradient(135deg, #6C5CE7, #a855f7)' }}>
              TAVSIYA
            </div>
            <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#c4b5fd' }}>👑 Premium</div>
            <div className="text-4xl font-black mb-1">{prices.premium}</div>
            <div className="text-sm mb-6" style={{ color: '#a78bfa' }}>
              so&apos;m / oy{yearly && <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">{prices.premiumYear}/yil</span>}
            </div>
            <ul className="space-y-2.5 mb-8">
              {planFeatures.premium.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href={`${BOT_URL}?start=premium`} target="_blank" rel="noopener noreferrer"
              className="btn-grad block text-center py-3.5 rounded-xl text-sm font-bold text-white">
              Premium olish
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="py-24 px-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#c4b5fd' }}>
          ❓ FAQ
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight mb-12">Ko&apos;p so&apos;raladigan savollar</h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="glass rounded-2xl group">
              <summary className="flex items-center justify-between p-5 font-semibold text-base">
                {faq.q}
                <span className="faq-icon text-purple-400 text-xl ml-4 flex-shrink-0">+</span>
              </summary>
              <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm mb-3">Boshqa savollaringiz bormi?</p>
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
            className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
            @memorix_uz_bot ga yozing →
          </a>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 px-5">
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-3xl p-14 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(168,85,247,0.15))', border: '1px solid rgba(168,85,247,0.3)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.2), transparent 60%)' }}></div>
          <div className="relative">
            <div className="text-6xl mb-5 animate-float inline-block">🧠</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Bugundan boshlang!</h2>
            <p className="text-white/55 text-lg mb-8 leading-relaxed">
              O&apos;zbek tilida eng qulay flashcard ilova. AI bilan, bepul, hoziroq.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
                className="btn-grad text-white font-bold px-8 py-4 rounded-full text-base flex items-center gap-2 justify-center">
                🚀 Telegram botni ochish
              </a>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="glass text-white font-semibold px-8 py-4 rounded-full text-base flex items-center gap-2 justify-center hover:bg-white/10 transition-colors">
                📱 Mini App
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 px-5 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#a855f7', boxShadow: '0 0 10px #a855f7' }}></div>
        <span className="font-extrabold">Memorix</span>
      </div>
      <div className="flex justify-center gap-6 text-sm text-white/40 mb-4">
        <a href={BOT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram bot</a>
        <a href="#features" className="hover:text-white transition-colors">Xususiyatlar</a>
        <a href="#pricing" className="hover:text-white transition-colors">Narxlar</a>
        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
      </div>
      <div className="text-xs text-white/25">© 2026 Memorix. Barcha huquqlar himoyalangan.</div>
    </footer>
  )
}

// ── PAGE ──────────────────────────────────────────────────────
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
