import { Question } from '../types/questions';
import { mathChapterQuestions, allMathQuestions } from './mathQuestions';

export { mathChapterQuestions, allMathQuestions } from './mathQuestions';

export const chapterQuestions: Record<string, Question[]> = {
  page1: [
    {
      id: 'p1_q1',
      type: 'multiple-choice',
      number: 1,
      question: 'O principal objetivo desse texto é',
      options: {
        a: 'descrever como era a vida marinha na época dos dinossauros.',
        b: 'informar sobre a descoberta de um fóssil de pliossauro.',
        c: 'discutir as diferentes teorias sobre a extinção dos pliossauros.',
        d: 'anunciar uma expedição em busca de fósseis de pliossauros.',
      },
      correctAnswer: 'b',
    },
  ],
  page2: [
    {
      id: 'p2_q2',
      type: 'text-input',
      number: 2,
      question:
        'De acordo com o texto, por que a descoberta do fóssil do pliossauro é significativa para os cientistas?',
      placeholder: 'Escreva sua resposta...',
      correctAnswer:
        'Porque se trata de um dos fósseis mais completos já encontrados, o que permite estudar melhor o animal e como ele vivia.',
    },
    {
      id: 'p2_q3',
      type: 'text-input',
      number: 3,
      question:
        'No texto, o pliossauro é comparado ao tiranossauro, apesar de não ser um dinossauro. Oque há em comum entre esses animais, de acordo com a notícia, que permite que essa comparação seja feita?',
      placeholder: 'Escreva sua resposta...',
      correctAnswer:
        'Ambos eram grandes predadores, com mordida poderosa, e estavam no topo da cadeia alimentar de seus ambientes.',
    },
    {
      id: 'p2_q4',
      type: 'text-input',
      number: 4,
      question: 'O que os cientistas esperam descobrir a partir do fóssil do pliossauro?',
      placeholder: 'Escreva sua resposta...',
      correctAnswer:
        'Esperam descobrir mais sobre como esses animais viviam há milhares/milhões de anos, a partir do estudo do fóssil completo.',
    },
    {
      id: 'p2_q5',
      type: 'text-input',
      number: 5,
      question:
        'Cite duas características de notícias de divulgação científica presentes no texto que você leu.',
      placeholder: 'Escreva sua resposta...',
      correctAnswer:
        'Exemplos: título chamativo; linguagem acessível com explicação de termos (como paleontólogos); citações de especialistas; informações factuais sobre a descoberta; indicação de fonte.',
    },
    {
      id: 'p2_q6',
      type: 'multiple-choice',
      question:
        'Em relação ao aquecimento global, a principal informação desse texto diz respeito',
      options: {
        a: 'à África, que será o continente mais afetado.',
        b: 'à evaporação da água, que será muito rápida.',
        c: 'à vegetação da savana, que sofrerá atrofia.',
        d: 'aos animais de várias espécies, que serão extintos.',
      },
      correctAnswer: 'a',
    },
  ],
  page3: [
    {
      id: 'p3_q1',
      type: 'multiple-choice',
      number: 1,
      question:
        'Qual dos seguintes elementos não verbais reforça a ideia de solidariedade presente no cartaz?',
      options: {
        a: 'A cor laranja de fundo.',
        b: 'O laço vermelho envolvendo as roupas.',
        c: 'O texto informativo sobre a campanha.',
        d: 'O número de telefone para contato.',
      },
      correctAnswer: 'b',
    },
    {
      id: 'p3_q2',
      type: 'text-input',
      number: 2,
      question:
        'Explique como a combinação entre texto e imagem reforça a mensagem principal da campanha.',
      placeholder: 'Escreva sua resposta...',
      correctAnswer:
        'O texto afirma que “o maior presente é a solidariedade” e a imagem mostra as roupas amarradas como um presente com laço vermelho, reforçando a ideia de que doar é um gesto de solidariedade que aquece famílias.',
    },
    {
      id: 'p3_q3',
      type: 'multiple-choice',
      number: 3,
      question:
        'Assinale a alternativa que apresenta apenas substantivos comuns encontrados no cartaz:',
      options: {
        a: 'campanha, solidariedade, vacaria',
        b: 'agasalho, roupas, solidariedade',
        c: 'roupas, campanha, doação',
        d: 'secretaria, prefeitura, vacaria',
      },
      correctAnswer: 'c',
    },
    {
      id: 'p3_q4',
      type: 'multiple-choice',
      number: 4,
      question: 'A palavra <b>solidariedade</b> é classificada como:',
      options: {
        a: 'substantivo concreto, pois representa um sentimento visível.',
        b: 'substantivo abstrato, pois depende de uma atitude ou ação para se manifestar.',
        c: 'substantivo composto, pois é formada por duas palavras.',
        d: 'substantivo coletivo, pois indica um grupo de pessoas solidárias.',
      },
      correctAnswer: 'b',
    },
  ],
  page4: [
    {
      id: 'p4_q5',
      type: 'multiple-choice',
      number: 5,
      question:
        'Assinale a alternativa que apresenta um substantivo próprio em destaque.',
      options: {
        a: 'Meu <b>cachorro</b> adora comer petiscos.',
        b: 'As montanhas no horizonte são cobertas de neve no <b>inverno</b>.',
        c: 'A <b>Argentina</b> é um país vizinho ao Brasil.',
        d: 'O <b>amor</b> entre eles era evidente em cada gesto.',
      },
      correctAnswer: 'c',
    },
    {
      id: 'p4_q6',
      type: 'multiple-choice',
      number: 6,
      question:
        'Assinale a alternativa que apresenta um substantivo comum em destaque.',
      options: {
        a: 'O <b>rio</b> próximo à minha casa é tranquilo e cheio de peixes.',
        b: 'O <b>Brasil</b> é conhecido por sua diversidade cultural e geográfica.',
        c: 'O Sol brilha <b>intensamente</b> no céu durante o dia.',
        d: '<b>Maria</b> é uma estudante dedicada e curiosa.',
      },
      correctAnswer: 'a',
    },
    {
      id: 'p4_q7',
      type: 'multiple-choice',
      number: 7,
      question:
        'Assinale a alternativa que apresenta um substantivo concreto em destaque.',
      options: {
        a: 'A coragem dele o impulsionou a enfrentar seus <b>medos</b>.',
        b: 'O <b>pensamento</b> sobre o futuro o deixou esperançoso.',
        c: 'Adoro tomar <b>sorvete</b> na sobremesa.',
        d: 'A <b>amizade</b> entre eles cresceu ao longo dos anos.',
      },
      correctAnswer: 'c',
    },
    {
      id: 'p4_q8',
      type: 'multiple-choice',
      number: 8,
      question: 'Assinale a alternativa que apresenta um substantivo abstrato.',
      options: {
        a: 'Coloque a <b>jarra</b> de suco sobre a mesa da sala.',
        b: 'A busca pela <b>felicidade</b> é importante para muitos.',
        c: 'O computador na mesa facilita o trabalho no <b>escritório</b>.',
        d: 'O <b>livro</b> que ela lia era emocionante e envolvente.',
      },
      correctAnswer: 'b',
    },
    {
      id: 'p4_q9',
      type: 'multiple-choice',
      number: 9,
      question: 'Assinale a alternativa que apresenta um substantivo primitivo.',
      options: {
        a: 'A <b>colmeia</b> estava cheia de abelhas trabalhadoras.',
        b: 'A <b>jardinagem</b> é uma ótima atividade para distração.',
        c: 'A <b>folha</b> caiu lentamente da árvore.',
        d: 'O <b>padeiro</b> assou pães deliciosos para o café da manhã.',
      },
      correctAnswer: 'c',
    },
    {
      id: 'p4_q10',
      type: 'multiple-choice',
      number: 10,
      question: 'Assinale a alternativa que apresenta um substantivo derivado.',
      options: {
        a: 'A <b>chuvarada</b> alagou várias ruas da cidade.',
        b: 'A <b>lua</b> iluminava a noite escura.',
        c: 'A <b>flor</b> desabrochou no jardim.',
        d: 'Os <b>alunos</b> participaram de um passeio educativo.',
      },
      correctAnswer: 'a',
    },
    {
      id: 'p4_q11',
      type: 'multiple-choice',
      number: 11,
      question: 'Assinale a alternativa que apresenta um substantivo coletivo.',
      options: {
        a: 'O professor chegou cedo à <b>sala</b> de aula.',
        b: 'A <b>chave</b> estava em cima da geladeira.',
        c: 'O computador da <b>loja</b> está disponível para uso.',
        d: 'A <b>plateia</b> aplaudiu de pé ao final do espetáculo.',
      },
      correctAnswer: 'd',
    },
  ],
};

export const allQuestions: Question[] = [
  ...chapterQuestions.page1,
  ...chapterQuestions.page2,
  ...chapterQuestions.page3,
  ...chapterQuestions.page4,
];

export const chapterQuestionsAll = {
  ...chapterQuestions,
  ...mathChapterQuestions,
};

export const allBookQuestions: Question[] = [...allQuestions, ...allMathQuestions];
