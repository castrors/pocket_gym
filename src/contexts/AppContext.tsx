import React, { createContext, ReactNode, useState } from "react";

interface Settings {
  stimulusDuration: number;
  series: number;
  restDuration: number;
}

interface AppContextData {
  exercisesList: Exercise[];
  settings: Settings;
  setExercisesList: (exercisesList: Exercise[]) => void;
  setSettings: (settings: Settings) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

interface Exercise {
  title: string;
}

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const [exercisesList, setExercisesList] = useState<Exercise[]>([
    {
      title: "Polichinelo",
    },
    {
      title: "Corrida parada",
    },
    {
      title: "Meio Burpee",
    },
    {
      title: "Polichinelo frontal",
    },
    {
      title: "Abdominal canivete alternado",
    },
  ]);
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
