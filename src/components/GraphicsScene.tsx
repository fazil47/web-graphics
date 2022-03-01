import "./GraphicsScene.css";
import { useEffect, useState, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export default function GraphicsScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current_mount = mountRef.current;

    if (current_mount) {
      var scene = new Scene();
      var camera = new PerspectiveCamera(75, 1, 0.1, 1000);
      var renderer = new WebGLRenderer();

      renderer.setSize(400, 400);
      current_mount.appendChild(renderer.domElement);

      var geometry = new BoxGeometry(1, 1, 1);
      var material = new MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new Mesh(geometry, material);

      scene.add(cube);
      camera.position.z = 5;

      var animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    }

    // Cleanup
    return () => {
      if (current_mount) {
        current_mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="graphicsScene" ref={mountRef}></div>;
}
