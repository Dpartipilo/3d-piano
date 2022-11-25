import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  GroupProps,
  MeshProps,
  BoxGeometryProps,
  MeshPhysicalMaterialProps,
  Color,
} from "@react-three/fiber";
import { Logo } from "./Logo";
import { PowerButton } from "./PowerButton";

type PianoStructureProps = GroupProps & {
  size: number;
  power: boolean;
  setPower: Dispatch<SetStateAction<boolean>>;
  pianoColor?: Color;
};

type PianoBlockProps = {
  mesh?: MeshProps;
  material?: MeshPhysicalMaterialProps;
  geometry?: BoxGeometryProps;
  children?: ReactElement;
};

const PianoBlock = ({
  mesh,
  geometry,
  material,
  children,
}: PianoBlockProps) => (
  <mesh {...mesh}>
    <boxGeometry {...geometry} />
    <meshPhysicalMaterial {...material} />
    {children}
  </mesh>
);

export const PianoStructure = (props: PianoStructureProps) => {
  const { power, pianoColor, size, setPower } = props;

  return (
    <group {...props} name="Piano body">
      <PianoBlock
        mesh={{
          castShadow: true,
          position: [size / 2, 4.75, 0],
          name: "Back piece",
        }}
        geometry={{ args: [size, 2.5, 2] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [0.75, 4.5, 3.8],
          name: "Left side",
        }}
        geometry={{ args: [1.5, 2, 9.5] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [size - 0.75, 4.5, 3.8],
          name: "Right side",
        }}
        geometry={{ args: [1.5, 2, 9.5] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [size / 2, 3.5, 3.8],
          name: "Bottom side",
        }}
        geometry={{ args: [size, 0.7, 9.5] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />
      <group position={[0, 6, 0]} name="Top Piano Toolbar">
        <Logo position={[0.45, 0.04, -0.5]} />
        <PowerButton
          setPower={setPower}
          power={power}
          position={[size - 1.5, 0, -0.2]}
        />
      </group>
    </group>
  );
};
