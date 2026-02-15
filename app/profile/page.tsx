'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import Header from "@/components/general/Header";
import BottomBar from "@/components/general/BottomBar";
import { HStack } from "@/components/general/HStack";
import { User, ChevronRight, Settings, Bell, CircleHelp, LogOut } from "lucide-react";
import Button from "@/components/general/Button";
import Sidebar from "@/components/general/Sidebar";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <div className={s.mobileHeader}>
                    <Header/>
                </div>
                
                {/* User Info */}
                <HStack fullWidth align="center" gap={16} className={s.profileCard}>
                    <div className={s.avatar}>
                        <User size={32} color="#8B847F" />
                    </div>
                    <VStack align="start" gap={4} style={{flex: 1}}>
                        <Typo.LG color="primary" fontWeight="bold">김민준</Typo.LG>
                        <Typo.SM color="secondary" fontWeight="medium">kimmj@example.com</Typo.SM>
                    </VStack>
                </HStack>

                {/* Subscription */}
                <VStack fullWidth align="start" gap={12} className={s.subscriptionCard}>
                    <HStack fullWidth justify="between" align="center">
                        <Typo.MD color="inverted" fontWeight="bold">Free Plan</Typo.MD>
                        <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px'}}>
                            <Typo.XS color="inverted" fontWeight="bold">현재 이용중</Typo.XS>
                        </div>
                    </HStack>
                    <Typo.SM color="inverted" fontWeight="medium" style={{opacity: 0.9}}>
                        프리미엄으로 업그레이드하고<br/>
                        더 상세한 분석 리포트를 받아보세요.
                    </Typo.SM>
                    <Button style={{width: '100%', backgroundColor: 'white', padding: '12px', borderRadius: '12px', marginTop: '8px'}} onClick={() => router.push('/profile/plan')}>
                        <Typo.SM color="brand" fontWeight="bold">업그레이드 하기</Typo.SM>
                    </Button>
                </VStack>

                {/* Settings Menu */}
                <VStack fullWidth gap={12}>
                    <Typo.SM color="secondary" fontWeight="bold" style={{paddingLeft: '4px'}}>설정</Typo.SM>
                    
                    <HStack fullWidth justify="between" align="center" className={s.menuItem} onClick={() => router.push('/profile/account')}>
                        <HStack gap={12} align="center">
                            <User size={20} color="#484848" />
                            <Typo.MD color="primary" fontWeight="medium">계정 설정</Typo.MD>
                        </HStack>
                        <ChevronRight size={20} color="#8B847F" />
                    </HStack>

                    <HStack fullWidth justify="between" align="center" className={s.menuItem} onClick={() => router.push('/profile/notification')}>
                        <HStack gap={12} align="center">
                            <Bell size={20} color="#484848" />
                            <Typo.MD color="primary" fontWeight="medium">알림 설정</Typo.MD>
                        </HStack>
                        <ChevronRight size={20} color="#8B847F" />
                    </HStack>

                    <HStack fullWidth justify="between" align="center" className={s.menuItem} onClick={() => router.push('/profile/support')}>
                        <HStack gap={12} align="center">
                            <CircleHelp size={20} color="#484848" />
                            <Typo.MD color="primary" fontWeight="medium">도움말 및 지원</Typo.MD>
                        </HStack>
                        <ChevronRight size={20} color="#8B847F" />
                    </HStack>
                </VStack>

                <div className={s.logoutButton}>
                    <HStack gap={8} align="center">
                        <LogOut size={16} color="#DA7F7F" />
                        <Typo.SM color="wrong" fontWeight="medium">로그아웃</Typo.SM>
                    </HStack>
                </div>

                <div className={s.mobileBottomBar}>
                    <BottomBar/>
                </div>
            </div>
        </div>
    )
}
