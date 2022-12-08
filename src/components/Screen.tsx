import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
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
  const { power, showShortcuts } = useContext(PianoContext);
  const { selectedInstrument } = useContext(SoundfontContext);

  return (
    <group {...props} rotation-x={Math.PI * 0.1}>
      <mesh rotation-x={Math.PI * -0.5}>
        <extrudeGeometry args={[frame, extrudeSettings]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0.6} metalness={0} />
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
              fontSize={0.4}
              rotation-x={Math.PI * 0.01}
              position={[-0.4, 0, 0.01]}
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
              fontSize={0.2}
              rotation-x={Math.PI * 0.01}
              position={[2, 0.4, 0.01]}
            >
              {`Shortcuts: ${showShortcuts ? "on" : "off"}`}
            </Text>
          </>
        )}
      </mesh>
    </group>
  );
};
