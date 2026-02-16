'use client'

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import Button from "@/components/general/Button";
import { ChevronLeft } from "lucide-react";
import { HStack } from "@/components/general/HStack";
import { useRouter } from "next/navigation";
import QuestionSection from "@/components/article/Question/QuestionSection"; // Import QuestionSection

export default function Article() {

    const router = useRouter();

    const dummyData = {
        title : "“석주는 관하여”",
        editor : "NBM 정여진 기자",
        content : "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum."
    }

    // Quiz Data for Desktop Split View
    const quizData = [
        {
            title: "Q1. 위 글의 내용과 일치하지 않는 것은?",
            question: [
                { number: 1, content: "Lorem Ipsum은 1500년대부터 표준 더미 텍스트로 사용되었다." },
                { number: 2, content: "전자 조판으로 넘어가면서 그 본질이 크게 변했다." },
                { number: 3, content: "1960년대 Letraset 시트와 함께 대중화되었다." },
                { number: 4, content: "Aldus PageMaker 같은 소프트웨어에도 포함되었다." },
                { number: 5, content: "현재까지도 인쇄 및 조판 산업의 표준 모델이다." }
            ]
        },
        {
            title: "Q2. 위 글의 주제로 가장 적절한 것은?",
            question: [
                { number: 1, content: "Lorem Ipsum의 역사와 유래" },
                { number: 2, content: "전자 조판 시스템의 발전 과정" },
                { number: 3, content: "현대 출판 소프트웨어의 종류" },
                { number: 4, content: "표준 더미 텍스트의 중요성" },
                { number: 5, content: "인쇄 산업의 표준화 과정" }
            ]
        },
        {
            title: "Q3. 위 글에서 언급되지 않은 시기는?",
            question: [
                { number: 1, content: "1500년대" },
                { number: 2, content: "1700년대" },
                { number: 3, content: "1960년대" },
                { number: 4, content: "최근 (Desktop Publishing 시대)" },
                { number: 5, content: "전자 조판 도약기" }
            ]
        },
        {
            title: "Q4. 위 글을 통해 추론할 수 있는 내용은?",
            question: [
                { number: 1, content: "Lorem Ipsum은 의미 없는 단어들의 나열이다." },
                { number: 2, content: "원래의 라틴어 문장에서 일부 단어를 변경했다." },
                { number: 3, content: "인쇄소에서 활자 견본책을 만들기 위해 사용되었다." },
                { number: 4, content: "현대 웹 디자인에서도 여전히 널리 사용된다." },
                { number: 5, content: "모든 출판 소프트웨어가 Lorem Ipsum을 기본 제공한다." }
            ]
        }
    ]

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
                                >{dummyData.title}</Typo.XL>
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
                            >{dummyData.editor}</Typo.SM>
                        </VStack>
                        <div style={{lineHeight: '1.8'}}>
                            <Typo.MD    
                                color="primary"
                                fontWeight="regular"
                            >{dummyData.content}</Typo.MD>
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
                            <Typo.XL color="primary" fontWeight="bold">{dummyData.title}</Typo.XL>
                             <HStack align="center" gap={4} onClick={() => router.back()} style={{cursor: 'pointer'}}>
                                <ChevronLeft size={20} color="#8B847F" />
                                <Typo.SM color="secondary" fontWeight="medium">이전으로</Typo.SM>
                            </HStack>
                        </HStack>
                        <Typo.SM color="secondary" fontWeight="medium">{dummyData.editor}</Typo.SM>
                    </VStack>
                    <Typo.MD color="primary" fontWeight="regular" className={s.content}>{dummyData.content}</Typo.MD>
                </div>

                <VStack fullHeight fullWidth align="start" justify="start" gap={12} className={s.questionColumn}>
                    {quizData.map((item, index) => (
                        <QuestionSection
                            key={index}
                            title={item.title}
                            question={item.question}
                        />
                    ))}
                    <Button
                        className={s.button}
                        onClick={() => router.push("/analysis")}
                    ><Typo.MD color="inverted">제출</Typo.MD></Button>
                </VStack>
            </div>
        </>
    )

}
