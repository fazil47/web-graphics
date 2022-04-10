import Page from "../../Page";
import { FragmentShaderDemo, VertexShaderDemo } from "./ShaderDemos";

export default function Shaders() {
  return (
    <Page pageName="shaders">
      <h1>Shaders</h1>
      <h2>Vertex Shaders</h2>
      <VertexShaderDemo />
      <h2>Fragment Shaders</h2>
      <FragmentShaderDemo />
    </Page>
  );
}
