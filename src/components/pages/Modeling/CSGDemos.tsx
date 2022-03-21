import {
  BoxGeometry,
  DirectionalLight,
  Group,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  Scene,
  SphereGeometry,
  Vector3,
} from "three";
import { CSG } from "../../../utils/csg/CSGUtils";
import GraphicsScene from "../../GraphicsScene";
import Slider from "../../Slider";

export function CubeUnionSphere() {
  const scene = new Scene();
  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const redMaterial = new MeshPhongMaterial({ color: 0xf1365c });
  const greenMaterial = new MeshPhongMaterial({ color: 0xaaffa2 });
  const yellowMaterial = new MeshPhongMaterial({ color: 0xf1c40f });
  redMaterial.specular.setRGB(0.1, 0.1, 0.1);
  greenMaterial.specular.setRGB(0.1, 0.1, 0.1);
  yellowMaterial.specular.setRGB(0.1, 0.1, 0.1);
  const meshGroup = new Group();
  scene.add(meshGroup);

  const cubeMesh = new Mesh(new BoxGeometry(1, 1, 1), redMaterial);
  const sphereMesh = new Mesh(new SphereGeometry(0.7, 16, 16), greenMaterial);

  cubeMesh.position.set(-2, 0, 0);
  meshGroup.add(cubeMesh);
  sphereMesh.position.set(2, 0, 0);
  meshGroup.add(sphereMesh);

  const cubeCSG = CSG.fromMesh(cubeMesh);
  const sphereCSG = CSG.fromMesh(sphereMesh);
  const cubeUnionSphereCSG = cubeCSG.union(sphereCSG);
  const cubeUnionSphereMesh = CSG.toMesh(
    cubeUnionSphereCSG,
    new Matrix4(),
    yellowMaterial
  );
  meshGroup.add(cubeUnionSphereMesh);

  return (
    <GraphicsScene
      scene={scene}
      cameraPosition={new Vector3(0, 0, 5)}
      update={(time) => {
        time *= 0.001;
        cubeUnionSphereMesh.rotation.x = time;
        cubeUnionSphereMesh.rotation.y = time;
      }}
    >
      <Slider
        label="Orbit Angle"
        min="-180"
        max="180"
        onChange={(value) => {
          meshGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function CubeIntersectSphere() {
  const scene = new Scene();
  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const redMaterial = new MeshPhongMaterial({ color: 0xf1365c });
  const greenMaterial = new MeshPhongMaterial({ color: 0xaaffa2 });
  const yellowMaterial = new MeshPhongMaterial({ color: 0xf1c40f });
  redMaterial.specular.setRGB(0.1, 0.1, 0.1);
  greenMaterial.specular.setRGB(0.1, 0.1, 0.1);
  yellowMaterial.specular.setRGB(0.1, 0.1, 0.1);
  const meshGroup = new Group();
  scene.add(meshGroup);

  const cubeMesh = new Mesh(new BoxGeometry(1, 1, 1), redMaterial);
  const sphereMesh = new Mesh(new SphereGeometry(0.7, 16, 16), greenMaterial);

  cubeMesh.position.set(-2, 0, 0);
  meshGroup.add(cubeMesh);
  sphereMesh.position.set(2, 0, 0);
  meshGroup.add(sphereMesh);

  const cubeCSG = CSG.fromMesh(cubeMesh);
  const sphereCSG = CSG.fromMesh(sphereMesh);
  const cubeIntersectSphereCSG = cubeCSG.intersect(sphereCSG);
  const cubeIntersectSphereMesh = CSG.toMesh(
    cubeIntersectSphereCSG,
    new Matrix4(),
    yellowMaterial
  );
  meshGroup.add(cubeIntersectSphereMesh);

  return (
    <GraphicsScene
      scene={scene}
      cameraPosition={new Vector3(0, 0, 5)}
      update={(time) => {
        time *= 0.001;
        cubeIntersectSphereMesh.rotation.x = time;
        cubeIntersectSphereMesh.rotation.y = time;
      }}
    >
      <Slider
        label="Orbit Angle"
        min="-180"
        max="180"
        onChange={(value) => {
          meshGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function CubeSubtractSphere() {
  const scene = new Scene();
  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const redMaterial = new MeshPhongMaterial({ color: 0xf1365c });
  const greenMaterial = new MeshPhongMaterial({ color: 0xaaffa2 });
  const yellowMaterial = new MeshPhongMaterial({ color: 0xf1c40f });
  redMaterial.specular.setRGB(0.1, 0.1, 0.1);
  greenMaterial.specular.setRGB(0.1, 0.1, 0.1);
  yellowMaterial.specular.setRGB(0.1, 0.1, 0.1);
  const meshGroup = new Group();
  scene.add(meshGroup);

  const cubeMesh = new Mesh(new BoxGeometry(1, 1, 1), redMaterial);
  const sphereMesh = new Mesh(new SphereGeometry(0.7, 16, 16), greenMaterial);

  cubeMesh.position.set(-2, 0, 0);
  meshGroup.add(cubeMesh);
  sphereMesh.position.set(2, 0, 0);
  meshGroup.add(sphereMesh);

  const cubeCSG = CSG.fromMesh(cubeMesh);
  const sphereCSG = CSG.fromMesh(sphereMesh);
  const cubeSubtractSphereCSG = cubeCSG.subtract(sphereCSG);
  const cubeSubtractSphereMesh = CSG.toMesh(
    cubeSubtractSphereCSG,
    new Matrix4(),
    yellowMaterial
  );
  meshGroup.add(cubeSubtractSphereMesh);

  return (
    <GraphicsScene
      scene={scene}
      cameraPosition={new Vector3(0, 0, 5)}
      update={(time) => {
        time *= 0.001;
        cubeSubtractSphereMesh.rotation.x = time;
        cubeSubtractSphereMesh.rotation.y = time;
      }}
    >
      <Slider
        label="Orbit Angle"
        min="-180"
        max="180"
        onChange={(value) => {
          meshGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
