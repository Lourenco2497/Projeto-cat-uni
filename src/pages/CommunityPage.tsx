import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Testimonial } from '../types';
import { TestimonialModal } from '../components/ui/TestimonialModal';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Sparkles, 
  MessageCircle, 
  Share2,
  Users
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Ilustrações temáticas para cada testemunho
  const getTestimonialVisual = (idx: number) => {
    const images = [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=600&q=80'
    ];
    return images[idx % images.length];
  };

  return (
    <div className="space-y-4 animate-fade-in text-left">
      
      {/* Cabeçalho do Ecrã */}
      <div className="py-1">
        <h1 className="text-xl font-bold text-[#4A154B] tracking-tight">
          Comunidade & Testemunhos
        </h1>
        <p className="text-xs text-[#6E5C6F]">
          Histórias reais de superação e movimento saudável
        </p>
      </div>

      {/* Cartão de Boas-Vindas da Comunidade */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#FFF7F6] to-white border border-[#F3D5D1] shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7B287D]/10 text-[#7B287D] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#2D1E2F]">Partilha a tua experiência</div>
            <p className="text-[10px] text-[#6E5C6F]">
              Junta-te a mais de 800 grávidas que praticam diariamente
            </p>
          </div>
        </div>
      </div>

      {/* Lista Vertical de Testemunhos (Wireframe 4) */}
      <div className="space-y-4">
        {TESTIMONIALS.map((test, index) => {
          const isLiked = likedMap[test.id];
          const totalLikes = test.likesCount + (isLiked ? 1 : 0);

          return (
            <div
              key={test.id}
              onClick={() => setSelectedTestimonial(test)}
              className="bg-white rounded-3xl p-4 shadow-xs border border-[#F3D5D1] hover:border-[#7B287D] transition-all cursor-pointer space-y-3 group active:scale-[0.99]"
            >
              {/* Cabeçalho do Autor */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#7B287D]/15 text-[#7B287D] flex items-center justify-center font-bold text-xs border border-white shadow-2xs">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#2D1E2F] group-hover:text-[#4A154B] transition-colors">
                      {test.author}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-[#6E5C6F]">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-2.5 h-2.5 text-[#7B287D]" />
                        {test.week}.ª semana
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        {test.location}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FBE4E2] text-[#7B287D]">
                  {test.theme}
                </span>
              </div>

              {/* Título do Testemunho */}
              <h2 className="text-sm font-bold text-[#2D1E2F] leading-snug">
                "{test.title}"
              </h2>

              {/* Imagem Grande (Wireframe 4) */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-[#FBE4E2] border border-[#F3D5D1]/60">
                <img
                  src={getTestimonialVisual(index)}
                  alt={test.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                <span className="absolute bottom-2 left-2 text-[9px] font-semibold text-white/95 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                  [Exemplo de testemunho fictício]
                </span>
              </div>

              {/* Texto Curto com "Ler mais" */}
              <p className="text-xs text-[#6E5C6F] leading-relaxed">
                {test.excerpt}{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTestimonial(test);
                  }}
                  className="font-bold text-[#7B287D] hover:underline inline-flex items-center"
                >
                  ler mais
                </button>
              </p>

              {/* Rodapé de Interações */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F5E5E2] text-xs">
                <button
                  type="button"
                  onClick={(e) => handleToggleLike(test.id, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                    isLiked
                      ? 'bg-[#FFF1EE] text-[#E07A5F]'
                      : 'text-[#6E5C6F] hover:bg-[#FFF7F6]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#E07A5F] text-[#E07A5F]' : ''}`} />
                  <span>{totalLikes}</span>
                </button>

                <div className="flex items-center gap-3 text-[11px] text-[#6E5C6F]">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>8 comentários</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal com a História Completa */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        isOpen={selectedTestimonial !== null}
        onClose={() => setSelectedTestimonial(null)}
      />
    </div>
  );
};
