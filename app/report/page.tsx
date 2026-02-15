'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import BottomBar from "@/components/general/BottomBar";
import Header from "@/components/general/Header";
import Section from "@/components/record/Section";
import { useRouter } from "next/navigation";

const dummyData = [
    {
        day : "2026년 1월 3일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2026년 1월 2일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2026년 1월 1일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2025년 12월 31일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2025년 12월 31일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2025년 12월 31일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2025년 12월 31일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2025년 12월 31일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2025년 12월 31일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
    {
        day : "2025년 12월 31일",
        comment : "ㄹㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ"
    },
]

export default function Report() {
    const router = useRouter();

    return (
        <VStack className={s.container} align="start" justify="start" gap={16}>
            <Header/>
            {dummyData.map((item, index) => (
                <div key={index} style={{width: '100%', cursor: 'pointer'}} onClick={() => router.push(`/report/${index}`)}>
                    <Section title={item.day}>
                        <Typo.MD color="primary" fontWeight="semi-bold">{item.comment}</Typo.MD>
                    </Section>
                </div>
            ))}
            <BottomBar/>
        </VStack>
    )
}