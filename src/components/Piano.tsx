import { useEffect, useMemo, useState } from "react";

import { KeyboardControls } from "@react-three/drei";
import SoundfontProvider from "../providers/SoundfontProvider";
import { useControls } from "leva";

import { instrumentsList, keyboardKeys } from "../misc";

import { PianoStructure } from "./PianoStructure";
import { GroupProps } from "@react-three/fiber";
import { PianoKeys } from "./PianoKeys";
import { PianoProvider } from "./PianoProvider";

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
  const [size, setSize] = useState<number>(0);

  const filteredKeys = useMemo(
    () => keyboardKeys.filter((key) => !key.isBlackKey).length * 1.06 + 3,
    []
  );
  useEffect(() => {
    setSize(filteredKeys);
  }, [filteredKeys]);

  // ********** Leva GUI controls **********
  const { instrument } = useControls("Instruments", {
    instrument: {
      value: "acoustic_grand_piano",
      options: instrumentsList,
    },
  });

  const { color, lightColor } = useControls("Piano color", {
    color: "#1f1f1e",
    lightColor: "#ff0000",
  });

  // **************************************

  return (
    <PianoProvider>
      <group {...props} position={[-size / 2, 0, 0]}>
        <PianoStructure
          size={size}
          pianoColor={color}
          lightColor={lightColor}
        />
        <SoundfontProvider
          instrumentName={instrument}
          audioContext={audioContext}
          hostname={"https://d1pzp51pvbm36p.cloudfront.net"}
          render={({ playNote, stopNote }: SoundfontProviderProps) => (
            <KeyboardControls
              map={[
                ...keyboardControlKeys,
                { name: "Sustain", keys: ["Space"] },
              ]}
            >
              <PianoKeys playNote={playNote} stopNote={stopNote} />
            </KeyboardControls>
          )}
        />
      </group>
    </PianoProvider>
  );
};
