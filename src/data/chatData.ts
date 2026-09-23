import { ChatRoom, ChatMessage } from '../types';

export const CHAT_ROOMS: ChatRoom[] = [
  {
    id: 'room-2trim',
    name: '2.º Trimestre — Energia & Movimento',
    description: 'Partilha de rotinas, alívio de queixas e energia renovada no segundo trimestre.',
    memberCount: 148,
    tag: 'Semanas 13 a 27'
  },
  {
    id: 'room-exercicio',
    name: 'Dúvidas de Fisioterapia & Postura',
    description: 'Perguntas sobre posições na bola, respiração e conforto nas costas.',
    memberCount: 215,
    tag: 'Técnica & Conforto'
  },
  {
    id: 'room-3trim',
    name: '3.º Trimestre — Reta Final & Parto',
    description: 'Exercícios de abertura da bacia, mala da maternidade e preparação perineal.',
    memberCount: 182,
    tag: 'Semanas 28 a 40+'
  },
  {
    id: 'room-1trim',
    name: '1.º Trimestre — Primeiras Semanas',
    description: 'Espaço acolhedor para falar de enjoo, fadiga e os primeiros cuidados.',
    memberCount: 94,
    tag: 'Semanas 4 a 12'
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'room-2trim': [
    {
      id: 'msg-1',
      roomId: 'room-2trim',
      senderName: 'Catarina M.',
      senderWeek: 22,
      avatarSeed: 'Catarina',
      text: 'Olá a todas! Alguém já fez o exercício do gato-camelo hoje? Ajudou imenso com a sensação de peso na lombar depois de um dia de trabalho no escritório.',
      timestamp: 'Hoje, 10:15',
      isCurrentUser: false
    },
    {
      id: 'msg-2',
      roomId: 'room-2trim',
      senderName: 'Beatriz L.',
      senderWeek: 25,
      avatarSeed: 'Beatriz',
      text: 'Sim! Faço sempre ao fim da tarde com a respiração diafragmática. Antes sentia muitas pontadas na anca direita e agora sinto a bacia muito mais solta 😊',
      timestamp: 'Hoje, 10:22',
      isCurrentUser: false
    },
    {
      id: 'msg-3',
      roomId: 'room-2trim',
      senderName: 'Mariana P.',
      senderWeek: 24,
      avatarSeed: 'Mariana',
      text: 'Uma dúvida: vocês usam a bola de pilates de 65cm? Eu tenho 1,65m e sinto que as ancas ficam no alinhamento perfeito com os joelhos!',
      timestamp: 'Hoje, 10:48',
      isCurrentUser: false
    }
  ],
  'room-exercicio': [
    {
      id: 'msg-4',
      roomId: 'room-exercicio',
      senderName: 'Filipa T.',
      senderWeek: 19,
      avatarSeed: 'Filipa',
      text: 'Meninas, no exercício do pavimento pélvico é normal sentir mais facilidade em contrair do que em relaxar? O que a vossa fisio vos recomendou?',
      timestamp: 'Hoje, 09:30',
      isCurrentUser: false
    },
    {
      id: 'msg-5',
      roomId: 'room-exercicio',
      senderName: 'Teresa R.',
      senderWeek: 27,
      avatarSeed: 'Teresa',
      text: 'Olá Filipa! Sim, a minha fisioterapeuta disse que é super comum haver tensão inconsciente. Ela recomendou expirar em 6 tempos e focar 100% no soltar da bacia.',
      timestamp: 'Hoje, 09:42',
      isCurrentUser: false
    }
  ],
  'room-3trim': [
    {
      id: 'msg-6',
      roomId: 'room-3trim',
      senderName: 'Helena V.',
      senderWeek: 35,
      avatarSeed: 'Helena',
      text: 'Entrei nas 35 semanas! O agachamento apoiado na cadeira tem sido incrível para libertar a pressão no sacro. Vocês costumam fazer todos os dias?',
      timestamp: 'Ontem, 18:20',
      isCurrentUser: false
    },
    {
      id: 'msg-7',
      roomId: 'room-3trim',
      senderName: 'Margarida S.',
      senderWeek: 37,
      avatarSeed: 'Margarida',
      text: 'Eu faço em dias alternados! Quando sinto contrações de Braxton-Hicks fico só pela respiração e relaxo deitada de lado com a almofada de amamentação 💕',
      timestamp: 'Ontem, 18:45',
      isCurrentUser: false
    }
  ],
  'room-1trim': [
    {
      id: 'msg-8',
      roomId: 'room-1trim',
      senderName: 'Joana D.',
      senderWeek: 10,
      avatarSeed: 'Joana',
      text: 'Alguma dica para quem tem muitas náuseas de manhã mas quer manter os alongamentos suaves?',
      timestamp: 'Hoje, 08:12',
      isCurrentUser: false
    },
    {
      id: 'msg-9',
      roomId: 'room-1trim',
      senderName: 'Cláudia G.',
      senderWeek: 11,
      avatarSeed: 'Claudia',
      text: 'Joana, a mim ajudou fazer os exercícios apenas no final da manhã ou à tarde, depois de comer uma tosta ou bolacha de água e sal. Ouve sempre o teu corpo!',
      timestamp: 'Hoje, 08:35',
      isCurrentUser: false
    }
  ]
};

export const SIMULATED_REPLIES = [
  "Muito obrigada por partilhares! Vou experimentar também hoje no meu registo diário.",
  "Que excelente dica! A minha fisioterapeuta também reforçou a importância desse movimento.",
  "Concordo totalmente! Cada gravidez tem o seu ritmo, o importante é ouvir os sinais do corpo.",
  "Força! Estamos todas juntas nesta caminhada. Lembra-te de beber água e descansar se necessário 💕",
  "O registo de dor ajuda imenso a perceber o progresso. Continua o bom trabalho!"
];
