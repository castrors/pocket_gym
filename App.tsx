import React from "react";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

import { CountdownProvider } from "./src/contexts/CountdownContext";
import { ExercisesScreen } from "./src/screens/ExercisesScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <CountdownProvider>
      <ExercisesScreen />
    </CountdownProvider>
  );
}
