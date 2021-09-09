import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { AppContext } from "../contexts/AppContext";

interface SettingsModalProps {
  isModalVisible: boolean;
  setModalVisible: (visibility: boolean) => void;
}

export function SettingsModal({
  isModalVisible,
  setModalVisible,
}: SettingsModalProps) {
  const { exercisesList, settings, setExercisesList, setSettings } =
    useContext(AppContext);

  const [stimulusDuration, setStimulusDuration] = useState(
    settings.stimulusDuration
  );
  const [restDuration, setRestDuration] = useState(settings.restDuration);
  const [series, setSeries] = useState(settings.series);
  const [exercisesText, setExercisesText] = useState(settings.stimulusDuration);

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
          <Text style={styles.settingsTitle}>Configurações</Text>
          <Text style={styles.inputTitle}>Duração do estímulo</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              setStimulusDuration(value ? parseInt(value) : 0)
            }
            keyboardType="numeric"
            value={stimulusDuration.toString()}
          />
          <Text style={styles.inputTitle}>Duração do descanço</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              setRestDuration(value ? parseInt(value) : 0)
            }
            keyboardType="numeric"
            value={restDuration.toString()}
          />
          <Text style={styles.inputTitle}>Quantidade de séries</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setSeries(value ? parseInt(value) : 0)}
            keyboardType="numeric"
            value={series.toString()}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setSettings({
                stimulusDuration: stimulusDuration,
                series: series,
                restDuration: restDuration,
              });
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
