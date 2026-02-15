import { HStack } from '@/components/general/HStack'
import s from './style.module.scss'
import Typo from '@/components/general/Typo'
import cs from 'classnames'

interface Props {
    content : string;
    number : number;   
    isSelected?: boolean;
    onClick?: () => void;
}

export default function QuestionBar({content, number, isSelected, onClick}: Props) {
    return (
        <HStack fullWidth align='center' justify='start' gap={8} className={s.container} onClick={onClick}>
            <HStack align='center' justify='center' gap={4} className={cs(s.number, isSelected && s.active)}>
                <Typo.XS
                    color={isSelected ? "inverted" : "inverted"}
                    fontWeight="medium"
                >{number}</Typo.XS>
            </HStack>
            <Typo.XS
                color="primary"
                fontWeight="regular"
            >{content}</Typo.XS>
        </HStack>
    )
}