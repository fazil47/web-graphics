import React, { useEffect } from "react";

interface QuizProps {
  quizInfo: { options: Array<string>; answerIndex: number; question: string };
  initialQuizState?: QuizState;
  HandleProgress?: (quizState: QuizState) => void;
}

export enum QuizState {
  Unanswered,
  Correct,
  Incorrect,
}

export default function Quiz({
  quizInfo,
  HandleProgress,
  initialQuizState = QuizState.Unanswered,
}: QuizProps) {
  const [selection, setSelection] = React.useState<number>(); // Index of option selected
  const [quizState, setQuizState] = React.useState(initialQuizState);

  const SelectionHandler = (event: any) => {
    let index = quizInfo.options.indexOf(event.target.value);
    setSelection(index);
  };

  const SubmitHandler = (event: any) => {
    event.preventDefault();
    const isCorrect = quizInfo.answerIndex === selection;
    setQuizState(isCorrect ? QuizState.Correct : QuizState.Incorrect);

    if (HandleProgress) {
      HandleProgress(isCorrect ? QuizState.Correct : QuizState.Incorrect);
    }
  };

  useEffect(() => {
    setQuizState(initialQuizState);
  }, [initialQuizState]);

  return (
    <form>
      <p>Q: {quizInfo.question}</p>
      {quizInfo.options.map((option: string) => {
        return (
          <label key={option}>
            <input
              type="radio"
              checked={selection === quizInfo.options.indexOf(option)}
              onChange={SelectionHandler}
              name="quiz"
              value={option}
            />
            {option}
          </label>
        );
      })}
      <br />
      <button onClick={SubmitHandler}>Submit</button>
      {quizState === QuizState.Correct ? (
        <p>Correct</p>
      ) : quizState === QuizState.Incorrect ? (
        <p>Incorrect</p>
      ) : null}
    </form>
  );
}
