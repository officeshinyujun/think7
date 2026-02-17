'use client'

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import Button from "@/components/general/Button";
import { ChevronLeft } from "lucide-react";
import { HStack } from "@/components/general/HStack";
import { useRouter } from "next/navigation";
import QuestionSection from "@/components/article/Question/QuestionSection"; // Import QuestionSection
import { https } from "@/services/https";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Article() {
    const router = useRouter();
    const { user } = useAuth();
    const [content, setContent] = useState<any>(null);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({}); // questionId -> selected number

    useEffect(() => {
        https.content.getToday()
            .then(res => setContent(res))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async () => {
        if (!content) return;
        
        // Map answers to backend format
        const submission = content.questions.map((q: any) => {
            const selectedNum = answers[q.id];
            if (!selectedNum) return null;
            // Options are 1-based index in QuestionSection
            // Assuming options is string[]
            const options = q.options || [];
            const answerText = options[selectedNum - 1]; // number is 1-based
            return {
                question_id: q.id,
                answer_text: answerText
            };
        }).filter((a: any) => a !== null);

        if (submission.length < content.questions.length) {
            alert("모든 문제에 답해주세요.");
            return;
        }

        try {
            const report = await https.analysis.submit({
                userId: user?.id || '',
                contentId: content.id,
                answers: submission
            });
            router.push(`/report/${report.id}`);
        } catch (error) {
            console.error(error);
            alert("제출에 실패했습니다.");
        }
    };

    if (!content) return <div>Loading...</div>; // Or skeleton

    const quizData = content.questions.map((q: any) => ({
        id: q.id,
        title: q.question_text,
        question: (q.options || []).map((opt: string, idx: number) => ({
            number: idx + 1,
            content: opt
        }))
    }));

    return (
        <>
            {/* Mobile View: Article Only */}
            <div className={s.mobileView}>
                <div className={s.container}>
                    <VStack fullWidth align="start" justify="start" className={s.contentWrapper} gap={16}>
                        <VStack fullWidth align="start" justify="start" gap={8}>
                            <HStack fullWidth align="center" justify="between" gap={6}>
                                <Typo.XL
                                    color="primary"
                                    fontWeight="bold"
                                >{content.title}</Typo.XL>
                                <Typo.SM
                                    color="secondary"
                                    fontWeight="medium"
                                    onClick={() => router.back()}
                                    style={{cursor: 'pointer'}}
                                >
                                    이전으로
                                </Typo.SM>
                            </HStack>
                            <Typo.SM
                                color="secondary"
                                fontWeight="medium"
                            >{content.editor}</Typo.SM>
                        </VStack>
                        <div style={{lineHeight: '1.8'}}>
                            <Typo.MD    
                                color="primary"
                                fontWeight="regular"
                            >{content.body}</Typo.MD>
                        </div>
                        
                        <div className={s.mobileSpacer} style={{width:"100%", minHeight:"100px"}}/>
                    </VStack>
                    
                    <VStack fullWidth align="start" justify="start"  className={s.buttonContainer}>
                        <div className={s.gradient}/>
                        <VStack fullWidth align="center" justify="center" className={s.buttonContainerTwo}>
                            <Button className={s.button} onClick={() => router.push("/article/question")}>
                                <Typo.MD
                                    color="inverted"
                                    fontWeight="semi-bold"
                                >문제 풀기</Typo.MD>
                            </Button>
                        </VStack>
                    </VStack>
                </div>
            </div>

            {/* Desktop View: Split View (Article + Question) */}
            <div className={s.desktopSplitView}>
                 <div className={s.articleColumn}>
                    <VStack fullWidth align="start" justify="start" gap={8} className={s.header}>
                        <HStack fullWidth align="center" justify="between" gap={6}>
                            <Typo.XL color="primary" fontWeight="bold">{content.title}</Typo.XL>
                             <HStack align="center" gap={4} onClick={() => router.back()} style={{cursor: 'pointer'}}>
                                <ChevronLeft size={20} color="#8B847F" />
                                <Typo.SM color="secondary" fontWeight="medium">이전으로</Typo.SM>
                            </HStack>
                        </HStack>
                        <Typo.SM color="secondary" fontWeight="medium">{content.editor}</Typo.SM>
                    </VStack>
                    <Typo.MD color="primary" fontWeight="regular" className={s.content}>{content.body}</Typo.MD>
                </div>

                <VStack fullHeight fullWidth align="start" justify="start" gap={12} className={s.questionColumn}>
                    {quizData.map((item: any, index: number) => (
                        <QuestionSection
                            key={index}
                            title={item.title}
                            question={item.question}
                            selected={answers[item.id]}
                            onSelect={(num) => setAnswers(prev => ({ ...prev, [item.id]: num }))}
                        />
                    ))}
                    <Button
                        className={s.button}
                        onClick={handleSubmit}
                    ><Typo.MD color="inverted">제출</Typo.MD></Button>
                </VStack>
            </div>
        </>
    )

}
