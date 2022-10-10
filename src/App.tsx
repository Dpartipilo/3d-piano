import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";

import { WhiteKey } from "./components/WhiteKey";
import { BlackKey } from "./components/BlackKey";

const keyboardKeys = [
  {
    id: "40",
    name: "C4",
    isBlackKey: false,
    position: [-1.1, 1, 0],
  },
  {
    id: "41",
    name: "C#4",
    isBlackKey: true,
    position: [-0.5, 1.5, 0],
  },
  {
    id: "42",
    name: "D4",
    isBlackKey: false,
    position: [0, 1, 0],
  },
  {
    id: "43",
    name: "D#4",
    isBlackKey: true,
    position: [0.6, 1.5, 0],
  },
  {
    id: "44",
    name: "E4",
    isBlackKey: false,
    position: [1.1, 1, 0],
  },
  {
    id: "45",
    name: "F4",
    isBlackKey: false,
    position: [2.2, 1, 0],
  },
  {
    id: "46",
    name: "F#4",
    isBlackKey: true,
    position: [2.7, 1.5, 0],
  },
  {
    id: "47",
    name: "G4",
    isBlackKey: false,
    position: [3.3, 1, 0],
  },
  {
    id: "48",
    name: "G#4",
    isBlackKey: true,
    position: [3.8, 1.5, 0],
  },
  {
    id: "49",
    name: "A4",
    isBlackKey: false,
    position: [4.4, 1, 0],
  },
  {
    id: "50",
    name: "A#4",
    isBlackKey: true,
    position: [4.9, 1.5, 0],
  },
  {
    id: "51",
    name: "B",
    isBlackKey: false,
    position: [5.5, 1, 0],
  },
];

function App() {
  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 7, 10], near: 0.1 }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color(0x000000);
        }}
      >
        <ambientLight />
        <spotLight args={[0xffffff, 1, 10]} position={[0, 5, 0]} />
        <group name="Octave 4" position={[0, 0, 0]}>
          {keyboardKeys.map(({ isBlackKey, id, position }) =>
            isBlackKey ? (
              <BlackKey musicNote={id} position={position} />
            ) : (
              <WhiteKey musicNote={id} position={position} />
            )
          )}
        </group>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default App;
