import React from "react";
import { View, StyleSheet } from "react-native"
import { Card, Button } from "react-native-paper";

interface ActivityCardProps {
    title: string;
    subtitle: string;
    duration: number;
    onPress: () => void;
}

export function ActivityCard({ title, subtitle, duration, onPress }: ActivityCardProps) {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title title={title} subtitle={subtitle} />
                <Card.Actions>
                    <Button icon="play" mode="contained" onPress={onPress} uppercase={false}>{duration}min</Button>
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