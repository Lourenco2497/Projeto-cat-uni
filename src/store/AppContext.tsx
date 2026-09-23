import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, WorkoutLog, ChatMessage } from '../types';
import { DEFAULT_DEMO_USER, generateDemoWorkoutLogs } from '../data/demoData';
import { INITIAL_CHAT_MESSAGES, SIMULATED_REPLIES } from '../data/chatData';
import { EXERCISES } from '../data/exercises';
import { generatePersonalizedPlan } from '../lib/planGenerator';

interface AppContextType {
  user: UserProfile;
  hasCompletedOnboarding: boolean;
  workoutLogs: Record<string, WorkoutLog>;
  chatMessages: Record<string, ChatMessage[]>;
  favoriteArticleIds: string[];
  selectedDateStr: string;
  todayDateStr: string;
  activePlan: ReturnType<typeof generatePersonalizedPlan>;
  setSelectedDateStr: (date: string) => void;
  saveWorkoutLog: (log: WorkoutLog) => void;
  toggleCompleteWorkout: (dateStr: string, exerciseId: string) => void;
  sendChatMessage: (roomId: string, text: string) => void;
  toggleFavoriteArticle: (articleId: string) => void;
  completeOnboarding: (profile: UserProfile) => void;
  resetDemoData: () => void;
  logoutToAuth: () => void;
  getExerciseForDate: (dateStr: string) => typeof EXERCISES[0];
}

const STORAGE_KEY = 'catuni_maternal_app_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const todayDateStr = getTodayStr();

  // Inicializa estado com persistência em localStorage ou dados de demonstração
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_DEMO_USER;
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_onboarded`);
    return saved !== null ? saved === 'true' : true; // Por defeito true para a apresentação abrir já funcional
  });

  const [workoutLogs, setWorkoutLogs] = useState<Record<string, WorkoutLog>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_logs`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return generateDemoWorkoutLogs();
  });

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_chats`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_CHAT_MESSAGES;
  });

  const [favoriteArticleIds, setFavoriteArticleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_favs`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return ['art-1', 'art-3'];
  });

  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayDateStr);

  // Guarda alterações no localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_onboarded`, String(hasCompletedOnboarding));
  }, [hasCompletedOnboarding]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_logs`, JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_chats`, JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_favs`, JSON.stringify(favoriteArticleIds));
  }, [favoriteArticleIds]);

  // Gera o plano ativo com base no perfil do utilizador
  const activePlan = generatePersonalizedPlan({
    week: user.week,
    isFirstPregnancy: user.isFirstPregnancy,
    previousActivityLevel: user.previousActivityLevel,
    complaints: user.complaints,
    clinicalFlags: user.clinicalFlags,
    goals: user.goals
  });

  // Retorna o exercício recomendado para uma data específica
  const getExerciseForDate = (dateStr: string) => {
    // Se já houver um registo com exerciseId, usa esse
    if (workoutLogs[dateStr]?.exerciseId) {
      const found = EXERCISES.find(e => e.id === workoutLogs[dateStr].exerciseId);
      if (found) return found;
    }

    // Caso contrário, busca o exercício do plano para o dia da semana correspondente
    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayOfWeek = dateObj.getDay(); // 0 = Dom, 1 = Seg, ...
    const planDay = activePlan.recommendedDailyExercises.find(d => d.dayOfWeek === dayOfWeek);

    if (planDay) {
      const ex = EXERCISES.find(e => e.id === planDay.exerciseId);
      if (ex) return ex;
    }

    return EXERCISES[0];
  };

  const saveWorkoutLog = (newLog: WorkoutLog) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [newLog.date]: newLog
    }));
  };

  const toggleCompleteWorkout = (dateStr: string, exerciseId: string) => {
    setWorkoutLogs(prev => {
      const current = prev[dateStr];
      const isCurrentlyCompleted = current ? current.completed : false;

      return {
        ...prev,
        [dateStr]: {
          date: dateStr,
          completed: !isCurrentlyCompleted,
          exerciseId: exerciseId || (current?.exerciseId || 'ex-1'),
          symptoms: current?.symptoms || [],
          painLevel: current?.painLevel ?? 2,
          difficultyLevel: current?.difficultyLevel ?? 3,
          contractions: current?.contractions || 'nenhuma',
          actualReps: current?.actualReps || 10,
          actualSets: current?.actualSets || 2,
          notes: current?.notes || 'Exercício concluído com sucesso.',
          loggedAt: new Date().toISOString()
        }
      };
    });
  };

  const sendChatMessage = (roomId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId,
      senderName: user.name || 'Rita',
      senderWeek: user.week || 24,
      avatarSeed: 'User',
      text,
      timestamp: 'Agora',
      isCurrentUser: true
    };

    setChatMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMessage]
    }));

    // Simula uma resposta calorosa e encorajadora da comunidade após 1.5s
    setTimeout(() => {
      const randomReply = SIMULATED_REPLIES[Math.floor(Math.random() * SIMULATED_REPLIES.length)];
      const peerMessage: ChatMessage = {
        id: `msg-sim-${Date.now()}`,
        roomId,
        senderName: 'Cláudia F.',
        senderWeek: Math.max(12, (user.week || 24) - 2),
        avatarSeed: 'ClaudiaF',
        text: randomReply,
        timestamp: 'Agora mesmo',
        isCurrentUser: false
      };

      setChatMessages(current => ({
        ...current,
        [roomId]: [...(current[roomId] || []), peerMessage]
      }));
    }, 1500);
  };

  const toggleFavoriteArticle = (articleId: string) => {
    setFavoriteArticleIds(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const completeOnboarding = (profile: UserProfile) => {
    setUser(profile);
    setHasCompletedOnboarding(true);
  };

  const resetDemoData = () => {
    setUser(DEFAULT_DEMO_USER);
    setHasCompletedOnboarding(true);
    setWorkoutLogs(generateDemoWorkoutLogs());
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setFavoriteArticleIds(['art-1', 'art-3']);
    setSelectedDateStr(todayDateStr);
  };

  const logoutToAuth = () => {
    setHasCompletedOnboarding(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        hasCompletedOnboarding,
        workoutLogs,
        chatMessages,
        favoriteArticleIds,
        selectedDateStr,
        todayDateStr,
        activePlan,
        setSelectedDateStr,
        saveWorkoutLog,
        toggleCompleteWorkout,
        sendChatMessage,
        toggleFavoriteArticle,
        completeOnboarding,
        resetDemoData,
        logoutToAuth,
        getExerciseForDate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
