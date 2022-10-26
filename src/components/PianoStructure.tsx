import React from "react";
import { GroupProps } from "@react-three/fiber";

type PianoStructureProps = GroupProps & {
  power: boolean;
};

export const PianoStructure = (props: PianoStructureProps) => {
  const { power } = props;
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

      <group position={[14, 6, -4]}>
        {power && (
          <pointLight args={["red", 4, 5, 2]} position={[0, 0.15, 0]} />
        )}
        <mesh
          rotation-x={Math.PI * 0.5}
          rotation-z={Math.PI * 0.5}
          name="On/Off light"
        >
          <capsuleGeometry args={[0.2, 0.5, 4, 15]} />
          <meshPhysicalMaterial
            color={"red"}
            emissive={power ? "#c71a1a" : "#300404"}
            emissiveIntensity={0.6}
            transparent={true}
            transmission={1}
            opacity={1}
            roughness={0}
            thickness={0.3}
          />
        </mesh>
      </group>
      {props.children}
    </group>
  );
};
