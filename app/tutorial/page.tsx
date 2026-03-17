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
        evaluation: "좋은 시도입니다. 하지만 본문에 더 핵심적인 부분이 있어요.",
        rating: 60,
        user_answer_quote: "AI가 사람의 일을 뺏는 게 문제",
        ideal_answer_quote: "효율성 추구에 밀려 사고의 과정과 여백의 가치가 상실되는 것",
        content: "내 답변과 모범 답안을 비교했을 때, 어떤 부분이 가장 큰 차이점인가요?",
        step: 2
    },
    {
        role: 'user',
        content: "음... 저는 일자리 걱정을 했는데, 글은 생각하는 과정 자체가 사라지는 걸 더 걱정하네요.",
        step: 2
    },
    {
        role: 'assistant',
        evaluation: "맞아요. 필자는 결론보다 '과정' 자체의 중요성을 강조하고 있죠.",
        rating: 90,
        highlight_quote: "고민하고, 헤매고, 실패하는 그 과정 자체가 인간의 사고 근육을 강화합니다.",
        analysis: "필자는 AI가 주는 정답보다, 그 정답에 도달하기 위한 인간의 고군분투를 더 가치 있게 보고 있어요.",
        content: "자, 이제 논리 구조를 파악했으니 본격적인 사고 훈련을 시작해봅시다.",
        step: 3
    },
    {
        role: 'user',
        content: "네, 준비됐습니다!",
        step: 3
    },
    {
        role: 'assistant',
        evaluation: "이제 사고 훈련 3문제를 풀겠습니다. 첫 번째 질문입니다.",
        rating: 100,
        content: "만약 저자라면 AI 비서를 사용하는 사람들에게 어떤 충고를 한 문장으로 남길까요?",
        step: 4
    },
    {
        role: 'user',
        content: "답을 얻는 것보다 스스로 질문하는 법을 먼저 배우라고 할 것 같아요.",
        step: 4
    },
    {
        role: 'assistant',
        evaluation: "축하합니다! 모든 코칭 과정이 완료되었습니다. 이제 이 글에 대해 궁금한 점을 자유롭게 물어보세요!",
        rating: 100,
        content: "어떤 점이 더 궁금하신가요?",
        step: 5
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
        
        // Push user message
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
    const STEP_LABELS = ['지문 읽기', '진단 리포트', 'AI 코칭'];

    return (
        <div className={s.container}>
            <div className={s.desktopContent}>
                <div className={s.contentWrapper}>
                    <div className="mobileOnly" style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-primary)' }}>
                        <Header />
                    </div>

                    {/* Header with Progress */}
                    <HStack fullWidth justify="start" align="center" className={s.pageHeader}>
                        <ArrowLeft
                            size={20}
                            color="var(--text-primary)"
                            onClick={() => router.back()}
                            style={{ cursor: 'pointer', marginRight: '12px', flexShrink: 0 }}
                        />
                        <VStack align="start" gap={2} style={{ overflow: 'hidden', flex: 1 }}>
                            <Typo.MD color="primary" fontWeight="bold">Think Tutorial</Typo.MD>
                            <HStack align="center" gap={8} className={s.stepProgressContainer}>
                                {STEP_LABELS.map((label, i) => (
                                    <HStack key={i} align="center" gap={4} style={{ flexShrink: 0 }}>
                                        <span className={`${s.stepDot} ${step === i + 1 ? s.stepDotActive : ''}`} />
                                        <Typo.XS
                                            color={step === i + 1 ? "brand" : "secondary"}
                                            fontWeight={step === i + 1 ? "bold" : "regular"}
                                        >
                                            {label}
                                        </Typo.XS>
                                        {i < 2 && <span className={s.stepLine} />}
                                    </HStack>
                                ))}
                            </HStack>
                        </VStack>
                    </HStack>

                    <div className={s.mainArea}>
                        {/* STEP 1: READING */}
                        {step === 1 && (
                            <div className={s.readingArea}>
                                <div className={s.articleBox}>
                                    <VStack fullWidth gap={16}>
                                        <Typo.XL fontWeight="bold" color="primary">{DUMMY_ARTICLE.title}</Typo.XL>
                                        <Typo.MD color="primary" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                                            {DUMMY_ARTICLE.content}
                                        </Typo.MD>
                                    </VStack>
                                </div>
                                <div className={s.questionBoxColumn}>
                                    <VStack fullWidth gap={24} className={s.questionCard}>
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
                                            className={s.submitButton}
                                            style={{ width: '100%', height: '52px', borderRadius: '26px', backgroundColor: 'var(--brand-primary)' }}
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
                                </div>
                            </div>
                        )}

                        {/* STEP 2: REPORT */}
                        {step === 2 && (
                            <VStack fullWidth fullHeight align="center" justify="center" className={s.reportArea} gap={32}>
                                <VStack align="center" gap={12}>
                                    <div className={s.scoreCircle}>
                                        <Typo.XXL color="wrong" style={{ fontSize: '48px' }}>00</Typo.XXL>
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

                                    <Button 
                                        className={s.submitButton}
                                        style={{ width: '100%', height: '56px', borderRadius: '28px', backgroundColor: 'var(--brand-primary)' }} 
                                        onClick={() => setStep(3)}
                                    >
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
                            <div className={s.readingArea}>
                                <div className={s.articleBox}>
                                    <VStack fullWidth gap={16}>
                                        <Typo.XL fontWeight="bold" color="primary">{DUMMY_ARTICLE.title}</Typo.XL>
                                        <Typo.MD color="primary" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                                            {DUMMY_ARTICLE.content}
                                        </Typo.MD>
                                    </VStack>
                                </div>

                                <div className={s.chatBoxContainer}>
                                    <div className={s.chatContainer}>
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
                                                                <div className={`${s.evaluationBox} ${msg.rating !== undefined ? (msg.rating >= 70 ? s.evaluationPass : s.evaluationHint) : ''}`}>
                                                                    <Typo.SM color={msg.rating !== undefined && msg.rating < 70 ? "brand" : "primary"} fontWeight="medium">
                                                                        {msg.rating !== undefined ? (msg.rating >= 70 ? '✅ ' : '💡 ') : '💡 '}
                                                                        {msg.evaluation}
                                                                    </Typo.SM>
                                                                </div>
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
                                                                <div className={s.questionBoxMsg}>
                                                                    <Typo.SM color="brand" fontWeight="bold">{msg.content}</Typo.SM>
                                                                </div>
                                                            )}
                                                        </VStack>
                                                    </VStack>
                                                )}
                                            </HStack>
                                        ))}
                                        {isBotTyping && (
                                            <HStack fullWidth justify="start" className={s.botMessageRow}>
                                                <div className={s.typingIndicator}>
                                                    <span /><span /><span />
                                                </div>
                                            </HStack>
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className={s.inputArea}>
                                        {chatIndex >= COACH_DIALOGUE.length - 2 ? (
                                            <Button 
                                                className={s.submitButton}
                                                style={{ width: '100%', height: '52px', borderRadius: '26px', backgroundColor: 'var(--brand-primary)' }} 
                                                onClick={() => router.push('/')}
                                            >
                                                <Typo.MD color="inverted" fontWeight="bold">튜토리얼 완료! 시작하기</Typo.MD>
                                            </Button>
                                        ) : (
                                            <>
                                                <input
                                                    className={s.inputField}
                                                    placeholder="생각을 자유롭게 입력해보세요..."
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.nativeEvent.isComposing) return;
                                                        if (e.key === 'Enter') handleSendMessage();
                                                    }}
                                                    disabled={isBotTyping}
                                                />
                                                <button className={s.sendButton} onClick={handleSendMessage} disabled={isBotTyping || !inputValue.trim()}>
                                                    <Send size={18} color="var(--bg-primary)" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
