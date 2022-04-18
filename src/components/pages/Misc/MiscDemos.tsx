import {
  Mesh,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import Vector3Control from "../../graphics/controls/Vector3Control";
import GraphicsScene from "../../graphics/GraphicsScene";

export function RayTracingDemo() {
  const scene = new Scene();
  return <GraphicsScene scene={scene} />;
}

export function FractalDemo() {
  const scene = new Scene();

  var aspect = 1;
  var zoom = 4.0;
  var offset = new Vector2(-2.0 * aspect, -2.0);

  const pset1 = new Vector3(0.0, 0.0, 0.0);
  const pset2 = new Vector3(0.0, 0.0, 0.0);

  const uniforms = {
    res: {
      type: "vec2",
      value: new Vector2(500, 300),
    },
    aspect: { type: "float", value: aspect },
    zoom: { type: "float", value: zoom },
    offset: { type: "vec2", value: offset },
    pset1: {
      type: "vec3",
      value: pset1,
    },
    pset2: {
      type: "vec3",
      value: pset2,
    },
  };

  const geometry = new PlaneBufferGeometry(2, 2);
  const material = new ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  return (
    <GraphicsScene scene={scene}>
      <Vector3Control
        label="pset1"
        initialValue={pset1}
        onChange={(value) => {
          pset1.copy(value);
        }}
      />
      <Vector3Control
        label="pset2"
        initialValue={pset2}
        onChange={(value) => {
          pset2.copy(value);
        }}
      />
    </GraphicsScene>
  );
}

function fragmentShader() {
  return `
    precision highp float;
    uniform vec2 res;
    uniform float aspect;
    uniform float zoom;
    uniform vec2 offset;
    // gui parameters
    uniform vec3 pset1;
    uniform vec3 pset2;
    vec2 cm (vec2 a, vec2 b){
      return vec2(a.x*b.x - a.y*b.y, a.x*b.y + b.x*a.y);
    }
    vec2 conj (vec2 a){
      return vec2(a.x, -a.y);
    }
    float mandelbrot(vec2 c){
      float alpha = 1.0;
      vec2 z = vec2(0.0 , 0.0);
      vec2 z_0;
      vec2 z_1;
      vec2 z_2;
      for(int i=0; i < 200; i++){  // i < max iterations
        z_2 = z_1;
        z_1 = z_0;
        z_0 = z;
        float x_0_sq = z_0.x*z_0.x;
        float y_0_sq = z_0.y*z_0.y;
        vec2 z_0_sq = vec2(x_0_sq - y_0_sq, 2.0*z_0.x*z_0.y);
        float x_1_sq = z_1.x*z_1.x;
        float y_1_sq = z_1.y*z_1.y;
        vec2 z_1_sq = vec2(x_1_sq - y_1_sq, 2.0*z_1.x*z_1.y);
        // the recurrence equation
        z = pset1.x*z_0_sq + c + pset1.y*z_1_sq
        + pset1.z*cm(z_1_sq, z_2) + pset2.x*cm(z_1_sq, z_0)
        + pset2.y*cm(z_2, z_0) + pset2.z*cm(z_1, z_2);
        float z_0_mag = x_0_sq + y_0_sq;
        float z_1_mag = x_1_sq + y_1_sq;
        if(z_0_mag > 12.0){
          float frac = (12.0 - z_1_mag) / (z_0_mag - z_1_mag);
          alpha = (float(i) - 1.0 + frac)/200.0; // should be same as max iterations
          break;
        }
      }
      return alpha;
    }
    void main(){ // gl_FragCoord in [0,1]
      vec2 uv = zoom * vec2(aspect, 1.0) * gl_FragCoord.xy / res + offset;
      float s = 1.0 - mandelbrot(uv);
      vec3 coord = vec3(s, s, s);
      gl_FragColor = vec4(pow(coord, vec3(5.38, 6.15, 3.85)), 1.0);
    }
  `;
}
