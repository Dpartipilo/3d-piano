import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useKeyboardControls, Text } from "@react-three/drei";

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

type PianoKeyProps = {
  musicNote: string;
  position?: any;
  isBlackKey: boolean;
  name: string;
  keys: string[];
  gain?: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  adsr?: number[];
  duration?: number;
  loop?: boolean;
  showKeys?: boolean;
  isPressingDown?: boolean;
  playNote: (midiNote: string, options: PlayOptionsProps) => void;
  stopNote: (midiNote: string) => void;
  handlePressingDown: (pressing: boolean) => void;
};

type PlayOptionsProps = {
  gain?: number; //float between 0 to 1
  attack?: number; //the attack time of the amplitude envelope
  decay?: number; //the decay time of the amplitude envelope
  sustain?: number; //the sustain gain value of the amplitude envelope
  release?: number; //the release time of the amplitude envelope
  adsr?: number[]; //an array of [attack, decay, sustain, release]. Overrides other parameters.
  duration?: number; //set the playing duration in seconds of the buffer(s)
  loop?: boolean; //set to true to loop the audio buffer
};

export const PianoKey = (props: PianoKeyProps) => {
  const {
    isBlackKey,
    name,
    gain,
    attack,
    decay,
    sustain,
    keys,
    release,
    showKeys,
    isPressingDown,
    playNote,
    stopNote,
    handlePressingDown,
  } = props;

  const [playOptions, setPlayOptions] = useState<PlayOptionsProps>({});
  const pressed = useKeyboardControls((state) => state[name]);
  const sustainKey = useKeyboardControls((state) => state.Sustain);

  useEffect(() => {
    setPlayOptions({
      gain,
      attack,
      decay,
      sustain,
      release: sustainKey ? 10 : release,
    });
  }, [gain, attack, decay, sustain, release, sustainKey]);

  // ********** Refs **********
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    const key = meshRef.current;
    if (pressed) {
      key.rotation.x = 0.06;
      playNote(name, playOptions);
    } else {
      stopNote(name);
      key.rotation.x = 0;
    }
  }, [pressed, name, playOptions, playNote, stopNote]);

  // ********** Handlers **********
  const handleOnPointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    handlePressingDown(true);
    playNote(name, playOptions);
    meshRef.current.rotation.x = 0.06;
  };

  const handleOnPointerUp = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    handlePressingDown(false);
    meshRef.current.rotation.x = 0;
    stopNote(name);
  };

  const handleOnPoinerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    meshRef.current.rotation.x = 0;
    stopNote(name);
  };

  const bk = {
    length: 0.1,
    width: 0.5,
  };

  const wk = {
    length: 1,
    width: 1,
  };

  const blackKeyShape = new THREE.Shape();
  blackKeyShape.moveTo(0, 0);
  blackKeyShape.lineTo(0, bk.width);
  blackKeyShape.lineTo(bk.length, bk.width);
  blackKeyShape.lineTo(bk.length, 0);
  blackKeyShape.lineTo(0, 0);

  const whiteKeyShape = new THREE.Shape();
  whiteKeyShape.moveTo(0, 0);
  whiteKeyShape.lineTo(0, wk.width);
  whiteKeyShape.lineTo(wk.length, wk.width);
  whiteKeyShape.lineTo(wk.length, 0);
  whiteKeyShape.lineTo(0, 0);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (isPressingDown) {
          handleOnPointerDown(e);
        }
      }}
      onPointerDown={(e) => {
        handleOnPointerDown(e);
      }}
      onPointerUp={(e) => {
        handleOnPointerUp(e);
      }}
      onPointerOut={(e) => {
        handleOnPoinerOut(e);
      }}
    >
      {isBlackKey ? (
        <extrudeGeometry
          args={[
            blackKeyShape,
            {
              steps: 2,
              depth: 4,
              bevelEnabled: true,
              bevelThickness: 0.6,
              bevelSize: 0.28,
              bevelOffset: 0.11,
              bevelSegments: 30,
            },
          ]}
        />
      ) : (
        <extrudeGeometry
          args={[
            whiteKeyShape,
            {
              steps: 2,
              depth: 7.3,
              bevelEnabled: false,
            },
          ]}
        />
        // <boxGeometry args={[1, 1, 8]} />
      )}

      {showKeys && (
        <Text
          color={`${isBlackKey ? "white" : "black"}`}
          anchorX="center"
          anchorY="middle"
          fontSize={0.5}
          rotation-x={Math.PI * -0.5}
          position={isBlackKey ? [0, 1, 3.5] : [0.5, 1.1, 6.5]}
        >
          {keys[0]}
        </Text>
      )}

      {isBlackKey ? (
        <meshPhongMaterial
          color={"#282828"}
          reflectivity={0.6}
          shininess={60}
          specular={"#363636"}
        />
      ) : (
        <meshStandardMaterial
          color={"#e0e0e0"}
          metalness={0.2}
          roughness={0.1}
        />
      )}
    </mesh>
  );
};
