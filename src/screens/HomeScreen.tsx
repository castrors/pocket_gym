import React, { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,

} from "react-native";

import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';

import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ActivityCard } from "../components/Home/ActivityCard";

export function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>Escolha seu treino!</Text>
            {/* <ExerciseCard exercise={{}}/> */}


            <ActivityCard title={"Aeróbico"} subtitle={"com Rai Rafaine"} duration={25} onPress={() => navigation.navigate('ExercisesScreen')} />
            <ActivityCard title={"Hiit"} subtitle={"com Rai Rafaine"} duration={30} onPress={() => navigation.navigate('ExercisesScreen')} />

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
        lineHeight: 32,
        color: colors.black,
        fontFamily: fonts.heading,
        marginTop: 20,
        marginLeft: 16,
        marginRight: 140,
        marginBottom: 24
    },
});
