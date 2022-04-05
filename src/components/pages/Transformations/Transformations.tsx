import Page from "../../Page";
import {
  TranslationDemo,
  RotationDemo,
  ScaleDemo,
  RotationAroundAxisDemo,
} from "./TransformationDemos";

export default function Transformations() {
  return (
    <Page pageName="transformations">
      <h1>Transformations</h1>
      <h2>Translation</h2>
      <TranslationDemo />
      <h2>Rotation</h2>
      <RotationDemo />
      <RotationAroundAxisDemo />
      <h2>Scale</h2>
      <ScaleDemo />
    </Page>
  );
}
