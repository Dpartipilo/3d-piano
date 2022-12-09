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
import { ControlsArea } from "./ControlsArea";
import { ColorRepresentation } from "three";
import { PianoContext } from "./PianoContext";
import { Screen } from "./Screen";
import { ScreenControls } from "./ScreenControls";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
type PianoStructureProps = GroupProps & {
  size: number;
  pianoColor?: Color;
  lightColor?: ColorRepresentation;
};

type PianoBlockProps = {
  mesh?: MeshProps;
  group?: GroupProps;
  material?: MeshPhysicalMaterialProps;
  geometry?: BoxGeometryProps;
  children?: ReactElement;
};

const PianoBlock = ({
  mesh,
  group,
  geometry,
  material,
  children,
}: PianoBlockProps) => (
  <group {...group}>
    <mesh
      {...mesh}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      <boxGeometry {...geometry} />
      <meshPhysicalMaterial {...material} />
    </mesh>
    {children}
  </group>
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
        group={{
          name: "Back piece",
          position: [0, -0.1, 0],
        }}
        mesh={{
          castShadow: true,
          position: [size / 2, 4.75, 0],
        }}
        geometry={{ args: [size, 3, 2.8] }}
        material={{ color: pianoColor, roughness: 0.4, reflectivity: 0.3 }}
      >
        <group position={[0, 6.3, 0]} name="Top Piano Toolbar">
          <Logo position={[0.45, 0.04, -0.5]} />
          <PowerButton position={[size - 1.5, 0, -0.2]} />
          <group>
            <ControlsArea
              position={[14, 0.01, 1.8]}
              onClick={() => setOnControls(true)}
              onPointerMissed={() => setOnControls(false)}
            />

            <Screen position={[10.5, -0.7, -0.6]} />
            <ScreenControls position={[7.82, -0.02, 0.65]} />

            <LevelDial
              lightColor={lightColor}
              position={[16, 0.2, 0]}
              maxValue={1}
              minValue={0}
              step={0.1}
              label="Attack"
              setValue={setSoundAttack}
            />

            <LevelDial
              lightColor={lightColor}
              position={[17.5, 0.2, 0]}
              maxValue={1}
              minValue={0}
              step={0.1}
              label="Decay"
              setValue={setSoundDecay}
            />

            <LevelDial
              lightColor={lightColor}
              position={[19, 0.2, 0]}
              maxValue={1}
              minValue={0}
              step={0.1}
              label="Sustain"
              setValue={setSoundSustain}
            />

            <LevelDial
              lightColor={lightColor}
              position={[20.5, 0.2, 0]}
              maxValue={1}
              minValue={0}
              step={0.1}
              label="Release"
              setValue={setSoundRealease}
            />

            <LevelDial
              lightColor={lightColor}
              position={[23, 0.2, 0]}
              maxValue={3}
              minValue={0}
              step={0.1}
              label="Gain"
              setValue={setSoundGain}
            />
          </group>
        </group>
      </PianoBlock>

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
        geometry={{ args: [size - 0.001, 0.7, 9.5] }}
        material={{ color: pianoColor, roughness: 0, reflectivity: 0.8 }}
      />
    </group>
  );
};
