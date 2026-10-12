import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../store/useApp';
import { generatePersonalizedPlan } from '../lib/planGenerator';
import { trimesterFor, todayKey } from '../lib/dates';
import { CURRENT_SYMPTOMS, SUSPENDING_SYMPTOMS } from '../data/currentSymptoms';
import type { UserProfile } from '../types';

const titles = ['A tua gravidez', 'História e movimento', 'Sintomatologia atual', 'Avaliação c/fisio', 'O teu acompanhamento'];
const goals = ['Conhecer o meu corpo', 'Acompanhar o meu conforto', 'Criar uma rotina', 'Preparar perguntas para a consulta'];

export function OnboardingPage() {
  const { user, completeOnboarding, hasCompletedOnboarding } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({ ...user, clinicalFlags: [], safetyScreening: 'clear' });
  const [error, setError] = useState('');
  const suspended = profile.complaints.some(item => SUSPENDING_SYMPTOMS.includes(item));
  const plan = generatePersonalizedPlan(profile);
  function updateAssessment(key: 'date' | 'time', value: string) {
    setProfile(p => ({ ...p, physiotherapyAssessment: p.physiotherapyAssessment ? { ...p.physiotherapyAssessment, [key]: value } : undefined }));
  }
  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) { setProfile(p => ({ ...p, [key]: value })); }
  function toggle(key: 'complaints' | 'goals', item: string) {
    setProfile(p => ({ ...p, [key]: p[key].includes(item) ? p[key].filter(v => v !== item) : [...p[key], item] }));
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 4) { setStep(step + 1); return; }
    if (completeOnboarding({ ...profile, safetyScreening: suspended ? 'flagged' : 'clear', trimester: trimesterFor(profile.week), profileType: plan.profileType, planId: 'demo-t' + trimesterFor(profile.week) })) navigate('/');
    else setError('Revê os campos da avaliação antes de guardar.');
  }
  return <main className="auth-shell"><form className="card form-card stack" onSubmit={submit}>
    <div className="split"><Link to={hasCompletedOnboarding ? '/profile' : '/auth'} className="text-button"><ArrowLeft size={18} /> Sair</Link><span className="pill">Avaliação fictícia</span></div>
    <div className="step-track" aria-hidden="true">{titles.map((title, i) => <span key={title} className={i <= step ? 'active' : ''} />)}</div>
    <header key={step} aria-live="polite"><p className="eyebrow">Passo {step + 1} de 5</p><h1 style={{ marginTop: 10 }}>{titles[step]}</h1><p className="muted small" style={{ marginTop: 10 }}>Usa respostas fictícias nesta demonstração académica.</p></header>
    {step === 0 && <>
      <div className="grid-2"><div><label htmlFor="weeks">Semanas</label><input id="weeks" type="number" min="1" max="42" required value={profile.week} onChange={e => update('week', Number(e.target.value))} /></div>
      <div><label htmlFor="days">Dias</label><input id="days" type="number" min="0" max="6" required value={profile.gestationalDays ?? 0} onChange={e => update('gestationalDays', Number(e.target.value))} /></div></div>
      <div><label htmlFor="pregnancy">Tipo de gravidez</label><select id="pregnancy" value={profile.pregnancyType ?? 'unknown'} onChange={e => update('pregnancyType', e.target.value as UserProfile['pregnancyType'])}><option value="unknown">Não sei / por confirmar</option><option value="single">Um bebé</option><option value="twins">Gémeos</option></select></div>
      <div><label htmlFor="presentation">Apresentação do bebé</label><select id="presentation" value={profile.fetalPresentation ?? 'unknown'} onChange={e => update('fetalPresentation', e.target.value as UserProfile['fetalPresentation'])}><option value="unknown">Não sei / por confirmar</option><option value="cephalic">Cefálica</option><option value="breech">Pélvica</option><option value="transverse">Transversa</option></select></div>
    </>}
    {step === 1 && <>
      <label className="check-row"><input type="checkbox" checked={profile.isFirstPregnancy} onChange={e => setProfile(p => ({ ...p, isFirstPregnancy: e.target.checked, previousBirths: e.target.checked ? 0 : p.previousBirths }))} />Esta é a minha primeira gravidez</label>
      {!profile.isFirstPregnancy && <div><label htmlFor="births">Partos anteriores</label><input id="births" type="number" min="0" max="20" required value={profile.previousBirths ?? 0} onChange={e => update('previousBirths', Number(e.target.value))} /></div>}
      {!profile.isFirstPregnancy && <div><label htmlFor="previous-pregnancy-notes">Existiu algum aspeto importante na(s) gravidez(es) anterior(es)? (opcional)</label><textarea id="previous-pregnancy-notes" rows={3} maxLength={1000} value={profile.previousPregnancyNotes ?? ''} onChange={e => update('previousPregnancyNotes', e.target.value)} /></div>}
      <div><label htmlFor="current-pregnancy-notes">Existe algum aspeto importante nesta gravidez? (opcional)</label><textarea id="current-pregnancy-notes" rows={3} maxLength={1000} value={profile.currentPregnancyNotes ?? ''} onChange={e => update('currentPregnancyNotes', e.target.value)} /></div>
      <div><label htmlFor="activity">Atividade antes da gravidez</label><select id="activity" value={profile.previousActivityLevel} onChange={e => update('previousActivityLevel', e.target.value as UserProfile['previousActivityLevel'])}><option value="sedentary">Pouco movimento</option><option value="light">Atividade leve</option><option value="moderate">Atividade moderada</option><option value="high">Atividade frequente</option></select></div>
    </>}
    {step === 2 && <fieldset className="stack"><legend>Sintomatologia atual</legend>{CURRENT_SYMPTOMS.map(item => <label className="check-row" key={item}><input type="checkbox" checked={profile.complaints.includes(item)} onChange={() => toggle('complaints', item)} />{item}</label>)}{suspended && <p className="callout danger" role="status">As sugestões de exercício ficarão suspensas. O registo de sintomas continua disponível.</p>}<p className="small muted">As primeiras quatro opções suspendem as sugestões nesta simulação. A avaliação não constitui um diagnóstico.</p></fieldset>}
    {step === 3 && <>
      <fieldset className="stack"><legend>Como preferes a avaliação com fisioterapeuta? (opcional)</legend>{(['in-person', 'teams'] as const).map(mode => <label className="check-row" key={mode}><input type="radio" name="assessment-mode" checked={profile.physiotherapyAssessment?.mode === mode} onChange={() => update('physiotherapyAssessment', { mode, date: profile.physiotherapyAssessment?.date ?? '', time: profile.physiotherapyAssessment?.time ?? '' })} />{mode === 'in-person' ? 'Presencial · escolher no calendário' : 'Online · Microsoft Teams'}</label>)}</fieldset>
      {profile.physiotherapyAssessment && <><div className="grid-2"><div><label htmlFor="assessment-date">Data da avaliação</label><input id="assessment-date" type="date" min={todayKey()} required value={profile.physiotherapyAssessment.date} onChange={e => updateAssessment('date', e.target.value)} /></div><div><label htmlFor="assessment-time">Hora</label><input id="assessment-time" type="time" required value={profile.physiotherapyAssessment.time} onChange={e => updateAssessment('time', e.target.value)} /></div></div><button type="button" className="text-button" onClick={() => update('physiotherapyAssessment', undefined)}>Escolher mais tarde</button></>}
      <p className="callout neutral">Marcação simulada: a escolha fica guardada no perfil. Não é reservada uma consulta nem criada uma reunião no Teams.</p>
    </>}
    {step === 4 && <>
      <fieldset className="stack"><legend>O que gostarias de acompanhar?</legend>{goals.map(item => <label className="check-row" key={item}><input type="checkbox" checked={profile.goals.includes(item)} onChange={() => toggle('goals', item)} />{item}</label>)}</fieldset>
      <div className={'callout' + (plan.clinicalSafetyAlert ? ' danger' : '')}><strong>{plan.title}</strong><p>{plan.summary}</p></div>
      <p className="small muted">{profile.week} semanas + {profile.gestationalDays ?? 0} dias · {plan.recommendedDailyExercises.length ? 'Rotação ilustrativa de 7 dias' : 'Sem sugestões de exercício'}</p>
      {profile.physiotherapyAssessment && <p className="callout neutral">Avaliação c/fisio · {profile.physiotherapyAssessment.mode === 'teams' ? 'Online via Teams' : 'Presencial'} · {profile.physiotherapyAssessment.date} às {profile.physiotherapyAssessment.time} · simulação</p>}
    </>}
    {error && <p role="alert" className="callout danger">{error}</p>}
    <div className="split">{step > 0 ? <button type="button" className="secondary" onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Voltar</button> : <span />}
    <button className="primary" type="submit">{step === 4 ? 'Guardar avaliação' : 'Continuar'}{step === 4 ? <Check size={18} /> : <ArrowRight size={18} />}</button></div>
  </form></main>;
}

