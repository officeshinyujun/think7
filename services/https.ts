import axios, { AxiosResponse } from 'axios';

// Interfaces aligned with actual backend implementation

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MULTIPLE_CHOICE' | 'SUBJECTIVE';
export type SubscriptionPlan = 'FREE' | 'PREMIUM';
export type AuthProvider = 'EMAIL' | 'GOOGLE';

export interface Question {
  id: string;
  type: QuestionType;
  question_text: string; // Aligned with Content entity
  options?: any; // Content entity says nothing about options type in relation, but DB usually JSON.
}

export interface Content {
  id: string;
  title: string;
  topic: string;
  editor: string;
  body: string;
  difficulty: Difficulty;
  estimated_time: number;
  is_premium: boolean;
  questions: Question[];
  thumbnail_image?: string;
  published_date: string;
  created_at: string;
}

export interface AnswerSubmission {
  question_id: string;
  answer_text: string;
}

export interface AnalysisRequest {
  userId: string; // Required by Backend
  contentId: string;
  answers: AnswerSubmission[];
}

export interface AnalysisSummary {
  score: number;
  comment: string;
}

export interface DimensionScore {
  dimension: string;
  score: number;
  status: string;
  comment: string;
}

export interface ThinkingType {
  type: string;
  description: string;
  strength: string;
  weakness: string;
}

export interface GrowthFeedback {
  previous_average_score: number;
  current_score: number;
  trend: string;
  comment: string;
}

export interface WrongAnswer {
  number: number;
  question: string;
  wrong_answer: string;
  correct_answer: string;
  relevant_part: string;
  explanation: string;
}

// Analysis Entity from backend
export interface AnalysisReport {
  id: string;
  user_id: string;
  content_id: string;
  day: string;
  summary: AnalysisSummary;
  dimension_scores: DimensionScore[];
  thinking_type: ThinkingType;
  growth: GrowthFeedback;
  wrong_answer: WrongAnswer[];
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  subscription_plan: SubscriptionPlan;
  subscription_expires_at?: string;
  profile_image?: string;
  auth_provider?: AuthProvider;
}

// Axios Instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('think7_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface AuthResponse {
  user: User;
  token: string;
}

// API Service Object
export const https = {
  auth: {
    signup: async (email: string, password: string): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/auth/signup', { email, password });
      return response.data;
    },
    login: async (email: string, password: string): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
      return response.data;
    },
    googleLogin: async (firebaseToken: string): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/auth/google', { firebaseToken });
      return response.data;
    },
    changePassword: async (userId: string, currentPassword: string, newPassword: string): Promise<{ message: string }> => {
      const response = await apiClient.patch<{ message: string }>('/auth/change-password', { userId, currentPassword, newPassword });
      return response.data;
    },
    setPassword: async (userId: string, newPassword: string): Promise<{ message: string }> => {
      const response = await apiClient.patch<{ message: string }>('/auth/set-password', { userId, newPassword });
      return response.data;
    },
    deleteAccount: async (userId: string): Promise<{ message: string }> => {
      const response = await apiClient.delete<{ message: string }>('/auth/account', { params: { userId } });
      return response.data;
    },
  },
  content: {
    getToday: async (): Promise<Content> => {
      const response = await apiClient.get<Content>('/content/today');
      return response.data;
    },
    get: async (id: string): Promise<Content> => {
      const response = await apiClient.get<Content>(`/content/${id}`);
      return response.data;
    },
    getLibrary: async (topic?: string): Promise<Content[]> => {
      const response = await apiClient.get<Content[]>('/content/library', {
        params: topic ? { topic } : {},
      });
      return response.data;
    },
    generate: async (topic: string, type?: string): Promise<Content> => {
      const response = await apiClient.post<Content>('/content/generate', { topic, type });
      return response.data;
    },
  },
  analysis: {
    submit: async (data: AnalysisRequest): Promise<AnalysisReport> => {
      const response = await apiClient.post<AnalysisReport>('/analysis', data);
      return response.data;
    },
  },
  report: {
    get: async (id: string): Promise<AnalysisReport> => {
      const response = await apiClient.get<AnalysisReport>(`/report/${id}`);
      return response.data;
    },
    getHistory: async (userId: string): Promise<AnalysisReport[]> => {
      const response = await apiClient.get<AnalysisReport[]>('/report', {
        params: { userId },
      });
      return response.data;
    },
    deleteAll: async (userId: string): Promise<{ deleted: number }> => {
      const response = await apiClient.delete<{ deleted: number }>('/report', { params: { userId } });
      return response.data;
    },
  },
  user: {
    get: async (id: string): Promise<User> => {
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    },
  },
};

export default https;
