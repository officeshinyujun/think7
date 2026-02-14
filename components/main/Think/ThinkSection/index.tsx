import { VStack } from "@/components/general/VStack";
import s from './style.module.scss';
import Typo from '@/components/general/Typo';

export default function ThinkSection() {
    return (
        <VStack fullWidth align="start" justify="center" className={s.container}gap={8} >
            <Typo.MD
                color="primary"
                fontWeight="medium"
            >최근 사고력 성장</Typo.MD>
        </VStack>
    )
}