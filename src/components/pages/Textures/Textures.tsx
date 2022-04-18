import Page from "../../Page";
import Image from "../../Image";
import { CombinedTextureDemo, TextureUVDemo } from "./TextureDemos";

import uvImage from "../../../images/CubeUVMapping.png";

// Mossy bark texture maps
import mossyBarkBase from "../../../textures/MossyBark/MossyBark02_1K_BaseColor.png";
import mossyBarkNormal from "../../../textures/MossyBark/MossyBark02_1K_Normal.png";
import mossyBarkRoughness from "../../../textures/MossyBark/MossyBark02_1K_Roughness.png";
import HL from "../../HighLight";

export default function Textures() {
  return (
    <Page pageName="textures" pagePaths={{ prev: "/illumination" }}>
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
      <p>
        The image above shows how a wooden texture is mapped to a cube. The
        coordinates of a texture are <HL>U</HL> in the horizontal direction and{" "}
        <HL>V</HL> in the vertical direction. In the demo below, the texture can
        be moved in either the <HL>U</HL> or <HL>V</HL> direction. Here, the
        texture is repeated when it goes off on one side, but there are other
        ways of handling this too.
      </p>
      <TextureUVDemo />
      <h2>Texture Maps</h2>
      <p>
        Texture maps are useful for adding details to meshes without adding more
        vertices, which will hit performance.
      </p>
      <Image
        path={mossyBarkBase}
        alt="Base texture"
        attribution="www.cgbookcase.com"
        attribAsLink
      />
      <p>The base texture map is used to set the base color of the mesh.</p>
      <Image
        path={mossyBarkNormal}
        alt="Normal texture"
        attribution="www.cgbookcase.com"
        attribAsLink
      />
      <p>
        The normal texture map is used to set the normal at each point of the
        mesh.
      </p>
      <Image
        path={mossyBarkRoughness}
        alt="Roughness texture"
        attribution="www.cgbookcase.com"
        attribAsLink
      />
      <p>
        The roughness texture map is used to set the roughness at each point of
        the mesh.
      </p>
      <p>
        When you combine these texture maps you get fake details without a high
        polygon mesh. In the demo below, the textures are applied on a low
        polygon count cube mesh. The normal texture map affects where the light
        hits, giving a illusion of detail. The roughness texture map works in
        conjunction with the normal map. If you reduce the roughness you'll see
        that the wood looks wet.
      </p>
      <CombinedTextureDemo />
    </Page>
  );
}
