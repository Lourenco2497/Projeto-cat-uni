import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';
import { ArticleDetailModal } from '../components/ui/ArticleDetailModal';
import { 
  Search, 
  Clock, 
  Bookmark, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const { favoriteArticleIds, toggleFavoriteArticle } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const TAG_OPTIONS = [
    'Todos',
    'Exercício',
    'Pavimento pélvico',
    'Alívio da dor',
    'Trimestres',
    'Saúde mental',
    'Guardados'
  ];

  // Filtra artigos
  const filteredArticles = ARTICLES.filter((art) => {
    // Filtro por Tag
    if (selectedTag === 'Guardados') {
      if (!favoriteArticleIds.includes(art.id)) return false;
    } else if (selectedTag !== 'Todos' && art.category !== selectedTag) {
      return false;
    }

    // Filtro por Pesquisa
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSummary = art.summary.toLowerCase().includes(q);
      const matchCategory = art.category.toLowerCase().includes(q);
      return matchTitle || matchSummary || matchCategory;
    }

    return true;
  });

  return (
    <div className="space-y-4 animate-fade-in text-left">
      
      {/* Cabeçalho do Ecrã */}
      <div className="py-1">
        <h1 className="text-xl font-bold text-[#4A154B] tracking-tight">
          Evidência & Artigos
        </h1>
        <p className="text-xs text-[#6E5C6F]">
          Ciência e recomendações clínicas para a tua gestação
        </p>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6E5C6F] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar por tema, dor ou trimestre..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#F3D5D1] text-xs text-[#2D1E2F] placeholder-[#6E5C6F]/60 focus:outline-none focus:border-[#7B287D] shadow-2xs"
        />
      </div>

      {/* Chips de Filtro por Tag (Wireframe 3) */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {TAG_OPTIONS.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#7B287D] text-white border-[#7B287D] shadow-xs'
                  : 'bg-white text-[#6E5C6F] border-[#F3D5D1] hover:bg-[#FFF7F6]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Lista de Cartões de Artigos (Wireframe 3) */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#F3D5D1]">
            <BookOpen className="w-8 h-8 text-[#7B287D] mx-auto mb-2 opacity-60" />
            <p className="text-xs font-semibold text-[#2D1E2F]">Nenhum artigo encontrado</p>
            <p className="text-[11px] text-[#6E5C6F] mt-1">
              Experimenta pesquisar por outro termo ou limpa os filtros.
            </p>
          </div>
        ) : (
          filteredArticles.map((article) => {
            const isFav = favoriteArticleIds.includes(article.id);

            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-3xl p-4 shadow-xs border border-[#F3D5D1] hover:border-[#7B287D] transition-all cursor-pointer space-y-3 group active:scale-[0.99]"
              >
                {/* Imagem do Cartão com Badge */}
                <div className="relative h-36 rounded-2xl overflow-hidden bg-[#FBE4E2]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#7B287D] text-white shadow-xs">
                      {article.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteArticle(article.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full shadow transition-all ${
                      isFav 
                        ? 'bg-[#7B287D] text-white' 
                        : 'bg-white/80 hover:bg-white text-[#2D1E2F]'
                    }`}
                    aria-label={isFav ? "Remover dos guardados" : "Guardar artigo"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTimeMinutes} min</span>
                  </div>
                </div>

                {/* Informação do Artigo */}
                <div>
                  <div className="text-[10px] font-bold text-[#7B287D] uppercase tracking-wider">
                    {article.source}
                  </div>
                  <h2 className="text-sm font-bold text-[#2D1E2F] group-hover:text-[#4A154B] transition-colors leading-snug mt-0.5">
                    {article.title}
                  </h2>
                  <p className="text-xs text-[#6E5C6F] line-clamp-2 mt-1 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Rodapé do Cartão */}
                <div className="flex items-center justify-between pt-1 border-t border-[#F5E5E2] text-[11px] font-semibold text-[#7B287D]">
                  <span className="text-[10px] text-[#6E5C6F] font-medium">
                    {article.date} · [Exemplo]
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Ler estudo completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de Detalhe Estruturado do Artigo */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={selectedArticle !== null}
        onClose={() => setSelectedArticle(null)}
        isFavorite={selectedArticle ? favoriteArticleIds.includes(selectedArticle.id) : false}
        onToggleFavorite={toggleFavoriteArticle}
      />
    </div>
  );
};
