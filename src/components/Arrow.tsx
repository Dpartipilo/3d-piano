import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export const Arrow = (props: any) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame(({ clock }) => {
    if (arrowRef.current) {
      arrowRef.current.rotation.x = clock.getElapsedTime();
    }

    return null;
  });

  const arrowRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={arrowRef}
      style={{ cursor: "pointer" }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
    >
      <coneGeometry args={[1.5, 5, 5]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};
