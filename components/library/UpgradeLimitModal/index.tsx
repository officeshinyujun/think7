'use client';

import { VStack } from '@/components/general/VStack';
import { HStack } from '@/components/general/HStack';
import Typo from '@/components/general/Typo';
import Button from '@/components/general/Button';
import { X, Sparkles, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import s from './style.module.scss';

interface UpgradeLimitModalProps {
    onClose: () => void;
}

export default function UpgradeLimitModal({ onClose }: UpgradeLimitModalProps) {
    const router = useRouter();

    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <VStack fullWidth align="center" gap={24} style={{ padding: '32px 16px' }}>
                    <HStack fullWidth justify="end" style={{ position: 'absolute', top: 16, right: 16 }}>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} color="#8B847F" />
                        </button>
                    </HStack>

                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '20px', 
                        backgroundColor: 'rgba(61, 123, 255, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '8px'
                    }}>
                        <Crown size={32} color="#3D7BFF" />
                    </div>

                    <VStack align="center" gap={8}>
                        <Typo.LG color="primary" fontWeight="bold">오늘의 생성 한도 도달</Typo.LG>
                        <Typo.SM color="secondary" fontWeight="medium" style={{ textAlign: 'center' }}>
                            무료 티어는 하루에 2개의 콘텐츠만 생성할 수 있습니다.<br/>
                            Premium으로 업그레이드하여 무제한으로 생성하세요!
                        </Typo.SM>
                    </VStack>

                    <VStack fullWidth gap={12}>
                        <Button 
                            style={{ width: '100%', backgroundColor: '#3D7BFF' }}
                            onClick={() => router.push('/profile/plan')}
                        >
                            <HStack gap={8} align="center">
                                <Sparkles size={18} color="white" />
                                <Typo.MD fontWeight="bold" style={{ color: 'white' }}>Premium 시작하기</Typo.MD>
                            </HStack>
                        </Button>
                        <button 
                            onClick={onClose}
                            style={{ 
                                width: '100%', 
                                background: 'none', 
                                border: 'none', 
                                padding: '12px', 
                                cursor: 'pointer' 
                            }}
                        >
                            <Typo.SM color="secondary" fontWeight="medium">나중에 하기</Typo.SM>
                        </button>
                    </VStack>
                </VStack>
            </div>
        </div>
    );
}
