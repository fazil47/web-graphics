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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface GraphicsSceneProps {
  update?: (time: number) => void;
  scene: Scene;
  cameraType?: string;
  cameraPosition?: Vector3;
  cameraRotation?: Euler;
  orthographicCameraScale?: number;
  cameraTarget?: Vector3;
  orbitControlsEnabled?: boolean;
  children?: React.ReactNode;
}

export default function GraphicsScene({
  update,
  scene,
  cameraType = "perspective",
  cameraPosition,
  cameraRotation,
  orthographicCameraScale = 1,
  cameraTarget = new Vector3(0, 0, 0),
  orbitControlsEnabled = false,
  children,
}: GraphicsSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current_mount = mountRef.current;
    const renderer = new WebGLRenderer();
    let onMountResize = () => {};

    if (current_mount) {
      let sceneCamera: OrthographicCamera | PerspectiveCamera;
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

      const controls = new OrbitControls(sceneCamera, renderer.domElement);
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      controls.enabled = orbitControlsEnabled;
      controls.target = cameraTarget;

      const updateRender = (time: number) => {
        if (update) {
          update(time);
        }
        controls.update();
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
  ]);

  return (
    <div className="graphicsScene">
      <div className="graphicsSceneMount" ref={mountRef}></div>
      {children}
    </div>
  );
}
