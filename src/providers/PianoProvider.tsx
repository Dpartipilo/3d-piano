import { ReactElement, useCallback, useMemo, useState } from "react";

import { PianoContext } from "../components/PianoContext";

type PianoProviderProps = { children?: ReactElement };

export const PianoProvider = ({ children }: PianoProviderProps) => {
  const [power, setPower] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [gain, setGain] = useState<number>(0);
  const [attack, setAttack] = useState<number>(0);
  const [decay, setDecay] = useState<number>(0);
  const [sustain, setSustain] = useState<number>(0);
  const [release, setRealease] = useState<number>(0);

  const togglePower = useCallback(() => {
    setPower(!power);
    setShowShortcuts(false);
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
  const toggleShowShortcuts = useCallback(() => {
    power && setShowShortcuts(!showShortcuts);
  }, [showShortcuts, power]);

  const providerValue = useMemo(() => {
    return {
      power,
      showShortcuts,
      gain,
      attack,
      decay,
      sustain,
      release,
      togglePower,
      toggleShowShortcuts,
      setSoundGain,
      setSoundAttack,
      setSoundDecay,
      setSoundSustain,
      setSoundRealease,
    };
  }, [
    power,
    showShortcuts,
    gain,
    attack,
    decay,
    sustain,
    release,
    togglePower,
    toggleShowShortcuts,
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
