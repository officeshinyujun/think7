'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronRight, ClipboardCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReportPreview() {
    const router = useRouter();

    // Dummy data for the latest report
    const latestReport = {
        id: "1",
        date: "2024.10.24",
        topic: "AI와 인간의 공존",
        score: 78,
        feedback: "핵심 논지는 잘 파악했으나, 반론에 대한 고려가 조금 부족합니다."
    };

    return (
        <VStack fullWidth align="start" justify="start" className={s.container} onClick={() => router.push(`/report/${latestReport.id}`)}>
            <HStack fullWidth justify="between" align="center" className={s.header}>
                <HStack gap={8} align="center">
                    <ClipboardCheck size={20} color="#3D7BFF" />
                    <Typo.MD color="primary" fontWeight="bold">최근 리포트</Typo.MD>
                </HStack>
                <ChevronRight size={20} color="#8B847F" />
            </HStack>

            <HStack fullWidth gap={16} align="center">
                <div className={s.scoreContainer}>
                    <Typo.XL color="brand" fontWeight="bold">{latestReport.score}</Typo.XL>
                </div>
                <VStack align="start" gap={4} style={{flex: 1}}>
                    <Typo.XS color="secondary" fontWeight="medium">{latestReport.date}</Typo.XS>
                    <Typo.MD color="primary" fontWeight="bold">{latestReport.topic}</Typo.MD>
                </VStack>
            </HStack>

            <div className={s.feedback}>
                 <Typo.SM color="secondary" fontWeight="medium" style={{lineHeight: '1.4'}}>
                    "{latestReport.feedback}"
                 </Typo.SM>
            </div>
        </VStack>
    )
}
