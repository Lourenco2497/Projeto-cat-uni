import test from 'node:test';
import assert from 'node:assert/strict';
import { todayKey, addDays, validDate } from '../src/lib/dates.ts';
import { normalizeProfile, normalizeLog, loadDemo, STORAGE_KEY } from '../src/lib/persistence.ts';
import { DEFAULT_DEMO_USER } from '../src/data/demoData.ts';

const storage = entries => ({ getItem: key => entries[key] ?? null });
test('Lisbon midnight uses the local day, including summer time', () => {
  assert.equal(todayKey(new Date('2026-07-01T23:30:00Z')), '2026-07-02');
  assert.equal(addDays('2026-03-29', -1), '2026-03-28');
  assert.equal(addDays('2026-10-25', 1), '2026-10-26');
  assert.equal(validDate('2026-02-30'), false);
});
test('legacy profile defaults do not silently clear safety screening', () => {
  const legacy = { ...DEFAULT_DEMO_USER }; delete legacy.safetyScreening;
  assert.equal(normalizeProfile(legacy).safetyScreening, 'unknown');
  assert.equal(normalizeProfile({ ...legacy, week: '34' }), null);
});
test('invalid log counts and mismatched dates are rejected; zero survives', () => {
  const log = { date: '2026-10-08', completed: false, exerciseId: 'ex-1', symptoms: [], contractions: 'nenhuma', painLevel: null, difficultyLevel: null, actualReps: 0, actualSets: 0, loggedAt: '2026-10-08T12:00:00Z' };
  assert.equal(normalizeLog(log, log.date).actualReps, 0);
  assert.equal(normalizeLog({ ...log, actualSets: -1 }, log.date), null);
  assert.equal(normalizeLog(log, '2026-10-07'), null);
});
test('corrupted or inaccessible storage recovers without pretending it saved', () => {
  assert.ok(loadDemo(storage({ [STORAGE_KEY]: '{broken' })).notice);
  assert.ok(loadDemo({ getItem() { throw new Error('denied'); } }).notice);
});
test('legacy logs remain recoverable and malformed entries are explained', () => {
  const entries = { catuni_maternal_app_v1_user: JSON.stringify(DEFAULT_DEMO_USER), catuni_maternal_app_v1_onboarded: 'true', catuni_maternal_app_v1_logs: JSON.stringify({ invalid: {} }) };
  const loaded = loadDemo(storage(entries));
  assert.ok(loaded.data.user);
  assert.ok(loaded.notice);
});
test('assessment boundaries reject invalid fields and flags stay flagged', () => {
  assert.equal(normalizeProfile({ ...DEFAULT_DEMO_USER, email: 'demo@localhost' }), null);
  assert.equal(normalizeProfile({ ...DEFAULT_DEMO_USER, gestationalDays: 7 }), null);
  assert.equal(normalizeProfile({ ...DEFAULT_DEMO_USER, previousBirths: -1 }), null);
  assert.equal(normalizeProfile({ ...DEFAULT_DEMO_USER, clinicalFlags: ['Restrição'], safetyScreening: 'clear' }).safetyScreening, 'flagged');
});
