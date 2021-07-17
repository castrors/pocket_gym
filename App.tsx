import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CurrentExercise } from "./src/components/CurrentExercise";
import colors from "./styles/colors";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import fonts from "./styles/fonts";

const SETTINGS = {
  stimulusDuration: 30,
  series: 5,
  restDuration: 15,
};
const EXERCISES = [
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
];

let countdownTimeout: NodeJS.Timeout;

interface ItemProps {
  title: string;
  backgroundColor: string;
}

const Item = ({ title, backgroundColor }: ItemProps) => {
  return (
    <View style={{ ...styles.item, backgroundColor: backgroundColor }}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  const [isActive, setIsActive] = useState(false);
  const [isRestMode, setIsRestMode] = useState(false);
  const [time, setTime] = useState(SETTINGS.stimulusDuration);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentSeries, setCurrentSeries] = useState(1);

  function renderItem({ item }) {
    const backgroundColor =
      currentItemIndex < EXERCISES.length &&
      item.title === EXERCISES[currentItemIndex].title
        ? colors.green_dark
        : colors.green;
    return <Item title={item.title} backgroundColor={backgroundColor} />;
  }

  function startCountdown() {
    setIsActive(true);
  }

  function goToNextExercise() {
    setCurrentItemIndex(currentItemIndex + 1);
    setTime(SETTINGS.stimulusDuration);
    setCurrentSeries(1);
  }

  function countdownTime() {
    countdownTimeout = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }

  function increaseSeries() {
    setIsRestMode(false);
    setCurrentSeries(currentSeries + 1);
    setTime(SETTINGS.stimulusDuration);
  }

  function goToRestTime() {
    setIsRestMode(true);
    setTime(SETTINGS.restDuration);
  }

  function reset() {
    clearTimeout(countdownTimeout);
    setCurrentItemIndex(0);
    setIsActive(false);
    setCurrentSeries(1);
    setTime(SETTINGS.stimulusDuration);
    setIsRestMode(false);
  }

  useEffect(() => {
    if (isActive && currentItemIndex < EXERCISES.length) {
      if (time > 0) {
        countdownTime();
      } else if (!isRestMode) {
        goToRestTime();
      } else if (currentSeries < SETTINGS.series) {
        increaseSeries();
      } else {
        goToNextExercise();
      }
    }
  });

  const [secondLeft, secondRight] = String(time).padStart(2, "0").split("");

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.currentContainer}>
        {EXERCISES[currentItemIndex] ? (
          <CurrentExercise
            title={`${EXERCISES[currentItemIndex].title} (${currentSeries} de ${SETTINGS.series})`}
            isActive={isActive}
            isRestMode={isRestMode}
            time={`00:${secondLeft}${secondRight}`}
            onClick={() => {
              if (isActive) {
                reset();
              } else {
                startCountdown();
              }
            }}
          />
        ) : (
          <View>
            <Text style={styles.textTitle}>Parabéns, treino concluído com sucesso!</Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                reset();
              }}
            >
              <Text style={styles.title}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={EXERCISES}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green_light,
    padding: 20,
  },
  currentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green_light,
  },
  listContainer: {
    flex: 2,
  },
  item: {
    color: colors.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.white,
  },
  textTitle: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  buttonContainer: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.red,
  },
});
