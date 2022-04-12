import {
  AmbientLight,
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";

import GraphicsScene from "../../graphics/GraphicsScene";
import Slider from "../../graphics/controls/Slider";

// Mossy bark texture maps
import mossyBarkBase from "../../../textures/MossyBark/MossyBark02_1K_BaseColor.png";
import mossyBarkNormal from "../../../textures/MossyBark/MossyBark02_1K_Normal.png";
import mossyBarkRoughness from "../../../textures/MossyBark/MossyBark02_1K_Roughness.png";

// Parquet Flooring texture maps
import parquetFlooringBase from "../../../textures/ParquetFlooring/ParquetFlooring04_1K_BaseColor.png";
import parquetFlooringNormal from "../../../textures/ParquetFlooring/ParquetFlooring04_1K_Normal.png";
import parquetFlooringRoughness from "../../../textures/ParquetFlooring/ParquetFlooring04_1K_Roughness.png";

export function TextureUVDemo() {
  const scene = new Scene();
  const light = new PointLight(0xffffff, 1.5);
  light.position.set(-1, 2, 2);
  scene.add(light);
  scene.add(new AmbientLight(0xffffff, 0.6));

  const base = new TextureLoader().load(parquetFlooringBase);
  base.wrapS = base.wrapT = RepeatWrapping;
  const normal = new TextureLoader().load(parquetFlooringNormal);
  normal.wrapS = normal.wrapT = RepeatWrapping;
  const roughness = new TextureLoader().load(parquetFlooringRoughness);
  roughness.wrapS = roughness.wrapT = RepeatWrapping;

  const material = new MeshStandardMaterial({ color: 0xffffff });
  material.map = base;
  material.normalMap = normal;
  material.roughnessMap = roughness;

  const mesh = new Mesh(new BoxGeometry(2, 2, 2), material);
  scene.add(mesh);

  return (
    <GraphicsScene scene={scene}>
      <Slider
        label="U Offset"
        min="0"
        max="1"
        step="0.01"
        initialValue="0"
        onChange={(value) => {
          value *= -1;
          material.map?.offset.set(value, material.map?.offset.y);
          material.normalMap?.offset.set(value, material.normalMap?.offset.y);
          material.roughnessMap?.offset.set(
            value,
            material.roughnessMap?.offset.y
          );
        }}
      />
      <Slider
        label="V Offset"
        min="0"
        max="1"
        step="0.01"
        initialValue="0"
        onChange={(value) => {
          value *= -1;
          material.map?.offset.set(material.map?.offset.x, value);
          material.normalMap?.offset.set(material.normalMap?.offset.x, value);
          material.roughnessMap?.offset.set(
            material.roughnessMap?.offset.x,
            value
          );
        }}
      />
      <Slider
        label="X Rotation"
        min="-180"
        max="180"
        step="1"
        initialValue="0"
        onChange={(value) => {
          mesh.rotation.x = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Y Rotation"
        min="-180"
        max="180"
        step="1"
        initialValue="0"
        onChange={(value) => {
          mesh.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function CombinedTextureDemo() {
  const scene = new Scene();
  const light = new PointLight(0xffffff, 1);
  const lightBulb = new Group();
  lightBulb.add(light);
  lightBulb.add(
    new Mesh(
      new SphereGeometry(0.03, 8, 8),
      new MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff })
    )
  );
  scene.add(lightBulb);

  const base = new TextureLoader().load(mossyBarkBase);
  const normal = new TextureLoader().load(mossyBarkNormal);
  const roughness = new TextureLoader().load(mossyBarkRoughness);

  const material = new MeshStandardMaterial({ color: 0xffffff });
  material.map = base;
  material.normalMap = normal;
  material.roughnessMap = roughness;

  const mesh = new Mesh(new BoxGeometry(1, 1, 1), material);
  scene.add(mesh);

  return (
    <GraphicsScene
      scene={scene}
      update={(time) => {
        time *= 0.001;
        lightBulb.position.x = Math.sin(time) * 0.8;
        lightBulb.position.y = Math.cos(time) * 0.8;
        lightBulb.position.z = Math.sin(time) * Math.cos(time) * 0.1 + 1;
      }}
      cameraPosition={new Vector3(0, 0, 3)}
    >
      <Slider
        label="Normal Map Scale"
        min="0"
        max="1"
        step="0.01"
        initialValue={material.normalScale.x.toString()}
        onChange={(value) => {
          material.normalScale = new Vector2(value, value);
        }}
      />
      <Slider
        label="Roughness"
        min="0"
        max="1"
        step="0.01"
        initialValue={material.roughness.toString()}
        onChange={(value) => {
          material.roughness = value;
        }}
      />
    </GraphicsScene>
  );
}

export function DecalDemo() {
  const scene = new Scene();
  const light = new PointLight(0xffffff, 1);
  light.position.set(-1, 2, 2);
  scene.add(light);

  const base = new TextureLoader().load(mossyBarkBase);
  const normal = new TextureLoader().load(mossyBarkNormal);
  const roughness = new TextureLoader().load(mossyBarkRoughness);

  const material = new MeshStandardMaterial({ color: 0xffffff });
  material.map = base;
  material.normalMap = normal;
  material.roughnessMap = roughness;

  const mesh = new Mesh(new BoxGeometry(1, 1, 1), material);
  scene.add(mesh);

  return (
    <GraphicsScene scene={scene} cameraPosition={new Vector3(0, 0, 2)}>
      <Slider
        label="X Rotation"
        min="-180"
        max="180"
        step="1"
        initialValue="0"
        onChange={(value) => {
          mesh.rotation.x = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Y Rotation"
        min="-180"
        max="180"
        step="1"
        initialValue="0"
        onChange={(value) => {
          mesh.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
