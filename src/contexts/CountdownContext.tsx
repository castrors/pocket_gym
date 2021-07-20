import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import constants from "../utils/constants";
import { AppContext } from "./AppContext";

interface CountdownContextData {
  seconds: number;
  isRestMode: boolean;
  isActive: boolean;
  currentItemIndex: number;
  currentSeries: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { settings } = useContext(AppContext);
  const [isActive, setIsActive] = useState(false);
  const [isRestMode, setIsRestMode] = useState(false);
  const [seconds, setSeconds] = useState(settings.stimulusDuration);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentSeries, setCurrentSeries] = useState(1);

  function startCountdown() {
    setIsActive(true);
  }

  function goToNextExercise() {
    setCurrentItemIndex(currentItemIndex + 1);
    setSeconds(settings.stimulusDuration);
    setCurrentSeries(1);
    setIsRestMode(false);
  }

  function countdownTime() {
    countdownTimeout = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
  }

  function increaseSeries() {
    setIsRestMode(false);
    setCurrentSeries(currentSeries + 1);
    setSeconds(settings.stimulusDuration);
  }

  function goToRestTime() {
    setIsRestMode(true);
    setSeconds(settings.restDuration);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setCurrentItemIndex(0);
    setIsActive(false);
    setCurrentSeries(1);
    setSeconds(settings.stimulusDuration);
    setIsRestMode(false);
  }

  useEffect(() => {
    if (isActive && currentItemIndex < constants.EXERCISES.length) {
      if (seconds > 0) {
        countdownTime();
      } else if (!isRestMode) {
        goToRestTime();
      } else if (currentSeries < settings.series) {
        increaseSeries();
      } else {
        goToNextExercise();
      }
    }
  }, [isActive, seconds, isRestMode, currentSeries, currentItemIndex]);

  return (
    <CountdownContext.Provider
      value={{
        seconds,
        isActive,
        isRestMode,
        currentItemIndex,
        currentSeries,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
