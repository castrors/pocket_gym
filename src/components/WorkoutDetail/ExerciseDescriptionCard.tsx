import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, List, Text, Caption } from "react-native-paper";
import { Exercise, Settings } from "../../screens/HomeScreen";
import { exerciseDurationInMin } from "../../utils/Utils";

interface ExerciseDescriptionCardProps {
  exercise: Exercise;
  settings: Settings;
  onPress: () => void;
}

export function ExerciseDescriptionCard({
  exercise,
  settings,
  onPress,
}: ExerciseDescriptionCardProps) {
  return (
    <View style={styles.container}>
      <Card>
        <List.Item
          title={exercise.title}
          description={exercise.title}
          right={(props) => (
            <Caption style={{ alignSelf: "center", marginRight: 8 }}>
              aprox. {exerciseDurationInMin(settings)} min.
            </Caption>
          )}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginTop: 8,
  },
});
