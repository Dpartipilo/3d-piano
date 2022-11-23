import React, { useEffect, useRef, useState } from "react";

import { useControls } from "leva";
import { keyboardKeys } from "../misc";
import { PianoKey } from "./PianoKey";

export type PianoKeysProps = {
  isPressingDown: boolean;
  power: boolean;
  playNote: () => void;
  stopNote: () => void;
  handlePressingDown: (pressed: boolean) => void;
};

export const PianoKeys = (props: PianoKeysProps) => {
  const { isPressingDown, power, playNote, stopNote, handlePressingDown } =
    props;

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

  let keyPosition = 0;
  const setKeyPosition = (isBlackKey: boolean, i: number) => {
    if (i === 0) return 0;
    if (!keyboardKeys[i - 1].isBlackKey && !isBlackKey) {
      keyPosition = keyPosition + 0.91;
    }
    if (isBlackKey) {
      keyPosition = keyPosition + 0.95;
    } else {
      keyPosition = keyPosition + 0.16;
    }

    return keyPosition;
  };

  return (
    <group name="Piano Keys" position={[-9.25, 3.1, -3.2]}>
      {keyboardKeys.map(({ isBlackKey, id, name, keys }, i) => (
        <PianoKey
          key={name}
          power={power}
          isBlackKey={isBlackKey}
          musicNote={id}
          position={[setKeyPosition(isBlackKey, i), isBlackKey ? 1.5 : 0.6, 0]}
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
          isPressingDown={isPressingDown}
          handlePressingDown={handlePressingDown}
        />
      ))}
    </group>
  );
};
