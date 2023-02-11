import { Link } from "react-router-dom";
import Page from "../Page";

export default function Home() {
  return (
    <Page pageName="home" pagePaths={{ next: "/modeling" }}>
      <h1>Learn 3D Computer Graphics</h1>
      <p>
        This is a website for learning about computer graphics. If you open the
        sidebar you'll see different pages. Each page contains demos and
        exercises for you to gain a deep understanding of different topics in
        computer graphics.
      </p>
      <Link className="callToActionButton" to="modeling">
        Start Learning!
      </Link>
      <h2>About</h2>
      <p>
        It was made using <a href="https://reactjs.org/">React</a>,{" "}
        <a href="https://threejs.org/">three.js</a> and{" "}
        <a href="https://www.firebase.com/">Firebase</a>.
      </p>
      <h2>References</h2>
      <ul>
        <li>
          <a href="https://threejs.org/docs/index.html">
            three.js documentation
          </a>
        </li>
        <li>
          <a href="https://graphics.cs.utah.edu/courses/cs4600/">
            CS 4600 - Introduction to Computer Graphics
          </a>
        </li>
        <li>
          <a href="https://cglearn.codelight.eu/pub/computer-graphics/">
            cglearn.codelight.eu
          </a>
        </li>
      </ul>
      <h2>Attribution</h2>
      <ul>
        <li>
          <a href="https://sbcode.net/threejs/csg/">three.js CSG Utilities</a>
        </li>
      </ul>
    </Page>
  );
}
