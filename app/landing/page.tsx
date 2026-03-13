'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import s from './style.module.scss';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
};

const staggerFast = {
    visible: { transition: { staggerChildren: 0.08 } },
};

const STATS = [
    { number: '7분', label: '하루 투자 시간' },
    { number: '4가지', label: '분석 영역' },
    { number: 'AI', label: '맞춤 피드백' },
    { number: '∞', label: '성장 가능성' },
];

const FEATURES = [
    {
        emoji: '🤖',
        title: 'AI 심층 분석',
        desc: '핵심 파악, 논리 추론, 비판적 사고, 편향 탐지 — 4가지 영역을 AI가 정밀 분석합니다.',
        accent: '#3D7BFF',
    },
    {
        emoji: '📰',
        title: '매일 새로운 콘텐츠',
        desc: '시사, 과학, 경제 등 다양한 분야에서 엄선된 아티클과 사고를 자극하는 질문이 제공됩니다.',
        accent: '#7B61FF',
    },
    {
        emoji: '📊',
        title: '성장 리포트',
        desc: '누적 데이터로 사고 패턴과 성장 추이를 시각화하여 나만의 성장 여정을 확인하세요.',
        accent: '#89DA7F',
    },
    {
        emoji: '🧬',
        title: '사고 유형 진단',
        desc: '답변 패턴을 분석해 사고 유형 진단 및 강점과 보완점을 제시합니다.',
        accent: '#FF7B7B',
    },
];

const STEPS = [
    { num: '01', title: '읽기', desc: '매일 엄선된 아티클을 읽으며 다양한 관점을 접합니다.' },
    { num: '02', title: '생각하기', desc: '핵심 질문에 나만의 생각을 자유롭게 작성합니다.' },
    { num: '03', title: '분석받기', desc: 'AI가 답변을 분석하고 점수와 맞춤 피드백을 제공합니다.' },
];

export default function LandingPage() {
    const { user, isLoading } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const heroRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollY } = useScroll();

    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    useEffect(() => {
        if (!isLoading && user) {
            router.push('/');
        }
    }, [user, isLoading]);

    if (isLoading) return null;
    if (user) return null;

    return (
        <div className={s.page}>
            {/* ── Floating Orbs (background) ── */}
            <div className={s.orbContainer}>
                <div className={`${s.orb} ${s.orb1}`} />
                <div className={`${s.orb} ${s.orb2}`} />
                <div className={`${s.orb} ${s.orb3}`} />
            </div>

            {/* ── Navigation ── */}
            <nav className={s.nav}>
                <div className={s.navLogo}>
                    <Image src="/think7_Logo.png" alt="Think7" width={28} height={28} />
                    <span className={s.logoText}>Think7</span>
                </div>
                <div className={s.navActions}>
                    {mounted && (
                        <button 
                            onClick={toggleTheme} 
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px', marginRight: '8px' }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Moon size={20} color="var(--text-primary)" /> : <Sun size={20} color="var(--text-primary)" />}
                        </button>
                    )}
                    <button className={s.navLoginBtn} onClick={() => router.push('/auth/login')}>
                        로그인
                    </button>
                    <button className={s.navSignupBtn} onClick={() => router.push('/auth/signup')}>
                        시작하기
                    </button>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className={s.hero} ref={heroRef}>
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className={s.heroInner}
                >
                    <motion.div
                        className={s.heroBadge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        🧠 AI 기반 사고력 훈련
                    </motion.div>

                    <motion.h1
                        className={s.heroTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        하루 7분,<br />
                        <span className={s.heroGradient}>사고력을 깨우는 시간</span>
                    </motion.h1>

                    <motion.p
                        className={s.heroSubtitle}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        매일 엄선된 콘텐츠를 읽고, 질문에 답하면<br />
                        AI가 당신의 사고 과정을 분석하고 성장을 함께 합니다.
                    </motion.p>

                    <motion.div
                        className={s.heroCTA}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <button className={s.ctaPrimary} onClick={() => router.push('/auth/signup')}>
                            무료로 시작하기
                        </button>
                        <button className={s.ctaGhost} onClick={() => router.push('/auth/login')}>
                            이미 계정이 있어요 →
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Stats Bar ── */}
            <motion.section
                className={s.statsBar}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={staggerFast}
            >
                {STATS.map((stat, i) => (
                    <motion.div key={i} className={s.statItem} variants={fadeUp} transition={{ duration: 0.5 }}>
                        <span className={s.statNumber}>{stat.number}</span>
                        <span className={s.statLabel}>{stat.label}</span>
                    </motion.div>
                ))}
            </motion.section>

            {/* ── Features Section ── */}
            <motion.section
                className={s.features}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={stagger}
            >
                <motion.p className={s.sectionLabel} variants={fadeUp} transition={{ duration: 0.5 }}>
                    FEATURES
                </motion.p>
                <motion.h2 className={s.sectionTitle} variants={fadeUp} transition={{ duration: 0.5 }}>
                    왜 <span className={s.heroGradient}>Think7</span>인가요?
                </motion.h2>

                <div className={s.featureGrid}>
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            className={s.featureCard}
                            variants={scaleUp}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={s.featureIcon} style={{ background: `${f.accent}15` }}>
                                {f.emoji}
                            </div>
                            <h3 className={s.featureTitle}>{f.title}</h3>
                            <p className={s.featureDesc}>{f.desc}</p>
                            <div className={s.featureGlow} style={{ background: f.accent }} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── How It Works Section ── */}
            <motion.section
                className={s.howItWorks}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
            >
                <motion.p className={s.sectionLabel} variants={fadeUp} transition={{ duration: 0.5 }}>
                    HOW IT WORKS
                </motion.p>
                <motion.h2 className={s.sectionTitle} variants={fadeUp} transition={{ duration: 0.5 }}>
                    3단계로 시작하세요
                </motion.h2>

                <div className={s.stepsContainer}>
                    {STEPS.map((step, i) => (
                        <motion.div key={i} className={s.stepCard} variants={fadeUp} transition={{ duration: 0.5 }}>
                            <div className={s.stepNumber}>{step.num}</div>
                            <div className={s.stepContent}>
                                <h3 className={s.stepTitle}>{step.title}</h3>
                                <p className={s.stepDesc}>{step.desc}</p>
                            </div>
                            {i < STEPS.length - 1 && <div className={s.stepConnector} />}
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── Bottom CTA ── */}
            <motion.section
                className={s.bottomCTA}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
            >
                <motion.div className={s.ctaCard} variants={scaleUp} transition={{ duration: 0.6 }}>
                    <motion.h2 className={s.ctaTitle} variants={fadeUp} transition={{ duration: 0.5 }}>
                        오늘부터<br />
                        <span className={s.heroGradient}>사고력을 키워보세요</span>
                    </motion.h2>
                    <motion.p className={s.ctaDesc} variants={fadeUp} transition={{ duration: 0.5 }}>
                        하루 7분이면 충분합니다. 지금 무료로 시작해보세요.
                    </motion.p>
                    <motion.button
                        className={s.ctaStartBtn}
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        onClick={() => router.push('/auth/signup')}
                    >
                        무료로 시작하기
                    </motion.button>
                </motion.div>
            </motion.section>

            {/* ── Footer ── */}
            <footer className={s.footer}>
                <div className={s.footerInner}>
                    <div className={s.footerBrand}>
                        <Image src="/think7_Logo.png" alt="Think7" width={24} height={24} />
                        <span className={s.logoText} style={{ fontSize: 15 }}>Think7</span>
                    </div>
                    <p className={s.footerText}>© 2026 Think7. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
