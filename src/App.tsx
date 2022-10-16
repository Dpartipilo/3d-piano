import * as THREE from "three";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";

import { Piano } from "./components/Piano";
import { Floor } from "./components/Floor";
import { useControls, Leva } from "leva";

function App() {
  const { x, y, z, angle, intensity, distance, penumbra } = useControls(
    "Light properties",
    {
      x: { value: 0, min: -15, max: 15, step: 0.1 },
      y: { value: 10, min: 0, max: 15, step: 0.1 },
      z: { value: 0, min: -10, max: 10, step: 0.1 },
      angle: { value: 0.5, min: 0, max: 1, step: 0.01 },
      intensity: { value: 1.8, min: 0, max: 3, step: 0.01 },
      distance: { value: 17, min: 0, max: 20, step: 0.01 },
      penumbra: { value: 0.5, min: 0, max: 1, step: 0.01 },
    }
  );

  return (
    <div className="App">
      <Leva collapsed />
      <Canvas
        shadows
        camera={{
          position: [-18, 20, 20],
          near: 0.1,
          fov: 45,
          far: 250,
        }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("black");
          scene.fog = new THREE.Fog("#000000", 1, 300);
        }}
      >
        {/********** Lights ************/}
        <ambientLight args={[0xffffff, 0.3]} />
        <spotLight
          castShadow
          args={[0xffffff, intensity, distance, Math.PI * angle, penumbra]}
          position={[x, y, z]}
          shadow-mapSize={[512, 512]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10]}
          />
        </spotLight>
        <Suspense fallback={null}>
          {/********** Helpers ************/}
          {/* <axesHelper args={[10]} /> */}

          {/********** Back Wall ************/}
          <Floor rotation-x={0} position={[0, 15, -11]} size={[60, 30]} />

          {/********** Left Wall ************/}
          <Floor
            rotation-x={0}
            rotation-y={Math.PI * 0.5}
            position={[-30, 15, 14]}
            size={[50, 30]}
          />

          {/********** Floor ************/}
          <Floor position={[0, 0, 14]} size={[60, 50]} />

          {/********** Piano ************/}
          <Piano />

          {/********** Camera Controls ************/}
          <OrbitControls
            makeDefault
            maxDistance={50}
            minDistance={2}
            maxAzimuthAngle={1.5}
            minAzimuthAngle={-1.5}
            maxPolarAngle={1.2}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
