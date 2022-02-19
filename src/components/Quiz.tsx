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
  };
  initialQuizState?: QuizState;
  handleQuizStateUpdate?: (quizState: QuizState) => void;
}

export default function Quiz({
  quizInfo,
  handleQuizStateUpdate,
  initialQuizState = QuizState.Unanswered,
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

  return (
    <form className="quizForm">
      <p className="quizQuestion">Q: {quizInfo.question}</p>
      <div className="flex flex-col w-full">
        {quizInfo.options.map((option: string) => {
          const isSelected = selection === quizInfo.options.indexOf(option);
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
        <p className="correctMessage">Correct</p>
      ) : quizState === QuizState.Incorrect ? (
        <p className="incorrectMessage">Incorrect {quizInfo.hint}</p>
      ) : null}
    </form>
  );
}
