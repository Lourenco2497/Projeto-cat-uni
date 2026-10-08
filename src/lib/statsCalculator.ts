import type { WorkoutLog } from '../types';
import { EXERCISES } from '../data/exercises';
import { addDays, formatDate, todayKey } from './dates';

export function calculateStats(logs: Record<string, WorkoutLog>, today = todayKey()) {
  const list = Object.values(logs).filter(l => l.date <= today).sort((a, b) => a.date.localeCompare(b.date));
  const last7 = list.filter(l => l.date >= addDays(today, -6));
  const previous7 = list.filter(l => l.date >= addDays(today, -13) && l.date < addDays(today, -6));
  const completed = list.filter(l => l.completed);
  const average = (items: WorkoutLog[]) => {
    const values = items.map(l => l.painLevel).filter((n): n is number => n !== null && n !== undefined);
    return values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length * 10) / 10 : null;
  };
  const avgPainPast7Days = average(last7), avgPainPrevious7Days = average(previous7);
  let streak = 0, day = logs[today]?.completed ? today : addDays(today, -1);
  while (logs[day]?.completed) { streak++; day = addDays(day, -1); }
  const weeklyCompleted = last7.filter(l => l.completed).length;
  const colors = { Mobilidade: '#78526f', Respiração: '#528373', 'Pavimento Pélvico': '#bf755f', 'Força Suave': '#493747' };
  const categoryDistributionChart = Object.entries(colors).map(([name, color]) => ({
    name, color, value: completed.filter(l => {
      const category = EXERCISES.find(e => e.id === l.exerciseId)?.category;
      return (category === 'Postura' ? 'Mobilidade' : category) === name;
    }).length,
  }));
  const painTrendText = avgPainPast7Days === null || avgPainPrevious7Days === null ? 'Ainda não há medições suficientes para comparar as duas semanas.' :
    `Dor média registada: ${avgPainPrevious7Days} → ${avgPainPast7Days} / 10. Esta comparação não identifica a causa da mudança.`;
  return {
    streak, totalCompleted: completed.length, weeklyCompleted, weeklyTarget: 5,
    weeklyRatePercentage: Math.min(100, Math.round(weeklyCompleted / 5 * 100)),
    avgPainPast7Days, avgPainPrevious7Days, painTrendText,
    simpleInsight: list.length ? `${weeklyCompleted} dias com exercício concluído nos últimos 7 dias. Registar como te sentes também faz parte do acompanhamento.` : 'O teu primeiro registo começa uma história. Ainda não há dados para analisar.',
    painVsDifficultyChart: Array.from({ length: 14 }, (_, i) => {
      const day = addDays(today, i - 13), log = list.find(l => l.date === day);
      return { dayLabel: formatDate(day, { day: 'numeric', month: 'numeric' }), dor: log?.painLevel ?? null, dificuldade: log?.difficultyLevel ?? null };
    }),
    weeklyWorkoutsChart: Array.from({ length: 4 }, (_, i) => {
      const end = addDays(today, -(3 - i) * 7), start = addDays(end, -6);
      return { weekLabel: formatDate(start, { day: 'numeric', month: 'numeric' }), treinos: completed.filter(l => l.date >= start && l.date <= end).length };
    }),
    categoryDistributionChart,
  };
}
export type CalculatedStats = ReturnType<typeof calculateStats>;
