import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useCubeTexture, useKeyboardControls } from "@react-three/drei";
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
  const { isBlackKey, name, playNote, stopNote } = props;

  const [playing, setPlaying] = useState(false);
  const [playOptions, setPlayOptions] = useState<PlayOptionsProps>({});
  const pressed = useKeyboardControls((state) => state[name]);

  // const [whiteKeyMatcap, blackKeyMatcap] = useLoader(TextureLoader, [
  //   "textures/matcaps/3.png",
  //   "textures/matcaps/4.png",
  // ]);

  // const envMap = useCubeTexture(
  //   ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
  //   { path: "textures/environmentMaps/space/" }
  // );

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

  // ********** Refs **********
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    setPlayOptions({ gain, attack, decay, sustain, release });
  }, [gain, attack, decay, sustain, release, duration]);

  useEffect(() => {
    const key = meshRef.current;
    if (pressed || playing) {
      key.rotation.x = 0.1;
      playNote(name, playOptions);
    } else {
      stopNote(name);
      key.rotation.x = 0;
    }
  }, [pressed, playing, name, playOptions, playNote, stopNote]);

  // ********** Handlers **********

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
        <meshStandardMaterial
          // envMap={envMap}
          color={"black"}
          metalness={2}
          roughness={0.1}
        />
      ) : (
        <meshStandardMaterial
          // envMap={envMap}
          color={"#878787"}
          metalness={0.2}
          roughness={0.1}
        />
      )}
    </mesh>
  );
};
