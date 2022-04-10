import { Scene } from "three";
import GraphicsScene from "../../graphics/GraphicsScene";

export function VertexShaderDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene} />;
}

export function FragmentShaderDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene} />;
}
