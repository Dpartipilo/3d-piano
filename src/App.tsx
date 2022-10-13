import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import "./App.css";
import {
  KeyboardControls,
  OrbitControls,
  useCubeTexture,
} from "@react-three/drei";

import { PianoKey } from "./components/PianoKey";
import { Floor } from "./components/Floor";
import SoundfontProvider from "./providers/SoundfontProvider";
import { CubeTextureLoader } from "three/src/loaders/CubeTextureLoader";
import { useControls } from "leva";

const keyboardKeys = [
  {
    id: "37",
    name: "A3",
    isBlackKey: false,
    position: [-3.3, 1, 0],
    keys: [],
  },
  {
    id: "38",
    name: "A#3",
    isBlackKey: true,
    position: [-2.7, 1.5, -1.4],
    keys: [],
  },
  {
    id: "39",
    name: "B3",
    isBlackKey: false,
    position: [-2.2, 1, 0],
    keys: [],
  },
  {
    id: "40",
    name: "C4",
    isBlackKey: false,
    position: [-1.1, 1, 0],
    keys: ["q"],
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
    name: "B4",
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

const audioContext = new AudioContext();

type SoundfontProviderProps = {
  isLoading: any;
  playNote: any;
  stopNote: any;
};

function App() {
  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "textures/environmentMaps/space/" }
  );

  const { x, y, z, angle, intensity, distance, penumbra } = useControls(
    "Light properties",
    {
      x: { value: 0, min: -15, max: 15, step: 0.1 },
      y: { value: 10, min: 0, max: 15, step: 0.1 },
      z: { value: 0, min: -10, max: 10, step: 0.1 },
      angle: { value: 0.5, min: 0, max: 1, step: 0.01 },
      intensity: { value: 0.6, min: 0, max: 3, step: 0.01 },
      distance: { value: 15, min: 0, max: 20, step: 0.01 },
      penumbra: { value: 0.5, min: 0, max: 1, step: 0.01 },
    }
  );

  const pianoRef = useRef(null);
  console.log(envMap);
  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 10, 10], near: 0.1 }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("black");
          // scene.fog = new THREE.Fog("#000000", 10, 30);
        }}
      >
        {/********** Lights ************/}
        <ambientLight args={[0xffffff, 0.3]} />
        <spotLight
          args={[0xffffff, intensity, distance, Math.PI * angle, penumbra]}
          target={pianoRef.current ? pianoRef.current : undefined}
          position={[x, y, z]}
        />
        <Suspense fallback={null}>
          {/********** Helpers ************/}
          <axesHelper args={[10]} />

          {/********** Floor ************/}
          <Floor />

          {/********** Keyboard ************/}

          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={"https://d1pzp51pvbm36p.cloudfront.net"}
            render={({
              isLoading,
              playNote,
              stopNote,
            }: SoundfontProviderProps) => (
              <KeyboardControls map={keyboardControlKeys}>
                <group ref={pianoRef} name="Piano" position={[-4, 3, 0]}>
                  {keyboardKeys.map(({ isBlackKey, id, position, name }, i) => (
                    <PianoKey
                      key={name}
                      isBlackKey={isBlackKey}
                      musicNote={id}
                      position={position}
                      name={name}
                      playNote={playNote}
                      stopNote={stopNote}
                    />
                  ))}
                </group>
              </KeyboardControls>
            )}
          />

          {/********** Camera Controls ************/}
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
