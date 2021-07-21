import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface CurrentExerciseProps {
  title: string;
  time: string;
  isActive: boolean;
  isRestMode: boolean;
  onClick: Function;
}

export function CurrentExercise({
  title,
  time,
  isActive,
  isRestMode,
  onClick,
}: CurrentExerciseProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{title}</Text>
      {isRestMode && <Text style={styles.textRestTime}>DESCANSO</Text>}
      <Text style={styles.textTime}>{time}</Text>
      <TouchableOpacity
        style={{
          ...styles.buttonContainer,
          backgroundColor: isActive ? colors.red : colors.green,
        }}
        onPress={onClick}
      >
        <Text style={styles.buttonText}>
          {isActive ? "Cancelar" : "Iniciar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
    marginHorizontal: 16,
  },
  textRestTime: {
    fontSize: 30,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  textTime: {
    fontSize: 64,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  buttonContainer: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.text,
  },
});
