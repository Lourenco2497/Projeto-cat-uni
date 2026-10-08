import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePersonalizedPlan } from '../src/lib/planGenerator.ts';
import { calculateStats } from '../src/lib/statsCalculator.ts';
import { EXERCISES } from '../src/data/exercises.ts';

const profile = { week: 34, isFirstPregnancy: true, previousActivityLevel: 'light', complaints: [], clinicalFlags: [], goals: [], safetyScreening: 'clear' };
const log = (date, extra = {}) => ({ date, completed: true, exerciseId: 'ex-1', symptoms: [], contractions: 'nenhuma', actualReps: null, actualSets: null, painLevel: null, difficultyLevel: null, loggedAt: '2026-10-08T12:00:00Z', ...extra });

test('contraindications suspend every exercise recommendation', () => {
  const plan = generatePersonalizedPlan({ ...profile, clinicalFlags: ['sangramento'] });
  assert.equal(plan.recommendedDailyExercises.length, 0);
  assert.ok(plan.clinicalSafetyAlert);
});
test('unknown screening does not authorize a plan', () => {
  assert.equal(generatePersonalizedPlan({ ...profile, safetyScreening: 'unknown' }).recommendedDailyExercises.length, 0);
});
test('third-trimester rotation has seven unique eligible IDs', () => {
  const days = generatePersonalizedPlan(profile).recommendedDailyExercises;
  assert.equal(days.length, 7);
  assert.equal(new Set(days.map(d => d.exerciseId)).size, 7);
  assert.ok(days.every(d => EXERCISES.find(e => e.id === d.exerciseId)?.suitableTrimesters.includes(3)));
});
test('weekly totals use seven calendar days, excluding old and future records', () => {
  const dates = ['2026-09-01', '2026-09-20', '2026-10-02', '2026-10-07', '2026-10-09'];
  const stats = calculateStats(Object.fromEntries(dates.map(d => [d, log(d)])), '2026-10-08');
  assert.equal(stats.weeklyCompleted, 2);
});
test('empty history never fabricates averages or category totals', () => {
  const stats = calculateStats({}, '2026-10-08');
  assert.equal(stats.avgPainPast7Days, null);
  assert.equal(stats.totalCompleted, 0);
  assert.ok(stats.categoryDistributionChart.every(c => c.value === 0));
});
test('completion without measurement does not contribute zero pain', () => {
  const stats = calculateStats({ a: log('2026-10-08'), b: log('2026-10-07', { painLevel: 6 }) }, '2026-10-08');
  assert.equal(stats.avgPainPast7Days, 6);
});
test('sparse chart records leave missing calendar days unmeasured', () => {
  const stats = calculateStats({ '2026-10-06': log('2026-10-06', { painLevel: 5 }), '2026-10-08': log('2026-10-08', { painLevel: 3 }) }, '2026-10-08');
  assert.equal(stats.painVsDifficultyChart.length, 14);
  const gap = stats.painVsDifficultyChart.at(-2);
  assert.equal(gap.dor, null);
  assert.equal(gap.dificuldade, null);
});
test('limited and empty catalogues never introduce excluded or invalid IDs', () => {
  const original = EXERCISES.slice();
  try {
    EXERCISES.splice(0, EXERCISES.length, original[0], original[1]);
    const rotation = generatePersonalizedPlan(profile);
    assert.equal(rotation.recommendedDailyExercises.length, 7);
    assert.ok(rotation.recommendedDailyExercises.every(d => ['ex-1', 'ex-2'].includes(d.exerciseId)));
    assert.match(rotation.weeklyAdvice, /limitado/);
    EXERCISES.splice(0, EXERCISES.length);
    assert.deepEqual(generatePersonalizedPlan(profile).recommendedDailyExercises, []);
  } finally { EXERCISES.splice(0, EXERCISES.length, ...original); }
});
test('historical exercise identity is preserved and exclusions never get a replacement', async () => {
  const { getExerciseForDay } = await import('../src/lib/planGenerator.ts');
  const plan = generatePersonalizedPlan(profile);
  assert.equal(getExerciseForDay(plan, '2026-10-02', 3, 'ex-3').id, 'ex-3');
  assert.equal(getExerciseForDay(plan, '2026-10-02', 3, 'ex-5'), null);
  assert.equal(getExerciseForDay(plan, '2026-10-02', 3, 'unknown'), null);
});
test('daily selection rejects invalid dates and blocked plans even with history', async () => {
  const { getExerciseForDay } = await import('../src/lib/planGenerator.ts');
  assert.equal(getExerciseForDay(generatePersonalizedPlan(profile), '2026-02-30', 3), null);
  assert.equal(getExerciseForDay(generatePersonalizedPlan({ ...profile, safetyScreening: 'unknown' }), '2026-10-08', 3, 'ex-3'), null);
  assert.equal(getExerciseForDay(generatePersonalizedPlan(profile), '2026-10-08', 3).id, 'ex-4');
});
