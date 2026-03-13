'use client';

import { useState } from 'react';
import { https } from '@/services/https';
import s from './style.module.scss';
import { VStack } from '@/components/general/VStack';
import { HStack } from '@/components/general/HStack';
import Typo from '@/components/general/Typo';
import Button from '@/components/general/Button';
import { X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreateContentModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateContentModal({ onClose, onSuccess }: CreateContentModalProps) {
    const [topic, setTopic] = useState('');
    const [type, setType] = useState('시사/일반');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!topic.trim()) return;
        
        setIsLoading(true);
        try {
            await https.content.generate(topic, type);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to generate content:', error);
            alert('콘텐츠 생성에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={s.overlay}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <VStack fullWidth align="start" gap={24}>
                    <HStack fullWidth justify="between" align="center">
                        <Typo.LG color="primary" fontWeight="bold">AI 문제 생성</Typo.LG>
                        <button onClick={onClose} className={s.closeButton}>
                            <X size={24} color="#8B847F" />
                        </button>
                    </HStack>

                    <VStack fullWidth align="start" gap={16}>
                        <VStack fullWidth align="start" gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">진행 방식</Typo.SM>
                            <div className={s.typeContainer}>
                                {['시사/일반', '논리/주장', '철학/인문', '과학/기술', '비즈니스/경제'].map((t) => (
                                    <div 
                                        key={t}
                                        className={`${s.typeChip} ${type === t ? s.typeChipActive : ''}`}
                                        onClick={() => setType(t)}
                                    >
                                        <Typo.SM color={type === t ? 'brand' : 'secondary'} fontWeight={type === t ? 'bold' : 'medium'}>{t}</Typo.SM>
                                    </div>
                                ))}
                            </div>
                        </VStack>

                        <VStack fullWidth align="start" gap={8}>
                            <Typo.SM color="secondary" fontWeight="medium">주제</Typo.SM>
                        <input
                            type="text"
                            className={s.input}
                            placeholder="예: 양자역학, 소크라테스의 변명, 인공지능 윤리"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={isLoading}
                        />
                        <Typo.XS color="secondary" fontWeight="regular">
                            원하는 주제를 입력하면 AI가 맞춤형 문제를 생성해드립니다.
                        </Typo.XS>
                        </VStack>
                    </VStack>

                    <Button 
                        style={{ width: '100%', backgroundColor: 'var(--brand-primary)' }}
                        onClick={handleSubmit} 
                        disabled={isLoading || !topic.trim()}
                        className={`${s.submitButton} ${isLoading ? s.loading : ''}`}
                    >
                        {isLoading ? (
                            <HStack gap={8} align="center" justify="center">
                                <Loader2 size={20} className={s.spinner} style={{ color: 'var(--bg-primary)' }} />
                                <Typo.MD fontWeight="bold" style={{ color: 'var(--bg-primary)' }}>생성 중...</Typo.MD>
                            </HStack>
                        ) : (
                            <Typo.MD fontWeight="bold" style={{ color: 'var(--bg-primary)' }}>생성하기</Typo.MD>
                        )}
                    </Button>
                </VStack>
            </div>
        </div>
    );
}
