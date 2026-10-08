import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { AppProvider } from '../src/store/AppContext.tsx';
import { useApp } from '../src/store/useApp.ts';
import { DEFAULT_DEMO_USER } from '../src/data/demoData.ts';
import { emptyDemo, STORAGE_KEY } from '../src/lib/persistence.ts';
import { addDays } from '../src/lib/dates.ts';
import { generatePersonalizedPlan, getExerciseForDay } from '../src/lib/planGenerator.ts';

// SSR captures the real command handlers; browser tests cover rendering and effects.
function captureStore(t, { profile = DEFAULT_DEMO_USER, failWrites = false } = {}) {
  const entries = new Map([[STORAGE_KEY, JSON.stringify({
    ...emptyDemo(), user: profile, isDemoSession: true, hasCompletedOnboarding: true,
  })]]);
  const storage = {
    getItem: key => entries.get(key) ?? null,
    setItem: (key, value) => { if (failWrites) throw new Error('quota'); entries.set(key, value); },
  };
  for (const [key, value] of Object.entries({ window: { localStorage: storage }, localStorage: storage })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { value, configurable: true });
    t.after(() => { if (previous) Object.defineProperty(globalThis, key, previous); else Reflect.deleteProperty(globalThis, key); });
  }
  let api;
  function Capture() { api = useApp(); return null; }
  renderToString(createElement(AppProvider, null, createElement(Capture)));
  return { api, saved: () => JSON.parse(entries.get(STORAGE_KEY)) };
}
const record = (date, id, extra = {}) => ({
  date, exerciseId: id, completed: true, symptoms: [], painLevel: null, difficultyLevel: null,
  actualReps: null, actualSets: null, contractions: 'nenhuma', loggedAt: new Date().toISOString(), ...extra,
});

test('assessment changes preserve existing completion but block new completion', t => {
  const { api, saved } = captureStore(t);
  const today = api.todayDateStr, id = api.getExerciseForDate(today).id;
  assert.equal(api.saveWorkoutLog(record(today, id)), true);
  api.completeOnboarding({ ...DEFAULT_DEMO_USER, safetyScreening: 'unknown' });
  assert.equal(api.saveWorkoutLog(record(today, id, { notes: 'Historical note' })), true);
  assert.equal(saved().workoutLogs[today].exerciseId, id);
  assert.equal(saved().workoutLogs[today].completed, true);
  assert.equal(api.saveWorkoutLog(record(addDays(today, -1), id)), false);
  assert.equal(api.saveWorkoutLog(record(today, id, { painLevel: 8 })), false);
  assert.equal(api.saveWorkoutLog(record(addDays(today, 1), id)), false);
});
test('quick completion keeps zero counts and missing measurements', t => {
  const { api, saved } = captureStore(t);
  const day = api.todayDateStr, id = api.getExerciseForDate(day).id;
  api.saveWorkoutLog(record(day, id, { completed: false, actualReps: 0, actualSets: 0 }));
  api.toggleCompleteWorkout(day, id);
  const log = saved().workoutLogs[day];
  assert.equal(log.completed, true);
  assert.equal(log.actualReps, 0);
  assert.equal(log.actualSets, 0);
  assert.equal(log.painLevel, null);
  assert.equal(log.difficultyLevel, null);
});
test('failed storage writes keep command state usable in memory', t => {
  const { api, saved } = captureStore(t, { profile: { ...DEFAULT_DEMO_USER, safetyScreening: 'unknown' }, failWrites: true });
  const original = saved();
  assert.equal(api.completeOnboarding(DEFAULT_DEMO_USER), true);
  const id = getExerciseForDay(generatePersonalizedPlan(DEFAULT_DEMO_USER), api.todayDateStr, 3).id;
  assert.equal(api.saveWorkoutLog(record(api.todayDateStr, id)), true);
  assert.deepEqual(saved(), original);
});
test('invalid demo entry leaves saved data intact', t => {
  const { api, saved } = captureStore(t);
  const original = saved();
  assert.equal(api.startDemoProfile('Demo', 'demo@localhost'), false);
  assert.deepEqual(saved(), original);
});
test('a normal simulated reply is stored after its delay', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { api, saved } = captureStore(t);
  api.sendChatMessage('room-3trim', 'Fictional message');
  assert.equal(saved().chatMessages['room-3trim'].length, 1);
  t.mock.timers.tick(1500);
  assert.equal(saved().chatMessages['room-3trim'].length, 2);
});
for (const action of ['logout', 'new profile', 'reset']) {
  test('pending reply cannot change data after ' + action, t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const { api, saved } = captureStore(t);
    api.sendChatMessage('room-3trim', 'Fictional pending message');
    if (action === 'logout') api.logoutToAuth();
    else if (action === 'new profile') api.startDemoProfile('New Demo', 'new@exemplo.pt');
    else api.resetDemoData();
    const before = saved();
    t.mock.timers.tick(2000);
    assert.deepEqual(saved(), before);
  });
}

