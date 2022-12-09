import * as THREE from "three";
import { GroupProps, ThreeEvent } from "@react-three/fiber";
import { ReactElement, useContext, useState } from "react";
import { PianoContext } from "./PianoContext";
import { ColorRepresentation } from "three";
const width = 1.2,
  height = 0.6;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, height);
shape.lineTo(width, height);
shape.lineTo(width, 0);
shape.lineTo(0, 0);

type ControlsButtonProps = {
  lightColor?: ColorRepresentation;
  icon?: ReactElement;
  action?: () => void;
} & GroupProps;

export const ControlsButton = (props: ControlsButtonProps) => {
  const { action, icon, lightColor } = props;
  const [clicked, setClicked] = useState(false);
  const { power } = useContext(PianoContext);

  const handleOnPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    action && action();
    setClicked(true);
  };
  const handleOnPointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    setClicked(false);
  };

  return (
    <group
      {...props}
      onPointerDown={handleOnPointerDown}
      onPointerUp={handleOnPointerUp}
    >
      <mesh
        rotation-x={Math.PI * -0.5}
        position={[0.6, clicked ? 0.075 : 0.16, 0.3]}
      >
        {icon ? icon : null}

        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial color={"#282828"} roughness={0.6} />
      </mesh>

      <mesh position={[0, clicked ? 0.02 : 0.1, 0]} rotation-x={Math.PI * 0.5}>
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

        <meshPhysicalMaterial
          color={power ? lightColor : "#300404"}
          emissive={power ? lightColor : "#300404"}
          // color={power ? "#c71a1a" : "#300404"}
          // emissive={power ? "#c71a1a" : "#300404"}
          emissiveIntensity={0.5}
          transparent={true}
          transmission={1}
          opacity={1}
          roughness={0}
          thickness={0.3}
          reflectivity={0.8}
          ior={2}
        />
      </mesh>
    </group>
  );
};
