import { UserProfile, WorkoutLog } from '../types';

export const DEFAULT_DEMO_USER: UserProfile = {
  name: 'Rita Henriques',
  email: 'rita.exemplo@catuni.pt',
  week: 24,
  trimester: 2,
  isFirstPregnancy: true,
  previousActivityLevel: 'moderate',
  complaints: ['dor lombar', 'cansaço', 'pernas pesadas'],
  clinicalFlags: [], // Gravidez sem contraindicações
  goals: ['Aliviar dor lombar e rigidez', 'Fortalecer o pavimento pélvico', 'Manter mobilidade para o parto'],
  profileType: 'moderado',
  planId: 'plan-moderado-t2'
};

// Gera 14 dias de histórico com tendência decrescente de dor
export function generateDemoWorkoutLogs(): Record<string, WorkoutLog> {
  const logs: Record<string, WorkoutLog> = {};
  const today = new Date();

  // Dados dos últimos 14 dias (mostra dor a descer de 6 para 2-3)
  const pastDaysData = [
    { offset: 13, exId: 'ex-4', completed: true, pain: 6, diff: 5, symptoms: ['dor lombar', 'tensão'], contr: 'nenhuma' as const, reps: 8, sets: 2 },
    { offset: 12, exId: 'ex-1', completed: true, pain: 6, diff: 4, symptoms: ['cansaço'], contr: 'nenhuma' as const, reps: 10, sets: 2 },
    { offset: 11, exId: 'ex-3', completed: true, pain: 5, diff: 4, symptoms: ['dor lombar'], contr: 'nenhuma' as const, reps: 10, sets: 2 },
    { offset: 10, exId: 'ex-2', completed: false, pain: 5, diff: 5, symptoms: ['fadiga'], contr: 'nenhuma' as const, reps: 0, sets: 0 },
    { offset: 9, exId: 'ex-7', completed: true, pain: 5, diff: 3, symptoms: ['pernas pesadas'], contr: 'nenhuma' as const, reps: 15, sets: 1 },
    { offset: 8, exId: 'ex-4', completed: true, pain: 4, diff: 4, symptoms: ['dor lombar ligeira'], contr: 'nenhuma' as const, reps: 8, sets: 2 },
    { offset: 7, exId: 'ex-5', completed: true, pain: 4, diff: 4, symptoms: [], contr: 'nenhuma' as const, reps: 8, sets: 2 },
    { offset: 6, exId: 'ex-3', completed: true, pain: 4, diff: 3, symptoms: ['rigidez matinal'], contr: 'nenhuma' as const, reps: 10, sets: 2 },
    { offset: 5, exId: 'ex-1', completed: true, pain: 3, diff: 3, symptoms: [], contr: 'nenhuma' as const, reps: 12, sets: 2 },
    { offset: 4, exId: 'ex-2', completed: true, pain: 3, diff: 3, symptoms: [], contr: 'nenhuma' as const, reps: 8, sets: 2 },
    { offset: 3, exId: 'ex-6', completed: true, pain: 3, diff: 4, symptoms: ['fadiga ligeira'], contr: 'nenhuma' as const, reps: 8, sets: 2 },
    { offset: 2, exId: 'ex-4', completed: true, pain: 2, diff: 3, symptoms: [], contr: 'nenhuma' as const, reps: 10, sets: 2 },
    { offset: 1, exId: 'ex-3', completed: true, pain: 2, diff: 3, symptoms: [], contr: 'nenhuma' as const, reps: 10, sets: 2 },
    { offset: 0, exId: 'ex-2', completed: false, pain: 2, diff: 3, symptoms: [], contr: 'nenhuma' as const, reps: 8, sets: 2 }, // Hoje (pendente)
  ];

  pastDaysData.forEach(item => {
    const d = new Date(today);
    d.setDate(d.getDate() - item.offset);
    const dateStr = d.toISOString().split('T')[0];

    logs[dateStr] = {
      date: dateStr,
      completed: item.completed,
      exerciseId: item.exId,
      symptoms: item.symptoms,
      painLevel: item.pain,
      difficultyLevel: item.diff,
      contractions: item.contr,
      actualReps: item.reps,
      actualSets: item.sets,
      notes: item.completed ? 'Treino realizado conforme recomendação.' : 'Dia de descanso.',
      loggedAt: new Date(d.getTime() + 10 * 3600 * 1000).toISOString()
    };
  });

  return logs;
}
