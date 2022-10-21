import React from "react";
import { GroupProps } from "@react-three/fiber";

export const PianoStructure = (props: GroupProps) => {
  return (
    <group {...props} name="Piano body">
      <mesh castShadow position={[2.8, 4.75, -4.1]} name="Back piece">
        <boxGeometry args={[27.3, 2.5, 2]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0} />
      </mesh>

      <mesh castShadow position={[-10.1, 4.5, -0.25]} name="Left side">
        <boxGeometry args={[1.5, 2, 9.5]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0} />
      </mesh>

      <mesh castShadow position={[15.7, 4.5, -0.25]} name="Right side">
        <boxGeometry args={[1.5, 2, 9.5]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0} />
      </mesh>
      <mesh castShadow position={[2.8, 3.5, -0.3]} name="Bottom side">
        <boxGeometry args={[27.3, 0.7, 9.6]} />
        <meshStandardMaterial color={"#1f1f1e"} roughness={0} />
      </mesh>
      {props.children}
    </group>
  );
};
