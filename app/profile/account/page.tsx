'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { User, Camera, ChevronLeft } from "lucide-react";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";

export default function AccountSettings() {
    const router = useRouter();

    return (
        <VStack fullWidth align="start" justify="start" gap={24} className={s.container}>
            <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                <ChevronLeft size={24} color="#111111" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                <Typo.LG color="primary" fontWeight="bold">계정 설정</Typo.LG>
            </HStack>

            <VStack fullWidth align="center" gap={24} className={s.section}>
                <div className={s.avatar}>
                    <User size={40} color="#8B847F" />
                    <div className={s.editIcon}>
                        <Camera size={14} color="white" />
                    </div>
                </div>

                <VStack fullWidth gap={16}>
                    <VStack fullWidth gap={8} className={s.inputGroup}>
                        <Typo.SM color="secondary" fontWeight="medium">이름</Typo.SM>
                        <input className={s.input} defaultValue="김민준" />
                    </VStack>
                    
                    <VStack fullWidth gap={8} className={s.inputGroup}>
                        <Typo.SM color="secondary" fontWeight="medium">이메일</Typo.SM>
                        <input className={s.input} defaultValue="kimmj@example.com" disabled />
                    </VStack>

                    <Button style={{width: '100%', padding: '16px', backgroundColor: '#F3F3F7', borderRadius: '12px', marginTop: '8px'}}>
                        <Typo.MD color="primary" fontWeight="semi-bold">비밀번호 변경</Typo.MD>
                    </Button>
                </VStack>
            </VStack>

            <VStack fullWidth gap={12} className={s.section}>
                <Typo.MD color="primary" fontWeight="bold">데이터 관리</Typo.MD>
                
                <VStack fullWidth gap={12}>
                    <Button style={{width: '100%', padding: '16px', backgroundColor: '#F3F3F7', borderRadius: '12px', justifyContent: 'flex-start'}}>
                        <Typo.MD color="primary" fontWeight="medium">모든 리포트 기록 삭제</Typo.MD>
                    </Button>
                    
                    <div className={s.deleteButton}>
                        <Typo.MD color="wrong" fontWeight="bold">계정 삭제</Typo.MD>
                    </div>
                </VStack>
            </VStack>
        </VStack>
    )
}
