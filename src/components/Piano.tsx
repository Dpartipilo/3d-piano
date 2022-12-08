import { useEffect, useMemo, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import { SoundfontProvider } from "../providers/SoundfontProvider";
import { useControls } from "leva";
import { keyboardKeys } from "../misc";
import { PianoStructure } from "./PianoStructure";
import { GroupProps } from "@react-three/fiber";
import { PianoKeys } from "./PianoKeys";
import { PianoProvider } from "../providers/PianoProvider";

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

  const { color, lightColor } = useControls("Piano color", {
    color: "#1f1f1e",
    lightColor: "#ff0000",
  });

  // **************************************

  return (
    <PianoProvider>
      <group {...props} position={[-size / 2, 0, 0]}>
        <SoundfontProvider hostname={"https://d1pzp51pvbm36p.cloudfront.net"}>
          <>
            <PianoStructure
              size={size}
              pianoColor={color}
              lightColor={lightColor}
            />
            <KeyboardControls
              map={[
                ...keyboardControlKeys,
                { name: "Sustain", keys: ["Space"] },
              ]}
            >
              <PianoKeys />
            </KeyboardControls>
          </>
        </SoundfontProvider>
      </group>
    </PianoProvider>
  );
};
