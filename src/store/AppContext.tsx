import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, WorkoutLog } from '../types';
import { AppContext } from './useApp';
import { DEFAULT_DEMO_USER, generateDemoWorkoutLogs } from '../data/demoData';
import { CHAT_ROOMS, INITIAL_CHAT_MESSAGES, SIMULATED_REPLIES } from '../data/chatData';
import { ARTICLES } from '../data/articles';

import { generatePersonalizedPlan, getExerciseForDay } from '../lib/planGenerator';
import { todayKey, validDate } from '../lib/dates';
import { emptyDemo, loadDemo, normalizeProfile, normalizeLog, isAlarm, STORAGE_KEY } from '../lib/persistence';
import type { DemoData } from '../lib/persistence';

export function AppProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => {
    try { return loadDemo(window.localStorage); } catch { return { data: emptyDemo(), notice: 'Armazenamento indisponível. Esta sessão ficará apenas em memória.' }; }
  });
  const [data, setData] = useState(initial.data);
  const state = useRef(initial.data);
  const [storageNotice, setStorageNotice] = useState(initial.notice);
  const [todayDateStr, setToday] = useState(todayKey);
  const [selectedDateStr, setSelectedDateStr] = useState(todayDateStr);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const refresh = () => setToday(todayKey());
    const interval = setInterval(refresh, 60000);
    window.addEventListener('focus', refresh);
    return () => { clearInterval(interval); window.removeEventListener('focus', refresh); timers.current.forEach(clearTimeout); };
  }, []);
  const user = data.user || DEFAULT_DEMO_USER;
  const activePlan = generatePersonalizedPlan(user);
  const commit = (next: DemoData) => {
    state.current = next; setData(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setStorageNotice(''); }
    catch { setStorageNotice('Não foi possível guardar no navegador. As alterações desta sessão estão apenas em memória.'); }
  };
  const clearReplies = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const getExerciseForDate = (date: string) => getExerciseForDay(activePlan, date, user.trimester, data.workoutLogs[date]?.exerciseId);
  const saveWorkoutLog = (log: WorkoutLog) => {
    const validated = normalizeLog(log, log.date);
    if (!validated || log.date > todayDateStr) return false;
    const profile = state.current.user || DEFAULT_DEMO_USER;
    const previous = state.current.workoutLogs[log.date];
    const exercise = getExerciseForDay(generatePersonalizedPlan(profile), log.date, profile.trimester, previous?.exerciseId);
    const preservingCompletion = previous?.completed && previous.exerciseId === validated.exerciseId;
    if (validated.completed && (isAlarm(validated) || !preservingCompletion && exercise?.id !== validated.exerciseId)) return false;
    commit({ ...state.current, workoutLogs: { ...state.current.workoutLogs, [log.date]: validated } });
    return true;
  };
  const toggleCompleteWorkout = (date: string, exerciseId: string) => {
    const current = state.current.workoutLogs[date];
    if (date > todayDateStr || !getExerciseForDate(date) || (current && isAlarm(current))) return;
    saveWorkoutLog({ date, exerciseId, completed: !current?.completed, symptoms: current?.symptoms || [], painLevel: current?.painLevel ?? null,
      difficultyLevel: current?.difficultyLevel ?? null, contractions: current?.contractions || 'nenhuma',
      actualReps: current?.actualReps ?? null, actualSets: current?.actualSets ?? null, notes: current?.notes, loggedAt: new Date().toISOString() });
  };
  const resetDemoData = () => {
    clearReplies();
    commit({ version: 2, user: { ...DEFAULT_DEMO_USER }, isDemoSession: true, hasCompletedOnboarding: true, workoutLogs: generateDemoWorkoutLogs(),
      chatMessages: structuredClone(INITIAL_CHAT_MESSAGES), favoriteArticleIds: ['art-1', 'art-3'] });
    setSelectedDateStr(todayKey());
  };
  const startDemoProfile = (name: string, email: string) => {
    const profile = normalizeProfile({ ...DEFAULT_DEMO_USER, name, email, complaints: [], clinicalFlags: [], goals: [], safetyScreening: 'unknown',
      pregnancyType: 'unknown', fetalPresentation: 'unknown', perinealAwareness: 'unknown' });
    if (!profile) return false;
    clearReplies();
    commit({ ...emptyDemo(), user: profile, isDemoSession: true });
    setSelectedDateStr(todayKey());
    return true;
  };
  const completeOnboarding = (profile: UserProfile) => {
    const normalized = normalizeProfile(profile);
    if (!normalized) return false;
    clearReplies(); commit({ ...state.current, user: normalized, hasCompletedOnboarding: true }); return true;
  };
  const sendChatMessage = (roomId: string, text: string) => {
    const clean = text.trim();
    if (!state.current.isDemoSession || !CHAT_ROOMS.some(r => r.id === roomId) || !clean || clean.length > 1000) return;
    const profile = state.current.user!;
    const message = { id: crypto.randomUUID(), roomId, senderName: profile.name, senderWeek: profile.week, avatarSeed: 'User', text: clean, timestamp: 'Agora', isCurrentUser: true };
    commit({ ...state.current, chatMessages: { ...state.current.chatMessages, [roomId]: [...(state.current.chatMessages[roomId] || []), message].slice(-200) } });
    const timer = setTimeout(() => {
      timers.current = timers.current.filter(t => t !== timer);
      const reply = { ...message, id: crypto.randomUUID(), senderName: 'Cláudia · exemplo', avatarSeed: 'Claudia', text: SIMULATED_REPLIES[Math.floor(Math.random() * SIMULATED_REPLIES.length)], isCurrentUser: false };
      commit({ ...state.current, chatMessages: { ...state.current.chatMessages, [roomId]: [...(state.current.chatMessages[roomId] || []), reply].slice(-200) } });
    }, 1500);
    timers.current.push(timer);
  };
  return <AppContext.Provider value={{
    user, hasSavedProfile: !!data.user, isDemoSession: data.isDemoSession, hasCompletedOnboarding: data.hasCompletedOnboarding,
    workoutLogs: data.workoutLogs, chatMessages: data.chatMessages, favoriteArticleIds: data.favoriteArticleIds, storageNotice,
    selectedDateStr, todayDateStr, activePlan,
    setSelectedDateStr: date => { if (validDate(date)) setSelectedDateStr(date); },
    startDemoProfile, resumeDemo: () => { if (state.current.user) commit({ ...state.current, isDemoSession: true }); },
    saveWorkoutLog, toggleCompleteWorkout, sendChatMessage,
    toggleFavoriteArticle: id => { if (ARTICLES.some(a => a.id === id)) commit({ ...state.current, favoriteArticleIds: state.current.favoriteArticleIds.includes(id) ? state.current.favoriteArticleIds.filter(a => a !== id) : [...state.current.favoriteArticleIds, id] }); },
    completeOnboarding, resetDemoData, logoutToAuth: () => { clearReplies(); commit({ ...state.current, isDemoSession: false }); }, getExerciseForDate,
  }}>{children}</AppContext.Provider>;
}


