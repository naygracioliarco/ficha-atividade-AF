import { IconDescribeQuestion, UserAnswers } from '../types/questions';
import { QuestionNumber } from './shared/QuestionNumber';

interface QuestionIconDescribeProps {
  question: IconDescribeQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

function QuestionIconDescribe({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionIconDescribeProps) {
  return (
    <div className="mb-6">
      <p className="mb-4">
        <QuestionNumber number={question.number} />
        <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
      </p>

      <div className="space-y-4">
        {question.items.map((item) => {
          const fieldId = `${question.id}_${item.id}`;
          const typed = (userAnswers[fieldId] as string) || '';
          const value = showResults && item.correctAnswer ? item.correctAnswer : typed;

          return (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#1F6FB2] text-3xl text-white">
                {item.imageSrc ? (
                  <img src={item.imageSrc} alt="" className="h-full w-full object-contain" />
                ) : (
                  <span>{item.icon}</span>
                )}
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onAnswerChange(fieldId, e.target.value)}
                placeholder={item.placeholder || ''}
                disabled={showResults}
                className={`flex-1 border-0 border-b border-gray-400 bg-transparent px-1 pb-1 text-[14px] focus:border-[#80298F] focus:outline-none font-myriad-vf ${
                  showResults ? 'text-[#4AA0E0]' : 'text-black'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionIconDescribe;
