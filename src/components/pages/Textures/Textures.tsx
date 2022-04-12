import Page from "../../Page";
import { TextureUVDemo } from "./TextureDemos";

export default function Textures() {
  return (
    <Page pageName="textures">
      <h1>Textures</h1>
      <p>
        In computer graphics, the application of a type of surface to a 3D
        image. A texture can be uniform, such as a brick wall, or irregular,
        such as wood grain or marble. The common method is to create a 2D
        bitmapped image of the texture, called a "texture map," which is then
        "wrapped around" the 3D object.
      </p>
      <TextureUVDemo />
    </Page>
  );
}
