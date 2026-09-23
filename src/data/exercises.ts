import { Exercise } from '../types';

/**
 * Catálogo de Exercícios Ilustrativos para Fisioterapia Obstétrica
 * NOTA CLÍNICA: Conteúdo ilustrativo para protótipo de apresentação académica.
 * Requer validação e adaptação clínica formal pela investigadora/autora do projeto.
 */
export const EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    name: 'Respiração Diafragmática e Consciência Pélvica',
    category: 'Respiração',
    durationMinutes: 8,
    suggestedReps: '10 a 12 ciclos',
    suggestedSets: '2 séries',
    difficultyLevel: 'Muito Suave',
    suitableTrimesters: [1, 2, 3],
    targetAreas: ['Diafragma', 'Pavimento Pélvico', 'Sistema Nervoso Autónomo'],
    shortDescription: 'Respiração profunda pelo nariz, expandindo a caixa torácica a 360°, relaxando o pavimento pélvico na inspiração.',
    detailedInstructions: [
      'Senta-te confortavelmente numa cadeira com os pés bem assentes no chão, ou numa bola de pilates.',
      'Coloca uma mão nas costelas inferiores e outra no baixo ventre.',
      'Inspira suavemente pelo nariz em 4 tempos, sentindo as costelas a abrir para os lados e o pavimento pélvico a libertar tensão.',
      'Expira lentamente pela boca entreaberta em 6 tempos, sentindo um retorno suave e natural do abdómen.',
      'Mantém os ombros relaxados e evita arquear as costas.'
    ],
    breathingFocus: 'Inspiração suave profunda 360°; expiração lenta sem forçar a contração.',
    safetyCaution: 'Evita suster a respiração (manobra de Valsalva). Se sentires tonturas, volta à respiração espontânea.',
    illustrationKey: 'breathing',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Respiracao'
  },
  {
    id: 'ex-2',
    name: 'Ativação e Relaxamento do Pavimento Pélvico',
    category: 'Pavimento Pélvico',
    durationMinutes: 10,
    suggestedReps: '8 repetições com pausa',
    suggestedSets: '2 séries',
    difficultyLevel: 'Suave',
    suitableTrimesters: [1, 2, 3],
    targetAreas: ['Músculos do Pavimento Pélvico', 'Transverso Abdominal'],
    shortDescription: 'Trabalho de proprioceção pélvica: contrair suavemente os esfíncteres na expiração e libertar a 100% na inspiração.',
    detailedInstructions: [
      'Adota uma posição sentada ereta ou deitada de lado com uma almofada entre os joelhos.',
      'Ao expirar, imagina que estás a elevar suavemente a base da pélvis para dentro e para cima (sensação de travar gases ou reter a urina suavemente).',
      'Mantém a contração ligeira durante 3 a 5 segundos sem prender o ar.',
      'Ao inspirar, relaxa completamente a musculatura pélvica por 6 a 8 segundos. O relaxamento é tão importante quanto a contração.',
      'Não apertes os glúteos nem as coxas.'
    ],
    breathingFocus: 'Expira ao contrair; inspira ao relaxar totalmente o períneo.',
    safetyCaution: 'Nunca faças este exercício ao urinar na sanita. Foca no relaxamento completo entre repetições.',
    illustrationKey: 'pelvic_floor',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Pavimento+Pelvico'
  },
  {
    id: 'ex-3',
    name: 'Mobilidade Pélvica com Bola de Pilates',
    category: 'Mobilidade',
    durationMinutes: 12,
    suggestedReps: '10 círculos para cada lado',
    suggestedSets: '2 séries',
    difficultyLevel: 'Suave',
    suitableTrimesters: [1, 2, 3],
    targetAreas: ['Articulação Sacroilíaca', 'Lombar', 'Ancas'],
    shortDescription: 'Círculos suaves e movimentos em "oito" na bola suíça para descomprimir a coluna lombar e soltar a cintura pélvica.',
    detailedInstructions: [
      'Senta-te na bola com os pés bem apoiados e afastados à largura dos ombros.',
      'Apoia as mãos nos joelhos ou nas ancas para manter o equilíbrio.',
      'Inicia movimentos circulares lentos com a bacia, primeiro no sentido dos ponteiros do relógio.',
      'Sente a libertação da pressão no sacro e na região lombar.',
      'Inverte o sentido dos círculos com calma e respiração fluida.'
    ],
    breathingFocus: 'Respiração rítmica e calma ao longo de todo o movimento.',
    safetyCaution: 'Certifica-te de que a bola é antiderrapante e que o chão não é escorregadio. Faz perto de um apoio fixo se necessário.',
    illustrationKey: 'pilates_ball',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Bola+Pilates'
  },
  {
    id: 'ex-4',
    name: 'Gato-Camelo Suave em Quatro Apoios',
    category: 'Mobilidade',
    durationMinutes: 8,
    suggestedReps: '8 a 10 transições',
    suggestedSets: '2 séries',
    difficultyLevel: 'Suave',
    suitableTrimesters: [1, 2, 3],
    targetAreas: ['Coluna Vertebral Torácica e Lombar', 'Músculos Paravertebrais'],
    shortDescription: 'Mobilização ondulante da coluna para descarregar o peso da barriga e aliviar tensões na região dorsal e lombar.',
    detailedInstructions: [
      'Coloca-te em quatro apoios sobre um tapete confortável, com joelhos sob as ancas e mãos sob os ombros.',
      'Se tiveres desconforto nos pulsos, apoia os antebraços numa bola ou bloco.',
      'Ao expirar, arredonda suavemente a coluna para cima em forma de arco (posição do gato), soltando o pescoço.',
      'Ao inspirar, regressa à posição neutra da coluna (evita arquear excessivamente a lombar para baixo devido à barriga).',
      'Move-te de forma fluida, sem esticar ao limite.'
    ],
    breathingFocus: 'Expira ao arredondar para cima; inspira ao regressar à posição neutra.',
    safetyCaution: 'Não deixes a barriga cair excessivamente em hiperextensão lombar no retorno.',
    illustrationKey: 'cat_camel',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Gato+Camelo'
  },
  {
    id: 'ex-5',
    name: 'Ponte Glútea Modificada',
    category: 'Força Suave',
    durationMinutes: 10,
    suggestedReps: '8 a 10 elevações',
    suggestedSets: '2 séries',
    difficultyLevel: 'Moderado',
    suitableTrimesters: [1, 2],
    targetAreas: ['Glúteos', 'Isquiotibiais', 'Estabilidade Pélvica'],
    shortDescription: 'Fortalecimento seguro da cadeia posterior para estabilizar a cintura pélvica e suportar o centro de gravidade.',
    detailedInstructions: [
      'Deita-te de costas com uma pequena almofada sob a cabeça/tronco para não ficar em decúbito dorsal plano prolongado.',
      'Dobra os joelhos com os pés bem assentes no chão, afastados à largura da bacia.',
      'Ao expirar, ativa os glúteos e eleva a bacia ligeiramente até formar uma linha reta suave dos joelhos aos ombros.',
      'Mantém 2 segundos no topo, sentindo o apoio firme dos calcanhares.',
      'Ao inspirar, desce vértebra a vértebra de volta ao tapete.'
    ],
    breathingFocus: 'Expira ao subir; inspira ao descer controladamente.',
    safetyCaution: 'Se sentires compressão na veia cava (tonturas, palpitações ou falta de ar), vira-te de imediato para o lado esquerdo.',
    illustrationKey: 'glute_bridge',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Ponte+Glutea'
  },
  {
    id: 'ex-6',
    name: 'Agachamento com Apoio na Cadeira',
    category: 'Força Suave',
    durationMinutes: 10,
    suggestedReps: '8 repetições',
    suggestedSets: '2 séries',
    difficultyLevel: 'Moderado',
    suitableTrimesters: [1, 2, 3],
    targetAreas: ['Quadricípites', 'Glúteos', 'Abertura das Ancas'],
    shortDescription: 'Manutenção de força nos membros inferiores com segurança e apoio frontal, ideal para a preparação da mobilidade de parto.',
    detailedInstructions: [
      'Coloca-te em pé de frente para as costas de uma cadeira robusta ou parede, segurando-a com ambas as mãos.',
      'Afasta os pés um pouco mais que a largura das ancas, com os dedos ligeiramente apontados para fora.',
      'Ao inspirar, flexiona os joelhos e empurra as ancas para trás como se fosses sentar, mantendo o peito aberto.',
      'Desce apenas até um ângulo confortável (não forçar amplitude profunda se houver dor na sínfise púbica).',
      'Ao expirar, empurra os calcanhares no chão e sobe com controlo.'
    ],
    breathingFocus: 'Inspira na descida; expira com força suave na subida.',
    safetyCaution: 'Em caso de dor pélvica anterior (disfunção da sínfise púbica), reduz o afastamento dos pés e a amplitude de descida.',
    illustrationKey: 'supported_squat',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Agachamento'
  },
  {
    id: 'ex-7',
    name: 'Caminhada Suave com Ativação Circulatória',
    category: 'Postura',
    durationMinutes: 15,
    suggestedReps: 'Ritmo contínuo suave',
    suggestedSets: '1 sessão contínua',
    difficultyLevel: 'Muito Suave',
    suitableTrimesters: [1, 2, 3],
    targetAreas: ['Circulação Venosa', 'Condicionamento Cardiovascular', 'Panturrilhas'],
    shortDescription: 'Passos controlados com rolamento calcanhar-ponta do pé para estimular a bomba muscular da barriga da perna e diminuir edemas.',
    detailedInstructions: [
      'Utiliza calçado confortável e com bom amortecimento.',
      'Inicia uma caminhada em terreno plano a ritmo conversacional (deves conseguir falar fluentemente sem perder o fôlego).',
      'Presta atenção à postura: ombros descontraídos, olhar no horizonte e bacia em posição neutra.',
      'Sente o empurrão suave dos dedos dos pés a cada passada para estimular o retorno venoso.',
      'Bebe pequenos goles de água ao longo do percurso.'
    ],
    breathingFocus: 'Respiração nasal constante e ritmada com os passos.',
    safetyCaution: 'Evita caminhar nas horas de maior calor. Se sentires fadiga ou contrações, senta-te e descansa.',
    illustrationKey: 'walking',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Caminhada'
  },
  {
    id: 'ex-8',
    name: 'Alongamento Lateral e Abertura Torácica',
    category: 'Mobilidade',
    durationMinutes: 8,
    suggestedReps: '5 respirações por cada lado',
    suggestedSets: '2 séries',
    difficultyLevel: 'Muito Suave',
    suitableTrimesters: [1, 2, 3],
    targetAreas: ['Músculos Intercostais', 'Quadrado Lombar', 'Peitorais'],
    shortDescription: 'Criação de espaço para a respiração e alívio da compressão diafragmática provocada pelo crescimento uterino.',
    detailedInstructions: [
      'Senta-te confortavelmente numa cadeira com as costas direitas.',
      'Eleva suavemente o braço direito acima da cabeça, mantendo o ombro afastado da orelha.',
      'Ao expirar, inclina ligeiramente o tronco para o lado esquerdo, sentindo o alongamento agradável nas costelas direitas.',
      'Mantém por 3 ciclos respiratórios completos, enviando o ar para o lado direito do tórax.',
      'Regressa devagar ao centro e repete para o outro lado.'
    ],
    breathingFocus: 'Inspira expandindo o lado que está a ser alongado; expira descontraindo.',
    safetyCaution: 'Não forces o movimento de inclinação lateral nem faças rotações bruscas.',
    illustrationKey: 'chest_stretch',
    videoDemoUrl: 'https://placehold.co/600x400/FBE4E2/4A154B?text=Video+Demonstrativo+Alongamento'
  }
];

export const SAFETY_DISCLAIMER_TEXT = 
  "Este protótipo não substitui aconselhamento profissional. Pára e contacta o teu médico se tiveres dor intensa, perdas de sangue ou líquido, contrações regulares, tonturas ou falta de ar.";
