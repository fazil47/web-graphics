import React, { useEffect } from "react";
import "./Page.css";

import Quiz, { QuizState } from "./Quiz";

export default function Page({ children }: any) {
  const [quizStates, SetQuizStates] = React.useState<Array<QuizState>>([]);
  const [quizzes, SetQuizzes] = React.useState<Array<JSX.Element>>([]);

  useEffect(() => {
    let quizzes: Array<JSX.Element> = [];
    React.Children.forEach(children, (child: any) => {
      if (React.isValidElement(child) && child.type === Quiz) {
        quizzes.push(child);
      }
    });
    SetQuizzes(quizzes);
    SetQuizStates(new Array(quizzes.length).fill(QuizState.Unanswered));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function HandlePageProgress(quizIndex: number, quizState: QuizState): void {
    let newQuizStates = [...quizStates];
    newQuizStates[quizIndex] = quizState;
    SetQuizStates(newQuizStates);
  }

  const childrenWithProgressProp = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Quiz) {
      return React.cloneElement(child, {
        HandleProgress: (quizState: QuizState) => {
          HandlePageProgress(quizzes.indexOf(child), quizState);
        },
      } as any);
    }
    return child;
  });

  const progress: number =
    (100 *
      quizStates.reduce(
        (accumulatedValue: number, quizState: QuizState) =>
          (quizState === QuizState.Correct ? 1 : 0) + accumulatedValue,
        0
      )) /
    quizStates.length;

  return (
    <div id="page">
      <p>Progress: {progress}%</p>
      <div>{childrenWithProgressProp}</div>
    </div>
  );
}
