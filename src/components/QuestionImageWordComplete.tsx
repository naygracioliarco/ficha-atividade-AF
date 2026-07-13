import { ImageWordCompleteQuestion, UserAnswers } from '../types/questions';
import { publicUrl } from '../lib/publicUrl';
import { QuestionNumber } from './shared/QuestionNumber';

interface QuestionImageWordCompleteProps {
  question: ImageWordCompleteQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

function QuestionImageWordComplete({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionImageWordCompleteProps) {
  return (
    <div className="mb-6">
      <p className="mb-4">
        <QuestionNumber number={question.number} />
        <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
      </p>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {question.items.map((item) => {
          const fieldId = `${question.id}_${item.id}`;
          const typed = (userAnswers[fieldId] as string) || '';
          const value = showResults && item.correctLetter ? item.correctLetter : typed;

          return (
            <div key={item.id} className="flex flex-col items-center">
              <div className="mb-2 flex items-center text-lg font-semibold text-black">
                <input
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => onAnswerChange(fieldId, e.target.value.toUpperCase())}
                  disabled={showResults}
                  className="mr-1 h-8 w-8 rounded-[5px] border-2 border-[#80298F] bg-[rgba(221,221,221,0.35)] text-center uppercase focus:outline-none"
                />
                <span className="uppercase">{item.rest}</span>
              </div>
              <div className="flex h-24 w-24 items-center justify-center text-4xl">
                {item.imageSrc ? (
                  <img
                    src={publicUrl(item.imageSrc)}
                    alt={item.correctLetter ? `${item.correctLetter}${item.rest}` : item.rest}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  item.icon || '🖼️'
                )}
              </div>
            </div>
          );
        })}
      </div>

      {question.subQuestions && question.subQuestions.length > 0 && (
        <ul className="mt-6 space-y-4 pl-6" style={{ listStyleType: 'disc' }}>
          {question.subQuestions.map((subQ) => {
            const subId = `${question.id}_${subQ.letter}`;
            const answer = (userAnswers[subId] as string) || '';
            return (
              <li key={subQ.letter} className="text-black marker:text-[#80298F]">
                <p className="mb-2">{subQ.question}</p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => onAnswerChange(subId, e.target.value)}
                  placeholder={subQ.placeholder || 'Digite aqui...'}
                  disabled={showResults}
                  className="block h-[31px] w-full max-w-[600px] rounded-[5px] bg-[rgba(221,221,221,0.50)] px-3 pt-1 text-left text-[14px] text-black placeholder:text-[#BDBDBD] font-myriad-vf focus:outline-none"
                />
                {showResults && subQ.correctAnswer && (
                  <p className="mt-1 text-sm text-gray-600">
                    Resposta esperada: <strong>{subQ.correctAnswer}</strong>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default QuestionImageWordComplete;
