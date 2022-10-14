import React from "react";
import { KeyboardControls } from "@react-three/drei";
import { PianoKey } from "./PianoKey";
import SoundfontProvider from "../providers/SoundfontProvider";

const keyboardKeys = [
  {
    id: "29",
    name: "C3",
    isBlackKey: false,
    position: [-8.8, 1, 0],
    keys: [],
  },
  {
    id: "30",
    name: "C#3",
    isBlackKey: true,
    position: [-8.1, 1.5, -1.4],
    keys: [],
  },
  {
    id: "31",
    name: "D3",
    isBlackKey: false,
    position: [-7.7, 1, 0],
    keys: [],
  },
  {
    id: "31",
    name: "D#3",
    isBlackKey: true,
    position: [-7, 1.5, -1.4],
    keys: [],
  },
  {
    id: "32",
    name: "E3",
    isBlackKey: false,
    position: [-6.6, 1, 0],
    keys: [],
  },
  {
    id: "33",
    name: "F3",
    isBlackKey: false,
    position: [-5.5, 1, 0],
    keys: [],
  },
  {
    id: "34",
    name: "F#3",
    isBlackKey: true,
    position: [-5.1, 1.5, -1.4],
    keys: [],
  },
  {
    id: "35",
    name: "G3",
    isBlackKey: false,
    position: [-4.4, 1, 0],
    keys: [],
  },
  {
    id: "36",
    name: "G#3",
    isBlackKey: true,
    position: [-3.9, 1.5, -1.4],
    keys: [],
  },
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
    keys: ["9"],
  },
  {
    id: "54",
    name: "D5",
    isBlackKey: false,
    position: [7.7, 1, 0],
    keys: ["o"],
  },
  {
    id: "55",
    name: "D#5",
    isBlackKey: true,
    position: [8.4, 1.5, -1.4],
    keys: ["0"],
  },
  {
    id: "56",
    name: "E5",
    isBlackKey: false,
    position: [8.8, 1, 0],
    keys: ["p"],
  },
];

const audioContext = new AudioContext();

type SoundfontProviderProps = {
  isLoading: any;
  playNote: any;
  stopNote: any;
};

const keyboardControlKeys = keyboardKeys.map((keyboardKey) => {
  return { name: keyboardKey.name, keys: keyboardKey.keys };
});

// const notes = keyboardKeys.map((keyboardKey) => {
//   return keyboardKey.name;
// });

export const Piano = (props: any) => {
  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={"https://d1pzp51pvbm36p.cloudfront.net"}
      render={({ isLoading, playNote, stopNote }: SoundfontProviderProps) => (
        <KeyboardControls
          map={[...keyboardControlKeys, { name: "Sustain", keys: ["Space"] }]}
        >
          <group {...props} name="Piano" position={[0, 3, 0]}>
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
  );
};
