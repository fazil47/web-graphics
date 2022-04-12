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
      <p>The geometric transformations play a vital role in generating images of three Dimensional objects with the help of these transformations. The location of objects relative to others can be easily expressed. Sometimes viewpoint changes rapidly, or sometimes objects move in relation to each other. For this number of transformation can be carried out repeatedly.</p>
      <h2>Translation</h2>
      <p>It is the movement of an object from one position to another position. Translation is done using translation vectors. There are three vectors in 3D instead of two. These vectors are in x, y, and z directions. Translation in the x-direction is represented using Tx. The translation is y-direction is represented using Ty. The translation in the z- direction is represented using Tz.
      If P is a point having co-ordinates in three directions (x, y, z) is translated, then after translation its coordinates will be (x1 y1 z1) after translation. Tx Ty Tz are translation vectors in x, y, and z directions respectively.<br></br>

          x1=x+ Tx<br></br>
          y1=y+Ty<br></br>
          z1=z+ Tz</p>
      <TranslationDemo />
      <h2>Rotation</h2>
      <p>It is moving of an object about an angle. Movement can be anticlockwise or clockwise. 3D rotation is complex as compared to the 2D rotation. For 2D we describe the angle of rotation, but for a 3D angle of rotation and axis of rotation are required. The axis can be either x or y or z.</p>
      <RotationDemo />
      <p>When the object is rotated about an axis that is not parallel to any one of co-ordinate axis, i.e., x, y, z. Then additional transformations are required. First of all, alignment is needed, and then the object is being back to the original position. Following steps are required-<br></br>
      1.Translate the object to the origin<br></br>
      2.Rotate object so that axis of object coincide with any of coordinate axis.<br></br>
      3.Perform rotation about co-ordinate axis with whom coinciding is done.<br></br>
      4.Apply inverse rotation to bring rotation back to the original position.</p>
      <RotationAroundAxisDemo />
      <h2>Scale</h2>
      <p>Scaling is used to change the size of an object. The size can be increased or decreased. The scaling three factors are required Sx Sy and Sz.<br></br>
      Sx=Scaling factor in x- direction<br></br>
      Sy=Scaling factor in y-direction<br></br>
      Sz=Scaling factor in z-direction</p>
      <ScaleDemo />
      <br></br>
    </Page>
  );
}
