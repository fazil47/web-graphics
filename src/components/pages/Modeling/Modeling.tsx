import Page from "../../Page";
import {
  CubeIntersectSphere,
  CubeSubtractSphere,
  CubeUnionSphere,
} from "./CSGDemos";

export default function Modeling() {
  return (
    <Page pageName="modeling">
      <h1>Modeling</h1>
      <h2>Implicit Surfaces</h2>
      <p>TODO</p>
      <h2>Polygonal Mesh Modeling</h2>
      <p>TODO</p>
      <h2>Constructive Solid Geometry</h2>
      <h3>Union Operation</h3>
      <CubeUnionSphere />
      <h3>Intersection Operation</h3>
      <CubeIntersectSphere />
      <h3>Subtraction Operation</h3>
      <CubeSubtractSphere />
    </Page>
  );
}
