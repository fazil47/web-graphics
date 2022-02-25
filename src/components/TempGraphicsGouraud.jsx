import React, { Component } from "react";
import * as THREE from "three";

class TempGraphicsGouraud extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const sphereRadius = 1;
    const sphereWidthSegments = 8;
    const sphereHeightSegments = 4;
    const geometry = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthSegments,
      sphereHeightSegments
    );
    const material = new THREE.MeshLambertMaterial({ color: "#555555" });
    const sphere = new THREE.Mesh(geometry, material);

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    camera.position.z = 4;
    scene.add(sphere);
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.sphere = sphere;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        className="my-5 rounded-md"
        style={{ width: "400px", height: "400px" }}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default TempGraphicsGouraud;
