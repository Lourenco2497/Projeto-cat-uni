import React from 'react';
import { Testimonial } from '../../types';
import { X, Heart, MapPin, Calendar, Sparkles } from 'lucide-react';

interface Props {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TestimonialModal: React.FC<Props> = ({ testimonial, isOpen, onClose }) => {
  if (!isOpen || !testimonial) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#F3D5D1] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-gradient-to-b from-[#FFF7F6] to-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#7B287D]/15 text-[#7B287D] flex items-center justify-center font-bold text-base border-2 border-white shadow-sm">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2D1E2F]">{testimonial.author}</h3>
                <div className="flex items-center gap-2 text-xs text-[#6E5C6F]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#7B287D]" />
                    {testimonial.week}.ª semana
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#6E5C6F] hover:text-[#4A154B] rounded-full hover:bg-black/5"
              aria-label="Fechar testemunho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBE4E2] text-[#7B287D] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {testimonial.theme}
          </div>

          <h2 className="text-base font-bold text-[#2D1E2F] leading-snug mb-3">
            "{testimonial.title}"
          </h2>

          <p className="text-xs leading-relaxed text-[#2D1E2F]/90 mb-4 whitespace-pre-line">
            {testimonial.fullStory}
          </p>

          <div className="p-2.5 rounded-xl bg-[#FFF1F0] border border-[#FAD2CF] text-[10px] text-[#C53030] text-center font-semibold mb-4">
            [Exemplo de testemunho fictício — conteúdo de demonstração para protótipo académico]
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#F5E5E2]">
            <div className="flex items-center gap-1.5 text-xs text-[#6E5C6F]">
              <Heart className="w-4 h-4 text-[#E07A5F] fill-current" />
              <span>{testimonial.likesCount} futuras mães inspiradas</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[#4A154B] text-white text-xs font-semibold hover:bg-[#370C38]"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
