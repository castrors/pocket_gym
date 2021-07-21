import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { AppContext } from "../contexts/AppContext";
import { Item } from "./Item";

interface ExercisesModalProps {
  isModalVisible: boolean;
  setModalVisible: (visibility: boolean) => void;
}

export function ExercisesModal({
  isModalVisible,
  setModalVisible,
}: ExercisesModalProps) {
  const { exercisesList, setExercisesList } = useContext(AppContext);

  const [exercise, setExercise] = useState("");

  useEffect(() => {}, exercisesList);

  function renderItem({ item }) {
    return (
      <View>
        <Item title={item.title} backgroundColor={colors.green} />
        <Pressable
          onPress={() => {
            const index = exercisesList.indexOf(item);
            console.log(index);
            exercisesList.splice(index, 1);
            setExercisesList(exercisesList);
          }}
        >
          <MaterialIcons name="delete" color={colors.heading} size={24} />
        </Pressable>
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setModalVisible(!isModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.settingsTitle}>Exercicios</Text>
          <Text style={styles.inputTitle}>Duração do estímulo</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              onChangeText={setExercise}
              keyboardType="numeric"
              value={exercise}
            />
            <Pressable
              onPress={() => {
                console.log(`save ${exercise}`);
                if (exercise !== "") {
                  setExercisesList(exercisesList.concat({ title: exercise }));
                }
              }}
            >
              <MaterialIcons name="add" color={colors.heading} size={24} />
            </Pressable>
          </View>
          <FlatList
            data={exercisesList}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              // setSettings({
              //   stimulusDuration: stimulusDuration,
              //   series: series,
              //   restDuration: restDuration,
              // });
              setModalVisible(!isModalVisible);
            }}
          >
            <Text style={styles.textStyle}>Salvar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  settingsTitle: {
    color: colors.black,
    fontFamily: fonts.text,
    fontSize: 18,
    marginBottom: 12,
  },
  inputTitle: {
    color: colors.black,
    fontFamily: fonts.text,
    fontSize: 16,
  },

  input: {
    height: 40,
    margin: 12,
    width: 200,
    textAlign: "center",
    backgroundColor: colors.green_light,
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
