import { createContext } from "react";

type TContext = {
  power: boolean;
  gain?: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  togglePower: () => void;
  setSoundGain: (gain: number) => void;
  setSoundAttack: (attack: number) => void;
  setSoundDecay: (decay: number) => void;
  setSoundSustain: (sustain: number) => void;
  setSoundRealease: (realease: number) => void;
};

export const PianoContext = createContext<TContext>({
  power: false,
  gain: 0.5,
  attack: 0,
  decay: 0,
  sustain: 0,
  release: 0,
  togglePower: () => null,
  setSoundGain: () => null,
  setSoundAttack: () => null,
  setSoundDecay: () => null,
  setSoundSustain: () => null,
  setSoundRealease: () => null,
});

// type PlayOptionsProps = {
//   gain?: number; //float between 0 to 1
//   attack?: number; //the attack time of the amplitude envelope
//   decay?: number; //the decay time of the amplitude envelope
//   sustain?: number; //the sustain gain value of the amplitude envelope
//   release?: number; //the release time of the amplitude envelope
//   adsr?: number[]; //an array of [attack, decay, sustain, release]. Overrides other parameters.
// };
