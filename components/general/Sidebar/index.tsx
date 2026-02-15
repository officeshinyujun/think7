'use client';

import { useRouter, usePathname } from "next/navigation";
import s from "./style.module.scss";
import { House, ClipboardCheck, User, Settings } from "lucide-react";
import Typo from "@/components/general/Typo";
import { VStack } from "@/components/general/VStack";
import { HStack } from "@/components/general/HStack";
import Image from "next/image";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { icon: <House size={20} />, text: "홈", link: "/" },
        { icon: <ClipboardCheck size={20} />, text: "리포트", link: "/report" },
        { icon: <User size={20} />, text: "프로필", link: "/profile" },
    ];

    return (
        <VStack className={s.container} justify="between" align="start">
            <VStack fullWidth align="start" justify="start" gap={16}>
                <HStack className={s.logo} align="center" gap={10} onClick={() => router.push('/')}>
                    <Image src="/think7_Logo.png" alt="logo" width={36} height={36} />
                    <Typo.LG color="primary" fontWeight="bold">Think7</Typo.LG>
                </HStack>
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.link;
                        const iconColor = isActive ? "#3D7BFF" : "#8B847F";
                        const textColor = isActive ? "brand" : "secondary";
                        
                        return (
                            <HStack
                                key={index} 
                                className={`${s.menuItem} ${isActive ? s.active : ''}`}
                                onClick={() => router.push(item.link)}
                                align="center"
                                gap={12}
                                fullWidth
                            >
                                <div style={{color: iconColor, display: 'flex'}}>
                                    {item.icon}
                                </div>
                                <Typo.MD color={textColor} fontWeight={isActive ? "bold" : "medium"}>
                                    {item.text}
                                </Typo.MD>
                            </HStack>
                        )
                    })}
            </VStack>

            <HStack className={s.userProfile} align="center" justify="between" onClick={() => router.push('/profile')}>
                <HStack align="center" gap={12}>
                    <div className={s.avatar}>
                        <User size={20} color="#8B847F" />
                    </div>
                    <VStack align="start" gap={0}>
                        <Typo.SM color="primary" fontWeight="bold">김민준</Typo.SM>
                        <Typo.XS color="secondary" fontWeight="medium">Thinker</Typo.XS>
                    </VStack>
                </HStack>
                <Settings size={20} color="#8B847F" />
            </HStack>
        </VStack>
    )
}
