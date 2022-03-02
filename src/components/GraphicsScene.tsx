import "./GraphicsScene.css";
import { useEffect, useRef } from "react";
import {
  Euler,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

interface GraphicsSceneProps {
  update?: (time: number) => void;
  scene: Scene;
  camera?: OrthographicCamera | PerspectiveCamera;
  cameraPosition?: Vector3;
  cameraRotation?: Euler;
  children?: React.ReactNode;
}

export default function GraphicsScene({
  update,
  scene,
  camera,
  cameraPosition = new Vector3(0, 0, 0),
  cameraRotation = new Euler(0, 0, 0),
  children,
}: GraphicsSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current_mount = mountRef.current;
    const renderer = new WebGLRenderer();
    let onMountResize = () => {};

    if (current_mount) {
      let sceneCamera: OrthographicCamera | PerspectiveCamera =
        new PerspectiveCamera(
          50,
          current_mount.clientWidth / current_mount.clientHeight,
          0.1,
          1000
        );
      if (camera) {
        sceneCamera = camera;
      }
      sceneCamera.position.copy(cameraPosition);
      sceneCamera.rotation.copy(cameraRotation);

      renderer.setSize(current_mount.clientWidth, current_mount.clientHeight);
      current_mount.appendChild(renderer.domElement);

      const updateRender = (time: number) => {
        if (update) {
          update(time);
        }
        renderer.render(scene, sceneCamera);
        requestAnimationFrame(updateRender);
      };

      onMountResize = () => {
        const canvas = renderer.domElement;
        canvas.style.width = current_mount.clientWidth + "px";
        canvas.style.height = current_mount.clientHeight + "px";
        renderer.setSize(current_mount.clientWidth, current_mount.clientHeight);
        if (sceneCamera.type === "PerspectiveCamera") {
          sceneCamera.aspect =
            current_mount.clientWidth / current_mount.clientHeight;
        }
        sceneCamera.updateProjectionMatrix();
        renderer.setSize(current_mount.clientWidth, current_mount.clientHeight);
      };

      updateRender(0);
    }

    window.addEventListener("resize", onMountResize);

    // Cleanup
    return () => {
      if (current_mount) {
        current_mount.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", onMountResize);
    };
  }, [camera, scene, cameraPosition, cameraRotation, update]);

  return (
    <div className="graphicsScene">
      <div className="graphicsSceneMount" ref={mountRef}></div>
      {children}
    </div>
  );
}
