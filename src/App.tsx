import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { KeyboardControls, OrbitControls } from "@react-three/drei";

import { KeyboardKey } from "./components/KeyboardKey";
import { Floor } from "./components/Floor";

const keyboardKeys = [
  {
    id: "40",
    name: "C4",
    isBlackKey: false,
    position: [-1.1, 1, 0],
    keys: ["q", "Q"],
  },
  {
    id: "41",
    name: "C#4",
    isBlackKey: true,
    position: [-0.5, 1.5, -1.4],
    keys: ["2"],
  },
  {
    id: "42",
    name: "D4",
    isBlackKey: false,
    position: [0, 1, 0],
    keys: ["w", "W"],
  },
  {
    id: "43",
    name: "D#4",
    isBlackKey: true,
    position: [0.6, 1.5, -1.4],
    keys: ["3"],
  },
  {
    id: "44",
    name: "E4",
    isBlackKey: false,
    position: [1.1, 1, 0],
    keys: ["e", "E"],
  },
  {
    id: "45",
    name: "F4",
    isBlackKey: false,
    position: [2.2, 1, 0],
    keys: ["r", "R"],
  },
  {
    id: "46",
    name: "F#4",
    isBlackKey: true,
    position: [2.7, 1.5, -1.4],
    keys: ["5"],
  },
  {
    id: "47",
    name: "G4",
    isBlackKey: false,
    position: [3.3, 1, 0],
    keys: ["t", "T"],
  },
  {
    id: "48",
    name: "G#4",
    isBlackKey: true,
    position: [3.8, 1.5, -1.4],
    keys: ["6"],
  },
  {
    id: "49",
    name: "A4",
    isBlackKey: false,
    position: [4.4, 1, 0],
    keys: ["y", "Y"],
  },
  {
    id: "50",
    name: "A#4",
    isBlackKey: true,
    position: [4.9, 1.5, -1.4],
    keys: ["7"],
  },
  {
    id: "51",
    name: "B",
    isBlackKey: false,
    position: [5.5, 1, 0],
    keys: ["u", "U"],
  },
  {
    id: "52",
    name: "C5",
    isBlackKey: false,
    position: [6.6, 1, 0],
    keys: ["i", "I"],
  },
];

const keyboardControlKeys = keyboardKeys.map((keyboardKey) => {
  return { name: keyboardKey.name, keys: keyboardKey.keys };
});
console.log(keyboardControlKeys);

function App() {
  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 7, 10], near: 0.1 }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color(0x000000);
        }}
      >
        <ambientLight args={[0xffffff, 0.5]} />
        <spotLight args={[0xffffff, 1, 10]} position={[0, 5, 0]} />
        {/* <Floor /> */}
        <axesHelper args={[10]} />

        <KeyboardControls map={keyboardControlKeys}>
          <group name="Octave 4" position={[0, 3, 0]}>
            {keyboardKeys.map(({ isBlackKey, id, position, name }) => (
              <KeyboardKey
                key={name}
                isBlackKey={isBlackKey}
                musicNote={id}
                position={position}
                name={name}
              />
            ))}
          </group>
        </KeyboardControls>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default App;
