'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { VStack } from "@/components/general/VStack"
import { HStack } from "@/components/general/HStack"
import Typo from "@/components/general/Typo"
import Header from "@/components/general/Header"
import Sidebar from "@/components/general/Sidebar"
import Button from "@/components/general/Button"
import { ArrowLeft, Send, CheckCircle2, AlertCircle, BrainCircuit, Sparkles, ChevronRight, Loader2 } from 'lucide-react'
import s from './style.module.scss'

// --- Dummy Data ---
const DUMMY_ARTICLE = {
    title: "AI 생산성의 역설: 효율이 창의성을 죽이는가?",
    content: `
최근 생성형 AI의 발전으로 인간의 업무 생산성은 비약적으로 향상되었습니다. 코드를 짜고, 메일을 작성하고, 긴 보고서를 요약하는 일은 이제 몇 초면 충분합니다. 누군가는 이를 '인류의 해방'이라고 부릅니다. 반복적인 고된 노동에서 벗어나 드디어 '인간다운 창의적 활동'에 집중할 수 있게 되었다는 논리입니다.

하지만 여기서 우리는 '생산성의 역설'에 직면합니다. 창의성은 흔히 '바쁨'보다는 '여백'에서 나옵니다. 문제는 AI가 우리에게 준 여백을 우리가 어떻게 사용하느냐에 있습니다. 효율성이라는 미명 아래 더 많은 업무를 욱여넣고 있지는 않나요? 

또한, '창의적 과정' 자체가 갖는 가치를 무시해서는 안 됩니다. 고민하고, 헤매고, 실패하는 그 과정 자체가 인간의 사고 근육을 강화합니다. AI가 정답을 너무 빨리 제시할 때, 우리의 사고 근육은 오히려 퇴화하고 있을지도 모릅니다. 결국 AI 시대의 진정한 차별점은 '얼마나 빨리 하느냐'가 아니라, '질문할 수 있는 능력'과 '고민의 깊이'에 달려 있습니다.
    `
};

const DUMMY_QUESTION = {
    number: 1,
    text: "이 글의 필자가 궁극적으로 경계하고 있는 지점은 무엇인가요?",
    options: [
        "AI가 인간보다 똑똑해져서 일자리를 모두 뺏는 상황",
        "비효율적인 업무 처리 방식으로 인해 기업의 생산성이 떨어지는 현상",
        "효율성 추구에 밀려 사고의 과정과 여백의 가치가 상실되는 것",
        "생성형 AI의 무분별한 도입으로 인해 저작권 분쟁이 발생하는 것"
    ],
    idealAnswer: "효율성 추구에 밀려 사고의 과정과 여백의 가치가 상실되는 것",
    userWrongAnswer: "AI가 인간보다 똑똑해져서 일자리를 모두 뺏는 상황",
    taxonomy: [
        { category: "추론 왜곡", occurred: true },
        { category: "본문 오독", occurred: false }
    ]
};

const COACH_DIALOGUE = [
    {
        role: 'assistant',
        content: "반가워요! 저는 당신의 사고 훈련을 도울 Think Coach입니다. 방금 읽으신 글의 핵심 주장이 무엇이라고 생각하시나요?",
        step: 1
    },
    {
        role: 'user',
        content: "AI가 사람의 일을 뺏는 게 문제라는 글 아닌가요?",
        step: 1
    },
    {
        role: 'assistant',
        analysis: "좋은 시도입니다. 많은 사람들이 AI 하면 일자리 문제를 먼저 떠올리죠.",
        highlight_quote: "효율성이라는 미명 아래 더 많은 업무를 욱여넣고 있지는 않나요?",
        content: "하지만 본문에서 필자는 '일자리' 자체보다 '우리가 AI가 준 시간을 어떻게 쓰는지'를 더 걱정하고 있어요. 이 문장을 참고했을 때, 필자가 말하는 '역설'은 무엇일까요?",
        step: 2
    },
    {
        role: 'user',
        content: "음... 효율적이 됐는데 오히려 더 바빠지고 생각이 없어지는 거요?",
        step: 2
    },
    {
        role: 'assistant',
        analysis: "정확합니다! 효율을 챙기려다 '생각의 근육'이 빠지는 걸 필자는 경계하고 있어요.",
        content: "이제 논리 구조를 이해해봅시다. 필자는 [AI의 효율성] → [여백의 발생] → [잘못된 여백 사용]의 흐름으로 비판하고 있어요. 마지막으로, 당신이 이 글의 저자라면 '사고 근육'을 지키기 위해 무엇을 제안하시겠어요?",
        step: 3
    },
    {
        role: 'user',
        content: "AI가 주는 답을 무조건 믿지 말고 스스로 질문하는 습관을 가져야겠어요.",
        step: 4
    },
    {
        role: 'assistant',
        analysis: "완벽한 마무리입니다! 질문하는 능력이 중요해진다는 결론에 도달하셨네요.",
        content: "축하합니다! 직접 텍스트를 파헤치고 논리적 결론을 도출하셨습니다. 이제 본격적으로 훈련을 시작해볼까요?",
        step: 4
    }
];

