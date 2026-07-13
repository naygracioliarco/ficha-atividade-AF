# Ficha de Atividades — 6º ano

Aplicação web interativa (React + TypeScript) com fichas digitais de **Língua Portuguesa** e **Matemática** para o 6º ano · Volume 1 · Capítulo 1.

## Visão geral

O app renderiza uma ficha digital em páginas scrolláveis com:

- textos de leitura (notícias, cartaz) e questões de interpretação;
- atividades de gramática (substantivos);
- atividades de matemática (sistemas de numeração, ordens, reta numérica, ábaco interativo etc.);
- respostas salvas no `localStorage`;
- botão **Para o professor** com códigos BNCC e gabarito;
- download das respostas em PDF.

## Conteúdo

| Seção | Páginas | Temas |
|-------|---------|--------|
| **1. Língua Portuguesa** | 1–4 | Notícia do pliossauro, aquecimento global (Prova Brasil), cartaz da Campanha do Agasalho, classificação de substantivos |
| **2. Matemática** | 5–8 | Egípcio/maia/romano, sistema decimal, formação de números, comparação, planetas, ábaco |

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- localStorage (respostas e posição de scroll)
- jsPDF (exportação de respostas)

## Execução local

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev             # desenvolvimento (Vite)
npm run build           # build de produção
npm run preview         # pré-visualização do build
npm run lint            # ESLint
npm run typecheck       # checagem de tipos
npm run deploy          # deploy do dist (gh-pages)
npm run electron:pack   # executável Windows portátil
```

## Estrutura principal

```text
src/
  components/
    Book.tsx                 # layout das páginas (Português + Matemática)
    Header.tsx               # capa Língua Portuguesa
    MathHeader.tsx           # capa Matemática
    math/MathWidgets.tsx     # tabelas, ábaco, reta, símbolos maias etc.
    QuestionRenderer.tsx
    Question*.tsx            # tipos de questão
    TeacherButton.tsx
    TeacherAnswers.tsx
    DownloadQuestionsButton.tsx
  data/
    questions.ts             # questões de Português + exports combinados
    mathQuestions.ts         # questões / gabarito de Matemática
  hooks/
    useUserAnswers.ts
    usePagination.ts
    useScrollPosition.ts
  types/
    questions.ts
  utils/
    storage.ts
```

## Dados das questões

- **Português:** `src/data/questions.ts` (`chapterQuestions.page1`–`page4`)
- **Matemática:** `src/data/mathQuestions.ts` (`mathChapterQuestions.page5`–`page8`)
- **Todas juntas:** `allBookQuestions` / `chapterQuestionsAll` em `questions.ts`

Tipos comuns: `multiple-choice`, `true-false`, `text-input`, `table-fill`, entre outros definidos em `src/types/questions.ts`.

Atividades especiais de matemática (ábaco clicável, tabela maia/romana, reta numérica) ficam em `MathWidgets.tsx`, com gabarito resumido em `mathQuestions.ts` para a visão do professor.

## Persistência

`useUserAnswers` grava respostas em `localStorage` (chave `book_answers_port_6ano_v1`).

## Visão do professor

- `TeacherButton` abre o painel por página.
- `TeacherAnswers` exibe o gabarito conforme o tipo da questão.

## Ábaco interativo

Nas questões **7b** e **7c** de Matemática:

- clique na haste/rótulo (Cm, Dm, Um, C, D, U) → adiciona 1 conta (máx. 9);
- botão direito → remove 1 conta;
- o campo numérico é preenchido automaticamente.

## Observações de manutenção

- Prefira alterar conteúdo por `id` da questão.
- Novo tipo de questão: tipar em `types/questions.ts` → componente → `QuestionRenderer` → gabarito em `TeacherAnswers`.
- Layout de página e textos estáticos: `Book.tsx` e/ou `MathWidgets.tsx`.

## Licença

Uso educacional interno ao projeto.
