import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ActivityLevel, UserProfile, Trimester } from '../types';
import { generatePersonalizedPlan } from '../lib/planGenerator';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  AlertTriangle, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  Baby,
  Activity,
  Calendar
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useApp();

  const [step, setStep] = useState(1);

  // Estados do Stepper
  const [week, setWeek] = useState(user.week || 24);
  const [isFirstPregnancy, setIsFirstPregnancy] = useState(user.isFirstPregnancy ?? true);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(user.previousActivityLevel || 'moderate');
  const [complaints, setComplaints] = useState<string[]>(user.complaints || ['dor lombar', 'cansaço']);
  const [clinicalFlags, setClinicalFlags] = useState<string[]>(user.clinicalFlags || []);
  const [goals, setGoals] = useState<string[]>(user.goals || ['Aliviar dor lombar', 'Preparar pavimento pélvico']);

  // Cálculo de Trimestre
  const getTrimester = (w: number): Trimester => {
    if (w <= 12) return 1;
    if (w <= 27) return 2;
    return 3;
  };

  const getFruitComparison = (w: number) => {
    if (w <= 8) return { fruit: 'Framboesa', size: '~1.6 cm', icon: '🫐' };
    if (w <= 12) return { fruit: 'Lima', size: '~5.4 cm', icon: '🍋' };
    if (w <= 16) return { fruit: 'Abacate', size: '~12 cm', icon: '🥑' };
    if (w <= 20) return { fruit: 'Manga', size: '~25 cm', icon: '🥭' };
    if (w <= 24) return { fruit: 'Espiga de Milho', size: '~30 cm', icon: '🌽' };
    if (w <= 28) return { fruit: 'Beringela', size: '~37 cm', icon: '🍆' };
    if (w <= 32) return { fruit: 'Ananás', size: '~42 cm', icon: '🍍' };
    if (w <= 36) return { fruit: 'Papaia grande', size: '~47 cm', icon: '🍈' };
    return { fruit: 'Melancia', size: '~50 cm', icon: '🍉' };
  };

  const fruitInfo = getFruitComparison(week);

  // Lista de queixas comuns
  const COMPLAINT_OPTIONS = [
    { id: 'dor lombar', label: 'Dor lombar / nas costas', icon: '🧘‍♀️' },
    { id: 'dor pélvica', label: 'Dor pélvica / sínfise púbica', icon: '⚡' },
    { id: 'incontinência', label: 'Perdas urinárias de esforço', icon: '💧' },
    { id: 'edemas', label: 'Pernas pesadas / edemas', icon: '🦶' },
    { id: 'cansaço', label: 'Fadiga acentuada', icon: '😴' },
    { id: 'tensão ombros', label: 'Tensão cervical e nos ombros', icon: '💆‍♀️' },
    { id: 'náuseas', label: 'Náuseas matinais', icon: '🍃' },
  ];

  // Fatores de risco / contraindicações clínicas
  const CLINICAL_FLAG_OPTIONS = [
    { id: 'gravidez_risco', label: 'Gravidez de risco com indicação médica de repouso' },
    { id: 'hipertensao', label: 'Hipertensão gestacional ou suspeita de pré-eclâmpsia' },
    { id: 'sangramento', label: 'Perdas de sangue ou líquido amniótico' },
    { id: 'colo_curto', label: 'Incompetência cervical / colo do útero curto' },
  ];

  // Opções de objetivos
  const GOAL_OPTIONS = [
    'Aliviar dor lombar e rigidez articular',
    'Fortalecer e relaxar o pavimento pélvico',
    'Preparar o corpo e a mobilidade para o parto',
    'Manter energia e condicionamento suave',
    'Reduzir a ansiedade através da respiração',
  ];

  const toggleComplaint = (id: string) => {
    setComplaints(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleFlag = (id: string) => {
    setClinicalFlags(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  // Gera o plano em tempo real
  const generatedPlan = generatePersonalizedPlan({
    week,
    isFirstPregnancy,
    previousActivityLevel: activityLevel,
    complaints,
    clinicalFlags,
    goals
  });

  const handleFinish = () => {
    const updatedProfile: UserProfile = {
      ...user,
      week,
      trimester: getTrimester(week),
      isFirstPregnancy,
      previousActivityLevel: activityLevel,
      complaints,
      clinicalFlags,
      goals,
      profileType: generatedPlan.profileType,
      planId: `plan-${generatedPlan.profileType}-w${week}`
    };

    completeOnboarding(updatedProfile);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#EDE3E1] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[412px] bg-[#FBE4E2] min-h-[780px] rounded-[36px] shadow-2xl p-6 flex flex-col justify-between border border-[#F3D5D1] text-[#2D1E2F]">
        
        {/* Cabeçalho do Stepper */}
        <div>
          <div className="flex items-center justify-between mb-4">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="p-2 rounded-full hover:bg-white/60 text-[#6E5C6F] transition-colors"
                aria-label="Passo anterior"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : <div className="w-8" />}

            <span className="text-xs font-bold text-[#7B287D] uppercase tracking-wider">
              Avaliação Inicial · Passo {step} de 5
            </span>

            <span className="text-xs text-[#6E5C6F] font-semibold">
              {Math.round((step / 5) * 100)}%
            </span>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-[#7B287D] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Corpo do Passo */}
        <div className="my-auto">
          {/* PASSO 1: Semanas de Gestação */}
          {step === 1 && (
            <div className="animate-fade-in space-y-5 text-center">
              <div>
                <h2 className="text-xl font-bold text-[#2D1E2F]">Quantas semanas de gestação tens?</h2>
                <p className="text-xs text-[#6E5C6F] mt-1">
                  O plano diário adapta-se precisamente a cada fase do teu bebé
                </p>
              </div>

              {/* Cartão de Visualização da Fruta e Semana */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F3D5D1] flex flex-col items-center">
                <div className="text-4xl mb-2">{fruitInfo.icon}</div>
                <div className="text-3xl font-extrabold text-[#4A154B] tracking-tight">
                  {week} <span className="text-sm font-semibold text-[#6E5C6F]">semanas</span>
                </div>
                <div className="text-xs font-bold text-[#7B287D] mt-1">
                  {getTrimester(week)}.º Trimestre
                </div>
                <div className="text-xs text-[#6E5C6F] mt-2">
                  Tamanho aproximado de: <span className="font-semibold text-[#2D1E2F]">{fruitInfo.fruit}</span> ({fruitInfo.size})
                </div>

                {/* Slider de Semanas */}
                <div className="w-full mt-6">
                  <input
                    type="range"
                    min="4"
                    max="41"
                    value={week}
                    onChange={(e) => setWeek(Number(e.target.value))}
                    className="w-full h-2 bg-[#FBE4E2] rounded-lg appearance-none cursor-pointer accent-[#7B287D]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6E5C6F] mt-2 font-medium">
                    <span>4 sem (1.º Tri)</span>
                    <span>20 sem (Metade)</span>
                    <span>40 sem (Termo)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASSO 2: Histórico e Atividade Prévia */}
          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#2D1E2F]">Histórico de Movimento</h2>
                <p className="text-xs text-[#6E5C6F] mt-1">
                  Ajustamos as repetições e a intensidade de acordo com o teu hábito anterior
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#F3D5D1] space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#2D1E2F] block mb-2">
                    É a tua primeira gravidez?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFirstPregnancy(true)}
                      className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                        isFirstPregnancy 
                          ? 'bg-[#7B287D] text-white border-[#7B287D] shadow-xs'
                          : 'bg-[#FFF7F6] text-[#2D1E2F] border-[#F3D5D1]'
                      }`}
                    >
                      Sim, é a primeira
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFirstPregnancy(false)}
                      className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                        !isFirstPregnancy 
                          ? 'bg-[#7B287D] text-white border-[#7B287D] shadow-xs'
                          : 'bg-[#FFF7F6] text-[#2D1E2F] border-[#F3D5D1]'
                      }`}
                    >
                      Não, já estive grávida
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D1E2F] block mb-2">
                    Nível de atividade antes da gravidez:
                  </label>
                  <div className="space-y-2">
                    {[
                      { level: 'sedentary' as ActivityLevel, label: 'Sedentária / Pouco ativa', desc: 'Caminhadas ocasionais ou sem exercício regular' },
                      { level: 'moderate' as ActivityLevel, label: 'Moderadamente ativa', desc: '1 a 3 vezes por semana (ginásio, pilates, caminhada)' },
                      { level: 'high' as ActivityLevel, label: 'Muito ativa / Desportista', desc: 'Mais de 3 vezes por semana com regularidade' },
                    ].map(item => (
                      <button
                        key={item.level}
                        type="button"
                        onClick={() => setActivityLevel(item.level)}
                        className={`w-full p-3 rounded-2xl text-left border transition-all flex items-start justify-between ${
                          activityLevel === item.level
                            ? 'bg-[#F4E8F4] border-[#7B287D] text-[#4A154B]'
                            : 'bg-[#FFF7F6] border-[#F3D5D1] text-[#2D1E2F] hover:bg-white'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className="text-[10px] text-[#6E5C6F] mt-0.5">{item.desc}</div>
                        </div>
                        {activityLevel === item.level && (
                          <Check className="w-4 h-4 text-[#7B287D] shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASSO 3: Queixas Atuais */}
          {step === 3 && (
            <div className="animate-fade-in space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#2D1E2F]">Sentes algum desconforto atual?</h2>
                <p className="text-xs text-[#6E5C6F] mt-1">
                  Seleciona todas as opções que se aplicam ao teu dia a dia
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#F3D5D1]">
                <div className="flex flex-wrap gap-2">
                  {COMPLAINT_OPTIONS.map(opt => {
                    const isSelected = complaints.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleComplaint(opt.id)}
                        className={`flex items-center gap-2 py-2.5 px-3.5 rounded-full text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-[#7B287D] text-white border-[#7B287D] shadow-xs'
                            : 'bg-[#FFF7F6] text-[#2D1E2F] border-[#F3D5D1] hover:bg-white'
                        }`}
                      >
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-[#6E5C6F] mt-4 text-center">
                  Os exercícios serão filtrados para aliviar estas áreas com segurança.
                </p>
              </div>
            </div>
          )}

          {/* PASSO 4: Dados Clínicos / Sinalizações de Alerta */}
          {step === 4 && (
            <div className="animate-fade-in space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#2D1E2F]">Segurança Clínica & Cuidados</h2>
                <p className="text-xs text-[#6E5C6F] mt-1">
                  Alguma destas condições foi diagnosticada pelo teu médico?
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#F3D5D1] space-y-2.5">
                {CLINICAL_FLAG_OPTIONS.map(flag => {
                  const isChecked = clinicalFlags.includes(flag.id);
                  return (
                    <label
                      key={flag.id}
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-[#FFF1F0] border-[#C53030]' 
                          : 'bg-[#FFF7F6] border-[#F3D5D1] hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFlag(flag.id)}
                        className="mt-1 w-4 h-4 rounded-md accent-[#C53030] cursor-pointer"
                      />
                      <span className="text-xs text-[#2D1E2F] leading-tight font-medium">
                        {flag.label}
                      </span>
                    </label>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setClinicalFlags([])}
                  className={`w-full py-2 text-center text-xs font-semibold rounded-xl transition-colors ${
                    clinicalFlags.length === 0 
                      ? 'text-[#1E7E68] bg-[#E8F5F2]' 
                      : 'text-[#6E5C6F] hover:bg-[#FFF7F6]'
                  }`}
                >
                  Nenhuma das anteriores (Gravidez sem complicações)
                </button>
              </div>

              {/* Aviso se houver alguma sinalização */}
              {clinicalFlags.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FFF1F0] border border-[#FAD2CF] flex items-start gap-3 text-left animate-shake">
                  <AlertTriangle className="w-5 h-5 text-[#C53030] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#C53030]">Aviso Clínico Obrigatório</div>
                    <p className="text-[11px] text-[#C53030]/90 leading-tight mt-0.5">
                      Identificámos fatores que requerem validação médica. O teu plano gerado será estritamente conservador (exercícios respiratórios e de relaxamento suave). Consulta o teu obstetra antes de iniciar.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PASSO 5: Objetivos Principais & Resumo do Plano Gerado */}
          {step === 5 && (
            <div className="animate-fade-in space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#2D1E2F]">Os teus Objetivos</h2>
                <p className="text-xs text-[#6E5C6F] mt-1">
                  O que gostarias mais de alcançar com este plano diário?
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#F3D5D1] space-y-2">
                {GOAL_OPTIONS.map(g => {
                  const isChecked = goals.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGoal(g)}
                      className={`w-full p-2.5 rounded-2xl text-left text-xs font-semibold border flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-[#F4E8F4] border-[#7B287D] text-[#4A154B]'
                          : 'bg-[#FFF7F6] border-[#F3D5D1] text-[#2D1E2F]'
                      }`}
                    >
                      <span>{g}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#7B287D]" />}
                    </button>
                  );
                })}
              </div>

              {/* Cartão de Pré-Visualização do Perfil Gerado pela Função Pura */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-[#4A154B] to-[#7B287D] text-white shadow-md text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/20 rounded-full">
                    Perfil: {generatedPlan.profileType}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                </div>
                <div className="text-sm font-bold">{generatedPlan.title}</div>
                <p className="text-[11px] text-white/90 mt-1 leading-snug">
                  {generatedPlan.summary}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Stepper com Botões de Ação */}
        <div className="pt-4 flex gap-3">
          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="w-full py-3.5 px-4 rounded-full bg-[#4A154B] hover:bg-[#370C38] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>Próximo Passo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3.5 px-4 rounded-full bg-[#1E7E68] hover:bg-[#186654] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Concluir Avaliação & Ativar Plano</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
