import * as THREE from "three";
import React from "react";

type PianoStructureProps = {};

export const PianoStructure = (props: PianoStructureProps) => {
  return (
    <>
      <mesh castShadow position={[0, 4.75, -4.1]} name="back piece">
        <boxGeometry args={[21.7, 2.5, 2]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0} />
      </mesh>

      <mesh castShadow position={[-10.1, 4.5, -0.25]} name="Left side">
        <boxGeometry args={[1.5, 2, 9.5]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0} />
      </mesh>

      <mesh castShadow position={[10.1, 4.5, -0.25]} name="Right side">
        <boxGeometry args={[1.5, 2, 9.5]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0} />
      </mesh>
    </>
  );
};
