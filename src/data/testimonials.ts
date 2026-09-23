import { Testimonial } from '../types';

/**
 * Testemunhos Fictícios da Comunidade de Grávidas
 * [Exemplo de testemunho fictício — conteúdo de demonstração para protótipo académico]
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Inês Ferreira',
    week: 28,
    location: 'Porto',
    title: 'A bola de pilates salvou as minhas noites de sono',
    excerpt: 'Às 22 semanas mal conseguia estar sentada no sofá com dores na anca e no cóccix. Começar com os círculos na bola e a respiração diafragmática fez uma diferença tremenda...',
    fullStory: 'Às 22 semanas mal conseguia estar sentada no sofá com dores na anca e no cóccix. A minha fisioterapeuta sugeriu os círculos suaves na bola suíça e 10 minutos de respiração antes de deitar. Em menos de duas semanas a rigidez matinal desapareceu quase por completo. Agora é o meu momento diário de conexão com o meu bebé!',
    likesCount: 42,
    theme: 'Alívio de Dor Lombar',
    avatarSeed: 'Ines'
  },
  {
    id: 'test-2',
    author: 'Marta Silveira',
    week: 34,
    location: 'Lisboa',
    title: 'Sentir que estou a preparar o meu corpo para o parto ativo',
    excerpt: 'Tinha muito medo de me mexer no 1.º trimestre por receio de prejudicar o bebé. Ter um plano suave e adaptado a cada semana deu-me imensa segurança e tranquilidade...',
    fullStory: 'Tinha muito medo de me mexer no 1.º trimestre por receio de prejudicar o bebé. Ter um plano suave e adaptado a cada semana deu-me imensa segurança e tranquilidade. Os exercícios de abertura da bacia e o trabalho de relaxamento do pavimento pélvico fazem-me sentir muito mais confiante para o dia do parto. Recomendo a todas as futuras mães!',
    likesCount: 56,
    theme: 'Preparação para o Parto',
    avatarSeed: 'Marta'
  },
  {
    id: 'test-3',
    author: 'Sofia Carvalho',
    week: 21,
    location: 'Coimbra',
    title: 'Adeus às pernas pesadas e inchaço no final do dia',
    excerpt: 'Trabalho muitas horas em pé e ao final do dia sentia as pernas como chumbo. A rotina de rolamento calcanhar-ponta e elevação suave mudou o meu conforto...',
    fullStory: 'Trabalho muitas horas em pé e ao final do dia sentia as pernas como chumbo. A rotina de rolamento calcanhar-ponta e a ativação circulatória mudou o meu conforto. É impressionante como movimentos tão simples e que demoram menos de 10 minutos têm um impacto tão visível na circulação e no alívio da fadiga.',
    likesCount: 38,
    theme: 'Edemas e Circulação',
    avatarSeed: 'Sofia'
  },
  {
    id: 'test-4',
    author: 'Carolina Ramos',
    week: 16,
    location: 'Braga',
    title: 'Ajudou-me a gerir o cansaço do primeiro trimestre',
    excerpt: 'Estava exausta e achava que exercício só me ia cansar mais. Os exercícios de respiração e abertura de peito deram-me de facto mais energia...',
    fullStory: 'Estava exausta e achava que exercício só me ia cansar mais. Experimentei os exercícios de respiração e o alongamento suave e senti um aumento imediato da vitalidade e uma sensação de calma que não sentia há semanas. Fazer um registo diário de como me sinto ajuda-me a respeitar o meu ritmo.',
    likesCount: 29,
    theme: 'Energia e Respiração',
    avatarSeed: 'Carolina'
  }
];
