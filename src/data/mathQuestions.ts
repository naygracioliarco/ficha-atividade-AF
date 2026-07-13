import { Question } from '../types/questions';

/** Páginas 5–8 = Matemática (após Português 1–4) */
export const mathChapterQuestions: Record<string, Question[]> = {
  page5: [
    {
      id: 'm1_q1',
      type: 'text-input',
      number: 1,
      question:
        'O sistema de numeração egípcio utiliza sete símbolos para representar os números. Escreva nesse sistema de numeração os números a seguir.',
      subQuestions: [
        {
          letter: 'a',
          question: '3 174',
          correctAnswer:
            'Três flores de lótus (3 000), uma corda enrolada (100), sete grilhões (70) e quatro bastões (4).',
        },
        {
          letter: 'b',
          question: '45 242',
          correctAnswer:
            'Quatro girinos (40 000), cinco flores de lótus (5 000), duas cordas (200), quatro grilhões (40) e dois bastões (2).',
        },
        {
          letter: 'c',
          question:
            'Qual o maior número que pode ser representado no sistema de numeração egípcio utilizando dois símbolos diferentes? Explique sua resposta.',
          correctAnswer:
            '1 100 000 — usando o símbolo de 1 000 000 (homem) e o de 100 000 (girino), um de cada.',
        },
      ],
    },
    {
      id: 'm1_q2',
      type: 'text-input',
      number: 2,
      question:
        'O sistema de numeração maia utiliza apenas três símbolos para escrever os números. Complete a tabela a seguir com as informações que estão faltando.',
      correctAnswer:
        'Decimais: 7, 12 e 19. Símbolos: duas barras (10); três barras (15); um ponto sobre a concha (20).',
    },
    {
      id: 'm1_q3',
      type: 'text-input',
      number: 3,
      question:
        'Compare os números a seguir, escritos no sistema de numeração maia, e circule de vermelho o maior número e de verde o menor.',
      correctAnswer:
        'Maior (vermelho): 160 (3 pontos + barra sobre a concha). Menor (verde): 3 (três pontos).',
    },
  ],
  page6: [
    {
      id: 'm2_q4',
      type: 'text-input',
      number: 4,
      question:
        'O sistema de numeração romano utiliza sete letras do alfabeto para escrever os números. Complete a tabela a seguir com as informações que estão faltando.',
      correctAnswer:
        'LXVI=66; CIX=109; CDIV=404; DX=510; DCVIII=608; DCCC=800; MV=1005; LI̅=51 000.',
    },
    {
      id: 'm2_q5',
      type: 'text-input',
      number: 5,
      question:
        'Escreva com algarismos indo-arábicos cada um dos números escritos a seguir no sistema de numeração romano.',
      subQuestions: [
        { letter: 'a', question: 'LXXVII', correctAnswer: '77' },
        { letter: 'b', question: 'CDXV', correctAnswer: '415' },
        { letter: 'c', question: 'CCCXIX', correctAnswer: '319' },
        { letter: 'd', question: 'MMCCXX', correctAnswer: '2 220' },
        { letter: 'e', question: 'CMIX', correctAnswer: '909' },
        { letter: 'f', question: 'DLXX', correctAnswer: '570' },
        { letter: 'g', question: 'DVI', correctAnswer: '506' },
        { letter: 'h', question: 'VIII̅ (com traço)', correctAnswer: '8 000' },
      ],
    },
    {
      id: 'm2_q6',
      type: 'true-false',
      number: 6,
      question:
        'Sobre o sistema de numeração decimal, assinale <b>V</b>, se for verdadeira, ou <b>F</b>, se for falsa, para cada uma das afirmações a seguir.',
      statements: [
        {
          letter: 'a',
          statement: 'No número 2 545, o maior valor posicional do algarismo 5 é 500.',
          correctAnswer: true,
        },
        {
          letter: 'b',
          statement: 'Podemos escrever o número 45 000 000 como 45 milhões.',
          correctAnswer: true,
        },
        {
          letter: 'c',
          statement: 'Juntando-se 100 unidades, são obtidas 10 dezenas.',
          correctAnswer: true,
        },
        {
          letter: 'd',
          statement:
            'A quantia de 56 bilhões de reais pode ser escrita como 56 000 000 reais.',
          correctAnswer: false,
        },
        {
          letter: 'e',
          statement:
            'A leitura do número 50 672 é quinhentos e seis mil e setenta e dois.',
          correctAnswer: false,
        },
        {
          letter: 'f',
          statement:
            'Em um sistema posicional, a posição em que os símbolos são escritos deve ser considerada.',
          correctAnswer: true,
        },
      ],
    },
    {
      id: 'm2_q7',
      type: 'text-input',
      number: 7,
      question:
        'Alguns meios de comunicação anunciaram que o próximo prêmio da loteria será de quarenta e três milhões, quatrocentos e vinte e sete mil reais. Escreva essa quantia com algarismos no quadro de ordens abaixo.',
      correctAnswer: '43 427 000 (ordens: 0 4 3 | 4 2 7 | 0 0 0)',
      subQuestions: [
        {
          letter: 'a',
          question: 'Quais os valores posicionais dos algarismos 4 na escrita do número acima?',
          correctAnswer: '4 000 000 (4 milhões) e 400 000 (4 centenas de milhar).',
        },
      ],
    },
  ],
  page7: [
    {
      id: 'm3_q1',
      type: 'text-input',
      number: 1,
      question:
        'Considere os algarismos 2, 3, 4, 5 e 6 e, utilizando apenas eles, escreva',
      subQuestions: [
        {
          letter: 'a',
          question: 'o maior número possível de três ordens:',
          correctAnswer: '654',
        },
        {
          letter: 'b',
          question: 'o menor número possível de quatro ordens:',
          correctAnswer: '2 345',
        },
        {
          letter: 'c',
          question: 'um número de três ordens que seja par:',
          correctAnswer: 'Ex.: 246, 352, 654… (terminado em 2, 4 ou 6)',
        },
        {
          letter: 'd',
          question: 'um número de quatro ordens que seja ímpar:',
          correctAnswer: 'Ex.: 2 345, 2 463… (terminado em 3 ou 5)',
        },
      ],
    },
    {
      id: 'm3_q2',
      type: 'text-input',
      number: 2,
      question:
        'Utilizando os algarismos 0, 2, 3, 4, 5, 6 e 9, Luiz escreveu um número de sete ordens.',
      subQuestions: [
        {
          letter: 'a',
          question: 'Marque com um X os números que Luiz pode ter escrito.',
          correctAnswer: '2 304 965 e 4 325 690',
        },
        {
          letter: 'b',
          question:
            'Sabendo que Luiz escreveu o maior número possível sem repetir os algarismos, escreva como se lê esse número.',
          correctAnswer:
            '9 654 320 — nove milhões, seiscentos e cinquenta e quatro mil, trezentos e vinte.',
        },
        {
          letter: 'c',
          question:
            'Qual o menor número que podemos escrever utilizando todos esses algarismos sem repeti-los? Escreva como se lê esse número.',
          correctAnswer:
            '2 034 569 — dois milhões, trinta e quatro mil, quinhentos e sessenta e nove.',
        },
      ],
    },
    {
      id: 'm3_q3',
      type: 'true-false',
      number: 3,
      question:
        'Sobre os números naturais, assinale <b>V</b>, se for verdadeira, ou <b>F</b>, se for falsa, para cada uma das afirmações a seguir.',
      statements: [
        {
          letter: 'a',
          statement:
            'De 1 a 100 existem 50 números naturais pares e 50 números naturais ímpares.',
          correctAnswer: true,
        },
        {
          letter: 'b',
          statement:
            'O maior número natural par formado por exatamente 3 algarismos é 900.',
          correctAnswer: false,
        },
        {
          letter: 'c',
          statement:
            'O menor número natural par formado por exatamente 3 algarismos é 100.',
          correctAnswer: true,
        },
      ],
    },
    {
      id: 'm3_q4',
      type: 'text-input',
      number: 4,
      question:
        'Na reta numérica abaixo, estão faltando alguns números. Escreva-os e responda ao que se pede.',
      subQuestions: [
        {
          letter: 'a',
          question: 'Qual é o maior número representado na reta?',
          correctAnswer: '299',
        },
        {
          letter: 'b',
          question: 'Qual o menor número representado na reta?',
          correctAnswer: '287',
        },
        {
          letter: 'c',
          question: 'Quais números representados na reta são maiores do que 292?',
          correctAnswer: '293, 294, 295, 296, 297, 298 e 299',
        },
        {
          letter: 'd',
          question: 'Quais números representados na reta são menores do que 290?',
          correctAnswer: '287, 288 e 289',
        },
      ],
    },
  ],
  page8: [
    {
      id: 'm4_q5',
      type: 'text-input',
      number: 5,
      question:
        'Compare os números em cada item e complete as sentenças utilizando os símbolos = (igual a), &gt; (maior do que) ou &lt; (menor do que).',
      subQuestions: [
        { letter: 'a', question: '574 ___ 547', correctAnswer: '>' },
        { letter: 'b', question: '92 474 ___ 92 744', correctAnswer: '<' },
        { letter: 'c', question: '8 623 ___ 8 000 + 600 + 30 + 2', correctAnswer: '<' },
        { letter: 'd', question: '4 000 + 200 + 80 ___ 4 000 + 20 + 8', correctAnswer: '>' },
        { letter: 'e', question: '2 000 000 ___ 2 milhões', correctAnswer: '=' },
        { letter: 'f', question: '130 milhões ___ 130 000 020', correctAnswer: '<' },
      ],
    },
    {
      id: 'm4_q6',
      type: 'table-fill',
      number: 6,
      question:
        'Ao estudar as distâncias de alguns planetas até o Sol, o professor de Geografia utilizou arredondamentos e escrita simplificada para escrever os números correspondentes. Complete a tabela com os arredondamentos e a escrita simplificada para alguns planetas.',
      columns: [
        'Planeta',
        'Distância',
        'Arredondamento para unidade de milhão',
        'Escrita simplificada',
      ],
      rows: [
        {
          id: 'merc',
          paragraph: 'Mercúrio',
          text1: '57 910 000',
          text2: '58 000 000',
          text3: '58 milhões',
        },
        { id: 'venus', paragraph: 'Vênus', text1: '108 200 000', text2: '', text3: '' },
        { id: 'terra', paragraph: 'Terra', text1: '149 600 000', text2: '', text3: '' },
        { id: 'marte', paragraph: 'Marte', text1: '227 940 000', text2: '', text3: '' },
        { id: 'jup', paragraph: 'Júpiter', text1: '778 330 000', text2: '', text3: '' },
      ],
      correctAnswer: {
        m4_q6_venus_col2: '108 000 000',
        m4_q6_venus_col3: '108 milhões',
        m4_q6_terra_col2: '150 000 000',
        m4_q6_terra_col3: '150 milhões',
        m4_q6_marte_col2: '228 000 000',
        m4_q6_marte_col3: '228 milhões',
        m4_q6_jup_col2: '778 000 000',
        m4_q6_jup_col3: '778 milhões',
      },
    },
    {
      id: 'm4_q7',
      type: 'text-input',
      number: 7,
      question: 'Observe o ábaco a seguir e faça o que se pede.',
      subQuestions: [
        {
          letter: 'a',
          question: 'Qual número está representado no ábaco?',
          correctAnswer: '74 602',
        },
        {
          letter: 'b',
          question:
            'Ao adicionar 297 unidades ao número representado no ábaco, qual é o resultado obtido?',
          correctAnswer: '74 899',
        },
        {
          letter: 'c',
          question:
            'Ao adicionar 20 300 unidades ao número representado no ábaco, qual é o resultado obtido?',
          correctAnswer: '94 902',
        },
      ],
    },
  ],
};

export const allMathQuestions: Question[] = [
  ...mathChapterQuestions.page5,
  ...mathChapterQuestions.page6,
  ...mathChapterQuestions.page7,
  ...mathChapterQuestions.page8,
];
