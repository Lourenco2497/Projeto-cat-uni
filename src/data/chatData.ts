import type { ChatRoom, ChatMessage } from '../types';
export const CHAT_ROOMS: ChatRoom[] = [
  { id: 'room-3trim', name: 'Reta final & novos começos', description: 'Preparativos, pequenas descobertas e partilhas no terceiro trimestre.', tag: '3.º trimestre', memberCount: 0 },
  { id: 'room-exercicio', name: 'Movimento & quotidiano', description: 'Um espaço fictício para conversar sobre os registos do dia.', tag: 'Partilha', memberCount: 0 },
  { id: 'room-2trim', name: 'Uma etapa de cada vez', description: 'Momentos e perguntas desta nova fase da gravidez.', tag: '2.º trimestre', memberCount: 0 },
  { id: 'room-1trim', name: 'As primeiras descobertas', description: 'Uma conversa de exemplo sobre o início desta jornada.', tag: '1.º trimestre', memberCount: 0 },
];
export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = Object.fromEntries(CHAT_ROOMS.map((room, index) => [room.id, [
  { id: 'msg-' + index + '-1', roomId: room.id, senderName: 'Helena V.', senderWeek: 35, avatarSeed: 'Helena', text: 'Olá! Hoje reservei um momento para organizar as perguntas da minha próxima consulta. Como foi o vosso dia?', timestamp: 'Mensagem de exemplo', isCurrentUser: false },
  { id: 'msg-' + index + '-2', roomId: room.id, senderName: 'Margarida S.', senderWeek: 34, avatarSeed: 'Margarida', text: 'Olá, Helena! Estou a preparar uma pequena lista de coisas para esta semana. Um passo de cada vez.', timestamp: 'Mensagem de exemplo', isCurrentUser: false },
]]));
export const SIMULATED_REPLIES = [
  'Obrigada pela partilha! Esta é uma resposta automática de demonstração.',
  'Um dia de cada vez. Nesta conversa fictícia há espaço para os pequenos momentos.',
  'As dúvidas sobre saúde devem ser conversadas com a equipa que acompanha a gravidez. Este chat é apenas uma simulação.',
];

