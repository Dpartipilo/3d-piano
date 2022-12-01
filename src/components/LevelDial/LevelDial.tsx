import { useContext, useEffect, useRef, useState } from "react";
import { GroupProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { ColorRepresentation, Group } from "three";
import { Text } from "@react-three/drei";
import { DialLights } from "./DialLights";
import { PianoContext } from "../PianoContext";

type LevelDialProps = GroupProps & {
  lightColor: ColorRepresentation;
  maxValue?: number;
  minValue?: number;
  step?: number;
  label?: string;
  setValue: (value: number) => void;
};
export const LevelDial = (props: LevelDialProps) => {
  const {
    lightColor,
    maxValue = 2,
    minValue = 0,
    // step = 0.1,
    label,
    setValue,
  } = props;
  const [clicked, setClicked] = useState(false);
  const [dialValue, setDialValue] = useState<number>(0);
  const cylinderRef = useRef<Group>(null!);
  const { power } = useContext(PianoContext);

  useEffect(() => {
    document.addEventListener("mouseup", handlePointerUp);
    return () => document.removeEventListener("mouseup", handlePointerUp);
  }, []);

  useEffect(() => {
    setValue(dialValue);
  }, [dialValue, setValue]);

  useFrame(({ mouse }) => {
    if (clicked) {
      cylinderRef.current.rotation.y = -(mouse.x + mouse.y) * 15;
    }
    return null;
  });

  const handlePointerMove = (e: any) => {
    e.stopPropagation();

    if (clicked) {
      const valueToSet = +Math.fround(e.uv.x * 2.5 + e.uv.y * 2 - 2).toFixed(1);

      // Check for max and min values
      if (valueToSet > maxValue) return setDialValue(maxValue);
      if (valueToSet < minValue) return setDialValue(minValue);

      // Avoid state changes if there is no change on value
      if (valueToSet !== +Math.fround(dialValue).toFixed(1)) {
        setDialValue(valueToSet);
      }
    }
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent> | MouseEvent) => {
    e.stopPropagation();
    setClicked(true);
  };
  const handlePointerUp = (e: MouseEvent | ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setClicked(false);
  };

  return (
    <group {...props}>
      <mesh
        position={[0, -0.2, 0]}
        rotation-x={Math.PI * -0.5}
        visible={false}
        onPointerMove={clicked ? handlePointerMove : undefined}
      >
        <planeGeometry args={[8, 8]} />
      </mesh>
      <group ref={cylinderRef}>
        {power && (
          <pointLight args={[lightColor, 1.5, 1, 1]} position={[0, 0.1, 0]} />
        )}
        <mesh onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
          <cylinderGeometry args={[0.17, 0.22, 0.5, 20, 3]} />
          <meshStandardMaterial color={"#282828"} roughness={0.6} />
        </mesh>

        <mesh position={[0, 0.03, -0.14]}>
          <boxGeometry args={[0.04, 0.5, 0.15]} />
          <meshPhysicalMaterial
            color={"grey"}
            emissive={power ? lightColor : "#300404"}
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

        <mesh position={[0, 0.03, 0.14]}>
          <boxGeometry args={[0.04, 0.5, 0.15]} />
          <meshPhysicalMaterial
            color={"grey"}
            emissive={power ? lightColor : "black"}
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

        <mesh rotation-y={Math.PI * 0.5} position={[0.14, 0.03, 0]}>
          <boxGeometry args={[0.04, 0.5, 0.15]} />
          <meshPhysicalMaterial
            color={"grey"}
            emissive={power ? lightColor : "#300404"}
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
        <mesh rotation-y={Math.PI * 0.5} position={[-0.14, 0.03, 0]}>
          <boxGeometry args={[0.04, 0.5, 0.15]} />
          <meshPhysicalMaterial
            color={"grey"}
            emissive={power ? lightColor : "#300404"}
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

      <DialLights lightColor={lightColor} dialValue={dialValue} />

      <Text
        color={"black"}
        anchorX="center"
        anchorY="middle"
        fontSize={0.2}
        rotation-x={Math.PI * -0.5}
        position={[0, -0.185, 0.6]}
      >
        <meshPhysicalMaterial
          color={"grey"}
          emissive={power ? lightColor : "#300404"}
          emissiveIntensity={0.6}
          transparent={true}
          transmission={1}
          opacity={1}
          roughness={0}
          thickness={0.3}
          reflectivity={0.9}
          ior={2}
        />
        {label}
      </Text>
    </group>
  );
};
