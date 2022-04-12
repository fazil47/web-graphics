import { Scene } from "three";
import GraphicsScene from "../../graphics/GraphicsScene";

export function ShadowDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene} />;
}

export function ReflectionDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene} />;
}
