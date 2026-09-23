import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ExerciseIllustration } from '../components/ui/ExerciseIllustration';
import { DemonstrationModal } from '../components/ui/DemonstrationModal';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Flame, 
  BookOpen, 
  MessageCircle,
  Baby,
  Heart,
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    todayDateStr, 
    workoutLogs, 
    toggleCompleteWorkout,
    getExerciseForDate
  } = useApp();

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Exercício recomendado para hoje
  const todayExercise = getExerciseForDate(todayDateStr);
  const todayLog = workoutLogs[todayDateStr];
  const isTodayCompleted = todayLog?.completed || false;

  // Comparação de tamanho do bebé
  const getFruitComparison = (w: number) => {
    if (w <= 8) return { fruit: 'uma framboesa', size: '~1.6 cm', weight: '~1g', icon: '🫐' };
    if (w <= 12) return { fruit: 'uma lima', size: '~5.4 cm', weight: '~14g', icon: '🍋' };
    if (w <= 16) return { fruit: 'um abacate', size: '~12 cm', weight: '~100g', icon: '🥑' };
    if (w <= 20) return { fruit: 'uma manga', size: '~25 cm', weight: '~300g', icon: '🥭' };
    if (w <= 24) return { fruit: 'uma espiga de milho', size: '~30 cm', weight: '~600g', icon: '🌽' };
    if (w <= 28) return { fruit: 'uma beringela', size: '~37 cm', weight: '~1 kg', icon: '🍆' };
    if (w <= 32) return { fruit: 'um ananás', size: '~42 cm', weight: '~1.7 kg', icon: '🍍' };
    if (w <= 36) return { fruit: 'uma papaia grande', size: '~47 cm', weight: '~2.6 kg', icon: '🍈' };
    return { fruit: 'uma melancia', size: '~50 cm', weight: '~3.4 kg', icon: '🍉' };
  };

  const babyInfo = getFruitComparison(user.week);

  // Progresso dos últimos 7 dias da semana atual
  const getWeekProgress = () => {
    const today = new Date(todayDateStr + 'T00:00:00');
    const dayOfWeek = today.getDay(); // 0 = Domingo
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    const days = [];
    const letters = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const completed = workoutLogs[dateStr]?.completed;
      const isToday = dateStr === todayDateStr;

      days.push({
        letter: letters[i],
        dayNum: d.getDate(),
        completed,
        isToday,
        dateStr
      });
    }

    return days;
  };

  const weekDays = getWeekProgress();
  const completedCountThisWeek = weekDays.filter(d => d.completed).length;

  return (
    <div className="space-y-4 animate-fade-in text-left">
      
      {/* 1. Saudação Calorosa & Resumo da Gravidez (Estilo Flo) */}
      <div className="bg-gradient-to-br from-[#4A154B] to-[#7B287D] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/80">
              Hoje estás de {user.week} semanas · {user.trimester}.º Trimestre
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
              {user.profileType === 'moderado' ? 'Plano Moderado' : 'Plano Suave'}
            </span>
          </div>

          <h1 className="text-xl font-extrabold tracking-tight leading-snug">
            Olá, {user.name.split(' ')[0]}! 🌸
          </h1>

          {/* Destaque do Bebé e Fruta */}
          <div className="p-3 bg-white/10 backdrop-blur-xs rounded-2xl flex items-center gap-3 border border-white/15">
            <div className="text-3xl shrink-0">{babyInfo.icon}</div>
            <div className="text-xs">
              <div className="font-semibold text-white/90">
                O teu bebé tem o tamanho de <span className="font-bold text-white">{babyInfo.fruit}</span>
              </div>
              <div className="text-[11px] text-white/70">
                Comprimento médio de {babyInfo.size} e cerca de {babyInfo.weight}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Barra de Progresso Semanal */}
      <div className="bg-white rounded-3xl p-4 shadow-xs border border-[#F3D5D1] space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#2D1E2F] uppercase tracking-wider">
            O teu ritmo esta semana
          </h2>
          <span className="text-xs font-bold text-[#7B287D]">
            {completedCountThisWeek} de 5 dias concluídos
          </span>
        </div>

        {/* Tira dos 7 dias */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map(d => (
            <div
              key={d.dateStr}
              onClick={() => navigate('/calendar')}
              className={`py-2 rounded-2xl flex flex-col items-center cursor-pointer transition-all ${
                d.isToday
                  ? 'bg-[#FBE4E2] border border-[#7B287D]'
                  : 'bg-[#FFF7F6] hover:bg-white'
              }`}
            >
              <span className="text-[10px] font-semibold text-[#6E5C6F] mb-1">{d.letter}</span>
              {d.completed ? (
                <CheckCircle2 className="w-4 h-4 fill-[#1E7E68] text-white" />
              ) : (
                <Circle className={`w-4 h-4 ${d.isToday ? 'text-[#7B287D]' : 'text-[#F3D5D1]'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Exercício Recomendado para Hoje (Cartão Principal) */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#F3D5D1] space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#7B287D] tracking-wider">
              Exercício Recomendado Hoje
            </div>
            <h2 className="text-base font-bold text-[#2D1E2F] leading-tight mt-0.5">
              {todayExercise.name}
            </h2>
            <p className="text-xs text-[#6E5C6F] mt-1 leading-relaxed">
              {todayExercise.shortDescription}
            </p>
          </div>

          <button
            onClick={() => toggleCompleteWorkout(todayDateStr, todayExercise.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 ${
              isTodayCompleted
                ? 'bg-[#E8F5F2] text-[#1E7E68] border border-[#C7E9E2]'
                : 'bg-[#4A154B] text-white hover:bg-[#370C38]'
            }`}
          >
            {isTodayCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Feito</span>
              </>
            ) : (
              <span>Concluir</span>
            )}
          </button>
        </div>

        {/* Ilustração */}
        <div className="rounded-2xl overflow-hidden border border-[#F3D5D1]">
          <ExerciseIllustration type={todayExercise.illustrationKey} className="w-full h-44 object-cover" />
        </div>

        {/* Botão de Ver Demonstração ou Ir para Calendário */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="text-xs font-bold text-[#7B287D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ver demonstração passo a passo</span>
          </button>

          <button
            onClick={() => navigate('/calendar')}
            className="text-xs font-semibold text-[#6E5C6F] hover:text-[#4A154B] flex items-center gap-1"
          >
            <span>Registar dor/sensações</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 4. Dica de Postura Fisioterapêutica do Dia */}
      <div className="p-4 rounded-3xl bg-[#FFF7F6] border border-[#F5E5E2] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#7B287D]">
          <ShieldCheck className="w-4 h-4 text-[#7B287D]" />
          <span>Dica Postural do Fisioterapeuta</span>
        </div>
        <p className="text-xs text-[#2D1E2F] leading-relaxed">
          "Ao levantar da cama ou do sofá, roda o corpo todo em bloco para o lado antes de apoiar os pés no chão. Isto protege a linha alba abdominal e reduz a tensão discal lombar."
        </p>
      </div>

      {/* 5. Acessos Rápidos em Grelha (Comunidade & Artigos) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div
          onClick={() => navigate('/articles')}
          className="bg-white rounded-3xl p-4 border border-[#F3D5D1] shadow-2xs hover:border-[#7B287D] transition-colors cursor-pointer space-y-1.5"
        >
          <BookOpen className="w-5 h-5 text-[#7B287D]" />
          <div className="text-xs font-bold text-[#2D1E2F]">Artigos Clínicos</div>
          <p className="text-[10px] text-[#6E5C6F]">Evidência sobre pavimento pélvico e parto</p>
        </div>

        <div
          onClick={() => navigate('/chat')}
          className="bg-white rounded-3xl p-4 border border-[#F3D5D1] shadow-2xs hover:border-[#7B287D] transition-colors cursor-pointer space-y-1.5"
        >
          <MessageCircle className="w-5 h-5 text-[#E07A5F]" />
          <div className="text-xs font-bold text-[#2D1E2F]">Partilha & Chat</div>
          <p className="text-[10px] text-[#6E5C6F]">Fala com outras grávidas do {user.trimester}.º trimestre</p>
        </div>
      </div>

      {/* Modal de Demonstração */}
      <DemonstrationModal
        exercise={todayExercise}
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onMarkCompleted={() => toggleCompleteWorkout(todayDateStr, todayExercise.id)}
        isCompleted={isTodayCompleted}
      />
    </div>
  );
};
