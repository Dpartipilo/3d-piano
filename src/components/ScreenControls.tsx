import { GroupProps } from "@react-three/fiber";
import { useContext } from "react";
import { PianoContext } from "./PianoContext";
import { SoundfontContext } from "../providers/SoundfontContext";
import { ControlsButton } from "./ControlsButton";
import { Svg } from "@react-three/drei";
import * as Icons from "../icons";
type ScreenControlsProps = GroupProps & {};

export const ScreenControls = (props: ScreenControlsProps) => {
  const { toggleShowShortcuts, showShortcuts, power } =
    useContext(PianoContext);
  const { selectInstrument } = useContext(SoundfontContext);

  return (
    <group {...props}>
      <ControlsButton
        position={[0, -0.02, 0]}
        action={() => selectInstrument?.("previous")}
        icon={
          <Svg
            src={Icons.chevronUp}
            position={[-0.2, 0.25, 0.005]}
            scale={0.001}
            fillMaterial={{
              color: power ? "#c71a1a" : "#300404",
            }}
          />
        }
      />
      <ControlsButton
        position={[1.4, -0.02, 0]}
        action={() => selectInstrument?.("next")}
        icon={
          <Svg
            src={Icons.chevronDown}
            position={[-0.2, 0.25, 0.005]}
            scale={0.001}
            fillMaterial={{
              color: power ? "#c71a1a" : "#300404",
            }}
          />
        }
      />
      <ControlsButton position={[2.8, -0.02, 0]} />
      <ControlsButton
        position={[4.2, -0.02, 0]}
        action={toggleShowShortcuts}
        icon={
          <Svg
            src={Icons.keyboard}
            position={[-0.3, 0.3, 0.005]}
            scale={0.03}
            fillMaterial={{
              color: power && showShortcuts ? "#c71a1a" : "#300404",
            }}
          />
        }
      />
    </group>
  );
};
