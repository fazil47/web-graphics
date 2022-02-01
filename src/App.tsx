import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";

// Pages
import Home from "./components/pages/Home";
import Lines from "./components/pages/Lines";
import Circles from "./components/pages/Circles";
import Ellipses from "./components/pages/Ellipses";
import Transformations from "./components/pages/Transformations";
import ThreeD from "./components/pages/ThreeD";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="line" element={<Lines />} />
          <Route path="circle" element={<Circles />} />
          <Route path="ellipse" element={<Ellipses />} />
          <Route path="transformation" element={<Transformations />} />
          <Route path="3d" element={<ThreeD />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
