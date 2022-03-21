import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  DirectionalLight,
  Euler,
  GridHelper,
  Group,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import GraphicsScene from "../../GraphicsScene";
import Slider from "../../Slider";

export function Translation() {
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cameraOrbitGroup = new Group();
  cameraOrbitGroup.add(camera);
  scene.add(cameraOrbitGroup);
  const axesHelper = new AxesHelper(15);
  scene.add(axesHelper);
  const gridHelper = new GridHelper(10, 10);
  scene.add(gridHelper);

  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);
  const ambLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambLight);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0x7f2f5f });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  return (
    <GraphicsScene
      scene={scene}
      camera={camera}
      cameraPosition={new Vector3(0, 2, 5)}
      cameraRotation={new Euler(-Math.PI / 8, 0, 0)}
    >
      <Slider
        label="Translate X"
        min="-5"
        max="5"
        onChange={(value) => {
          mesh.position.x = value;
        }}
      />
      <Slider
        label="Translate Y"
        min="-3"
        max="3"
        onChange={(value) => {
          mesh.position.y = value;
        }}
      />
      <Slider
        label="Translate Z"
        min="-4"
        max="4"
        onChange={(value) => {
          mesh.position.z = value;
        }}
      />
      <Slider
        label="Camera Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          cameraOrbitGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function Rotation() {
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cameraOrbitGroup = new Group();
  cameraOrbitGroup.add(camera);
  scene.add(cameraOrbitGroup);
  const axesHelper = new AxesHelper(15);
  scene.add(axesHelper);
  const gridHelper = new GridHelper(10, 10);
  scene.add(gridHelper);

  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);
  const ambLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambLight);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0x7f2f5f });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  return (
    <GraphicsScene
      scene={scene}
      camera={camera}
      cameraPosition={new Vector3(0, 2, 5)}
      cameraRotation={new Euler(-Math.PI / 8, 0, 0)}
    >
      <Slider
        label="Rotate X"
        min="-180"
        max="180"
        onChange={(value) => {
          mesh.rotation.x = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Rotate Y"
        min="-180"
        max="180"
        onChange={(value) => {
          mesh.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Rotate Z"
        min="-180"
        max="180"
        onChange={(value) => {
          mesh.rotation.z = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Camera Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          cameraOrbitGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function Scale() {
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cameraOrbitGroup = new Group();
  cameraOrbitGroup.add(camera);
  scene.add(cameraOrbitGroup);
  const axesHelper = new AxesHelper(15);
  scene.add(axesHelper);
  const gridHelper = new GridHelper(10, 10);
  scene.add(gridHelper);

  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);
  const ambLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambLight);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0x7f2f5f });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  return (
    <GraphicsScene
      scene={scene}
      camera={camera}
      cameraPosition={new Vector3(0, 2, 5)}
      cameraRotation={new Euler(-Math.PI / 8, 0, 0)}
    >
      <Slider
        label="Scale X"
        min="1"
        max="5"
        onChange={(value) => {
          mesh.scale.x = value;
        }}
      />
      <Slider
        label="Scale Y"
        min="1"
        max="5"
        onChange={(value) => {
          mesh.scale.y = value;
        }}
      />
      <Slider
        label="Scale Z"
        min="1"
        max="5"
        onChange={(value) => {
          mesh.scale.z = value;
        }}
      />
      <Slider
        label="Camera Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          cameraOrbitGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
