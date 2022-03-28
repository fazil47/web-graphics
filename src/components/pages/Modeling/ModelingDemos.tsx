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
import GraphicsScene from "../../GraphicsScene/GraphicsScene";
import Slider from "../../GraphicsScene/Slider";
import Dropdown from "../../GraphicsScene/Dropdown";

export function CSGDemo() {
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

  const inputMeshGroup = new Group();
  const resultantMeshGroup = new Group();
  scene.add(inputMeshGroup);
  scene.add(resultantMeshGroup);
  inputMeshGroup.position.set(-2, 0, 0);
  resultantMeshGroup.position.set(2, 0, 0);

  const cubeMesh = new Mesh(new BoxGeometry(0.8, 0.8, 0.8), redMaterial);
  const sphereMesh = new Mesh(new SphereGeometry(0.56, 16, 16), greenMaterial);

  inputMeshGroup.add(cubeMesh);
  inputMeshGroup.add(sphereMesh);
  cubeMesh.position.set(0, 1, 0);
  sphereMesh.position.set(0, -1, 0);

  const cubeCSG = CSG.fromMesh(cubeMesh);
  const sphereCSG = CSG.fromMesh(sphereMesh);
  const remakeCSGMesh = (operation: string) => {
    let mesh;
    switch (operation) {
      case "intersection":
        mesh = CSG.toMesh(
          cubeCSG.intersect(sphereCSG),
          new Matrix4(),
          yellowMaterial
        );
        break;
      case "subtraction":
        mesh = CSG.toMesh(
          cubeCSG.subtract(sphereCSG),
          new Matrix4(),
          yellowMaterial
        );
        break;
      default:
        mesh = CSG.toMesh(
          cubeCSG.union(sphereCSG),
          new Matrix4(),
          yellowMaterial
        );
    }
    resultantMeshGroup.clear();
    resultantMeshGroup.add(mesh);
  };

  return (
    <GraphicsScene scene={scene} cameraPosition={new Vector3(0, 0, 5)}>
      <Dropdown
        label="CSG Operation"
        options={[
          { label: "Union", value: "union" },
          { label: "Intersection", value: "intersection" },
          { label: "Subtraction", value: "subtraction" },
        ]}
        onChange={(value) => {
          remakeCSGMesh(value);
        }}
      />
      <Slider
        label="Orbit Angle"
        min="-180"
        max="180"
        onChange={(value) => {
          inputMeshGroup.rotation.y = (value * Math.PI) / 180;
          resultantMeshGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
