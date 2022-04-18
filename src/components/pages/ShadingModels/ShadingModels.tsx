import Page from "../../Page";
import Quiz from "../../Quiz";

import {
  UnshadedDemo,
  FlatShadingDemo,
  GouraudShadingDemo,
  PhongShadingDemo,
} from "./ShadingModelDemos";

export default function ShadingModels() {
  const quizInfo1 = {
    question:
      "In which interpolation technique is the normal at each point calculated?",
    options: ["Gouraud Shading", "Phong Shading", "Flat Shading"],
    answerIndex: 1,
  };

  return (
    <Page
      pageName="shadingModels"
      pagePaths={{ prev: "/transformations", next: "/illumination" }}
    >
      <h1>Shading Models</h1>
      <h2>Unshaded</h2>
      <p>
        When an object shouldn't be affected by light we use a unshaded
        material. It's most often used in UI.
      </p>
      <UnshadedDemo />
      <h2>Flat Shading</h2>
      <p>
        Flat shading is the simplest shading model. Each rendered polygon has a
        single normal vector; shading for the entire polygon is constant across
        the surface of the polygon. With a small polygon count, this gives
        curved surfaces a faceted look. We use this shading method if speed is
        everything.
      </p>
      <FlatShadingDemo />
      <h2>Gouraud Shading</h2>
      <p>
        Gouraud shading is in between the two: like Phong shading, each polygon
        has one normal vector per vertex, but instead of interpolating the
        vectors, the color of each vertex is computed and then interpolated
        across the surface of the polygon.
      </p>
      <GouraudShadingDemo />
      <h2>Phong Shading</h2>
      <p>
        Phong shading is the most sophisticated of the three methods you list.
        Each rendered polygon has one normal vector per vertex; shading is
        performed by interpolating the vectors across the surface and computing
        the color for each point of interest. Interpolating the normal vectors
        gives a reasonable approximation to a smoothly-curved surface while
        using a limited number of polygons. We use Phong shading if quality is
        the priority.
      </p>
      <PhongShadingDemo />
      <Quiz quizInfo={quizInfo1} />
      <Quiz
        quizInfo={{
          question: "Which shading model is the simplest of the three?",
          options: [
            "Flat shading model",
            "Phong shading model",
            "Gouraud shading model",
          ],
          answerIndex: 0,
        }}
      />
      <Quiz
        quizInfo={{
          question:
            "Which shading model is used when quality is the primary requirement?",
          options: [
            "Flat shading model",
            "Phong shading model",
            "Gouraud shading model",
          ],
          answerIndex: 1,
        }}
      />
    </Page>
  );
}
