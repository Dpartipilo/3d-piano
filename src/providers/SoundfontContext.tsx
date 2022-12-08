import { createContext } from "react";
import Soundfont from "soundfont-player";

type TContext = {
  instrument?: Soundfont.Player;
  selectedInstrument?: Soundfont.InstrumentName;
  playNote?: (midiNote: any, options?: any) => void;
  stopNote?: (midiNote: any) => void;
  stopAllNotes?: () => void;
  selectInstrument?: (value: string) => void;
};

export const SoundfontContext = createContext<TContext>({
  instrument: undefined,
  selectedInstrument: "acoustic_grand_piano",
  playNote: () => null,
  stopNote: () => null,
  stopAllNotes: () => null,
  selectInstrument: () => null,
});
