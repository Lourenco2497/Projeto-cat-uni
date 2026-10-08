import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, MessageCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import type { Testimonial } from '../types';
import { TestimonialModal } from '../components/ui/TestimonialModal';

export function CommunityPage() {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [liked, setLiked] = useState<string[]>([]);
  return <div className="stack"><header className="page-heading"><p className="eyebrow">Juntas nesta jornada</p><h1>Um espaço de partilha</h1><p className="muted">Histórias, perguntas e pequenos momentos.</p></header>
    <section className="card sage stack"><MessageCircle size={28} /><h2>Conversas ao teu ritmo</h2><p>Explora grupos por trimestre e experimenta uma conversa local.</p><Link to="/chat" className="primary">Entrar nas conversas <ArrowUpRight size={18} /></Link></section>
    <p className="callout neutral">Comunidade de demonstração: pessoas e histórias fictícias. As respostas são simuladas e não são orientação médica.</p>
    <div className="content-grid stack">{TESTIMONIALS.map(story => <article className="card stack" key={story.id}><div className="cluster"><span className="avatar" aria-hidden="true">{story.author[0]}</span><div><h3>{story.author}</h3><p className="small muted">{story.week} semanas · {story.location}</p></div></div><span className="pill">História fictícia</span><Quote size={22} /><h2>{story.title}</h2><p className="muted small">{story.excerpt}</p><div className="card-footer"><button className="text-button" onClick={() => setSelected(story)}>Ler história <ArrowUpRight size={16} /></button><button className="icon-button" aria-label={'Apoiar história de ' + story.author} aria-pressed={liked.includes(story.id)} onClick={() => setLiked(ids => ids.includes(story.id) ? ids.filter(id => id !== story.id) : [...ids, story.id])}><Heart size={18} fill={liked.includes(story.id) ? 'currentColor' : 'none'} /></button></div></article>)}</div>
    {selected && <TestimonialModal testimonial={selected} onClose={() => setSelected(null)} />}
  </div>;
}

