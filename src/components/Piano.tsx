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

  // ********** Leva GUI controls **********
  const { gain, attack, decay, sustain, release, duration } = useControls(
    "Sound properties",
    {
      gain: { value: 2, min: 0, max: 10, step: 0.1 },
      attack: { value: 0, min: 0, max: 5, step: 0.1 },
      decay: { value: 0, min: 0, max: 5, step: 0.1 },
      sustain: { value: 0, min: 0, max: 5, step: 0.1 },
      release: { value: 0.7, min: 0, max: 5, step: 0.1 },
      duration: { value: 0, min: 0, max: 5, step: 0.1 },
    }
  );

  const { showKeys } = useControls("Show keyboard shortcuts", {
    showKeys: false,
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
                      gain={gain}
                      attack={attack}
                      decay={decay}
                      sustain={sustain}
                      release={release}
                      duration={duration}
                      showKeys={showKeys}
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
