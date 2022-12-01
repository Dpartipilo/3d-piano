import { MeshProps } from "@react-three/fiber";
import { ColorRepresentation } from "three";

type DialLightProps = {
  lightColor: ColorRepresentation;
  power: boolean;
} & MeshProps;

export const LevelDialLight = (props: DialLightProps) => {
  const { lightColor, power } = props;
  return (
    <mesh {...props}>
      <boxGeometry args={[0.05, 0.08, 0.15]} />
      <meshPhysicalMaterial
        color={power ? lightColor : "#300404"}
        emissive={power ? lightColor : "#300404"}
        emissiveIntensity={0.6}
        transparent={true}
        transmission={1}
        opacity={1}
        roughness={0}
        thickness={0.3}
        reflectivity={1}
        ior={2}
      />
    </mesh>
  );
};
