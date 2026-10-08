import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, BookOpen, MessageCircle, CalendarDays } from 'lucide-react';
import { useApp } from '../store/useApp';
import { calculateStats } from '../lib/statsCalculator';
import { addDays, dateValue, formatDate } from '../lib/dates';
import { isAlarm } from '../lib/persistence';
import { ExerciseIllustration } from '../components/ui/ExerciseIllustration';
import { DemonstrationModal } from '../components/ui/DemonstrationModal';

export function HomePage() {
  const { user, todayDateStr: today, workoutLogs, activePlan, getExerciseForDate, toggleCompleteWorkout, setSelectedDateStr } = useApp();
  const [guide, setGuide] = useState(false);
  const exercise = getExerciseForDate(today);
  const log = workoutLogs[today];
  const stats = calculateStats(workoutLogs, today);
  const recentDays = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  return <div className="stack">
    <header className="page-heading"><p className="eyebrow">{formatDate(today, { weekday: 'long', day: 'numeric', month: 'long' })}</p><h1 style={{ marginTop: 10 }}>Olá, {user.name.split(' ')[0]} <span aria-hidden="true">♡</span></h1><p className="muted">Um momento para ti, um dia de cada vez.</p></header>
    <section className="card gestation-card" aria-label="Resumo da gravidez fictícia"><div><p className="eyebrow">A tua jornada</p><h2>{user.trimester}.º trimestre</h2><p className="small">Pequenos passos.<br />Espaço para o teu ritmo.</p></div><div className="gestation-ring"><strong>{user.week}</strong><span className="small">semanas + {user.gestationalDays ?? 0} dias</span></div></section>
    {activePlan.clinicalSafetyAlert && <div className="callout danger" role="status"><strong>Sugestões suspensas</strong><p>{activePlan.clinicalSafetyAlert}</p><Link to="/profile" className="text-button">Ver a avaliação <ArrowUpRight size={16} /></Link></div>}
    <div className="dashboard"><div className="stack">
      {exercise ? <section className="card exercise-card"><div className="split"><p className="eyebrow">Movimento de hoje</p><span className="pill">{exercise.durationMinutes} min · exemplo</span></div>
        <div className="exercise-art" style={{ marginTop: 18 }}><ExerciseIllustration type={exercise.illustrationKey} /></div><h2>{exercise.name}</h2><p className="muted small">{exercise.shortDescription}</p>
        <button className="primary full" onClick={() => setGuide(true)}>Explorar o guia ilustrado <ArrowUpRight size={18} /></button>
        <button className="text-button full" disabled={!!log && isAlarm(log)} onClick={() => toggleCompleteWorkout(today, exercise.id)}><Check size={18} />{log?.completed ? 'Desmarcar conclusão' : 'Já fiz · marcar como concluído'}</button>
        {log && isAlarm(log) && <p className="callout danger">Há um alerta no registo de hoje. A conclusão está suspensa.</p>}
      </section> : <section className="card stack"><h2>Hoje, começa pelo teu registo</h2><p className="muted">Ainda não há sugestões de exercício para esta avaliação. Podes continuar a acompanhar como te sentes.</p><Link to="/calendar" className="primary" onClick={() => setSelectedDateStr(today)}>Registar o meu dia <CalendarDays size={18} /></Link></section>}
    </div><div className="stack">
      <section className="card"><div className="split section-title"><h2>Os últimos 7 dias</h2><Link to="/stats" className="text-button">Ver evolução</Link></div><div className="week-row">{recentDays.map(day => <Link key={day} className="week-day" to="/calendar" onClick={() => setSelectedDateStr(day)} aria-label={formatDate(day) + (workoutLogs[day]?.completed ? ', exercício concluído' : '')}><span>{formatDate(day, { weekday: 'short' }).slice(0, 3)}</span><span className={'day-dot' + (workoutLogs[day]?.completed ? ' done' : '') + (day === today ? ' today' : '')}>{workoutLogs[day]?.completed ? <Check size={16} /> : dateValue(day).getUTCDate()}</span></Link>)}</div><p className="muted small" style={{ marginTop: 20 }}>{stats.weeklyCompleted} dias com exercício concluído · {stats.streak} dias de sequência.</p></section>
      <section className="card sage stack"><div className="split"><h2>Como te sentes hoje?</h2><CalendarDays size={22} /></div><p>O teu conforto também merece atenção. Guarda sintomas, esforço e uma pequena nota.</p><Link to="/calendar" className="secondary" onClick={() => setSelectedDateStr(today)}>Fazer o registo diário</Link></section>
      <section className="card stack"><BookOpen size={24} /><h2>Conhecer, com calma</h2><p className="muted small">Uma biblioteca em preparação para as tuas perguntas e descobertas.</p><Link to="/articles" className="text-button">Explorar a biblioteca <ArrowUpRight size={16} /></Link></section>
      <Link to="/community" className="card split"><div><h3>Um espaço de partilha</h3><p className="small muted">Histórias e conversas fictícias</p></div><MessageCircle size={24} /></Link>
    </div></div>
    <DemonstrationModal exercise={exercise} isOpen={guide} onClose={() => setGuide(false)} />
  </div>;
}

