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
      <p>
        Sweep representation is simply turning a 2D object to a 3D object by by
        sweeping a 2D object over a path. For example, a 2D rectangle moved in a
        linear path results in the formation of cuboid. To get a better overview
        of what sweep representation is, lets check the demo below. You can see
        a small circle but when you sweep it in a circular path using the
        slider, it leads to the formation of toroid shape. Similarly, we can
        form cylinder using translational sweep of a circle, prism using a
        translational sweep of a triangle.
      </p>
      <SweepRepresentationDemo />
      <h2>Constructive Solid Geometry</h2>
      <CSGDemo />
    </Page>
  );
}
