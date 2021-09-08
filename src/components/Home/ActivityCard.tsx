import React from "react";
import { View, StyleSheet } from "react-native"
import { Card, Button } from "react-native-paper";
import { Training } from "../../screens/HomeScreen";

interface ActivityCardProps {
    training: Training;
    onPress: () => void;
}

export function ActivityCard({ training, onPress }: ActivityCardProps) {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title title={training.title} subtitle={training.subtitle} />
                <Card.Actions>
                    <Button icon="play" mode="contained" onPress={onPress} uppercase={false}>{training.time}min</Button>
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