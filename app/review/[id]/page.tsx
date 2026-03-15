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
import { Send, Loader2, ArrowLeft } from "lucide-react";

interface ChatMessage {
    role: 'system' | 'assistant' | 'user';
    content: string;
    isStructured?: boolean;
    analysis?: string;
    highlight_quote?: string;
    step?: number;
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
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [currentStep, setCurrentStep] = useState(1);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id && qid && messages.length === 0) {
            initCoach();
        }
    }, [id, qid]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const buildApiHistory = (msgs: ChatMessage[]) => msgs.map(m => ({
        role: m.role,
        content: m.isStructured ? JSON.stringify({
            analysis: m.analysis,
            highlight_quote: m.highlight_quote,
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
            step: res.step
        };
        if (res.step) setCurrentStep(res.step);
        return [...prev, aiMsg];
    };

    const initCoach = async () => {
        setIsLoading(true);
        try {
            const res = await https.report.coach(id, qid as number, []);
            if (res.sessionId) setSessionId(res.sessionId);
            setMessages(prev => applyCoachResponse(res, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: 'user', content: text };
        const newHistory = [...messages, userMsg];
        setMessages(newHistory);
        setInputValue('');
        setIsLoading(true);

        try {
            const res = await https.report.coach(id, qid as number, buildApiHistory(newHistory), sessionId);
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
        <HStack fullWidth align="start" className={s.container}>
            <Sidebar />

            <VStack fullWidth justify="center" align="center" className={s.desktopContent}>
                <VStack fullWidth justify="start" className={s.contentWrapper}>
                    <div className="mobileOnly">
                        <Header />
                    </div>

                    {/* Header */}
                    <HStack fullWidth justify="start" align="center" className={s.pageHeader}>
                        <ArrowLeft
                            size={20}
                            color="var(--text-primary)"
                            onClick={() => router.back()}
                            style={{ cursor: 'pointer', marginRight: '12px' }}
                        />
                        <VStack align="start" gap={2}>
                            <Typo.MD color="primary" fontWeight="bold">Think Coach</Typo.MD>
                            <HStack align="center" gap={4}>
                                {STEP_LABELS.map((label, i) => (
                                    <HStack key={i} align="center" gap={4}>
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

                    {/* Chat */}
                    <div className={s.chatContainer}>
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
                    </div>

                    {/* Quick Questions */}
                    <HStack fullWidth gap={8} className={s.quickQuestions}>
                        {QUICK_QUESTIONS.map((q, i) => (
                            <button key={i} className={s.quickBtn} onClick={() => sendMessage(q.message)} disabled={isLoading}>
                                <Typo.XS color="brand" fontWeight="semi-bold">{q.label}</Typo.XS>
                            </button>
                        ))}
                    </HStack>

                    {/* Input */}
                    <HStack fullWidth align="center" className={s.inputArea}>
                        <input
                            className={s.inputField}
                            placeholder="생각을 자유롭게 입력해보세요..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                            disabled={isLoading}
                        />
                        <button className={s.sendButton} onClick={() => sendMessage(inputValue)} disabled={isLoading || !inputValue.trim()}>
                            <Send size={18} color="var(--bg-primary)" />
                        </button>
                    </HStack>

                </VStack>
            </VStack>
        </HStack>
    )
}
