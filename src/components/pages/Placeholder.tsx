import Page from "../Page";
import Quiz from "../Quiz";

export default function Placeholder() {
  const quizInfo1 = {
    question: "Question?",
    options: ["Option 1", "Option 2", "Option 3"],
    answerIndex: 1,
  };
  return (
    <Page pageName="placeholder">
      <h1>Placeholder</h1>
      <Quiz quizInfo={quizInfo1} />
    </Page>
  );
}
