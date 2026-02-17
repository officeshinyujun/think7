'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronRight, ClipboardCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReportData {
    id: string;
    date: string;
    topic: string;
    score: number;
    feedback: string;
}

interface Props {
    report?: ReportData | null;
}

export default function ReportPreview({ report }: Props) {
    const router = useRouter();

    if (!report) return null; // Or return empty state

    return (
        <VStack fullWidth align="start" justify="start" className={s.container} onClick={() => router.push(`/report/${report.id}`)}>
            <HStack fullWidth justify="between" align="center" className={s.header}>
                <HStack gap={8} align="center">
                    <ClipboardCheck size={20} color="#3D7BFF" />
                    <Typo.MD color="primary" fontWeight="bold">최근 리포트</Typo.MD>
                </HStack>
                <ChevronRight size={20} color="#8B847F" />
            </HStack>

            <HStack fullWidth gap={16} align="center">
                <div className={s.scoreContainer}>
                    <Typo.XL color="brand" fontWeight="bold">{report.score}</Typo.XL>
                </div>
                <VStack align="start" gap={4} style={{flex: 1}}>
                    <Typo.XS color="secondary" fontWeight="medium">{report.date}</Typo.XS>
                    <Typo.MD color="primary" fontWeight="bold">{report.topic}</Typo.MD>
                </VStack>
            </HStack>

            <div className={s.feedback}>
                 <Typo.SM color="secondary" fontWeight="medium" style={{lineHeight: '1.4'}}>
                    "{report.feedback}"
                 </Typo.SM>
            </div>
        </VStack>
    )
}
