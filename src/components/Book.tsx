import { ReactNode } from 'react';
import Header from './Header';
import MathHeader from './MathHeader';
import Footer from './Footer';
import Pagination from './Pagination';
import QuestionRenderer from './QuestionRenderer';
import DownloadQuestionsButton from './DownloadQuestionsButton';
import TeacherButton from './TeacherButton';
import TeacherAnswers from './TeacherAnswers';
import { allBookQuestions, chapterQuestionsAll } from '../data/questions';
import { useUserAnswers } from '../hooks/useUserAnswers';
import { usePagination } from '../hooks/usePagination';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { publicUrl } from '../lib/publicUrl';
import { MathPage1, MathPage2, MathPage3, MathPage4 } from './math/MathWidgets';

/** Controle global de exibição do botão "Para o professor" */
const SHOW_TEACHER_BUTTON = true;

/** Caixa de leitura para notícias / textos em prosa */
function TextoBox({
  children,
  source,
  title,
  subtitle,
}: {
  children: ReactNode;
  source?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="my-6 rounded-[16px] bg-[#cccde7] px-6 py-5 md:px-8 md:py-6">
      {title && (
        <h3
          className="mb-3 text-center text-[18px] font-bold leading-snug text-[#000000]"
          style={{ fontFamily: 'Ubuntu, sans-serif' }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p
          className="mb-3 text-[15px] font-semibold italic text-[#000000]"
          style={{ fontFamily: 'Ubuntu, sans-serif' }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="space-y-3 text-justify text-[15px] leading-relaxed text-[#2A2A2A]"
        style={{ fontFamily: 'Ubuntu, sans-serif' }}
      >
        {children}
      </div>
      {source && (
        <p className="mt-4 text-right text-[11px] tracking-wide text-[#000000]">{source}</p>
      )}
    </div>
  );
}

/** Cabeçalho numerado de uma questão (círculo roxo) */
function QNum({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="mb-3 mt-8 flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#80298F] text-sm font-bold text-white">
        {n}
      </span>
      <p className="pt-0.5 font-semibold text-black" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
        {children}
      </p>
    </div>
  );
}

function Book() {
  const { userAnswers, handleAnswerChange } = useUserAnswers();
  const { currentPage, scrollToTop } = usePagination(1);
  useScrollPosition();

  const q = (id: string) => allBookQuestions.find((question) => question.id === id);

  const render = (id: string) => (
    <QuestionRenderer
      question={q(id)}
      userAnswers={userAnswers}
      onAnswerChange={handleAnswerChange}
      showResults={false}
    />
  );

  const teacher = (
    pageKey: keyof typeof chapterQuestionsAll,
    codigos?: string,
    groupNumber?: number
  ) => (
    <div className="pt-8">
      <TeacherButton
        visible={SHOW_TEACHER_BUTTON}
        content={
          <>
            {codigos && (
              <p className="mb-3 text-xs font-semibold tracking-wide text-[#4AA0E0]">{codigos}</p>
            )}
            {groupNumber !== undefined && (
              <p className="mb-2 text-base font-bold text-[#80298F]">{groupNumber}.</p>
            )}
            <TeacherAnswers questions={chapterQuestionsAll[pageKey]} />
          </>
        }
      />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-200">
      <div
        className="mx-auto w-full overflow-visible bg-white shadow-2xl md:max-w-[63%]"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Header />
        <Pagination currentPage={currentPage} />

        <div className="chapter-content p-8 md:p-12">
          {/* ================= PORTUGUÊS PÁGINA 1 ================= */}
          <div data-book-page={1} />
          {teacher('page1', 'EF67LP01, EF67LP03, EF06LP01, EF69LP01')}

          <p
            className="mt-6 text-[15px] font-semibold text-black"
            style={{ fontFamily: 'Ubuntu, sans-serif' }}
          >
            Leia o trecho da notícia a seguir e resolva os itens.
          </p>

          <TextoBox title="Cientistas acham fóssil preservado de pliossauro">
            <p>
              Já imaginou se [existisse] um tiranossauro que vivesse no mar há milhões de anos atrás?
              Pois essa criatura existiu e tinha mais de 12 metros de comprimento! Agora, os cientistas vão
              conhecer mais ainda sobre o chamado pliossauro, depois de encontrarem um dos fósseis
              mais completos do animal no Reino Unido.
            </p>
            <p>
              <em>Quem era o pliossauro, o tiranossauro dos mares?</em>
            </p>
            <p>
              Apesar de não ser um dinossauro, o pliossauro é um predador que viveu há 150 milhões
              de anos e era tão grande que muitos paleontólogos fazem essa comparação. Paleontólogos
              são os cientistas que estudam os fósseis para descobrir como viviam os animais há milhares
              de anos atrás.
            </p>
            <p>
              Assim como o tiranossauro, o pliossauro estava no topo da cadeia alimentar e tinha a
              mordida mais poderosa do mundo.
            </p>
            <p>
              Agora, com a descoberta de um dos fósseis mais bem preservados, os cientistas vão
              poder estudar e descobrir ainda mais sobre o predador.
            </p>
            <p>
              O paleontólogo Steve Etches, em entrevista para o canal de notícias britânico BBC, disse
              que nenhum outro fóssil se compara com esse do pliossauro.
            </p>
            <p>
              “É um dos melhores fósseis com que já trabalhei. O que o torna único é que está
              completo”, diz o paleontólogo.
            </p>
            <p>
              Mas ainda tem muito trabalho pela frente antes! Isso porque só o crânio do esqueleto
              foi recuperado, e o resto precisa terminar de ser escavado em um lugar nada fácil de chegar:
              um penhasco!
            </p>
            <p>[...]</p>
            <p>
              Sem dúvida, uma dedicação e tanto para conhecer mais sobre a história desse animal
              tão raro!
            </p>
            <p>
              CIENTISTAS acham fóssil preservado de pliossauro. Disponível em:{' '}
              <a href="https://jornaldacrianca.com.br/cientistas-acham-fossil-preservado-pliossauro/">
                www.jornaldacrianca.com.br
              </a>
              . Acesso em: 16 jul. 2024.
            </p>
          </TextoBox>

          {render('p1_q1')}

          {/* ================= PORTUGUÊS PÁGINA 2 ================= */}
          <Pagination currentPage={2} expandToBookColumn />
          {teacher('page2', 'EF67LP01, EF67LP03, EF06LP01, EF69LP01, EF69LP03')}

          {render('p2_q2')}
          {render('p2_q3')}
          {render('p2_q4')}
          {render('p2_q5')}

          <QNum n={6}>(Prova Brasil) Leia o texto abaixo.</QNum>

          <TextoBox title="O aquecimento global">
            <p>
              O aquecimento global é outro elemento que está merecendo bastante atenção entre
              os ambientalistas da África. Para muitos cientistas, o continente africano será, nos próximos
              15 anos, um dos mais afetados com aumento da temperatura média da Terra. As monções
              procedentes do Oceano Atlântico e responsáveis pela chuva e pela umidade do ar não
              poderão ser apreciadas com tanta frequência nos próximos anos, em face dos desequilíbrios
              climáticos. O processo de evaporação da água será mais rápido, o que resultará na
              baixa umidade do solo que levará ao atrofiamento lento e gradual de toda vegetação da
              savana. Com esta possível alteração climática, inúmeras espécies de animais estarão na lista
              de extinção.
            </p>
            <span className="text-right text-[11px]">Mãe Terra. Ano I, n. 3, p. 29.</span>
          </TextoBox>

          {render('p2_q6')}

          {/* ================= PORTUGUÊS PÁGINA 3 ================= */}
          <Pagination currentPage={3} expandToBookColumn />
          {teacher('page3', 'EF67LP07, EF67LP08, EF06LP04, EF06LP05')}

          <p
            className="mt-6 text-[15px] font-semibold text-black"
            style={{ fontFamily: 'Ubuntu, sans-serif' }}
          >
            Leia com atenção o cartaz abaixo.
          </p>

          <figure className="mx-auto w-full max-w-[280px] shrink-0 lg:mx-0">
            <img
              src={publicUrl('images/pag3_img1.png')}
              alt="Cartaz da Campanha do Agasalho — Prefeitura de Vacaria"
              className="h-auto w-full rounded-md shadow-md"
            />
            <figcaption className="mt-2 text-center text-[10px] leading-snug text-gray-500">
              Prefeitura Municipal de Vacaria
            </figcaption>
            <figcaption className="mt-2 text-center text-[10px] leading-snug text-gray-500">
              Disponível em: https://vacaria.rs.gov.br/noticia/campanha-do-agasalho-2017. Acesso
              em: 18 jul. 2024.
            </figcaption>
          </figure>
          {render('p3_q1')}
          {render('p3_q2')}
          {render('p3_q3')}
          {render('p3_q4')}

          {/* ================= PORTUGUÊS PÁGINA 4 ================= */}
          <Pagination currentPage={4} expandToBookColumn />
          {teacher('page4', 'EF06LP04, EF06LP05, EF67LP08')}

          {render('p4_q5')}
          {render('p4_q6')}
          {render('p4_q7')}
          {render('p4_q8')}
          {render('p4_q9')}
          {render('p4_q10')}
          {render('p4_q11')}

          {/* ================= MATEMÁTICA ================= */}
          <div className="-mx-8 mt-16 md:-mx-12">
            <MathHeader />
          </div>

          <Pagination currentPage={5} expandToBookColumn />
          {teacher('page5', 'EF06MA01, EF06MA02')}
          <MathPage1 answers={userAnswers} onChange={handleAnswerChange} />

          <Pagination currentPage={6} expandToBookColumn />
          {teacher('page6', 'EF06MA01, EF06MA02')}
          <MathPage2
            answers={userAnswers}
            onChange={handleAnswerChange}
            renderTF={render('m2_q6')}
          />

          <Pagination currentPage={7} expandToBookColumn />
          {teacher('page7', 'EF06MA01, EF06MA02')}
          <MathPage3
            answers={userAnswers}
            onChange={handleAnswerChange}
            renderTF={render('m3_q3')}
          />

          <Pagination currentPage={8} expandToBookColumn />
          {teacher('page8', 'EF06MA01, EF06MA02')}
          <MathPage4
            answers={userAnswers}
            onChange={handleAnswerChange}
            renderPlanetTable={render('m4_q6')}
          />

          {/* ================= DOWNLOAD ================= */}
          <div className="mt-12 flex flex-col items-center gap-3 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-600">
              Terminou a ficha? Baixe suas respostas em PDF.
            </p>
            <DownloadQuestionsButton
              questions={allBookQuestions}
              userAnswers={userAnswers}
              title="Ficha de Atividades — Português e Matemática · 6º ano"
              fileName="ficha-6ano-port-mat.pdf"
            />
          </div>
        </div>

        <Footer />
      </div>

      {currentPage > 1 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 z-40 p-3 transition-all hover:scale-110"
          title="Voltar ao início"
        >
          <img src={publicUrl('images/setaTopo.svg')} alt="Voltar ao início" />
        </button>
      )}
    </div>
  );
}

export default Book;
