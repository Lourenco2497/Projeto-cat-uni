import { useState } from 'react';
import { Bookmark, BookOpen, ArrowUpRight, Search } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { useApp } from '../store/useApp';
import { ArticleDetailModal } from '../components/ui/ArticleDetailModal';
import type { Article } from '../types';

const categories = ['Todos', ...new Set(ARTICLES.map(a => a.category))];
export function ArticlesPage() {
  const { favoriteArticleIds, toggleFavoriteArticle } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [favorites, setFavorites] = useState(false);
  const [selected, setSelected] = useState<Article | null>(null);
  const results = ARTICLES.filter(a => (category === 'Todos' || a.category === category) && (!favorites || favoriteArticleIds.includes(a.id)) && (a.title + a.summary).toLocaleLowerCase('pt-PT').includes(search.toLocaleLowerCase('pt-PT').trim()));
  return <div className="stack"><header className="page-heading"><p className="eyebrow">Conhecer, com calma</p><h1>A tua biblioteca</h1><p className="muted">Temas para descobrir e perguntas para guardar.</p></header>
    <div><label htmlFor="article-search" className="cluster"><Search size={18} /> Procurar um tema</label><input id="article-search" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Movimento, conforto, pavimento pélvico…" /></div>
    <div className="chips" aria-label="Filtrar artigos">{categories.map(c => <button className="chip" key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}<button className="chip cluster" aria-pressed={favorites} onClick={() => setFavorites(!favorites)}><Bookmark size={16} /> Guardados</button></div>
    <p className="callout neutral">Biblioteca de demonstração. São estruturas editoriais: as fontes e o conteúdo clínico aguardam revisão.</p>
    {results.length === 0 && <section className="card stack"><h2>Nenhum tema encontrado</h2><p className="muted">Experimenta outra pesquisa ou altera os filtros.</p><button className="secondary" onClick={() => { setSearch(''); setCategory('Todos'); setFavorites(false); }}>Limpar filtros</button></section>}
    <div className="content-grid stack">{results.map(article => <article key={article.id} className="card article-card"><div className="article-art" aria-hidden="true"><BookOpen /></div><span className="eyebrow">{article.category}</span><h2>{article.title}</h2><p className="small muted">{article.summary}</p><span className="pill">Conteúdo por validar</span><div className="card-footer"><button className="text-button" onClick={() => setSelected(article)}>Explorar rascunho <ArrowUpRight size={16} /></button><button className="icon-button" aria-label={(favoriteArticleIds.includes(article.id) ? 'Remover dos guardados: ' : 'Guardar: ') + article.title} aria-pressed={favoriteArticleIds.includes(article.id)} onClick={() => toggleFavoriteArticle(article.id)}><Bookmark size={18} fill={favoriteArticleIds.includes(article.id) ? 'currentColor' : 'none'} /></button></div></article>)}</div>
    {selected && <ArticleDetailModal article={selected} onClose={() => setSelected(null)} />}
  </div>;
}

