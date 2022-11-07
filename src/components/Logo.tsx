import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import Logo from "../misc/f-logo.svg";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Text3D } from "@react-three/drei";
// import { CubeCamera, Mesh } from "three";

export const FormidableLogo = () => {
  const svg = useLoader(SVGLoader, Logo);
  const logoShape = useMemo(() => {
    const shapes: any[] = [];
    svg.paths.forEach((p, i) => {
      shapes.push.apply(shapes, p.toShapes(true)); // catenate, so we can create a single geometry and mesh
    });

    return shapes;
  }, [svg.paths]);

  // const [
  //   brass,
  //   colorMap,
  //   displacementMap,
  //   normalMap,
  //   roughnessMap,
  //   metalnessMap,
  //   aoMap,
  // ] = useLoader(TextureLoader, [
  //   "textures/stainless-steel-1.jpeg",
  //   "textures/stainless-steel/Metal_basecolor.jpg",
  //   "textures/stainless-steel/Metal_height.png",
  //   "textures/stainless-steel/Metal_normal.jpg",
  //   "textures/stainless-steel/Metal_roughness.jpg",
  //   "textures/stainless-steel/Metal_metallic.jpg",
  //   "textures/stainless-steel/Metal_ambientOcclusion.jpg",
  // ]);

  // const [
  //   colorMap2,
  //   displacementMap2,
  //   normalMap2,
  //   roughnessMap2,
  //   metalnessMap2,
  //   aoMap2,
  // ] = useLoader(TextureLoader, [
  //   "textures/stainless-steel/Metal_basecolor.jpg",
  //   "textures/stainless-steel/Metal_height.png",
  //   "textures/stainless-steel/Metal_normal.jpg",
  //   "textures/stainless-steel/Metal_roughness.jpg",
  //   "textures/stainless-steel/Metal_metallic.jpg",
  //   "textures/stainless-steel/Metal_ambientOcclusion.jpg",
  // ]);

  // const logoRepeat = 0.02;
  // const wordRepeat = 2;

  // brass.repeat.set(0.9, 0.9);
  // colorMap.repeat.set(logoRepeat, logoRepeat);
  // normalMap.repeat.set(logoRepeat, logoRepeat);
  // roughnessMap.repeat.set(logoRepeat, logoRepeat);
  // displacementMap.repeat.set(logoRepeat, logoRepeat);
  // metalnessMap.repeat.set(logoRepeat, logoRepeat);
  // aoMap.repeat.set(logoRepeat, logoRepeat);

  // brass.wrapS = THREE.RepeatWrapping;
  // colorMap.wrapS = THREE.RepeatWrapping;
  // normalMap.wrapS = THREE.RepeatWrapping;
  // roughnessMap.wrapS = THREE.RepeatWrapping;
  // metalnessMap.wrapS = THREE.RepeatWrapping;
  // aoMap.wrapS = THREE.RepeatWrapping;

  // brass.wrapT = THREE.RepeatWrapping;
  // colorMap.wrapT = THREE.RepeatWrapping;
  // normalMap.wrapT = THREE.RepeatWrapping;
  // roughnessMap.wrapT = THREE.RepeatWrapping;
  // metalnessMap.wrapT = THREE.RepeatWrapping;
  // aoMap.wrapT = THREE.RepeatWrapping;

  // colorMap2.repeat.set(wordRepeat, wordRepeat);
  // normalMap2.repeat.set(wordRepeat, wordRepeat);
  // roughnessMap2.repeat.set(wordRepeat, wordRepeat);
  // displacementMap2.repeat.set(wordRepeat, wordRepeat);
  // metalnessMap2.repeat.set(wordRepeat, wordRepeat);
  // aoMap2.repeat.set(wordRepeat, wordRepeat);

  // colorMap2.wrapS = THREE.RepeatWrapping;
  // normalMap2.wrapS = THREE.RepeatWrapping;
  // roughnessMap2.wrapS = THREE.RepeatWrapping;
  // metalnessMap2.wrapS = THREE.RepeatWrapping;
  // aoMap2.wrapS = THREE.RepeatWrapping;

  // colorMap2.wrapT = THREE.RepeatWrapping;
  // normalMap2.wrapT = THREE.RepeatWrapping;
  // roughnessMap2.wrapT = THREE.RepeatWrapping;
  // metalnessMap2.wrapT = THREE.RepeatWrapping;
  // aoMap2.wrapT = THREE.RepeatWrapping;

  const textOptions = {
    size: 0.8,
    height: 0.04,
  };

  const logoRef = useRef<any>(null);
  // const cubeCam = useRef<CubeCamera>(null);

  // const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  //   generateMipmaps: true,
  //   minFilter: THREE.LinearMipmapLinearFilter,
  // });

  // useFrame(({ gl, scene }) => {
  //   if (cubeCam.current) {
  //     // console.log(cubeCam.current);
  //     cubeCam.current.update(gl, scene);
  //   }
  // });

  const [hovered, setHovered] = useState(false);
  return (
    <group position={[-12.5, 1.28, -0.5]} name="Formidable logo">
      {/* <cubeCamera
        ref={cubeCam}
        args={[1, 100000, cubeRenderTarget]}
        position={[-12.5, 1.35, -0.5]}
      /> */}

      <mesh
        position={[3, -0.1, 0.5]}
        rotation-x={Math.PI * -0.5}
        visible={false}
        onClick={() => window.open("https://www.formidable.com/", "_blank")}
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[5.9, 1.2]} />
      </mesh>

      <mesh ref={logoRef} scale={0.01} rotation-x={Math.PI * 0.5}>
        <extrudeGeometry
          args={[
            logoShape,
            {
              depth: 4,
              bevelEnabled: false,
            },
          ]}
        />

        <meshPhongMaterial
          side={THREE.DoubleSide}
          color={hovered ? "#F04D21" : "#7d838a"}
          emissive={hovered ? "#F04D21" : "#7d838a"}
          emissiveIntensity={0}
          reflectivity={1}
          shininess={100}
          specular={"#4599f7"}
        />

        {/* <meshPhysicalMaterial
          side={THREE.DoubleSide}
          map={colorMap}
          // envMap={brass}
          displacementMap={displacementMap}
          roughnessMap={roughnessMap}
          metalnessMap={metalnessMap}
          normalMap={normalMap}
          aoMap={aoMap}
          // aoMapIntensity={0}0
          displacementScale={0}
          metalness={0.8}
          roughness={0.1}
          reflectivity={1}
        /> */}

        {/* <meshLambertMaterial
          // color={"white"}
          side={THREE.DoubleSide}
          envMap={cubeRenderTarget.texture}
          color={"#a3cfff"}
          emissive={"#3d3d3d"}
          emissiveIntensity={2}
          // map={colorMap}
          // displacementMap={displacementMap}
          // roughnessMap={roughnessMap}
          // metalnessMap={metalnessMap}
          normalMap={normalMap}
          aoMap={aoMap}
          // displacementScale={0}
          // dispalcementScale={0}
          // metalness={0.5}
          // roughness={0}
          // combine={0.5}
          reflectivity={0.95}
        /> */}
      </mesh>

      <Text3D
        font={"/fonts/Castledown_Regular.json"}
        {...textOptions}
        position={[0.9, -0.05, 1.12]}
        rotation-x={Math.PI * -0.5}
      >
        ormidable
        <meshPhongMaterial
          color={hovered ? "#F04D21" : "#7d838a"}
          emissive={hovered ? "#F04D21" : "#7d838a"}
          emissiveIntensity={0}
          reflectivity={1}
          shininess={100}
          specular={"#4599f7"}
        />
        {/* <meshPhysicalMaterial
          // map={colorMap2}
          // emissive={"#3d3d3d"}
          // displacementMap={displacementMap2}
          // roughnessMap={roughnessMap2}
          // metalnessMap={metalnessMap2}
          normalMap={normalMap2}
          // aoMap={aoMap2}
          // aoMapIntensity={0}
          // displacementScale={0}
          metalness={0.9}
          roughness={0.1}
          reflectivity={1}
        /> */}
        {/* <meshLambertMaterial
          // color={"white"}
          side={THREE.DoubleSide}
          envMap={cubeRenderTarget.texture}
          color={"#a3cfff"}
          emissive={"#3d3d3d"}
          emissiveIntensity={2}
          // map={colorMap}
          // displacementMap={displacementMap}
          // roughnessMap={roughnessMap}
          // metalnessMap={metalnessMap}
          normalMap={normalMap}
          aoMap={aoMap}
          
          // displacementScale={0}
          // dispalcementScale={0}
          // metalness={0.5}
          // roughness={0}
          // combine={0.5}
          reflectivity={0.95}
        /> */}
      </Text3D>
    </group>
  );
};
