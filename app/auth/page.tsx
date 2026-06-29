'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const BACKEND = 'https://memorix-r9gk.onrender.com'

function CardLogo({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
            <rect x="2" y="5" width="18" height="13" rx="3" fill="#93c5fd" opacity="0.6" />
            <rect x="6" y="9" width="18" height="13" rx="3" fill="#2563eb" />
            <text x="15" y="19" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">Aa</text>
        </svg>
    )
}

function AuthContent() {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            // Token saqlash va to'g'ridan memorix-front ga o'tish
            // router.push('/') ishlatmaymiz — loop bo'ladi!
            localStorage.setItem('memorix_token', token)
            window.location.replace('https://memorix-front.vercel.app')
        }
    }, [searchParams])

    function handleGoogle() {
        setLoading(true)
        window.location.href = `${BACKEND}/auth/google`
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f4ff, #e8f0fe, #f5f0ff)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '20px', fontFamily: 'Inter, system-ui, sans-serif',
        }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 32 }}>
                <CardLogo size={32} />
                <span style={{ fontSize: 20, fontWeight: 800, color: '#1e3a8a' }}>Memorix</span>
            </a>

            <div style={{
                background: 'white', borderRadius: 20, padding: '40px 36px',
                maxWidth: 400, width: '100%',
                boxShadow: '0 8px 40px rgba(37,99,235,0.1)',
                border: '1px solid rgba(37,99,235,0.08)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🧠</div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.02em' }}>
                        Memorix ga kiring
                    </h1>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                        Google orqali tez va xavfsiz kiring
                    </p>
                </div>

                <button onClick={handleGoogle} disabled={loading} style={{
                    width: '100%', padding: '14px 20px', borderRadius: 12,
                    border: '1.5px solid #e2e8f0',
                    background: loading ? '#f8faff' : 'white',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: 15, fontWeight: 600, color: '#0f172a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                    fontFamily: 'inherit',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                    {loading ? (
                        <div style={{ width: 20, height: 20, border: '2px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                    )}
                    {loading ? 'Yuklanmoqda...' : 'Google bilan kiring'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 24, lineHeight: 1.5 }}>
                    Kirib, siz foydalanish shartlariga rozilik bildirasiz.
                </p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' }}>
                <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        }>
            <AuthContent />
        </Suspense>
    )
}