import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { playAudio } from "../utils";

type BlackKeyProps = {
  musicNote: string;
  position?: any;
};

export const BlackKey = (props: BlackKeyProps) => {
  const { musicNote } = props;

  const meshRef = useRef<THREE.Mesh>(null!);
  //   useFrame(() => (meshRef.current.rotation.x += 0.01));

  return (
    <mesh {...props} ref={meshRef} onClick={(e) => playAudio(e, musicNote)}>
      <boxGeometry args={[1, 1.9, 5]}></boxGeometry>
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};
