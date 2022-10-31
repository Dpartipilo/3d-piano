import React from "react";
import { GroupProps } from "@react-three/fiber";
import { PowerLight } from "./PowerLight";
import { FormidableLogo } from "./FormidableLogo";

type PianoStructureProps = GroupProps & {
  power: boolean;
};

export const PianoStructure = (props: PianoStructureProps) => {
  const { power } = props;

  return (
    <group {...props} name="Piano body">
      <mesh castShadow position={[2.8, 4.75, -4.1]} name="Back piece">
        <FormidableLogo />

        <boxGeometry args={[27.3, 2.5, 2]} />
        <meshPhysicalMaterial
          color={"#1f1f1e"}
          roughness={0}
          reflectivity={0.8}
        />
      </mesh>
      <mesh castShadow position={[-10.1, 4.5, -0.25]} name="Left side">
        <boxGeometry args={[1.5, 2, 9.5]} />
        <meshPhysicalMaterial
          color={"#1f1f1e"}
          roughness={0}
          reflectivity={0.8}
        />
      </mesh>
      <mesh castShadow position={[15.7, 4.5, -0.25]} name="Right side">
        <boxGeometry args={[1.5, 2, 9.5]} />
        <meshPhysicalMaterial
          color={"#1f1f1e"}
          roughness={0}
          reflectivity={0.8}
        />
      </mesh>
      <mesh castShadow position={[2.8, 3.5, -0.3]} name="Bottom side">
        <boxGeometry args={[27.3, 0.7, 9.6]} />
        <meshPhysicalMaterial
          color={"#1f1f1e"}
          opacity={1}
          roughness={0}
          reflectivity={1}
        />
      </mesh>
      <PowerLight power={power} />
      {props.children}
    </group>
  );
};
