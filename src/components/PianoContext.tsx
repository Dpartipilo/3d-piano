import { createContext } from "react";

type TContext = {
  power: boolean;
  showShortcuts: boolean;
  gain?: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  togglePower: () => void;
  toggleShowShortcuts: () => void;
  setSoundGain: (gain: number) => void;
  setSoundAttack: (attack: number) => void;
  setSoundDecay: (decay: number) => void;
  setSoundSustain: (sustain: number) => void;
  setSoundRealease: (realease: number) => void;
};

export const PianoContext = createContext<TContext>({
  power: false,
  showShortcuts: false,
  gain: 0.5,
  attack: 0,
  decay: 0,
  sustain: 0,
  release: 0,
  togglePower: () => null,
  toggleShowShortcuts: () => null,
  setSoundGain: () => null,
  setSoundAttack: () => null,
  setSoundDecay: () => null,
  setSoundSustain: () => null,
  setSoundRealease: () => null,
});
