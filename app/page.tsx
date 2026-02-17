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
import { https } from "@/services/https";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [reportHistory, setReportHistory] = useState<any[]>([]);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    const fetchData = async () => {
      try {
        const [todayContent, profile, history] = await Promise.all([
          https.content.getToday().catch(() => null),
          https.user.get(user.id).catch(() => null),
          https.report.getHistory(user.id).catch(() => [])
        ]);

        setContent(todayContent);
        setUserProfile(profile);
        setReportHistory(history);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [user, isLoading]);

  // Calculate streak and weekly activity from report history
  const calculateStreak = (reports: any[]) => {
    if (reports.length === 0) return 0;
    const dates = [...new Set(reports.map((r: any) => r.day))].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Check if the latest report is today or yesterday
    if (dates[0] !== today && dates[0] !== yesterday) return 0;
    
    let streak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
      const current = new Date(dates[i]);
      const prev = new Date(dates[i + 1]);
      const diff = (current.getTime() - prev.getTime()) / 86400000;
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  };

  const getThisWeek = (reports: any[]) => {
    const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=일, 1=월, ...
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
    
    const reportDates = new Set(reports.map((r: any) => r.day));
    
    return dayLabels.map((label, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      return { day: label, strict: reportDates.has(dateStr) };
    });
  };

  const streakDays = calculateStreak(reportHistory);
  const thisWeek = getThisWeek(reportHistory);
  const todayCompleted = reportHistory.some((r: any) => r.day === new Date().toISOString().split('T')[0]);

  // Transform ReportHistory to GrowthChart data
  const growthData = reportHistory.map((r: any) => ({
    day: r.day.slice(5),
    score: r.summary.score
  })).slice(-7);

  // Latest Report
  const latestReport = reportHistory.length > 0 ? {
     id: reportHistory[reportHistory.length - 1].id,
     date: reportHistory[reportHistory.length - 1].day,
     topic: content?.title || "최근 리포트",
     score: reportHistory[reportHistory.length - 1].summary.score,
     feedback: reportHistory[reportHistory.length - 1].summary.comment
  } : null;

  return (
    <div className={s.container}>
      <Sidebar />
      
      <div className={s.desktopContent}>
          <div className={s.mobileHeader}>
            <Header />
          </div>

          <VStack className={s.gridContainer} gap={24}>
            <IssueSection
                editor={content?.editor || "불러오는 중..."}
                title={content?.title || "오늘의 콘텐츠를 불러오고 있습니다."}
                completed={todayCompleted}
            />
            <GrowthChart 
                data={growthData}
                growthRate={0}
            />
            <StricSection
                strictDay={streakDays}
                thisWeek={thisWeek}
            />
            <ReportPreview report={latestReport} />
          </VStack>

          <div className={s.mobileBottomBar}>
            <BottomBar /> 
          </div>
      </div>
    </div>    
  );

}
