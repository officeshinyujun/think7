import Typo from "@/components/general/Typo";
import { VStack } from "@/components/general/VStack";
import s from './style.module.scss';
import { Check } from "lucide-react";

interface StricCardProps {
    day : string;
    strict : boolean;
}

export default function StricCard({day, strict}: StricCardProps) {
    return (
        <VStack 
        align="center"
        justify="center"
        gap={6}
        className={s.container}
        >
            <Typo.XS
                color="secondary"
                fontWeight="medium"
            >{day}</Typo.XS>
            {strict ? (
                <VStack className={s.check} align="center" justify="center">
                    <Check size={16} color="#fdfdfe" />
                </VStack>
            ) : (
                <VStack className={s.uncheck} align="center" justify="center">
                    <Check size={16} color="#D9D9D9" />
                </VStack>
            )}
        </VStack>
    )
}