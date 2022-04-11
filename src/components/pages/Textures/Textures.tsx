import Page from "../../Page";
import { CombinedTextureDemo, TextureUVDemo } from "./TextureDemos";

export default function Textures() {
  return (
    <Page pageName="textures">
      <h1>Textures</h1>
      <h2>Texture Coordinates</h2>
      <TextureUVDemo />
      <h2>Texture Maps</h2>
      <CombinedTextureDemo />
    </Page>
  );
}
