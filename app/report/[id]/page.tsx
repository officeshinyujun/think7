'use client'

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import Header from "@/components/general/Header";
import Section from "@/components/record/Section";
import { HStack } from "@/components/general/HStack";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";
import { Lock } from "lucide-react";
import { https } from "@/services/https";
import { useEffect, useState, use } from "react";


export default function ReportDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [report, setReport] = useState<any>(null);

    useEffect(() => {
        if (id) {
            https.report.get(id)
                .then(res => setReport(res))
                .catch(err => console.error(err));
        }
    }, [id]);

    if (!report) return <div>Loading...</div>;

    const PremiumLockOverlay = () => (
        <VStack align="start" justify="start" gap={12} className={s.lockOverlay}>
            <Typo.MD color="primary" fontWeight="bold">Premium 리포트에서만 확인 가능합니다</Typo.MD>
            <Button
                className={s.nextButton}
                style={{ width: 'auto', padding: '8px 16px', height: 'auto', marginTop: '12px' }}
                onClick={() => router.push('/profile/plan')}
            >
                <Typo.SM color="inverted" fontWeight="bold">업그레이드 하러가기</Typo.SM>
            </Button>
        </VStack>
    );

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <div className={s.contentWrapper}>
                    <div className="mobileOnly">
                        <Header />
                    </div>

                    <VStack fullWidth gap={8}>
                        <Typo.XL
                            color="primary"
                            fontWeight="bold"
                        >
                            {report.day}의 사고 점수는 <span className={s.scoreHighlight}>{report.summary?.score}</span>점입니다.
                        </Typo.XL>
                        <Typo.MD
                            color="secondary"
                            fontWeight="medium"
                        >
                            {report.summary?.comment}
                        </Typo.MD>
                    </VStack>

                    <Section title="영역별 분석">
                        <VStack fullWidth gap={16}>
                            {report.dimension_scores?.map((item: any, index: number) => (
                                <VStack key={index} fullWidth gap={8} className={s.dimensionCard}>
                                    <HStack fullWidth justify="between" align="center">
                                        <Typo.SM color="primary" fontWeight="semi-bold">{item.dimension}</Typo.SM>
                                        <HStack gap={8} align="center">
                                            <div className={s.statusBadge}>
                                                <Typo.XS color="brand" fontWeight="medium">{item.status}</Typo.XS>
                                            </div>
                                            <Typo.SM color="brand" fontWeight="bold">{item.score}점</Typo.SM>
                                        </HStack>
                                    </HStack>
                                    <div className={s.progressBarBackground}>
                                        <div className={s.progressBarFill} style={{ width: `${item.score}%` }} />
                                    </div>
                                    <Typo.XS color="secondary" fontWeight="regular">{item.comment}</Typo.XS>
                                </VStack>
                            ))}
                        </VStack>
                    </Section>

                    <Section title="오답 분석">
                        <VStack fullWidth gap={24}>
                            {report.wrong_answer?.map((item: any, index: number) => (
                                <VStack key={index} fullWidth gap={16} className={s.wrongAnswerCard}>
                                    <HStack gap={8} align="center">
                                        <div className={s.questionNumber}>Q{item.number}</div>
                                        <Typo.MD color="primary" fontWeight="bold">{item.question}</Typo.MD>
                                    </HStack>

                                    <div className={s.answerGrid}>
                                        <VStack className={s.answerItemWrong} gap={4}>
                                            <Typo.XS color="secondary">내가 고른 답</Typo.XS>
                                            <Typo.SM color="wrong" fontWeight="medium" style={{ textDecoration: 'line-through' }}>{item.wrong_answer}</Typo.SM>
                                        </VStack>
                                        <VStack className={s.answerItemCorrect} gap={4}>
                                            <Typo.XS color="secondary">정답</Typo.XS>
                                            <Typo.SM color="brand" fontWeight="bold">{item.correct_answer}</Typo.SM>
                                        </VStack>
                                    </div>

                                    {item.taxonomy && item.taxonomy.some((tax: any) => tax.occurred) && (
                                        <VStack fullWidth gap={8}>
                                            <Typo.XS color="secondary" fontWeight="semi-bold">오류 유형 분석</Typo.XS>
                                            <VStack fullWidth gap={8} className={s.taxonomyBox}>
                                                {item.taxonomy.map((tax: any, tIndex: number) => (
                                                    tax.occurred && (
                                                        <div key={tIndex} className={s.taxonomyItem}>
                                                            <div className={s.taxonomyDot} />
                                                            <VStack gap={2}>
                                                                <Typo.SM color="wrong" fontWeight="bold">{tax.category}</Typo.SM>
                                                            </VStack>
                                                        </div>
                                                    )
                                                ))}
                                            </VStack>
                                        </VStack>
                                    )}

                                    <Button 
                                        className={s.coachBtn} 
                                        style={{ marginTop: '8px' }}
                                        onClick={() => router.push(`/review/${id}?qid=${item.number}`)}
                                    >
                                        <Typo.SM color="brand" fontWeight="bold">왜 틀렸는지 살펴보기 →</Typo.SM>
                                    </Button>
                                </VStack>
                            ))}
                        </VStack>
                    </Section>

                    <Section title="사고 유형 진단">
                        <div className={report.thinking_type?.type === "LOCKED" ? s.lockedSection : ""}>
                            <VStack fullWidth gap={12} className={report.thinking_type?.type === "LOCKED" ? s.blurContent : ""}>
                                <VStack fullWidth gap={4} >
                                    <Typo.LG color="brand" fontWeight="bold">{report.thinking_type?.type === "LOCKED" ? "논리적 전략가형" : report.thinking_type?.type}</Typo.LG>
                                    <Typo.SM color="primary" fontWeight="medium">{report.thinking_type?.type === "LOCKED" ? "분석된 사고 유형 설명이 여기에 표시됩니다." : report.thinking_type?.description}</Typo.SM>
                                </VStack>
                                <div className={s.typeGrid}>
                                    <VStack className={s.typeBox} align="start" justify="center" gap={4}>
                                        <Typo.XS color="secondary">강점</Typo.XS>
                                        <Typo.SM color="primary" fontWeight="medium">{report.thinking_type?.type === "LOCKED" ? "분석된 강점" : report.thinking_type?.strength}</Typo.SM>
                                    </VStack>
                                    <VStack className={s.typeBox} align="start" justify="center" gap={4}>
                                        <Typo.XS color="secondary">약점</Typo.XS>
                                        <Typo.SM color="primary" fontWeight="medium">{report.thinking_type?.type === "LOCKED" ? "분석된 약점" : report.thinking_type?.weakness}</Typo.SM>
                                    </VStack>
                                </div>
                            </VStack>
                            {report.thinking_type?.type === "LOCKED" && <PremiumLockOverlay />}
                        </div>
                    </Section>

                    <Section title="간단 성장 피드백">
                        <div className={report.growth?.trend === "LOCKED" ? s.lockedSection : ""}>
                            <VStack fullWidth gap={12} className={report.growth?.trend === "LOCKED" ? s.blurContent : ""}>
                                <HStack fullWidth justify="between" align="center" className={s.growthBox}>
                                    <VStack align="center" justify="center" gap={4}>
                                        <Typo.XS color="secondary">이전 평균</Typo.XS>
                                        <Typo.MD color="primary" fontWeight="semi-bold">{report.growth?.previous_average_score || 0}점</Typo.MD>
                                    </VStack>
                                    <Typo.MD color="secondary">→</Typo.MD>
                                    <VStack align="center" justify="center" gap={4}>
                                        <Typo.XS color="secondary">이번 점수</Typo.XS>
                                        <Typo.MD color="brand" fontWeight="bold">{report.growth?.current_score || 0}점</Typo.MD>
                                    </VStack>
                                    <div className={s.trendBadge}>
                                        <Typo.XS color="brand" fontWeight="bold">+{(report.growth?.current_score || 0) - (report.growth?.previous_average_score || 0)} 상승</Typo.XS>
                                    </div>
                                </HStack>
                                <Typo.SM color="primary" fontWeight="medium">{report.growth?.trend === "LOCKED" ? "분석된 성장 피드백이 여기에 표시됩니다." : report.growth?.comment}</Typo.SM>
                            </VStack>
                            {report.growth?.trend === "LOCKED" && <PremiumLockOverlay />}
                        </div>
                    </Section>
                    <Button className={s.nextButton} onClick={() => router.push('/report')}>
                        <Typo.MD color="inverted" fontWeight="bold">돌아가기</Typo.MD>
                    </Button>
                </div>
            </div>
        </div>
    )
}
