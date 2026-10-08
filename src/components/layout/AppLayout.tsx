import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Heart, CalendarDays, ChartNoAxesCombined, Users, BookOpen, UserRound } from 'lucide-react';
import { useApp } from '../../store/useApp';
import { SAFETY_DISCLAIMER_TEXT } from '../../data/exercises';

const items = [{ to:'/', label:'Hoje', icon:Heart }, { to:'/calendar', label:'Calendário', icon:CalendarDays }, { to:'/stats', label:'Evolução', icon:ChartNoAxesCombined }, { to:'/community', label:'Comunidade', icon:Users }, { to:'/articles', label:'Aprender', icon:BookOpen }];
export function AppLayout() {
  const { user, storageNotice } = useApp();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.getElementById('content')?.focus({ preventScroll: true });
  }, [pathname]);
  return <div className="app-shell">
    <a className="skip-link" href="#content">Saltar para o conteúdo</a>
    <aside className="sidebar">
      <Link className="wordmark sidebar-brand" to="/">catuni<span>materna · ao teu ritmo</span></Link>
      <nav className="main-nav" aria-label="Navegação principal">{items.map(({ to, label, icon:Icon }) =>
        <Link key={to} to={to} aria-current={pathname === to || to === '/community' && pathname === '/chat' ? 'page' : undefined}><Icon size={21} strokeWidth={1.7} /><span>{label}</span></Link>
      )}</nav>
    </aside>
    <div className="app-main">
      <header className="app-header"><Link className="wordmark" to="/">catuni materna<span>AO TEU RITMO</span></Link>
        <div className="cluster"><span className="pill">Demo académica</span><Link to="/profile" className="avatar" aria-label="O meu perfil"><UserRound size={20}/></Link></div>
      </header>
      <main id="content" tabIndex={-1} className="page-wrap" key={pathname}>
        {storageNotice && <p role="status" className="callout danger" style={{ marginBottom:20 }}>{storageNotice}</p>}
        <Outlet />
        <footer className="safety-footer"><p>{SAFETY_DISCLAIMER_TEXT}</p><p style={{ marginTop:8 }}>Perfil e conteúdos fictícios · {user.week} semanas · Conteúdo clínico por validar.</p></footer>
      </main>
    </div>
  </div>;
}



