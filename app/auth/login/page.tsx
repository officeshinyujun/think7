'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
    const router = useRouter();

    return (
        <div className={s.container}>
            <VStack fullHeight justify="center" align="center" gap={32} className={s.content}>
                <VStack align="center" gap={8}>
                    <Image src="/think7_Logo.png" alt="logo" width={60} height={60} />
                    <Typo.XL color="primary" fontWeight="bold">Think7</Typo.XL>
                    <Typo.MD color="secondary" fontWeight="medium">하루 7분, 사고력을 깨우는 시간</Typo.MD>
                </VStack>

                <VStack fullWidth gap={16}>
                    <input type="text" placeholder="이메일" className={s.input} />
                    <input type="password" placeholder="비밀번호" className={s.input} />
                    <Button onClick={() => router.push('/')} className={s.loginButton}>
                        <Typo.MD color="inverted" fontWeight="bold">로그인</Typo.MD>
                    </Button>
                </VStack>

                <HStack gap={8} align="center">
                    <Typo.SM color="secondary">아직 계정이 없으신가요?</Typo.SM>
                    <Typo.SM color="brand" fontWeight="bold" style={{cursor: 'pointer'}} onClick={() => router.push('/auth/signup')}>회원가입</Typo.SM>
                </HStack>
                
                <div className={s.divider}>
                    <div className={s.line} />
                    <Typo.XS color="secondary">또는</Typo.XS>
                    <div className={s.line} />
                </div>

                <VStack fullWidth gap={12}>
                    <button className={s.socialButton}>
                        <Image src="/google.png" alt="google" width={20} height={20} />
                        <Typo.SM color="primary" fontWeight="medium">Google로 시작하기</Typo.SM>
                    </button>
                    <button className={s.socialButton}>
                        <Image src="/kakao.png" alt="kakao" width={20} height={20} />
                        <Typo.SM color="primary" fontWeight="medium">Kakao로 시작하기</Typo.SM>
                    </button>
                </VStack>
            </VStack>
        </div>
    )
}
