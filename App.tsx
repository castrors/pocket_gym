import React from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

import { CountdownProvider } from "./src/contexts/CountdownContext";
import { ExercisesScreen } from "./src/screens/ExercisesScreen";
import { AppProvider } from "./src/contexts/AppContext";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "./src/screens/HomeScreen";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    accent: 'purple',
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <AppProvider>
        <CountdownProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CountdownProvider>
      </AppProvider>
    </PaperProvider>
  );
}
