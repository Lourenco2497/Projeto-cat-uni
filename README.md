# CatUni Materna · Fisioterapia e Exercício na Gravidez

Protótipo web mobile-first desenvolvido em **React 19 + TypeScript + Vite + Tailwind CSS** para um projeto académico de **Fisioterapia Obstétrica**.

O projeto serve como proposta/ideia navegável para apresentação clínica e académica, com foco em segurança materno-fetal, prescrição individualizada de exercício, literacia em saúde e partilha comunitária.

---

## 🌸 Funcionalidades Implementadas

1. **Ecrã de Boas-Vindas & Criar Conta (Wireframe 1)**:
   - Logótipo com monograma da aplicação.
   - Campo de email e botões sociais (Google / Apple).
   - Simulação: qualquer email avança diretamente para a avaliação clínica.

2. **Avaliação Inicial & Prescrição Inteligente (Stepper Clínico)**:
   - Stepper em 5 passos com indicador de progresso e cálculo de semanas/trimestre (com analogia de tamanho do bebé a frutas).
   - Histórico obstétrico e nível prévio de atividade física.
   - Seleção tátil de queixas atuais (dor lombar, dor pélvica, incontinência, edemas, náuseas).
   - **Sinalizações Clínicas de Alerta (Red Flags)**: Se assinaladas condições como gravidez de risco ou hipertensão, surge um aviso de segurança e gera-se automaticamente um perfil **Conservador** focado apenas em respiração e relaxamento.
   - Objetivos maternos e ativação do plano semanal.

3. **Início (Resumo Gestacional - Tab 1)**:
   - Identificação da semana e trimestre atual.
   - Comparação do bebé com tamanho de frutas e peso médio.
   - Exercício do dia com botão de conclusão rápida.
   - Barra de progresso semanal (dias concluídos).
   - Dica postural diária de fisioterapia.

4. **Calendário & Registo Diário de Sensações (Wireframe 2 - Tab 2)**:
   - Seletor de mês com setas.
   - Tira semanal (`D S T Q Q S S`) com destaque a roxo no dia selecionado e pontos de conclusão.
   - Cartão com ilustração do exercício do dia e link para demonstração passo a passo em modal interativo.
   - **Formulário de Registo**: Sintomas (chips), Escala de Dor (slider 0-10), Nível de Esforço/Dificuldade (slider 0-10), Contrações (nenhuma / ocasionais / regulares), séries e repetições.
   - **Sinais de Alarme Clínico**: Se a dor for $\ge 7$ ou existirem contrações regulares, surge um aviso vermelho imediato recomendando a paragem do exercício e o contacto com o médico.

5. **Estatísticas & Insights Clínicos (Tab 3)**:
   - Anel de percentagem de cumprimento da meta semanal.
   - Contador de sequência ativa (*streak*) e total de exercícios concluídos.
   - **Gráfico de Linha (Recharts)**: Evolução temporal de Dor vs Dificuldade.
   - **Gráfico de Barras (Recharts)**: Sessões realizadas por semana.
   - **Gráfico Donut (Recharts)**: Distribuição por tipo de exercício (Mobilidade, Pavimento Pélvico, Respiração, Força Suave).
   - Insight gerado em linguagem natural encorajadora.
   - Botão **"Repor Demo"** para recarregar dados ricos em qualquer momento da apresentação.

6. **Comunidade & Testemunhos (Wireframe 4 - Tab 4)**:
   - Lista vertical de cartões com títulos, fotografia/ilustração e excerto com *"ler mais"*.
   - Histórias claramente identificadas como `[Exemplo de testemunho fictício]`.
   - Botão interativo de apoio com contador de gostos.

7. **Artigos Científicos Baseados em Evidência (Wireframe 3 - Tab 5)**:
   - Barra de pesquisa e filtros por tema (*Exercício*, *Pavimento pélvico*, *Trimestres*, *Saúde mental*, *Alívio da dor*, *Guardados*).
   - Cartões com tempo de leitura, fonte (ex.: ACOG, BJSM, Cochrane) e resumo.
   - Leitor modal estruturado: Objetivo da investigação, Metodologia, Conclusões e Recomendações práticas para a grávida.

8. **Salas de Chat (Tab 6)**:
   - Lista de salas por trimestre e temas de fisioterapia.
   - Conversa com balões diferenciados e avatares.
   - Envio de mensagens locais com resposta automática simulada após 1.5s.

9. **Barra de Navegação em Pílula Flutuante**:
   - 6 separadores com ícones e destaque da página ativa.
   - Modo de visualização adaptável no Desktop: moldura de telemóvel realista ou ecrã inteiro.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- npm

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Abre o browser em: `http://localhost:5173/`

### 3. Gerar a compilação de produção (build)
```bash
npm run build
```

---

## 🛠️ Como Editar o Conteúdo Mock (Guia para Não-Programadores)

Todos os dados clínicos da aplicação estão isolados em ficheiros simples na pasta `src/data/`:

| Conteúdo | Ficheiro | O que podes alterar |
| :--- | :--- | :--- |
| **Exercícios** | `src/data/exercises.ts` | Nomes dos exercícios, tempos, séries, repetições, instruções passo a passo, notas de respiração e alertas de segurança. |
| **Geração do Plano** | `src/lib/planGenerator.ts` | Regras que atribuem exercícios a cada dia da semana com base no trimestre e queixas. |
| **Artigos Científicos** | `src/data/articles.ts` | Títulos de estudos reais, resumos clínicos, citações e conclusões. |
| **Testemunhos** | `src/data/testimonials.ts` | Nomes, semanas de gestação, excertos e histórias completas da comunidade. |
| **Chat** | `src/data/chatData.ts` | Nomes das salas, descrição e mensagens pré-carregadas. |
| **Histórico Demo** | `src/data/demoData.ts` | Valores iniciais dos últimos 14 dias para dor, dificuldade e treinos concluídos. |

---

## 🎨 Sistema de Design (Inspiração Flo)

- **Fundo**: `#FBE4E2` (Rosa pálido maternal e acolhedor)
- **Ameixa Escuro (Botão Primário)**: `#4A154B`
- **Roxo / Ameixa (Destaque do Calendário & Navegação)**: `#7B287D`
- **Coral / Terracotta (Acentos de Atenção)**: `#E07A5F`
- **Texto Principal**: `#2D1E2F` (Plum-gray, contraste elevado sem ser preto puro)
- **Alerta Clínico**: `#C53030`
- **Sucesso / Concluído**: `#1E7E68`
- **Cantos Arredondados**: `rounded-3xl` (24px)
- **Acessibilidade**: Alvos táteis $\ge 44\text{px}$, suporte a leitores de ecrã (ARIA), etiquetas semânticas.

---

## ⚠️ Nota Ética e Legal

> *"Este protótipo não substitui aconselhamento profissional. Pára e contacta o teu médico se tiveres dor intensa, perdas de sangue ou líquido, contrações regulares, tonturas ou falta de ar."*
> 
> Todos os exercícios, artigos e testemunhos incluídos são ilustrativos para apresentação académica e devem ser clinicamente validados pela autora e orientadores do projeto.
