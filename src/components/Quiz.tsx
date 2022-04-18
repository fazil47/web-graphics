import { useState, useEffect } from "react";
import "./Quiz.css";

export enum QuizAnswerState {
  Unanswered,
  Correct,
  Incorrect,
}

export interface QuizState {
  answerState: QuizAnswerState;
  selection?: number;
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
}

export default function Quiz({
  quizInfo,
  handleQuizStateUpdate,
  initialQuizState = { answerState: QuizAnswerState.Unanswered, selection: -1 },
}: QuizProps) {
  const [currentSelection, setCurrentSelection] = useState<number | undefined>(
    initialQuizState.selection
  );
  const [quizState, setQuizState] = useState<QuizState>(initialQuizState);

  useEffect(() => {
    setQuizState(initialQuizState);
    setCurrentSelection(initialQuizState.selection);
  }, [initialQuizState]);

  const SelectionHandler = (event: any) => {
    let index = quizInfo.options.indexOf(event.target.value);
    setCurrentSelection(index);
  };

  const SubmitHandler = (event: any) => {
    event.preventDefault();
    // Unanswered
    if (currentSelection === undefined) {
      return;
    }

    console.log(currentSelection);

    const isCorrect = quizInfo.answerIndex === currentSelection;
    setQuizState({
      answerState: isCorrect
        ? QuizAnswerState.Correct
        : QuizAnswerState.Incorrect,
      selection: currentSelection,
    });

    if (handleQuizStateUpdate) {
      handleQuizStateUpdate({
        answerState: isCorrect
          ? QuizAnswerState.Correct
          : QuizAnswerState.Incorrect,
        selection: currentSelection,
      });
    }
  };

  const hint = quizInfo.hint ? quizInfo.hint : "";
  const explanation = quizInfo.explanation ? quizInfo.explanation : "";

  return (
    <form className="quizForm">
      <p className="quizQuestion">Q: {quizInfo.question}</p>
      <div className="flex flex-col w-full">
        {quizInfo.options.map((option: string) => {
          const isSelected =
            currentSelection === quizInfo.options.indexOf(option);
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
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      <button className="primaryButton quizSubmitButton" onClick={SubmitHandler}>
        Submit
      </button>
      {quizState.answerState === QuizAnswerState.Correct ? (
        <p className="correctMessage">{`Correct. ${explanation}`}</p>
      ) : quizState.answerState === QuizAnswerState.Incorrect ? (
        <p className="incorrectMessage">{`Incorrect. ${hint}`}</p>
      ) : null}
    </form>
  );
}
