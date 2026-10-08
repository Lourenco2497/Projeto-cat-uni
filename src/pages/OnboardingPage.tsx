import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../store/useApp';
import { generatePersonalizedPlan } from '../lib/planGenerator';
import { trimesterFor } from '../lib/dates';
import type { UserProfile } from '../types';

const titles = ['A tua gravidez', 'História e movimento', 'Como te sentes', 'Cuidados importantes', 'O teu acompanhamento'];
const complaints = ['dor lombar', 'dor pélvica', 'edemas', 'perdas urinárias', 'fadiga'];
const flags = ['Restrição de exercício indicada pela equipa de saúde', 'Complicação na gravidez em acompanhamento', 'Perdas de sangue ou líquido', 'Contrações regulares ou dolorosas'];
const goals = ['Conhecer o meu corpo', 'Acompanhar o meu conforto', 'Criar uma rotina', 'Preparar perguntas para a consulta'];

export function OnboardingPage() {
  const { user, completeOnboarding, hasCompletedOnboarding } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({ ...user });
  const [error, setError] = useState('');
  const plan = generatePersonalizedPlan(profile);
  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) { setProfile(p => ({ ...p, [key]: value })); }
  function toggle(key: 'complaints' | 'clinicalFlags' | 'goals', item: string) {
    setProfile(p => ({ ...p, [key]: p[key].includes(item) ? p[key].filter(v => v !== item) : [...p[key], item] }));
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 4) { setStep(step + 1); return; }
    if (completeOnboarding({ ...profile, trimester: trimesterFor(profile.week), profileType: plan.profileType, planId: 'demo-t' + trimesterFor(profile.week) })) navigate('/');
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
      <div><label htmlFor="activity">Atividade antes da gravidez</label><select id="activity" value={profile.previousActivityLevel} onChange={e => update('previousActivityLevel', e.target.value as UserProfile['previousActivityLevel'])}><option value="sedentary">Pouco movimento</option><option value="light">Atividade leve</option><option value="moderate">Atividade moderada</option><option value="high">Atividade frequente</option></select></div>
      <div><label htmlFor="awareness">Conheces a contração e o relaxamento do períneo?</label><select id="awareness" value={profile.perinealAwareness ?? 'unknown'} onChange={e => update('perinealAwareness', e.target.value as UserProfile['perinealAwareness'])}><option value="unknown">Não sei</option><option value="yes">Sim</option><option value="no">Ainda não</option></select></div>
    </>}
    {step === 2 && <fieldset className="stack"><legend>Queixas do perfil fictício (opcional)</legend>{complaints.map(item => <label className="check-row" key={item}><input type="checkbox" checked={profile.complaints.includes(item)} onChange={() => toggle('complaints', item)} />{item[0].toUpperCase() + item.slice(1)}</label>)}<p className="small muted">Os sintomas não são usados para diagnosticar ou prometer melhoria.</p></fieldset>}
    {step === 3 && <>
      <p className="callout neutral">A aplicação não verifica autorização médica. Esta resposta só demonstra o fluxo de avaliação.</p>
      <div><label htmlFor="screening">Situação do perfil fictício</label><select id="screening" value={profile.safetyScreening ?? 'unknown'} onChange={e => update('safetyScreening', e.target.value as UserProfile['safetyScreening'])}><option value="unknown">Avaliação ainda por esclarecer</option><option value="clear">Exemplo sem restrições reportadas</option><option value="flagged">Exemplo com restrição ou complicação</option></select></div>
      <fieldset className="stack"><legend>Condições reportadas (opcional)</legend>{flags.map(item => <label className="check-row" key={item}><input type="checkbox" checked={profile.clinicalFlags.includes(item)} onChange={() => toggle('clinicalFlags', item)} />{item}</label>)}</fieldset>
      {(profile.safetyScreening !== 'clear' || profile.clinicalFlags.length > 0) && <p className="callout danger">As sugestões de exercício ficarão suspensas. O registo de sintomas continua disponível.</p>}
    </>}
    {step === 4 && <>
      <fieldset className="stack"><legend>O que gostarias de acompanhar?</legend>{goals.map(item => <label className="check-row" key={item}><input type="checkbox" checked={profile.goals.includes(item)} onChange={() => toggle('goals', item)} />{item}</label>)}</fieldset>
      <div className={'callout' + (plan.clinicalSafetyAlert ? ' danger' : '')}><strong>{plan.title}</strong><p>{plan.summary}</p></div>
      <p className="small muted">{profile.week} semanas + {profile.gestationalDays ?? 0} dias · {plan.recommendedDailyExercises.length ? 'Rotação ilustrativa de 7 dias' : 'Sem sugestões de exercício'}</p>
    </>}
    {error && <p role="alert" className="callout danger">{error}</p>}
    <div className="split">{step > 0 ? <button type="button" className="secondary" onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Voltar</button> : <span />}
    <button className="primary" type="submit">{step === 4 ? 'Guardar avaliação' : 'Continuar'}{step === 4 ? <Check size={18} /> : <ArrowRight size={18} />}</button></div>
  </form></main>;
}

