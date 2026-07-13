interface QuestionNumberProps {
  number?: number;
  letter?: string;
  className?: string;
}

/**
 * Número da questão no padrão da ficha: círculo roxo com o número em branco.
 * (Letras de subitens continuam como texto.)
 */
export function QuestionNumber({ number, letter, className = '' }: QuestionNumberProps) {
  if (number !== undefined) {
    return (
      <span
        className={`mr-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#80298F] align-middle text-sm font-bold text-white ${className}`}
      >
        {number}
      </span>
    );
  }

  if (letter) {
    return (
      <span style={{ color: '#80298F', fontWeight: 'bold' }} className={className}>
        {letter}){' '}
      </span>
    );
  }

  return null;
}

