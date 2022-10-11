import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";
import { playAudio } from "../utils";
import { useKeyboardControls } from "@react-three/drei";

type PianoKeyProps = {
  musicNote: string;
  position?: any;
  isBlackKey: boolean;
  name: string;
};

// type SoundProps = {
//   url?: string;
// };

// const Sound = (props: SoundProps) => {
//   const sound = useRef<THREE.PositionalAudio>(null);
//   const { camera } = useThree<any>();
//   const [listener] = useState(() => new THREE.AudioListener());
//   const buffer = useLoader<AudioBuffer, string>(
//     THREE.AudioLoader,
//     "piano-keys/key01.mp3"
//   );

//   useEffect(() => {
//     sound?.current?.setBuffer(buffer);
//     sound?.current?.setRefDistance(1);
//     sound?.current?.setLoop(true);
//     sound?.current?.play();

//     camera.add(listener);
//     console.log(sound);
//     return () => camera.remove(listener);
//   }, []);

//   return <positionalAudio ref={sound} args={[listener]} />;
// };

export const PianoKey = (props: PianoKeyProps) => {
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
      {isBlackKey ? (
        <meshStandardMaterial color={"black"} />
      ) : (
        <meshStandardMaterial color={"white"} />
      )}
    </mesh>
  );
};
