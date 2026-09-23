import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { StatsPage } from './pages/StatsPage';
import { CommunityPage } from './pages/CommunityPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ChatPage } from './pages/ChatPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Fluxo de Autenticação / Criar Conta (Wireframe 1) */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Fluxo de Avaliação Inicial / Stepper Clínico */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Navegação Principal com Barra Flutuante em Pílula e Moldura Móvel */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
