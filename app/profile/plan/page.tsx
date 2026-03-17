'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft, Check, X, Zap, TrendingUp, BrainCircuit, BookOpen, Target, Sparkles, MessageSquare, Search, BarChart3, Layers } from "lucide-react";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";


export default function PlanDetails() {
    const router = useRouter();



    const features = [
        { icon: <BrainCircuit size={24} color="#3D7BFF" />, title: "사고 유형 정밀 진단", desc: "논리적 전략가, 직관형 분석가 등 나만의 사고 패턴을 분석합니다" },
        { icon: <MessageSquare size={24} color="#3D7BFF" />, title: "1:1 AI 퍼스널 코칭", desc: "틀린 문제에 대해 AI 코치가 실시간 대화로 사고의 완성을 돕습니다" },
        { icon: <Zap size={24} color="#3D7BFF" />, title: "문제별 상세 피드백", desc: "단순 점수가 아닌, 각 문제에 대한 심층 분석과 개선 방향을 제공합니다" },
        { icon: <BookOpen size={24} color="#3D7BFF" />, title: "무제한 문제 풀이", desc: "라이브러리의 모든 콘텐츠를 제한 없이 풀 수 있습니다" },
        { icon: <Sparkles size={24} color="#3D7BFF" />, title: "프리미엄 콘텐츠", desc: "면접 대비, 논술 대비, 고난이도 철학 등 심층 콘텐츠를 제공합니다" },
    ];

    const comparison = [
        { feature: "오늘의 문제", free: "O", premium: "O" },
        { feature: "라이브러리 추가 풀이", free: "하루 2개", premium: "무제한" },
        { feature: "AI 1:1 코칭", free: "하루 1회", premium: "무제한" },
        { feature: "프리미엄 콘텐츠", free: "—", premium: "O" },
        { feature: "Think Score", free: "O", premium: "O" },
        { feature: "영역별 점수", free: "O", premium: "O" },
        { feature: "상세 피드백", free: "—", premium: "O" },
        { feature: "사고 유형 분석", free: "—", premium: "O" },
        { feature: "성장 분석", free: "—", premium: "O" },
        { feature: "리포트 히스토리", free: "7일", premium: "무제한" },
        { feature: "개인 맞춤 추천", free: "—", premium: "O" },
    ];

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={24} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{ padding: '16px 0' }}>
                        <ChevronLeft size={24} color="var(--text-primary)" onClick={() => router.back()} style={{ cursor: 'pointer' }} />
                        <Typo.LG color="primary" fontWeight="bold">요금제 상세</Typo.LG>
                    </HStack>

                    {/* Hero Section */}
                    <VStack fullWidth align="center" gap={12} className={s.heroSection}>
                        <Typo.SM color="brand" fontWeight="bold">THINK7 PREMIUM</Typo.SM>
                        <Typo.XXL color="primary" fontWeight="bold" style={{ lineHeight: '1.3', textAlign: 'center' }}>
                            AI 분석의 깊이가<br />달라지는 경험
                        </Typo.XXL>
                        <Typo.MD color="secondary" fontWeight="medium" style={{ textAlign: 'center' }}>
                            점수만 보지 마세요.<br />
                            당신의 사고 과정을 깊이 들여다보고<br />
                            진짜 성장을 경험하세요.
                        </Typo.MD>
                    </VStack>

                    {/* FREE vs PREMIUM Example */}
                    <HStack fullWidth gap={12} className={s.exampleCards}>
                        <VStack className={s.freeExample} align="start" gap={8}>
                            <Typo.XS color="secondary" fontWeight="bold">FREE 리포트</Typo.XS>
                            <VStack align="start" gap={4}>
                                <Typo.SM color="primary" fontWeight="bold">Think Score: 72</Typo.SM>
                                <Typo.XS color="secondary" fontWeight="regular">
                                    핵심 파악 능력이 우수하지만,{'\n'}
                                    논리적 전제 추론에서 약점을 보입니다.
                                </Typo.XS>
                            </VStack>
                        </VStack>
                        <VStack className={s.premiumExample} align="start" gap={8}>
                            <Typo.XS fontWeight="bold" style={{ opacity: 0.9 }}>PREMIUM 리포트</Typo.XS>
                            <VStack align="start" gap={4}>
                                <Typo.SM fontWeight="bold">논리적 전략가형</Typo.SM>
                                <Typo.XS fontWeight="regular" style={{ opacity: 0.85 }}>
                                    복잡한 논리 구조를 잘 이해하지만,{'\n'}
                                    직관에 의존하는 경향이 있습니다.
                                </Typo.XS>
                                <div style={{ height: 4 }} />
                                <Typo.XS fontWeight="bold" style={{ opacity: 0.9 }}>
                                    핵심 주장 파악 상위 18% · 추론 하위 42%
                                </Typo.XS>
                            </VStack>
                        </VStack>
                    </HStack>

                    {/* Pricing Card */}
                    <VStack fullWidth className={s.pricingCard}>
                        <Typo.MD fontWeight="bold" style={{ opacity: 0.9 }}>Premium Plan</Typo.MD>
                        <div className={s.priceTag}>
                            월 5,900원
                        </div>
                        <Typo.SM fontWeight="medium" style={{ opacity: 0.8 }}>
                            커피 한 잔 값으로 시작하는<br />매일의 사고력 훈련
                        </Typo.SM>
                        <Button className={s.ctaButton} onClick={() => window.alert('준비중입니다.')}>
                            <Typo.MD color="#3D7BFF" fontWeight="bold">지금 시작하기</Typo.MD>
                        </Button>
                    </VStack>

                    {/* AI Coaching Showcase */}
                    <VStack fullWidth gap={16} className={s.showcaseCard}>
                        <HStack fullWidth justify="between" align="center">
                            <VStack align="start" gap={4}>
                                <Typo.LG color="primary" fontWeight="bold">AI 1:1 퍼스널 코칭</Typo.LG>
                                <Typo.SM color="secondary">대화를 통해 답을 찾아가는 사고력 훈련</Typo.SM>
                            </VStack>
                            <div className={s.premiumBadge}>ONLY PREMIUM</div>
                        </HStack>

                        <VStack fullWidth gap={12} className={s.coachingMockup}>
                            <div className={s.mockBubbleLeft}>
                                <Typo.XS color="primary">이 문제의 전제가 무엇인지 다시 한번 생각해보시겠어요?</Typo.XS>
                            </div>
                            <div className={s.mockBubbleRight}>
                                <Typo.XS style={{ color: 'white' }}>음.. 데이터의 객관성이 결여되었다는 점인가요?</Typo.XS>
                            </div>
                            <div className={s.mockBubbleLeft}>
                                <Typo.XS color="primary">정확합니다! 그 점이 결론 도출에 어떤 영향을 줄까요?</Typo.XS>
                            </div>
                        </VStack>
                    </VStack>

                    {/* Thinking Type Showcase */}
                    <VStack fullWidth gap={16} className={s.showcaseCard}>
                        <HStack fullWidth justify="between" align="center">
                            <VStack align="start" gap={4}>
                                <Typo.LG color="primary" fontWeight="bold">사고 유형 정밀 진단</Typo.LG>
                                <Typo.SM color="secondary">나의 사고 패턴을 분석하고 유형을 정의합니다</Typo.SM>
                            </VStack>
                            <div className={s.premiumBadge}>ONLY PREMIUM</div>
                        </HStack>

                        <HStack fullWidth gap={12} className={s.diagnosisMockup}>
                            <VStack className={s.typeBadge} align="center" justify="center">
                                <BrainCircuit size={32} color="#3D7BFF" />
                                <Typo.SM color="brand" fontWeight="bold" style={{ marginTop: 8 }}>논리적 전략가</Typo.SM>
                            </VStack>
                            <VStack gap={8} align="center" style={{ flex: 1 }} justify="center">
                                <VStack fullWidth gap={4}>
                                    <HStack fullWidth justify="between">
                                        <Typo.XXS color="secondary">논리적 완결성</Typo.XXS>
                                        <Typo.XXS color="brand" fontWeight="bold">92%</Typo.XXS>
                                    </HStack>
                                    <div className={s.progressBar}><div className={s.progress} style={{ width: '92%' }} /></div>
                                </VStack>
                                <VStack fullWidth gap={4}>
                                    <HStack fullWidth justify="between">
                                        <Typo.XXS color="secondary">비판적 추론</Typo.XXS>
                                        <Typo.XXS color="brand" fontWeight="bold">78%</Typo.XXS>
                                    </HStack>
                                    <div className={s.progressBar}><div className={s.progress} style={{ width: '78%' }} /></div>
                                </VStack>
                            </VStack>
                        </HStack>
                    </VStack>

                    {/* Detailed Feedback Showcase */}
                    <VStack fullWidth gap={16} className={s.showcaseCard}>
                        <HStack fullWidth justify="between" align="center">
                            <VStack align="start" gap={4}>
                                <Typo.LG color="primary" fontWeight="bold">문제별 상세 피드백</Typo.LG>
                                <Typo.SM color="secondary">단순 점수가 아닌, 사고의 맹점을 짚어줍니다</Typo.SM>
                            </VStack>
                            <div className={s.premiumBadge}>ONLY PREMIUM</div>
                        </HStack>

                        <div className={s.feedbackMockup}>
                            <HStack gap={8} align="center" style={{ marginBottom: 12 }}>
                                <Search size={16} color="#3D7BFF" />
                                <Typo.XS color="brand" fontWeight="bold">심층 분석 결과</Typo.XS>
                            </HStack>
                            <Typo.SM color="primary" fontWeight="medium">"귀하는 인과관계 설정 과정에서 상관관계와 인과를 혼동하는 경향이 있습니다. 특히 전제 2번의..."</Typo.SM>
                            <div className={s.tagContainer}>
                                <div className={s.mockTag}>전제 오류</div>
                                <div className={s.mockTag}>논리 비약</div>
                            </div>
                        </div>
                    </VStack>

                    {/* Premium Content Showcase */}
                    <VStack fullWidth gap={16} className={s.showcaseCard}>
                        <HStack fullWidth justify="between" align="center">
                            <VStack align="start" gap={4}>
                                <Typo.LG color="primary" fontWeight="bold">프리미엄 콘텐츠</Typo.LG>
                                <Typo.SM color="secondary">심화 사고력이 필요한 고난도 주제 제공</Typo.SM>
                            </VStack>
                            <div className={s.premiumBadge}>ONLY PREMIUM</div>
                        </HStack>

                        <div className={s.contentMockup}>
                            <HStack fullWidth justify="between" align="center" className={s.contentRow}>
                                <HStack gap={12} align="center" fullHeight>
                                    <div className={s.contentIcon}>🏛️</div>
                                    <Typo.SM color="primary" fontWeight="medium">현대 사회의 정의란 무엇인가</Typo.SM>
                                </HStack>
                                <Sparkles size={16} color="#3D7BFF" />
                            </HStack>
                            <HStack fullWidth justify="between" align="center" className={s.contentRow}>
                                <HStack gap={12} align="center" fullHeight>
                                    <div className={s.contentIcon}>🧬</div>
                                    <Typo.SM color="primary" fontWeight="medium">AI 윤리와 인간의 존엄성</Typo.SM>
                                </HStack>
                                <Sparkles size={16} color="#3D7BFF" />
                            </HStack>
                        </div>
                    </VStack>

                    {/* Feature Highlights
                    <VStack fullWidth className={s.featureList}>
                        <Typo.LG color="primary" fontWeight="bold" style={{ marginBottom: '16px' }}>Premium만의 혜택</Typo.LG>
                        {features.map((item, index) => (
                            <HStack key={index} fullWidth gap={16} align="start" className={s.featureItem}>
                                <div style={{ minWidth: '24px' }}>{item.icon}</div>
                                <VStack align="start" gap={4}>
                                    <Typo.MD color="primary" fontWeight="bold">{item.title}</Typo.MD>
                                    <Typo.SM color="secondary" fontWeight="medium">{item.desc}</Typo.SM>
                                </VStack>
                            </HStack>
                        ))}
                    </VStack> */}

                    {/* Comparison Table */}
                    <VStack fullWidth className={s.comparisonTable}>
                        <Typo.LG color="primary" fontWeight="bold" style={{ marginBottom: '16px' }}>요금제 비교</Typo.LG>

                        <HStack fullWidth justify="between" style={{ paddingBottom: '12px', borderBottom: '2px solid #F3F3F7' }}>
                            <Typo.SM color="secondary" fontWeight="bold" style={{ width: '40%' }}>기능</Typo.SM>
                            <Typo.SM color="secondary" fontWeight="bold" style={{ width: '25%', textAlign: 'center' }}>Free</Typo.SM>
                            <Typo.SM color="brand" fontWeight="bold" style={{ width: '25%', textAlign: 'center' }}>Premium</Typo.SM>
                        </HStack>

                        {comparison.map((item, index) => (
                            <div key={index} className={s.tableRow}>
                                <Typo.SM color="primary" fontWeight="medium" style={{ width: '40%' }}>{item.feature}</Typo.SM>
                                <div style={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
                                    {item.free === "O" ? (
                                        <Check size={18} className={s.checkIcon} />
                                    ) : item.free === "—" ? (
                                        <X size={18} className={s.xIcon} />
                                    ) : (
                                        <Typo.XS color="secondary" fontWeight="medium">{item.free}</Typo.XS>
                                    )}
                                </div>
                                <div style={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
                                    {item.premium === "O" ? (
                                        <Check size={18} className={s.checkIcon} />
                                    ) : (
                                        <Typo.XS color="brand" fontWeight="bold">{item.premium}</Typo.XS>
                                    )}
                                </div>
                            </div>
                        ))}
                    </VStack>

                    {/* Bottom CTA */}
                    <Button className={s.ctaButtonBottom} onClick={() => window.alert('준비중입니다.')}>
                        <Typo.MD color="inverted" fontWeight="bold">Premium 시작하기 — 월 5,900원</Typo.MD>
                    </Button>
                </VStack>
            </div>
        </div>
    )
}
