import React from "react";
import { KeyboardControls } from "@react-three/drei";
import SoundfontProvider from "../providers/SoundfontProvider";
import { useControls } from "leva";

import { instrumentsList, keyboardKeys } from "../misc";

import { PianoKey } from "./PianoKey";
import { PianoStructure } from "./PianoStructure";
import { GroupProps } from "@react-three/fiber";

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
  const { instrument } = useControls("Instruments", {
    instrument: {
      value: "acoustic_grand_piano",
      options: instrumentsList,
    },
  });

  return (
    <group {...props}>
      <SoundfontProvider
        instrumentName={instrument}
        audioContext={audioContext}
        hostname={"https://d1pzp51pvbm36p.cloudfront.net"}
        render={({ isLoading, playNote, stopNote }: SoundfontProviderProps) => (
          <KeyboardControls
            map={[...keyboardControlKeys, { name: "Sustain", keys: ["Space"] }]}
          >
            <PianoStructure>
              <group {...props} name="Piano Keys" position={[0, 3.1, 0]}>
                {keyboardKeys.map(
                  ({ isBlackKey, id, position, name, keys }, i) => (
                    <PianoKey
                      key={name}
                      isBlackKey={isBlackKey}
                      musicNote={id}
                      position={position}
                      name={name}
                      keys={keys}
                      playNote={playNote}
                      stopNote={stopNote}
                    />
                  )
                )}
              </group>
            </PianoStructure>
          </KeyboardControls>
        )}
      />
    </group>
  );
};
