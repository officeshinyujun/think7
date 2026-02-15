'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft, Check, X, Zap, TrendingUp, BrainCircuit } from "lucide-react";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";

export default function PlanDetails() {
    const router = useRouter();

    const features = [
        { icon: <Zap size={24} color="#3D7BFF"/>, title: "상세 분석 리포트", desc: "단순 점수를 넘어선 논리적 강약점 분석" },
        { icon: <BrainCircuit size={24} color="#3D7BFF"/>, title: "사고 유형 정밀 진단", desc: "나의 사고 패턴과 편향성 파악" },
        { icon: <TrendingUp size={24} color="#3D7BFF"/>, title: "성장 그래프", desc: "일간/주간 사고력 변화 추이 추적" },
    ];

    const comparison = [
        { feature: "하루 1개 문제", free: true, plus: true },
        { feature: "Think Score", free: true, plus: true },
        { feature: "상세 분석 리포트", free: false, plus: true },
        { feature: "사고 유형 분석", free: false, plus: true },
        { feature: "성장 그래프", free: false, plus: true },
        { feature: "주간/월간 리포트", free: false, plus: true },
    ];

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={24} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                        <ChevronLeft size={24} color="#111111" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                        <Typo.LG color="primary" fontWeight="bold">요금제 상세</Typo.LG>
                    </HStack>

                    {/* Hero Section */}
                    <VStack fullWidth align="center" gap={12} className={s.heroSection}>
                        <Typo.SM color="brand" fontWeight="bold">THINK7 PLUS</Typo.SM>
                        <Typo.XXL color="primary" fontWeight="bold" style={{lineHeight: '1.3'}}>
                            사고력의 깊이가<br/>달라지는 시작
                        </Typo.XXL>
                        <Typo.MD color="secondary" fontWeight="medium">
                            내 사고 과정을 투명하게 들여다보고<br/>
                            진짜 성장을 경험하세요.
                        </Typo.MD>
                    </VStack>

                    {/* Pricing Card */}
                    <VStack fullWidth className={s.pricingCard}>
                        <Typo.MD color="inverted" fontWeight="bold" style={{opacity: 0.9}}>Plus Plan</Typo.MD>
                        <div className={s.priceTag}>
                            월 5,900원
                        </div>
                        <Typo.SM color="inverted" fontWeight="medium" style={{opacity: 0.8}}>
                            커피 한 잔 값으로 시작하는<br/>매일의 사고력 훈련
                        </Typo.SM>
                        <Button className={s.ctaButton}>
                            <Typo.MD color="brand" fontWeight="bold">지금 시작하기</Typo.MD>
                        </Button>
                    </VStack>

                    {/* Feature Highlights */}
                    <VStack fullWidth className={s.featureList}>
                        <Typo.LG color="primary" fontWeight="bold" style={{marginBottom: '16px'}}>Plus만의 혜택</Typo.LG>
                        {features.map((item, index) => (
                            <HStack key={index} fullWidth gap={16} align="start" className={s.featureItem}>
                                <div style={{minWidth: '24px'}}>{item.icon}</div>
                                <VStack align="start" gap={4}>
                                    <Typo.MD color="primary" fontWeight="bold">{item.title}</Typo.MD>
                                    <Typo.SM color="secondary" fontWeight="medium">{item.desc}</Typo.SM>
                                </VStack>
                            </HStack>
                        ))}
                    </VStack>

                    {/* Comparison Table */}
                    <VStack fullWidth className={s.comparisonTable}>
                        <Typo.LG color="primary" fontWeight="bold" style={{marginBottom: '16px'}}>요금제 비교</Typo.LG>
                        
                        <HStack fullWidth justify="between" style={{paddingBottom: '12px', borderBottom: '2px solid #F3F3F7'}}>
                            <Typo.SM color="secondary" fontWeight="bold" style={{width: '40%'}}>기능</Typo.SM>
                            <Typo.SM color="secondary" fontWeight="bold" style={{width: '20%', textAlign: 'center'}}>Free</Typo.SM>
                            <Typo.SM color="brand" fontWeight="bold" style={{width: '20%', textAlign: 'center'}}>Plus</Typo.SM>
                        </HStack>

                        {comparison.map((item, index) => (
                            <div key={index} className={s.tableRow}>
                                <Typo.SM color="primary" fontWeight="medium" style={{width: '40%'}}>{item.feature}</Typo.SM>
                                <div style={{width: '20%', display: 'flex', justifyContent: 'center'}}>
                                    {item.free ? <Check size={20} className={s.checkIcon}/> : <X size={20} className={s.xIcon}/>}
                                </div>
                                <div style={{width: '20%', display: 'flex', justifyContent: 'center'}}>
                                    {item.plus ? <Check size={20} className={s.checkIcon}/> : <X size={20} className={s.xIcon}/>}
                                </div>
                            </div>
                        ))}
                    </VStack>
                </VStack>
            </div>
        </div>
    )
}
