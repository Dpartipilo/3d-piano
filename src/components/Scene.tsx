import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { Piano } from "./Piano";
import { StagePlane } from "./StagePlane";
// import { Presentation } from "./components/Presentation";
import { useControls } from "leva";

export const Scene = (props: any) => {
  const [hovered, setHovered] = useState(false);

  //   const [{ intensity }, setIntensity] = useControls(() => ({
  //     intensity: { value: 0.8, min: 0, max: 3, step: 0.01 },
  //   }));
  const { x, y, z, angle, intensity, distance, penumbra, color } = useControls(
    "Light properties",
    {
      x: { value: 0.5, min: -15, max: 18, step: 0.1 },
      y: { value: 10, min: 0, max: 15, step: 0.1 },
      z: { value: 0, min: -10, max: 10, step: 0.1 },
      angle: { value: 0.6, min: 0, max: 1, step: 0.01 },
      intensity: { value: 0.8, min: 0, max: 3, step: 0.01 },
      distance: { value: 18, min: 0, max: 20, step: 0.01 },
      penumbra: { value: 0.5, min: 0, max: 1, step: 0.01 },
      color: "#fff3db",
    }
  );

  useEffect(() => {
    document.body.style.cursor = hovered
      ? "pointer"
      : "url('cursor.png') 39 39, url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39,  auto";
  }, [hovered]);

  // const { showPresentation } = useControls("Presentation", {
  //   showPresentation: false,
  // });

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

  // Lean in to the piano camera position animations
  useFrame(({ camera, mouse }) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 2,
      0.7
    );
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      mouse.y / 2,
      0.7
    );
    camera.position.y = THREE.MathUtils.lerp(53, mouse.y * 1, 0.5);
    camera.position.z = THREE.MathUtils.lerp(40, mouse.y * 18, 0.6);
    camera.lookAt(0, 0, 0);
    return null;
  });

  const spotlightRef = useRef<any>();
  return (
    <>
      {/********** Lights ************/}
      <ambientLight args={[0xffffff, 0.2]} />
      <spotLight
        ref={spotlightRef}
        castShadow
        args={[color, intensity, distance, Math.PI * angle, penumbra]}
        position={[x, y, z]}
        shadow-mapSize={[512, 512]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </spotLight>

      <pointLight args={["#fff3db", 3, 14, 2]} position={[15, 7, -1]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </pointLight>

      <pointLight args={["#fff3db", 3, 14, 2]} position={[-15, 7, -1]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </pointLight>

      <Suspense fallback={null}>
        {/********** Back Wall ************/}
        <StagePlane rotation-x={0} position={[0, 15, -11]} size={[80, 50]} />

        {/********** Left Wall ************/}
        <StagePlane
          rotation-x={0}
          rotation-y={Math.PI * 0.5}
          position={[-39, 15, 20]}
          size={[80, 30]}
        />

        {/********** Right Wall ************/}
        <StagePlane
          rotation-x={0}
          rotation-y={Math.PI * -0.5}
          position={[39, 15, 20]}
          size={[80, 30]}
        />

        {/********** Floor ************/}
        <StagePlane position={[0, 0, 24]} size={[80, 70]} />

        {/********** Piano ************/}
        <Piano
          position={[-3, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        />

        {/********** Presentation ************/}
        {/* {showPresentation && (
      <Presentation
        intensity={intensity}
        setIntensity={setIntensity}
        showPresentation={showPresentation}
      />
    )} */}
        {/********** Helpers ************/}
        {/* <axesHelper args={[10]} /> */}
      </Suspense>
    </>
  );
};
