'use client'

import { HStack } from "@/components/general/HStack";
import Sidebar from "@/components/general/Sidebar";
import Typo from "@/components/general/Typo";
import { VStack } from "@/components/general/VStack";
import s from "./style.module.scss";
import BottomBar from "@/components/general/BottomBar";
import { useAuth } from "@/contexts/AuthContext";
import { https } from "@/services/https";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, ChevronRight, Loader2 } from "lucide-react";
import Header from "@/components/general/Header";

interface CoachSession {
    id: string;
    analysis_id: string;
    question_number: number;
    question_text: string;
    messages: { role: string; content: string }[];
    created_at: string;
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getLastUserMessage(messages: { role: string; content: string }[]) {
    const userMsgs = messages.filter(m => m.role === 'user');
    return userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].content : null;
}

export default function ReviewList() {
    const router = useRouter();
    const { user } = useAuth();
    const [sessions, setSessions] = useState<CoachSession[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;
        const fetchSessions = async () => {
            try {
                const data = await https.report.listSessions(user.id);
                setSessions(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [user?.id]);

    return (
        <HStack fullWidth align="start" justify="start" className={s.container}>
            <Sidebar />

            <div className={s.pageContent}>
                <div className={s.mobileHeader}>
                    <Header />
                </div>
                <VStack fullWidth align="start" justify="start" gap={16} className={s.inner}>
                    {/* Header */}
                    <HStack fullWidth align="center" justify="between">
                        <Typo.XL color="primary" fontWeight="bold">Think Coach 기록</Typo.XL>
                    </HStack>
                    <Typo.SM color="secondary" style={{ marginTop: '-8px' }}>AI와 함께 탐구한 질문들을 다시 확인해보세요.</Typo.SM>

                    {/* Session List */}
                    <VStack fullWidth gap={16} style={{ marginTop: '8px' }}>
                        {loading ? (
                            <VStack fullWidth align="center" justify="center" style={{ padding: '80px 0' }}>
                                <Loader2 className={s.spinner} size={28} color="var(--brand-primary)" />
                                <Typo.SM color="secondary" style={{ marginTop: '12px' }}>불러오는 중...</Typo.SM>
                            </VStack>
                        ) : sessions.length === 0 ? (
                            <VStack fullWidth align="center" justify="center" className={s.emptyState}>
                                <MessageSquare size={40} color="var(--text-secondary)" />
                                <Typo.MD color="secondary" fontWeight="medium" style={{ marginTop: '12px' }}>아직 코칭 기록이 없어요</Typo.MD>
                                <Typo.SM color="secondary">리포트에서 오답을 탐구하면 여기에 기록됩니다.</Typo.SM>
                            </VStack>
                        ) : (
                            sessions.map((session) => {
                                const lastUserMsg = getLastUserMessage(session.messages);
                                return (
                                    <div
                                        key={session.id}
                                        className={s.sessionCard}
                                        onClick={() => router.push(`/review/${session.analysis_id}?qid=${session.question_number}`)}
                                    >
                                        <HStack align="start" gap={16} fullWidth>
                                            <div className={s.iconBox}>
                                                <MessageSquare size={20} color="var(--brand-primary)" />
                                            </div>
                                            <VStack align="start" gap={6} style={{ flex: 1 }}>
                                                <Typo.MD color="primary" fontWeight="bold" className={s.questionText}>
                                                    {session.question_text}
                                                </Typo.MD>
                                                {lastUserMsg && (
                                                    <Typo.SM color="secondary" className={s.lastMessage}>
                                                        내 마지막 답변: {lastUserMsg}
                                                    </Typo.SM>
                                                )}
                                                <HStack align="center" gap={8} style={{ marginTop: '4px' }}>
                                                    <Typo.XS color="secondary">{formatDate(session.created_at)}</Typo.XS>
                                                    <div className={s.dot} />
                                                    <Typo.XS color="secondary">{session.messages.length}개 메시지</Typo.XS>
                                                </HStack>
                                            </VStack>
                                            <ChevronRight size={20} color="#C4C4C4" />
                                        </HStack>
                                    </div>
                                );
                            })
                        )}
                    </VStack>

                    <div style={{ height: 40 }} />
                </VStack>
            </div>

            <div className={s.mobileBottomBar}>
                <BottomBar />
            </div>
        </HStack>
    );
}
