# CatUni Materna

Aplicação web mobile-first para uma apresentação académica de acompanhamento na gravidez. Interface em português de Portugal, com cartões suaves, calendário, registo diário e uma comunidade fictícia. O brainstorming informa o produto; as decisões aprovadas pelo utilizador definem a implementação.

## Executar

Testado com Node.js 24.18.0. Usa Node 24 para executar também os testes nativos.

```sh
npm ci
npm run dev
```

No PowerShell, usa `npm.cmd` se a política de execução bloquear `npm.ps1`. A apresentação em execução nesta sessão usa http://127.0.0.1:5173/. Mantém o mesmo endereço: `localhost` e `127.0.0.1` têm armazenamento separado.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

O alojamento estático deve encaminhar rotas como `/calendar` para `index.html`. A implantação não faz parte desta entrega.

## Acesso e persistência

A decisão aprovada foi acesso de demonstração com persistência local. Não há verificação de identidade, passwords, OAuth, Firebase ou backend próprio. Os botões permitem criar um perfil fictício, retomar o perfil guardado ou explorar o exemplo de 34 semanas + 2 dias.

Um perfil novo começa sem histórico, favoritos ou mensagens. Sair preserva os dados; substituir o perfil ou repor o exemplo exige confirmação e substitui os dados atuais. Usa apenas dados fictícios.

O estado é guardado em `catuni_maternal_demo_v2`. A leitura valida perfis, datas, escalas, contagens, exercícios e mensagens; recupera o formato anterior quando possível. Carregar dados não escreve sobre a cópia antiga. Dados inválidos e falhas de armazenamento produzem um aviso; uma sessão pode continuar em memória. A recuperação pode exigir criar ou repor um perfil. Não há sincronização entre dispositivos ou separação segura de utilizadores.

Firebase Auth passa a ser a alternativa se forem exigidas contas verificadas; Firestore só será necessário se também houver persistência por utilizador entre dispositivos. O catálogo de exercícios pode continuar estático.

## Arquitetura e conteúdo

React, TypeScript, Vite, Tailwind, React Router, Lucide e Recharts foram reutilizados. Não foi acrescentada uma biblioteca de UI ou de estado. TypeScript foi alinhado com a versão suportada pelo lint; `typescript-eslint` permite verificar TS/TSX. O gráfico é carregado apenas ao abrir Evolução.

| Ficheiro | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Rotas, acesso de demo, avaliação e carregamento diferido de Evolução |
| `src/store/AppContext.tsx`, `useApp.ts` | Perfil, sessão, registos, favoritos, conversa local e operações partilhadas |
| `src/lib/persistence.ts` | Validação e recuperação do armazenamento |
| `src/lib/dates.ts` | Hoje em Europe/Lisbon e aritmética de datas sem deslocamento de dia |
| `src/lib/planGenerator.ts` | Rotação ilustrativa e estado sem sugestões |
| `src/lib/statsCalculator.ts` | Estatísticas e gráficos derivados dos registos |
| `src/components/layout/AppLayout.tsx` | Cabeçalho, cinco destinos móveis e barra lateral em desktop |
| `src/components/ui/Dialog.tsx` | Diálogo nativo com foco, Escape e restituição do foco |
| `src/data/exercises.ts` | Oito exercícios com IDs estáveis; sete elegíveis no terceiro trimestre |
| `src/data/demoData.ts` | Perfil e 14 dias de histórico exclusivamente fictícios |
| `src/data/articles.ts` | Seis estruturas editoriais com campos de referência pendentes |
| `src/data/testimonials.ts`, `chatData.ts` | Histórias e mensagens fictícias |
| `src/pages/` | Boas-vindas, avaliação, Hoje, Calendário, Evolução, Aprender, Comunidade, Chat e Perfil |

Os formulários, filtros e diálogos usam estado local. O Context mantém apenas os dados partilhados. A seleção do dia é transitória; os registos são guardados por data.

A avaliação recolhe semanas + dias, tipo de gravidez, apresentação fetal, história obstétrica, atividade, consciência perineal, queixas, condições reportadas e objetivos. Estes campos ilustram o fluxo; não formam um motor clínico validado. Condições reportadas ou avaliação por esclarecer suspendem sugestões, sem uma prescrição alternativa. O registo de sintomas continua disponível.

Os guias mostram ilustrações e passos reais de navegação, com parâmetros de exemplo. Os vídeos aguardam conteúdo aprovado. Artigos não apresentam estudos ou resultados inventados. Exames têm apenas uma pré-visualização fictícia de campos futuros.

