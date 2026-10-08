import { useState } from 'react';
import type { Exercise } from '../../types';
import { ExerciseIllustration } from './ExerciseIllustration';
import { Dialog } from './Dialog';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function DemonstrationModal({ exercise, isOpen, onClose }: { exercise: Exercise | null; isOpen: boolean; onClose: () => void }) {
  return isOpen && exercise ? <IllustratedGuide key={exercise.id} exercise={exercise} onClose={onClose} /> : null;
}
function IllustratedGuide({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const instructions = exercise.detailedInstructions;
  return <Dialog title={exercise.name} onClose={onClose}><div className="stack">
    <div className="cluster"><span className="pill">{exercise.category}</span><span className="pill">Guia ilustrado · rascunho</span></div>
    <div className="exercise-art"><ExerciseIllustration type={exercise.illustrationKey} /></div>
    <p className="small muted">Ilustração estática e passos de exemplo. Vídeo e conteúdo clínico aguardam validação.</p>
    <dl className="grid-2 small"><div><dt>Duração de exemplo</dt><dd>{exercise.durationMinutes} min</dd></div><div><dt>Séries de exemplo</dt><dd>{exercise.suggestedSets}</dd></div><div><dt>Repetições de exemplo</dt><dd>{exercise.suggestedReps}</dd></div><div><dt>Intensidade de exemplo</dt><dd>{exercise.difficultyLevel}</dd></div></dl>
    <div className="card soft" aria-live="polite"><p className="eyebrow">Passo {step + 1} de {instructions.length}</p><p style={{ marginTop: 12 }}>{instructions[step]}</p></div>
    <div className="split"><button className="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Anterior</button><button className="secondary" disabled={step === instructions.length - 1} onClick={() => setStep(step + 1)}>Seguinte <ArrowRight size={18} /></button></div>
    <div><h3>Respiração</h3><p className="muted small" style={{ marginTop: 8 }}>{exercise.breathingFocus}</p></div>
    <p className="callout danger">{exercise.safetyCaution}</p>
    <p className="small muted">Não uses este rascunho como prescrição. A adequação de um movimento depende da avaliação pela tua equipa de saúde.</p>
    <button className="primary full" onClick={onClose}>Fechar o guia</button>
  </div></Dialog>;
}

