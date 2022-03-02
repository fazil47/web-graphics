import { Mesh, MeshBasicMaterial, Scene, SphereGeometry, Vector3 } from "three";
import GraphicsScene from "../GraphicsScene";

export default function UnshadedDemo() {
  const scene = new Scene();

  const radius = 1;
  const widthSegments = 16;
  const heightSegments = 16;
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshBasicMaterial({ color: 0xaa8844 });

  const sphere = new Mesh(geometry, material);
  scene.add(sphere);
  sphere.position.z = -3;

  return (
    <GraphicsScene
      scene={scene}
      update={(time: number) => {
        time *= 0.001;
        sphere.rotation.x = time;
        sphere.rotation.y = time;
      }}
      cameraPosition={new Vector3(0, 0, 3)}
    />
  );
}
