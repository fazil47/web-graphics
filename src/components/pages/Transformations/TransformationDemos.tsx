import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  BufferGeometry,
  DirectionalLight,
  Euler,
  GridHelper,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import GraphicsScene from "../../graphics/GraphicsScene";
import Slider from "../../graphics/controls/Slider";
import Vector3Control from "../../graphics/controls/Vector3Control";

export function TranslationDemo() {
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cameraOrbitGroup = new Group();
  cameraOrbitGroup.add(camera);
  scene.add(cameraOrbitGroup);
  scene.add(new AxesHelper(20));
  scene.add(new GridHelper(10, 10).translateY(-0.001));

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
        label="X Translation"
        min="-5"
        max="5"
        initialValue="0"
        onChange={(value) => {
          mesh.position.x = value;
        }}
      />
      <Slider
        label="Y Translation"
        min="-2"
        max="2"
        initialValue="0"
        onChange={(value) => {
          mesh.position.y = value;
        }}
      />
      <Slider
        label="Z Translation"
        min="-4"
        max="4"
        initialValue="0"
        onChange={(value) => {
          mesh.position.z = value;
        }}
      />
      <Slider
        label="Camera Orbit"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          cameraOrbitGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function RotationDemo() {
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cameraOrbitGroup = new Group();
  cameraOrbitGroup.add(camera);
  scene.add(cameraOrbitGroup);
  const axisHelper = new AxesHelper(20);
  scene.add(axisHelper);
  scene.add(new GridHelper(10, 10).translateY(-0.001));

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
        label="X Rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value, delta) => {
          mesh.rotateOnWorldAxis(
            new Vector3(1, 0, 0),
            ((delta as number) * Math.PI) / 180
          );
        }}
      />
      <Slider
        label="Y Rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value, delta) => {
          mesh.rotateOnWorldAxis(
            new Vector3(0, 1, 0),
            ((delta as number) * Math.PI) / 180
          );
        }}
      />
      <Slider
        label="Z Rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value, delta) => {
          mesh.rotateOnWorldAxis(
            new Vector3(0, 0, 1),
            ((delta as number) * Math.PI) / 180
          );
        }}
      />
      <Slider
        label="Camera Orbit"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          cameraOrbitGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function RotationAroundAxisDemo() {
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cameraOrbitGroup = new Group();
  cameraOrbitGroup.add(camera);
  scene.add(cameraOrbitGroup);
  const axisHelper = new AxesHelper(20);
  scene.add(axisHelper);
  scene.add(new GridHelper(10, 10).translateY(-0.001));

  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);
  const ambLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambLight);

  const lineMaterial = new LineBasicMaterial({
    color: 0xffff22,
  });
  const lineDirection = new Vector3(1, 1, 1);
  const getLineGeometry = (direction: Vector3) => {
    const lineGeometry = new BufferGeometry().setFromPoints([
      new Vector3(-direction.x, -direction.y, -direction.z).multiplyScalar(10),
      new Vector3(direction.x, direction.y, direction.z).multiplyScalar(10),
    ]);
    return lineGeometry;
  };
  const line = new Line(getLineGeometry(lineDirection), lineMaterial);
  scene.add(line);

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
      <Vector3Control
        label="Rotation Axis"
        initialValue={lineDirection}
        min="1"
        max="10"
        step="0.1"
        onChange={(value) => {
          lineDirection.copy(value);
          line.geometry = getLineGeometry(lineDirection);
        }}
      />
      <Slider
        label="Rotation Angle"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value, delta) => {
          mesh.rotateOnWorldAxis(
            new Vector3(
              lineDirection.x,
              lineDirection.y,
              lineDirection.z
            ).normalize(),
            ((delta as number) * Math.PI) / 180
          );
        }}
      />
      <Slider
        label="Camera Orbit"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          cameraOrbitGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function ScaleDemo() {
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const cameraOrbitGroup = new Group();
  cameraOrbitGroup.add(camera);
  scene.add(cameraOrbitGroup);
  scene.add(new AxesHelper(20).translateY(0.001));
  scene.add(new GridHelper(10, 10));

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
        label="X Scale"
        min="1"
        max="5"
        initialValue="1"
        onChange={(value) => {
          mesh.scale.x = value;
        }}
      />
      <Slider
        label="Y Scale"
        min="1"
        max="5"
        initialValue="1"
        onChange={(value) => {
          mesh.scale.y = value;
        }}
      />
      <Slider
        label="Z Scale"
        min="1"
        max="5"
        initialValue="1"
        onChange={(value) => {
          mesh.scale.z = value;
        }}
      />
      <Slider
        label="Camera Orbit"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          cameraOrbitGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
