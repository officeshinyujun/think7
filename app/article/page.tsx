'use client'

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import Button from "@/components/general/Button";
import { ChevronLeft } from "lucide-react";
import { HStack } from "@/components/general/HStack";
import { useRouter } from "next/navigation";

export default function Article() {

    const router = useRouter();
    const dummyData = {
        title : "“석주는 관하여”",
        editor : "NBM 정여진 기자",
        content : "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum."
    }

    return (
        <VStack fullWidth align="start" justify="start" className={s.container} gap={16}>
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
                    >
                        이전으로
                    </Typo.SM>
                </HStack>
                <Typo.SM
                    color="secondary"
                    fontWeight="medium"
                >{dummyData.editor}</Typo.SM>
            </VStack>
            <Typo.MD    
                color="primary"
                fontWeight="regular"
            >{dummyData.content}</Typo.MD>
            <div style={{width:"100%", minHeight:"100px"}}/>
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
        </VStack>
    )
}