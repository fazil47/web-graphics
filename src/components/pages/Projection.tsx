import {
  BoxGeometry,
  DirectionalLight,
  Euler,
  Mesh,
  MeshPhongMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import Page from "../Page";
import Quiz from "../Quiz";
import GraphicsScene from "../GraphicsScene";

export default function Projection() {
  const orthoScene = new Scene();
  const persScene = new Scene();

  const orthoCamera = new OrthographicCamera(-2.81, 2.81, 1, -1, 0.1, 2000);
  const orthoCameraPosition = new Vector3(0.86, 2, 2.14);
  const orthoCameraRotation = new Euler(
    (Math.PI / 180) * -52.6,
    (Math.PI / 180) * 31,
    (Math.PI / 180) * 35.6
  );
  const persCamera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const persCameraPosition = new Vector3(1.98, 2.004, 1.99);
  const persCameraRotation = new Euler(
    (Math.PI / 180) * -45.2,
    (Math.PI / 180) * 35.03,
    (Math.PI / 180) * 30.03
  );

  var geometry = new BoxGeometry(1, 1, 1);
  var material = new MeshPhongMaterial({ color: 0xffffff });

  var cube1 = new Mesh(geometry, material);
  const light1 = new DirectionalLight(0x640202, 2);

  var cube2 = new Mesh(geometry, material);
  const light2 = new DirectionalLight(0x640202, 2);

  orthoScene.add(light1);
  orthoScene.add(cube1);

  persScene.add(light2);
  persScene.add(cube2);

  light1.position.z = 7.5;
  light1.position.x = 5;
  light1.position.y = 10;

  light2.position.z = 7.5;
  light2.position.x = 5;
  light2.position.y = 10;

  return (
    <Page pageName="temp">
      <h1>ABC</h1>
      <GraphicsScene
        scene={persScene}
        camera={persCamera}
        cameraPosition={persCameraPosition}
        cameraRotation={persCameraRotation}
        // update={(time: number) => {
        //   time *= 0.001;
        //   cube2.rotation.x = time / 2;
        //   cube2.rotation.y = time / 2;
        // }}
      />

      <GraphicsScene
        scene={orthoScene}
        camera={orthoCamera}
        cameraPosition={orthoCameraPosition}
        cameraRotation={orthoCameraRotation}
        // update={(time: number) => {
        //   time *= 0.001;
        //   cube1.rotation.x = time / 2;
        //   cube1.rotation.y = time / 2;
        // }}
      />
      <Quiz
        quizInfo={{
          options: ["option1", "option2", "option3"],
          answerIndex: 1,
          question: "Enter an option.",
        }}
      />
    </Page>
  );
}
