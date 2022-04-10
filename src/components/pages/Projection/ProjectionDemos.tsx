import {
  AmbientLight,
  BoxGeometry,
  CubeRefractionMapping,
  CubeTextureLoader,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import GraphicsScene, { CameraType } from "../../graphics/GraphicsScene";
import StereoGraphicsScene from "../../graphics/StereoGraphicsScene";
import Slider from "../../graphics/controls/Slider";
import { StereoEffect } from "three/examples/jsm/effects/StereoEffect";

import parkNx from "../../../textures/cube/Park3Med/nx.jpg";
import parkNy from "../../../textures/cube/Park3Med/ny.jpg";
import parkNz from "../../../textures/cube/Park3Med/nz.jpg";
import parkPx from "../../../textures/cube/Park3Med/px.jpg";
import parkPy from "../../../textures/cube/Park3Med/py.jpg";
import parkPz from "../../../textures/cube/Park3Med/pz.jpg";

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

export function StereoCameraDemo() {
  const scene = new Scene();
  scene.background = new CubeTextureLoader().load([
    parkPx,
    parkNx,
    parkPy,
    parkNy,
    parkPz,
    parkNz,
  ]);

  const renderer = new WebGLRenderer({ antialias: true });
  const stereoEffect = new StereoEffect(renderer);
  const camera = new PerspectiveCamera(50, 1, 0.1, 100000);
  const cameraPosition = new Vector3(0, 0, 3200);

  const spheres: Mesh[] = [];
  const geometry = new SphereGeometry(100, 32, 16);
  const textureCube = new CubeTextureLoader().load([
    parkPx,
    parkNx,
    parkPy,
    parkNy,
    parkPz,
    parkNz,
  ]);
  textureCube.mapping = CubeRefractionMapping;
  const material = new MeshBasicMaterial({
    color: 0xffffff,
    envMap: textureCube,
    refractionRatio: 0.95,
  });
  for (let i = 0; i < 500; i++) {
    const mesh = new Mesh(geometry, material);
    mesh.position.x = Math.random() * 10000 - 5000;
    mesh.position.y = Math.random() * 10000 - 5000;
    mesh.position.z = Math.random() * 10000 - 5000;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
    scene.add(mesh);
    spheres.push(mesh);
  }

  return (
    <StereoGraphicsScene
      scene={scene}
      renderer={renderer}
      stereoEffect={stereoEffect}
      camera={camera}
      cameraPosition={cameraPosition}
      update={(time) => {
        time *= 0.0001;
        for (let i = 0, il = spheres.length; i < il; i++) {
          const sphere = spheres[i];
          sphere.position.x = 5000 * Math.cos(time + i);
          sphere.position.y = 5000 * Math.sin(time + i * 1.1);
        }
      }}
    >
      <Slider
        label="Stereo Camera Eye Separation"
        min="0"
        max="5"
        step="0.01"
        initialValue="0.064"
        onChange={(distance) => {
          stereoEffect.setEyeSeparation(-distance);
        }}
      />
      <Slider
        label="Camera Rotation"
        min="-180"
        max="180"
        step="0.01"
        initialValue="0"
        onChange={(degree) => {
          camera.rotation.y = (Math.PI * degree) / 180;
        }}
      />
    </StereoGraphicsScene>
  );
}
