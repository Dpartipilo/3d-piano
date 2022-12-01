import { MeshProps } from "@react-three/fiber";
import { useContext } from "react";
import { ColorRepresentation } from "three";
import { LevelDialLight } from "./LevelDialLight";
import { PianoContext } from "../PianoContext";

type dialLightsProps = {
  rotation: number;
  onValue: number;
};

const dialLights: dialLightsProps[] = [
  {
    rotation: Math.PI * 0.5,
    onValue: 0.1,
  },
  {
    rotation: Math.PI * 0.3,
    onValue: 0.2,
  },
  {
    rotation: Math.PI * 0.1,
    onValue: 0.3,
  },
  {
    rotation: Math.PI * -0.12,
    onValue: 0.4,
  },
  {
    rotation: Math.PI * 0.7,
    onValue: 0.5,
  },
  {
    rotation: Math.PI * 0.5,
    onValue: 0.6,
  },
  {
    rotation: Math.PI * 0.3,
    onValue: 0.7,
  },
  {
    rotation: Math.PI * 0.1,
    onValue: 0.8,
  },
  {
    rotation: Math.PI * -0.12,
    onValue: 0.9,
  },
  {
    rotation: Math.PI * 0.7,
    onValue: 1,
  },
];

type DialLightsProps = {
  lightColor: ColorRepresentation;
  dialValue: number;
} & MeshProps;

export const DialLights = (props: DialLightsProps) => {
  const { lightColor, dialValue } = props;
  const { power } = useContext(PianoContext);

  return (
    <group rotation-y={Math.PI * -0.5}>
      <mesh
        name="Lights circle area"
        position={[0, -0.185, 0]}
        rotation-x={Math.PI * -0.5}
      >
        <circleGeometry args={[0.45, 30]} />
        <meshStandardMaterial color={"#262626"} />
      </mesh>
      {dialLights.map((DL, i) => {
        return (
          <LevelDialLight
            key={i}
            rotation-y={DL.rotation}
            position={[
              Math.cos(i * 0.63) * 0.3,
              -0.2,
              Math.sin(i * 0.63) * 0.3,
            ]}
            lightColor={lightColor}
            power={power && dialValue >= DL.onValue}
          />
        );
      })}
    </group>
  );
};
