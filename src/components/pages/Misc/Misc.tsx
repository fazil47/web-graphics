import Page from "../../Page";
import { FractalDemo, RayTracingDemo } from "./MiscDemos";

export default function Misc() {
  return (
    <Page pageName="misc">
      <h1>Miscellaneous</h1>
      <h2>Fractals</h2>
      <FractalDemo />
      <h2>Ray Tracing</h2>
      <RayTracingDemo />
    </Page>
  );
}
