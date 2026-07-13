import type { ReactNode } from 'react';
import { UserAnswers } from '../../types/questions';

const MATH_PINK = '#E85A7A';
const MATH_PINK_DARK = '#C94A66';

/** Símbolo maia (pontos, barras e concha) */
export function MayanGlyph({
  dots = 0,
  bars = 0,
  shell = false,
  upper,
  size = 56,
}: {
  dots?: number;
  bars?: number;
  shell?: boolean;
  /** Nível superior (valor × 20), se houver */
  upper?: { dots?: number; bars?: number };
  size?: number;
}) {
  const row = (nDots: number, nBars: number, y0: number) => {
    const els: ReactNode[] = [];
    let y = y0;
    if (nDots > 0) {
      const startX = 28 - ((nDots - 1) * 10) / 2;
      for (let i = 0; i < nDots; i++) {
        els.push(<circle key={`d${y0}-${i}`} cx={startX + i * 10} cy={y} r={3.5} fill="#222" />);
      }
      y += 10;
    }
    for (let i = 0; i < nBars; i++) {
      els.push(
        <rect key={`b${y0}-${i}`} x={12} y={y} width={32} height={5} rx={1} fill="#222" />
      );
      y += 9;
    }
    return { els, y };
  };

  const parts: ReactNode[] = [];
  let y = 8;
  if (upper) {
    const u = row(upper.dots ?? 0, upper.bars ?? 0, y);
    parts.push(...u.els);
    y = u.y + 6;
  }
  if (shell) {
    parts.push(
      <ellipse key="shell" cx={28} cy={y + 8} rx={12} ry={8} fill="none" stroke="#222" strokeWidth={2} />
    );
    parts.push(<circle key="shellDot" cx={28} cy={y + 8} r={2} fill="#222" />);
  } else {
    const r = row(dots, bars, y);
    parts.push(...r.els);
  }

  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 56 76" aria-hidden>
      {parts}
    </svg>
  );
}

const ABACUS_LABELS = ['Cm', 'Dm', 'Um', 'C', 'D', 'U'] as const;
const ABACUS_COLORS = ['#8B5A2B', '#8B5A2B', '#7CB342', '#26A69A', '#EF5350', '#EF5350'];
const ABACUS_MAX = 9;

export function parseAbacusBeads(value: string | number | boolean | undefined): number[] {
  if (typeof value !== 'string' || !value.includes(',')) return [0, 0, 0, 0, 0, 0];
  const parts = value.split(',').map((n) => Math.min(ABACUS_MAX, Math.max(0, Number(n) || 0)));
  while (parts.length < 6) parts.push(0);
  return parts.slice(0, 6);
}

export function abacusBeadsToNumber(beads: number[]): number {
  const weights = [100_000, 10_000, 1_000, 100, 10, 1];
  return beads.reduce((sum, n, i) => sum + n * weights[i], 0);
}

export function formatAbacusNumber(n: number): string {
  return n.toLocaleString('pt-BR').replace(/\./g, ' ');
}

