import React from "react";

import Page from "../Page";
import Quiz from "../Quiz";

export default function Home() {
  const quizInfo = {
    question: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Chennai", "Kolkata"],
    answerIndex: 0,
  };

  return (
    <Page>
      <h1>Home</h1>
      <p>A sample quiz</p>
      <Quiz quizInfo={quizInfo} />
    </Page>
  );
}
