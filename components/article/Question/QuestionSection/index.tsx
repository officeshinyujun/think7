import Typo from '@/components/general/Typo'
import s from './style.module.scss'
import { VStack } from "@/components/general/VStack"
import QuestionBar from '../QuestionBar'

interface Props {
    title : string;
    question : {
        number : number;
        content : string;
    }[];
    selected?: number | null;
    onSelect?: (number: number) => void;
}

export default function QuestionSection({title, question, selected, onSelect}: Props) {

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
                    onClick={() => onSelect && onSelect(item.number)}
                />
            ))}
            </VStack>
        </VStack>
    )
}