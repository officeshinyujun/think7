# Think7 PRD (Development-Focused)

# 1. Product Overview

## 1.1 Product Name

Think7

## 1.2 Product Definition

AI 기반 사고력 훈련 앱.

사용자는 하루 1개의 텍스트를 읽고 문제를 풀며, AI가 사고력을 분석하여 리포트를 제공한다.

핵심 기능:

- 텍스트 읽기
- 문제 풀이
- AI 분석
- 사고력 리포트 제공
- 사고력 성장 추적

---

# 2. Core User Flow

Primary Flow:

```
Home
 → Today Content
 → Reading
 → Question Solving
 → Submit
 → AI Analysis
 → Report View
```

Secondary Flow:

```
Home
 → Report Tab
 → Past Reports
 → Detail Report
```

---

# 3. Frontend IA (Information Architecture)

# 3.1 Global Structure

Bottom Navigation

```
[ Home ] [ Report ] [ Profile ]
```

---

# 3.2 Screen Tree

```
App

├ Home
│ ├ Today Content Card
│ ├ Start Button
│ └ History Preview
│
├ Reading
│ ├ Content Text
│ ├ Progress Bar
│ └ Next Button
│
├ Question
│ ├ Question Card
│ ├ Answer Input
│ ├ Progress Indicator
│ └ Submit Button
│
├ Analysis Loading
│ └ Loading Animation
│
├ Report Detail
│ ├ Summary Score
│ ├ AI Feedback
│ ├ Strength/Weakness
│ ├ Question Analysis
│ └ Premium Locked Section
│
├ Report Tab
│ ├ Report List
│ ├ Weekly Summary
│ └ Monthly Summary
│
└ Profile
  ├ User Info
  ├ Subscription
  └ Settings
```

---

# 4. Screen-Level Spec

---

# 4.1 Home Screen

Purpose:

오늘 콘텐츠 시작

Components:

```
Header

Today's Content Card

- title
- topic
- difficulty
- estimated time

CTA Button:
Start Think7

Recent Report Preview
```

API:

GET /content/today

Response:

```
{
 id,
 title,
 topic,
 difficulty,
 estimated_time
}
```

---

# 4.2 Reading Screen

Components:

```
Reading Progress Bar

Content Text

Next Button
```

State:

```
scroll position
reading time
```

Tracking:

```
reading_duration
scroll_completion
```

---

# 4.3 Question Screen

Components:

```
Question Title

Question Type:

- subjective
- multiple choice

Answer Input

Next Button
```

Data:

```
questions[]
answers[]
```

---

# 4.4 Submit → Analysis

POST:

```
POST /analysis
```

Body:

```
{
 content_id,
 answers[]
}
```

Response:

```
analysis_id
```

---

# 4.5 Report Screen

Core Screen

---

Components Structure:

# Section 1 Summary

```
Think Score: 72

Level: Intermediate

Thinking Type:
Analytical
```

---

# Section 2 AI Feedback

Text Block

Example:

```
You identified the main argument correctly,
but missed implicit assumptions.
```

---

# Section 3 Strength / Weakness

Table

Example:

| Skill             | Score |
| ----------------- | ----- |
| Core Argument     | 90    |
| Inference         | 55    |
| Critical Thinking | 60    |
| Bias Detection    | 40    |

---

# Section 4 Question Analysis

List:

```
Question 1

Your Answer:
...

AI Feedback:
...
```

---

# Section 5 Premium Locked

Locked Content:

- Full cognitive profile
- Growth trend
- Comparison

UI:

```
Blur overlay

Unlock Button
```

---

# 4.6 Report Tab

Purpose:

history view

Components:

---

# Report List

```
Report Card

date
score
topic
```

---

# Weekly Summary

Chart:

Think Score Trend

---

# Monthly Summary

```
Average Score

Strength change

Weakness change
```

---

# 5. Data Model

---

# User

```
User

id
email
subscription
created_at
```

---

# Content

```
Content

id
title
body
difficulty
created_at
```

---

# Question

```
Question

id
content_id
type
question
```

---

# Answer

```
Answer

id
user_id
question_id
answer
```

---

# Analysis

```
Analysis

id
user_id
content_id

think_score

core_argument_score

inference_score

critical_score

bias_score

feedback_text

created_at
```

---

# 6. Premium Model

# Free

Access:

Today content

Basic report:

```
Think Score

Short feedback

Skill scores
```

---

# Premium

Access:

Full report

Includes:

```
Full cognitive profile

Detailed feedback

Growth tracking

Trend charts

Thinking type analysis

Weakness tracking
```

---

# 7. AI System Architecture

Flow:

```
User Answer

↓

Backend

↓

AI Analysis Service

↓

Analysis Result

↓

Store DB

↓

Return to client
```

---

# 8. Frontend Tech Recommendation

Recommended:

Framework:

React Native or Next.js

State:

Zustand

Data:

React Query

UI:

Tailwind

Chart:

Recharts

---

# 9. Backend Architecture

Recommended:

FastAPI (너 FastAPI 쓰는거 기억해서 추천)

Structure:

```
/routes

/content

/analysis

/report

/user
```

---

# 10. Key Metrics

Track:

```
Daily Active User

Completion Rate

Report View Rate

Premium Conversion

Retention
```

---

# 11. MVP Scope

Include:

Home

Reading

Question

Analysis

Report

Report List

Premium Lock

Exclude (Later):

Social

Community

Sharing

---

# 12. Priority Build Order

Recommended:

Step 1

Content

Question

Answer Submit

---

Step 2

AI Analysis

Report Screen

---

Step 3

Report Tab

History

---

Step 4

Premium Lock

Subscription

---

# 13. Future Expansion

AI Debate Mode

Thinking Training Course

User Thinking Profile

---

# 14. 핵심 개발 포인트 (중요)

이 앱의 본질은

Report Screen

이다.

90%의 가치는

AI 분석 결과 UI

에서 발생한다.

여기 UX에 가장 많은 시간 투자해야 함.

---

원하면

다음 단계로

Figma용 와이어프레임 구조도

실제 서비스급으로 만들어 줄게.
