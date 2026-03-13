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

const BUG_CATEGORIES = ["UI/화면 오류", "기능 오류", "로딩/성능 문제", "로그인/인증 문제", "결제 관련", "기타"];

export default function BugReport() {
    const router = useRouter();
    const { user } = useAuth();
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!category || !title || !description) return;
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
                            <Typo.LG color="primary" fontWeight="bold">버그 신고가 접수되었습니다</Typo.LG>
                            <Typo.SM color="secondary" fontWeight="medium" style={{ textAlign: 'center' }}>
                                소중한 제보 감사합니다. 확인 후 빠르게 조치하겠습니다.
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
                        <Typo.LG color="primary" fontWeight="bold">버그 신고</Typo.LG>
                    </HStack>

                    <VStack fullWidth gap={20}>
                        {/* Category Selection */}
                        <VStack fullWidth gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">버그 유형</Typo.SM>
                            <div className={s.chipGrid}>
                                {BUG_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`${s.chip} ${category === cat ? s.chipActive : ''}`}
                                        onClick={() => setCategory(cat)}
                                    >
                                        <Typo.XS
                                            color={category === cat ? 'inverted' : 'secondary'}
                                            fontWeight={category === cat ? 'bold' : 'medium'}
                                        >
                                            {cat}
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
                                placeholder="간단히 요약해주세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </VStack>

                        {/* Description */}
                        <VStack fullWidth gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">상세 내용</Typo.SM>
                            <textarea
                                className={s.formTextarea}
                                placeholder="어떤 상황에서 문제가 발생했는지 자세히 알려주세요"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                                backgroundColor: (category && title && description) ? '#3D7BFF' : '#ccc',
                                borderRadius: '12px',
                                marginTop: '8px'
                            }}
                        >
                            <Typo.MD color="inverted" fontWeight="bold">신고하기</Typo.MD>
                        </Button>
                    </VStack>
                </VStack>
            </div>
        </div>
    )
}
