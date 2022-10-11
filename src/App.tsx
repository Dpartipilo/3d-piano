import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Camera,
  Canvas,
  RootState,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import "./App.css";
import { KeyboardControls, OrbitControls } from "@react-three/drei";

import { PianoKey } from "./components/PianoKey";
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
  {
    id: "53",
    name: "C#5",
    isBlackKey: true,
    position: [7.1, 1.5, -1.4],
    keys: ["f", "F"],
  },
  {
    id: "54",
    name: "D5",
    isBlackKey: false,
    position: [7.7, 1, 0],
    keys: ["v", "V"],
  },
  {
    id: "55",
    name: "D#5",
    isBlackKey: true,
    position: [8.4, 1.5, -1.4],
    keys: ["g", "G"],
  },
  {
    id: "56",
    name: "E5",
    isBlackKey: false,
    position: [8.8, 1, 0],
    keys: ["b", "B"],
  },
];

const keyboardControlKeys = keyboardKeys.map((keyboardKey) => {
  return { name: keyboardKey.name, keys: keyboardKey.keys };
});

function App() {
  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 10, 10], near: 0.1 }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color(0x000000);
          // scene.fog = new THREE.Fog("#000000", 10, 30);
        }}
      >
        {/********** Lights ************/}
        <ambientLight args={[0xffffff, 0.5]} />
        <spotLight args={[0xffffff, 1, 10]} position={[0, 10, 0]} />
        <Suspense fallback={null}>
          {/********** Helpers ************/}
          <axesHelper args={[10]} />

          {/********** Floor ************/}
          <Floor />

          {/********** Keyboard ************/}
          <KeyboardControls map={keyboardControlKeys}>
            <group name="Octave 4" position={[-4, 3, 0]}>
              {keyboardKeys.map(({ isBlackKey, id, position, name }) => (
                <PianoKey
                  key={name}
                  isBlackKey={isBlackKey}
                  musicNote={id}
                  position={position}
                  name={name}
                />
              ))}
            </group>
          </KeyboardControls>

          {/********** Camera Controls ************/}
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
