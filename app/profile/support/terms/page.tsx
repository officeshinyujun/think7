'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "../style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";

const TERMS_SECTIONS = [
    {
        title: "제1조 (목적)",
        content: "이 약관은 Think7(이하 '서비스')이 제공하는 비판적 사고력 훈련 서비스의 이용조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다."
    },
    {
        title: "제2조 (정의)",
        content: "① '서비스'란 Think7이 제공하는 AI 기반 비판적 사고력 훈련 및 분석 서비스를 의미합니다.\n② '이용자'란 이 약관에 따라 서비스를 이용하는 자를 의미합니다.\n③ '콘텐츠'란 서비스에서 제공하는 글, 문제, 분석 리포트 등의 자료를 의미합니다."
    },
    {
        title: "제3조 (약관의 효력 및 변경)",
        content: "① 이 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생합니다.\n② 회사는 합리적인 사유가 있는 경우 관련 법령에 위배되지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 최소 7일 전에 공지합니다."
    },
    {
        title: "제4조 (서비스의 제공)",
        content: "① 회사는 다음의 서비스를 제공합니다.\n  1. AI 기반 비판적 사고력 평가 및 분석\n  2. 맞춤형 학습 콘텐츠 제공\n  3. 사고 유형 진단 및 성장 추적\n  4. 기타 회사가 정하는 서비스\n② 서비스의 내용은 회사의 사정에 따라 변경될 수 있습니다."
    },
    {
        title: "제5조 (이용자의 의무)",
        content: "① 이용자는 서비스 이용 시 다음 행위를 해서는 안 됩니다.\n  1. 타인의 정보를 도용하는 행위\n  2. 서비스의 운영을 방해하는 행위\n  3. 서비스를 통해 얻은 정보를 무단으로 복제, 배포하는 행위\n  4. 기타 법령에 위반되는 행위"
    },
    {
        title: "제6조 (유료 서비스)",
        content: "① Premium 플랜은 월정액 구독 방식으로 제공됩니다.\n② 결제는 등록된 결제수단을 통해 자동 갱신되며, 이용자는 언제든지 구독을 해지할 수 있습니다.\n③ 환불 정책은 관련 법령 및 회사 정책에 따릅니다."
    },
    {
        title: "제7조 (개인정보보호)",
        content: "회사는 이용자의 개인정보를 「개인정보 보호법」 등 관련 법령에 따라 보호하며, 개인정보의 수집·이용·제공에 관한 사항은 별도의 개인정보 처리방침에 따릅니다."
    },
    {
        title: "제8조 (면책사항)",
        content: "① AI 분석 결과는 참고용으로 제공되며, 절대적인 평가 기준이 아닙니다.\n② 회사는 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임지지 않습니다."
    },
    {
        title: "부칙",
        content: "이 약관은 2026년 3월 1일부터 시행합니다."
    }
];

export default function Terms() {
    const router = useRouter();

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={16} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                        <ChevronLeft size={24} color="var(--text-primary)" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                        <Typo.LG color="primary" fontWeight="bold">이용약관</Typo.LG>
                    </HStack>

                    <VStack fullWidth gap={20}>
                        {TERMS_SECTIONS.map((section, index) => (
                            <VStack key={index} fullWidth gap={8}>
                                <Typo.MD color="primary" fontWeight="bold">{section.title}</Typo.MD>
                                <Typo.SM color="secondary" fontWeight="regular" style={{ lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                                    {section.content}
                                </Typo.SM>
                            </VStack>
                        ))}
                    </VStack>
                </VStack>
            </div>
        </div>
    )
}
