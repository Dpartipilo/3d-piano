import { useContext } from "react";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { PowerLight } from "./PowerLight";
import { PianoContext } from "./PianoContext";

const length = 0.9,
  width = 0.6;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

type PowerButtonProps = GroupProps & {};

export const PowerButton = (props: PowerButtonProps) => {
  const { power, togglePower } = useContext(PianoContext);
  return (
    <group {...props}>
      <mesh
        position={[0, power ? 0 : 0.1, 0]}
        rotation-x={Math.PI * 0.5}
        onClick={() => togglePower()}
      >
        <extrudeGeometry
          args={[
            shape,
            {
              steps: 5,
              depth: 0.12,
              bevelEnabled: true,
              bevelThickness: 0.05,
              bevelSize: 0.05,
              bevelOffset: 0.01,
              bevelSegments: 1,
            },
          ]}
        />
        <meshStandardMaterial color={"#282828"} roughness={0.6} />
      </mesh>
      <PowerLight power={power} />
    </group>
  );
};
