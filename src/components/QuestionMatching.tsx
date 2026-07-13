import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MatchingQuestion, UserAnswers } from '../types/questions';
import { publicUrl } from '../lib/publicUrl';
import { QuestionNumber } from './shared/QuestionNumber';

interface QuestionMatchingProps {
  question: MatchingQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

type Segment = { x1: number; y1: number; x2: number; y2: number };

function clientToContainer(clientX: number, clientY: number, container: HTMLElement) {
  const cr = container.getBoundingClientRect();
  return { x: clientX - cr.left, y: clientY - cr.top };
}

function anchorOnContainer(
  itemEl: HTMLElement,
  container: HTMLElement,
  edge: 'left-mid' | 'right-mid'
) {
  const cr = container.getBoundingClientRect();
  const er = itemEl.getBoundingClientRect();
  const y = er.top - cr.top + er.height / 2;
  if (edge === 'right-mid') {
    return { x: er.right - cr.left, y };
  }
  return { x: er.left - cr.left, y };
}

function ItemContent({
  icon,
  label,
  imageSrc,
}: {
  icon?: string;
  label?: string;
  imageSrc?: string;
}) {
  if (imageSrc) {
    return (
      <img
        src={publicUrl(imageSrc)}
        alt={label || ''}
        className="h-14 w-14 object-contain md:h-16 md:w-16"
      />
    );
  }
  if (label) {
    return (
      <span className="px-2 text-center text-sm font-bold uppercase leading-snug text-[#80298F] md:text-base">
        {label}
      </span>
    );
  }
  if (icon) {
    return <span className="text-4xl">{icon}</span>;
  }
  return null;
}

function QuestionMatching({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionMatchingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const rightRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const [box, setBox] = useState({ w: 0, h: 0 });
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
  const [draftEnd, setDraftEnd] = useState<{ x: number; y: number } | null>(null);
  const [staticSegments, setStaticSegments] = useState<Segment[]>([]);

  // Ligações atuais: na visão do professor mostra o gabarito; senão, o que o aluno ligou.
  const connections =
    showResults && question.correct
      ? Object.entries(question.correct).map(([leftId, rightId]) => ({ leftId, rightId }))
      : question.left
          .map((l) => ({
            leftId: l.id,
            rightId: (userAnswers[`${question.id}_${l.id}`] as string) || '',
          }))
          .filter((c) => c.rightId);

  const connKey = connections.map((c) => `${c.leftId}:${c.rightId}`).join(',');

  const setLeftRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) leftRefs.current.set(id, el);
    else leftRefs.current.delete(id);
  }, []);

  const setRightRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) rightRefs.current.set(id, el);
    else rightRefs.current.delete(id);
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBox({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || box.w === 0) return;
    const measureSegments = () => {
      const segs: Segment[] = [];
      for (const { leftId, rightId } of connections) {
        const le = leftRefs.current.get(leftId);
        const re = rightRefs.current.get(rightId);
        if (!le || !re) continue;
        const p1 = anchorOnContainer(le, container, 'right-mid');
        const p2 = anchorOnContainer(re, container, 'left-mid');
        segs.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
      }
      setStaticSegments(segs);
    };
    measureSegments();
    requestAnimationFrame(measureSegments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connKey, box.w, box.h]);

  useEffect(() => {
    if (!activeLeftId) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX == null || clientY == null) return;
      setDraftEnd(clientToContainer(clientX, clientY, container));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, [activeLeftId]);

  const connect = (leftId: string, rightId: string) => {
    // Garante que um item da direita não fique ligado a dois da esquerda
    question.left.forEach((l) => {
      if (l.id !== leftId && (userAnswers[`${question.id}_${l.id}`] as string) === rightId) {
        onAnswerChange(`${question.id}_${l.id}`, '');
      }
    });
    onAnswerChange(`${question.id}_${leftId}`, rightId);
  };

  const handleLeftClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (showResults) return;
    const container = containerRef.current;
    if (!container) return;
    if (activeLeftId === id) {
      setActiveLeftId(null);
      setDraftEnd(null);
      return;
    }
    setActiveLeftId(id);
    setDraftEnd(clientToContainer(e.clientX, e.clientY, container));
  };

  const handleRightClick = (rightId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (showResults || !activeLeftId) return;
    connect(activeLeftId, rightId);
    setActiveLeftId(null);
    setDraftEnd(null);
  };

  const clearAll = () => {
    question.left.forEach((l) => onAnswerChange(`${question.id}_${l.id}`, ''));
    setActiveLeftId(null);
    setDraftEnd(null);
  };

  let draftSegment: Segment | null = null;
  if (activeLeftId && draftEnd && containerRef.current) {
    const le = leftRefs.current.get(activeLeftId);
    if (le) {
      const p1 = anchorOnContainer(le, containerRef.current, 'right-mid');
      draftSegment = { x1: p1.x, y1: p1.y, x2: draftEnd.x, y2: draftEnd.y };
    }
  }

  return (
    <div className="mb-6">
      <p className="mb-4">
        <QuestionNumber number={question.number} />
        <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
      </p>

      <div className={`relative w-full ${activeLeftId ? 'touch-none' : ''}`}>
        <div
          ref={containerRef}
          className="relative flex min-h-[200px] w-full flex-row items-stretch justify-between gap-8 md:gap-16"
        >
          {box.w > 0 && box.h > 0 && (
            <svg
              className="pointer-events-none absolute left-0 top-0 z-10 overflow-visible text-[#80298F]"
              width={box.w}
              height={box.h}
              aria-hidden
            >
              {staticSegments.map((seg, i) => (
                <line
                  key={`c-${i}-${seg.x1}-${seg.y1}`}
                  x1={seg.x1}
                  y1={seg.y1}
                  x2={seg.x2}
                  y2={seg.y2}
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              ))}
              {draftSegment && (
                <line
                  x1={draftSegment.x1}
                  y1={draftSegment.y1}
                  x2={draftSegment.x2}
                  y2={draftSegment.y2}
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  opacity={0.9}
                />
              )}
            </svg>
          )}

          <div className="relative z-20 flex flex-1 flex-col gap-3 md:gap-4">
            {question.left.map((item) => (
              <button
                key={item.id}
                type="button"
                ref={(el) => setLeftRef(item.id, el)}
                onClick={(e) => handleLeftClick(item.id, e)}
                disabled={showResults}
                className={`flex min-h-[4.5rem] flex-1 items-center justify-center rounded-xl border-2 bg-white p-2 shadow-sm transition md:p-3 ${
                  activeLeftId === item.id
                    ? 'border-[#80298F] ring-2 ring-[#80298F]/30'
                    : 'border-gray-200 hover:border-[#80298F]/50'
                }`}
              >
                <ItemContent icon={item.icon} label={item.label} imageSrc={item.imageSrc} />
              </button>
            ))}
          </div>

          <div className="relative z-20 flex flex-1 flex-col gap-3 md:gap-4">
            {question.right.map((item) => (
              <button
                key={item.id}
                type="button"
                ref={(el) => setRightRef(item.id, el)}
                onClick={(e) => handleRightClick(item.id, e)}
                disabled={showResults}
                className="flex min-h-[4.5rem] flex-1 items-center justify-center rounded-xl border-2 border-gray-200 bg-transparent p-2 transition hover:border-[#80298F]/50 md:p-3"
              >
                <ItemContent label={item.label} imageSrc={item.imageSrc} />
              </button>
            ))}
          </div>
        </div>

        {!showResults && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-gray-600">
              {activeLeftId
                ? 'Agora clique em um item da direita para completar a ligação.'
                : 'Clique em um símbolo à esquerda e depois no significado à direita para ligar.'}
            </p>
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              onClick={clearAll}
            >
              Limpar ligações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionMatching;
