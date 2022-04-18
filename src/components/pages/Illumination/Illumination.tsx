import Page from "../../Page";
import { ReflectionDemo, ShadowDemo } from "./IlluminationDemos";

export default function Illumination() {
  return (
    <Page
      pageName="illumination"
      pagePaths={{ prev: "/shadingModels", next: "/textures" }}
    >
      <h1>Illumination</h1>
      <p>
        In computer graphics, light usually consists of multiple components. The
        overall effect of a light source on an object is determined by the
        combination of the object's interactions with these components. The three
        primary lighting components (and subsequent interaction types) are
        diffuse, ambient, and specular.
      </p>
      <h2>Shadows</h2>
      <p>
        Shadows are created by testing whether a pixel is visible from the light
        source, by comparing the pixel to a Z-buffer or depth image of the light
        source's view, stored in the form of a texture. To get softer shadows,
        the shadow radius is increased.
      </p>
      <ShadowDemo />
      <h2>Reflections</h2>
      <p>
        Reflections depend on the way in which a material reflects incoming
        light rays. If a material is rough then it will scatter light rays and so
        won't produce clear reflections.
      </p>
      <ReflectionDemo />
    </Page>
  );
}
