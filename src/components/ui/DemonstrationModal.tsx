import React, { useState } from 'react';
import { Exercise } from '../../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import { X, Play, Pause, CheckCircle2, AlertTriangle, Wind, Clock, Flame } from 'lucide-react';

interface Props {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkCompleted?: () => void;
  isCompleted?: boolean;
}

export const DemonstrationModal: React.FC<Props> = ({
  exercise,
  isOpen,
  onClose,
  onMarkCompleted,
  isCompleted = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !exercise) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up border border-[#F3D5D1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5E5E2] bg-[#FFF7F6]">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7B287D]/10 text-[#7B287D]">
            {exercise.category} · {exercise.difficultyLevel}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#6E5C6F] hover:text-[#4A154B] rounded-full hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-[#2D1E2F] leading-tight mb-2">
              {exercise.name}
            </h2>
            <p className="text-sm text-[#6E5C6F] leading-relaxed">
              {exercise.shortDescription}
            </p>
          </div>

          {/* Área de Demonstração / Vídeo Placeholder Interativo */}
          <div className="relative rounded-2xl overflow-hidden border border-[#F3D5D1] bg-[#FBE4E2]/40">
            <ExerciseIllustration type={exercise.illustrationKey} className="w-full h-48 object-cover" />
            
            {/* Overlay de Simulação de Vídeo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 text-[#4A154B] text-xs font-semibold shadow hover:bg-white transition-all active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                {isPlaying ? 'Pausar Guia' : 'Ver Demonstração'}
              </button>
              <span className="text-xs text-white/90 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                {isPlaying ? '0:42 / 2:15' : 'Demonstração em Vídeo'}
              </span>
            </div>
          </div>

          {/* Métricas Rápidas */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#FFF7F6] p-3 rounded-2xl border border-[#F5E5E2]">
              <Clock className="w-4 h-4 mx-auto text-[#7B287D] mb-1" />
              <div className="text-[10px] uppercase font-semibold text-[#6E5C6F]">Duração</div>
              <div className="text-xs font-bold text-[#2D1E2F]">{exercise.durationMinutes} min</div>
            </div>
            <div className="bg-[#FFF7F6] p-3 rounded-2xl border border-[#F5E5E2]">
              <Flame className="w-4 h-4 mx-auto text-[#E07A5F] mb-1" />
              <div className="text-[10px] uppercase font-semibold text-[#6E5C6F]">Séries/Reps</div>
              <div className="text-xs font-bold text-[#2D1E2F]">{exercise.suggestedSets}</div>
            </div>
            <div className="bg-[#FFF7F6] p-3 rounded-2xl border border-[#F5E5E2]">
              <Wind className="w-4 h-4 mx-auto text-[#1E7E68] mb-1" />
              <div className="text-[10px] uppercase font-semibold text-[#6E5C6F]">Respiração</div>
              <div className="text-xs font-bold text-[#2D1E2F]">Fluida 360°</div>
            </div>
          </div>

          {/* Instruções Passo a Passo */}
          <div>
            <h3 className="text-sm font-bold text-[#2D1E2F] uppercase tracking-wider mb-3">
              Passo a Passo Fisioterapêutico
            </h3>
            <ol className="space-y-2.5">
              {exercise.detailedInstructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-3 text-xs leading-relaxed text-[#2D1E2F]">
                  <span className="w-5 h-5 rounded-full bg-[#7B287D] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Dica de Respiração */}
          <div className="p-3.5 bg-[#E8F5F2] rounded-2xl border border-[#C7E9E2] flex items-start gap-3">
            <Wind className="w-5 h-5 text-[#1E7E68] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#1E7E68]">Foco Respiratório</div>
              <p className="text-xs text-[#1E7E68]/90 mt-0.5 leading-relaxed">
                {exercise.breathingFocus}
              </p>
            </div>
          </div>

          {/* Precaução de Segurança */}
          <div className="p-3.5 bg-[#FFF1F0] rounded-2xl border border-[#FAD2CF] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#C53030] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#C53030]">Precauções Clínicas</div>
              <p className="text-xs text-[#C53030]/90 mt-0.5 leading-relaxed">
                {exercise.safetyCaution}
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé de Ações */}
        <div className="p-4 border-t border-[#F5E5E2] bg-[#FFF7F6] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-full border border-[#F3D5D1] text-xs font-semibold text-[#6E5C6F] hover:bg-white transition-colors"
          >
            Fechar
          </button>
          {onMarkCompleted && (
            <button
              onClick={() => {
                onMarkCompleted();
                onClose();
              }}
              className={`flex-1 py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 ${
                isCompleted
                  ? 'bg-[#1E7E68] text-white hover:bg-[#186654]'
                  : 'bg-[#4A154B] text-white hover:bg-[#370C38]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Exercício Concluído' : 'Marcar como Concluído'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
