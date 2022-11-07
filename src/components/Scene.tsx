import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { Piano } from "./Piano";
import { StagePlane } from "./StagePlane";
import { useControls } from "leva";

export const Scene = (props: any) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
      color: "#f5eede",
    }
  );

  // Lean in to the piano camera position animations
  useFrame(({ camera, mouse }) => {
    if (isMobile) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x, 0.1);
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      mouse.y / 2,
      0.5
    );
    camera.position.y = THREE.MathUtils.lerp(53, mouse.y * 1, 0.5);
    camera.position.z = THREE.MathUtils.lerp(40, mouse.y * 18, 0.6);
    camera.lookAt(0, 0, 0);
    return null;
  });

  // Light on pointer
  useFrame(({ mouse }) => {
    if (isMobile) return;

    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = mouse.x * 16;

      cursorLightRef.current.position.z = -mouse.y * 10;
    }

    return null;
  });

  const spotlightRef = useRef<any>();
  const cursorLightRef = useRef<THREE.PointLight>(null);
  return (
    <>
      {/********** Lights ************/}
      <ambientLight args={[0xffffff, 0.4]} />
      <hemisphereLight args={[color, 0x080820, 0.3]} />

      {isMobile ? null : (
        <pointLight
          ref={cursorLightRef}
          args={["#70a0d4", 6, 15, 4]}
          position={[0, 9, 2]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, 10, -10]}
          />
        </pointLight>
      )}

      <spotLight
        ref={spotlightRef}
        castShadow
        args={[color, intensity, distance, Math.PI * angle, penumbra]}
        position={[x, y, z]}
        shadow-mapSize={[512, 512]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </spotLight>

      <pointLight args={[color, 3, 14, 2]} position={[15, 7, -1]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </pointLight>

      <pointLight args={[color, 3, 14, 2]} position={[-15, 7, -1]}>
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
        <Piano position={[-3, 0, 0]} />

        {/********** Presentation ************/}
        {/* {showPresentation && (
      <Presentation
        intensity={intensity}
        setIntensity={setIntensity}
        showPresentation={showPresentation}
      />
    )} */}
        {/********** Helpers ************/}
        {/* {cursorLightRef.current && (
        <pointLightHelper
          args={[cursorLightRef.current, 5, "white"]}
        ></pointLightHelper>
      )} */}
        {/* <axesHelper args={[10]} /> */}
      </Suspense>
    </>
  );
};
