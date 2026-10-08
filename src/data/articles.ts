import type { Article } from '../types';

// shortcut: editorial mockups only; replace with reviewed citations before clinical use.
export const ARTICLES: Article[] = [
  { id: 'art-1', title: 'Movimento na gravidez: perguntas para a consulta', category: 'Exercício', summary: 'Uma estrutura para reunir dúvidas sobre movimento, acompanhamento e adaptações na gravidez.' },
  { id: 'art-2', title: 'Conhecer o pavimento pélvico', category: 'Pavimento pélvico', summary: 'Um espaço em preparação para explorar consciência corporal, contração e relaxamento com a equipa de fisioterapia.' },
  { id: 'art-3', title: 'O teu registo de conforto', category: 'Alívio da dor', summary: 'Como organizar observações sobre dor e atividades do dia para conversar na consulta.' },
  { id: 'art-4', title: 'A reta final, ao teu ritmo', category: 'Trimestres', summary: 'Perguntas e temas para um acompanhamento individual no terceiro trimestre.' },
  { id: 'art-5', title: 'Uma pausa para ti', category: 'Saúde mental', summary: 'Um rascunho sobre momentos de pausa, bem-estar e redes de apoio.' },
  { id: 'art-6', title: 'Corpo em mudança: preparar perguntas', category: 'Exercício', summary: 'Uma ficha para reunir dúvidas sobre alterações do corpo e movimentos do quotidiano.' },
].map(article => ({
  ...article, category: article.category as Article['category'], readTimeMinutes: 2,
  source: 'Referência científica por selecionar', date: 'Rascunho académico',
  objective: 'Organizar conteúdo educativo para revisão pela equipa académica e clínica.',
  methods: 'Pesquisa bibliográfica e seleção de fontes ainda pendentes. Este rascunho não apresenta resultados de um estudo.',
  conclusion: 'O conteúdo final, as orientações e as referências serão acrescentados após revisão.',
  practicalTips: ['Que perguntas gostarias de colocar à equipa de saúde?', 'Que observações do teu registo gostarias de levar à consulta?'],
  imageUrl: '', citationUrl: '',
}));

