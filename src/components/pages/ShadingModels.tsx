// import {
//   DirectionalLight,
//   Material,
//   Mesh,
//   MeshBasicMaterial,
//   MeshLambertMaterial,
//   MeshPhongMaterial,
//   Scene,
//   SphereGeometry,
//   Vector3,
// } from "three";

import Page from "../Page";
import Quiz from "../Quiz";
// import GraphicsScene from "../GraphicsScene";

import PhongShadingDemo from "../demos/PhongShadingDemo";
import UnshadedDemo from "../demos/UnshadedDemo";
import GouraudShadingDemo from "../demos/GouraudShadingDemo";
import FlatShadingDemo from "../demos/FlatShadingDemo";

export default function ShadingModels() {
  const quizInfo1 = {
    question: "Using which shading model can you get highlights?",
    options: ["Gouraud Shading", "Phong Shading", "Flat Shading"],
    answerIndex: 1,
  };

  // const scene = new Scene();

  // {
  //   const color = 0xffffff;
  //   const intensity = 1.5;
  //   const light = new DirectionalLight(color, intensity);
  //   light.position.set(-1, 2, 4);
  //   scene.add(light);
  // }

  // const radius = 1;
  // const widthSegments = 16;
  // const heightSegments = 16;
  // const geometry = new SphereGeometry(radius, widthSegments, heightSegments);

  // function makeSphereMesh(geometry: any, material: Material, x: number) {
  //   const sphere = new Mesh(geometry, material);
  //   scene.add(sphere);
  //   sphere.position.x = x;
  //   sphere.position.z = -3;
  //   return sphere;
  // }

  // const spheres = [
  //   makeSphereMesh(geometry, new MeshBasicMaterial({ color: 0x44aa88 }), 0),
  //   makeSphereMesh(
  //     geometry,
  //     new MeshLambertMaterial({ color: 0x8844aa }),
  //     -2.5
  //   ),
  //   makeSphereMesh(geometry, new MeshPhongMaterial({ color: 0xaa8844 }), 2.5),
  // ];

  return (
    <Page pageName="shading_models">
      <h1>Shading Models</h1>
      <h2>Unshaded</h2>
      <UnshadedDemo />
      <h2>Flat Shading</h2>
      <FlatShadingDemo />
      <h2>Gouraud Shading</h2>
      <GouraudShadingDemo />
      <h2>Phong Shading</h2>
      <PhongShadingDemo />
      <Quiz quizInfo={quizInfo1} />
    </Page>
  );
}
