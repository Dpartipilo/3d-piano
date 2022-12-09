import * as THREE from "three";
import { Color, GroupProps } from "@react-three/fiber";
import { useContext } from "react";
import { PianoContext } from "./PianoContext";
import { SoundfontContext } from "../providers/SoundfontContext";
import { Text } from "@react-three/drei";
type ScreenProps = GroupProps & {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  pianoColor?: Color;
};

const frameX = 3;
const frameY = 0.8;
const thickness = 0.2;
const holeX = frameX - thickness;
const holeY = frameY - thickness;

//Create a frame shape..
const frame = new THREE.Shape();
frame.moveTo(-frameX, -frameY);
frame.lineTo(frameX, -frameY);
frame.lineTo(frameX, frameY);
frame.lineTo(-frameX, frameY);

//..with a hole:
const hole = new THREE.Path();
hole.moveTo(-holeX, -holeY);
hole.lineTo(holeX, -holeY);
hole.lineTo(holeX, holeY);
hole.lineTo(-holeX, holeY);
frame.holes.push(hole);

const extrudeSettings = {
  steps: 1,
  depth: 1,
  bevelEnabled: false,
};

export const Screen = (props: ScreenProps) => {
  const { pianoColor } = props;
  const { power, showShortcuts, attack, decay, sustain, release, gain } =
    useContext(PianoContext);
  const { selectedInstrument } = useContext(SoundfontContext);

  return (
    <group {...props} rotation-x={Math.PI * 0.1}>
      <mesh rotation-x={Math.PI * -0.5}>
        <extrudeGeometry args={[frame, extrudeSettings]} />
        <meshStandardMaterial
          color={pianoColor}
          roughness={0.6}
          metalness={0}
        />
      </mesh>

      <mesh position={[0, 0.95, 0]} rotation-x={Math.PI * -0.5}>
        <planeGeometry args={[5.7, 1.3]} />
        <meshPhysicalMaterial
          color={power ? "#0083c9" : "#300404"}
          emissive={power ? "#0083c9" : "#300404"}
          emissiveIntensity={0.6}
          transparent={true}
          transmission={0.7}
          opacity={1}
          roughness={0}
          thickness={0.3}
          reflectivity={1}
          ior={2}
        />

        {power && (
          <>
            <Text
              color={"black"}
              anchorX="center"
              anchorY="middle"
              fontSize={0.35}
              rotation-x={Math.PI * 0.01}
              position={[-0.7, 0.1, 0.01]}
            >
              {selectedInstrument
                ?.split("_")
                .map((word) => word.replace(word[0], word[0].toUpperCase()))
                .join(" ")}
            </Text>

            <Text
              color={"black"}
              anchorX="center"
              anchorY="middle"
              fontSize={0.21}
              rotation-x={Math.PI * 0.01}
              position={[2.29, 0.45, 0.01]}
            >
              {`Gain: ${gain?.toFixed(1)}`}
            </Text>

            <Text
              color={"black"}
              anchorX="center"
              anchorY="middle"
              fontSize={0.21}
              rotation-x={Math.PI * 0.01}
              position={[2.19, 0.15, 0.01]}
            >
              {`Attack: ${attack?.toFixed(1)}`}
            </Text>

            <Text
              color={"black"}
              anchorX="center"
              anchorY="middle"
              fontSize={0.21}
              rotation-x={Math.PI * 0.01}
              position={[2.2, -0.05, 0.01]}
            >
              {`Decay: ${decay?.toFixed(1)}`}
            </Text>

            <Text
              color={"black"}
              anchorX="center"
              anchorY="middle"
              fontSize={0.21}
              rotation-x={Math.PI * 0.01}
              position={[2.13, -0.25, 0.01]}
            >
              {`Sustain: ${sustain?.toFixed(1)}`}
            </Text>
            <Text
              color={"black"}
              anchorX="center"
              anchorY="middle"
              fontSize={0.21}
              rotation-x={Math.PI * 0.01}
              position={[2.11, -0.45, 0.01]}
            >
              {`Release: ${release?.toFixed(1)}`}
            </Text>

            <Text
              color={"black"}
              anchorX="center"
              anchorY="middle"
              fontSize={0.21}
              rotation-x={Math.PI * 0.01}
              position={[-2.05, -0.45, 0.01]}
            >
              {`Shortcuts: ${showShortcuts ? "on" : "off"}`}
            </Text>
          </>
        )}
      </mesh>
    </group>
  );
};
