import { createContext, useContext } from 'react';
import type { UserProfile, WorkoutLog, ChatMessage, Exercise } from '../types';
import type { GeneratedPlanResult } from '../lib/planGenerator';

interface AppContextType {
  user: UserProfile; hasSavedProfile: boolean; isDemoSession: boolean; hasCompletedOnboarding: boolean;
  workoutLogs: Record<string, WorkoutLog>; chatMessages: Record<string, ChatMessage[]>; favoriteArticleIds: string[];
  selectedDateStr: string; todayDateStr: string; activePlan: GeneratedPlanResult; storageNotice: string;
  setSelectedDateStr: (date: string) => void;
  startDemoProfile: (name: string, email: string) => boolean;
  resumeDemo: () => void;
  saveWorkoutLog: (log: WorkoutLog) => boolean;
  toggleCompleteWorkout: (date: string, exerciseId: string) => void;
  sendChatMessage: (room: string, text: string) => void;
  toggleFavoriteArticle: (id: string) => void;
  completeOnboarding: (profile: UserProfile) => boolean;
  resetDemoData: () => void; logoutToAuth: () => void;
  getExerciseForDate: (date: string) => Exercise | null;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp requires AppProvider');
  return context;
}

