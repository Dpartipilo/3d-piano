import { GroupProps } from "@react-three/fiber";
import { useContext } from "react";
import { PianoContext } from "./PianoContext";
import { ControlsButton } from "./ControlsButton";
import keyboard from "../icons/keyboard.svg";
type ScreenControlsProps = GroupProps & {};

export const ScreenControls = (props: ScreenControlsProps) => {
  const { toggleShowShortcuts } = useContext(PianoContext);
  return (
    <group {...props}>
      <ControlsButton position={[0, -0.02, 0]} />
      <ControlsButton position={[1.4, -0.02, 0]} />
      <ControlsButton position={[2.8, -0.02, 0]} />
      <ControlsButton
        position={[4.2, -0.02, 0]}
        action={toggleShowShortcuts}
        iconURL={keyboard}
      />
    </group>
  );
};
