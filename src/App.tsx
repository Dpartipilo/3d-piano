// import * as THREE from "three";
import React from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
// import { OrbitControls } from "@react-three/drei";

import { Scene } from "./components/Scene";
// import { Presentation } from "./components/Presentation";
import { Leva } from "leva";

function App() {
  return (
    <div className="App">
      <Leva collapsed />
      <Canvas
        shadows
        camera={{
          position: [0, 28, 26],
          near: 0.1,
          fov: 45,
          far: 250,
        }}
      >
        {/********** Scene ************/}
        <Scene />

        {/********** Dev Camera Controls ************/}
        {/* <OrbitControls
          makeDefault
          maxDistance={60}
          minDistance={20}
          maxAzimuthAngle={1}
          minAzimuthAngle={-1}
          maxPolarAngle={1.2}
          minPolarAngle={0}
        /> */}
      </Canvas>
    </div>
  );
}

export default App;
