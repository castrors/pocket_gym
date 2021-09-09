import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

import { CountdownProvider } from "./src/contexts/CountdownContext";
import { ActivityScreen } from "./src/screens/ActivityScreen";
import { AppProvider } from "./src/contexts/AppContext";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./src/screens/HomeScreen";
import { WorkoutDetailScreen } from "./src/screens/WorkoutDetailScreen";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "green",
    accent: "purple",
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
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkoutDetailScreen"
                component={WorkoutDetailScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ActivityScreen"
                component={ActivityScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CountdownProvider>
      </AppProvider>
    </PaperProvider>
  );
}
