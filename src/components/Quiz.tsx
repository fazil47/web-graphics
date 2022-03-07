import React, { useEffect } from "react";
import "./Quiz.css";

export enum QuizState {
  Unanswered,
  Correct,
  Incorrect,
}
interface QuizProps {
  quizInfo: {
    options: Array<string>;
    answerIndex: number;
    question: string;
    hint?: string;
    explanation?: string;
  };
  initialQuizState?: QuizState;
  handleQuizStateUpdate?: (quizState: QuizState) => void;
  initialSelection?: number;
}

export default function Quiz({
  quizInfo,
  handleQuizStateUpdate,
  initialQuizState = QuizState.Unanswered,
  initialSelection,
}: QuizProps) {
  const [selection, setSelection] = React.useState<number>(); // Index of option selected
  const [quizState, setQuizState] = React.useState(initialQuizState);

  useEffect(() => {
    setQuizState(initialQuizState);
  }, [initialQuizState]);

  const SelectionHandler = (event: any) => {
    let index = quizInfo.options.indexOf(event.target.value);
    setSelection(index);
  };

  const SubmitHandler = (event: any) => {
    event.preventDefault();
    const isCorrect = quizInfo.answerIndex === selection;
    setQuizState(isCorrect ? QuizState.Correct : QuizState.Incorrect);

    if (handleQuizStateUpdate) {
      handleQuizStateUpdate(
        isCorrect ? QuizState.Correct : QuizState.Incorrect
      );
    }
  };

  const hint = quizInfo.hint ? quizInfo.hint : "";
  const explanation = quizInfo.explanation ? quizInfo.explanation : "";

  return (
    <form className="quizForm">
      <p className="quizQuestion">Q: {quizInfo.question}</p>
      <div className="flex flex-col w-full">
        {quizInfo.options.map((option: string) => {
          let isSelected;
          if (initialSelection) {
            isSelected = initialSelection === quizInfo.options.indexOf(option);
          } else {
            isSelected = selection === quizInfo.options.indexOf(option);
          }
          const labelClassName = `quizOptionLabel ${
            isSelected ? " labelSelected" : ""
          }`;
          return (
            <label key={option} className={labelClassName}>
              <input
                className="quizOptionInput"
                type="radio"
                checked={isSelected}
                onChange={SelectionHandler}
                name="quiz"
                value={option}
              />
              {option}
            </label>
          );
        })}
      </div>
      <button className="quizSubmitButton" onClick={SubmitHandler}>
        Submit
      </button>
      {quizState === QuizState.Correct ? (
        <p className="correctMessage">{`Correct! ${explanation}`}</p>
      ) : quizState === QuizState.Incorrect ? (
        <p className="incorrectMessage">{`Incorrect ${hint}`}</p>
      ) : null}
    </form>
  );
}
