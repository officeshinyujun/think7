'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ToggleItem = ({ title, description, initialState = false }: { title: string, description: string, initialState?: boolean }) => {
    const [isOn, setIsOn] = useState(initialState);
    return (
        <div className={s.item}>
            <VStack align="start" gap={4}>
                <Typo.MD color="primary" fontWeight="bold">{title}</Typo.MD>
                <Typo.XS color="secondary" fontWeight="medium">{description}</Typo.XS>
            </VStack>
            <div className={`${s.toggle} ${isOn ? s.active : ''}`} onClick={() => setIsOn(!isOn)}>
                <div className={s.knob} />
            </div>
        </div>
    )
}

export default function NotificationSettings() {
    const router = useRouter();

    return (
        <VStack fullWidth align="start" justify="start" gap={16} className={s.container}>
            <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                <ChevronLeft size={24} color="#111111" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                <Typo.LG color="primary" fontWeight="bold">알림 설정</Typo.LG>
            </HStack>

            <VStack fullWidth gap={12}>
                <ToggleItem 
                    title="매일 알림" 
                    description="매일 새로운 콘텐츠가 업로드되면 알려줍니다." 
                    initialState={true}
                />
                <ToggleItem 
                    title="리마인드 알림" 
                    description="학습 목표 달성을 위해 리마인드합니다." 
                    initialState={true}
                />
                <ToggleItem 
                    title="마케팅 알림" 
                    description="새로운 소식과 혜택 정보를 받습니다." 
                    initialState={false}
                />
            </VStack>
        </VStack>
    )
}
