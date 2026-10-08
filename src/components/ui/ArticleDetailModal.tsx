import type { Article } from '../../types';
import { Dialog } from './Dialog';
export function ArticleDetailModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return <Dialog title={article.title} onClose={onClose}><div className="stack">
    <span className="pill">Rascunho académico · conteúdo por validar</span><p>{article.summary}</p>
    <section><h3>Objetivo editorial</h3><p className="muted small" style={{ marginTop: 8 }}>{article.objective}</p></section>
    <section><h3>Pesquisa e fontes</h3><p className="muted small" style={{ marginTop: 8 }}>{article.methods}</p><p className="small" style={{ marginTop: 10 }}>{article.source}</p>{article.citationUrl && <a className="text-button" href={article.citationUrl} target="_blank" rel="noopener noreferrer">Consultar referência</a>}</section>
    <section><h3>Próximo passo</h3><p className="muted small" style={{ marginTop: 8 }}>{article.conclusion}</p></section>
    <section className="callout"><h3>Para a tua próxima conversa</h3><ul style={{ paddingLeft: 20, marginBottom: 0 }}>{article.practicalTips.map(tip => <li key={tip}>{tip}</li>)}</ul></section>
    <button className="primary full" onClick={onClose}>Voltar à biblioteca</button>
  </div></Dialog>;
}

