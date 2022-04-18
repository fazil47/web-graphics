import {
  BoxGeometry,
  Euler,
  Group,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector2,
  Vector3,
  PointLight,
  RectAreaLight,
  TorusKnotGeometry,
} from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";

import GraphicsScene from "../../graphics/GraphicsScene";
import ColorPicker from "../../graphics/controls/ColorPicker";

// Mossy bark texture maps
import mossyBarkBase from "../../../textures/MossyBark/MossyBark02_1K_BaseColor.png";
import mossyBarkNormal from "../../../textures/MossyBark/MossyBark02_1K_Normal.png";
import mossyBarkRoughness from "../../../textures/MossyBark/MossyBark02_1K_Roughness.png";
import mossyBarkAO from "../../../textures/MossyBark/MossyBark02_1K_AO.png";

// Parquet Flooring texture maps
import parquetFlooringBase from "../../../textures/ParquetFlooring/ParquetFlooring04_1K_BaseColor.png";
import parquetFlooringNormal from "../../../textures/ParquetFlooring/ParquetFlooring04_1K_Normal.png";
import parquetFlooringRoughness from "../../../textures/ParquetFlooring/ParquetFlooring04_1K_Roughness.png";
import parquetFlooringAO from "../../../textures/ParquetFlooring/ParquetFlooring04_1K_AO.png";
import Slider from "../../graphics/controls/Slider";

export function ShadowDemo() {
  const scene = new Scene();

  const light = new PointLight(0xffffff, 6, 10, 2);
  light.castShadow = true;
  const lightBulb = new Group();
  lightBulb.add(light);
  const lightBulbMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });
  lightBulb.add(new Mesh(new SphereGeometry(0.03, 8, 8), lightBulbMaterial));
  lightBulb.position.set(2.4, 1.5, 0);
  const lightGroup = new Group();
  lightGroup.add(lightBulb);
  scene.add(lightGroup);

  const base = new TextureLoader().load(mossyBarkBase);
  base.wrapS = base.wrapT = RepeatWrapping;
  const normal = new TextureLoader().load(mossyBarkNormal);
  normal.wrapS = normal.wrapT = RepeatWrapping;
  const roughness = new TextureLoader().load(mossyBarkRoughness);
  roughness.wrapS = roughness.wrapT = RepeatWrapping;
  const ao = new TextureLoader().load(mossyBarkAO);
  ao.wrapS = ao.wrapT = RepeatWrapping;

  const material = new MeshStandardMaterial({ color: 0xffffff });
  material.map = base;
  material.normalMap = normal;
  material.roughnessMap = roughness;
  material.roughness = 0.6;
  material.aoMap = ao;

  const floorBase = new TextureLoader().load(parquetFlooringBase);
  const floorNormal = new TextureLoader().load(parquetFlooringNormal);
  const floorRoughness = new TextureLoader().load(parquetFlooringRoughness);
  const floorAO = new TextureLoader().load(parquetFlooringAO);
  floorBase.repeat = new Vector2(12, 12);
  floorBase.wrapS = floorBase.wrapT = RepeatWrapping;
  floorNormal.repeat = new Vector2(12, 12);
  floorNormal.wrapS = floorNormal.wrapT = RepeatWrapping;
  floorRoughness.repeat = new Vector2(12, 12);
  floorRoughness.wrapS = floorRoughness.wrapT = RepeatWrapping;
  floorAO.repeat = new Vector2(12, 12);
  floorAO.wrapS = floorAO.wrapT = RepeatWrapping;

  const floorMaterial = new MeshStandardMaterial({ color: 0xffffff });
  floorMaterial.map = floorBase;
  floorMaterial.normalMap = floorNormal;
  floorMaterial.roughnessMap = floorRoughness;
  floorMaterial.aoMap = floorAO;

  const cube = new Mesh(new BoxGeometry(1, 1, 1), material);
  scene.add(cube);
  cube.castShadow = true;
  cube.position.set(-1, 0, 0);
  const sphere = new Mesh(new SphereGeometry(0.5, 32, 32), floorMaterial);
  scene.add(sphere);
  sphere.castShadow = true;
  sphere.position.set(1, 0, 0);

  const floor = new Mesh(new BoxGeometry(50, 0.2, 50), floorMaterial);
  floor.position.y = -1;
  floor.receiveShadow = true;
  scene.add(floor);

  return (
    <GraphicsScene
      scene={scene}
      cameraPosition={new Vector3(0, 2, 5)}
      cameraRotation={new Euler(-Math.PI / 6, 0, 0)}
      enableShadows
      note="It might take some time for the textures to load."
    >
      <ColorPicker
        label="Light Color"
        initialColor={light.color}
        onChange={(color) => {
          light.color.setHex(color.getHex());
          lightBulbMaterial.color.setHex(color.getHex());
          lightBulbMaterial.emissive.setHex(color.getHex());
        }}
      />
      <Slider
        label="Shadow Radius"
        min="1"
        max="20"
        initialValue="1"
        onChange={(value) => {
          light.shadow.radius = value;
        }}
      />
      <Slider
        label="Light Orbit"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          lightGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function ReflectionDemo() {
  const scene = new Scene();

  RectAreaLightUniformsLib.init();

  const rectLight1 = new RectAreaLight(0x118407, 5, 4, 10);
  rectLight1.position.set(-5, 5, 5);
  scene.add(rectLight1);

  const rectLight2 = new RectAreaLight(0xffffff, 5, 4, 10);
  rectLight2.position.set(0, 5, 5);
  scene.add(rectLight2);

  const rectLight3 = new RectAreaLight(0xf79431, 5, 4, 10);
  rectLight3.position.set(5, 5, 5);
  scene.add(rectLight3);

  scene.add(new RectAreaLightHelper(rectLight1));
  scene.add(new RectAreaLightHelper(rectLight2));
  scene.add(new RectAreaLightHelper(rectLight3));

  const geoFloor = new BoxGeometry(2000, 0.1, 2000);
  const matStdFloor = new MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.1,
    metalness: 0,
  });
  const mshStdFloor = new Mesh(geoFloor, matStdFloor);
  scene.add(mshStdFloor);

  const geoKnot = new TorusKnotGeometry(1.5, 0.5, 200, 16);
  const matKnot = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0,
  });
  const meshKnot = new Mesh(geoKnot, matKnot);
  meshKnot.name = "meshKnot";
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  return (
    <GraphicsScene
      scene={scene}
      cameraPosition={new Vector3(12, 5, -4)}
      cameraRotation={new Euler(0, (2 / 3) * Math.PI, 0)}
    >
      <Slider
        label="Roughness"
        min="0"
        max="1"
        step="0.01"
        initialValue={matKnot.roughness.toString()}
        onChange={(value) => {
          matKnot.roughness = value;
          matStdFloor.roughness = value;
        }}
      />
      <Slider
        label="Light Rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          rectLight1.rotation.y = (value * Math.PI) / 180;
          rectLight2.rotation.y = (value * Math.PI) / 180;
          rectLight3.rotation.y = (value * Math.PI) / 180;
        }}
      />
      <Slider
        label="Mesh Rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          meshKnot.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
