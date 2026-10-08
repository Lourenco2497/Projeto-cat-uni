import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Leaf } from 'lucide-react';
import { useApp } from '../store/useApp';
import { ExerciseIllustration } from '../components/ui/ExerciseIllustration';
import { Dialog } from '../components/ui/Dialog';

export function AuthPage() {
  const { user, hasSavedProfile, hasCompletedOnboarding, startDemoProfile, resumeDemo, resetDemoData, storageNotice } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(''), [email, setEmail] = useState('');
  const [pending, setPending] = useState<'create' | 'sample' | null>(null);
  const [error, setError] = useState('');
  function enter(action: 'create' | 'sample') {
    if (action === 'sample') { resetDemoData(); navigate('/'); }
    else if (startDemoProfile(name.trim(), email.trim())) navigate('/onboarding');
    else { setPending(null); setError('Indica um nome e um email fictícios válidos, como rita@exemplo.pt.'); }
  }
  function requestEntry(action: 'create' | 'sample') {
    if (hasSavedProfile) setPending(action);
    else enter(action);
  }
  return <main className="auth-shell"><div className="auth-layout">
    <section className="auth-intro"><div className="wordmark">catuni materna<span>UM POUCO DE MOVIMENTO. UM MOMENTO PARA TI.</span></div>
      <h1>O teu corpo muda.<br /><span style={{ color: '#8d6078' }}>O cuidado acompanha.</span></h1>
      <p className="muted">Um espaço para conheceres o teu corpo, registares como te sentes e preparares esta nova etapa, ao teu ritmo.</p>
      <div className="auth-illustration"><ExerciseIllustration type="pilates_ball" /></div>
      <div className="cluster small muted" style={{ marginTop: 18 }}><Heart size={16} /><span>Movimento</span><Leaf size={16} /><span>Bem-estar</span></div>
    </section>
    <section className="card form-card stack"><span className="pill" style={{ alignSelf: 'flex-start' }}>Apresentação académica</span>
      <h2>Bem-vinda ao teu espaço</h2><p className="small muted">Usa um nome e email fictícios. Esta demo guarda dados apenas neste navegador e não verifica contas.</p>
      {storageNotice && <p role="status" className="callout danger">{storageNotice}</p>}
      <form className="stack" onSubmit={e => { e.preventDefault(); setError(''); requestEntry('create'); }}>
        <div><label htmlFor="demo-name">Nome fictício</label><input id="demo-name" required maxLength={80} value={name} onChange={e => setName(e.target.value)} placeholder="Como gostarias de ser chamada?" autoComplete="off" /></div>
        <div><label htmlFor="demo-email">Email fictício</label><input id="demo-email" type="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} placeholder="rita@exemplo.pt" autoComplete="off" /></div>
        {error && <p className="callout danger" role="alert">{error}</p>}
        <button className="primary full" disabled={!name.trim() || !email.trim()}>Criar perfil de demonstração <ArrowRight size={18} /></button>
      </form>
      {hasSavedProfile && <button className="secondary full" onClick={() => { resumeDemo(); navigate(hasCompletedOnboarding ? '/' : '/onboarding'); }}>Retomar perfil de {user.name.split(' ')[0]}</button>}
      <button className="text-button full" onClick={() => requestEntry('sample')}>Explorar exemplo preenchido <ArrowRight size={16} /></button>
      <p className="small muted">Um espaço de demonstração para explorar com dados fictícios. O conteúdo clínico aguarda validação.</p>
    </section>
  </div>{pending && <Dialog title="Substituir o perfil guardado?" onClose={() => setPending(null)}><div className="stack"><p>O perfil, os registos, os favoritos e as conversas atuais serão substituídos pelos dados da nova demonstração.</p><button className="secondary full" onClick={() => setPending(null)}>Manter o perfil atual</button><button className="primary full" onClick={() => enter(pending)}>Substituir e continuar</button></div></Dialog>}</main>;
}

