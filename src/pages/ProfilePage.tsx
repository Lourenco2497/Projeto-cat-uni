import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, FileText, LogOut, RotateCcw } from 'lucide-react';
import { useApp } from '../store/useApp';
import { Dialog } from '../components/ui/Dialog';

export function ProfilePage() {
  const { user, activePlan, resetDemoData, logoutToAuth } = useApp();
  const [preview, setPreview] = useState(false);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();
  return <div className="stack"><header className="page-heading"><p className="eyebrow">O teu espaço</p><h1>Perfil de demonstração</h1><p className="muted">Respostas fictícias, guardadas neste navegador.</p></header>
    <section className="card stack"><div className="cluster"><span className="avatar" aria-hidden="true">{user.name[0]}</span><div><h2>{user.name}</h2><p className="small muted" style={{ overflowWrap: 'anywhere' }}>{user.email}</p></div></div>
      <dl className="stack"><div className="split"><dt>Gestação</dt><dd>{user.week} semanas + {user.gestationalDays ?? 0} dias</dd></div><div className="split"><dt>Trimestre</dt><dd>{user.trimester}.º trimestre</dd></div><div className="split"><dt>Tipo de gravidez</dt><dd>{user.pregnancyType === 'single' ? 'Um bebé' : user.pregnancyType === 'twins' ? 'Gémeos' : 'Por confirmar'}</dd></div><div><dt>Queixas reportadas</dt><dd className="muted" style={{ marginTop: 8 }}>{user.complaints.join(', ') || 'Nenhuma selecionada'}</dd></div><div><dt>Avaliação de exemplo</dt><dd className="muted" style={{ marginTop: 8 }}>{activePlan.clinicalSafetyAlert ? 'Sugestões suspensas' : 'Sem restrições reportadas no perfil fictício'}</dd></div></dl>
      <details><summary>Ver todas as respostas</summary><dl className="stack">
        <div><dt>Apresentação fetal</dt><dd className="muted">{{ cephalic: 'Cefálica', breech: 'Pélvica', transverse: 'Transversa', unknown: 'Por confirmar' }[user.fetalPresentation ?? 'unknown']}</dd></div>
        <div><dt>Primeira gravidez</dt><dd className="muted">{user.isFirstPregnancy ? 'Sim' : 'Não'} · {user.previousBirths ?? 0} partos anteriores</dd></div>
        <div><dt>Atividade anterior</dt><dd className="muted">{{ sedentary: 'Pouco movimento', light: 'Leve', moderate: 'Moderada', high: 'Frequente' }[user.previousActivityLevel]}</dd></div>
        <div><dt>Consciência perineal</dt><dd className="muted">{{ yes: 'Sim', no: 'Ainda não', unknown: 'Não sei' }[user.perinealAwareness ?? 'unknown']}</dd></div>
        <div><dt>Condições reportadas</dt><dd className="muted">{user.clinicalFlags.join(', ') || 'Nenhuma selecionada'}</dd></div>
        <div><dt>Objetivos de acompanhamento</dt><dd className="muted">{user.goals.join(', ') || 'Nenhum selecionado'}</dd></div>
      </dl></details>
      <Link className="secondary" to="/onboarding">Editar a avaliação <ArrowUpRight size={18} /></Link>
    </section>
    <section className="card stack"><div className="cluster"><FileText size={24} /><h2>Exames e acompanhamento</h2></div><p className="muted">Funcionalidade em estudo com o cliente. O exemplo mostra como poderia ser organizada uma consulta.</p><button className="secondary" aria-expanded={preview} onClick={() => setPreview(!preview)}>{preview ? 'Ocultar exemplo' : 'Ver exemplo fictício'}</button>{preview && <div className="callout neutral"><strong>Consulta de acompanhamento · exemplo</strong><p>Estado: por agendar. Campos previstos: data, tipo de consulta e perguntas para a equipa de saúde.</p><p className="small">Documentos e resultados não são recolhidos nesta demonstração.</p></div>}</section>
    <section className="card stack"><h2>Preparar a apresentação</h2><p className="small muted">Repor o exemplo substitui o perfil, os registos, os favoritos e as conversas atuais pelos dados fictícios da apresentação.</p>
      <button className="secondary" onClick={() => setReset(true)}><RotateCcw size={18} /> Repor exemplo de apresentação</button>
      <button className="text-button" onClick={() => { logoutToAuth(); navigate('/auth'); }}><LogOut size={18} /> Sair da demonstração</button>
      <p className="small muted">Sair mantém o perfil guardado para retomar. Este acesso não verifica contas reais.</p>
    </section>{reset && <Dialog title="Repor o exemplo de apresentação?" onClose={() => setReset(false)}><div className="stack"><p>O exemplo fictício de 34 semanas substitui o perfil, os registos, os favoritos e as conversas atuais.</p><button className="secondary full" onClick={() => setReset(false)}>Manter os dados atuais</button><button className="primary full" onClick={() => { resetDemoData(); navigate('/'); }}>Substituir pelo exemplo</button></div></Dialog>}</div>;
}

