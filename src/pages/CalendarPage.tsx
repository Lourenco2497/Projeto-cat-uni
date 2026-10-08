import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Check } from 'lucide-react';
import { useApp } from '../store/useApp';
import { addDays, dateValue, formatDate } from '../lib/dates';
import { isAlarm } from '../lib/persistence';
import { EXERCISES } from '../data/exercises';
import type { Exercise, WorkoutLog } from '../types';
import { DemonstrationModal } from '../components/ui/DemonstrationModal';

const symptomChoices = ['dor lombar', 'dor pélvica', 'edemas', 'fadiga', 'perdas de sangue ou líquido', 'tonturas ou falta de ar'];
export function CalendarPage() {
  const { selectedDateStr: selected, setSelectedDateStr: select, todayDateStr: today, workoutLogs, getExerciseForDate, activePlan } = useApp();
  const [month, setMonth] = useState(selected.slice(0, 7));
  const [guide, setGuide] = useState(false);
  const first = month + '-01';
  const offset = (dateValue(first).getUTCDay() + 6) % 7;
  const length = new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5)), 0)).getUTCDate();
  const exercise = getExerciseForDate(selected);
  const recorded = EXERCISES.find(e => e.id === workoutLogs[selected]?.exerciseId);
  function move(delta: number) {
    const next = dateValue(first);
    next.setUTCMonth(next.getUTCMonth() + delta);
    setMonth(next.toISOString().slice(0, 7));
  }
  return <div className="stack"><header className="page-heading"><p className="eyebrow">Um dia de cada vez</p><h1>O teu calendário</h1><p className="muted">Encontra espaço para acompanhar o teu conforto.</p></header>
    <div className="dashboard"><section className="card stack month-card"><div className="split"><h2>{formatDate(first, { month: 'long', year: 'numeric' })}</h2><div className="cluster"><button className="icon-button" aria-label="Mês anterior" onClick={() => move(-1)}><ChevronLeft size={20} /></button><button className="icon-button" aria-label="Mês seguinte" onClick={() => move(1)}><ChevronRight size={20} /></button></div></div>
      <div className="calendar-grid">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => <span key={i} className="calendar-label" aria-hidden="true">{day}</span>)}{Array.from({ length: offset }, (_, i) => <span key={'empty' + i} />)}{Array.from({ length }, (_, i) => { const day = addDays(first, i); return <button key={day} className="calendar-day" aria-pressed={day === selected} data-today={day === today} data-completed={!!workoutLogs[day]?.completed} aria-label={formatDate(day, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + (workoutLogs[day]?.completed ? ', exercício concluído' : '')} onClick={() => select(day)}>{i + 1}{workoutLogs[day]?.completed && <span className="marker" />}</button>; })}</div>
      <div className="split"><span className="small muted">Verde: exercício concluído</span><button className="text-button" onClick={() => { select(today); setMonth(today.slice(0, 7)); }}>Ir para hoje</button></div>
    </section><div className="stack"><section className="card soft stack"><div className="split"><p className="eyebrow">{formatDate(selected)}</p>{workoutLogs[selected]?.completed && <span className="pill green"><Check size={14} /> Concluído</span>}</div><h2>{exercise ? exercise.name : recorded ? 'Registo anterior: ' + recorded.name : 'Dia de acompanhamento'}</h2><p className="small muted">{exercise ? 'Sugestão ilustrativa · ' + exercise.durationMinutes + ' min de exemplo' : activePlan.clinicalSafetyAlert || 'Sem exercício disponível para esta data.'}</p>{exercise && <button className="secondary" onClick={() => setGuide(true)}>Ver guia ilustrado <ArrowUpRight size={18} /></button>}</section>
      <DailyRecord key={selected} date={selected} exercise={exercise} />
    </div></div><DemonstrationModal exercise={exercise} isOpen={guide} onClose={() => setGuide(false)} /></div>;
}
function DailyRecord({ date, exercise }: { date: string; exercise: Exercise | null }) {
  const { workoutLogs, todayDateStr, saveWorkoutLog, activePlan } = useApp();
  const [draft, setDraft] = useState<WorkoutLog>(() => workoutLogs[date] ?? {
    date, exerciseId: exercise?.id ?? '', completed: false, symptoms: [], painLevel: null, difficultyLevel: null,
    contractions: 'nenhuma', actualReps: null, actualSets: null, notes: '', loggedAt: new Date().toISOString(),
  });
  const [status, setStatus] = useState('');
  const future = date > todayDateStr;
  const alarm = isAlarm(draft);
  const blocked = !exercise || !!activePlan.clinicalSafetyAlert || alarm;
  function update<K extends keyof WorkoutLog>(key: K, value: WorkoutLog[K]) { setStatus(''); setDraft(p => ({ ...p, [key]: value })); }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const saved = saveWorkoutLog({ ...draft, exerciseId: exercise?.id ?? draft.exerciseId, completed: !alarm && draft.completed, loggedAt: new Date().toISOString() });
    setStatus(saved ? 'Registo guardado para ' + formatDate(date) + '.' : 'Não foi possível guardar. Revê os campos do registo.');
  }
  return <form className="card stack" onSubmit={submit}><h2>Como te sentiste?</h2><p className="small muted">Cada data tem o seu registo. Guarda antes de escolher outro dia.</p>
    {future && <p className="callout neutral">Esta data está no futuro. Os registos ficam disponíveis nesse dia.</p>}
    <fieldset disabled={future} className="stack">
      <fieldset><legend>Sintomas (opcional)</legend><div className="chips">{symptomChoices.map(symptom => <button type="button" className="chip" key={symptom} aria-pressed={draft.symptoms.includes(symptom)} onClick={() => update('symptoms', draft.symptoms.includes(symptom) ? draft.symptoms.filter(s => s !== symptom) : [...draft.symptoms, symptom])}>{symptom}</button>)}</div></fieldset>
      <div className="grid-2">{(['painLevel', 'difficultyLevel'] as const).map(key => <div key={key}><label htmlFor={key}>{key === 'painLevel' ? 'Dor · 0 a 10' : 'Esforço · 0 a 10'}</label><select id={key} value={draft[key] ?? ''} onChange={e => update(key, e.target.value === '' ? null : Number(e.target.value))}><option value="">Não registado</option>{Array.from({ length: 11 }, (_, i) => <option key={i} value={i}>{i}{i === 0 ? ' · nenhum' : ''}</option>)}</select></div>)}</div>
      <div><label htmlFor="contractions">Contrações</label><select id="contractions" value={draft.contractions} onChange={e => update('contractions', e.target.value as WorkoutLog['contractions'])}><option value="nenhuma">Nenhuma reportada</option><option value="ocasionais">Ocasionais</option><option value="regulares">Regulares</option></select></div>
      <div className="grid-2"><div><label htmlFor="reps">Repetições (opcional)</label><input id="reps" type="number" min="0" max="1000" value={draft.actualReps ?? ''} onChange={e => update('actualReps', e.target.value === '' ? null : Number(e.target.value))} /></div><div><label htmlFor="sets">Séries (opcional)</label><input id="sets" type="number" min="0" max="100" value={draft.actualSets ?? ''} onChange={e => update('actualSets', e.target.value === '' ? null : Number(e.target.value))} /></div></div>
      <div><label htmlFor="notes">Uma nota sobre o dia (opcional)</label><textarea id="notes" maxLength={1000} rows={3} value={draft.notes ?? ''} placeholder="Um pequeno detalhe que queres recordar…" onChange={e => update('notes', e.target.value)} /></div>
      {alarm && <p className="callout danger" role="status"><strong>Alerta no registo</strong><br />Não prossigas com o exercício. Contacta a tua equipa de saúde. Este alerta de demonstração não avalia a gravidade dos sintomas.</p>}
      <label className="check-row"><input type="checkbox" disabled={blocked} checked={!alarm && draft.completed} onChange={e => update('completed', e.target.checked)} />Concluí o exercício deste dia</label>
      {blocked && <p className="small muted">Podes guardar sintomas. Novas conclusões estão suspensas.{!alarm && draft.completed ? ' A conclusão anterior é mantida no histórico.' : ''}</p>}
      <button className="primary full" type="submit">Guardar registo do dia <Check size={18} /></button>
    </fieldset>
    {status && <p className="callout" role="status">{status}</p>}
  </form>;
}



