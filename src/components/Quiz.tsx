import React from "react";

export default function Quiz(props: any) {
  const [answered, setAnswered] = React.useState(false);
  const [selection, setSelection] = React.useState(0); // Index of option selected
  const [correct, setCorrect] = React.useState(false);

  const SelectionHandler = (event: any) => {
    let index = props.quizInfo.options.indexOf(event.target.value);
    setSelection(index);
  };

  const SubmitHandler = (event: any) => {
    event.preventDefault();
    setAnswered(true);
    setCorrect(props.quizInfo.answerIndex === selection);
  };

  return (
    <form>
      <p>Q: {props.quizInfo.question}</p>
      {props.quizInfo.options.map((option: number) => {
        return (
          <label key={option}>
            <input
              type="radio"
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
      {answered && (correct ? <p>Correct</p> : <p>Incorrect</p>)}
    </form>
  );
}
