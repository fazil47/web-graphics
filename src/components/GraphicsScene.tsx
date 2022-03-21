import "./GraphicsScene.css";
import { Children, useEffect, useRef } from "react";
import {
  Euler,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

interface GraphicsSceneProps {
  scene: Scene;
  update?: (time: number) => void;
  camera?: PerspectiveCamera | OrthographicCamera;
  cameraType?: string;
  cameraPosition?: Vector3;
  cameraRotation?: Euler;
  orthographicCameraScale?: number;
  children?: React.ReactNode;
}

export default function GraphicsScene({
  scene,
  update,
  camera,
  cameraType = "perspective",
  cameraPosition,
  cameraRotation,
  orthographicCameraScale = 1,
  children,
}: GraphicsSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current_mount = mountRef.current;
    const renderer = new WebGLRenderer();
    let onMountResize = () => {};

    if (current_mount) {
      let sceneCamera: OrthographicCamera | PerspectiveCamera;
      if (camera) {
        if (camera.type === "OrthographicCamera") {
          sceneCamera = camera as OrthographicCamera;
          camera.left =
            (orthographicCameraScale * current_mount.clientWidth) / -2;
          camera.right =
            (orthographicCameraScale * current_mount.clientWidth) / 2;
          camera.top =
            (orthographicCameraScale * current_mount.clientHeight) / 2;
          camera.bottom =
            (orthographicCameraScale * current_mount.clientHeight) / -2;
          camera.near = 0.1;
          camera.far = 1000;
        } else {
          sceneCamera = camera as PerspectiveCamera;
          camera.fov = 50;
          camera.aspect =
            current_mount.clientWidth / current_mount.clientHeight;
          camera.near = 0.1;
          camera.far = 1000;
        }
        sceneCamera.updateProjectionMatrix();
      } else {
        if (cameraType === "orthographic") {
          sceneCamera = new OrthographicCamera(
            (orthographicCameraScale * current_mount.clientWidth) / -2,
            (orthographicCameraScale * current_mount.clientWidth) / 2,
            (orthographicCameraScale * current_mount.clientHeight) / 2,
            (orthographicCameraScale * current_mount.clientHeight) / -2,
            0.1,
            1000
          );
        } else {
          sceneCamera = new PerspectiveCamera(
            50,
            current_mount.clientWidth / current_mount.clientHeight,
            0.1,
            1000
          );
        }
      }
      if (cameraPosition) {
        sceneCamera.position.copy(cameraPosition);
      } else {
        sceneCamera.position.z = 5;
      }
      if (cameraRotation) {
        sceneCamera.rotation.copy(cameraRotation);
      }

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
        } else if (sceneCamera.type === "OrthographicCamera") {
          sceneCamera.left =
            (orthographicCameraScale * current_mount.clientWidth) / -2;
          sceneCamera.right =
            (orthographicCameraScale * current_mount.clientWidth) / 2;
          sceneCamera.top =
            (orthographicCameraScale * current_mount.clientHeight) / 2;
          sceneCamera.bottom =
            (orthographicCameraScale * current_mount.clientHeight) / -2;
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
  }, [
    cameraType,
    scene,
    cameraPosition,
    cameraRotation,
    update,
    orthographicCameraScale,
    camera,
  ]);

  const controlsClassName =
    "graphicsSceneControls " +
    (Children.count(children) > 1 ? "controlGrid" : "");

  return (
    <div className="graphicsScene">
      <div className="graphicsSceneMount" ref={mountRef}></div>
      <div className={controlsClassName}>{children}</div>
    </div>
  );
}
