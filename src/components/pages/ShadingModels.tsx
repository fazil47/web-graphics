import {
  BufferGeometry,
  DirectionalLight,
  Material,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
} from "three";

import Page from "../Page";
import Quiz from "../Quiz";

import GraphicsScene from "../GraphicsScene";

export default function ShadingModels() {
  const quizInfo1 = {
    question: "Question?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answerIndex: 0,
  };

  // const fov = 75;
  // const aspect = 2; // the canvas default
  // const near = 0.1;
  // const far = 5;

  // const gouraudCamera = new PerspectiveCamera(fov, aspect, near, far);
  // const gouraudScene = new Scene();

  // const phongCamera = new PerspectiveCamera(fov, aspect, near, far);
  // const phongScene = new Scene();

  // {
  //   const color = 0xffffff;
  //   const intensity = 1;
  //   const light = new DirectionalLight(color, intensity);
  //   light.position.set(-1, 2, 4);
  //   gouraudScene.add(light);
  //   phongScene.add(light);
  // }

  // const sphereRadius = 1;
  // const sphereWidthSegments = 16;
  // const sphereHeightSegments = 16;
  // const sphereGeometry = new SphereGeometry(
  //   sphereRadius,
  //   sphereWidthSegments,
  //   sphereHeightSegments
  // );

  // function makeMeshInstance({
  //   geometry,
  //   material,
  //   x = 0,
  //   y = 0,
  //   z = 0,
  // }: {
  //   geometry: BufferGeometry;
  //   material: Material;
  //   x?: number;
  //   y?: number;
  //   z?: number;
  // }) {
  //   const mesh = new Mesh(geometry, material);
  //   mesh.position.set(x, y, z);
  //   return mesh;
  // }

  // const gouraudMaterial = new MeshLambertMaterial({ color: 0xffffff });
  // const gouraudSphereMesh = makeMeshInstance({
  //   geometry: sphereGeometry,
  //   material: gouraudMaterial,
  // });
  // gouraudScene.add(gouraudSphereMesh);

  // const phongMaterial = new MeshPhongMaterial({ color: 0xffffff });
  // const phongSphereMesh = makeMeshInstance({
  //   geometry: sphereGeometry,
  //   material: phongMaterial,
  // });
  // phongScene.add(phongSphereMesh);

  return (
    <Page pageName="shading_models">
      <h1>Shading Models</h1>
      <GraphicsScene />
      {/* <h1>Gouraud Shading</h1>
      <TempGraphicsGouraud />
      <h1>Phong Shading</h1>
      <TempGraphicsPhong /> */}
      <Quiz quizInfo={quizInfo1} />
    </Page>
  );
}
