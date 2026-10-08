export function todayKey(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Lisbon', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  return ['year', 'month', 'day'].map(type => parts.find(p => p.type === type)!.value).join('-');
}
// Date-only arithmetic stays in UTC; Lisbon is applied only when finding today.
export const dateValue = (key: string) => new Date(`${key}T12:00:00Z`);
export function addDays(key: string, days: number): string {
  const date = dateValue(key);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export function validDate(key: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(key) && Number.isFinite(dateValue(key).getTime()) && dateValue(key).toISOString().slice(0, 10) === key;
}
export function formatDate(key: string, options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }): string {
  return dateValue(key).toLocaleDateString('pt-PT', { ...options, timeZone: 'UTC' });
}
export const trimesterFor = (week: number): 1 | 2 | 3 => week < 13 ? 1 : week < 28 ? 2 : 3;
