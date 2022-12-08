import { useState } from "react";
import { keyboardKeys } from "../misc";
import { PianoKey } from "./PianoKey";

export const PianoKeys = () => {
  const [isPressingDown, setIsPressingDown] = useState(false);

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
          position={[
            setKeyPosition(isBlackKey, i),
            isBlackKey ? 1.5 : 0.6,
            isBlackKey ? 0.5 : 0,
          ]}
          name={name}
          keys={keys}
          isPressingDown={isPressingDown}
          handlePressingDown={handlePressingDown}
        />
      ))}
    </group>
  );
};
