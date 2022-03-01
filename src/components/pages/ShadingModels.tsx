import {
  DirectionalLight,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Scene,
  SphereGeometry,
  Vector3,
} from "three";

import Page from "../Page";
import Quiz from "../Quiz";
import GraphicsScene from "../GraphicsScene";

export default function ShadingModels() {
  const quizInfo1 = {
    question: "Using which shading model can you get highlights?",
    options: ["Gouraud Shading", "Phong Shading"],
    answerIndex: 1,
  };

  const scene = new Scene();

  {
    const color = 0xffffff;
    const intensity = 1.5;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const radius = 1;
  const widthSegments = 16;
  const heightSegments = 16;
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);

  function makeInstance(geometry: any, material: Material, x: number) {
    const sphere = new Mesh(geometry, material);
    scene.add(sphere);
    sphere.position.x = x;
    sphere.position.z = -3;
    return sphere;
  }

  const spheres = [
    makeInstance(geometry, new MeshBasicMaterial({ color: 0x44aa88 }), 0),
    makeInstance(geometry, new MeshLambertMaterial({ color: 0x8844aa }), -2.5),
    makeInstance(geometry, new MeshPhongMaterial({ color: 0xaa8844 }), 2.5),
  ];

  return (
    <Page pageName="shading_models">
      <h1>Shading Models</h1>
      <GraphicsScene
        scene={scene}
        update={(time: number) => {
          time *= 0.001; // convert time to seconds
          spheres.forEach((sphere, ndx) => {
            const speed = 1 + ndx * 0.1;
            const rot = time * speed;
            sphere.rotation.x = rot;
            sphere.rotation.y = rot;
          });
        }}
        cameraPosition={new Vector3(0, 0, 3)}
      />
      <Quiz quizInfo={quizInfo1} />
    </Page>
  );
}
