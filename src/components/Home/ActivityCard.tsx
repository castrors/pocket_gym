import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { Workout } from "../../screens/HomeScreen";
import { workoutDurationInMin } from "../../utils/Utils";

interface ActivityCardProps {
  workout: Workout;
  onPress: () => void;
}

export function ActivityCard({ workout, onPress }: ActivityCardProps) {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={workout.title} subtitle={workout.subtitle} />
        <Card.Actions>
          <Button
            icon="play"
            mode="contained"
            onPress={onPress}
            uppercase={false}
          >
            {workoutDurationInMin(workout)}min
          </Button>
        </Card.Actions>
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
