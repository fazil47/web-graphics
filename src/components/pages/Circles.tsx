import React from "react";

import Page from "../Page";
import Quiz from "../Quiz";

export default function Circles() {
  const quizInfo1 = {
    question: "What is the circumference of a circle?",
    options: ["2πr", "2r", "πr", "r"],
    answerIndex: 0,
  };
  const quizInfo2 = {
    question: "What is the area of a circle?",
    options: ["πr²", "πr", "r²", "r"],
    answerIndex: 0,
  };

  return (
    <Page pageName="circles">
      <h1>Circles</h1>
      <Quiz quizInfo={quizInfo1} />
      <Quiz quizInfo={quizInfo2} />
    </Page>
  );
}
