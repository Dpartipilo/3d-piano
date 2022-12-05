import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { useMemo } from "react";

type ControlsAreaProps = GroupProps & {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
};

export const ControlsArea = (props: ControlsAreaProps) => {
  const { x = 1, y = 1, width = 9, height = 1.6, radius = 0.1 } = props;

  const areaShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width,
      y + height - radius
    );
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
    return shape;
  }, [x, y, width, height, radius]);

  return (
    <group {...props}>
      <mesh rotation-x={Math.PI * -0.5}>
        <shapeGeometry args={[areaShape]} />
        <meshStandardMaterial color={"#303030"} roughness={0.6} metalness={0} />
      </mesh>
    </group>
  );
};
