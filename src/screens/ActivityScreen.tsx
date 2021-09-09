import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { CurrentExercise } from "../components/CurrentExercise";
import { Item } from "../components/Item";
import { CountdownContext } from "../contexts/CountdownContext";
import { SettingsModal } from "../components/SettingsModal";
import { AppContext } from "../contexts/AppContext";
import { ExercisesModal } from "../components/ExercisesModal";
import { Workout } from "./HomeScreen";

export function ActivityScreen({ ...props }) {
  const {
    seconds,
    isActive,
    isRestMode,
    currentItemIndex,
    currentSeries,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const workout : Workout = props.route.params;

  const exercisesList = workout.exercises;
  const settings = workout.settings;

  function renderItem({ ...props }) {
    const backgroundColor =
      currentItemIndex < exercisesList.length &&
        props.item.title === exercisesList[currentItemIndex].title
        ? colors.green_dark
        : colors.green;
    return <Item title={props.item.title} backgroundColor={backgroundColor} />;
  }

  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const [isExercisesModalVisible, setExercisesModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      
      
      <Text>TODO</Text>
     
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
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green_light,
  },
  listContainer: {
    flex: 1,
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
