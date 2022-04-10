import { Scene } from "three";
import GraphicsScene from "../../graphics/GraphicsScene";

export function TextureUVDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene}></GraphicsScene>;
}
