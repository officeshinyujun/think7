'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Signup() {
    const router = useRouter();

    return (
        <div className={s.container}>
            <VStack fullHeight justify="center" align="center" gap={32} className={s.content}>
                <VStack align="center" gap={8}>
                    <Image src="/think7_Logo.png" alt="logo" width={60} height={60} />
                    <Typo.XL color="primary" fontWeight="bold">회원가입</Typo.XL>
                    <Typo.MD color="secondary" fontWeight="medium">Think7과 함께 사고력을 키워보세요.</Typo.MD>
                </VStack>

                <VStack fullWidth gap={16}>
                    <input type="text" placeholder="이메일" className={s.input} />
                    <input type="password" placeholder="비밀번호" className={s.input} />
                    <input type="password" placeholder="비밀번호 확인" className={s.input} />
                    <Button onClick={() => router.push('/')} className={s.signupButton}>
                        <Typo.MD color="inverted" fontWeight="bold">가입하기</Typo.MD>
                    </Button>
                </VStack>

                <HStack gap={8} align="center">
                    <Typo.SM color="secondary">이미 계정이 있으신가요?</Typo.SM>
                    <Typo.SM color="brand" fontWeight="bold" style={{cursor: 'pointer'}} onClick={() => router.push('/auth/login')}>로그인</Typo.SM>
                </HStack>
            </VStack>
        </div>
    )
}
