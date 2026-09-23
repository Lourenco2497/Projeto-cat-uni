import { ProfileType, Trimester, ActivityLevel } from '../types';

export interface PlanGenerationInput {
  week: number;
  isFirstPregnancy: boolean;
  previousActivityLevel: ActivityLevel;
  complaints: string[];
  clinicalFlags: string[];
  goals: string[];
}

export interface GeneratedPlanResult {
  profileType: ProfileType;
  title: string;
  summary: string;
  clinicalSafetyAlert: string | null;
  recommendedDailyExercises: {
    dayOfWeek: number; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    dayName: string;
    exerciseId: string;
    focus: string;
    recommendedDuration: number;
  }[];
  weeklyAdvice: string;
}

/**
 * Função Pura de Geração de Plano Personalizado
 * 
 * ESTRUTURA PARA FÁCIL EDIÇÃO POR NÃO-PROGRAMADORES:
 * 1. Verificação de Sinais Clínicos e Contraindicações
 * 2. Determinação do Perfil (Conservador, Suave ou Moderado)
 * 3. Seleção dos Exercícios da Semana com base nas queixas (lombar, pélvico, edemas)
 */
export function generatePersonalizedPlan(input: PlanGenerationInput): GeneratedPlanResult {
  const { week, previousActivityLevel, complaints, clinicalFlags } = input;

  // 1. Determina o Trimestre
  let trimester: Trimester = 1;
  if (week >= 13 && week <= 27) {
    trimester = 2;
  } else if (week >= 28) {
    trimester = 3;
  }

  // 2. Avaliação de Segurança Clínica (Red Flags)
  const hasClinicalFlags = clinicalFlags && clinicalFlags.length > 0;

  if (hasClinicalFlags) {
    return {
      profileType: 'conservador',
      title: 'Plano Conservador e de Relaxamento',
      summary: 'Plano focado exclusivamente em respiração diafragmática, relaxamento pélvico consciente e circulação passiva.',
      clinicalSafetyAlert: 'Atenção Clínica: Identificámos sinalizações de saúde que requerem autorização médica prévia. O plano gerado é estritamente de baixo impacto e respiratório. Por favor, consulta o teu médico ou fisioterapeuta antes de iniciar.',
      recommendedDailyExercises: [
        { dayOfWeek: 0, dayName: 'Domingo', exerciseId: 'ex-1', focus: 'Respiração e Relaxamento Profundo', recommendedDuration: 8 },
        { dayOfWeek: 1, dayName: 'Segunda', exerciseId: 'ex-8', focus: 'Abertura Torácica e Alívio Respiratório', recommendedDuration: 8 },
        { dayOfWeek: 2, dayName: 'Terça', exerciseId: 'ex-1', focus: 'Respiração 360° em Cadeira', recommendedDuration: 8 },
        { dayOfWeek: 3, dayName: 'Quarta', exerciseId: 'ex-7', focus: 'Pausa Ativa e Circulação dos Tornozelos', recommendedDuration: 10 },
        { dayOfWeek: 4, dayName: 'Quinta', exerciseId: 'ex-1', focus: 'Relaxamento do Pavimento Pélvico', recommendedDuration: 8 },
        { dayOfWeek: 5, dayName: 'Sexta', exerciseId: 'ex-8', focus: 'Alongamento Suave Sentada', recommendedDuration: 8 },
        { dayOfWeek: 6, dayName: 'Sábado', exerciseId: 'ex-1', focus: 'Conexão e Respiração Diafragmática', recommendedDuration: 8 },
      ],
      weeklyAdvice: 'Prioriza o repouso ativo. Se sentires qualquer contração, perda líquida ou desconforto, cessa de imediato.'
    };
  }

  // 3. Determina o Perfil de Atividade (Suave vs Moderado)
  const isHighOrModerate = previousActivityLevel === 'moderate' || previousActivityLevel === 'high';
  const profileType: ProfileType = (isHighOrModerate && trimester === 2) ? 'moderado' : 'suave';

  // 4. Adaptação com base nas Queixas Principais
  const hasLombar = complaints.some(c => c.toLowerCase().includes('lombar') || c.toLowerCase().includes('costas'));
  const hasPelvico = complaints.some(c => c.toLowerCase().includes('pélvica') || c.toLowerCase().includes('incontinência'));
  const hasEdema = complaints.some(c => c.toLowerCase().includes('edema') || c.toLowerCase().includes('pesadas'));

  // Exercícios atribuídos aos dias da semana
  const schedule = [
    // Segunda-feira (1)
    {
      dayOfWeek: 1,
      dayName: 'Segunda-feira',
      exerciseId: hasLombar ? 'ex-4' : 'ex-3', // Gato-camelo ou bola
      focus: 'Mobilidade da Coluna e Descompressão Lombar',
      recommendedDuration: 10
    },
    // Terça-feira (2)
    {
      dayOfWeek: 2,
      dayName: 'Terça-feira',
      exerciseId: hasPelvico ? 'ex-2' : 'ex-1', // Pavimento pélvico ou respiração
      focus: 'Consciência do Pavimento Pélvico',
      recommendedDuration: 10
    },
    // Quarta-feira (3)
    {
      dayOfWeek: 3,
      dayName: 'Quarta-feira',
      exerciseId: 'ex-3', // Bola de pilates
      focus: 'Soltura das Ancas e Bacia',
      recommendedDuration: 12
    },
    // Quinta-feira (4)
    {
      dayOfWeek: 4,
      dayName: 'Quinta-feira',
      exerciseId: profileType === 'moderado' ? 'ex-6' : 'ex-8', // Agachamento ou alongamento
      focus: profileType === 'moderado' ? 'Fortalecimento Apoiado das Pernas' : 'Alongamento Torácico e Conforto',
      recommendedDuration: 10
    },
    // Sexta-feira (5)
    {
      dayOfWeek: 5,
      dayName: 'Sexta-feira',
      exerciseId: hasEdema ? 'ex-7' : (hasLombar ? 'ex-4' : 'ex-5'),
      focus: hasEdema ? 'Circulação Venosa e Alívio de Edemas' : 'Estabilidade e Fortalecimento Pélvico',
      recommendedDuration: 12
    },
    // Sábado (6)
    {
      dayOfWeek: 6,
      dayName: 'Sábado',
      exerciseId: 'ex-7', // Caminhada suave
      focus: 'Caminhada Suave e Consciência Postural',
      recommendedDuration: 15
    },
    // Domingo (0)
    {
      dayOfWeek: 0,
      dayName: 'Domingo',
      exerciseId: 'ex-1', // Respiração
      focus: 'Respiração Diafragmática e Recuperação Ativa',
      recommendedDuration: 8
    }
  ];

  return {
    profileType,
    title: profileType === 'moderado' ? 'Plano Moderado com Foco Lombo-Pélvico' : 'Plano Suave de Mobilidade e Conforto',
    summary: `Plano personalizado para a ${week}.ª semana de gestação (${trimester}.º trimestre). Combina mobilização suave da bacia, alívio lombar e preparação do pavimento pélvico.`,
    clinicalSafetyAlert: null,
    recommendedDailyExercises: schedule,
    weeklyAdvice: `No ${trimester}.º trimestre o corpo liberta mais relaxina, aumentando a frouxidão ligamentar. Evita alongamentos balísticos e movimentos bruscos. Ouve sempre o teu ritmo!`
  };
}
