import React, { createContext, ReactNode, useState } from "react";

interface Settings {
  stimulusDuration: number;
  series: number;
  restDuration: number;
}

interface AppContextData {
  exercisesList: string[];
  settings: Settings;
  setExercisesList: (exercisesList: string[]) => void;
  setSettings: (settings: Settings) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const [exercisesList, setExercisesList] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings>({
    stimulusDuration: 30,
    series: 5,
    restDuration: 15,
  });

  return (
    <AppContext.Provider
      value={{
        exercisesList,
        settings,
        setExercisesList,
        setSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
