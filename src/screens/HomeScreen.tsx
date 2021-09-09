import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Button, Card, Title, Paragraph, Avatar } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ActivityCard } from "../components/Home/ActivityCard";

export interface Exercise {
  title: string;
}

export interface Settings {
  stimulusDuration: number;
  series: number;
  restDuration: number;
}

export interface Workout {
  title: string;
  subtitle: string;
  exercises: Exercise[];
  settings: Settings;
}

const trainings: Workout[] = [
  {
    title: "Treino Aeróbico",
    subtitle: "com Rai Rafaine",
    exercises: [
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
    ],
    settings: {
      stimulusDuration: 30,
      series: 5,
      restDuration: 15,
    },
  },
  {
    title: "Treino FullBody",
    subtitle: "com Rai Rafaine",
    exercises: [
      {
        title: "Agachamento com Avanço",
      },
      {
        title: "Flexão de braços",
      },
      {
        title: "Escalador",
      },
      {
        title: "AbMat",
      },
    ],
    settings: {
      stimulusDuration: 40,
      series: 5,
      restDuration: 20,
    },
  },
];

export function HomeScreen({ ...props }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Escolha seu treino!</Text>
      <FlatList
        data={trainings}
        renderItem={({ item }) => (
          <ActivityCard
            workout={item}
            onPress={() =>
              props.navigation.navigate("WorkoutDetailScreen", item)
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green_light,
    padding: 20,
  },
  textTitle: {
    fontSize: 36,
    lineHeight: 40,
    color: colors.black,
    fontFamily: fonts.heading,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 140,
    marginBottom: 24,
  },
});
