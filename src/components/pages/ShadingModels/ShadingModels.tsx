import Page from "../../Page";
import Quiz from "../../Quiz";

import {
  UnshadedDemo,
  FlatShadingDemo,
  GouraudShadingDemo,
  PhongShadingDemo,
} from "./ShadingModelsDemos";

export default function ShadingModels() {
  const quizInfo1 = {
    question:
      "In which interpolation technique is the normal at each point calculated?",
    options: ["Gouraud Shading", "Phong Shading", "Flat Shading"],
    answerIndex: 1,
  };

  return (
    <Page pageName="shading_models">
      <h1>Shading Models</h1>
      <h2>Unshaded</h2>
      <UnshadedDemo />
      <h2>Flat Shading</h2>
      <FlatShadingDemo />
      <h2>Gouraud Shading</h2>
      <GouraudShadingDemo />
      <h2>Phong Shading</h2>
      <PhongShadingDemo />
      <Quiz quizInfo={quizInfo1} />
    </Page>
  );
}
