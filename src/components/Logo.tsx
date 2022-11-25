import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import LogoSvg from "../misc/f-logo.svg";
import { Text3D } from "@react-three/drei";

export const Logo = (props: GroupProps) => {
  const svg = useLoader(SVGLoader, LogoSvg);
  const logoShape = useMemo(() => {
    const shapes: any[] = [];
    svg.paths.forEach((p, i) => {
      shapes.push.apply(shapes, p.toShapes(true)); // catenate, so we can create a single geometry and mesh
    });

    return shapes;
  }, [svg.paths]);

  const textOptions = {
    size: 0.8,
    height: 0.04,
  };

  const logoRef = useRef<any>(null);

  const [hovered, setHovered] = useState(false);
  return (
    <group {...props} name="Formidable logo">
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
      </Text3D>
    </group>
  );
};
