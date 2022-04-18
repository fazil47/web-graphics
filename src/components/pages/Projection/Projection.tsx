import Page from "../../Page";
import Quiz from "../../Quiz";
import {
  PerspectiveProjectionDemo,
  OrthographicProjectionDemo,
  StereoCameraDemo,
} from "./ProjectionDemos";

export default function Projection() {
  return (
    <Page
      pageName="projection"
      pagePaths={{ prev: "/modeling", next: "/transformations" }}
    >
      <h1>Projection</h1>
      <h2>Perspective Projection</h2>
      <p>
        Perspective projection deals with the depth of the image. Artists use
        perspective projection to draw or analyse 3D scenes. Though this
        projection creates realistic views, it fails to preserve the proportions
        of the object dimensions. In the demo given below, increase the distance
        from the camera slider and compare yourself the difference in the image
        as the distance is increased. Similarly change the slider values and you
        will understand how the perspective projection displays 3D images well
        but at the same time, the proportion of the object dimensions vary.
      </p>
      <PerspectiveProjectionDemo />
      <Quiz
        quizInfo={{
          question:
            "Which statement is correct with respect to perspective projection?",
          options: [
            "It maintains the object dimension proportion",
            "It gives a better understanding of a 3D object",
            "It is a type of parallel projection",
          ],
          answerIndex: 1,
        }}
      />
      <h2>Orthographic Projection</h2>
      <p>
        Orthographic projection is a type of parallel projection. Orthographic
        projections are most often used to produce the front, side and top views
        of an object. The front, side and rear projections are called
        elevations. The top is called plan. Orthographic projections that
        display more than one face of the object are called axonometric
        projections. The most commonly used axonometric projection is isometric
        projection. Here, as we move the sliders and observe the changes in the
        scene, the object does not change its dimensions even after rotating the
        cube. Thus, it is mostly used by architects for the better measure of
        the plan drawn.
      </p>
      <OrthographicProjectionDemo />
      <Quiz
        quizInfo={{
          question:
            "In which kind of projection does the cube's size remain constant?",
          options: ["Orthographic", "Perspective", "Both"],
          answerIndex: 0,
        }}
      />
      <Quiz
        quizInfo={{
          question:
            "Which projection is used by architects who need a better measure of plan drawn?",
          options: ["Orthographic", "Perspective", "Both"],
          answerIndex: 0,
        }}
      />
      <h2>Stereo Effect</h2>
      <p>
        The concept behind the working of VR headset is that stereoscopic
        projection is displayed which splits VR screen into two, with an
        individual view for each eye to create a 3D perspective. This is done
        using the angle and type of lenses in the headset. The lenses distortthe
        two independent images, one for each side, into the correct shape for
        how our eyes would otherwise see the real world. The actual images for
        each eye are displayed slightly off from one another. If you close one
        eye back and forth in the headset, you can see the objects in VR dance
        back and forth. It's this principle that lets the VR be 3D.
      </p>
      <StereoCameraDemo />
    </Page>
  );
}
