import { useEffect, useRef, useState } from 'react';
import { DrawingQuestion, UserAnswers } from '../types/questions';
import { QuestionNumber } from './shared/QuestionNumber';
import { publicUrl } from '../lib/publicUrl';

interface QuestionDrawingProps {
  question: DrawingQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

const PALETTE = ['#000000', '#BF3154', '#00776E', '#2563EB', '#F59E0B', '#80298F'];

function QuestionDrawing({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const height = question.height ?? 220;

  const savedDataUrl = (userAnswers[question.id] as string) || '';

  // Restaura o desenho salvo ao montar
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (savedDataUrl) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = savedDataUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (showResults) return;
    drawingRef.current = true;
    lastPoint.current = getPos(e);
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || showResults) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPoint.current!.x, lastPoint.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPoint.current = pos;
  };

  const endDraw = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPoint.current = null;
    const canvas = canvasRef.current;
    if (canvas) onAnswerChange(question.id, canvas.toDataURL('image/png'));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onAnswerChange(question.id, '');
  };

  return (
    <div className="mb-6">
      {!question.hidePrompt && (
        <p className="mb-3">
          <QuestionNumber number={question.number} />
          <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>
      )}

      <div className="mx-auto w-full max-w-[420px]">
      {!showResults && (
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs text-gray-600">Cor:</span>
          {PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className="h-6 w-6 rounded-full border-2 transition-transform hover:scale-110"
              style={{ backgroundColor: c, borderColor: color === c ? '#000' : 'transparent' }}
              aria-label={`Cor ${c}`}
            />
          ))}
          <button
            type="button"
            onClick={clear}
            className="ml-auto rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
          >
            Limpar
          </button>
        </div>
      )}

      <div
        className="relative w-full overflow-hidden rounded-[16px] border-2 border-[#2D401C] bg-white"
        style={{ height }}
      >
        {question.label && (
          <span className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-md bg-[#2D401C] px-4 py-1 text-sm font-bold uppercase text-white">
            {question.label}
          </span>
        )}
        {question.bgImage && (
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center pt-12">
            <img
              src={publicUrl(question.bgImage)}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={420}
          height={height}
          className="relative z-10 h-full w-full touch-none"
          style={{ cursor: showResults ? 'default' : 'crosshair' }}
          onPointerDown={startDraw}
          onPointerMove={draw}
          onPointerUp={endDraw}
          onPointerLeave={endDraw}
        />
      </div>
      </div>
    </div>
  );
}

export default QuestionDrawing;
