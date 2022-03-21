import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  Scene,
  Vector3,
} from "three";
import Page from "../Page";
import Quiz from "../Quiz";
import GraphicsScene from "../GraphicsScene";
import Slider from "../Slider";

export default function Projection() {
  const orthoScene = new Scene();
  const persScene = new Scene();

  const orthoCameraPosition = new Vector3(0, 0, 3);
  const persCameraPosition = new Vector3(0, 0, 3);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0xffffff });

  const lightColor = 0x640202;

  const mesh1 = new Mesh(geometry, material);
  const light1 = new DirectionalLight(lightColor, 2);
  const ambLight1 = new AmbientLight(lightColor, 0.5);

  const mesh2 = new Mesh(geometry, material);
  const light2 = new DirectionalLight(lightColor, 2);
  const ambLight2 = new AmbientLight(lightColor, 0.5);

  persScene.add(light1);
  persScene.add(mesh1);
  persScene.add(ambLight1);

  orthoScene.add(light2);
  orthoScene.add(mesh2);
  orthoScene.add(ambLight2);

  light1.position.z = 7.5;
  light1.position.x = 5;
  light1.position.y = 10;

  light2.position.z = 7.5;
  light2.position.x = 5;
  light2.position.y = 10;

  return (
    <Page pageName="projection">
      <h1>Projection</h1>
      <h2>Perspective Projection</h2>
      <GraphicsScene
        scene={persScene}
        cameraType="perspective"
        cameraPosition={persCameraPosition}
        cameraTarget={mesh1.position}
      >
        <Slider
          label="Distance from camera"
          min="0"
          max="10"
          onChange={(distance) => {
            mesh1.position.z = -distance;
          }}
        />
        <Slider
          label="Cube X rotation"
          min="-180"
          max="180"
          onChange={(rotation) => {
            mesh1.rotation.x = (Math.PI * rotation) / 180;
          }}
        />
        <Slider
          label="Cube Y rotation"
          min="-180"
          max="180"
          onChange={(rotation) => {
            mesh1.rotation.y = (Math.PI * rotation) / 180;
          }}
        />
      </GraphicsScene>
      <h2>Orthographic Projection</h2>
      <GraphicsScene
        scene={orthoScene}
        cameraType="orthographic"
        cameraPosition={orthoCameraPosition}
        orthographicCameraScale={0.0065}
      >
        <Slider
          label="Distance from camera"
          min="0"
          max="10"
          onChange={(distance) => {
            mesh2.position.z = -distance;
          }}
        />
        <Slider
          label="Cube X rotation"
          min="-180"
          max="180"
          onChange={(rotation) => {
            mesh2.rotation.x = (Math.PI * rotation) / 180;
          }}
        />
        <Slider
          label="Cube Y rotation"
          min="-180"
          max="180"
          onChange={(rotation) => {
            mesh2.rotation.y = (Math.PI * rotation) / 180;
          }}
        />
      </GraphicsScene>
      <Quiz
        quizInfo={{
          question: "In which kind of projection does the cube's size remain constant?",
          options: ["Orthographic", "Perspective", "Both"],
          answerIndex: 0,
        }}
      />
    </Page>
  );
}
