import {
  DirectionalLight,
  Group,
  Mesh,
  MeshPhongMaterial,
  Scene,
  SphereGeometry,
  Vector3,
} from "three";
import GraphicsScene from "../GraphicsScene";

export default function PhongShadingDemo() {
  const scene = new Scene();

  const lightGroup = new Group();
  const color = 0xffffff;
  const intensity = 1.5;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  lightGroup.add(light);
  scene.add(lightGroup);

  const radius = 1;
  const widthSegments = 16;
  const heightSegments = 16;
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshPhongMaterial({ color: 0xaa8844 });

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
    >
      <label>
        <span>Light Orbit</span>
        <input
          defaultValue="0"
          type="range"
          min="-180"
          max="180"
          step="1"
          onChange={(e) => {
            const rotation = parseInt(e.target.value);
            lightGroup.rotation.y = (rotation * Math.PI) / 180;
          }}
        />
      </label>
    </GraphicsScene>
  );
}
