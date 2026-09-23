import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ExerciseIllustration } from '../components/ui/ExerciseIllustration';
import { DemonstrationModal } from '../components/ui/DemonstrationModal';
import { WorkoutLog } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Save, 
  Sparkles,
  Info
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { 
    workoutLogs, 
    selectedDateStr, 
    setSelectedDateStr, 
    todayDateStr, 
    saveWorkoutLog, 
    toggleCompleteWorkout,
    getExerciseForDate
  } = useApp();

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Navegação de mês
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date(selectedDateStr + 'T00:00:00'));

  // Exercício do dia selecionado
  const activeExercise = getExerciseForDate(selectedDateStr);

  // Registo atual para a data selecionada
  const currentLog: WorkoutLog = workoutLogs[selectedDateStr] || {
    date: selectedDateStr,
    completed: false,
    exerciseId: activeExercise.id,
    symptoms: [],
    painLevel: 2,
    difficultyLevel: 3,
    contractions: 'nenhuma',
    actualReps: 10,
    actualSets: 2,
    notes: '',
    loggedAt: ''
  };

  // Estados locais para o formulário de registo
  const [formCompleted, setFormCompleted] = useState(currentLog.completed);
  const [formSymptoms, setFormSymptoms] = useState<string[]>(currentLog.symptoms || []);
  const [formPain, setFormPain] = useState<number>(currentLog.painLevel ?? 2);
  const [formDifficulty, setFormDifficulty] = useState<number>(currentLog.difficultyLevel ?? 3);
  const [formContractions, setFormContractions] = useState<'nenhuma' | 'ocasionais' | 'regulares'>(currentLog.contractions || 'nenhuma');
  const [formReps, setFormReps] = useState<number>(currentLog.actualReps || 10);
  const [formSets, setFormSets] = useState<number>(currentLog.actualSets || 2);

  // Sincroniza formulário ao mudar o dia selecionado
  React.useEffect(() => {
    const log = workoutLogs[selectedDateStr];
    if (log) {
      setFormCompleted(log.completed);
      setFormSymptoms(log.symptoms || []);
      setFormPain(log.painLevel ?? 2);
      setFormDifficulty(log.difficultyLevel ?? 3);
      setFormContractions(log.contractions || 'nenhuma');
      setFormReps(log.actualReps || 10);
      setFormSets(log.actualSets || 2);
    } else {
      setFormCompleted(false);
      setFormSymptoms([]);
      setFormPain(2);
      setFormDifficulty(3);
      setFormContractions('nenhuma');
      setFormReps(10);
      setFormSets(2);
    }
  }, [selectedDateStr, workoutLogs]);

  // Lista de sintomas selecionáveis
  const AVAILABLE_SYMPTOMS = [
    'Sem queixas',
    'Dor lombar',
    'Peso pélvico',
    'Cansaço',
    'Falta de ar ligeira',
    'Tensão nos ombros',
    'Rigidez matinal'
  ];

  const toggleSymptom = (sym: string) => {
    if (sym === 'Sem queixas') {
      setFormSymptoms(['Sem queixas']);
      return;
    }
    const filtered = formSymptoms.filter(s => s !== 'Sem queixas');
    if (filtered.includes(sym)) {
      setFormSymptoms(filtered.filter(s => s !== sym));
    } else {
      setFormSymptoms([...filtered, sym]);
    }
  };

  // Cálculo da tira semanal em torno da data selecionada
  const getWeeklyStrip = () => {
    const current = new Date(selectedDateStr + 'T00:00:00');
    const dayOfWeek = current.getDay(); // 0 = Domingo, 1 = Segunda...
    
    // Obter o Domingo dessa semana
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - dayOfWeek);

    const weekDays = [];
    const dayLetters = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const isCompleted = workoutLogs[dateStr]?.completed;
      const isSelected = dateStr === selectedDateStr;
      const isToday = dateStr === todayDateStr;

      weekDays.push({
        letter: dayLetters[i],
        dayNumber: d.getDate(),
        dateStr,
        isCompleted,
        isSelected,
        isToday
      });
    }

    return weekDays;
  };

  const weekStrip = getWeeklyStrip();

  // Nomes dos meses em português europeu
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handlePrevMonth = () => {
    const prev = new Date(currentMonthDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonthDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonthDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonthDate(next);
  };

  // Verificação de Sinais de Alarme Clínicos
  const isAlarmingState = formPain >= 7 || formContractions === 'regulares';

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedLog: WorkoutLog = {
      date: selectedDateStr,
      completed: formCompleted,
      exerciseId: activeExercise.id,
      symptoms: formSymptoms,
      painLevel: formPain,
      difficultyLevel: formDifficulty,
      contractions: formContractions,
      actualReps: formReps,
      actualSets: formSets,
      loggedAt: new Date().toISOString()
    };

    saveWorkoutLog(updatedLog);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  const handleQuickToggleCompleted = () => {
    toggleCompleteWorkout(selectedDateStr, activeExercise.id);
    setFormCompleted(!formCompleted);
  };

  return (
    <div className="space-y-4 animate-fade-in text-left">
      
      {/* 1. Cabeçalho do Calendário com Seletor de Mês (Wireframe 2) */}
      <div className="flex items-center justify-between py-1">
        <h1 className="text-xl font-bold text-[#4A154B] tracking-tight">
          Calendário
        </h1>

        <div className="flex items-center gap-1 bg-white/80 rounded-full px-3 py-1.5 border border-[#F3D5D1] shadow-2xs">
          <button
            onClick={handlePrevMonth}
            className="p-1 text-[#6E5C6F] hover:text-[#4A154B] rounded-full transition-colors"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#2D1E2F] px-1 min-w-[95px] text-center">
            {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 text-[#6E5C6F] hover:text-[#4A154B] rounded-full transition-colors"
            aria-label="Mês seguinte"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Tira Semanal (D S T Q Q S S) com Dia Selecionado a Roxo (Wireframe 2) */}
      <div className="bg-white rounded-3xl p-3 shadow-xs border border-[#F3D5D1]">
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekStrip.map((day) => (
            <button
              key={day.dateStr}
              onClick={() => setSelectedDateStr(day.dateStr)}
              className={`flex flex-col items-center py-2.5 px-1 rounded-2xl transition-all relative ${
                day.isSelected
                  ? 'bg-[#7B287D] text-white shadow-md scale-102 font-bold'
                  : 'text-[#2D1E2F] hover:bg-[#FFF7F6]'
              }`}
            >
              {/* Letra do Dia da Semana */}
              <span className={`text-[11px] font-semibold mb-1 ${day.isSelected ? 'text-white/90' : 'text-[#6E5C6F]'}`}>
                {day.letter}
              </span>

              {/* Número do Dia */}
              <span className="text-sm font-bold leading-tight">
                {day.dayNumber}
              </span>

              {/* Indicador de Exercício Concluído (Ponto ou Visto) */}
              <div className="mt-1 h-2 flex items-center justify-center">
                {day.isCompleted ? (
                  <span className={`w-1.5 h-1.5 rounded-full ${day.isSelected ? 'bg-white' : 'bg-[#1E7E68]'}`} />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                )}
              </div>

              {/* Indicador de "Hoje" */}
              {day.isToday && !day.isSelected && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Cartão: Exercício do Dia (Wireframe 2) */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#F3D5D1] space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#7B287D]">
              Exercício do Dia
            </div>
            <h2 className="text-base font-bold text-[#2D1E2F] leading-tight mt-0.5">
              {activeExercise.name}
            </h2>
          </div>

          {/* Botão Concluído (Toggle Rápido) */}
          <button
            onClick={handleQuickToggleCompleted}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              formCompleted
                ? 'bg-[#E8F5F2] text-[#1E7E68] border border-[#C7E9E2]'
                : 'bg-[#FFF7F6] text-[#6E5C6F] border border-[#F3D5D1] hover:bg-white'
            }`}
          >
            {formCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 fill-[#1E7E68] text-white" />
                <span>Concluído</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Marcar Feito</span>
              </>
            )}
          </button>
        </div>

        {/* Ilustração Suave do Exercício */}
        <div className="rounded-2xl overflow-hidden border border-[#F3D5D1]/80">
          <ExerciseIllustration type={activeExercise.illustrationKey} className="w-full h-44 object-cover" />
        </div>

        {/* Link para Demonstração */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="text-xs font-bold text-[#7B287D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Veja aqui a demonstração</span>
          </button>

          <span className="text-[11px] text-[#6E5C6F] font-medium">
            {activeExercise.durationMinutes} min · {activeExercise.suggestedSets}
          </span>
        </div>
      </div>

      {/* 4. Formulário de Registo Diário (Wireframe 2) */}
      <form onSubmit={handleSaveForm} className="bg-white rounded-3xl p-5 shadow-xs border border-[#F3D5D1] space-y-5">
        <div className="flex items-center justify-between border-b border-[#F5E5E2] pb-2">
          <h3 className="text-sm font-bold text-[#2D1E2F]">
            Registo de Sensações & Execução
          </h3>
          <span className="text-[10px] text-[#6E5C6F]">
            {selectedDateStr}
          </span>
        </div>

        {/* Sintomas (Chips Multi-seleção) */}
        <div>
          <label className="text-xs font-bold text-[#2D1E2F] block mb-2">
            Sintomas sentidos:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_SYMPTOMS.map((sym) => {
              const isSelected = formSymptoms.includes(sym);
              return (
                <button
                  type="button"
                  key={sym}
                  onClick={() => toggleSymptom(sym)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isSelected
                      ? 'bg-[#7B287D] text-white border-[#7B287D]'
                      : 'bg-[#FFF7F6] text-[#2D1E2F] border-[#F3D5D1] hover:bg-white'
                  }`}
                >
                  {sym}
                </button>
              );
            })}
          </div>
        </div>

        {/* Escala de Dor (Slider 0 a 10) */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-[#2D1E2F]">
              Nível de Dor:
            </label>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              formPain >= 7 ? 'bg-[#FFF1F0] text-[#C53030]' : formPain >= 4 ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#E8F5F2] text-[#1E7E68]'
            }`}>
              {formPain} / 10 {formPain === 0 ? '(Sem dor)' : formPain >= 7 ? '(Intensa)' : ''}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={formPain}
            onChange={(e) => setFormPain(Number(e.target.value))}
            className="w-full h-2 bg-[#FBE4E2] rounded-lg appearance-none cursor-pointer accent-[#7B287D]"
          />
          <div className="flex justify-between text-[10px] text-[#6E5C6F] mt-1 font-medium">
            <span>0 (Nenhuma)</span>
            <span>5 (Moderada)</span>
            <span>10 (Máxima)</span>
          </div>
        </div>

        {/* Nível de Dificuldade (Slider 0 a 10) */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-[#2D1E2F]">
              Perceção de Esforço / Dificuldade:
            </label>
            <span className="text-xs font-bold text-[#7B287D] px-2 py-0.5 rounded-full bg-[#F4E8F4]">
              {formDifficulty} / 10
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={formDifficulty}
            onChange={(e) => setFormDifficulty(Number(e.target.value))}
            className="w-full h-2 bg-[#FBE4E2] rounded-lg appearance-none cursor-pointer accent-[#7B287D]"
          />
          <div className="flex justify-between text-[10px] text-[#6E5C6F] mt-1 font-medium">
            <span>Fácil</span>
            <span>Confortável</span>
            <span>Exigente</span>
          </div>
        </div>

        {/* Contrações (3 Botões: Nenhuma / Ocasionais / Regulares) */}
        <div>
          <label className="text-xs font-bold text-[#2D1E2F] block mb-2">
            Presença de Contrações:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'nenhuma' as const, label: 'Nenhuma' },
              { val: 'ocasionais' as const, label: 'Ocasionais (Braxton-Hicks)' },
              { val: 'regulares' as const, label: 'Regulares' }
            ].map(item => (
              <button
                key={item.val}
                type="button"
                onClick={() => setFormContractions(item.val)}
                className={`p-2.5 rounded-2xl text-[11px] font-semibold border text-center transition-all ${
                  formContractions === item.val
                    ? item.val === 'regulares'
                      ? 'bg-[#FFF1F0] border-[#C53030] text-[#C53030] font-bold shadow-xs'
                      : 'bg-[#7B287D] text-white border-[#7B287D] shadow-xs'
                    : 'bg-[#FFF7F6] text-[#2D1E2F] border-[#F3D5D1]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Séries e Repetições Realizadas */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#2D1E2F] block mb-1">
              Repetições feitas:
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={formReps}
              onChange={(e) => setFormReps(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#FFF7F6] border border-[#F3D5D1] text-xs font-bold text-[#2D1E2F] focus:outline-none focus:border-[#7B287D]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#2D1E2F] block mb-1">
              Séries realizadas:
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={formSets}
              onChange={(e) => setFormSets(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#FFF7F6] border border-[#F3D5D1] text-xs font-bold text-[#2D1E2F] focus:outline-none focus:border-[#7B287D]"
            />
          </div>
        </div>

        {/* AVISO CLÍNICO DE SINAIS DE ALARME (Se dor >= 7 ou contrações regulares) */}
        {isAlarmingState && (
          <div className="p-4 rounded-2xl bg-[#FFF1F0] border-2 border-[#C53030] text-left animate-shake space-y-1">
            <div className="flex items-center gap-2 text-[#C53030] font-bold text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Sinal de Alerta Clínico: Pára o Exercício</span>
            </div>
            <p className="text-[11px] text-[#C53030] leading-tight">
              Registo de {formPain >= 7 ? 'dor intensa' : ''} {formPain >= 7 && formContractions === 'regulares' ? 'e ' : ''} {formContractions === 'regulares' ? 'contrações regulares' : ''}. Por favor, deita-te de lado, bebe água e contacta o teu médico assistente ou linha de apoio à maternidade.
            </p>
          </div>
        )}

        {/* Botão de Guardar */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-[#4A154B] hover:bg-[#370C38] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>{saveFeedback ? 'Registo Guardado com Sucesso!' : 'Guardar Registo Diário'}</span>
          </button>
        </div>
      </form>

      {/* Modal de Demonstração */}
      <DemonstrationModal
        exercise={activeExercise}
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onMarkCompleted={() => {
          setFormCompleted(true);
          toggleCompleteWorkout(selectedDateStr, activeExercise.id);
        }}
        isCompleted={formCompleted}
      />
    </div>
  );
};
