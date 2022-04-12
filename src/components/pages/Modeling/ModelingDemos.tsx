import {
  AmbientLight,
  BoxGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Scene,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { CSG } from "../../../utils/csg/CSGUtils";
import GraphicsScene, { CameraType } from "../../graphics/GraphicsScene";
import Slider from "../../graphics/controls/Slider";
import Dropdown from "../../graphics/controls/Dropdown";
import Checkbox from "../../graphics/controls/Checkbox";

export function CSGDemo() {
  const scene = new Scene();
  const light = new DirectionalLight(0xffffff, 0.6);
  light.position.set(-1, 2, 4);
  scene.add(light);
  scene.add(new AmbientLight(0xffffff, 0.4));

  const redMaterial = new MeshStandardMaterial({ color: 0xf1365c });
  const greenMaterial = new MeshStandardMaterial({ color: 0xaaffa2 });
  const yellowMaterial = new MeshStandardMaterial({ color: 0xf1c40f });
  redMaterial.metalness = 0.0;
  redMaterial.roughness = 1.0;
  greenMaterial.metalness = 0.0;
  greenMaterial.roughness = 1.0;
  yellowMaterial.metalness = 0.0;
  yellowMaterial.roughness = 1.0;

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
    mesh1.rotation.set(0, 0, 0);
    mesh1.rotateOnWorldAxis(new Vector3(1, 0, 0), Math.PI / 4);
    mesh1.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI / 4);
    mesh2.rotation.set(0, 0, 0);
    mesh2.rotateOnWorldAxis(new Vector3(1, 0, 0), Math.PI / 4);
    mesh2.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI / 4);

    resultantMeshGroup.clear();
    resultantMeshGroup.add(resultantMesh);
    resultantMesh.rotateOnWorldAxis(new Vector3(1, 0, 0), Math.PI / 4);
    resultantMesh.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI / 4);
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
      <Checkbox
        label="Show Wireframes"
        initialChecked={false}
        onChange={(value) => {
          redMaterial.wireframe = value;
          greenMaterial.wireframe = value;
          yellowMaterial.wireframe = value;
        }}
      />
      <Slider
        label="Rotation Angle"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          inputMeshGroup.rotation.y = (value * Math.PI) / 180;
          resultantMeshGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}

export function SweepRepresentationDemo() {
  const scene = new Scene();

  const light = new DirectionalLight(0xffffff, 1);
  light.rotateY(Math.PI / 6);
  light.position.set(1, 0, 1);
  scene.add(light);
  scene.add(new AmbientLight(0xffffff, 0.5));

  function circlePointsArray(radius: number, numPoints: number) {
    const circlePoints: Vector3[] = [];
    for (let i = 0; i < numPoints; i++) {
      circlePoints.push(
        new Vector3(
          Math.cos((i * Math.PI) / 180) * radius,
          Math.sin((i * Math.PI) / 180) * radius,
          0
        )
      );
    }
    return circlePoints;
  }

  function newMesh(numPoints: number) {
    const circlePoints = circlePointsArray(2, numPoints);
    const extrudePath = new CatmullRomCurve3(circlePoints);
    const geometry = new TubeGeometry(extrudePath, 100, 0.5, 50, false);
    const material = new MeshStandardMaterial({ color: 0x00ff00 });
    material.side = DoubleSide;
    material.metalness = 0.7;
    material.roughness = 0.7;
    return new Mesh(geometry, material);
  }

  let mesh = newMesh(2);
  const meshGroup = new Group();
  scene.add(meshGroup);
  meshGroup.add(mesh);
  meshGroup.position.set(0, 0, -5);
  meshGroup.rotation.set(Math.PI / 6, 0, 0);

  return (
    <GraphicsScene scene={scene}>
      <Slider
        label="Angle"
        min="0"
        max="360"
        step="1"
        initialValue="0"
        onChange={(value) => {
          mesh = newMesh(value + 2);
          meshGroup.clear();
          meshGroup.add(mesh);
        }}
      />
      <Slider
        label="Rotation"
        min="-180"
        max="180"
        initialValue="0"
        onChange={(value) => {
          meshGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
