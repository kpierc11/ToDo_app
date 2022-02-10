import React, { ReactElement } from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  text: string;
}

function ToDo({ text }: Props): ReactElement {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}
export default ToDo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  }
});
