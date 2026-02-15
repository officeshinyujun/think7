'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import BottomBar from "@/components/general/BottomBar";
import Header from "@/components/general/Header";
import Section from "@/components/record/Section";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";

const dummyData = [
    {
        day : "2026년 1월 3일",
        comment : "핵심 논지는 잘 파악했으나, 반론에 대한 고려가 조금 부족합니다."
    },
    {
        day : "2026년 1월 2일",
        comment : "어휘력이 돋보이는 글쓰기였습니다."
    },
    {
        day : "2026년 1월 1일",
        comment : "논리적인 흐름이 매우 좋습니다."
    },
    {
        day : "2025년 12월 31일",
        comment : "창의적인 접근이 인상적입니다."
    },
]

export default function Report() {
    const router = useRouter();

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <div className={s.mobileHeader}>
                    <Header/>
                </div>

                <div className={s.gridContainer}>
                    <div className={s.reportListWrapper}>
                        {dummyData.map((item, index) => (
                            <div key={index} style={{width: '100%', cursor: 'pointer'}} onClick={() => router.push(`/report/${index}`)}>
                                <Section title={item.day}>
                                    <Typo.MD color="primary" fontWeight="semi-bold">{item.comment}</Typo.MD>
                                </Section>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={s.mobileBottomBar}>
                    <BottomBar/>
                </div>
            </div>
        </div>
    )
}