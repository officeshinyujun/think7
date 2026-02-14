import Typo from "@/components/general/Typo";
import s from "./style.module.scss"
import { VStack } from "@/components/general/VStack";
import { HStack } from "@/components/general/HStack";
import StricCard from "../StricCard";

interface Props {
    strictDay: number;
    thisWeek: {
        day : string;
        strict : boolean;
    }[];
}

export default function StricSection({ strictDay, thisWeek }: Props) {
    return (
        <VStack fullWidth align="center" justify="center" className={s.container}gap={8} >
            <HStack align="center" justify="center" fullWidth gap={8}>
                <Typo.MD    
                    color="primary"
                    fontWeight="medium"
                >연속 학습</Typo.MD>
                <Typo.XL
                    color="brand"
                    fontWeight="bold"
                >{strictDay}일째</Typo.XL>
            </HStack>
            <HStack align="center" justify="between" fullWidth gap={10}>
                {thisWeek.map((item, index) => (
                    <StricCard
                        key={index}
                        day={item.day}
                        strict={item.strict}
                    />
                ))}
            </HStack>
        </VStack>
    )
}