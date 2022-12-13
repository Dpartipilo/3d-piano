import { GroupProps } from "@react-three/fiber";
import { useContext } from "react";
import { PianoContext } from "./PianoContext";
import { SoundfontContext } from "../providers/SoundfontContext";
import { ControlsButton } from "./ControlsButton";
import { Svg } from "@react-three/drei";
import * as Icons from "../icons";
import { ColorRepresentation } from "three";
type ScreenControlsProps = GroupProps & {
  lightColor?: ColorRepresentation;
};

export const ScreenControls = (props: ScreenControlsProps) => {
  const { lightColor } = props;
  const { toggleShowShortcuts, showShortcuts, power } =
    useContext(PianoContext);
  const { selectInstrument } = useContext(SoundfontContext);

  return (
    <group {...props}>
      <ControlsButton
        position={[0, -0.02, 0]}
        action={() => selectInstrument?.("previous")}
        lightColor={lightColor}
        icon={
          <Svg
            src={Icons.chevronUp}
            position={[-0.2, 0.25, 0.005]}
            scale={0.001}
            fillMaterial={{
              color: power ? lightColor : "#300404",
              // color: power ? "#c71a1a" : "#300404",
            }}
          />
        }
      />
      <ControlsButton
        position={[1.4, -0.02, 0]}
        action={() => selectInstrument?.("next")}
        lightColor={lightColor}
        icon={
          <Svg
            src={Icons.chevronDown}
            position={[-0.2, 0.25, 0.005]}
            scale={0.001}
            fillMaterial={{
              color: power ? lightColor : "#300404",
            }}
          />
        }
      />
      <ControlsButton position={[2.8, -0.02, 0]} lightColor={lightColor} />
      <ControlsButton
        position={[4.2, -0.02, 0]}
        action={toggleShowShortcuts}
        lightColor={lightColor}
        icon={
          <Svg
            src={Icons.keyboard}
            position={[-0.3, 0.3, 0.005]}
            scale={0.03}
            fillMaterial={{
              color: power && showShortcuts ? lightColor : "#300404",
              // color: power && showShortcuts ? "#c71a1a" : "#300404",
            }}
          />
        }
      />
    </group>
  );
};
