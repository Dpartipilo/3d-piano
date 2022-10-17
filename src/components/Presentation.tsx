import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { presentetionContent } from "../misc";

import { Arrow } from "./Arrow";

export const Presentation = (props: any) => {
  const { showPresentation, intensity, setIntensity } = props;
  const [contentPage, setContentPage] = useState(0);

  const TextRef = useRef<any>();
  const spotlightRef = useRef<any>();
  const vec = new THREE.Vector3();

  //   const { rotationX, rotationY, rotationZ } = useControls("Arrows", {
  //     rotationX: { value: 0, min: -10, max: 10, step: 0.01 },
  //     rotationY: { value: 0, min: -10, max: 10, step: 0.01 },
  //     rotationZ: { value: 0, min: -10, max: 10, step: 0.01 },
  //   });

  useFrame(({ clock, camera }) => {
    if (showPresentation) {
      if (TextRef.current.strokeOpacity < 1) {
        TextRef.current.strokeOpacity += clock.getElapsedTime() * 0.001;
        TextRef.current.fillOpacity += clock.getElapsedTime() * 0.001;
        TextRef.current.outlineOpacity += clock.getElapsedTime() * 0.001;
      }

      if (intensity > 0) {
        setIntensity({ intensity: intensity - clock.getElapsedTime() * 0.01 });
        // console.log(intensity);
      }

      if (spotlightRef.current.intensity < 2) {
        spotlightRef.current.intensity +=
          spotlightRef.current.intensity + clock.getElapsedTime() * 0.001;
      }

      camera.lookAt(TextRef.current.position);
      camera.position.lerp(
        vec.set(
          TextRef.current.position.x,
          TextRef.current.position.y + 50,
          TextRef.current.position.z + 35
        ),
        0.01
      );
      camera.updateProjectionMatrix();

      //   setX({ x: TextRef.current.position.x });
    } else {
      if (TextRef.current.strokeOpacity > 0) {
        TextRef.current.strokeOpacity -= clock.getElapsedTime() * 0.001;
        TextRef.current.fillOpacity -= clock.getElapsedTime() * 0.001;
        TextRef.current.outlineOpacity -= clock.getElapsedTime() * 0.001;
      }

      if (spotlightRef.current.intensity > 0) {
        spotlightRef.current.intensity -=
          spotlightRef.current.intensity + clock.getElapsedTime() * 0.001;
        if (spotlightRef.current.intensity < 0)
          spotlightRef.current.intensity = 0;
      }

      if (intensity <= 2.5) {
        console.log(intensity);
        setIntensity({
          intensity: intensity + clock.getElapsedTime() * 0.01,
        });
      }
    }

    return null;
  });

  const handlePagination = (pageChange: string) => {
    switch (pageChange) {
      case "next":
        console.log("next");
        if (contentPage === presentetionContent.length - 1) {
          return setContentPage(0);
        }

        setContentPage(contentPage + 1);
        break;
      case "previous":
        console.log("prev");
        if (contentPage === 0) {
          return setContentPage(presentetionContent.length - 1);
        }
        setContentPage(contentPage - 1);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <spotLight
        ref={spotlightRef}
        args={[0xffffff, 0.2, 20, Math.PI * 1, 0.2]}
        position={[0, 8, 20]}
      />
      <mesh>
        <Text
          ref={TextRef}
          color="black"
          anchorX="center"
          anchorY="middle"
          fontSize={1.3}
          rotation-x={Math.PI * -0.5}
          position={[0, 1, 20]}
          fillOpacity={0}
          strokeOpacity={0}
          outlineOpacity={0}
        >
          {presentetionContent[contentPage]}
        </Text>
      </mesh>
      <Arrow
        position={[18, 3, 35]}
        rotation-z={Math.PI * -0.5}
        onClick={() => handlePagination("next")}
      />
      <Arrow
        position={[-18, 3, 35]}
        rotation-z={Math.PI * 0.5}
        onClick={() => handlePagination("previous")}
      />
    </>
  );
};
