import { ReactElement, useContext, useState } from "react";
import * as THREE from "three";
import {
  GroupProps,
  MeshProps,
  BoxGeometryProps,
  MeshPhysicalMaterialProps,
  Color,
  useFrame,
} from "@react-three/fiber";
import { Logo } from "./Logo";
import { PowerButton } from "./PowerButton";
import { LevelDial } from "./LevelDial/LevelDial";
import { DialsArea } from "./LevelDial";
import { ColorRepresentation } from "three";
import { PianoContext } from "./PianoContext";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
type PianoStructureProps = GroupProps & {
  size: number;
  pianoColor?: Color;
  lightColor?: ColorRepresentation;
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
  <mesh
    {...mesh}
    onPointerDown={(e) => {
      e.stopPropagation();
    }}
  >
    <boxGeometry {...geometry} />
    <meshPhysicalMaterial {...material} />
    {children}
  </mesh>
);

export const PianoStructure = (props: PianoStructureProps) => {
  const { pianoColor, lightColor = "red", size } = props;
  const [onControls, setOnControls] = useState(false);
  const {
    setSoundGain,
    setSoundAttack,
    setSoundDecay,
    setSoundSustain,
    setSoundRealease,
  } = useContext(PianoContext);

  useFrame(({ camera, mouse }) => {
    if (onControls) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 5, 0.09);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 16, 0.09);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3, 0.09);
      camera.lookAt(5, 0, 0);
    } else {
      if (isMobile) return;
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        mouse.y / 2,
        0.5
      );
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x, 0.2);
      camera.position.y = THREE.MathUtils.lerp(53, mouse.y * 1, 0.5);
      camera.position.z = THREE.MathUtils.lerp(40, mouse.y * 18, 0.6);
      camera.lookAt(0, 0, 0);
    }

    return null;
  });

  return (
    <group {...props} name="Piano body">
      <PianoBlock
        mesh={{
          castShadow: true,
          position: [size / 2, 4.75, 0],
          name: "Back piece",
        }}
        geometry={{ args: [size, 2.5, 2] }}
        material={{ color: pianoColor, roughness: 0.4, reflectivity: 0.3 }}
      />

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [0.75, 4.5, 3.8],
          name: "Left side",
        }}
        geometry={{ args: [1.5, 2, 9.5] }}
        material={{ color: pianoColor, roughness: 0.4, reflectivity: 0.3 }}
      />

      <PianoBlock
        mesh={{
          castShadow: true,
          position: [size - 0.75, 4.5, 3.8],
          name: "Right side",
        }}
        geometry={{ args: [1.5, 2, 9.5] }}
        material={{ color: pianoColor, roughness: 0.4, reflectivity: 0.3 }}
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
        <PowerButton position={[size - 1.5, 0, -0.2]} />
        <group
          onClick={() => setOnControls(true)}
          onPointerMissed={() => setOnControls(false)}
        >
          <DialsArea position={[12, 0.01, 1.8]} />

          <LevelDial
            lightColor={lightColor}
            position={[14, 0.2, 0]}
            maxValue={2}
            minValue={0}
            step={0.1}
            label="Attack"
            setValue={setSoundAttack}
          />

          <LevelDial
            lightColor={lightColor}
            position={[15.5, 0.2, 0]}
            maxValue={2}
            minValue={0}
            step={0.1}
            label="Decay"
            setValue={setSoundDecay}
          />

          <LevelDial
            lightColor={lightColor}
            position={[17, 0.2, 0]}
            maxValue={2}
            minValue={0}
            step={0.1}
            label="Sustain"
            setValue={setSoundSustain}
          />

          <LevelDial
            lightColor={lightColor}
            position={[18.5, 0.2, 0]}
            maxValue={5}
            minValue={0}
            step={0.1}
            label="Release"
            setValue={setSoundRealease}
          />

          <LevelDial
            lightColor={lightColor}
            position={[21, 0.2, 0]}
            maxValue={5}
            minValue={0}
            step={0.1}
            label="Gain"
            setValue={setSoundGain}
          />
        </group>
      </group>
    </group>
  );
};
