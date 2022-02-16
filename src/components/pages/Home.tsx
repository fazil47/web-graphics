import React from "react";

import Page from "../Page";
import Quiz from "../Quiz";

export default function Home() {
  const quizInfo1 = {
    question: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Chennai", "Kolkata"],
    answerIndex: 0,
  };
  const quizInfo2 = {
    question: "What is the capital of USA?",
    options: ["New Orleans", "Washington DC", "New York", "Seattle"],
    answerIndex: 1,
  };

  return (
    <Page>
      <h1>Home</h1>
      <h2>A sample quiz</h2>
      <Quiz quizInfo={quizInfo1} />
      <h2>Another quiz</h2>
      <Quiz quizInfo={quizInfo2} />
    </Page>
  );
}
