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
import { Training } from "./HomeScreen";

export function ExercisesScreen({ ...props }) {
  const {
    seconds,
    isActive,
    isRestMode,
    currentItemIndex,
    currentSeries,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const training : Training = props.route.params;

  const exercisesList = training.exercises;
  const settings = training.settings;

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
      <ExercisesModal
        isModalVisible={isExercisesModalVisible}
        setModalVisible={setExercisesModalVisible}
      />
      <View
        style={{
          justifyContent: "flex-end",
          flexDirection: "row",
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={{ margin: 4 }}
          onPress={() => {
            setExercisesModalVisible(true);
          }}
        >
          <MaterialIcons name="list" color={colors.heading} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ margin: 4 }}
          onPress={() => {
            setSettingsModalVisible(true);
          }}
        >
          <MaterialIcons name="settings" color={colors.heading} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.currentContainer}>
        {exercisesList[currentItemIndex] ? (
          <CurrentExercise
            title={`${exercisesList[currentItemIndex].title} (${currentSeries} de ${settings.series})`}
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
          data={exercisesList}
          renderItem={renderItem}
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
