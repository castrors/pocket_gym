import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface ItemProps {
  title: string;
  backgroundColor: string;
}

export function Item({ title, backgroundColor }: ItemProps) {
  return (
    <View style={{ ...styles.item, backgroundColor: backgroundColor }}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    color: colors.white,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.white,
  },
});
