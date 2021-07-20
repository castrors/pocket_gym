import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { CurrentExercise } from "../components/CurrentExercise";
import { Item } from "../components/Item";
import { CountdownContext } from "../contexts/CountdownContext";
import constants from "../utils/constants";

export function ExercisesScreen() {
  const {
    seconds,
    isActive,
    isRestMode,
    currentItemIndex,
    currentSeries,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  function renderItem({ item }) {
    const backgroundColor =
      currentItemIndex < constants.EXERCISES.length &&
      item.title === constants.EXERCISES[currentItemIndex].title
        ? colors.green_dark
        : colors.green;
    return <Item title={item.title} backgroundColor={backgroundColor} />;
  }

  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.currentContainer}>
        {constants.EXERCISES[currentItemIndex] ? (
          <CurrentExercise
            title={`${constants.EXERCISES[currentItemIndex].title} (${currentSeries} de ${constants.SETTINGS.series})`}
            isActive={isActive}
            isRestMode={isRestMode}
            time={`00:${secondLeft}${secondRight}`}
            onClick={() => {
              if (isActive) {
                resetCountdown();
              } else {
                startCountdown();
              }
            }}
          />
        ) : (
          <View>
            <Text style={styles.textTitle}>
              Parabéns, treino concluído com sucesso!
            </Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                resetCountdown();
              }}
            >
              <Text style={styles.title}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={constants.EXERCISES}
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
