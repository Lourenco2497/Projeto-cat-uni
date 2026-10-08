import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { useApp } from './store/useApp';
import { AppLayout } from './components/layout/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { CommunityPage } from './pages/CommunityPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
const StatsPage = lazy(()=>import('./pages/StatsPage').then(m=>({default:m.StatsPage})));

function DemoAccess({ assessment = false }: { assessment?: boolean }) {
  const { isDemoSession, hasCompletedOnboarding } = useApp();
  if (!isDemoSession) return <Navigate to="/auth" replace/>;
  if (!assessment && !hasCompletedOnboarding) return <Navigate to="/onboarding" replace/>;
  return <Outlet/>;
}
export default function App() {
  return <AppProvider><BrowserRouter><Suspense fallback={<main className="auth-shell"><p role="status">A preparar o teu espaço…</p></main>}><Routes>
    <Route path="/auth" element={<AuthPage/>}/>
    <Route element={<DemoAccess assessment/>}><Route path="/onboarding" element={<OnboardingPage/>}/></Route>
    <Route element={<DemoAccess/>}><Route element={<AppLayout/>}>
      <Route path="/" element={<HomePage/>}/><Route path="/calendar" element={<CalendarPage/>}/>
      <Route path="/stats" element={<StatsPage/>}/><Route path="/community" element={<CommunityPage/>}/>
      <Route path="/articles" element={<ArticlesPage/>}/><Route path="/chat" element={<ChatPage/>}/><Route path="/profile" element={<ProfilePage/>}/>
    </Route></Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes></Suspense></BrowserRouter></AppProvider>;
}

