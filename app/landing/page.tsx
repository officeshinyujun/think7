'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, ArrowRight, Brain, BookOpen, BarChart3, Dna, ChevronRight } from 'lucide-react';
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
        icon: <Brain size={22} />,
        title: 'AI 심층 분석',
        desc: '핵심 파악, 논리 추론, 비판적 사고, 편향 탐지 — 4가지 영역을 AI가 정밀 분석합니다.',
    },
    {
        icon: <BookOpen size={22} />,
        title: '매일 새로운 콘텐츠',
        desc: '시사, 과학, 경제 등 다양한 분야에서 엄선된 아티클과 사고를 자극하는 질문이 제공됩니다.',
    },
    {
        icon: <BarChart3 size={22} />,
        title: '성장 리포트',
        desc: '누적 데이터로 사고 패턴과 성장 추이를 시각화하여 나만의 성장 여정을 확인하세요.',
    },
    {
        icon: <Dna size={22} />,
        title: '사고 유형 진단',
        desc: '답변 패턴을 분석해 사고 유형 진단 및 강점과 보완점을 제시합니다.',
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isLoading && user) {
            router.push('/');
        }
    }, [user, isLoading]);

    if (isLoading) return null;
    if (user) return null;

    return (
        <div className={s.page}>
            {/* ── Background Glow Effects ── */}
            <div className={s.glowContainer}>
                <div className={s.glowOrb1} />
                <div className={s.glowOrb2} />
                <div className={s.glowOrb3} />
            </div>

            {/* ── Navigation ── */}
            <nav className={s.nav}>
                <div className={s.navLogo}>
                    <Image src="/think7_Logo.png" alt="Think7" width={28} height={28} />
                    <span className={s.logoText}>Think7</span>
                </div>
                <div className={s.navActions}>
                    <button className={s.navLoginBtn} onClick={() => router.push('/auth/login')}>
                        로그인
                    </button>
                    <button className={s.navCtaBtn} onClick={() => router.push('/auth/signup')}>
                        시작하기 <ChevronRight size={16} />
                    </button>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className={s.hero}>
                <div className={s.heroContent}>
                    <motion.div
                        className={s.heroTextBlock}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className={s.heroTitle}>
                            Meet Think7.<br />
                            <span className={s.heroTitleAccent}>
                                AI 기반 비판적 사고력<br />
                                훈련 플랫폼.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className={s.heroBottom}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <p className={s.heroSubtitle}>
                            매일 엄선된 콘텐츠를 읽고, 질문에 답하면<br />
                            AI가 당신의 사고 과정을 분석하고 성장을 돕습니다.
                        </p>
                        <div className={s.heroCTA}>
                            <button className={s.ctaPrimary} onClick={() => router.push('/auth/signup')}>
                                시작하기 <ChevronRight size={18} />
                            </button>
                            <button className={s.ctaSecondary} onClick={() => router.push('/tutorial')}>
                                직접 체험해보기
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Hero right side floating shapes */}
                <div className={s.heroVisual}>
                    <motion.div
                        className={s.floatingShape1}
                        animate={{ rotate: [0, 15, -5, 0], y: [0, -20, 10, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className={s.floatingShape2}
                        animate={{ rotate: [0, -10, 20, 0], y: [0, 15, -10, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <motion.div
                        className={s.floatingShape3}
                        animate={{ rotate: [0, 25, -15, 0], y: [0, -15, 20, 0] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                </div>
            </section>

            {/* ── Features Section ── */}
            <motion.section
                className={s.features}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={stagger}
            >
                <motion.div className={s.sectionHeader} variants={fadeUp} transition={{ duration: 0.6 }}>
                    <h2 className={s.sectionTitle}>Think7 Systems</h2>
                    <p className={s.sectionSubtitle}>비판적 사고력 향상을 위한 지능형 솔루션</p>
                </motion.div>

                <div className={s.featureGrid}>
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            className={s.featureCard}
                            variants={scaleUp}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={s.featureIconWrap}>
                                {f.icon}
                            </div>
                            <h3 className={s.featureTitle}>{f.title}</h3>
                            <p className={s.featureDesc}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── How It Works (Case Study Style) ── */}
            <motion.section
                className={s.howItWorks}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
            >
                <motion.div className={s.sectionHeader} variants={fadeUp} transition={{ duration: 0.6 }}>
                    <h2 className={s.sectionTitle}>이렇게 진행됩니다</h2>
                    <p className={s.sectionSubtitle}>3단계로 완성되는 사고력 훈련</p>
                </motion.div>

                <div className={s.stepsRow}>
                    {STEPS.map((step, i) => (
                        <motion.div key={i} className={s.stepCard} variants={fadeUp} transition={{ duration: 0.5 }}>
                            <div className={s.stepNumber}>{step.num}</div>
                            <h3 className={s.stepTitle}>{step.title}</h3>
                            <p className={s.stepDesc}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── Data & AI Sections ── */}
            <motion.section
                className={s.showcase}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
            >
                {/* Data Driven */}
                <motion.div className={s.showcaseRow} variants={fadeUp} transition={{ duration: 0.7 }}>
                    <div className={s.showcaseText}>
                        <div className={s.showcaseIcon}>
                            <BarChart3 size={32} />
                        </div>
                        <h2 className={s.showcaseTitle}>Data Driven</h2>
                        <p className={s.showcaseDesc}>
                            매일 축적되는 학습 데이터를 기반으로 사고 패턴, 강약점, 성장 추이를 정밀하게 추적합니다.
                            당신의 비판적 사고력 향상을 수치로 확인하세요.
                        </p>
                    </div>
                    <div className={s.showcaseVisual}>
                        {/* Mock Growth Chart Card */}
                        <motion.div
                            className={s.mockCard}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className={s.mockCardHeader}>
                                <span className={s.mockCardLabel}>사고력 성장 추이</span>
                                <span className={s.mockCardBadge}>+12%</span>
                            </div>
                            <div className={s.mockChart}>
                                <div className={s.mockChartBar} style={{ height: '40%' }} />
                                <div className={s.mockChartBar} style={{ height: '55%' }} />
                                <div className={s.mockChartBar} style={{ height: '45%' }} />
                                <div className={s.mockChartBar} style={{ height: '65%' }} />
                                <div className={s.mockChartBar} style={{ height: '60%' }} />
                                <div className={s.mockChartBar} style={{ height: '75%' }} />
                                <div className={`${s.mockChartBar} ${s.mockChartBarActive}`} style={{ height: '85%' }} />
                            </div>
                            <div className={s.mockChartLabels}>
                                <span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span>
                            </div>
                        </motion.div>
                        {/* Mock Score Card */}
                        <motion.div
                            className={`${s.mockCard} ${s.mockCardSmall}`}
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        >
                            <span className={s.mockScoreLabel}>종합 점수</span>
                            <span className={s.mockScoreValue}>87</span>
                            <div className={s.mockProgressBar}>
                                <div className={s.mockProgressFill} style={{ width: '87%' }} />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* AI Powered */}
                <motion.div className={`${s.showcaseRow} ${s.showcaseRowReverse}`} variants={fadeUp} transition={{ duration: 0.7 }}>
                    <div className={s.showcaseText}>
                        <div className={s.showcaseIcon}>
                            <Brain size={32} />
                        </div>
                        <h2 className={s.showcaseTitle}>AI Powered</h2>
                        <p className={s.showcaseDesc}>
                            GPT-4o 기반 Chain-of-Thought 분석으로 답변의 논리적 결함을 정밀 진단합니다.
                            단순 채점이 아닌, 사고 과정 자체를 코칭합니다.
                        </p>
                    </div>
                    <div className={s.showcaseVisual}>
                        {/* Mock AI Feedback Card */}
                        <motion.div
                            className={s.mockCard}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className={s.mockCardHeader}>
                                <span className={s.mockCardLabel}>AI 분석 피드백</span>
                            </div>
                            <div className={s.mockFeedback}>
                                <div className={s.mockFeedbackRow}>
                                    <span className={s.mockDot} style={{ background: '#89DA7F' }} />
                                    <span className={s.mockFeedbackText}>핵심 주장 파악</span>
                                    <span className={s.mockFeedbackScore}>92</span>
                                </div>
                                <div className={s.mockFeedbackRow}>
                                    <span className={s.mockDot} style={{ background: '#3D7BFF' }} />
                                    <span className={s.mockFeedbackText}>논리적 추론</span>
                                    <span className={s.mockFeedbackScore}>78</span>
                                </div>
                                <div className={s.mockFeedbackRow}>
                                    <span className={s.mockDot} style={{ background: '#FF7B7B' }} />
                                    <span className={s.mockFeedbackText}>비판적 사고</span>
                                    <span className={s.mockFeedbackScore}>65</span>
                                </div>
                                <div className={s.mockFeedbackRow}>
                                    <span className={s.mockDot} style={{ background: '#7B61FF' }} />
                                    <span className={s.mockFeedbackText}>편향 탐지</span>
                                    <span className={s.mockFeedbackScore}>84</span>
                                </div>
                            </div>
                        </motion.div>
                        {/* Mock Taxonomy Card */}
                        <motion.div
                            className={`${s.mockCard} ${s.mockCardSmall}`}
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        >
                            <span className={s.mockScoreLabel}>사고 유형</span>
                            <span className={s.mockTypeValue}>전략형 🧠</span>
                            <p className={s.mockTypeDesc}>논리적 구조를 파악하는 능력이 뛰어남</p>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Bottom CTA ── */}
            <motion.section
                className={s.bottomCTA}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
            >
                <motion.h2 className={s.ctaTitle} variants={fadeUp} transition={{ duration: 0.6 }}>
                    오늘부터<br />
                    <span className={s.heroTitleAccent}>사고력을 키워보세요</span>
                </motion.h2>
                <motion.p className={s.ctaDesc} variants={fadeUp} transition={{ duration: 0.5 }}>
                    하루 7분이면 충분합니다. 지금 무료로 시작해보세요.
                </motion.p>
                <motion.button
                    className={s.ctaPrimary}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    onClick={() => router.push('/auth/signup')}
                >
                    무료로 시작하기 <ChevronRight size={18} />
                </motion.button>
            </motion.section>

            {/* ── Footer ── */}
            <footer className={s.footer}>
                <div className={s.footerInner}>
                    <div className={s.footerBrand}>
                        <Image src="/think7_Logo.png" alt="Think7" width={20} height={20} />
                        <span className={s.footerLogoText}>Think7</span>
                    </div>
                    <p className={s.footerCopy}>© 2026 Think7. All rights reserved.</p>
                </div>
            </footer>

            {/* ── Mobile Floating Theme Toggle ── */}
            {mounted && (
                <button className={s.floatingThemeBtn} onClick={toggleTheme}>
                    {theme === 'dark' ? <Moon size={22} color="#3D7BFF" /> : <Sun size={22} color="#3D7BFF" />}
                </button>
            )}
        </div>
    );
}
