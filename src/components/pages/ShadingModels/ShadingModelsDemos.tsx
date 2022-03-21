import {
  AmbientLight,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Scene,
  SphereGeometry,
  Vector3,
} from "three";
import GraphicsScene from "../../GraphicsScene";
import Slider from "../../Slider";
import Checkbox from "../../Checkbox";

export function UnshadedDemo() {
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

export function FlatShadingDemo() {
  const scene = new Scene();

  const lightGroup = new Group();
  const color = 0xffffff;
  const light = new DirectionalLight(color, 1.5);
  light.position.set(-1, 2, 4);
  lightGroup.add(light);
  scene.add(lightGroup);
  const ambLight = new AmbientLight(color, 0.5);
  scene.add(ambLight);

  const radius = 1;
  const widthSegments = 16;
  const heightSegments = 16;
  const geometry = new SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  ).toNonIndexed();
  geometry.computeVertexNormals();
  const material = new MeshLambertMaterial({ color: 0xaa8844 });

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
      <Slider
        label="Light Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          lightGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Checkbox
        label="Ambient Light"
        onChange={(value) => {
          ambLight.visible = value;
        }}
        initialChecked={true}
      />
    </GraphicsScene>
  );
}

export function GouraudShadingDemo() {
  const scene = new Scene();

  const lightGroup = new Group();
  const color = 0xffffff;
  const intensity = 1.5;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  lightGroup.add(light);
  scene.add(lightGroup);
  const ambLight = new AmbientLight(color, 0.5);
  scene.add(ambLight);

  const radius = 1;
  const widthSegments = 16;
  const heightSegments = 16;
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshLambertMaterial({ color: 0xaa8844 });

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
      <Slider
        label="Light Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          lightGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Checkbox
        label="Ambient Light"
        onChange={(value) => {
          ambLight.visible = value;
        }}
        initialChecked={true}
      />
    </GraphicsScene>
  );
}

export function PhongShadingDemo() {
  const scene = new Scene();

  const lightGroup = new Group();
  const color = 0xffffff;
  const intensity = 1.5;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  lightGroup.add(light);
  scene.add(lightGroup);
  const ambLight = new AmbientLight(color, 0.5);
  scene.add(ambLight);

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
      <Slider
        label="Light Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          lightGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Checkbox
        label="Ambient Light"
        onChange={(value) => {
          ambLight.visible = value;
        }}
        initialChecked={true}
      />
    </GraphicsScene>
  );
}
