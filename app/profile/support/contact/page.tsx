'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "../style.module.scss";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft, CheckCircle } from "lucide-react";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const INQUIRY_TYPES = ["일반 문의", "결제/구독", "기능 제안", "계정 관련", "기타"];

export default function Contact() {
    const router = useRouter();
    const { user } = useAuth();
    const [inquiryType, setInquiryType] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!inquiryType || !title || !message) return;
        // In production, send to backend API
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={s.container}>
                <Sidebar />
                <div className={s.desktopContent}>
                    <VStack fullWidth align="center" justify="center" gap={20} className={s.contentWrapper} style={{ paddingTop: '80px' }}>
                        <CheckCircle size={56} color="#3D7BFF" />
                        <VStack align="center" gap={8}>
                            <Typo.LG color="primary" fontWeight="bold">문의가 접수되었습니다</Typo.LG>
                            <Typo.SM color="secondary" fontWeight="medium" style={{ textAlign: 'center' }}>
                                빠른 시일 내에 이메일로 답변드리겠습니다.
                            </Typo.SM>
                        </VStack>
                        <Button
                            onClick={() => router.push('/profile/support')}
                            style={{ padding: '14px 32px', backgroundColor: '#3D7BFF', borderRadius: '12px', marginTop: '16px' }}
                        >
                            <Typo.SM color="inverted" fontWeight="bold">돌아가기</Typo.SM>
                        </Button>
                    </VStack>
                </div>
            </div>
        );
    }

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <VStack fullWidth align="start" justify="start" gap={16} className={s.contentWrapper}>
                    <HStack fullWidth align="center" gap={8} style={{padding: '16px 0'}}>
                        <ChevronLeft size={24} color="var(--text-primary)" onClick={() => router.back()} style={{cursor: 'pointer'}}/>
                        <Typo.LG color="primary" fontWeight="bold">문의하기</Typo.LG>
                    </HStack>

                    <VStack fullWidth gap={20}>
                        {/* Inquiry Type */}
                        <VStack fullWidth gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">문의 유형</Typo.SM>
                            <div className={s.chipGrid}>
                                {INQUIRY_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        className={`${s.chip} ${inquiryType === type ? s.chipActive : ''}`}
                                        onClick={() => setInquiryType(type)}
                                    >
                                        <Typo.XS
                                            color={inquiryType === type ? 'inverted' : 'secondary'}
                                            fontWeight={inquiryType === type ? 'bold' : 'medium'}
                                        >
                                            {type}
                                        </Typo.XS>
                                    </button>
                                ))}
                            </div>
                        </VStack>

                        {/* Title */}
                        <VStack fullWidth gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">제목</Typo.SM>
                            <input
                                className={s.formInput}
                                placeholder="문의 제목을 입력해주세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </VStack>

                        {/* Message */}
                        <VStack fullWidth gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">내용</Typo.SM>
                            <textarea
                                className={s.formTextarea}
                                placeholder="문의 내용을 자세히 작성해주세요"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={6}
                            />
                        </VStack>

                        {/* Email */}
                        <VStack fullWidth gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">회신 이메일</Typo.SM>
                            <input
                                className={s.formInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="회신받을 이메일을 입력해주세요"
                            />
                        </VStack>

                        <Button
                            onClick={handleSubmit}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: (inquiryType && title && message) ? '#3D7BFF' : '#ccc',
                                borderRadius: '12px',
                                marginTop: '8px'
                            }}
                        >
                            <Typo.MD color="inverted" fontWeight="bold">문의하기</Typo.MD>
                        </Button>
                    </VStack>
                </VStack>
            </div>
        </div>
    )
}
