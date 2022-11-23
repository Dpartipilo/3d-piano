import React, { Dispatch, ReactElement, SetStateAction } from "react";
import {
  GroupProps,
  MeshProps,
  BoxGeometryProps,
  MeshPhysicalMaterialProps,
  Color,
} from "@react-three/fiber";
import { PowerLight } from "./PowerLight";
import { FormidableLogo } from "./Logo";
import { PowerButton } from "./PowerButton";

type PianoStructureProps = GroupProps & {
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
  const { power, pianoColor, setPower } = props;

  return (
    <group {...props} name="Piano body">
      <PianoBlock
        mesh={{
          castShadow: true,
          position: [2.8, 4.75, -4.1],
          name: "Back piece",
        }}
        geometry={{ args: [27.3, 2.5, 2] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      >
        <FormidableLogo />
      </PianoBlock>

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [-10.1, 4.5, -0.25],
          name: "Left side",
        }}
        geometry={{ args: [1.5, 2, 9.5] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [15.7, 4.5, -0.25],
          name: "Right side",
        }}
        geometry={{ args: [1.5, 2, 9.5] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [2.8, 3.5, -0.3],
          name: "Right side",
        }}
        geometry={{ args: [27.3, 0.7, 9.6] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />

      <PowerButton setPower={setPower} power={power} />
      <PowerLight power={power} />
    </group>
  );
};
