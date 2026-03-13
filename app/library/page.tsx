'use client'

import { HStack } from "@/components/general/HStack";
import Sidebar from "@/components/general/Sidebar";
import Typo from "@/components/general/Typo";
import { VStack } from "@/components/general/VStack";
import Button from "@/components/general/Button";
import s from "./style.module.scss";
import BottomBar from "@/components/general/BottomBar";
import { useAuth } from "@/contexts/AuthContext";
import { https, Content } from "@/services/https";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Clock, ChevronRight, Sparkles, Crown, Plus, CalendarDays } from "lucide-react";
import CreateContentModal from "@/components/library/CreateContentModal";
import Header from "@/components/general/Header";

const TOPICS = ['전체'];
const DIFFICULTY_LABELS: Record<string, string> = {
    EASY: '쉬움',
    MEDIUM: '보통',
    HARD: '어려움',
};
const FREE_DAILY_LIMIT = 2;

export default function Library() {
    const router = useRouter();
    const { user } = useAuth();
    const [contents, setContents] = useState<Content[]>([]);
    const [selectedTopic, setSelectedTopic] = useState('전체');
    const [loading, setLoading] = useState(true);
    const [todayUsed, setTodayUsed] = useState(0);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const isPremium = user?.subscription_plan === 'PREMIUM';

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const topic = selectedTopic === '전체' ? undefined : selectedTopic;
                const data = await https.content.getLibrary(topic);
                setContents(data);
            } catch (err) {
                console.error('Failed to fetch library:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContents();
    }, [selectedTopic]);

    const freeContents = contents.filter(c => !c.is_premium);
    const premiumContents = contents.filter(c => c.is_premium);
    const limitReached = !isPremium && todayUsed >= FREE_DAILY_LIMIT;

    const handleContentClick = (content: Content) => {
        if (content.is_premium && !isPremium) {
            router.push('/profile/plan');
            return;
        }
        if (limitReached && !isPremium) {
            router.push('/profile/plan');
            return;
        }
        // Navigate to article page with content id
        router.push(`/article?contentId=${content.id}`);
        if (!isPremium) {
            setTodayUsed(prev => prev + 1);
        }
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'EASY': return '#4CAF50';
            case 'MEDIUM': return '#FF9800';
            case 'HARD': return '#F44336';
            default: return '#8B847F';
        }
    };

    return (
        <HStack fullWidth align="start" justify="start" className={s.container}>
            <Sidebar />
            <div className={s.pageContent}>
                <div className={s.mobileHeader}>
                    <Header />
                </div>
                <VStack fullWidth align="start" justify="start" gap={16 } className={s.inner}>
                    {/* Header */}
                    <HStack fullWidth align="center" justify="between">
                        <Typo.XL color="primary" fontWeight="bold">콘텐츠 라이브러리</Typo.XL>
                        {isPremium ? (
                            <button
                                onClick={() => setShowCreateModal(true)}
                                style={{
                                    padding: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#3D7BFF',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Plus size={20} color="white" />
                            </button>
                        ) : (
                            <div className={s.dailyLimit}>
                                <Typo.XS color="secondary" fontWeight="bold">
                                    오늘 {todayUsed} / {FREE_DAILY_LIMIT}
                                </Typo.XS>
                            </div>
                        )}
                    </HStack>

                    {/* Filter Bar */}
                    <div className={s.filterBar}>
                        {TOPICS.map(topic => (
                            <button
                                key={topic}
                                className={`${s.filterChip} ${selectedTopic === topic ? s.filterActive : ''}`}
                                onClick={() => { setSelectedTopic(topic); setLoading(true); }}
                            >
                                <Typo.SM
                                    color={selectedTopic === topic ? 'inverted' : 'secondary'}
                                    fontWeight={selectedTopic === topic ? 'bold' : 'medium'}
                                >
                                    {topic}
                                </Typo.SM>
                            </button>
                        ))}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <VStack fullWidth align="center" style={{ padding: '40px 0' }}>
                            <Typo.MD color="secondary" fontWeight="medium">불러오는 중...</Typo.MD>
                        </VStack>
                    )}

                    {/* Empty State */}
                    {!loading && contents.length === 0 && (
                        <VStack fullWidth align="center" gap={8} style={{ padding: '60px 0' }}>
                            <Typo.LG color="secondary" fontWeight="bold">콘텐츠가 없습니다</Typo.LG>
                            <Typo.SM color="secondary" fontWeight="medium">다른 주제를 선택해보세요</Typo.SM>
                        </VStack>
                    )}

                    {/* Free Content List */}
                    {!loading && freeContents.length > 0 && (
                        <VStack fullWidth gap={16}>
                            {freeContents.map(content => (
                                <div
                                    key={content.id}
                                    className={s.contentCard}
                                    onClick={() => handleContentClick(content)}
                                >
                                    <VStack fullWidth align="start" gap={10}>
                                        <HStack fullWidth align="center" justify="between">
                                            <HStack gap={8} align="center">
                                                <span className={s.topicBadge}>
                                                    <Typo.XS color="brand" fontWeight="bold">{content.topic}</Typo.XS>
                                                </span>
                                                <span
                                                    className={s.difficultyBadge}
                                                    style={{ backgroundColor: `${getDifficultyColor(content.difficulty)}15`, color: getDifficultyColor(content.difficulty) }}
                                                >
                                                    <Typo.XS fontWeight="bold" style={{ color: 'inherit' }}>
                                                        {DIFFICULTY_LABELS[content.difficulty] || content.difficulty}
                                                    </Typo.XS>
                                                </span>
                                            </HStack>
                                            {limitReached && (
                                                <Lock size={16} color="#8B847F" />
                                            )}
                                        </HStack>
                                        <Typo.MD color="primary" fontWeight="bold">{content.title}</Typo.MD>
                                        <HStack gap={12} align="center">
                                            <HStack gap={4} align="center">
                                                <CalendarDays size={14} color="#8B847F" />
                                                <Typo.XS color="secondary" fontWeight="medium">{new Date(content.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</Typo.XS>
                                            </HStack>
                                            <HStack gap={4} align="center">
                                                <Clock size={14} color="#8B847F" />
                                                <Typo.XS color="secondary" fontWeight="medium">{content.estimated_time}분</Typo.XS>
                                            </HStack>
                                            <Typo.XS color="secondary" fontWeight="medium">문제 {content.questions?.length || 0}개</Typo.XS>
                                        </HStack>
                                    </VStack>
                                    <ChevronRight size={20} color="#C4C4C4" />
                                </div>
                            ))}
                        </VStack>
                    )}

                    {/* Premium Content Section */}
                    {!loading && premiumContents.length > 0 && (
                        <VStack fullWidth gap={12}>
                            <HStack gap={8} align="center" style={{ marginTop: 8 }}>
                                <Crown size={18} color="#3D7BFF" />
                                <Typo.LG color="primary" fontWeight="bold">Premium 콘텐츠</Typo.LG>
                            </HStack>
                            <Typo.SM color="secondary" fontWeight="medium">더 깊이 있는 사고 훈련</Typo.SM>

                            {premiumContents.map(content => (
                                <div
                                    key={content.id}
                                    className={`${s.contentCard} ${!isPremium ? s.locked : ''}`}
                                    onClick={() => handleContentClick(content)}
                                >
                                    <VStack fullWidth align="start" gap={10}>
                                        <HStack fullWidth align="center" justify="between">
                                            <HStack gap={8} align="center">
                                                <span className={s.premiumBadge}>
                                                    <Lock size={10} color="white" />
                                                    <Typo.XS color="inverted" fontWeight="bold"> Premium</Typo.XS>
                                                </span>
                                                <span className={s.topicBadge}>
                                                    <Typo.XS color="brand" fontWeight="bold">{content.topic}</Typo.XS>
                                                </span>
                                            </HStack>
                                        </HStack>
                                        <Typo.MD color="primary" fontWeight="bold">{content.title}</Typo.MD>
                                        <HStack gap={12} align="center">
                                            <HStack gap={4} align="center">
                                                <CalendarDays size={14} color="#8B847F" />
                                                <Typo.XS color="secondary" fontWeight="medium">{new Date(content.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</Typo.XS>
                                            </HStack>
                                            <HStack gap={4} align="center">
                                                <Clock size={14} color="#8B847F" />
                                                <Typo.XS color="secondary" fontWeight="medium">{content.estimated_time}분</Typo.XS>
                                            </HStack>
                                            <Typo.XS color="secondary" fontWeight="medium">문제 {content.questions?.length || 0}개</Typo.XS>
                                        </HStack>
                                    </VStack>
                                    {!isPremium ? (
                                        <Lock size={20} color="#3D7BFF" />
                                    ) : (
                                        <ChevronRight size={20} color="#C4C4C4" />
                                    )}
                                </div>
                            ))}
                        </VStack>
                    )}

                    {/* Upgrade Banner — Free users only */}
                    {!isPremium && (
                        <div className={s.upgradeBanner} onClick={() => router.push('/profile/plan')}>
                            <VStack align="start" gap={8}>
                                <HStack gap={6} align="center">
                                    <Sparkles size={18} color="white" />
                                    <Typo.MD color="inverted" fontWeight="bold">Unlimited Thinking</Typo.MD>
                                </HStack>
                                <Typo.SM color="inverted" fontWeight="medium" style={{ opacity: 0.85 }}>
                                    무제한 문제 풀이와 AI 상세 분석을 경험하세요
                                </Typo.SM>
                            </VStack>
                            <Button className={s.upgradeCta}>
                                <Typo.SM color="brand" fontWeight="bold">Premium 시작하기</Typo.SM>
                            </Button>
                        </div>
                    )}

                    <div style={{ height: 40 }} />
                </VStack>
            </div>
            <div className={s.mobileBottomBar}>
                <BottomBar />
            </div>

            {showCreateModal && (
                <CreateContentModal
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={() => {
                        setLoading(true);
                        const topic = selectedTopic === '전체' ? undefined : selectedTopic;
                        https.content.getLibrary(topic)
                            .then(data => {
                                setContents(data);
                                setLoading(false);
                            });
                    }}
                />
            )}
        </HStack>
    )
}