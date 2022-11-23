import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import {
  GroupProps,
  MeshProps,
  BoxGeometryProps,
  MeshPhysicalMaterialProps,
  Color,
} from "@react-three/fiber";

const length = 0.9,
  width = 0.6;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

type PowerButtonProps = {
  power: boolean;
  setPower: Dispatch<SetStateAction<boolean>>;
};

export const PowerButton = (props: PowerButtonProps) => {
  const { power, setPower } = props;
  const ref = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    const powerButton = ref.current;
    if (power) {
      powerButton.position.y = 6;
    } else {
      powerButton.position.y = 6.1;
    }
  }, [power]);

  return (
    <mesh
      ref={ref}
      position={[13.7, 6.1, -4.3]}
      rotation-x={Math.PI * 0.5}
      onPointerUp={() => setPower(!power)}
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
  );
};
