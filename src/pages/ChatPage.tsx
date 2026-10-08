import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Send, MessageCircle } from 'lucide-react';
import { CHAT_ROOMS } from '../data/chatData';
import { useApp } from '../store/useApp';

export function ChatPage() {
  const { chatMessages, sendChatMessage } = useApp();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [text, setText] = useState('');
  const end = useRef<HTMLDivElement>(null);
  const room = CHAT_ROOMS.find(r => r.id === roomId);
  const messages = roomId ? chatMessages[roomId] ?? [] : [];
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }); }, [roomId, messages.length]);
  return <div className="stack"><header className="page-heading"><Link to="/community" className="text-button"><ArrowLeft size={18} /> Comunidade</Link><h1 style={{ marginTop: 12 }}>{room ? 'Uma conversa para ti' : 'Encontra o teu grupo'}</h1><p className="muted">Conversas locais com participantes fictícias.</p></header>
    <p className="callout neutral">Chat simulado: nada é enviado a outras pessoas. Não partilhes dados pessoais ou dúvidas clínicas reais.</p>
    {!room ? <div className="content-grid stack">{CHAT_ROOMS.map(r => <button className="card stack room-card" style={{ textAlign: 'left' }} key={r.id} onClick={() => setRoomId(r.id)}><div className="split"><MessageCircle size={26} /><ArrowUpRight size={20} /></div><span className="pill">{r.tag}</span><h2>{r.name}</h2><p className="small muted">{r.description}</p><span className="small muted">Grupo de demonstração</span></button>)}</div> : <section className="card chat-window stack"><div className="split"><h2>{room.name}</h2><button className="icon-button" aria-label="Voltar aos grupos" onClick={() => { setRoomId(null); setText(''); }}><ArrowLeft size={18} /></button></div>
      <div className="chat-messages" role="log" aria-label="Mensagens da conversa" aria-live="polite">{messages.length === 0 && <p className="muted small">Ainda não há mensagens. Escreve uma saudação fictícia para experimentar.</p>}{messages.map(message => <article className={'bubble' + (message.isCurrentUser ? ' mine' : '')} key={message.id}><p className="small"><strong>{message.isCurrentUser ? 'Tu · perfil fictício' : message.senderName + ' · simulação'}</strong></p><p style={{ marginTop: 6 }}>{message.text}</p><p className="small" style={{ marginTop: 6 }}>{message.timestamp}</p></article>)}<div ref={end} /></div>
      <form className="chat-compose" onSubmit={e => { e.preventDefault(); if (text.trim()) { sendChatMessage(room.id, text); setText(''); } }}><label htmlFor="message" className="sr-only">Mensagem fictícia</label><input id="message" autoComplete="off" maxLength={1000} value={text} onChange={e => setText(e.target.value)} placeholder="Escreve uma mensagem fictícia…" /><button type="submit" className="icon-button" aria-label="Enviar mensagem fictícia" disabled={!text.trim()}><Send size={18} /></button></form>
    </section>}
  </div>;
}