/** Ábaco com contas coloridas (opcionalmente interativo) */
export function AbacusVisual({
  beads,
  empty = false,
  interactive = false,
  className = '',
  onBeadsChange,
}: {
  beads?: number[];
  empty?: boolean;
  /** Clique na haste/rótulo: adiciona 1 conta (máx. 9). Clique com botão direito: remove 1. */
  interactive?: boolean;
  className?: string;
  onBeadsChange?: (beads: number[]) => void;
}) {
  const counts = empty && !beads ? [0, 0, 0, 0, 0, 0] : beads ?? [0, 7, 4, 6, 0, 2];

  const bump = (index: number, delta: number) => {
    if (!interactive || !onBeadsChange) return;
    const next = [...counts];
    next[index] = Math.min(ABACUS_MAX, Math.max(0, next[index] + delta));
    onBeadsChange(next);
  };

  return (
    <div className={`inline-block ${className}`}>
      <svg viewBox="0 0 280 200" className="h-auto w-full max-w-[280px] select-none">
        <rect x="20" y="160" width="240" height="28" rx="4" fill="#D7B899" stroke="#A07850" />
        {ABACUS_LABELS.map((label, i) => {
          const x = 40 + i * 38;
          const n = counts[i];
          return (
            <g
              key={label}
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              style={{ cursor: interactive ? 'pointer' : undefined }}
              onClick={() => bump(i, 1)}
              onContextMenu={(e) => {
                if (!interactive) return;
                e.preventDefault();
                bump(i, -1);
              }}
              onKeyDown={(e) => {
                if (!interactive) return;
                if (e.key === 'Enter' || e.key === '+') bump(i, 1);
                if (e.key === 'Backspace' || e.key === '-') bump(i, -1);
              }}
            >
              {/* área clicável larga */}
              <rect x={x - 16} y={12} width={32} height={176} fill="transparent" />
              <line
                x1={x}
                y1={20}
                x2={x}
                y2={160}
                stroke="#C4A574"
                strokeWidth={6}
                strokeLinecap="round"
              />
              {Array.from({ length: n }).map((_, bi) => (
                <ellipse
                  key={bi}
                  cx={x}
                  cy={148 - bi * 14}
                  rx={12}
                  ry={6}
                  fill={ABACUS_COLORS[i]}
                  stroke="#333"
                  strokeWidth={0.5}
                  pointerEvents="none"
                />
              ))}
              <text
                x={x}
                y={179}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#222"
                pointerEvents="none"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      {interactive && (
        <p className="mt-1 text-center text-[10px] text-gray-500">
          Clique para adicionar · botão direito para remover
        </p>
      )}
    </div>
  );
}

type ChangeFn = (id: string, value: string | number | boolean) => void;

function MathQTitle({ n, children }: { n: number; children: ReactNode }) {
  return (
    <p className="mb-4 mt-8 text-[15px] leading-relaxed text-black" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      <span className="mr-1 font-bold" style={{ color: MATH_PINK }}>
        {n}.
      </span>
      {children}
    </p>
  );
}

function PinkBoxInput({
  id,
  value,
  onChange,
  tall = false,
}: {
  id: string;
  value: string;
  onChange: ChangeFn;
  tall?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      placeholder="Escreva aqui..."
      className={`w-full max-w-full rounded-[10px] border-2 px-3 py-2 text-[14px] text-black focus:outline-none focus:ring-2 ${
        tall ? 'min-h-[100px]' : 'min-h-[72px]'
      }`}
      style={{ borderColor: MATH_PINK, background: '#fff' }}
    />
  );
}

function LineInput({
  id,
  value,
  onChange,
  wide = true,
}: {
  id: string;
  value: string;
  onChange: ChangeFn;
  wide?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className={`mt-1 border-0 border-b-2 border-gray-400 bg-transparent px-1 py-1 text-[14px] text-black focus:border-[#E85A7A] focus:outline-none ${
        wide ? 'w-full' : 'w-24'
      }`}
    />
  );
}

/** Página 1 de Matemática */
export function MathPage1({
  answers,
  onChange,
}: {
  answers: UserAnswers;
  onChange: ChangeFn;
}) {
  const mayanCells: Array<{
    symbol?: ReactNode;
    decimal?: string;
    symbolKey?: string;
    decimalKey?: string;
  }> = [
    { symbol: <MayanGlyph bars={1} />, decimal: '5' },
    { symbol: <MayanGlyph dots={2} bars={1} />, decimalKey: 'm1_q2_d7' },
    { symbolKey: 'm1_q2_s10', decimal: '10' },
    { symbol: <MayanGlyph dots={2} bars={2} />, decimalKey: 'm1_q2_d12' },
    { symbolKey: 'm1_q2_s15', decimal: '15' },
    { symbol: <MayanGlyph dots={4} bars={3} />, decimalKey: 'm1_q2_d19' },
    { symbolKey: 'm1_q2_s20', decimal: '20' },
  ];

  const compareItems = [
    { id: 'm1_q3_a', glyph: <MayanGlyph dots={3} bars={1} />, value: 8 },
    { id: 'm1_q3_b', glyph: <MayanGlyph dots={2} bars={2} />, value: 12 },
    { id: 'm1_q3_c', glyph: <MayanGlyph dots={3} />, value: 3 },
    {
      id: 'm1_q3_d',
      glyph: <MayanGlyph upper={{ dots: 3, bars: 1 }} shell />,
      value: 160,
    },
  ];

  const mark = (id: string) => (answers[id] as string) || '';

  const cycleMark = (id: string) => {
    const cur = mark(id);
    const next = cur === '' ? 'maior' : cur === 'maior' ? 'menor' : '';
    // only one maior and one menor
    if (next === 'maior') {
      compareItems.forEach((it) => {
        if (it.id !== id && mark(it.id) === 'maior') onChange(it.id, '');
      });
    }
    if (next === 'menor') {
      compareItems.forEach((it) => {
        if (it.id !== id && mark(it.id) === 'menor') onChange(it.id, '');
      });
    }
    onChange(id, next);
  };

  return (
    <div>
      <MathQTitle n={1}>
        O sistema de numeração egípcio utiliza sete símbolos para representar os números. Escreva
        nesse sistema de numeração os números a seguir.
      </MathQTitle>
      <div className="mb-4 space-y-4">
        {(['a', 'b'] as const).map((letter, i) => (
          <div key={letter} className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <span className="min-w-[70px] font-bold" style={{ color: MATH_PINK }}>
              {letter}) {i === 0 ? '3 174' : '45 242'}
            </span>
            <PinkBoxInput
              id={`m1_q1_${letter}`}
              value={(answers[`m1_q1_${letter}`] as string) || ''}
              onChange={onChange}
            />
          </div>
        ))}
        <div>
          <p className="mb-2">
            <span className="font-bold" style={{ color: MATH_PINK }}>
              c){' '}
            </span>
            Qual o maior número que pode ser representado no sistema de numeração egípcio utilizando
            dois símbolos diferentes? Explique sua resposta.
          </p>
          <PinkBoxInput
            id="m1_q1_c"
            value={(answers.m1_q1_c as string) || ''}
            onChange={onChange}
            tall
          />
        </div>
      </div>

      <MathQTitle n={2}>
        O sistema de numeração maia utiliza apenas três símbolos para escrever os números. Complete
        a tabela a seguir com as informações que estão faltando.
      </MathQTitle>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-center text-sm">
          <tbody>
            <tr>
              <th
                className="border px-2 py-3 text-white"
                style={{ background: MATH_PINK, borderColor: MATH_PINK_DARK }}
              >
                Símbolo maia
              </th>
              {mayanCells.map((cell, i) => (
                <td key={i} className="border p-2" style={{ borderColor: MATH_PINK }}>
                  {cell.symbol ?? (
                    <input
                      type="text"
                      value={(answers[cell.symbolKey!] as string) || ''}
                      onChange={(e) => onChange(cell.symbolKey!, e.target.value)}
                      className="h-14 w-full bg-gray-100 text-center focus:outline-none"
                      placeholder="?"
                    />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <th
                className="border px-2 py-2 text-[11px] leading-tight text-white"
                style={{ background: MATH_PINK, borderColor: MATH_PINK_DARK }}
              >
                Correspondente no sistema de numeração decimal
              </th>
              {mayanCells.map((cell, i) => (
                <td key={i} className="border p-2" style={{ borderColor: MATH_PINK }}>
                  {cell.decimal ?? (
                    <input
                      type="text"
                      value={(answers[cell.decimalKey!] as string) || ''}
                      onChange={(e) => onChange(cell.decimalKey!, e.target.value)}
                      className="h-10 w-full bg-gray-100 text-center focus:outline-none"
                      placeholder="?"
                    />
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <MathQTitle n={3}>
        Compare os números a seguir, escritos no sistema de numeração maia, e circule de vermelho o
        maior número e de verde o menor.
      </MathQTitle>
      <p className="mb-3 text-xs text-gray-500">
        Toque em cada símbolo: 1× vermelho (maior), 2× verde (menor), 3× limpa.
      </p>
      <div className="mb-8 flex flex-wrap items-end justify-around gap-4">
        {compareItems.map((item) => {
          const m = mark(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => cycleMark(item.id)}
              className={`flex h-28 w-24 items-center justify-center rounded-full border-4 bg-white transition ${
                m === 'maior'
                  ? 'border-red-500 shadow-md'
                  : m === 'menor'
                    ? 'border-green-500 shadow-md'
                    : 'border-transparent hover:border-gray-300'
              }`}
            >
              {item.glyph}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Página 2 de Matemática */
export function MathPage2({
  answers,
  onChange,
  renderTF,
}: {
  answers: UserAnswers;
  onChange: ChangeFn;
  renderTF: ReactNode;
}) {
  const romanTop = ['LXVI', '', 'CDIV', 'DX', '', '', 'MV', 'LI̅'];
  const romanBottom = ['', '109', '', '', '608', '800', '', ''];
  const romanKeysTop = ['', 'm2_q4_r109', '', '', 'm2_q4_r608', 'm2_q4_r800', '', ''];
  const romanKeysBot = ['m2_q4_d66', '', 'm2_q4_d404', 'm2_q4_d510', '', '', 'm2_q4_d1005', 'm2_q4_d51000'];

  const convertItems = [
    { roman: 'LXXVII', key: 'm2_q5_a' },
    { roman: 'CDXV', key: 'm2_q5_b' },
    { roman: 'CCCXIX', key: 'm2_q5_c' },
    { roman: 'MMCCXX', key: 'm2_q5_d' },
    { roman: 'CMIX', key: 'm2_q5_e' },
    { roman: 'DLXX', key: 'm2_q5_f' },
    { roman: 'DVI', key: 'm2_q5_g' },
    { roman: 'VIII̅', key: 'm2_q5_h' },
  ];

  return (
    <div>
      <MathQTitle n={4}>
        O sistema de numeração romano utiliza sete letras do alfabeto para escrever os números.
        Complete a tabela a seguir com as informações que estão faltando.
      </MathQTitle>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-center text-sm">
          <tbody>
            <tr>
              <th
                className="border px-2 py-2 text-[11px] text-white"
                style={{ background: MATH_PINK, borderColor: MATH_PINK_DARK }}
              >
                Algarismo romano
              </th>
              {romanTop.map((v, i) => (
                <td key={i} className="border p-1" style={{ borderColor: MATH_PINK }}>
                  {v || (
                    <input
                      type="text"
                      value={(answers[romanKeysTop[i]] as string) || ''}
                      onChange={(e) => onChange(romanKeysTop[i], e.target.value)}
                      className="h-10 w-full bg-gray-100 text-center focus:outline-none"
                    />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <th
                className="border px-2 py-2 text-[11px] leading-tight text-white"
                style={{ background: MATH_PINK, borderColor: MATH_PINK_DARK }}
              >
                Correspondente no sistema de numeração decimal
              </th>
              {romanBottom.map((v, i) => (
                <td key={i} className="border p-1" style={{ borderColor: MATH_PINK }}>
                  {v || (
                    <input
                      type="text"
                      value={(answers[romanKeysBot[i]] as string) || ''}
                      onChange={(e) => onChange(romanKeysBot[i], e.target.value)}
                      className="h-10 w-full bg-gray-100 text-center focus:outline-none"
                    />
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <MathQTitle n={5}>
        Escreva com algarismos indo-arábicos cada um dos números escritos a seguir no sistema de
        numeração romano.
      </MathQTitle>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {convertItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <span
              className="inline-flex min-w-[88px] items-center justify-center rounded-md border-2 px-3 py-2 font-semibold"
              style={{ borderColor: MATH_PINK }}
            >
              {item.roman}
            </span>
            <span className="text-lg text-sky-500">→</span>
            <LineInput
              id={item.key}
              value={(answers[item.key] as string) || ''}
              onChange={onChange}
              wide={false}
            />
          </div>
        ))}
      </div>

      {renderTF}

      <MathQTitle n={7}>
        Alguns meios de comunicação anunciaram que o próximo prêmio da loteria será de{' '}
        <em>quarenta e três milhões, quatrocentos e vinte e sete mil reais</em>. Escreva essa quantia
        com algarismos no quadro de ordens abaixo.
      </MathQTitle>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-center text-xs">
          <thead>
            <tr>
              <th colSpan={3} className="border py-2 text-white" style={{ background: MATH_PINK }}>
                Milhões
              </th>
              <th colSpan={3} className="border py-2 text-white" style={{ background: MATH_PINK }}>
                Milhares
              </th>
              <th colSpan={3} className="border py-2 text-white" style={{ background: MATH_PINK }}>
                Unidades simples
              </th>
            </tr>
            <tr>
              {['CM', 'DM', 'UM', 'Cm', 'Dm', 'Um', 'C', 'D', 'U'].map((lab) => (
                <th
                  key={lab}
                  className="border py-1"
                  style={{ background: '#D6EAF8', borderColor: MATH_PINK }}
                >
                  {lab}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 9 }).map((_, i) => {
                const key = `m2_q7_d${i}`;
                return (
                  <td key={key} className="border p-1" style={{ borderColor: MATH_PINK }}>
                    <input
                      type="text"
                      maxLength={1}
                      value={(answers[key] as string) || ''}
                      onChange={(e) => onChange(key, e.target.value.replace(/\D/g, '').slice(0, 1))}
                      className="h-10 w-full text-center text-base font-semibold focus:outline-none"
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-2 font-semibold">Agora responda:</p>
      <p className="mb-1">
        <span className="mr-1 text-[#80298F]">●</span>
        Quais os valores posicionais dos algarismos 4 na escrita do número acima?
      </p>
      <LineInput id="m2_q7_pos" value={(answers.m2_q7_pos as string) || ''} onChange={onChange} />
    </div>
  );
}

/** Página 3 de Matemática */
export function MathPage3({
  answers,
  onChange,
  renderTF,
}: {
  answers: UserAnswers;
  onChange: ChangeFn;
  renderTF: ReactNode;
}) {
  const luizOptions = [
    { id: 'm3_q2_o1', label: '925 346' },
    { id: 'm3_q2_o2', label: '2 304 965' },
    { id: 'm3_q2_o3', label: '5 690 237' },
    { id: 'm3_q2_o4', label: '4 325 690' },
  ];

  const lineNumbers = Array.from({ length: 13 }, (_, i) => 287 + i);
  const known = new Set([289, 292, 296]);

  return (
    <div>
      <MathQTitle n={1}>
        Considere os algarismos 2, 3, 4, 5 e 6 e, utilizando apenas eles, escreva
      </MathQTitle>
      <div className="mb-6 space-y-3">
        {(
          [
            ['a', 'o maior número possível de três ordens:'],
            ['b', 'o menor número possível de quatro ordens:'],
            ['c', 'um número de três ordens que seja par:'],
            ['d', 'um número de quatro ordens que seja ímpar:'],
          ] as const
        ).map(([letter, text]) => (
          <div key={letter}>
            <p>
              <span className="font-bold" style={{ color: MATH_PINK }}>
                {letter}){' '}
              </span>
              {text}
            </p>
            <LineInput
              id={`m3_q1_${letter}`}
              value={(answers[`m3_q1_${letter}`] as string) || ''}
              onChange={onChange}
            />
          </div>
        ))}
      </div>

      <MathQTitle n={2}>
        Utilizando os algarismos 0, 2, 3, 4, 5, 6 e 9, Luiz escreveu um número de sete ordens.
      </MathQTitle>
      <p className="mb-2">
        <span className="font-bold" style={{ color: MATH_PINK }}>
          a){' '}
        </span>
        Marque com um <b>X</b> os números que Luiz pode ter escrito.
      </p>
      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {luizOptions.map((opt) => {
          const checked = Boolean(answers[opt.id]);
          return (
            <label key={opt.id} className="flex cursor-pointer items-center gap-2">
              <button
                type="button"
                onClick={() => onChange(opt.id, checked ? '' : 'X')}
                className="flex h-7 w-7 items-center justify-center border-2 border-gray-400 font-bold"
              >
                {checked ? 'X' : ''}
              </button>
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
      <p className="mb-1">
        <span className="font-bold" style={{ color: MATH_PINK }}>
          b){' '}
        </span>
        Sabendo que Luiz escreveu o maior número possível sem repetir os algarismos, escreva como se
        lê esse número.
      </p>
      <PinkBoxInput
        id="m3_q2_b"
        value={(answers.m3_q2_b as string) || ''}
        onChange={onChange}
        tall
      />
      <p className="mb-1 mt-4">
        <span className="font-bold" style={{ color: MATH_PINK }}>
          c){' '}
        </span>
        Qual o menor número que podemos escrever utilizando todos esses algarismos sem repeti-los?
      </p>
      <LineInput id="m3_q2_c_num" value={(answers.m3_q2_c_num as string) || ''} onChange={onChange} />
      <p className="mb-1 mt-2">
        <span className="mr-1 text-[#80298F]">●</span>
        Escreva como se lê esse número.
      </p>
      <LineInput id="m3_q2_c_read" value={(answers.m3_q2_c_read as string) || ''} onChange={onChange} />

      {renderTF}

      <MathQTitle n={4}>
        Na reta numérica abaixo, estão faltando alguns números. Escreva-os e responda ao que se
        pede.
      </MathQTitle>
      <div className="mb-6 overflow-x-auto py-4">
        <div className="relative mx-auto min-w-[640px] px-4">
          <div className="absolute left-4 right-4 top-6 h-1 bg-sky-500" />
          <div className="absolute right-2 top-[18px] h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-sky-500" />
          <div className="relative flex justify-between pt-2">
            {lineNumbers.map((n) => (
              <div key={n} className="flex w-10 flex-col items-center">
                <div className="h-4 w-0.5 bg-sky-500" />
                {known.has(n) ? (
                  <span className="mt-1 text-[11px] font-semibold">{n}</span>
                ) : (
                  <input
                    type="text"
                    value={(answers[`m3_q4_line_${n}`] as string) || ''}
                    onChange={(e) => onChange(`m3_q4_line_${n}`, e.target.value)}
                    className="mt-1 w-9 border-b border-gray-400 bg-transparent text-center text-[10px] focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {(
          [
            ['a', 'Qual é o maior número representado na reta?'],
            ['b', 'Qual o menor número representado na reta?'],
            ['c', 'Quais números representados na reta são maiores do que 292?'],
            ['d', 'Quais números representados na reta são menores do que 290?'],
          ] as const
        ).map(([letter, text]) => (
          <div key={letter}>
            <p>
              <span className="font-bold" style={{ color: MATH_PINK }}>
                {letter}){' '}
              </span>
              {text}
            </p>
            <LineInput
              id={`m3_q4_${letter}`}
              value={(answers[`m3_q4_${letter}`] as string) || ''}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Página 4 de Matemática */
export function MathPage4({
  answers,
  onChange,
  renderPlanetTable,
}: {
  answers: UserAnswers;
  onChange: ChangeFn;
  renderPlanetTable: ReactNode;
}) {
  const compares = [
    { key: 'm4_q5_a', left: '574', right: '547' },
    { key: 'm4_q5_b', left: '92 474', right: '92 744' },
    { key: 'm4_q5_c', left: '8 623', right: '8 000 + 600 + 30 + 2' },
    { key: 'm4_q5_d', left: '4 000 + 200 + 80', right: '4 000 + 20 + 8' },
    { key: 'm4_q5_e', left: '2 000 000', right: '2 milhões' },
    { key: 'm4_q5_f', left: '130 milhões', right: '130 000 020' },
  ];

  return (
    <div>
      <MathQTitle n={5}>
        Compare os números em cada item e complete as sentenças utilizando os símbolos{' '}
        <b>=</b> (igual a), <b>&gt;</b> (maior do que) ou <b>&lt;</b> (menor do que).
      </MathQTitle>
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {compares.map((item, i) => (
          <div key={item.key} className="flex flex-wrap items-center gap-2 text-[15px]">
            <span className="font-bold" style={{ color: MATH_PINK }}>
              {String.fromCharCode(97 + i)})
            </span>
            <span>{item.left}</span>
            <input
              type="text"
              maxLength={1}
              value={(answers[item.key] as string) || ''}
              onChange={(e) => onChange(item.key, e.target.value)}
              className="w-12 border-b-2 border-gray-400 bg-transparent text-center text-lg font-bold focus:border-[#E85A7A] focus:outline-none"
              placeholder="?"
            />
            <span>{item.right}</span>
          </div>
        ))}
      </div>

      {renderPlanetTable}

      <MathQTitle n={7}>Observe o ábaco a seguir e faça o que se pede.</MathQTitle>
      <div className="mb-4 flex flex-col items-start gap-6 lg:flex-row">
        <AbacusVisual beads={[0, 7, 4, 6, 0, 2]} />
        <div className="flex-1 space-y-3">
          <div>
            <p>
              <span className="font-bold" style={{ color: MATH_PINK }}>
                a){' '}
              </span>
              Qual número está representado no ábaco?
            </p>
            <LineInput id="m4_q7_a" value={(answers.m4_q7_a as string) || ''} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1">
          <p>
            <span className="font-bold" style={{ color: MATH_PINK }}>
              b){' '}
            </span>
            Ao adicionar 297 unidades ao número representado no ábaco, qual é o resultado obtido?
            Registre no ábaco ao lado.
          </p>
          <LineInput id="m4_q7_b" value={(answers.m4_q7_b as string) || ''} onChange={onChange} />
        </div>
        <AbacusVisual
          interactive
          beads={parseAbacusBeads(answers.m4_q7_b_abacus)}
          onBeadsChange={(next) => {
            onChange('m4_q7_b_abacus', next.join(','));
            onChange('m4_q7_b', formatAbacusNumber(abacusBeadsToNumber(next)));
          }}
        />
      </div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1">
          <p>
            <span className="font-bold" style={{ color: MATH_PINK }}>
              c){' '}
            </span>
            Ao adicionar 20 300 unidades ao número representado no ábaco, qual é o resultado obtido?
            Registre no ábaco ao lado.
          </p>
          <LineInput id="m4_q7_c" value={(answers.m4_q7_c as string) || ''} onChange={onChange} />
        </div>
        <AbacusVisual
          interactive
          beads={parseAbacusBeads(answers.m4_q7_c_abacus)}
          onBeadsChange={(next) => {
            onChange('m4_q7_c_abacus', next.join(','));
            onChange('m4_q7_c', formatAbacusNumber(abacusBeadsToNumber(next)));
          }}
        />
      </div>
    </div>
  );
}
