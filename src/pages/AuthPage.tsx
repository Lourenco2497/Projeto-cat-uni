import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [email, setEmail] = useState(user.email || 'rita.exemplo@catuni.pt');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulado: Qualquer email avança diretamente para a Avaliação Inicial
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#EDE3E1] flex flex-col items-center justify-center p-4">
      {/* Moldura mobile-first */}
      <div className="w-full max-w-[412px] bg-[#FBE4E2] min-h-[780px] rounded-[36px] shadow-2xl p-6 flex flex-col justify-between border border-[#F3D5D1] text-[#2D1E2F]">
        
        {/* Topo: Marca e Logótipo */}
        <div className="pt-8 text-center flex flex-col items-center">
          {/* Logótipo Placeholder (Círculo com X estilizado conforme Wireframe 1) */}
          <div className="w-20 h-20 rounded-full bg-[#4A154B] text-white flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-white/60 mb-4 animate-scale-up">
            <span className="tracking-tighter">C<span className="text-[#E07A5F]">✕</span></span>
          </div>

          <h1 className="text-2xl font-bold text-[#4A154B] tracking-tight">
            CatUni Materna
          </h1>
          <p className="text-xs text-[#6E5C6F] mt-1 max-w-[260px] leading-relaxed">
            Fisioterapia Obstétrica & Exercício Personalizado na Gravidez
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#7B287D] text-[11px] font-semibold border border-[#F3D5D1]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Protótipo de Apresentação Académica</span>
          </div>
        </div>

        {/* Formulário de Criação de Conta (Wireframe 1) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F3D5D1] my-auto">
          <div className="text-center mb-5">
            <h2 className="text-lg font-bold text-[#2D1E2F]">Criar conta</h2>
            <p className="text-xs text-[#6E5C6F] mt-0.5">
              Começa o teu plano de movimento seguro
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#2D1E2F] mb-1.5">
                Endereço de email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="o-teu-email@exemplo.pt"
                className="w-full px-4 py-3 rounded-2xl bg-[#FFF7F6] border border-[#F3D5D1] text-xs text-[#2D1E2F] placeholder-[#6E5C6F]/50 focus:bg-white focus:outline-none focus:border-[#7B287D] transition-colors"
              />
              <span className="text-[10px] text-[#6E5C6F] mt-1 block">
                *Simulação: qualquer email avança sem password.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-full bg-[#4A154B] hover:bg-[#370C38] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Separador "ou" */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#F3D5D1]" />
            </div>
            <span className="relative px-3 bg-white text-[11px] font-semibold text-[#6E5C6F]">
              ou
            </span>
          </div>

          {/* Botões Sociais Simulados (Google / Apple) */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => navigate('/onboarding')}
              className="w-full py-2.5 px-4 rounded-full border border-[#F3D5D1] bg-white hover:bg-[#FFF7F6] text-xs font-semibold text-[#2D1E2F] flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continuar com Google</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/onboarding')}
              className="w-full py-2.5 px-4 rounded-full border border-[#F3D5D1] bg-white hover:bg-[#FFF7F6] text-xs font-semibold text-[#2D1E2F] flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.67-1.26" />
              </svg>
              <span>Continuar com Apple</span>
            </button>
          </div>

          {/* Atalho direto para saltar login durante apresentações */}
          <div className="mt-4 pt-3 border-t border-[#F5E5E2] text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-[11px] text-[#7B287D] hover:underline font-semibold flex items-center justify-center gap-1 mx-auto"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ver protótipo já preenchido (Salto Rápido)</span>
            </button>
          </div>
        </div>

        {/* Rodapé: Termos e Privacidade */}
        <div className="pb-4 text-center text-[10px] text-[#6E5C6F] leading-tight px-4">
          Ao continuar, concordas com os Termos de Utilização e a Política de Privacidade deste protótipo académico de Fisioterapia Obstétrica.
        </div>
      </div>
    </div>
  );
};
