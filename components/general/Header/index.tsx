import { HStack } from "@/components/general/HStack";
import Typo from "@/components/general/Typo";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <HStack fullWidth justify="between" align="center">
            <HStack align="center" justify="start" gap={10} >
                <Image src="/think7_Logo.png" alt="logo" width={24} height={24} />
                <Typo.MD
                    color="primary"
                    fontWeight="bold"
                >Think7</Typo.MD>
            </HStack>
            {mounted && (
                <div 
                    onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    {theme === 'dark' ? <Moon size={20} color="var(--text-secondary)" /> : <Sun size={20} color="var(--text-secondary)" />}
                </div>
            )}
        </HStack>
    )
}