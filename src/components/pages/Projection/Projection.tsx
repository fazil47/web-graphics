import Page from "../../Page";
import Quiz from "../../Quiz";
import {
  PerspectiveProjectionDemo,
  OrthographicProjectionDemo,
  StereoCameraDemo,
} from "./ProjectionDemos";

export default function Projection() {
  return (
    <Page pageName="projection">
      <h1>Projection</h1>
      <h2>Perspective Projection</h2>
      <PerspectiveProjectionDemo />
      <h2>Orthographic Projection</h2>
      <OrthographicProjectionDemo />
      <Quiz
        quizInfo={{
          question:
            "In which kind of projection does the cube's size remain constant?",
          options: ["Orthographic", "Perspective", "Both"],
          answerIndex: 0,
        }}
      />
      <h2>Stereo Effect</h2>
      <StereoCameraDemo />
    </Page>
  );
}
