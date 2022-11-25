import React, { useEffect, useRef } from "react";
import { GroupProps } from "@react-three/fiber";

type PowerLightProps = GroupProps & {
  power: boolean;
};

export const PowerLight = (props: PowerLightProps) => {
  const { power } = props;

  return (
    <group position={[0.45, power ? 0.02 : 0.12, 0.1]}>
      {power && <pointLight args={["red", 4, 5, 2]} position={[0, 0.1, 0]} />}
      <mesh
        rotation-x={Math.PI * 0.5}
        rotation-z={Math.PI * 0.5}
        name="On/Off light"
      >
        <capsuleGeometry args={[0.1, 0.5, 4, 15]} />
        <meshPhysicalMaterial
          color={"red"}
          emissive={power ? "#c71a1a" : "#300404"}
          emissiveIntensity={0.6}
          transparent={true}
          transmission={1}
          opacity={1}
          roughness={0}
          thickness={0.3}
          reflectivity={0.9}
          ior={2}
        />
      </mesh>
    </group>
  );
};
