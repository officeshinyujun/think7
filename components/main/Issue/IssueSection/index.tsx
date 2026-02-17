import Typo from "@/components/general/Typo";
import { VStack } from "@/components/general/VStack";
import s from "./style.module.scss"
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";

interface Props {
    editor : string;
    title : string;
    completed?: boolean;
}

export default function IssueSection({editor, title, completed}: Props) {
    const router = useRouter();
    return (
        <VStack fullWidth align="start" justify="center" className={s.container}gap={8} >
            <Typo.MD
                color="primary"
                fontWeight="medium"
            >오늘의 이슈</Typo.MD>
            <VStack fullWidth align="start" justify="center" gap={8} style={{padding:12}}>
                <Typo.XL
                    color="primary"
                    fontWeight="bold"
                >
                    {title}
                </Typo.XL>
                <Typo.XS
                    color="secondary"
                    fontWeight="regular"
                >
                    {editor} - 예상시간 7분
                </Typo.XS>
            </VStack>
            <Button
                className={s.button}
                onClick={() => !completed && router.push("/article")}
                style={completed ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
                <Typo.MD
                    color="inverted"
                    fontWeight="medium"
                >{completed ? '완료' : '하러가기'}</Typo.MD>
            </Button>
        </VStack>
    )
}