import { Children, useEffect, useRef } from "react";
import "./GraphicsScene.css";
import { Euler, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { StereoEffect } from "three/examples/jsm/effects/StereoEffect";

interface StereoGraphicsSceneProps {
  scene: Scene;
  renderer: WebGLRenderer;
  stereoEffect: StereoEffect;
  update?: (time: number) => void;
  camera?: PerspectiveCamera;
  cameraPosition?: Vector3;
  cameraRotation?: Euler;
  children?: React.ReactNode;
  enableAntiAliasing?: boolean;
  note?: string;
}

export default function StereoGraphicsScene({
  scene,
  renderer,
  stereoEffect,
  update,
  camera,
  cameraPosition,
  cameraRotation,
  children,
  enableAntiAliasing = true,
  note,
}: StereoGraphicsSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current_mount = mountRef.current;
    let onMountResize = () => {};
    let requestAnimationHandle: number;

    if (current_mount) {
      let sceneCamera: PerspectiveCamera;
      if (camera) {
        sceneCamera = camera;
        sceneCamera.aspect =
          current_mount.clientWidth / current_mount.clientHeight;
        sceneCamera.updateProjectionMatrix();
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

      current_mount.appendChild(renderer.domElement);

      stereoEffect.setEyeSeparation(-0.064);
      stereoEffect.setSize(
        current_mount.clientWidth,
        current_mount.clientHeight
      );

      const updateRender = (time: number) => {
        if (update) {
          update(time);
        }
        stereoEffect.render(scene, sceneCamera);
        requestAnimationHandle = requestAnimationFrame(updateRender);
      };

      onMountResize = () => {
        const canvas = renderer.domElement;
        canvas.style.width = current_mount.clientWidth + "px";
        canvas.style.height = current_mount.clientHeight + "px";

        sceneCamera.aspect =
          current_mount.clientWidth / current_mount.clientHeight;
        sceneCamera.updateProjectionMatrix();

        stereoEffect.setSize(
          current_mount.clientWidth,
          current_mount.clientHeight
        );
      };

      updateRender(0);
    }

    window.addEventListener("resize", onMountResize);

    // Cleanup
    return () => {
      if (current_mount) {
        if (requestAnimationHandle) {
          cancelAnimationFrame(requestAnimationHandle);
        }
        renderer.dispose();
        current_mount.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", onMountResize);
    };
  }, [
    scene,
    renderer,
    camera,
    stereoEffect,
    cameraPosition,
    cameraRotation,
    update,
    enableAntiAliasing,
  ]);

  const controlsClassName =
    "graphicsSceneControls " +
    (Children.count(children) > 1 ? "controlGrid" : "");

  return (
    <div className="graphicsScene">
      <div className="graphicsSceneMount" ref={mountRef}></div>
      {note && (
        <div className="note">
          <span className="noteInfoIcon">i</span>{" "}
          <span className="noteText">{note}</span>
        </div>
      )}
      <div className={controlsClassName}>{children}</div>
    </div>
  );
}
