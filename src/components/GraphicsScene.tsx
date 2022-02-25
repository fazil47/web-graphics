export default function GraphicsScene() {
  return <div />;
}

// import { useEffect, useRef, useState } from "react";
// import {
//   BufferGeometry,
//   DirectionalLight,
//   Material,
//   Mesh,
//   MeshLambertMaterial,
//   MeshPhongMaterial,
//   OrthographicCamera,
//   PerspectiveCamera,
//   Scene,
//   SphereGeometry,
//   WebGL1Renderer,
// } from "three";
// import "./GraphicsScene.css";

// // interface GraphicsSceneProps {
// //   start: () => void;
// //   update: (time?: number) => void;
// //   scene: Scene;
// //   camera: PerspectiveCamera | OrthographicCamera;
// // }
// export default function GraphicsScene() {
//   const [gouraudCanvas, setGouraudCanvas] =
//     useState<HTMLCanvasElement | null>();
//   const [phongCanvas, setPhongCanvas] = useState<HTMLCanvasElement | null>();
//   const gouraudCanvasRef = useRef<HTMLCanvasElement | null>(null);
//   const phongCanvasRef = useRef<HTMLCanvasElement | null>(null);
//   // let gouraudCanvas =
//   //   document.querySelector<HTMLCanvasElement>("gouraudCanvas");
//   // let phongCanvas = document.querySelector<HTMLCanvasElement>("phongCanvas");

//   useEffect(() => {
//     setGouraudCanvas(
//       document.querySelector<HTMLCanvasElement>("gouraudCanvas")
//     );
//     setPhongCanvas(document.querySelector<HTMLCanvasElement>("phongCanvas"));
//   }, [gouraudCanvasRef, phongCanvasRef]);
//   // const [scene, setScene] = useState<Scene>();
//   // const [renderer, setRenderer] = useState<WebGL1Renderer>();

//   // Runs once
//   // useEffect(() => {
//   //   if (canvas.current) {
//   //     setRenderer(new WebGL1Renderer({ canvas: canvas.current }));
//   //   }
//   //   setScene(new Scene());
//   //   start();
//   // }, []);

//   if (!gouraudCanvasRef.current || !phongCanvasRef.current) {
//     return (
//       <div>
//         <canvas ref={gouraudCanvasRef} className="graphicsScene" />
//         <canvas ref={phongCanvasRef} className="graphicsScene" />
//       </div>
//     );
//   }

//   const gouraudRenderer = new WebGL1Renderer({
//     canvas: gouraudCanvasRef.current,
//   });
//   const phongRenderer = new WebGL1Renderer({ canvas: phongCanvasRef.current });

//   const fov = 75;
//   const aspect = 2; // the canvas default
//   const near = 0.1;
//   const far = 5;

//   const gouraudCamera = new PerspectiveCamera(fov, aspect, near, far);
//   const gouraudScene = new Scene();

//   const phongCamera = new PerspectiveCamera(fov, aspect, near, far);
//   const phongScene = new Scene();

//   {
//     const color = 0xffffff;
//     const intensity = 1;
//     const light = new DirectionalLight(color, intensity);
//     light.position.set(-1, 2, 4);
//     gouraudScene.add(light);
//     phongScene.add(light);
//   }

//   const sphereRadius = 1;
//   const sphereWidthSegments = 16;
//   const sphereHeightSegments = 16;
//   const sphereGeometry = new SphereGeometry(
//     sphereRadius,
//     sphereWidthSegments,
//     sphereHeightSegments
//   );

//   function makeMeshInstance({
//     geometry,
//     material,
//     x = 0,
//     y = 0,
//     z = 0,
//   }: {
//     geometry: BufferGeometry;
//     material: Material;
//     x?: number;
//     y?: number;
//     z?: number;
//   }) {
//     const mesh = new Mesh(geometry, material);
//     mesh.position.set(x, y, z);
//     return mesh;
//   }

//   const gouraudMaterial = new MeshLambertMaterial({ color: 0xffffff });
//   const gouraudSphereMesh = makeMeshInstance({
//     geometry: sphereGeometry,
//     material: gouraudMaterial,
//   });
//   gouraudScene.add(gouraudSphereMesh);

//   const phongMaterial = new MeshPhongMaterial({ color: 0xffffff });
//   const phongSphereMesh = makeMeshInstance({
//     geometry: sphereGeometry,
//     material: phongMaterial,
//   });
//   phongScene.add(phongSphereMesh);

//   // Runs every frame
//   function render(time: number) {
//     gouraudRenderer.render(gouraudScene, gouraudCamera);
//     phongRenderer.render(phongScene, phongCamera);
//     requestAnimationFrame(render);
//   }
//   requestAnimationFrame(render);

//   return (
//     <div>
//       <canvas ref={gouraudCanvasRef} className="graphicsScene" />
//       <canvas ref={phongCanvasRef} className="graphicsScene" />
//     </div>
//   );
// }
