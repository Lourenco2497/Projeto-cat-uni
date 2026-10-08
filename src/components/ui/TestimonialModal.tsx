import type { Testimonial } from '../../types';
import { Dialog } from './Dialog';
export function TestimonialModal({ testimonial, onClose }: { testimonial: Testimonial; onClose: () => void }) {
  return <Dialog title={testimonial.title} onClose={onClose}><div className="stack"><span className="pill">História fictícia · demonstração</span><div className="cluster"><span className="avatar" aria-hidden="true">{testimonial.author[0]}</span><div><h3>{testimonial.author}</h3><p className="small muted">{testimonial.week} semanas · {testimonial.location}</p></div></div><p className="quote">{testimonial.fullStory}</p><p className="callout neutral">Este relato foi criado para apresentar a interface. Não é um testemunho real nem evidência de benefício clínico.</p><button className="primary full" onClick={onClose}>Voltar à comunidade</button></div></Dialog>;
}

