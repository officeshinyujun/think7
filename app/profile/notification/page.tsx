'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/general/Sidebar";

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
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={16} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                        <ChevronLeft size={24} color="#111111" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                        <Typo.LG color="primary" fontWeight="bold">알림 설정</Typo.LG>
                    </HStack>

                    <VStack fullWidth gap={12}>
                        <ToggleItem 
                            title="매일 이메일 알림" 
                            description="매일 새로운 콘텐츠가 업로드되면 이메일로 알려줍니다." 
                            initialState={true}
                        />

                        {/* Remind Notification with Time Picker */}
                        <div className={s.item} style={{flexDirection: 'column', alignItems: 'flex-start', gap: '12px'}}>
                             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <VStack align="start" gap={4}>
                                    <Typo.MD color="primary" fontWeight="bold">리마인드 이메일 알림</Typo.MD>
                                    <Typo.XS color="secondary" fontWeight="medium">학습 목표 달성을 위해 이메일로 리마인드합니다.</Typo.XS>
                                </VStack>
                                <div className={`${s.toggle} ${true ? s.active : ''}`}>
                                    <div className={s.knob} />
                                </div>
                            </div>
                            <div style={{width: '100%', paddingTop: '12px', borderTop: '1px solid #F3F3F7'}}>
                                <input type="time" defaultValue="09:00" style={{
                                    padding: '8px 12px', 
                                    borderRadius: '8px', 
                                    border: '1px solid #E0E0E0',
                                    fontFamily: 'inherit',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }} />
                            </div>
                        </div>

                        <ToggleItem 
                            title="마케팅 이메일 알림" 
                            description="새로운 소식과 혜택 정보를 이메일로 받습니다." 
                            initialState={false}
                        />
                    </VStack>
                </VStack>
            </div>
        </div>
    )
}
