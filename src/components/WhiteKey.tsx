import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { playAudio } from "../utils";

type WhiteKeyProps = {
  musicNote: string;
  position?: any;
};

export const WhiteKey = (props: WhiteKeyProps) => {
  const { musicNote } = props;

  const meshRef = useRef<THREE.Mesh>(null!);
  //   useFrame(() => (meshRef.current.rotation.x += 0.01));

  return (
    <mesh {...props} ref={meshRef} onClick={(e) => playAudio(e, musicNote)}>
      <boxGeometry args={[1, 1, 8]}></boxGeometry>
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
};
