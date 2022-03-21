import Page from "../../Page";
import { Translation, Rotation, Scale } from "./TransformationDemos";

export default function Transformations() {
  return (
    <Page pageName="transformations">
      <h1>Transformations</h1>
      <h2>Translation</h2>
      <Translation />
      <h2>Rotation</h2>
      <Rotation />
      <h2>Scale</h2>
      <Scale />
    </Page>
  );
}
