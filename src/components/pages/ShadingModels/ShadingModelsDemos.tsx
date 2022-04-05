import {
  AmbientLight,
  Color,
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
import GraphicsScene from "../../GraphicsScene/GraphicsScene";
import Slider from "../../GraphicsScene/Slider";
import Checkbox from "../../GraphicsScene/Checkbox";
import ColorPicker from "../../GraphicsScene/ColorPicker";

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
    >
      <ColorPicker
        label="Color"
        initialColor={0xaa8844}
        onChange={(color) => {
          material.color = new Color(color);
        }}
      />
      <Checkbox
        label="Wireframe"
        initialChecked={material.wireframe}
        onChange={(value) => {
          material.wireframe = value;
        }}
      />
    </GraphicsScene>
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
      <ColorPicker
        label="Color"
        initialColor={0xaa8844}
        onChange={(color) => {
          material.color = new Color(color);
        }}
      />
      <Slider
        label="Light Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          lightGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Ambient Light Intensity"
        min="0"
        max="0.5"
        step="0.01"
        initialValue={ambLight.intensity.toString()}
        onChange={(value) => {
          ambLight.intensity = value;
        }}
      />
      <Checkbox
        label="Wireframe"
        initialChecked={material.wireframe}
        onChange={(value) => {
          material.wireframe = value;
        }}
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
      <ColorPicker
        label="Color"
        initialColor={0xaa8844}
        onChange={(color) => {
          material.color = new Color(color);
        }}
      />
      <Slider
        label="Light Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          lightGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Ambient Light Intensity"
        min="0"
        max="0.5"
        step="0.01"
        initialValue={ambLight.intensity.toString()}
        onChange={(value) => {
          ambLight.intensity = value;
        }}
      />
      <Checkbox
        label="Wireframe"
        initialChecked={material.wireframe}
        onChange={(value) => {
          material.wireframe = value;
        }}
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
      <ColorPicker
        label="Color"
        initialColor={0xaa8844}
        onChange={(color) => {
          material.color = new Color(color);
        }}
      />
      <Slider
        label="Shininess"
        min="0"
        max="100"
        initialValue={material.shininess.toString()}
        onChange={(value) => {
          material.shininess = value;
        }}
      />
      <Slider
        label="Light Orbit"
        min="-180"
        max="180"
        onChange={(value) => {
          lightGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Ambient Light Intensity"
        min="0"
        max="0.5"
        step="0.01"
        initialValue={ambLight.intensity.toString()}
        onChange={(value) => {
          ambLight.intensity = value;
        }}
      />
      <Checkbox
        label="Wireframe"
        initialChecked={material.wireframe}
        onChange={(value) => {
          material.wireframe = value;
        }}
      />
    </GraphicsScene>
  );
}
