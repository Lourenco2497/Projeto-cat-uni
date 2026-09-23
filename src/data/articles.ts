import { Article } from '../types';

/**
 * Artigos científicos e baseados em evidência para Fisioterapia Obstétrica
 * [Exemplo — substituir por artigo real da investigação académica]
 */
export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Exercício Físico na Gravidez: Diretrizes de Segurança e Benefícios Fisiológicos',
    category: 'Exercício',
    readTimeMinutes: 5,
    source: 'British Journal of Sports Medicine / Diretrizes ACOG & CSEP [Exemplo]',
    date: 'Jan 2025',
    summary: 'A prática regular de exercício aeróbico e de fortalecimento suave reduz o risco de diabetes gestacional, pré-eclâmpsia e dores lombares sem comprometer o crescimento fetal.',
    objective: 'Rever a evidência científica recente sobre os parâmetros ótimos de intensidade e frequência do exercício físico em gestantes saudáveis.',
    methods: 'Meta-análise de 48 ensaios clínicos controlados e randomizados envolvendo 12.500 mulheres nos 3 trimestres de gestação.',
    conclusion: 'A atividade física moderada (150 minutos semanais) está associada a menor incidência de complicações maternas e a partos com menor duração do trabalho de parto ativo.',
    practicalTips: [
      'Manter um ritmo de exercício em que seja possível conversar sem ofegar (teste da fala).',
      'Evitar posições de decúbito dorsal plano prolongado a partir do 2.º trimestre.',
      'Garantir hidratação regular e temperatura ambiente amena.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'art-2',
    title: 'Disfunção do Pavimento Pélvico e Treino Muscular Perinatal',
    category: 'Pavimento pélvico',
    readTimeMinutes: 6,
    source: 'International Urogynecology Journal / Cochrane Review [Exemplo]',
    date: 'Fev 2025',
    summary: 'O treino supervisionado da musculatura do pavimento pélvico durante o pré-parto previne a incontinência urinária de esforço no pós-parto imediato e tardio.',
    objective: 'Avaliar a eficácia de programas de reeducação perineal guiados por fisioterapeutas na continência e suporte dos órgãos pélvicos.',
    methods: 'Ensaio controlado com 320 primigestas divididas entre grupo de intervenção (exercícios diários com biofeedback verbal) e cuidados habituais.',
    conclusion: 'As grávidas que realizaram contrações coordenadas com a expiração apresentaram uma redução de 62% na probabilidade de perdas urinárias após o parto.',
    practicalTips: [
      'A fase de relaxamento muscular deve durar pelo menos o dobro da fase de contração.',
      'Evitar a manobra de expulsão forçada (não empurrar a bacia para baixo ao tossir ou espirrar).',
      'Trabalhar a consciência respiratória antes de aumentar a intensidade das contrações.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'art-3',
    title: 'Manejo da Dor Pélvica e Lombossacra no 2.º e 3.º Trimestres',
    category: 'Alívio da dor',
    readTimeMinutes: 4,
    source: 'Journal of Orthopaedic & Sports Physical Therapy [Exemplo]',
    date: 'Nov 2024',
    summary: 'A combinação de mobilização da bacia na bola de pilates com exercícios de estabilização lombar alivia a dor e melhora a mobilidade funcional no dia a dia.',
    objective: 'Identificar as melhores abordagens conservadoras de fisioterapia para a dor na cintura pélvica e sínfise púbica na gestação.',
    methods: 'Estudo prospetivo com 180 grávidas com dor lombo-pélvica moderada a severa tratadas com protocolo de mobilidade suave vs repouso.',
    conclusion: 'O movimento direcionado ativo foi significativamente superior ao repouso na redução dos índices de incapacidade e no alívio da dor.',
    practicalTips: [
      'Utilizar uma bola suíça para aliviar o peso no cóccix ao estar sentada a trabalhar.',
      'Colocar uma almofada entre os joelhos e tornozelos ao dormir deitada de lado.',
      'Distribuir o peso de forma equilibrada em ambos os pés ao permanecer em pé.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'art-4',
    title: 'Preparação Corporal para o Parto no 3.º Trimestre',
    category: 'Trimestres',
    readTimeMinutes: 5,
    source: 'BMC Pregnancy and Childbirth [Exemplo]',
    date: 'Dez 2024',
    summary: 'Posturas de relaxamento, mobilidade da bacia e técnicas de respiração diminuem o recurso a analgesia farmacológica e potenciam a confiança materna.',
    objective: 'Analisar o impacto de técnicas posturais da fisioterapia obstétrica na perceção da dor durante o trabalho de parto.',
    methods: 'Estudo clínico randomizado comparando gestantes que frequentaram sessões de educação para o movimento com grupo de controlo.',
    conclusion: 'As posições assimétricas e verticais favorecem a descida fetal e diminuem o tempo da primeira fase do trabalho de parto.',
    practicalTips: [
      'Praticar agachamentos parciais com apoio na parede para treinar a abertura do estreito inferior da bacia.',
      'Treinar a respiração lenta com soltura mandibular (a mandíbula relaxada reflete-se no períneo).',
      'Envolver o parceiro ou acompanhante nas massagens sacrais e suporte postural.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'art-5',
    title: 'Exercício Suave e Redução da Ansiedade Gestacional',
    category: 'Saúde mental',
    readTimeMinutes: 4,
    source: 'Maternal and Child Health Journal [Exemplo]',
    date: 'Jan 2025',
    summary: 'Caminhadas ao ar livre e rotinas de respiração diafragmática modulam os níveis de cortisol e promovem melhor qualidade do sono na gravidez.',
    objective: 'Investigar a correlação entre a regularidade de exercício leve e o bem-estar psicológico materno.',
    methods: 'Acompanhamento longitudinal de 450 mulheres grávidas com questionários de qualidade de sono e escalas de ansiedade.',
    conclusion: 'Mulheres com rotinas diárias de apenas 15 minutos de relaxamento ativo reportaram 40% menos despertares noturnos e maior sensação de serenidade.',
    practicalTips: [
      'Estabelecer um momento diário fixo para 10 minutos de respiração e pausa sem ecrãs.',
      'Caminhar em espaços verdes ou ao ar livre com luz natural pela manhã.',
      'Evitar exercícios vigorosos nas duas horas que antecedem o horário de dormir.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'art-6',
    title: 'Diástase dos Retos Abdominais: O que Diz a Evidência?',
    category: 'Exercício',
    readTimeMinutes: 5,
    source: 'Physiotherapy Theory and Practice [Exemplo]',
    date: 'Nov 2024',
    summary: 'O espaçamento dos retos abdominais é uma adaptação fisiológica natural na gravidez. A ativação sinérgica do transverso previne tensões excessivas.',
    objective: 'Desmistificar o afastamento dos retos e orientar movimentos funcionais seguros para proteger a linha alba durante a gestação.',
    methods: 'Estudo de ultrassonografia músculo-esquelética avaliando a distância inter-retos e a tensão da linha alba sob diferentes posturas.',
    conclusion: 'Exercícios tradicionais de flexão do tronco (abdominais "crunch") aumentam a pressão intra-abdominal e devem ser substituídos por estabilização neutra e respiração.',
    practicalTips: [
      'Ao levantar da cama, deitar de lado primeiro com apoio dos braços em vez de subir de frente.',
      'Evitar prender o ar ao levantar objetos ou ao erguer crianças.',
      'Focar na ativação suave do músculo transverso abdominal em expiração suave.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
  }
];
