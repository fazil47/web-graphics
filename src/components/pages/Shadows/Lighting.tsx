import Page from "../../Page";
import { ShadowDemo } from "./LightingDemos";

export default function Lighting() {
  return (
    <Page pageName="lighting">
      <h1>Lighting</h1>
      <p>In computer graphics, light usually consists of multiple components. The overall effect of a light source on an object is determined by the combination of the object's interactions with these components.The three primary lighting components (and subsequent interaction types) are diffuse, ambient, and specular.</p>
      <h2>Shadows</h2>
      <p>Shadows are created by testing whether a pixel is visible from the light source, by comparing the pixel to a z-buffer or depth image of the light source's view, stored in the form of a texture.</p>
      <ShadowDemo />
    </Page>
  );
}
