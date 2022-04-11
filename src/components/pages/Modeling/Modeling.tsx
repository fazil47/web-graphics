import Page from "../../Page";
import { CSGDemo, SweepRepresentationDemo } from "./ModelingDemos";

export default function Modeling() {
  return (
    <Page pageName="modeling">
      <h1>Modeling</h1>
      <h2>Implicit Surfaces</h2>
      <p>TODO</p>
      <h2>Polygonal Mesh Modeling</h2>
      <p>TODO</p>
      <h2>Sweep Representation</h2>
      <SweepRepresentationDemo />
      <h2>Constructive Solid Geometry</h2>
      <CSGDemo />
    </Page>
  );
}
