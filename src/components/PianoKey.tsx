import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useKeyboardControls, Text } from "@react-three/drei";
import { useControls } from "leva";

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
  playNote: (midiNote: string, options: PlayOptionsProps) => void;
  stopNote: (midiNote: string) => void;
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
  const { isBlackKey, name, keys, playNote, stopNote } = props;

  const [playOptions, setPlayOptions] = useState<PlayOptionsProps>({});
  const pressed = useKeyboardControls((state) => state[name]);
  const sustainKey = useKeyboardControls((state) => state.Sustain);

  // ********** Leva GUI controls **********
  const { gain, attack, decay, sustain, release, duration } = useControls(
    "Sound properties",
    {
      gain: { value: 2, min: 0, max: 10, step: 0.1 },
      attack: { value: 0, min: 0, max: 5, step: 0.1 },
      decay: { value: 0, min: 0, max: 5, step: 0.1 },
      sustain: { value: 0, min: 0, max: 5, step: 0.1 },
      release: { value: 0.7, min: 0, max: 5, step: 0.1 },
      duration: { value: 0, min: 0, max: 5, step: 0.1 },
    }
  );

  const { showKeys } = useControls("Show keyboard shortcuts", {
    showKeys: false,
  });

  useEffect(() => {
    setPlayOptions({
      gain,
      attack,
      decay,
      sustain,
      release: sustainKey ? 10 : release,
    });
  }, [gain, attack, decay, sustain, release, duration, sustainKey]);

  // ********** Refs **********
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    const key = meshRef.current;
    if (pressed) {
      key.rotation.x = 0.1;
      playNote(name, playOptions);
    } else {
      stopNote(name);
      key.rotation.x = 0;
    }
  }, [pressed, name, playOptions, playNote, stopNote]);

  // ********** Handlers **********
  const handleOnPoinerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    playNote(name, playOptions);
    meshRef.current.rotation.x = 0.1;
    // setPlaying(true);
  };

  const handleOnPoinerUp = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    meshRef.current.rotation.x = 0;
    stopNote(name);
    // setPlaying(false);
  };

  const handleOnPoinerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    meshRef.current.rotation.x = 0;
    stopNote(name);
    // setPlaying(false);
  };

  const length = 0.1,
    width = 0.3;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 2,
    depth: 4,
    bevelEnabled: true,
    bevelThickness: 0.6,
    bevelSize: 0.28,
    bevelOffset: 0.11,
    bevelSegments: 15,
  };

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
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
      {isBlackKey ? (
        <extrudeGeometry args={[shape, extrudeSettings]} />
      ) : (
        <boxGeometry args={isBlackKey ? [1, 1.9, 5] : [1, 1, 8]} />
      )}

      {showKeys && (
        <Text
          color={`${isBlackKey ? "white" : "black"}`}
          anchorX="center"
          anchorY="middle"
          fontSize={0.5}
          rotation-x={Math.PI * -0.5}
          position={isBlackKey ? [0, 1, 2] : [0, 0.6, 3.5]}
        >
          {keys[0]}
        </Text>
      )}

      {isBlackKey ? (
        // <meshStandardMaterial color={"white"} roughness={0} />
        <meshStandardMaterial color={"#363535"} roughness={0} />
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
