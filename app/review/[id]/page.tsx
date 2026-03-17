'use client'

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import Header from "@/components/general/Header";
import { HStack } from "@/components/general/HStack";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";
import { https } from "@/services/https";
import { useEffect, useState, use, useRef } from "react";
import { Send, Loader2, ArrowLeft, Sparkles } from "lucide-react";

interface ChatMessage {
    role: 'system' | 'assistant' | 'user';
    content: string;
    isStructured?: boolean;
    analysis?: string;
    highlight_quote?: string;
    evaluation?: string;
    rating?: number;
    step?: number;
    user_answer_quote?: string;
    ideal_answer_quote?: string;
}

const QUICK_QUESTIONS = [
    { label: '핵심 주장은?', message: '이 글의 핵심 주장이 무엇인지 모르겠어요.' },
    { label: '내 답 분석', message: '내 답변의 어떤 부분이 틀렸나요?' },
    { label: '논리 구조', message: '이 글의 논리 구조를 설명해줄 수 있나요?' },
    { label: '다른 해석', message: '다른 해석 방법도 가능할까요?' },
];

export default function ReviewCoach({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const qidParam = searchParams.get('qid');
    const qid = qidParam ? parseInt(qidParam, 10) : null;

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [report, setReport] = useState<any>(null);
    const [article, setArticle] = useState<any>(null);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [currentStep, setCurrentStep] = useState(1);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const initializationStarted = useRef(false);

    useEffect(() => {
        if (id && qid && messages.length === 0 && !initializationStarted.current) {
            initializationStarted.current = true;
            initOrRestoreCoach();
        }
    }, [id, qid]);

    useEffect(() => {
        if (id) {
            https.report.get(id as string)
                .then(res => {
                    setReport(res);
                    if (res.content_id) {
                        https.content.get(res.content_id)
                            .then(contentRes => setArticle(contentRes))
                            .catch(err => console.error(err));
                    }
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const buildApiHistory = (msgs: ChatMessage[]) => msgs.map(m => ({
        role: m.role,
        content: m.isStructured ? JSON.stringify({
            step: m.step,
            evaluation: m.evaluation,
            rating: m.rating,
            analysis: m.analysis,
            highlight_quote: m.highlight_quote,
            user_answer_quote: m.user_answer_quote,
            ideal_answer_quote: m.ideal_answer_quote,
            next_question: m.content
        }) : m.content
    }));

    const applyCoachResponse = (res: any, prev: ChatMessage[]): ChatMessage[] => {
        const aiMsg: ChatMessage = {
            role: 'assistant',
            content: res.next_question || '',
            isStructured: true,
            analysis: res.analysis,
            highlight_quote: res.highlight_quote,
            evaluation: res.evaluation,
            rating: res.rating,
            step: res.step,
            user_answer_quote: res.user_answer_quote,
            ideal_answer_quote: res.ideal_answer_quote
        };
        if (res.step) setCurrentStep(res.step);
        return [...prev, aiMsg];
    };

    const initOrRestoreCoach = async () => {
        setIsLoading(true);
        try {
            const existingSession = await https.report.getCoachSession(id, qid as number);

            if (existingSession && existingSession.messages && existingSession.messages.length > 0) {
                setSessionId(existingSession.id);
                const restoredMessages: ChatMessage[] = existingSession.messages.map((m: any) => {
                    if (m.role === 'assistant') {
                        try {
                            const parsed = JSON.parse(m.content);
                            return {
                                role: 'assistant',
                                content: parsed.next_question || '',
                                isStructured: true,
                                analysis: parsed.analysis,
                                highlight_quote: parsed.highlight_quote,
                                evaluation: parsed.evaluation,
                                rating: parsed.rating,
                                step: parsed.step,
                                user_answer_quote: parsed.user_answer_quote,
                                ideal_answer_quote: parsed.ideal_answer_quote
                            };
                        } catch (e) {
                            return { role: 'assistant', content: m.content };
                        }
                    } else {
                        return { role: 'user', content: m.content };
                    }
                });

                setMessages(restoredMessages);
                const lastAiMsg = restoredMessages.filter(m => m.role === 'assistant').pop();
                if (lastAiMsg && lastAiMsg.step) {
                    setCurrentStep(lastAiMsg.step);
                }
            } else {
                const res = await https.report.coach(id, qid as number, []);
                if (res.sessionId) setSessionId(res.sessionId);
                setMessages([
                    {
                        role: 'assistant',
                        content: res.next_question || '',
                        isStructured: true,
                        analysis: res.analysis,
                        highlight_quote: res.highlight_quote,
                        evaluation: res.evaluation,
                        rating: res.rating,
                        step: res.step,
                        user_answer_quote: res.user_answer_quote,
                        ideal_answer_quote: res.ideal_answer_quote
                    }
                ]);
                if (res.step) setCurrentStep(res.step);
            }
        } catch (error: any) {
            if (error.response?.data?.message === 'FREE_TIER_DAILY_LIMIT') {
                setIsLimitReached(true);
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: 'user', content: text };
        const nextMessages = [...messages, userMsg];
        
        setMessages(nextMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const historyForApi = buildApiHistory(nextMessages);
            const res = await https.report.coach(id, qid as number, historyForApi, sessionId);
            
            if (res.sessionId) setSessionId(res.sessionId);
            setMessages(prev => applyCoachResponse(res, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const STEP_LABELS = ['글 구조', '내 답 분석', '논리 이해', '사고 훈련'];

    return (
        <div className={s.container}>
            <Sidebar />

            <div className={s.desktopContent}>
                <div className={s.contentWrapper}>
                    <div className="mobileOnly" style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-primary)' }}>
                        <Header />
                    </div>

                    {/* Header */}
                    <HStack fullWidth justify="start" align="center" className={s.pageHeader}>
                        <ArrowLeft
                            size={20}
                            color="var(--text-primary)"
                            onClick={() => router.back()}
                            style={{ cursor: 'pointer', marginRight: '12px', flexShrink: 0 }}
                        />
                        <VStack align="start" gap={2} style={{ overflow: 'hidden' }}>
                            <Typo.MD color="primary" fontWeight="bold">Think Coach</Typo.MD>
                            <HStack align="center" gap={8} className={s.stepContainer}>
                                {STEP_LABELS.map((label, i) => (
                                    <HStack key={i} align="center" gap={4} style={{ flexShrink: 0 }}>
                                        <span className={`${s.stepDot} ${currentStep === i + 1 ? s.stepDotActive : ''}`} />
                                        <Typo.XS
                                            color={currentStep === i + 1 ? "brand" : "secondary"}
                                            fontWeight={currentStep === i + 1 ? "bold" : "regular"}
                                        >
                                            {label}
                                        </Typo.XS>
                                        {i < 3 && <span className={s.stepLine} />}
                                    </HStack>
                                ))}
                            </HStack>
                        </VStack>
                    </HStack>

                    <div className={s.readingArea}>
                        {/* Article Column */}
                        <div className={s.articleBox}>
                            {article ? (
                                <VStack fullWidth gap={16}>
                                    <Typo.XL fontWeight="bold" color="primary">{article.title}</Typo.XL>
                                    <Typo.MD color="primary" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                                        {article.body}
                                    </Typo.MD>
                                </VStack>
                            ) : (
                                <VStack fullWidth justify="center" align="center" style={{ padding: '40px' }}>
                                    <Loader2 className={s.spinner} size={28} color="var(--brand-primary)" />
                                </VStack>
                            )}
                        </div>

                        {/* Chat Column */}
                        <div className={s.chatBoxContainer}>
                        <div className={s.chatContainer}>
                            {isLimitReached ? (
                                <div className={s.limitReachedContainer}>
                                    <div className={s.limitCard}>
                                        <Sparkles size={40} color="white" style={{ marginBottom: '16px' }} />
                                        <Typo.LG fontWeight="bold">
                                            오늘의 코칭 한도 도달
                                        </Typo.LG>
                                        <Typo.SM style={{ marginTop: '12px', lineHeight: 1.6 }}>
                                            프리 티어는 하루에 1개의 코칭 세션만<br />
                                            이용 가능합니다. 더 깊이 있는 분석을 위해<br />
                                            프리미엄으로 업그레이드해보세요!
                                        </Typo.SM>
                                        <button className={s.upgradeButton} onClick={() => router.push('/profile/plan')}>
                                            플랜 업그레이드하기
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                {messages.length === 0 && isLoading && (
                                    <VStack fullWidth justify="center" align="center" style={{ padding: '40px' }}>
                                        <Loader2 className={s.spinner} size={28} color="var(--brand-primary)" />
                                        <Typo.SM color="secondary" style={{ marginTop: '12px' }}>코칭을 시작하고 있습니다...</Typo.SM>
                                    </VStack>
                                )}

                                {messages.map((msg, idx) => (
                                    <HStack fullWidth justify={msg.role === 'user' ? 'end' : 'start'} key={idx}
                                        className={msg.role === 'user' ? s.userMessageRow : s.botMessageRow}>
                                        {msg.role === 'user' ? (
                                            <div className={s.userBubble}>
                                                <Typo.SM color="inverted">{msg.content}</Typo.SM>
                                            </div>
                                        ) : (
                                            <VStack align="start" gap={6} className={s.botBubbleContainer}>
                                                <Typo.XS color="secondary" fontWeight="bold" style={{ marginLeft: '4px' }}>
                                                    Think Coach {msg.step ? `· Step ${msg.step}` : ''}
                                                </Typo.XS>
                                                <VStack fullWidth gap={12} className={s.botBubble}>
                                                    {msg.evaluation && (
                                                        idx === 0 ? (
                                                            <Typo.SM color="primary" fontWeight="regular">{msg.evaluation}</Typo.SM>
                                                        ) : (
                                                            <div className={`${s.evaluationBox} ${msg.rating !== undefined ? (msg.rating >= 70 ? s.evaluationPass : s.evaluationHint) : ''}`}>
                                                                <Typo.SM color={msg.rating !== undefined && msg.rating < 70 ? "brand" : "primary"} fontWeight="medium">
                                                                    {msg.rating !== undefined ? (msg.rating >= 70 ? '✅ ' : '💡 ') : '💡 '}
                                                                    {msg.evaluation}
                                                                </Typo.SM>
                                                            </div>
                                                        )
                                                    )}

                                                    {msg.user_answer_quote && msg.ideal_answer_quote && (
                                                        <div className={s.comparisonContainer}>
                                                            <div className={s.comparisonUser}>
                                                                <div className={s.comparisonLabel}>내 답변 중 부족한 부분</div>
                                                                <Typo.SM color="primary" fontWeight="regular">"{msg.user_answer_quote}"</Typo.SM>
                                                            </div>
                                                            <div className={s.comparisonIdeal}>
                                                                <div className={s.comparisonLabel}>글에서 놓친 핵심</div>
                                                                <Typo.SM color="primary" fontWeight="regular">"{msg.ideal_answer_quote}"</Typo.SM>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {msg.highlight_quote && (
                                                        <div className={s.highlightBox}>
                                                            <Typo.SM color="primary" fontWeight="medium">"{msg.highlight_quote}"</Typo.SM>
                                                        </div>
                                                    )}
                                                    {msg.analysis && (
                                                        <Typo.SM color="primary" fontWeight="regular">{msg.analysis}</Typo.SM>
                                                    )}
                                                    {msg.content && (
                                                        <div className={s.questionBox}>
                                                            <Typo.SM color="brand" fontWeight="bold">{msg.content}</Typo.SM>
                                                        </div>
                                                    )}
                                                </VStack>
                                            </VStack>
                                        )}
                                    </HStack>
                                ))}
                                {messages.length > 0 && isLoading && (
                                    <HStack fullWidth justify="start" className={s.botMessageRow}>
                                        <div className={s.typingIndicator}>
                                            <span /><span /><span />
                                        </div>
                                    </HStack>
                                )}
                                <div ref={chatEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input */}
                    {!isLimitReached && (
                        <div className={s.inputArea}>
                            <input
                                className={s.inputField}
                                placeholder="생각을 자유롭게 입력해보세요..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.nativeEvent.isComposing) return;
                                    if (e.key === 'Enter') sendMessage(inputValue);
                                }}
                                disabled={isLoading}
                            />
                            <button className={s.sendButton} onClick={() => sendMessage(inputValue)} disabled={isLoading || !inputValue.trim()}>
                                <Send size={18} color="var(--bg-primary)" />
                            </button>
                        </div>
                    )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
