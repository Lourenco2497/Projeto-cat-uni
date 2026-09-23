import React from 'react';

interface Props {
  type: 'breathing' | 'pelvic_floor' | 'pilates_ball' | 'cat_camel' | 'glute_bridge' | 'supported_squat' | 'walking' | 'chest_stretch';
  className?: string;
}

export const ExerciseIllustration: React.FC<Props> = ({ type, className = 'w-full h-44' }) => {
  // Cores harmoniosas com a paleta da app
  const plum = '#4A154B';
  const purple = '#7B287D';
  const coral = '#E07A5F';
  const softBlush = '#F5D5CF';
  const cream = '#FFF5F3';
  const skinTone = '#ECC8AF';
  const hairTone = '#4A2822';
  const matColor = '#D8C4DA';

  switch (type) {
    case 'pilates_ball':
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ilustração de mulher grávida na bola de pilates">
          <rect width="320" height="200" rx="16" fill={cream} />
          {/* Chão suave */}
          <line x1="30" y1="175" x2="290" y2="175" stroke={matColor} strokeWidth="3" strokeLinecap="round" />
          {/* Bola de pilates */}
          <circle cx="160" cy="135" r="42" fill={softBlush} stroke={purple} strokeWidth="3" />
          <path d="M125 130 C145 110, 175 110, 195 130" stroke={purple} strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
          <path d="M130 148 C145 160, 175 160, 190 148" stroke={purple} strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
          {/* Tronco & Gravidez */}
          <path d="M152 75 C148 95, 145 115, 150 128" stroke={plum} strokeWidth="14" strokeLinecap="round" />
          {/* Barriga suave */}
          <path d="M158 92 C172 92, 178 108, 168 118" fill={coral} opacity="0.85" />
          {/* Cabeça e Cabelo */}
          <circle cx="152" cy="52" r="14" fill={skinTone} />
          <path d="M142 46 C144 38, 158 38, 164 45 C164 54, 158 58, 150 58 Z" fill={hairTone} />
          {/* Braço pousado na bacia/bola */}
          <path d="M150 78 Q170 95, 164 114" stroke={skinTone} strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Pernas apoiadas */}
          <path d="M148 126 L125 145 L125 175" stroke={plum} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M165 126 L190 145 L190 175" stroke={plum} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Sapatos */}
          <rect x="115" y="172" width="18" height="6" rx="3" fill={purple} />
          <rect x="185" y="172" width="18" height="6" rx="3" fill={purple} />
        </svg>
      );

    case 'cat_camel':
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ilustração do exercício gato-camelo em quatro apoios">
          <rect width="320" height="200" rx="16" fill={cream} />
          {/* Tapete de Yoga */}
          <rect x="40" y="165" width="240" height="8" rx="4" fill={softBlush} stroke={purple} strokeWidth="2" />
          {/* Coluna arqueada suavemente */}
          <path d="M100 120 C125 90, 175 90, 205 122" stroke={plum} strokeWidth="12" strokeLinecap="round" fill="none" />
          {/* Barriga confortável com espaço */}
          <path d="M140 108 C155 110, 165 125, 152 135 C140 133, 133 120, 140 108 Z" fill={coral} opacity="0.85" />
          {/* Braços apoiados no tapete */}
          <path d="M96 122 L96 165" stroke={skinTone} strokeWidth="8" strokeLinecap="round" />
          {/* Coxas e pernas dobradas */}
          <path d="M205 122 L215 165" stroke={plum} strokeWidth="10" strokeLinecap="round" />
          <path d="M215 165 L235 165" stroke={skinTone} strokeWidth="6" strokeLinecap="round" />
          {/* Cabeça relaxada */}
          <circle cx="82" cy="132" r="13" fill={skinTone} />
          <path d="M72 128 C74 120, 88 120, 93 128 C90 138, 78 140, 72 134 Z" fill={hairTone} />
          {/* Linhas de movimento suaves */}
          <path d="M135 75 Q150 68, 165 75" stroke={purple} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        </svg>
      );

    case 'pelvic_floor':
    case 'breathing':
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ilustração de respiração diafragmática sentada">
          <rect width="320" height="200" rx="16" fill={cream} />
          {/* Almofada circular suave */}
          <ellipse cx="160" cy="165" rx="55" ry="12" fill={softBlush} />
          {/* Tronco ereto sereno */}
          <path d="M160 85 L160 145" stroke={plum} strokeWidth="16" strokeLinecap="round" />
          {/* Barriga materna */}
          <circle cx="172" cy="120" r="16" fill={coral} opacity="0.85" />
          {/* Braço na barriga / respiração */}
          <path d="M156 95 Q180 105, 175 120" stroke={skinTone} strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="174" cy="120" r="4" fill={skinTone} />
          {/* Cabeça serena com olhos fechados */}
          <circle cx="160" cy="55" r="15" fill={skinTone} />
          <path d="M148 48 C150 40, 168 38, 172 48 C172 60, 162 65, 150 60 Z" fill={hairTone} />
          {/* Linhas de fluxo de ar suave */}
          <path d="M190 75 Q210 75, 205 90 Q200 105, 220 105" stroke={purple} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M125 100 Q105 100, 110 115" stroke={purple} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" fill="none" opacity="0.7" />
        </svg>
      );

    case 'glute_bridge':
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ilustração da ponte glútea modificada">
          <rect width="320" height="200" rx="16" fill={cream} />
          {/* Tapete */}
          <rect x="35" y="165" width="250" height="8" rx="4" fill={matColor} />
          {/* Almofada na cabeça */}
          <rect x="55" y="148" width="30" height="16" rx="6" fill={softBlush} />
          <circle cx="70" cy="148" r="12" fill={skinTone} />
          {/* Corpo em ponte suave */}
          <path d="M85 155 Q130 145, 170 125" stroke={plum} strokeWidth="12" strokeLinecap="round" />
          {/* Barriga para cima */}
          <circle cx="145" cy="125" r="15" fill={coral} opacity="0.85" />
          {/* Joelhos flexionados e pés firmes */}
          <path d="M170 125 L200 120 L215 165" stroke={plum} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Seta subtil para cima */}
          <path d="M150 95 L150 78 M144 84 L150 78 L156 84" stroke={purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'supported_squat':
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ilustração de agachamento apoiado na cadeira">
          <rect width="320" height="200" rx="16" fill={cream} />
          {/* Chão */}
          <line x1="40" y1="175" x2="280" y2="175" stroke={matColor} strokeWidth="3" />
          {/* Cadeira de apoio */}
          <path d="M90 90 L90 175 M90 125 L120 125 L120 175" stroke={purple} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Mulher a segurar a cadeira */}
          <path d="M150 95 L105 110" stroke={skinTone} strokeWidth="6" strokeLinecap="round" />
          {/* Tronco ereto */}
          <path d="M165 80 L175 125" stroke={plum} strokeWidth="14" strokeLinecap="round" />
          {/* Barriga */}
          <circle cx="160" cy="110" r="14" fill={coral} opacity="0.85" />
          {/* Agachamento suave */}
          <path d="M175 125 L205 135 L195 175" stroke={plum} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Cabeça */}
          <circle cx="162" cy="55" r="14" fill={skinTone} />
          <path d="M150 48 C152 40, 168 38, 174 48 C174 60, 164 64, 152 60 Z" fill={hairTone} />
        </svg>
      );

    case 'walking':
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ilustração de caminhada suave com consciência postural">
          <rect width="320" height="200" rx="16" fill={cream} />
          {/* Chão e pequenas folhinhas */}
          <line x1="30" y1="175" x2="290" y2="175" stroke={matColor} strokeWidth="3" />
          <circle cx="70" cy="168" r="4" fill={softBlush} />
          <circle cx="250" cy="168" r="5" fill={softBlush} />
          {/* Tronco elegante a caminhar */}
          <path d="M155 75 L155 125" stroke={plum} strokeWidth="14" strokeLinecap="round" />
          {/* Barriga */}
          <circle cx="168" cy="105" r="15" fill={coral} opacity="0.85" />
          {/* Braço em balanço natural */}
          <path d="M155 85 L140 108 L148 118" stroke={skinTone} strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Passada ativa */}
          <path d="M155 125 L135 150 L125 175" stroke={plum} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M155 125 L180 150 L195 174" stroke={plum} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Cabeça serena com rabo de cavalo */}
          <circle cx="155" cy="50" r="14" fill={skinTone} />
          <path d="M143 45 C145 35, 162 35, 168 45 C168 55, 150 56, 145 52 Z" fill={hairTone} />
          <path d="M143 46 Q128 50, 130 65" stroke={hairTone} strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'chest_stretch':
    default:
      return (
        <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ilustração de alongamento lateral suave">
          <rect width="320" height="200" rx="16" fill={cream} />
          <line x1="40" y1="175" x2="280" y2="175" stroke={matColor} strokeWidth="3" />
          {/* Cadeira */}
          <path d="M130 135 L190 135 M140 135 L140 175 M180 135 L180 175" stroke={purple} strokeWidth="4" strokeLinecap="round" />
          {/* Tronco com ligeira inclinação */}
          <path d="M160 85 C158 105, 160 120, 160 135" stroke={plum} strokeWidth="14" strokeLinecap="round" />
          {/* Barriga */}
          <circle cx="172" cy="115" r="14" fill={coral} opacity="0.85" />
          {/* Braço erguido em arco suave */}
          <path d="M155 85 Q135 60, 120 70" stroke={skinTone} strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Cabeça */}
          <circle cx="158" cy="55" r="14" fill={skinTone} />
          <path d="M146 48 C148 40, 164 38, 170 48 C170 58, 160 62, 148 58 Z" fill={hairTone} />
        </svg>
      );
  }
};
