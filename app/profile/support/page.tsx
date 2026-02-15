'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft, ChevronRight, MessageCircleQuestion, Mail, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";

export default function Support() {
    const router = useRouter();

    const menuItems = [
        { icon: <MessageCircleQuestion size={20} color="#484848"/>, title: "자주 묻는 질문 (FAQ)", link: "#" },
        { icon: <Mail size={20} color="#484848"/>, title: "문의하기", link: "mailto:support@think7.com" },
        { icon: <Ticket size={20} color="#484848"/>, title: "버그 신고", link: "#" },
    ]

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={16} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                        <ChevronLeft size={24} color="#111111" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                        <Typo.LG color="primary" fontWeight="bold">도움말 및 지원</Typo.LG>
                    </HStack>

                    <VStack fullWidth gap={12}>
                        {menuItems.map((item, index) => (
                            <div key={index} className={s.item}>
                                <HStack gap={12} align="center">
                                    {item.icon}
                                    <Typo.MD color="primary" fontWeight="medium">{item.title}</Typo.MD>
                                </HStack>
                                <ChevronRight size={20} color="#8B847F" />
                            </div>
                        ))}
                    </VStack>
                </VStack>
            </div>
        </div>
    )
}
