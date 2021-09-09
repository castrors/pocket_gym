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

import { Button } from "react-native-paper";

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
import { ExerciseDescriptionCard } from "../components/WorkoutDetail/ExerciseDescriptionCard";
import { exerciseDurationInMin, workoutDurationInMin } from "../utils/Utils";

export function WorkoutDetailScreen({ ...props }) {
  const {
    seconds,
    isActive,
    isRestMode,
    currentItemIndex,
    currentSeries,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const workout: Workout = props.route.params;

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
      <SettingsModal
        isModalVisible={isSettingsModalVisible}
        setModalVisible={setSettingsModalVisible}
      />

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingVertical: 16,
        }}
      >
        <TouchableOpacity
          style={{ margin: 4 }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" color={colors.heading} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ margin: 4 }}
          onPress={() => {
            setSettingsModalVisible(true);
          }}
        >
          <MaterialIcons
            name="fitness-center"
            color={colors.heading}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.textTitle}>Aeróbico</Text>
      <Text style={styles.subtitle}>{workoutDurationInMin(workout)} min.</Text>
      <Button
        icon="run"
        mode="contained"
        onPress={() =>
          props.navigation.navigate("ActivityScreen", workout)
        }
        style={{
          alignSelf: "center",
          width: 120,
          margin: 8,
        }}
        uppercase={false}
      >
        Começar
      </Button>
      <View style={styles.listContainer}>
        <FlatList
          data={exercisesList}
          renderItem={({ item }) => (
            <ExerciseDescriptionCard
              exercise={item}
              settings={settings}
              onPress={() =>
                props.navigation.navigate("WorkoutDetailScreen", item)
              }
            />
          )}
          keyExtractor={(item) => item.title}
        />
      </View>
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
    color: colors.black,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.text,
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
