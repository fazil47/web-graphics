import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  Scene,
  Vector3,
} from "three";
import GraphicsScene, { CameraType } from "../../graphics/GraphicsScene";
import Slider from "../../graphics/controls/Slider";

export function PerspectiveProjectionDemo() {
  const scene = new Scene();

  const cameraPosition = new Vector3(0, 0, 3);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0xffffff });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const lightColor = 0x640202;
  const light = new DirectionalLight(lightColor, 2);
  const ambLight = new AmbientLight(lightColor, 0.5);
  scene.add(light);
  scene.add(ambLight);

  light.position.z = 7.5;
  light.position.x = 5;
  light.position.y = 10;

  return (
    <GraphicsScene
      scene={scene}
      cameraType={CameraType.Perspective}
      cameraPosition={cameraPosition}
    >
      <Slider
        label="Distance from camera"
        min="0"
        max="10"
        onChange={(distance) => {
          mesh.position.z = -distance;
        }}
      />
      <Slider
        label="Cube X rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(rotation) => {
          mesh.rotation.x = (Math.PI * rotation) / 180;
        }}
      />
      <Slider
        label="Cube Y rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(rotation) => {
          mesh.rotation.y = (Math.PI * rotation) / 180;
        }}
      />
      <Slider
        label="Cube X translation"
        min="-3"
        max="3"
        initialValue="0"
        onChange={(distance) => {
          mesh.position.x = distance;
        }}
      />
    </GraphicsScene>
  );
}

export function OrthographicProjectionDemo() {
  const scene = new Scene();

  const cameraPosition = new Vector3(0, 0, 3);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0xffffff });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const lightColor = 0x640202;
  const light = new DirectionalLight(lightColor, 2);
  const ambLight = new AmbientLight(lightColor, 0.5);
  scene.add(light);
  scene.add(ambLight);
  light.position.z = 7.5;
  light.position.x = 5;
  light.position.y = 10;

  return (
    <GraphicsScene
      scene={scene}
      cameraType={CameraType.Orthographic}
      cameraPosition={cameraPosition}
      orthographicCameraScale={0.0065}
    >
      <Slider
        label="Distance from camera"
        min="0"
        max="10"
        onChange={(distance) => {
          mesh.position.z = -distance;
        }}
      />
      <Slider
        label="Cube X rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(rotation) => {
          mesh.rotation.x = (Math.PI * rotation) / 180;
        }}
      />
      <Slider
        label="Cube Y rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(rotation) => {
          mesh.rotation.y = (Math.PI * rotation) / 180;
        }}
      />
      <Slider
        label="Cube X translation"
        min="-3"
        max="3"
        initialValue="0"
        onChange={(distance) => {
          mesh.position.x = distance;
        }}
      />
    </GraphicsScene>
  );
}
