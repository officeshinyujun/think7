'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "../style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";

const FAQ_LIST = [
    {
        question: "Think7은 어떤 서비스인가요?",
        answer: "Think7은 AI 기반 비판적 사고력 훈련 플랫폼입니다. 다양한 주제의 글을 읽고 질문에 답하면, AI가 사고 과정을 분석하여 맞춤형 피드백을 제공합니다."
    },
    {
        question: "Think Score는 어떻게 산출되나요?",
        answer: "Think Score는 핵심 주장 파악, 논리적 추론, 비판적 사고, 편향 탐지 4가지 영역의 점수를 종합하여 산출됩니다. 각 영역은 AI가 답변의 정확성, 논리성, 깊이를 분석하여 평가합니다."
    },
    {
        question: "Premium과 Free의 차이는 무엇인가요?",
        answer: "Free 플랜에서는 오늘의 문제, 하루 2개의 라이브러리 풀이, Think Score와 영역별 점수를 제공합니다. Premium 플랜에서는 무제한 문제 풀이, 프리미엄 콘텐츠, 상세 피드백, 사고 유형 분석, 성장 분석, 무제한 리포트 히스토리, 개인 맞춤 추천을 추가로 이용할 수 있습니다."
    },
    {
        question: "사고 유형 분석이란 무엇인가요?",
        answer: "사고 유형 분석은 Premium 기능으로, 답변 패턴을 분석하여 '논리적 전략가형', '창의적 탐구자형' 등 사용자의 사고 유형을 진단합니다. 각 유형에 맞는 강점과 보완할 점도 함께 제공됩니다."
    },
    {
        question: "하루에 몇 개의 문제를 풀 수 있나요?",
        answer: "Free 플랜은 오늘의 문제 1개와 라이브러리에서 하루 2개까지 풀어볼 수 있습니다. Premium 플랜은 모든 콘텐츠를 무제한으로 이용할 수 있습니다."
    },
    {
        question: "리포트는 얼마나 보관되나요?",
        answer: "Free 플랜은 최근 7일간의 리포트만 조회할 수 있습니다. Premium 플랜은 모든 리포트를 무제한으로 보관하고 조회할 수 있습니다."
    },
    {
        question: "계정을 삭제하면 데이터는 어떻게 되나요?",
        answer: "계정 삭제 시 모든 리포트 기록, 풀이 내역 등 개인 데이터가 영구적으로 삭제되며 복구할 수 없습니다. 프로필 > 계정 설정에서 삭제할 수 있습니다."
    },
];

export default function FAQ() {
    const router = useRouter();

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={16} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                        <ChevronLeft size={24} color="#111111" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                        <Typo.LG color="primary" fontWeight="bold">자주 묻는 질문</Typo.LG>
                    </HStack>

                    <VStack fullWidth gap={8}>
                        {FAQ_LIST.map((faq, index) => (
                            <div
                                key={index}
                                className={s.item}
                                style={{ flexDirection: 'column', alignItems: 'flex-start', cursor: 'default' }}
                            >
                                <Typo.MD color="primary" fontWeight="medium">{faq.question}</Typo.MD>
                                <Typo.SM color="secondary" fontWeight="regular" style={{ marginTop: '8px', lineHeight: '1.6' }}>
                                    {faq.answer}
                                </Typo.SM>
                            </div>
                        ))}
                    </VStack>
                </VStack>
            </div>
        </div>
    )
}
