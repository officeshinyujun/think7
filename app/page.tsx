'use client'

import Image from "next/image";
import s from "./page.module.scss";
import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import Header from "@/components/general/Header";
import StricSection from "@/components/main/Stric/StricSection";
import IssueSection from "@/components/main/Issue/IssueSection";
import ThinkSection from "@/components/main/Think/ThinkSection";
import BottomBar from "@/components/general/BottomBar";
import ReportPreview from "@/components/main/ReportPreview";
import GrowthChart from "@/components/main/GrowthChart";
import Sidebar from "@/components/general/Sidebar";

export default function Home() {

  const dummyData = {
    strict: {
      strictDay: 28,
      thisWeek:[
        {
          day : "21일",
          strict : true
        },
        {
          day : "22일",
          strict : true
        },
        {
          day : "23일",
          strict : true
        },
        {
          day : "24일",
          strict : true
        },
        {
          day : "25일",
          strict : true
        },
        {
          day : "26일",
          strict : false
        },
        {
          day : "27일",
          strict : false
        }
      ]
    },
    issue : {
      editor : "김민준",
      title : "AI가 세상을 지배할까?"
    }
  }

  return (
    <div className={s.container}>
      <Sidebar />
      
      <div className={s.desktopContent}>
          <div className={s.mobileHeader}>
            <Header />
          </div>

          <VStack className={s.gridContainer} gap={24}>
            <IssueSection
                editor={dummyData.issue.editor}
                title={dummyData.issue.title}
            />
            <GrowthChart />
            <StricSection
                strictDay={dummyData.strict.strictDay}
                thisWeek={dummyData.strict.thisWeek}
            />
            <ReportPreview />
          </VStack>

          <div className={s.mobileBottomBar}>
            <BottomBar /> 
          </div>
      </div>
    </div>    
  );

}
