# Livro Digital - LD_BETT

Aplicação web interativa em React + TypeScript para conteúdos didáticos com leitura guiada, atividades e visão do professor.

## Visão Geral

O projeto renderiza um livro digital com:

- conteúdo textual e visual por páginas;
- questões interativas com persistência local;
- botão de apoio pedagógico para professor;
- componentes de avaliação formativa.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- localStorage (persistência de respostas e estado de leitura)

## Execução Local

```bash
npm install
npm run dev
```

Aplicação em modo desenvolvimento via Vite.

## Scripts

```bash
npm run dev        # desenvolvimento
npm run build      # build de produção
npm run preview    # pré-visualização do build
npm run lint       # lint
npm run typecheck  # checagem de tipos TypeScript
npm run deploy     # deploy do dist para gh-pages
```

## Estrutura Principal

```text
src/
  components/
    Book.tsx
    QuestionRenderer.tsx
    QuestionTextInput.tsx
    QuestionTextInputWithEmbedded.tsx
    QuestionTableFill.tsx
    QuestionFillBlanks.tsx
    QuestionOrdering.tsx
    CriteriosAvaliacao.tsx
    TeacherButton.tsx
    TeacherAnswers.tsx
  data/
    questions.ts
  hooks/
    useUserAnswers.ts
    usePagination.ts
    useScrollPosition.ts
  types/
    questions.ts
  utils/
    questionHelpers.tsx
```

## Modelo de Questões

As questões ficam em `src/data/questions.ts` e seguem os tipos definidos em `src/types/questions.ts`.

Tipos atualmente suportados:

- `multiple-choice`
- `true-false`
- `alternative`
- `text-input`
- `table-fill`
- `fill-blanks`
- `ordering`

### Exemplo base

```ts
{
  id: 'ch1_q1',
  type: 'text-input',
  question: '...',
  placeholder: 'Digite aqui...',
}
```

## Renderização de Questões

O `QuestionRenderer` seleciona o componente certo por `question.type`.

Fluxo simplificado:

1. `Book.tsx` obtém questão por `id`.
2. Passa para `QuestionRenderer`.
3. `QuestionRenderer` renderiza o componente específico.
4. Mudanças de resposta são propagadas via `onAnswerChange`.

## Persistência de Respostas

`useUserAnswers` centraliza o estado de respostas e mantém os dados entre recarregamentos usando armazenamento local.

## Visão do Professor

- `TeacherButton` abre o conteúdo pedagógico.
- `TeacherAnswers` usa `renderQuestionAnswer` (`src/utils/questionHelpers.tsx`) para montar gabaritos por tipo de questão.

## Estilo e Tema

- Estilos globais em `src/index.css`.
- Fontes e famílias tipográficas configuradas entre CSS global e classes utilitárias.
- Componentes de questão usam classes padronizadas para campos de entrada (placeholder, borda, altura e tipografia).

## Observações de Manutenção

- Prefira adicionar/alterar questões por `id`, evitando dependência de índice.
- Ao criar novos tipos de questão:
  1. definir tipo em `src/types/questions.ts`;
  2. criar componente em `src/components`;
  3. integrar no `QuestionRenderer`;
  4. ajustar `renderQuestionAnswer` para visão do professor.

## Licença

Uso educacional interno ao projeto.
