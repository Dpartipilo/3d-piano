import React, {
  useEffect,
  useState,
  useMemo,
  ReactElement,
  useCallback,
} from "react";
import Soundfont from "soundfont-player";
import { SoundfontContext } from "./SoundfontContext";
import { instrumentsList } from "../misc";

type SoundfontProviderProps = {
  hostname: string;
  format?: "mp3" | "ogg";
  soundfont?: "MusyngKite" | "FluidR3_GM";
  children: ReactElement;
};

export type PlayOptionsProps = {
  gain?: number; //float between 0 to 1
  attack?: number; //the attack time of the amplitude envelope
  decay?: number; //the decay time of the amplitude envelope
  sustain?: number; //the sustain gain value of the amplitude envelope
  release?: number; //the release time of the amplitude envelope
  adsr?: [number, number, number, number]; //an array of [attack, decay, sustain, release]. Overrides other parameters.
  duration?: number; //set the playing duration in seconds of the buffer(s)
  loop?: boolean; //set to true to loop the audio buffer
};

const audioContext = new AudioContext();

export const SoundfontProvider = (props: SoundfontProviderProps) => {
  const {
    format = "mp3",
    soundfont = "MusyngKite",
    hostname,
    children,
  } = props;

  const [activeAudioNodes, setActiveAudioNodes] = useState<
    Record<string, Soundfont.Player>
  >({});
  const [instrument, setInstrument] = useState<Soundfont.Player>();
  const [selectedInstrument, setSelectedInstrument] =
    useState<Soundfont.InstrumentName>("acoustic_grand_piano");

  const loadInstrument = useCallback(
    (instrumentName: Soundfont.InstrumentName) => {
      Soundfont.instrument(audioContext, instrumentName, {
        format,
        soundfont,
        nameToUrl: (name: string, soundfont: string, format: string) => {
          return `${hostname}/${soundfont}/${name}-${format}.js`;
        },
      }).then((instrument) => {
        setInstrument(instrument);
      });
    },
    [hostname, soundfont, format]
  );

  const selectInstrument = useCallback(
    (value: string) => {
      let currentInstrumentIndex = instrumentsList.indexOf(selectedInstrument);

      if (currentInstrumentIndex === 0 && value === "previous") {
        currentInstrumentIndex = instrumentsList.length - 1;
      } else if (value === "previous") {
        currentInstrumentIndex--;
      }

      if (
        currentInstrumentIndex === instrumentsList.length - 1 &&
        value === "next"
      ) {
        currentInstrumentIndex = 0;
      } else if (value === "next") {
        currentInstrumentIndex++;
      }

      const nextInstrument: Soundfont.InstrumentName =
        instrumentsList[currentInstrumentIndex];

      console.log("nextInstrument", nextInstrument);

      setSelectedInstrument(nextInstrument);
      loadInstrument(nextInstrument);
    },
    [selectedInstrument, loadInstrument]
  );

  const playNote = useCallback(
    (midiNumber: string, options: PlayOptionsProps) => {
      audioContext.resume().then(() => {
        const audioNode = instrument?.play(midiNumber, undefined, options);
        setActiveAudioNodes((prevstate) => {
          return Object.assign({}, prevstate, {
            [midiNumber]: audioNode,
          });
        });
      });
    },
    [instrument]
  );

  const stopNote = useCallback((midiNumber: string) => {
    audioContext.resume().then(() => {
      setActiveAudioNodes((prevstate) => {
        const audioNode = prevstate?.[midiNumber];

        if (!audioNode) {
          return prevstate;
        }
        audioNode.stop();
        return Object.assign({}, prevstate, {
          [midiNumber]: null,
        });
      });
    });
  }, []);

  const stopAllNotes = useCallback(() => {
    audioContext.resume().then(() => {
      const newActiveAudioNodes = Object.values(activeAudioNodes);
      newActiveAudioNodes.forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      setActiveAudioNodes({});
    });
  }, [activeAudioNodes]);

  useEffect(() => {
    loadInstrument(selectedInstrument);
  }, [selectedInstrument, loadInstrument]);

  const providerValue = useMemo(() => {
    return {
      instrument,
      selectedInstrument,
      playNote,
      stopNote,
      stopAllNotes,
      selectInstrument,
    };
  }, [
    instrument,
    selectedInstrument,
    playNote,
    stopNote,
    stopAllNotes,
    selectInstrument,
  ]);

  return (
    <SoundfontContext.Provider value={providerValue}>
      {children}
    </SoundfontContext.Provider>
  );
};
