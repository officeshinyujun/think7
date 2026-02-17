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

    return (
        <div className={s.container}>
            <Sidebar />
            
            <div className={s.desktopContent}>
                <div className={s.contentWrapper}>
                    <div className="mobileOnly">
                        <Header/>
                    </div>
                
                    <VStack fullWidth gap={8}>
                        <Typo.XL
                            color="primary"
                            fontWeight="bold"
                        >
                            {report.day}의 사고 점수는 <span style={{color:"#3D7BFF"}}>{report.summary?.score}</span>점입니다.
                        </Typo.XL>
                        <Typo.MD
                            color="primary"
                            fontWeight="medium"
                        >
                            {report.summary?.comment}
                        </Typo.MD>
                    </VStack>

                    <Section title="영역별 분석">
                        <VStack fullWidth gap={16}>
                            {report.dimension_scores?.map((item: any, index: number) => (
                                <VStack key={index} fullWidth gap={6}>
                                    <HStack fullWidth justify="between" align="center">
                                        <Typo.SM color="primary" fontWeight="semi-bold">{item.dimension}</Typo.SM>
                                        <HStack gap={6} align="center">
                                            <div className={s.statusBadge}>
                                                <Typo.XS color="brand" fontWeight="medium">{item.status}</Typo.XS>
                                            </div>
                                            <Typo.SM color="brand" fontWeight="bold">{item.score}점</Typo.SM>
                                        </HStack>
                                    </HStack>
                                    <div className={s.progressBarBackground}>
                                        <div className={s.progressBarFill} style={{width: `${item.score}%`}} />
                                    </div>
                                    <Typo.XS color="secondary" fontWeight="regular">{item.comment}</Typo.XS>
                                </VStack>
                            ))}
                        </VStack>
                    </Section>
                    
                    <Section title="오답 분석">
                        <VStack fullWidth gap={24}>
                            {report.wrong_answer?.map((item: any, index: number) => (
                                <VStack key={index} fullWidth gap={12}>
                                    <VStack fullWidth gap={4}>
                                        <HStack gap={4} align="center">
                                            <Typo.MD color="primary" fontWeight="bold">Q{item.number}. {item.question}</Typo.MD>
                                        </HStack>
                                    </VStack>
                                    
                                    <VStack fullWidth className={s.wrongBox} gap={12}>
                                        <VStack fullWidth gap={4}>
                                            <Typo.XS color="secondary">내가 고른 답</Typo.XS>
                                            <Typo.SM color="wrong" fontWeight="medium" style={{textDecoration: 'line-through'}}>{item.wrong_answer}</Typo.SM>
                                        </VStack>
                                        <VStack fullWidth gap={4}>
                                            <Typo.XS color="secondary">정답</Typo.XS>
                                            <Typo.SM color="brand" fontWeight="bold">{item.correct_answer}</Typo.SM>
                                        </VStack>
                                    </VStack>

                                    <VStack fullWidth className={s.explanationBox} gap={8}>
                                        <Typo.XS color="secondary">관련 지문</Typo.XS>
                                        <Typo.SM color="primary" fontWeight="medium" style={{backgroundColor: 'rgba(61, 123, 255, 0.1)', padding: '8px', borderRadius: '8px'}}>
                                            "{item.relevant_part}"
                                        </Typo.SM>
                                        <div style={{height: '4px'}} />
                                        <Typo.XS color="secondary">해설</Typo.XS>
                                        <Typo.SM color="primary" fontWeight="regular">{item.explanation}</Typo.SM>
                                    </VStack>
                                </VStack>
                            ))}
                        </VStack>
                    </Section>

                    <Section title="사고 유형 진단">
                        <VStack fullWidth gap={12}>
                            <VStack fullWidth gap={4}>
                                <Typo.LG color="brand" fontWeight="bold">{report.thinking_type?.type}</Typo.LG>
                                <Typo.SM color="primary" fontWeight="medium">{report.thinking_type?.description}</Typo.SM>
                            </VStack>
                            <HStack fullWidth gap={12}>
                                <VStack className={s.typeBox} align="start" justify="center" gap={4}>
                                    <Typo.XS color="secondary">강점</Typo.XS>
                                    <Typo.SM color="primary" fontWeight="bold">{report.thinking_type?.strength}</Typo.SM>
                                </VStack>
                                <VStack className={s.typeBox} align="start" justify="center" gap={4}>
                                    <Typo.XS color="secondary">약점</Typo.XS>
                                    <Typo.SM color="primary" fontWeight="bold">{report.thinking_type?.weakness}</Typo.SM>
                                </VStack>
                            </HStack>
                        </VStack>
                    </Section>

                    <Section title="간단 성장 피드백">
                        <VStack fullWidth gap={12}>
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
                                    <Typo.XS color="brand" fontWeight="bold">+{ (report.growth?.current_score || 0) - (report.growth?.previous_average_score || 0)} 상승</Typo.XS>
                                </div>
                            </HStack>
                            <Typo.SM color="primary" fontWeight="medium">{report.growth?.comment}</Typo.SM>
                        </VStack>
                    </Section>
                    <Button className={s.nextButton} onClick={() => router.push('/report')}>
                        <Typo.MD color="inverted" fontWeight="bold">돌아가기</Typo.MD>
                    </Button>
                </div>
            </div>
        </div>
    )
}
