import type { ActivityLevel, ProfileType, UserProfile, Trimester } from '../types';
import { EXERCISES } from '../data/exercises';
import { trimesterFor, validDate, dateValue } from './dates';

export interface PlanGenerationInput {
  week: number; isFirstPregnancy: boolean; previousActivityLevel: ActivityLevel;
  complaints: string[]; clinicalFlags: string[]; goals: string[];
  safetyScreening?: UserProfile['safetyScreening'];
}
export interface GeneratedPlanResult {
  profileType: ProfileType; title: string; summary: string; clinicalSafetyAlert: string | null;
  recommendedDailyExercises: { dayOfWeek: number; dayName: string; exerciseId: string; focus: string; recommendedDuration: number }[];
  weeklyAdvice: string;
}
export function generatePersonalizedPlan(input: PlanGenerationInput): GeneratedPlanResult {
  const blocked = input.clinicalFlags.length > 0 || input.safetyScreening !== 'clear' || !Number.isInteger(input.week) || input.week < 1 || input.week > 42;
  const candidates = blocked ? [] : EXERCISES.filter(e => e.suitableTrimesters.includes(trimesterFor(input.week)));
  const priority = input.complaints.includes('dor lombar') ? 'ex-4' : input.complaints.includes('edemas') ? 'ex-7' : 'ex-1';
  candidates.sort((a, b) => Number(b.id === priority) - Number(a.id === priority));
  const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const recommendedDailyExercises = candidates.length ? Array.from({ length: 7 }, (_, i) => {
    const exercise = candidates[i % candidates.length];
    const dayOfWeek = (i + 1) % 7;
    return { dayOfWeek, dayName: dayNames[dayOfWeek], exerciseId: exercise.id, focus: exercise.category, recommendedDuration: exercise.durationMinutes };
  }) : [];
  return {
    profileType: blocked ? 'conservador' : 'suave',
    title: blocked ? 'Sugestões suspensas' : candidates.length ? 'Uma semana de movimento, ao teu ritmo' : 'Sem exercício disponível',
    summary: blocked ? 'A avaliação precisa de acompanhamento antes de apresentar sugestões.' : 'Rotação ilustrativa baseada no trimestre e nas respostas da avaliação. Não é uma prescrição clínica.',
    clinicalSafetyAlert: blocked ? 'Não inicies exercícios com base nesta aplicação. Contacta a tua equipa de saúde para esclarecer a avaliação.' : null,
    recommendedDailyExercises,
    weeklyAdvice: candidates.length < 7 ? 'O catálogo elegível é limitado; alguns movimentos podem repetir-se. Os movimentos excluídos não são usados para completar a semana.' : 'As sugestões e os tempos são exemplos académicos, a validar pela equipa de fisioterapia.',
  };
}


export function getExerciseForDay(plan: GeneratedPlanResult, date: string, trimester: Trimester, loggedExerciseId?: string) {
  if (!validDate(date) || plan.clinicalSafetyAlert || !plan.recommendedDailyExercises.length) return null;
  const id = loggedExerciseId || plan.recommendedDailyExercises.find(d => d.dayOfWeek === dateValue(date).getUTCDay())?.exerciseId;
  const exercise = EXERCISES.find(e => e.id === id);
  return exercise?.suitableTrimesters.includes(trimester) ? exercise : null;
}
