'use client'

import { VStack } from "@/components/general/VStack";
import s from "./style.module.scss";
import QuestionSection from "@/components/article/Question/QuestionSection";
import Button from "@/components/general/Button";
import Typo from "@/components/general/Typo";
import { useRouter } from "next/navigation";
import { HStack } from "@/components/general/HStack";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { https } from "@/services/https";
import { useAuth } from "@/contexts/AuthContext";

export default function Question() {
    const router = useRouter();
    const { user } = useAuth();
    const [content, setContent] = useState<any>(null);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        https.content.getToday()
            .then(res => setContent(res))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async () => {
        if (!content) return;
        
        const submission = content.questions.map((q: any) => {
            const selectedNum = answers[q.id];
            if (!selectedNum) return null;
            const options = q.options || [];
            const answerText = options[selectedNum - 1];
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

    if (!content) return <div>Loading...</div>;

    const quizData = content.questions.map((q: any) => ({
        id: q.id,
        title: q.question_text,
        question: (q.options || []).map((opt: string, idx: number) => ({
            number: idx + 1,
            content: opt
        }))
    }));

    return (
        <div className={s.desktopContainer}>
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
                        key={item.id} // Changed key to item.id for better performance and stability
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
    )
}