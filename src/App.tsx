import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";

import { Scene } from "./components/Scene";
import { Leva } from "leva";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function App() {
  return (
    <div className="App">
      <Leva collapsed />
      <Canvas
        shadows
        camera={{
          position: isMobile ? [0, 45, 35] : [0, 28, 26],
          near: 0.1,
          fov: 45,
          far: 750,
        }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("black");
        }}
      >
        {/********** Scene ************/}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        {/* <axesHelper args={[10]} />
        <gridHelper args={[50.5, 20, "red", "blue"]} position={[0, 4, 0]} /> */}
        {/********** Dev Camera Controls ************/}

        {isMobile ? (
          <OrbitControls
            makeDefault
            maxDistance={70}
            minDistance={20}
            maxAzimuthAngle={1}
            minAzimuthAngle={-1}
            maxPolarAngle={1.2}
            minPolarAngle={0}
          />
        ) : null}
      </Canvas>
    </div>
  );
}

export default App;
