'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
    const router = useRouter();
    const { login, googleLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            router.push('/');
        } catch (err: any) {
            setError(err?.response?.data?.message || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <div className={s.container}>
            <VStack fullHeight justify="center" align="center" gap={32} className={s.content}>
                <VStack align="center" gap={8}>
                    <Image src="/think7_Logo.png" alt="logo" width={60} height={60} />
                    <Typo.XL color="primary" fontWeight="bold">Think7</Typo.XL>
                    <Typo.MD color="secondary" fontWeight="medium">하루 7분, 사고력을 깨우는 시간</Typo.MD>
                </VStack>

                <VStack fullWidth gap={16}>
                    {error && (
                        <div className={s.errorMessage}>
                            <Typo.SM color="wrong" fontWeight="medium">{error}</Typo.SM>
                        </div>
                    )}
                    <input 
                        type="email" 
                        placeholder="이메일" 
                        className={s.input} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호" 
                        className={s.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button onClick={handleLogin} className={s.loginButton} disabled={loading}>
                        <Typo.MD color="inverted" fontWeight="bold">
                            {loading ? '로그인 중...' : '로그인'}
                        </Typo.MD>
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
                    <button className={s.socialButton} onClick={async () => {
                        try {
                            await googleLogin();
                            router.push('/');
                        } catch (err: any) {
                            setError(err?.response?.data?.message || 'Google 로그인에 실패했습니다.');
                        }
                    }}>
                        <Image src="/google.png" alt="google" width={20} height={20} />
                        <Typo.SM color="primary" fontWeight="medium">Google로 시작하기</Typo.SM>
                    </button>
                </VStack>
            </VStack>
        </div>
    )
}
