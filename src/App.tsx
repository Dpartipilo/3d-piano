import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";

import { Piano } from "./components/Piano";
import { Floor } from "./components/Floor";
// import { Presentation } from "./components/Presentation";
import { useControls, Leva } from "leva";

function App() {
  const [{ intensity }, setIntensity] = useControls(() => ({
    intensity: { value: 1.5, min: 0, max: 3, step: 0.01 },
  }));
  const { x, y, z, angle, distance, penumbra, color } = useControls(
    "Light properties",
    {
      x: { value: 0.5, min: -15, max: 18, step: 0.1 },
      y: { value: 10, min: 0, max: 15, step: 0.1 },
      z: { value: 0, min: -10, max: 10, step: 0.1 },
      angle: { value: 0.6, min: 0, max: 1, step: 0.01 },
      // intensity: { value: 19, min: 0, max: 3, step: 0.01 },
      distance: { value: 18, min: 0, max: 20, step: 0.01 },
      penumbra: { value: 0.5, min: 0, max: 1, step: 0.01 },
      color: "#fff3db",
    }
  );

  // const { showPresentation } = useControls("Presentation", {
  //   showPresentation: false,
  // });

  const spotlightRef = useRef<any>();

  // useFrame(({ clock, camera }) => {
  //   if (showPresentation) {
  //     if (spotlightRef.current.intensity < 2) {
  //       spotlightRef.current.intensity +=
  //         spotlightRef.current.intensity + clock.getElapsedTime() * 0.001;
  //     }
  //   } else {
  //     if (spotlightRef.current.intensity > 0)
  //       spotlightRef.current.intensity -=
  //         spotlightRef.current.intensity + clock.getElapsedTime() * 0.001;
  //   }

  //   return null;
  // });

  return (
    <div className="App">
      <Leva collapsed />
      <Canvas
        shadows
        camera={{
          position: [0, 31, 25],
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
          ref={spotlightRef}
          castShadow
          args={[color, intensity, distance, Math.PI * angle, penumbra]}
          position={[x, y, z]}
          shadow-mapSize={[512, 512]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10]}
          />
        </spotLight>

        <pointLight args={["#fff3db", 2, 14, 2]} position={[15, 7, -1]}>
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10]}
          />
        </pointLight>

        <pointLight args={["#fff3db", 2, 14, 2]} position={[-15, 7, -1]}>
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10]}
          />
        </pointLight>

        <Suspense fallback={null}>
          {/********** Helpers ************/}
          {/* <axesHelper args={[10]} /> */}

          {/********** Back Wall ************/}
          <Floor rotation-x={0} position={[0, 15, -11]} size={[80, 50]} />

          {/********** Left Wall ************/}
          <Floor
            rotation-x={0}
            rotation-y={Math.PI * 0.5}
            position={[-39, 15, 20]}
            size={[80, 30]}
          />

          {/********** Right Wall ************/}
          <Floor
            rotation-x={0}
            rotation-y={Math.PI * -0.5}
            position={[39, 15, 20]}
            size={[80, 30]}
          />

          {/********** Floor ************/}
          <Floor position={[0, 0, 24]} size={[80, 70]} />

          {/********** Piano ************/}
          <Piano position={[-3, 0, 0]} />

          {/********** Piano ************/}
          {/* {showPresentation && (
            <Presentation
              intensity={intensity}
              setIntensity={setIntensity}
              showPresentation={showPresentation}
            />
          )} */}

          {/********** Camera Controls ************/}
          <OrbitControls
            makeDefault
            maxDistance={60}
            minDistance={20}
            maxAzimuthAngle={1}
            minAzimuthAngle={-1}
            maxPolarAngle={1.2}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
