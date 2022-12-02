import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { Piano } from "./Piano";
import { StagePlane } from "./StagePlane";
import { useControls } from "leva";

export const Scene = (props: any) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // const { x, y, z, angle, intensity, distance, penumbra, color } = useControls(
  //   "Light properties",
  //   {
  //     x: { value: 0.5, min: -15, max: 18, step: 0.1 },
  //     y: { value: 10, min: 0, max: 15, step: 0.1 },
  //     z: { value: 0, min: -10, max: 10, step: 0.1 },
  //     angle: { value: 0.6, min: 0, max: 1, step: 0.01 },
  //     intensity: { value: 0.8, min: 0, max: 3, step: 0.01 },
  //     distance: { value: 18, min: 0, max: 20, step: 0.01 },
  //     penumbra: { value: 0.5, min: 0, max: 1, step: 0.01 },
  //     color: "#f5eede",
  //   }
  // );

  const intensity = 0.8;
  const distance = 18;
  const penumbra = 0.7;
  const angle = 1;
  const x = 0.5;
  const y = 10;
  const z = -2;
  const color = "#f5eede";

  // Light on pointer
  // useFrame(({ mouse }) => {
  //   if (isMobile) return;

  //   if (cursorLightRef.current) {
  //     cursorLightRef.current.position.x = mouse.x * 16;
  //     cursorLightRef.current.position.z = -mouse.y * 10;
  //   }

  //   return null;
  // });

  const spotlightRef = useRef<any>();
  // const cursorLightRef = useRef<THREE.PointLight>(null);
  return (
    <>
      {/********** Lights ************/}
      <ambientLight args={[0xffffff, 0.4]} />
      <hemisphereLight args={[color, 0x080820, 0.4]} />

      {/* {isMobile ? null : (
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
      )} */}

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
      <Piano />
    </>
  );
};
