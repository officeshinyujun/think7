'use client';

import { VStack } from "@/components/general/VStack";
import { HStack } from "@/components/general/HStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import BottomBar from "@/components/general/BottomBar";
import Header from "@/components/general/Header";
import Section from "@/components/record/Section";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/general/Sidebar";
import { https } from "@/services/https";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";


export default function Report() {
    const router = useRouter();
    const { user } = useAuth();
    const [reports, setReports] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        https.report.getHistory(user.id)
            .then(res => setReports(res))
            .catch(err => console.error(err));
    }, [user]);

    return (
        <HStack fullWidth align="start" justify="start" className={s.container}>
            <Sidebar />

            <div className={s.pageContent}>
                <div className={s.mobileHeader}>
                    <Header/>
                </div>

                <VStack fullWidth align="start" justify="start" gap={16} className={s.gridContainer}>
                    <Typo.XL color="primary" fontWeight="bold" style={{ height: 36, display: 'flex', alignItems: 'center' }}>리포트</Typo.XL>

                    <div className={s.reportListWrapper}>
                        {reports.map((item, index) => (
                            <div key={item.id} style={{width: '100%', cursor: 'pointer'}} onClick={() => router.push(`/report/${item.id}`)}>
                                <Section title={item.day}>
                                    <Typo.MD color="primary" fontWeight="semi-bold">{item.summary?.comment || `종합 점수: ${item.summary?.score ?? 0}점`}</Typo.MD>
                                </Section>
                            </div>
                        ))}
                        {reports.length === 0 && (
                             <div style={{padding: 20, textAlign: 'center'}}>
                                <Typo.MD color="secondary" fontWeight="medium">아직 리포트가 없습니다.</Typo.MD>
                             </div>
                        )}
                    </div>
                </VStack>
            </div>
            
            <div className={s.mobileBottomBar}>
                <BottomBar/>
            </div>
        </HStack>
    )
}