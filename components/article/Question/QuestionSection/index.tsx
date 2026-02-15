import Typo from '@/components/general/Typo'
import s from './style.module.scss'
import { VStack } from "@/components/general/VStack"
import QuestionBar from '../QuestionBar'
import { useState } from 'react'

interface Props {
    title : string;
    question : {
        number : number;
        content : string;
    }[]
}

export default function QuestionSection({title, question}: Props) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <VStack fullWidth align="start" justify="start" className={s.container} gap={10}>
            <Typo.MD
                color="primary"
                fontWeight="semi-bold"
            >{title}</Typo.MD>
            <VStack gap={8} align='start' justify='start'>
            {question.map((item, index) => (
                <QuestionBar
                    key={index}
                    content={item.content}
                    number={item.number}
                    isSelected={selected === item.number}
                    onClick={() => setSelected(item.number)}
                />
            ))}
            </VStack>
        </VStack>
    )
}