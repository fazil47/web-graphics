import HL from "../../HighLight";
import HLB from "../../HighlightBlock";
import Page from "../../Page";
import {
  TranslationDemo,
  RotationDemo,
  ScaleDemo,
  RotationAroundAxisDemo,
} from "./TransformationDemos";

export default function Transformations() {
  return (
    <Page pageName="transformations">
      <h1>Transformations</h1>
      <p>
        The geometric transformations play a vital role in generating images of
        three dimensional objects with the help of these transformations. The
        location of objects relative to others can be easily expressed.
        Sometimes viewpoint changes rapidly, or sometimes objects move in
        relation to each other. For this number of transformation can be carried
        out repeatedly.
      </p>
      <h2>Translation</h2>
      <p>
        It is the movement of an object from one position to another position.
        Translation is done using translation vectors. There are three vectors
        in 3D instead of two. These vectors are in <HL>x, y, and z</HL>{" "}
        directions. Translation in the x-direction is represented using{" "}
        <HL>Tx</HL>. The translation is y-direction is represented using{" "}
        <HL>Ty</HL>. The translation in the z-direction is represented using{" "}
        <HL>Tz</HL>. If P is a point having co-ordinates in three directions{" "}
        <HL>(x, y, z)</HL> is translated, then after translation its coordinates
        will be <HL>(x1, y1, z1)</HL> after translation. <HL>Tx, Ty and Tz</HL>{" "}
        are translation vectors in <HL>x, y and z</HL> directions respectively.
        <HLB>
          x1 = x + Tx
          <br />
          y1 = y + Ty
          <br />
          z1 = z + Tz
        </HLB>
      </p>
      <TranslationDemo />
      <h2>Rotation</h2>
      <p>
        It is moving of an object about an angle. Movement can be anticlockwise
        or clockwise. 3D rotation is complex as compared to the 2D rotation. For
        2D we describe the angle of rotation, but for a 3D angle of rotation and
        axis of rotation are required. The axis can be either <HL>x, y or z</HL>
        .
      </p>
      <RotationDemo />
      <p>
        When the object is rotated about an axis that is not parallel to any one
        of co-ordinate axis, i.e., <HL>x, y and z</HL>. Then additional
        transformations are required. First of all, alignment is needed, and
        then the object is being back to the original position. The following
        steps are required:
        <HLB>
          1. Translate the object to the origin.
          <br />
          2. Rotate object so that axis of object coincide with any of
          coordinate axis.
          <br />
          3. Perform rotation about co-ordinate axis with whom coinciding is
          done.
          <br />
          4. Apply inverse rotation to bring rotation back to the original
          position.
        </HLB>
      </p>
      <RotationAroundAxisDemo />
      <h2>Scale</h2>
      <p>
        Scaling is used to change the size of an object. The size can be
        increased or decreased. The scaling three factors are required{" "}
        <HL>Sx, Sy and Sz</HL>.
        <HLB>
          Sx = Scaling factor in x-direction
          <br />
          Sy = Scaling factor in y-direction
          <br />
          Sz = Scaling factor in z-direction
        </HLB>
      </p>
      <ScaleDemo />
    </Page>
  );
}
