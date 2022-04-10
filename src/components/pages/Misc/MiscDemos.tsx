import { Scene } from "three";
import GraphicsScene from "../../graphics/GraphicsScene";

export function FractalDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene} />;
}

export function RayTracingDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene} />;
}
