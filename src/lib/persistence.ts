import type { ChatMessage, UserProfile, WorkoutLog } from '../types';
import { EXERCISES } from '../data/exercises';
import { ARTICLES } from '../data/articles';
import { CHAT_ROOMS } from '../data/chatData';
import { trimesterFor, validDate } from './dates';

export const STORAGE_KEY = 'catuni_maternal_demo_v2';
export interface DemoData {
  version: 2; user: UserProfile | null; hasCompletedOnboarding: boolean; isDemoSession: boolean;
  workoutLogs: Record<string, WorkoutLog>; chatMessages: Record<string, ChatMessage[]>; favoriteArticleIds: string[];
}
export const emptyDemo = (): DemoData => ({ version: 2, user: null, hasCompletedOnboarding: false, isDemoSession: false, workoutLogs: {}, chatMessages: {}, favoriteArticleIds: [] });
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown, max: number): v is string => typeof v === 'string' && v.length <= max;
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.length <= 30 && v.every(s => text(s, 150));
const optionalNumber = (v: unknown, max: number) => v == null || typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= max;

export function normalizeProfile(value: unknown): UserProfile | null {
  if (!record(value) || !text(value.name, 80) || !value.name.trim() || !text(value.email, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) ||
      !Number.isInteger(value.week) || Number(value.week) < 1 || Number(value.week) > 42 || typeof value.isFirstPregnancy !== 'boolean' ||
      !['sedentary', 'light', 'moderate', 'high'].includes(String(value.previousActivityLevel)) ||
      !strings(value.complaints) || !strings(value.clinicalFlags) || !strings(value.goals)) return null;
  const days = value.gestationalDays ?? 0, births = value.previousBirths ?? 0;
  if (!Number.isInteger(days) || Number(days) < 0 || Number(days) > 6 || !Number.isInteger(births) || Number(births) < 0 || Number(births) > 20) return null;
  const pregnancyType = value.pregnancyType ?? 'unknown', fetalPresentation = value.fetalPresentation ?? 'unknown';
  const safetyScreening = value.safetyScreening ?? 'unknown', perinealAwareness = value.perinealAwareness ?? 'unknown';
  if (!['single', 'twins', 'unknown'].includes(String(pregnancyType)) || !['cephalic', 'breech', 'transverse', 'unknown'].includes(String(fetalPresentation)) ||
      !['clear', 'flagged', 'unknown'].includes(String(safetyScreening)) || !['yes', 'no', 'unknown'].includes(String(perinealAwareness))) return null;
  return {
    name: value.name.trim(), email: value.email.trim(), week: Number(value.week), gestationalDays: Number(days), trimester: trimesterFor(Number(value.week)),
    isFirstPregnancy: value.isFirstPregnancy, previousActivityLevel: value.previousActivityLevel as UserProfile['previousActivityLevel'],
    complaints: value.complaints, clinicalFlags: value.clinicalFlags, goals: value.goals, previousBirths: Number(births),
    pregnancyType: pregnancyType as UserProfile['pregnancyType'], fetalPresentation: fetalPresentation as UserProfile['fetalPresentation'],
    safetyScreening: value.clinicalFlags.length ? 'flagged' : safetyScreening as UserProfile['safetyScreening'],
    perinealAwareness: perinealAwareness as UserProfile['perinealAwareness'],
    profileType: value.profileType === 'moderado' ? 'moderado' : value.profileType === 'conservador' ? 'conservador' : 'suave',
    planId: text(value.planId, 100) ? value.planId : 'demo',
  };
}
export function normalizeLog(value: unknown, key: string): WorkoutLog | null {
  if (!record(value) || !validDate(key) || value.date !== key || typeof value.completed !== 'boolean' || !strings(value.symptoms) ||
      !['nenhuma', 'ocasionais', 'regulares'].includes(String(value.contractions)) || !text(value.exerciseId, 40) ||
      value.exerciseId !== '' && !EXERCISES.some(e => e.id === value.exerciseId) ||
      !optionalNumber(value.painLevel, 10) || !optionalNumber(value.difficultyLevel, 10) ||
      !optionalNumber(value.actualReps, 1000) || !optionalNumber(value.actualSets, 100) ||
      value.actualReps != null && !Number.isInteger(value.actualReps) || value.actualSets != null && !Number.isInteger(value.actualSets) ||
      !text(value.loggedAt, 40) || !Number.isFinite(Date.parse(value.loggedAt)) || value.notes != null && !text(value.notes, 1000)) return null;
  return {
    date: key, completed: value.completed, exerciseId: value.exerciseId, symptoms: value.symptoms,
    contractions: value.contractions as WorkoutLog['contractions'], painLevel: value.painLevel as number ?? null,
    difficultyLevel: value.difficultyLevel as number ?? null, actualReps: value.actualReps as number ?? null,
    actualSets: value.actualSets as number ?? null, notes: value.notes as string | undefined, loggedAt: value.loggedAt,
  };
}
export function isAlarm(log: Pick<WorkoutLog, 'painLevel' | 'contractions' | 'symptoms'>): boolean {
  return (log.painLevel ?? 0) >= 7 || log.contractions === 'regulares' || log.symptoms.some(s => ['perdas de sangue ou líquido', 'tonturas ou falta de ar'].includes(s));
}

