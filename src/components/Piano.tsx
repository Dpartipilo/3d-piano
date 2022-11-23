import React, { useEffect, useRef, useState } from "react";

import { KeyboardControls } from "@react-three/drei";
import SoundfontProvider from "../providers/SoundfontProvider";
import { useControls } from "leva";

import { instrumentsList, keyboardKeys } from "../misc";

import { PianoStructure } from "./PianoStructure";
import { GroupProps } from "@react-three/fiber";
import { PianoKeys } from "./PianoKeys";

const audioContext = new AudioContext();

type SoundfontProviderProps = {
  isLoading: any;
  playNote: any;
  stopNote: any;
};

const keyboardControlKeys = keyboardKeys.map((keyboardKey) => {
  return { name: keyboardKey.name, keys: keyboardKey.keys };
});

export const Piano = (props: GroupProps) => {
  const [isPressingDown, setIsPressingDown] = useState(false);
  const [power, setPower] = useState(false);

  // ********** Leva GUI controls **********
  const { instrument } = useControls("Instruments", {
    instrument: {
      value: "acoustic_grand_piano",
      options: instrumentsList,
    },
  });

  const { color } = useControls("Piano color", {
    color: "#1f1f1e",
  });

  // **************************************

  const handlePressingDown = (pressing: boolean) => {
    setIsPressingDown(pressing);
  };

  return (
    <group {...props}>
      <PianoStructure setPower={setPower} power={power} pianoColor={color} />
      <SoundfontProvider
        instrumentName={instrument}
        audioContext={audioContext}
        hostname={"https://d1pzp51pvbm36p.cloudfront.net"}
        render={({ isLoading, playNote, stopNote }: SoundfontProviderProps) => (
          <KeyboardControls
            map={[...keyboardControlKeys, { name: "Sustain", keys: ["Space"] }]}
          >
            <PianoKeys
              power={power}
              playNote={playNote}
              stopNote={stopNote}
              isPressingDown={isPressingDown}
              handlePressingDown={handlePressingDown}
            />
          </KeyboardControls>
        )}
      />
    </group>
  );
};
