import { ReactElement, useCallback, useMemo, useState } from "react";

import { PianoContext } from "./PianoContext";

type PianoProviderProps = { children?: ReactElement };

export const PianoProvider = ({ children }: PianoProviderProps) => {
  const [power, setPower] = useState(false);
  const [gain, setGain] = useState<number>(0);
  const [attack, setAttack] = useState<number>(0);
  const [decay, setDecay] = useState<number>(0);
  const [sustain, setSustain] = useState<number>(0);
  const [release, setRealease] = useState<number>(0);

  const togglePower = useCallback(() => {
    setPower(!power);
  }, [power]);

  const setSoundGain = useCallback((gain: number) => {
    setGain(gain);
  }, []);

  const setSoundAttack = useCallback((attack: number) => {
    setAttack(attack);
  }, []);

  const setSoundDecay = useCallback((decay: number) => {
    setDecay(decay);
  }, []);

  const setSoundSustain = useCallback((sustain: number) => {
    setSustain(sustain);
  }, []);

  const setSoundRealease = useCallback((realease: number) => {
    setRealease(realease);
  }, []);

  const providerValue = useMemo(() => {
    return {
      power,
      gain,
      attack,
      decay,
      sustain,
      release,
      togglePower,
      setSoundGain,
      setSoundAttack,
      setSoundDecay,
      setSoundSustain,
      setSoundRealease,
    };
  }, [
    power,
    gain,
    attack,
    decay,
    sustain,
    release,
    togglePower,
    setSoundGain,
    setSoundAttack,
    setSoundDecay,
    setSoundSustain,
    setSoundRealease,
  ]);

  return (
    <PianoContext.Provider value={providerValue}>
      {children}
    </PianoContext.Provider>
  );
};
