// Tipos de dados centrais da aplicação CatUni Materna

export type Trimester = 1 | 2 | 3;

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'high';

export type ProfileType = 'suave' | 'moderado' | 'conservador';

export interface UserProfile {
  name: string;
  email: string;
  week: number; // Semanas de gestação (ex: 24)
  trimester: Trimester;
  isFirstPregnancy: boolean;
  previousActivityLevel: ActivityLevel;
  complaints: string[]; // Queixas atuais (dor lombar, edemas, etc.)
  clinicalFlags: string[]; // Fatores de risco / contraindicações
  goals: string[]; // Objetivos principais
  profileType: ProfileType;
  planId: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'Pavimento Pélvico' | 'Mobilidade' | 'Força Suave' | 'Respiração' | 'Postura';
  durationMinutes: number;
  suggestedReps: string;
  suggestedSets: string;
  difficultyLevel: 'Muito Suave' | 'Suave' | 'Moderado';
  suitableTrimesters: Trimester[];
  targetAreas: string[];
  shortDescription: string;
  detailedInstructions: string[];
  breathingFocus: string;
  safetyCaution: string;
  illustrationKey: 'breathing' | 'pelvic_floor' | 'pilates_ball' | 'cat_camel' | 'glute_bridge' | 'supported_squat' | 'walking' | 'chest_stretch';
  videoDemoUrl: string;
}

export interface WorkoutLog {
  date: string; // Formato YYYY-MM-DD
  completed: boolean;
  exerciseId: string;
  symptoms: string[];
  painLevel: number; // 0 a 10
  difficultyLevel: number; // 0 a 10
  contractions: 'nenhuma' | 'ocasionais' | 'regulares';
  actualReps: number;
  actualSets: number;
  notes?: string;
  loggedAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Exercício' | 'Pavimento pélvico' | 'Trimestres' | 'Saúde mental' | 'Alívio da dor';
  readTimeMinutes: number;
  source: string;
  date: string;
  summary: string;
  objective: string;
  methods: string;
  conclusion: string;
  practicalTips: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  author: string;
  week: number;
  location: string;
  title: string;
  excerpt: string;
  fullStory: string;
  likesCount: number;
  theme: string;
  avatarSeed: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderName: string;
  senderWeek: number;
  avatarSeed: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tag: string;
}
