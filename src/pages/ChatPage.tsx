import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { CHAT_ROOMS } from '../data/chatData';
import { 
  MessageCircle, 
  Send, 
  ArrowLeft, 
  Users, 
  Sparkles, 
  Heart, 
  Info,
  Calendar
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { chatMessages, sendChatMessage, user } = useApp();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('room-2trim');
  const [inputText, setInputText] = useState('');

  const currentRoom = CHAT_ROOMS.find(r => r.id === selectedRoomId);
  const activeMessages = selectedRoomId ? (chatMessages[selectedRoomId] || []) : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedRoomId) return;

    sendChatMessage(selectedRoomId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="space-y-4 animate-fade-in text-left">
      
      {/* 1. SELEÇÃO DE SALAS OU CONVERSA ATIVA */}
      {!selectedRoomId ? (
        // LISTA DE SALAS DE CHAT
        <div className="space-y-4">
          <div className="py-1">
            <h1 className="text-xl font-bold text-[#4A154B] tracking-tight">
              Salas de Conversa
            </h1>
            <p className="text-xs text-[#6E5C6F]">
              Espaço de partilha seguro entre futuras mães
            </p>
          </div>

          <div className="space-y-3">
            {CHAT_ROOMS.map((room) => {
              const count = (chatMessages[room.id] || []).length;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className="bg-white rounded-3xl p-4 shadow-xs border border-[#F3D5D1] hover:border-[#7B287D] transition-all cursor-pointer space-y-2 group active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#7B287D] uppercase tracking-wider bg-[#FBE4E2] px-2.5 py-0.5 rounded-full">
                      {room.tag}
                    </span>
                    <span className="text-[10px] text-[#6E5C6F] flex items-center gap-1 font-semibold">
                      <Users className="w-3 h-3 text-[#7B287D]" />
                      {room.memberCount} grávidas
                    </span>
                  </div>

                  <h2 className="text-sm font-bold text-[#2D1E2F] group-hover:text-[#4A154B] transition-colors">
                    {room.name}
                  </h2>

                  <p className="text-xs text-[#6E5C6F] leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F5E5E2] text-[11px] font-semibold text-[#7B287D]">
                    <span className="text-[10px] text-[#6E5C6F] font-normal">
                      {count} mensagens recentes
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Entrar na sala &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // ECRÃ DE CONVERSA DA SALA
        <div className="bg-white rounded-3xl shadow-xs border border-[#F3D5D1] flex flex-col h-[650px] overflow-hidden">
          
          {/* Cabeçalho da Conversa */}
          <div className="p-3.5 bg-[#FFF7F6] border-b border-[#F5E5E2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedRoomId(null)}
                className="p-1.5 rounded-full text-[#6E5C6F] hover:text-[#4A154B] hover:bg-white transition-colors"
                aria-label="Voltar à lista de salas"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xs font-bold text-[#2D1E2F] leading-tight">
                  {currentRoom?.name}
                </h2>
                <span className="text-[10px] text-[#6E5C6F]">
                  {currentRoom?.memberCount} participantes · {currentRoom?.tag}
                </span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-[#E8F5F2] text-[#1E7E68] text-[9px] font-bold">
              Chat Ativo
            </span>
          </div>

          {/* Área de Mensagens (com scroll) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FBE4E2]/20">
            {/* Aviso da Comunidade */}
            <div className="p-2.5 rounded-2xl bg-[#FFF7F6] border border-[#F5E5E2] text-center text-[10px] text-[#6E5C6F]">
              <Sparkles className="w-3 h-3 text-[#7B287D] inline mr-1" />
              Ambiente de partilha positiva. Lembra-te que cada gestação é única e segue as recomendações do teu obstetra.
            </div>

            {activeMessages.map((msg) => {
              const isMe = msg.isCurrentUser;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1 animate-fade-in`}
                >
                  {/* Nome do Remetente */}
                  {!isMe && (
                    <span className="text-[10px] font-bold text-[#7B287D] ml-2 flex items-center gap-1">
                      <span>{msg.senderName}</span>
                      <span className="text-[9px] text-[#6E5C6F] font-normal">({msg.senderWeek} sem)</span>
                    </span>
                  )}

                  {/* Balão de Mensagem */}
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-[#4A154B] text-white rounded-br-xs'
                        : 'bg-white text-[#2D1E2F] border border-[#F3D5D1] rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        isMe ? 'text-white/70' : 'text-[#6E5C6F]'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Caixa de Envio de Mensagem */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#F5E5E2] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escreve uma mensagem ou dúvida..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#FFF7F6] border border-[#F3D5D1] text-xs text-[#2D1E2F] placeholder-[#6E5C6F]/60 focus:bg-white focus:outline-none focus:border-[#7B287D]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-full bg-[#7B287D] hover:bg-[#4A154B] text-white flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer shrink-0"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
