import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SpotLight,
  Vector3,
} from "three";
import { CSG } from "../../../utils/csg/CSGUtils";
import GraphicsScene from "../../GraphicsScene";
import Slider from "../../Slider";

export default function CSGDemo() {
  const scene = new Scene();
  var light1 = new SpotLight();
  light1.position.set(2.5, 5, 5);
  light1.angle = Math.PI / 4;
  light1.penumbra = 0.5;
  light1.castShadow = true;
  light1.shadow.mapSize.width = 1024;
  light1.shadow.mapSize.height = 1024;
  light1.shadow.camera.near = 0.5;
  light1.shadow.camera.far = 20;
  scene.add(light1);

  var light2 = new SpotLight();
  light2.position.set(-2.5, 5, 5);
  light2.angle = Math.PI / 4;
  light2.penumbra = 0.5;
  light2.castShadow = true;
  light2.shadow.mapSize.width = 1024;
  light2.shadow.mapSize.height = 1024;
  light2.shadow.camera.near = 0.5;
  light2.shadow.camera.far = 20;
  scene.add(light2);

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 10;

  const material = new MeshPhongMaterial({ color: 0xffaabb });
  const meshGroup = new Group();
  scene.add(meshGroup);

  {
    //create a cube and sphere and intersect them
    const cubeMesh = new Mesh(
      new BoxGeometry(2, 2, 2),
      new MeshPhongMaterial({ color: 0xff0000 })
    );
    const sphereMesh = new Mesh(
      new SphereGeometry(1.45, 8, 8),
      new MeshPhongMaterial({ color: 0x0000ff })
    );
    const cylinderMesh1 = new Mesh(
      new CylinderGeometry(0.85, 0.85, 2, 8, 1, false),
      new MeshPhongMaterial({ color: 0x00ff00 })
    );
    const cylinderMesh2 = new Mesh(
      new CylinderGeometry(0.85, 0.85, 2, 8, 1, false),
      new MeshPhongMaterial({ color: 0x00ff00 })
    );
    const cylinderMesh3 = new Mesh(
      new CylinderGeometry(0.85, 0.85, 2, 8, 1, false),
      new MeshPhongMaterial({ color: 0x00ff00 })
    );

    cubeMesh.position.set(-5, 0, -6);
    meshGroup.add(cubeMesh);
    sphereMesh.position.set(-2, 0, -6);
    meshGroup.add(sphereMesh);

    const cubeCSG = CSG.fromMesh(cubeMesh);
    const sphereCSG = CSG.fromMesh(sphereMesh);

    const cubeSphereIntersectCSG = cubeCSG.intersect(sphereCSG);
    const cubeSphereIntersectMesh = CSG.toMesh(
      cubeSphereIntersectCSG,
      new Matrix4()
    );

    cubeSphereIntersectMesh.material = new MeshPhongMaterial({
      color: 0xff00ff,
    });
    cubeSphereIntersectMesh.position.set(-2.5, 0, -3);
    meshGroup.add(cubeSphereIntersectMesh);

    //create 3 cylinders at different rotations and union them
    cylinderMesh1.position.set(1, 0, -6);
    meshGroup.add(cylinderMesh1);
    cylinderMesh2.position.set(3, 0, -6);
    cylinderMesh2.geometry.rotateX(Math.PI / 2);
    meshGroup.add(cylinderMesh2);
    cylinderMesh3.position.set(5, 0, -6);
    cylinderMesh3.geometry.rotateZ(Math.PI / 2);
    meshGroup.add(cylinderMesh3);

    const cylinderCSG1 = CSG.fromMesh(cylinderMesh1);
    const cylinderCSG2 = CSG.fromMesh(cylinderMesh2);
    const cylinderCSG3 = CSG.fromMesh(cylinderMesh3);

    const cylindersUnionCSG = cylinderCSG1.union(
      cylinderCSG2.union(cylinderCSG3)
    );
    const cylindersUnionMesh = CSG.toMesh(cylindersUnionCSG, new Matrix4());

    cylindersUnionMesh.material = new MeshPhongMaterial({
      color: 0xffa500,
    });
    cylindersUnionMesh.position.set(2.5, 0, -3);
    meshGroup.add(cylindersUnionMesh);

    //subtract the cylindersUnionCSG from the cubeSphereIntersectCSG
    const finalCSG = cubeSphereIntersectCSG.subtract(cylindersUnionCSG);
    const finalMesh = CSG.toMesh(finalCSG, new Matrix4());
    finalMesh.material = material;
    meshGroup.add(finalMesh);
  }
  return (
    <GraphicsScene scene={scene} cameraPosition={new Vector3(0, 0, 5)}>
      <Slider
        label="Orbit Angle"
        min="0"
        max="360"
        onChange={(value) => {
          meshGroup.rotation.y = (value * Math.PI) / 180;
        }}
      />
    </GraphicsScene>
  );
}
