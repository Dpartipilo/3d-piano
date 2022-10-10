import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type FloorProps = {};

export const Floor = (props: FloorProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  //   useFrame(() => (meshRef.current.rotation.x += 0.01));

  return (
    <mesh {...props} ref={meshRef} rotation-x={-0.5 * Math.PI}>
      <planeGeometry args={[10, 10, 8]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
};
