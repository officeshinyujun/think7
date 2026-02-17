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

export default function Signup() {
    const router = useRouter();
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            setError('모든 필드를 입력해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (password.length < 6) {
            setError('비밀번호는 6자 이상이어야 합니다.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await signup(email, password);
            router.push('/');
        } catch (err: any) {
            setError(err?.response?.data?.message || '회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSignup();
    };

    return (
        <div className={s.container}>
            <VStack fullHeight justify="center" align="center" gap={32} className={s.content}>
                <VStack align="center" gap={8}>
                    <Image src="/think7_Logo.png" alt="logo" width={60} height={60} />
                    <Typo.XL color="primary" fontWeight="bold">회원가입</Typo.XL>
                    <Typo.MD color="secondary" fontWeight="medium">Think7과 함께 사고력을 키워보세요.</Typo.MD>
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
                    <input 
                        type="password" 
                        placeholder="비밀번호 확인" 
                        className={s.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button onClick={handleSignup} className={s.signupButton} disabled={loading}>
                        <Typo.MD color="inverted" fontWeight="bold">
                            {loading ? '가입 중...' : '가입하기'}
                        </Typo.MD>
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
