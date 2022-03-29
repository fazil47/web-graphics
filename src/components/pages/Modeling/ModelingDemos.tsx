import {
  AmbientLight,
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Scene,
  SphereGeometry,
  Vector3,
} from "three";
import { CSG } from "../../../utils/csg/CSGUtils";
import GraphicsScene, { CameraType } from "../../GraphicsScene/GraphicsScene";
import Slider from "../../GraphicsScene/Slider";
import Dropdown from "../../GraphicsScene/Dropdown";

export function CSGDemo() {
  const scene = new Scene();
  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(-1, 2, 4);
  scene.add(light);
  scene.add(new AmbientLight(0xf0f0f0, 0.5));

  const redMaterial = new MeshStandardMaterial({ color: 0xf1365c });
  const greenMaterial = new MeshStandardMaterial({ color: 0xaaffa2 });
  const yellowMaterial = new MeshStandardMaterial({ color: 0xf1c40f });
  redMaterial.metalness = 0.8;
  redMaterial.roughness = 0.8;
  greenMaterial.metalness = 0.8;
  greenMaterial.roughness = 0.8;
  yellowMaterial.metalness = 0.8;
  yellowMaterial.roughness = 0.8;

  const inputMeshGroup = new Group();
  const resultantMeshGroup = new Group();
  scene.add(inputMeshGroup);
  scene.add(resultantMeshGroup);
  inputMeshGroup.position.set(-0.8, 0, 0);
  resultantMeshGroup.position.set(0.8, 0, 0);

  let mesh1: Mesh = new Mesh(new BoxGeometry(0.8, 0.8, 0.8), redMaterial);
  let mesh2: Mesh = new Mesh(new SphereGeometry(0.56, 16, 16), greenMaterial);
  let csgOperation = "union";
  let mesh1CSG = CSG.fromMesh(mesh1);
  let mesh2CSG = CSG.fromMesh(mesh2);

  const getMesh = (meshType: string, material: MeshStandardMaterial): Mesh => {
    switch (meshType) {
      case "sphere":
        return new Mesh(new SphereGeometry(0.56, 16, 16), material);
      case "cylinder":
        return new Mesh(
          new CylinderGeometry(0.56, 0.56, 0.8, 16, 16),
          material
        );
      default:
        return new Mesh(new BoxGeometry(0.8, 0.8, 0.8), material);
    }
  };

  const remakeCSGMesh = ({
    operation,
    mesh1Type,
    mesh2Type,
  }: {
    operation?: string;
    mesh1Type?: string;
    mesh2Type?: string;
  }) => {
    if (operation) {
      csgOperation = operation;
    }
    if (mesh1Type) {
      mesh1 = getMesh(mesh1Type, redMaterial);
      mesh1CSG = CSG.fromMesh(mesh1);
    }
    if (mesh2Type) {
      mesh2 = getMesh(mesh2Type, greenMaterial);
      mesh2CSG = CSG.fromMesh(mesh2);
    }
    let resultantMesh;
    switch (csgOperation) {
      case "intersection":
        resultantMesh = CSG.toMesh(
          mesh1CSG.intersect(mesh2CSG),
          new Matrix4(),
          yellowMaterial
        );
        break;
      case "subtraction":
        resultantMesh = CSG.toMesh(
          mesh1CSG.subtract(mesh2CSG),
          new Matrix4(),
          yellowMaterial
        );
        break;
      default:
        resultantMesh = CSG.toMesh(
          mesh1CSG.union(mesh2CSG),
          new Matrix4(),
          yellowMaterial
        );
    }
    inputMeshGroup.clear();
    inputMeshGroup.add(mesh1);
    inputMeshGroup.add(mesh2);
    mesh1.position.set(0, 0.8, 0);
    mesh2.position.set(0, -0.8, 0);
    mesh1.rotation.set(45, 0, 0);
    mesh2.rotation.set(45, 0, 0);
    resultantMesh.rotation.set(45, 0, 0);
    resultantMeshGroup.clear();
    resultantMeshGroup.add(resultantMesh);
  };
  remakeCSGMesh({});

  return (
    <GraphicsScene
      scene={scene}
      cameraType={CameraType.Orthographic}
      orthographicCameraScale={0.01}
      cameraPosition={new Vector3(0, 0, 1)}
    >
      <Dropdown
        label="Mesh #1"
        initialSelection="cube"
        options={[
          { label: "Cube", value: "cube" },
          { label: "Sphere", value: "sphere" },
          { label: "Cylinder", value: "cylinder" },
        ]}
        onChange={(value) => {
          remakeCSGMesh({ mesh1Type: value });
        }}
      />
      <Dropdown
        label="CSG Operation"
        initialSelection="union"
        options={[
          { label: "Union", value: "union" },
          { label: "Intersection", value: "intersection" },
          { label: "Subtraction", value: "subtraction" },
        ]}
        onChange={(value) => {
          remakeCSGMesh({ operation: value });
        }}
      />
      <Dropdown
        label="Mesh #2"
        initialSelection="sphere"
        options={[
          { label: "Cube", value: "cube" },
          { label: "Sphere", value: "sphere" },
          { label: "Cylinder", value: "cylinder" },
        ]}
        onChange={(value) => {
          remakeCSGMesh({ mesh2Type: value });
        }}
      />
      <Slider
        label="Rotate Angle"
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
