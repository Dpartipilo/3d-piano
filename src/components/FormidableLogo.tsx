import React, { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import Logo from "../misc/f-logo.svg";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Text3D } from "@react-three/drei";

type FormidableLogoProps = {};

export const FormidableLogo = (props: FormidableLogoProps) => {
  const svg = useLoader(SVGLoader, Logo);
  const logoShape = useMemo(() => {
    const shapes: any[] = [];
    svg.paths.forEach((p, i) => {
      shapes.push.apply(shapes, p.toShapes(true)); // catenate, so we can create a single geometry and mesh
    });

    return shapes;
  }, [svg.paths]);

  const [
    brass,
    colorMap,
    displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    aoMap,
  ] = useLoader(TextureLoader, [
    "textures/stainless-steel-1.jpeg",
    "textures/stainless-steel/Metal_basecolor.jpg",
    "textures/stainless-steel/Metal_height.png",
    "textures/stainless-steel/Metal_normal.jpg",
    "textures/stainless-steel/Metal_roughness.jpg",
    "textures/stainless-steel/Metal_metallic.jpg",
    "textures/stainless-steel/Metal_ambientOcclusion.jpg",
  ]);

  const textureRepeatValue = 0.02;

  brass.repeat.set(0.9, 0.9);
  colorMap.repeat.set(textureRepeatValue, textureRepeatValue);
  normalMap.repeat.set(textureRepeatValue, textureRepeatValue);
  roughnessMap.repeat.set(textureRepeatValue, textureRepeatValue);
  metalnessMap.repeat.set(textureRepeatValue, textureRepeatValue);
  aoMap.repeat.set(textureRepeatValue, textureRepeatValue);

  brass.wrapS = THREE.RepeatWrapping;
  colorMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  metalnessMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapS = THREE.RepeatWrapping;

  brass.wrapT = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  metalnessMap.wrapT = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;

  const textOptions = {
    size: 0.8,
    height: 0.03,
  };

  return (
    <group position={[-12.5, 1.28, -0.5]} name="Formidable logo">
      <mesh scale={0.01} rotation-x={Math.PI * 0.5}>
        <extrudeGeometry
          args={[
            logoShape,
            {
              depth: 4,
              bevelEnabled: false,
            },
          ]}
        />

        <meshPhysicalMaterial
          side={THREE.DoubleSide}
          map={colorMap}
          displacementMap={displacementMap}
          roughnessMap={roughnessMap}
          metalnessMap={metalnessMap}
          normalMap={normalMap}
          aoMap={aoMap}
          displacementScale={0}
          metalness={0.6}
          roughness={0}
          reflectivity={0.9}
        />
      </mesh>

      <Text3D
        font={"/fonts/Castledown_Regular.json"}
        {...textOptions}
        position={[0.9, -0.03, 1.12]}
        rotation-x={Math.PI * -0.5}
      >
        ormidable
        <meshPhysicalMaterial
          map={brass}
          transmission={0}
          emissive={"#2b2b2b"}
          displacementMap={displacementMap}
          roughnessMap={roughnessMap}
          metalnessMap={metalnessMap}
          normalMap={normalMap}
          aoMap={aoMap}
          displacementScale={0}
          metalness={0.7}
          roughness={0.3}
          reflectivity={0.9}
        />
      </Text3D>
    </group>
  );
};
