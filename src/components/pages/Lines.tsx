import React from "react";

import Page from "../Page";
import Quiz from "../Quiz";

export default function Lines() {
  const quizInfo1 = {
    question: "What is the slope of a line?",
    options: ["y = mx + b", "y = mx", "y = m", "y = b"],
    answerIndex: 0,
  };
  const quizInfo2 = {
    question: "What is the x-intercept of a line?",
    options: ["y = mx + b", "y = mx", "y = m", "y = b"],
    answerIndex: 3,
  };
  const quizInfo3 = {
    question: "What is the y-intercept of a line?",
    options: ["x = -b", "x = -m", "x = -b/m", "x = b"],
    answerIndex: 2,
  };

  return (
    <Page pageName="lines">
      <h1>Lines</h1>
      <Quiz quizInfo={quizInfo1} />
      <Quiz quizInfo={quizInfo2} />
      <Quiz quizInfo={quizInfo3} />
    </Page>
  );
}
