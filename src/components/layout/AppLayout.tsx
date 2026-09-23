import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { 
  Heart, 
  Calendar as CalendarIcon, 
  PieChart as StatsIcon, 
  Users, 
  BookOpen, 
  MessageCircle, 
  RotateCcw, 
  Smartphone, 
  Maximize2,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { SAFETY_DISCLAIMER_TEXT } from '../../data/exercises';

export const AppLayout: React.FC = () => {
  const { user, resetDemoData, logoutToAuth } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileFrameEnabled, setIsMobileFrameEnabled] = useState(true);
  const [showResetNotice, setShowResetNotice] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setShowResetNotice(true);
    setTimeout(() => setShowResetNotice(false), 2500);
  };

  const navItems = [
    { to: '/', label: 'Início', icon: Heart },
    { to: '/calendar', label: 'Calendário', icon: CalendarIcon },
    { to: '/stats', label: 'Estatísticas', icon: StatsIcon },
    { to: '/community', label: 'Comunidade', icon: Users },
    { to: '/articles', label: 'Artigos', icon: BookOpen },
    { to: '/chat', label: 'Chat', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-[#E5D7D5] flex flex-col items-center justify-start md:py-6 text-[#2D1E2F]">
      {/* Barra Superior de Controlo para Apresentação em Desktop */}
      <aside aria-label="Controlos de Apresentação" className="hidden md:flex items-center justify-between w-full max-w-[440px] px-3 py-1.5 mb-2 text-xs text-[#6E5C6F]">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#1E7E68] animate-pulse" />
          <span>Protótipo Académico · CatUni</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFrameEnabled(!isMobileFrameEnabled)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white text-[#4A154B] transition-colors shadow-2xs cursor-pointer"
            title="Alternar moldura móvel"
          >
            {isMobileFrameEnabled ? <Maximize2 className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
            <span>{isMobileFrameEnabled ? 'Ecrã Cheio' : 'Moldura'}</span>
          </button>
        </div>
      </aside>

      {/* Notificação Temporária de Reposição de Dados */}
      {showResetNotice && (
        <div className="fixed top-4 z-50 px-4 py-2 bg-[#4A154B] text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Dados de demonstração repostos com sucesso!</span>
        </div>
      )}

      {/* Contentor Principal da App (Mobile-First) */}
      <div 
        className={`w-full bg-[#FBE4E2] flex flex-col relative transition-all duration-300 ${
          isMobileFrameEnabled 
            ? 'max-w-[412px] min-h-[844px] md:h-[844px] md:rounded-[40px] md:shadow-[0_20px_60px_-15px_rgba(74,21,75,0.25)] md:border-[8px] md:border-[#381B34] md:overflow-hidden'
            : 'max-w-2xl min-h-screen shadow-lg'
        }`}
      >
        {/* Barra de Estado do Telemóvel (Simulação no Desktop) */}
        <div className="hidden md:flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-[#4A154B]/80 bg-[#FBE4E2] select-none">
          <span>9:41</span>
          {/* Dynamic Island / Notch */}
          <div className="w-24 h-4 bg-[#381B34] rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-4 h-2 border border-current rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-current rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Cabeçalho da Aplicação */}
        <header className="sticky top-0 z-30 px-4 py-3 bg-[#FBE4E2]/90 backdrop-blur-md border-b border-[#F3D5D1]/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Logótipo Placeholder (Círculo com X estilizado / monograma) */}
            <div className="w-8 h-8 rounded-full bg-[#4A154B] text-white flex items-center justify-center font-bold text-sm shadow-xs border border-white/40">
              <span className="tracking-tighter">C<span className="text-[#E07A5F]">✕</span></span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#4A154B] block leading-none">
                CatUni Materna
              </span>
              <span className="text-[10px] text-[#6E5C6F] font-medium leading-none">
                Semana {user.week} · {user.trimester}.º Trimestre
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Botão de Repor Dados Demo */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#7B287D] text-[11px] font-semibold border border-[#F3D5D1] shadow-2xs transition-colors cursor-pointer"
              title="Repor dados da apresentação"
              aria-label="Repor dados de demonstração"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Demo</span>
            </button>

            {/* Botão para testar fluxo de Login/Avaliação */}
            <button
              onClick={() => {
                logoutToAuth();
                navigate('/auth');
              }}
              className="p-1.5 rounded-full text-[#6E5C6F] hover:text-[#4A154B] hover:bg-white/60 transition-colors"
              title="Reiniciar fluxo de registo / avaliação"
              aria-label="Sair para tela de criação de conta"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Área de Conteúdo Específico do Ecrã (com scroll independente) */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-28">
          <Outlet />

          {/* Aviso Clínico de Segurança Fixo no Rodapé dos Ecrãs */}
          <div className="mt-8 p-3 rounded-2xl bg-[#FFF7F6] border border-[#F5E5E2] text-left">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#7B287D] shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#6E5C6F] leading-tight">
                {SAFETY_DISCLAIMER_TEXT}
              </p>
            </div>
          </div>
        </main>

        {/* Barra de Navegação Inferior Flutuante em Pílula (Wireframe) */}
        <nav 
          aria-label="Navegação Principal" 
          className="absolute bottom-4 left-3 right-3 z-40 bg-white/95 backdrop-blur-md rounded-full shadow-[0_8px_25px_rgba(74,21,75,0.18)] border border-[#F3D5D1] px-1.5 py-1.5 flex items-center justify-between"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`relative flex flex-col items-center justify-center min-w-[50px] py-1.5 px-2 rounded-full transition-all duration-200 select-none min-h-[44px] ${
                  isActive
                    ? 'bg-[#7B287D] text-white shadow-xs'
                    : 'text-[#6E5C6F] hover:text-[#4A154B] hover:bg-[#FFF7F6]'
                }`}
                title={item.label}
                aria-label={item.label}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[9px] mt-0.5 font-medium leading-none ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
