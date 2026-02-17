'use client';

import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import s from "./style.module.scss";
import { HStack } from "@/components/general/HStack";
import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface GrowthData {
    day: string;
    score: number;
}

interface Props {
    data: GrowthData[];
    growthRate?: number; // Optional percentage
}

export default function GrowthChart({ data, growthRate = 0 }: Props) {

    return (
        <VStack fullWidth align="start" justify="start" className={s.container}>
            <HStack fullWidth justify="between" align="center" className={s.header}>
                <HStack gap={8} align="center">
                    <TrendingUp size={20} color="#3D7BFF" />
                    <Typo.MD color="primary" fontWeight="bold">사고력 성장</Typo.MD>
                </HStack>
                <div style={{padding: '4px 8px', backgroundColor: '#F3F3F7', borderRadius: '8px'}}>
                    <Typo.XS color="brand" fontWeight="bold">+{growthRate}% 성장</Typo.XS>
                </div>
            </HStack>

            <div className={s.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F3F7"/>
                        <XAxis 
                            dataKey="day" 
                            tick={{fill: '#8B847F', fontSize: 10}} 
                            axisLine={false} 
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis 
                            tick={{fill: '#8B847F', fontSize: 10}} 
                            axisLine={false} 
                            tickLine={false}
                            domain={[0, 100]}
                            hide={true}
                        />
                        <Tooltip 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                            itemStyle={{color: '#3D7BFF', fontWeight: 'bold'}}
                            labelStyle={{color: '#8B847F', display: 'none'}}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3D7BFF" 
                            strokeWidth={3} 
                            dot={{fill: '#3D7BFF', r: 4, strokeWidth: 0}}
                            activeDot={{r: 6, strokeWidth: 0}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </VStack>
    )
}
