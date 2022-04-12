import Page from "../../Page";
import Image from "../../Image";
import { CombinedTextureDemo, TextureUVDemo } from "./TextureDemos";

import uvImage from "../../../images/CubeUVMapping.png";

// Mossy bark texture maps
import mossyBarkBase from "../../../textures/MossyBark/MossyBark02_1K_BaseColor.png";
import mossyBarkNormal from "../../../textures/MossyBark/MossyBark02_1K_Normal.png";
import mossyBarkRoughness from "../../../textures/MossyBark/MossyBark02_1K_Roughness.png";

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
      <h2>Texture Coordinates</h2>
      <Image path={uvImage} alt="UV Mapping of a cube" />
      <TextureUVDemo />
      <h2>Texture Maps</h2>
      <Image
        path={mossyBarkBase}
        alt="Base texture"
        attribution="www.cgbookcase.com"
        attribAsLink
      />
      <Image
        path={mossyBarkNormal}
        alt="Normal texture"
        attribution="www.cgbookcase.com"
        attribAsLink
      />
      <Image
        path={mossyBarkRoughness}
        alt="Roughness texture"
        attribution="www.cgbookcase.com"
        attribAsLink
      />
      <CombinedTextureDemo />
    </Page>
  );
}
