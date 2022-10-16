import * as THREE from "three";
import React, { useRef } from "react";
import { useLoader, Vector3 } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

type FloorProps = {
  position?: Vector3;
  size?: any;
};

export const Floor = (props: FloorProps) => {
  const { position, size } = props;
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    [
      "textures/wood-floor/Wood_basecolor.jpg",
      "textures/wood-floor/Wood_height.png",
      "textures/wood-floor/Wood_normal.jpg",
      "textures/wood-floor/Wood_roughness.jpg",
      "textures/wood-floor/Wood_ambientOcclusion.jpg",
    ]
  );

  //Texture config

  colorMap.repeat.set(4, 4);
  normalMap.repeat.set(4, 4);
  roughnessMap.repeat.set(4, 4);
  aoMap.repeat.set(4, 4);

  colorMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapS = THREE.RepeatWrapping;

  colorMap.wrapT = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;

  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh
      rotation-x={-0.5 * Math.PI}
      {...props}
      receiveShadow
      ref={meshRef}
      position={position}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={colorMap}
        displacementScale={0.2}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  );
};
