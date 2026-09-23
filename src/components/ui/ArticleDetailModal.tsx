import React from 'react';
import { Article } from '../../types';
import { X, Clock, Bookmark, Share2, BookOpen, CheckCircle } from 'lucide-react';

interface Props {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ArticleDetailModal: React.FC<Props> = ({
  article,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  if (!isOpen || !article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up border border-[#F3D5D1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem de Capa e Botões Flutuantes */}
        <div className="relative h-44 w-full overflow-hidden bg-[#FBE4E2]">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#2D1E2F] shadow transition-transform active:scale-95"
            aria-label="Fechar artigo"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#7B287D] font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTimeMinutes} min de leitura</span>
            </div>
          </div>
        </div>

        {/* Conteúdo com Estrutura Académica */}
        <div className="p-6 overflow-y-auto space-y-5 text-left">
          <div>
            <div className="text-[11px] font-semibold text-[#7B287D] uppercase tracking-wide">
              {article.source}
            </div>
            <h2 id="article-modal-title" className="text-lg font-bold text-[#2D1E2F] leading-snug mt-1">
              {article.title}
            </h2>
            <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF1F0] text-[#C53030] border border-[#FAD2CF]">
              [Exemplo — substituir por artigo real da investigação]
            </div>
          </div>

          {/* Resumo */}
          <div className="p-3.5 rounded-2xl bg-[#FFF7F6] border border-[#F5E5E2] text-xs text-[#6E5C6F] leading-relaxed">
            <span className="font-bold text-[#2D1E2F]">Resumo: </span>
            {article.summary}
          </div>

          {/* Objetivo do Estudo */}
          <div>
            <h3 className="text-xs font-bold text-[#2D1E2F] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-4 h-4 text-[#7B287D]" />
              Objetivo da Investigação
            </h3>
            <p className="text-xs text-[#2D1E2F] leading-relaxed">
              {article.objective}
            </p>
          </div>

          {/* Métodos */}
          <div>
            <h3 className="text-xs font-bold text-[#2D1E2F] uppercase tracking-wider mb-1.5">
              Metodologia e Amostra
            </h3>
            <p className="text-xs text-[#6E5C6F] leading-relaxed">
              {article.methods}
            </p>
          </div>

          {/* Conclusão */}
          <div className="p-3.5 rounded-2xl bg-[#E8F5F2] border border-[#C7E9E2]">
            <h3 className="text-xs font-bold text-[#1E7E68] uppercase tracking-wider mb-1">
              Conclusão Clínica
            </h3>
            <p className="text-xs text-[#1E7E68]/90 leading-relaxed font-medium">
              {article.conclusion}
            </p>
          </div>

          {/* Dicas Práticas para a Grávida */}
          <div>
            <h3 className="text-xs font-bold text-[#2D1E2F] uppercase tracking-wider mb-2">
              Recomendações Práticas de Fisioterapia
            </h3>
            <ul className="space-y-2">
              {article.practicalTips.map((tip, idx) => (
                <li key={idx} className="flex gap-2.5 text-xs text-[#2D1E2F] leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-[#7B287D] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="p-4 border-t border-[#F5E5E2] bg-[#FFF7F6] flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleFavorite(article.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
              isFavorite
                ? 'bg-[#7B287D] text-white border-[#7B287D]'
                : 'bg-white text-[#6E5C6F] border-[#F3D5D1] hover:bg-[#FFF7F6]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Guardado' : 'Guardar Artigo'}
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-full bg-[#4A154B] text-white text-xs font-semibold hover:bg-[#370C38] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
