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
import { https } from "@/services/https";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Profile() {
    const router = useRouter();
    const { user: authUser, logout } = useAuth();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (!authUser) return;
        https.user.get(authUser.id)
            .then(res => setUser(res))
            .catch(err => console.error(err));
    }, [authUser]);

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    if (!user) return <div>Loading...</div>;

    const emailPrefix = user.email ? user.email.split('@')[0] : "사용자";

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
                        {user.profile_image ? (
                             <img src={user.profile_image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                        ) : (
                            <User size={32} color="#8B847F" />
                        )}
                    </div>
                    <VStack align="start" gap={4} style={{flex: 1}}>
                        <Typo.LG color="primary" fontWeight="bold">{emailPrefix}</Typo.LG>
                        <Typo.SM color="secondary" fontWeight="medium">{user.email}</Typo.SM>
                    </VStack>
                </HStack>

                {/* Subscription */}
                <VStack fullWidth align="start" gap={12} className={s.subscriptionCard}>
                    <HStack fullWidth justify="between" align="center">
                        <Typo.MD color="inverted" fontWeight="bold">{user.subscription_plan === 'PREMIUM' ? 'Premium Plan' : 'Free Plan'}</Typo.MD>
                        <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '100px'}}>
                            <Typo.XS color="inverted" fontWeight="bold">현재 이용중</Typo.XS>
                        </div>
                    </HStack>
                    <Typo.SM color="inverted" fontWeight="medium" style={{opacity: 0.9}}>
                        {user.subscription_plan === 'PREMIUM' ? (
                            <>
                                프리미엄 혜택을<br/>
                                마음껏 누리고 계시네요!
                            </>
                        ) : (
                            <>
                                프리미엄으로 업그레이드하고<br/>
                                더 상세한 분석 리포트를 받아보세요.
                            </>
                        )}
                    </Typo.SM>
                    {user.subscription_plan !== 'PREMIUM' && (
                        <Button style={{width: '100%', backgroundColor: 'white', padding: '12px', borderRadius: '12px', marginTop: '8px'}} onClick={() => router.push('/profile/plan')}>
                            <Typo.SM color="brand" fontWeight="bold">업그레이드 하기</Typo.SM>
                        </Button>
                    )}
                </VStack>

                {/* Settings Menu */}
                <VStack fullWidth gap={12}>
                    <Typo.SM color="secondary" fontWeight="bold" style={{paddingLeft: '4px'}}>설정</Typo.SM>
                    
                    <HStack fullWidth justify="between" align="center" className={s.menuItem} onClick={() => router.push('/profile/account')}>
                        <HStack gap={12} align="center">
                            <Settings size={20} color="#484848" />
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

                <div className={s.logoutButton} onClick={handleLogout} style={{cursor: 'pointer'}}>
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