export function loadDemo(storage: Pick<Storage, 'getItem'>): { data: DemoData; notice: string } {
  const data = emptyDemo();
  try {
    const saved = storage.getItem(STORAGE_KEY);
    const legacyUser = saved ? null : storage.getItem('catuni_maternal_app_v1_user');
    if (!saved && !legacyUser) return { data, notice: '' };
    const raw = saved ? JSON.parse(saved) : {
      user: JSON.parse(legacyUser!), hasCompletedOnboarding: storage.getItem('catuni_maternal_app_v1_onboarded') === 'true',
      workoutLogs: JSON.parse(storage.getItem('catuni_maternal_app_v1_logs') || '{}'),
      chatMessages: JSON.parse(storage.getItem('catuni_maternal_app_v1_chats') || '{}'),
      favoriteArticleIds: JSON.parse(storage.getItem('catuni_maternal_app_v1_favs') || '[]'),
    };
    if (!record(raw) || saved && raw.version !== 2) throw new Error('schema');
    data.user = normalizeProfile(raw.user);
    if (raw.user !== null && !data.user) throw new Error('profile');
    data.hasCompletedOnboarding = !!data.user && raw.hasCompletedOnboarding === true;
    data.isDemoSession = !!data.user && raw.isDemoSession === true;
    let invalid = false;
    if (!record(raw.workoutLogs) || !record(raw.chatMessages) || !strings(raw.favoriteArticleIds)) throw new Error('state');
    for (const [key, value] of Object.entries(raw.workoutLogs)) {
      const log = normalizeLog(value, key);
      if (log) data.workoutLogs[key] = log; else invalid = true;
    }
    for (const room of CHAT_ROOMS) {
      const messages = raw.chatMessages[room.id];
      if (messages === undefined) continue;
      if (!Array.isArray(messages)) { invalid = true; continue; }
      data.chatMessages[room.id] = messages.filter((m): m is ChatMessage => {
        const valid = record(m) && text(m.id, 100) && m.roomId === room.id && text(m.text, 1000) && text(m.senderName, 80) &&
          typeof m.senderWeek === 'number' && m.senderWeek >= 1 && m.senderWeek <= 42 && text(m.avatarSeed, 80) &&
          text(m.timestamp, 80) && typeof m.isCurrentUser === 'boolean';
        if (!valid) invalid = true;
        return valid;
      }).slice(-200);
    }
    data.favoriteArticleIds = raw.favoriteArticleIds.filter(id => ARTICLES.some(a => a.id === id));
    return { data, notice: invalid ? 'Alguns registos inválidos não puderam ser recuperados. Os restantes foram mantidos; a cópia anterior não foi apagada.' : '' };
  } catch {
    return { data: emptyDemo(), notice: 'Não foi possível ler os dados locais. A cópia anterior não foi apagada. Podes explorar o exemplo ou criar um perfil fictício.' };
  }
}

