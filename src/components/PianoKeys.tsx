import { useState } from "react";
import { useControls } from "leva";
import { keyboardKeys } from "../misc";
import { PianoKey } from "./PianoKey";

export type PianoKeysProps = {
  playNote: () => void;
  stopNote: () => void;
};

export const PianoKeys = (props: PianoKeysProps) => {
  const { playNote, stopNote } = props;

  const [isPressingDown, setIsPressingDown] = useState(false);

  // ********** Leva GUI controls **********
  const { showKeys } = useControls("Show keyboard shortcuts", {
    showKeys: false,
  });

  let keyPosition = 0;
  const setKeyPosition = (isBlackKey: boolean, i: number) => {
    if (i === 0) return 0;

    const keySize = 0.88;
    const whiteKeySize = 0.06;
    const spaceBetween = 0.06;

    if (!keyboardKeys[i - 1].isBlackKey && !isBlackKey) {
      // if its double white, key + spaceBetween
      keyPosition = keyPosition + keySize + spaceBetween;
    }
    if (isBlackKey) {
      keyPosition = keyPosition + keySize + spaceBetween;
    } else {
      keyPosition = keyPosition + whiteKeySize + spaceBetween;
    }

    return keyPosition;
  };

  const handlePressingDown = (pressing: boolean) => {
    setIsPressingDown(pressing);
  };

  return (
    <group name="Piano Keys" position={[1.5, 3, 1]}>
      {keyboardKeys.map(({ isBlackKey, id, name, keys }, i) => (
        <PianoKey
          key={name}
          isBlackKey={isBlackKey}
          musicNote={id}
          position={[setKeyPosition(isBlackKey, i), isBlackKey ? 1.5 : 0.6, 0]}
          name={name}
          keys={keys}
          playNote={playNote}
          stopNote={stopNote}
          showKeys={showKeys}
          isPressingDown={isPressingDown}
          handlePressingDown={handlePressingDown}
        />
      ))}
    </group>
  );
};
