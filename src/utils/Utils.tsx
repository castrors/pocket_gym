import { Settings, Workout } from "../screens/HomeScreen";

export function exerciseDurationInMin(settings: Settings): number {
  return (
    ((settings.restDuration + settings.stimulusDuration) * settings.series) / 60
  );
}

export function workoutDurationInMin(workout: Workout): number {
    const {exercises, settings} = workout;

    return (
        ((settings.restDuration + settings.stimulusDuration) * settings.series) / 60 * exercises.length
      );
}
