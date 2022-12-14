import * as THREE from "three";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useKeyboardControls, Text } from "@react-three/drei";
import { PianoContext } from "./PianoContext";
import { SoundfontContext } from "../providers/SoundfontContext";

type PianoKeyProps = {
  musicNote: string;
  position?: any;
  isBlackKey: boolean;
  name: string;
  keys: string[];
  isPressingDown?: boolean;
  handlePressingDown: (pressing: boolean) => void;
};

type PlayOptionsProps = {
  gain?: number; //float between 0 to 1
  attack?: number; //the attack time of the amplitude envelope
  decay?: number; //the decay time of the amplitude envelope
  sustain?: number; //the sustain gain value of the amplitude envelope
  release?: number; //the release time of the amplitude envelope
  adsr?: [number, number, number, number]; //an array of [attack, decay, sustain, release]. Overrides other parameters.
  duration?: number; //set the playing duration in seconds of the buffer(s)
  loop?: boolean; //set to true to loop the audio buffer
};

export const PianoKey = (props: PianoKeyProps) => {
  const { isBlackKey, name, keys, isPressingDown, handlePressingDown } = props;
  const { power, showShortcuts, gain, attack, decay, sustain, release } =
    useContext(PianoContext);
  const { playNote, stopNote } = useContext(SoundfontContext);

  const [playOptions, setPlayOptions] = useState<PlayOptionsProps>({});
  const pressed = useKeyboardControls((state) => state[name]);
  const sustainKey = useKeyboardControls((state) => state.Sustain);

  useEffect(() => {
    setPlayOptions({
      gain: gain! + 1,
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
      key.rotation.x = THREE.MathUtils.lerp(0, 0.06, 1);
      power && playNote?.(name, playOptions);
    } else {
      power && stopNote?.(name);
      key.rotation.x = THREE.MathUtils.lerp(0.06, 0, 1);
    }
  }, [pressed, name, power, playOptions, playNote, stopNote]);

  // ********** Handlers **********
  const handleOnPointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    handlePressingDown(true);
    power && playNote?.(name, playOptions);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.06, 1);
  };

  const handleOnPointerUp = useCallback(
    (e: MouseEvent | ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      handlePressingDown(false);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(0.06, 0, 1);
      stopNote?.(name);
    },
    [handlePressingDown, name, stopNote]
  );

  useEffect(() => {
    const stop = () => {
      handlePressingDown(false);
      stopNote?.(name);
    };
    document.addEventListener("mouseup", stop);
    return () => document.removeEventListener("mouseup", stop);
  }, [name, stopNote, handlePressingDown]);

  const handleOnPoinerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    meshRef.current.rotation.x = THREE.MathUtils.lerp(0.06, 0, 1);
    stopNote?.(name);
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
              bevelSegments: 40,
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
      )}

      {showShortcuts && (
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
