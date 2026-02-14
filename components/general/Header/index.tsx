import { HStack } from "@/components/general/HStack";
import Typo from "@/components/general/Typo";
import Image from "next/image";

export default function Header() {
    return (
        <HStack align="center" justify="start" gap={10} >
            <Image src="/think7_Logo.png" alt="logo" width={24} height={24} />
            <Typo.MD
                color="primary"
                fontWeight="bold"
            >Think7</Typo.MD>
        </HStack>
    )
}