Conclusão rápida não cria valores de dor, esforço, séries ou repetições. Um alerta registado suspende a conclusão; datas futuras não aceitam registos. Mudar a avaliação preserva as conclusões anteriores e os IDs do histórico; um exercício excluído não recebe um substituto nem um guia. Dor média ignora medições ausentes. Os gráficos usam períodos reais e deixam lacunas sem valores. Não atribuem alterações à eficácia do exercício.

As respostas do chat são automáticas e locais. Os temporizadores pendentes são cancelados ao sair, substituir o perfil, repor o exemplo ou concluir a avaliação.

## Guião de apresentação

1. Abrir a aplicação e escolher **Explorar exemplo preenchido**. Se já existir um perfil, confirmar a substituição.
2. Em **Hoje**, apresentar 34 semanas + 2 dias, os últimos sete dias e o movimento ilustrativo.
3. Abrir o guia, percorrer passos e fechar com Escape.
4. Em **Calendário**, navegar entre meses, escolher um dia, registar uma medida e guardar. Recarregar e voltar ao mesmo dia para mostrar persistência.
5. Abrir **Evolução** e relacionar valores e gráficos com os registos.
6. Em **Aprender**, pesquisar, guardar um tema e abrir o rascunho. Mostrar a indicação de fontes pendentes.
7. Em **Comunidade**, abrir uma história fictícia e uma conversa; enviar apenas uma mensagem fictícia e mostrar a resposta automática.
8. Em **Perfil**, mostrar a avaliação, a edição e a proposta de acompanhamento/exames.
9. Para demonstrar o estado suspenso, editar a avaliação e selecionar um exemplo por esclarecer ou com restrição. Mostrar o registo diário disponível sem conclusão de exercício.
10. Repor o exemplo em Perfil antes da apresentação seguinte.

Para mostrar o estado vazio, sair e criar um perfil fictício novo. Para apresentar sem internet, testar previamente todas as páginas com o servidor local disponível. Não existe instalação offline/PWA nem promessa de carregamento inicial offline.

## Verificação e limites

24 testes nativos cobrem exclusões e seleção, catálogos limitado/vazio, intervalos estatísticos, medições ausentes, lacunas no gráfico, datas em Lisboa, recuperação do formato antigo, armazenamento corrompido, validação de campos e identidade histórica dos exercícios. Uma inversão deliberada da condição de avaliação fez falhar os testes e foi revertida.

Typecheck, lint TS/TSX e build passam. O pacote inicial de produção ficou perto de 349 kB antes de gzip; Recharts está num pacote separado. A atualização específica de `source-map-js` para 1.2.2 corrigiu o alerta identificado no [aviso do mantenedor](https://github.com/7rulnik/source-map-js/releases/tag/v1.2.2); a auditoria posterior não reportou vulnerabilidades conhecidas.

Verificação manual no browser Chromium ligado: perfil novo e exemplo, avaliação e edição, acesso protegido, logout/refresh/retoma, meses e datas futuras, gravação e valores zero, alertas e conclusão rápida, histórico vazio, pesquisa e favoritos persistentes, histórias, guia com Escape/foco, conversa simulada e confirmação de substituição. Calendário e Perfil não tiveram overflow horizontal a 320, 375, 390, 430 e 1280 px; Evolução foi inspecionada a 320 px. O histórico de consola inspecionado não apresentou erros da aplicação.

Limites da verificação: zoom nativo a 200%, iOS/Safari físico, teclado móvel real e comportamento de safe areas em hardware não foram verificados. Os atalhos de zoom não alteraram a escala do browser integrado. Testes dos comandos reais do contexto, com relógio controlado, verificam respostas simuladas, cancelamento após sair/criar/repor perfil e continuidade em memória quando a escrita local falha; a corrida de 1,5 s não foi reproduzida separadamente no browser.

## Pendências do cliente

- Catálogo final, exclusões, progressões, tempos, repetições, séries e precauções com validação clínica.
- Critérios e texto dos alertas; os limiares atuais são convenções do protótipo.
- Vídeos aprovados e direitos de utilização dos materiais.
- Fontes bibliográficas, resumos revistos e DOI/URLs de referência.
- Marca e assets finais; consentimento e moderação se a comunidade passar a usar pessoas reais.
- Decisão sobre exames, contas reais, sincronização, alojamento e operação.

Ponytail full e find-skills orientaram o trabalho. Foram reutilizados os skills disponíveis de frontend, segurança, implementação incremental, testes e browser; o skill PDF instalado no workspace serviu para rever o briefing. O plano aprovado e a lista de execução estão em `tasks/` (pasta local ignorada pelo Git).




