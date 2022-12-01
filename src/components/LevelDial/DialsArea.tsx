import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

type DialsAreaProps = GroupProps & {
  width?: number;
  height?: number;
};

const x = 1;
const y = 1;
const width = 9;
const height = 1.6;
const radius = 0.1;

const shape = new THREE.Shape();
shape.moveTo(x, y + radius);
shape.lineTo(x, y + height - radius);
shape.quadraticCurveTo(x, y + height, x + radius, y + height);
shape.lineTo(x + width - radius, y + height);
shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
shape.lineTo(x + width, y + radius);
shape.quadraticCurveTo(x + width, y, x + width - radius, y);
shape.lineTo(x + radius, y);
shape.quadraticCurveTo(x, y, x, y + radius);

export const DialsArea = (props: DialsAreaProps) => {
  return (
    <group {...props}>
      <mesh rotation-x={Math.PI * -0.5}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color={"#303030"} roughness={0.6} metalness={0} />
      </mesh>
    </group>
  );
};
