import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { playAudio } from "../utils";
import { useKeyboardControls } from "@react-three/drei";

type KeyboardKeyProps = {
  musicNote: string;
  position?: any;
  isBlackKey: boolean;
  name: string;
};

export const KeyboardKey = (props: KeyboardKeyProps) => {
  const [playing, setPlaying] = useState(false);
  const { musicNote, isBlackKey, name } = props;
  const pressed = useKeyboardControls((state) => state[name]);

  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    const key = meshRef.current;
    if (pressed || playing) {
      key.rotation.x = 0.1;
      playAudio(musicNote);
    } else {
      key.rotation.x = 0;
    }
  }, [pressed, playing, musicNote]);

  const handleOnPoinerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setPlaying(true);
  };

  const handleOnPoinerUp = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setPlaying(false);
  };

  const handleOnPoinerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setPlaying(false);
  };

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerDown={(e) => {
        handleOnPoinerDown(e);
      }}
      onPointerUp={(e) => {
        handleOnPoinerUp(e);
      }}
      onPointerOut={(e) => {
        handleOnPoinerOut(e);
      }}
    >
      <boxGeometry args={isBlackKey ? [1, 1.9, 5] : [1, 1, 8]}></boxGeometry>
      <meshStandardMaterial color={isBlackKey ? "black" : "white"} />
    </mesh>
  );
};