export default function TutorialPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Reading, 2: Report, 3: Coach
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [chatIndex, setChatIndex] = useState(0);
    const [messages, setMessages] = useState<any[]>([COACH_DIALOGUE[0]]);
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleAnswerSubmit = () => {
        if (selectedOption === null) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(2);
        }, 1500);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        
        // Push user message (index 1, 3, 5 are users in our dummy dialogue)
        const nextUserMsg = COACH_DIALOGUE[chatIndex + 1];
        if (!nextUserMsg) return;

        setMessages(prev => [...prev, { ...nextUserMsg, content: inputValue }]);
        setInputValue('');
        setIsBotTyping(true);
        
        // Auto reply
        setTimeout(() => {
            const nextBotMsg = COACH_DIALOGUE[chatIndex + 2];
            if (nextBotMsg) {
                setMessages(prev => [...prev, nextBotMsg]);
                setChatIndex(prev => prev + 2);
            }
            setIsBotTyping(false);
        }, 1000);
    };

    const progressPercent = (step / 3) * 100;

    return (
        <HStack fullWidth align="start" className={s.container}>
            <Sidebar />

            <VStack fullWidth align="center" className={s.desktopContent}>
                <VStack fullWidth className={s.contentWrapper}>
                    <div className="mobileOnly">
                        <Header />
                    </div>

                    {/* Tutorial Progress Bar */}
                    <div className={s.tutorialProgress}>
                        <div className={s.progressTrack}>
                            <div className={s.progressBar} style={{ width: `${progressPercent}%` }} />
                        </div>
                        <HStack fullWidth justify="between" className={s.progressLabels}>
                            <Typo.XS color={step === 1 ? "brand" : "secondary"} fontWeight="bold">1. 지문 읽기</Typo.XS>
                            <Typo.XS color={step === 2 ? "brand" : "secondary"} fontWeight="bold">2. 진단 리포트</Typo.XS>
                            <Typo.XS color={step === 3 ? "brand" : "secondary"} fontWeight="bold">3. AI 코칭</Typo.XS>
                        </HStack>
                    </div>

                    {/* STEP 1: READING */}
                    {step === 1 && (
                        <VStack fullWidth gap={24} className={s.stepContainer}>
                            <HStack align="center" gap={8} className={s.tipBox}>
                                <Sparkles size={16} color="var(--brand-primary)" />
                                <Typo.SM color="brand" fontWeight="bold">튜토리얼: 가벼운 마음으로 지문을 읽고 문제를 풀어보세요.</Typo.SM>
                            </HStack>

                            <HStack fullWidth gap={32} className={s.readingArea} align="start">
                                <VStack fullWidth className={s.articleBox} gap={16}>
                                    <Typo.XL fontWeight="bold" color="primary">{DUMMY_ARTICLE.title}</Typo.XL>
                                    <Typo.MD color="primary" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                                        {DUMMY_ARTICLE.content}
                                    </Typo.MD>
                                </VStack>

                                <VStack fullWidth className={s.questionBox} gap={20}>
                                    <VStack gap={8}>
                                        <Typo.SM color="brand" fontWeight="bold">Question {DUMMY_QUESTION.number}</Typo.SM>
                                        <Typo.MD color="primary" fontWeight="bold">{DUMMY_QUESTION.text}</Typo.MD>
                                    </VStack>

                                    <VStack fullWidth gap={12}>
                                        {DUMMY_QUESTION.options.map((opt, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`${s.option} ${selectedOption === idx ? s.optionSelected : ''}`}
                                                onClick={() => setSelectedOption(idx)}
                                            >
                                                <Typo.SM color={selectedOption === idx ? "inverted" : "primary"}>{opt}</Typo.SM>
                                            </div>
                                        ))}
                                    </VStack>

                                    <Button 
                                        style={{ width: '100%' }}
                                        disabled={selectedOption === null || isSubmitting}
                                        onClick={handleAnswerSubmit}
                                    >
                                        {isSubmitting ? (
                                            <Loader2 size={20} className={s.spinner} />
                                        ) : (
                                            <Typo.MD color="inverted" fontWeight="bold">답안 제출하기</Typo.MD>
                                        )}
                                    </Button>
                                </VStack>
                            </HStack>
                        </VStack>
                    )}

                    {/* STEP 2: REPORT */}
                    {step === 2 && (
                        <VStack fullWidth gap={20} className={s.stepContainer} align="center">
                            <VStack align="center" gap={8} style={{ marginBottom: '20px' }}>
                                <div className={s.scoreCircle}>
                                    <Typo.XXL color="wrong">00</Typo.XXL>
                                    <Typo.XS color="secondary">/ 100</Typo.XS>
                                </div>
                                <Typo.LG fontWeight="bold" color="primary">아쉽네요! 하지만 실망하지 마세요.</Typo.LG>
                                <Typo.SM color="secondary">틀린 부분에서 진짜 공부가 시작됩니다.</Typo.SM>
                            </VStack>

                            <VStack fullWidth className={s.reportSummary} gap={16}>
                                <VStack fullWidth gap={12} className={s.answerSection}>
                                    <Typo.SM fontWeight="bold" color="primary">Q1 분석 결과</Typo.SM>
                                    <div className={s.answerGrid}>
                                        <VStack className={s.answerItem} gap={4}>
                                            <Typo.XS color="secondary">내가 고른 답</Typo.XS>
                                            <Typo.SM color="wrong" style={{ textDecoration: 'line-through' }}>{DUMMY_QUESTION.userWrongAnswer}</Typo.SM>
                                        </VStack>
                                        <VStack className={s.answerItem} gap={4}>
                                            <Typo.XS color="secondary">정답</Typo.XS>
                                            <Typo.SM color="brand" fontWeight="bold">{DUMMY_QUESTION.idealAnswer}</Typo.SM>
                                        </VStack>
                                    </div>
                                    <VStack gap={4} className={s.taxonomyBox}>
                                        <Typo.XS color="secondary" fontWeight="bold">오류 유형</Typo.XS>
                                        <HStack gap={8}>
                                            <div className={s.tag}>진실 오도</div>
                                            <div className={s.tagActive}>추론 왜곡</div>
                                        </HStack>
                                    </VStack>
                                </VStack>

                                <Button style={{ width: '100%' }} onClick={() => setStep(3)}>
                                    <HStack gap={8} align="center">
                                        <BrainCircuit size={18} color="white" />
                                        <Typo.MD color="inverted" fontWeight="bold">AI 코치와 왜 틀렸는지 분석하기</Typo.MD>
                                        <ChevronRight size={18} color="white" />
                                    </HStack>
                                </Button>
                            </VStack>
                        </VStack>
                    )}

                    {/* STEP 3: COACH */}
                    {step === 3 && (
                        <VStack fullWidth className={s.stepContainer} gap={0}>
                            <HStack fullWidth justify="start" align="center" className={s.chatHeader}>
                                <VStack align="start" gap={2}>
                                    <Typo.MD color="primary" fontWeight="bold">Think Coach</Typo.MD>
                                    <Typo.XS color="secondary">가상 코칭 세션</Typo.XS>
                                </VStack>
                            </HStack>

                            <div className={s.chatArea}>
                                {messages.map((msg, idx) => (
                                    <HStack fullWidth justify={msg.role === 'user' ? 'end' : 'start'} key={idx} className={s.msgRow}>
                                        {msg.role === 'assistant' ? (
                                            <VStack align="start" gap={6} className={s.botBubbleWrapper}>
                                                <Typo.XS color="secondary" fontWeight="bold">Think Coach · Step {msg.step}</Typo.XS>
                                                <VStack className={s.botBubble} gap={12}>
                                                    {msg.highlight_quote && (
                                                        <div className={s.highlight}>
                                                            <Typo.SM color="primary">"{msg.highlight_quote}"</Typo.SM>
                                                        </div>
                                                    )}
                                                    {msg.analysis && (
                                                        <Typo.SM color="primary">{msg.analysis}</Typo.SM>
                                                    )}
                                                    <Typo.SM color="brand" fontWeight="bold" style={{ lineHeight: 1.5 }}>
                                                        {msg.content}
                                                    </Typo.SM>
                                                </VStack>
                                            </VStack>
                                        ) : (
                                                <div className={s.userBubble}>
                                                    <Typo.SM color="inverted">{msg.content}</Typo.SM>
                                                </div>
                                        )}
                                    </HStack>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {chatIndex >= COACH_DIALOGUE.length - 2 ? (
                                <VStack fullWidth style={{ padding: '20px', borderTop: '1px solid var(--border-primary)' }}>
                                    <Button style={{ width: '100%' }} onClick={() => router.push('/')}>
                                        <Typo.MD color="inverted" fontWeight="bold">튜토리얼 완료! 시작하기</Typo.MD>
                                    </Button>
                                </VStack>
                            ) : (
                                <HStack fullWidth className={s.inputArea} gap={12}>
                                    <input 
                                        className={s.input} 
                                        placeholder="메시지를 입력해 코칭을 이어가세요..." 
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button 
                                        className={s.sendBtn} 
                                        onClick={handleSendMessage}
                                        disabled={isBotTyping || !inputValue.trim()}
                                    >
                                        <Send size={18} color="white" />
                                    </button>
                                </HStack>
                            )}
                        </VStack>
                    )}
                </VStack>
            </VStack>
        </HStack>
    );
}
