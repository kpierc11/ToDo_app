import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  ScrollView,
  Alert,
  Modal,
  Text,
  Pressable,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { text } from "stream/consumers";
import ToDo from "../ToDo";

function HomeScreen() {
  //Use State hook that handles the updating of the toDo text
  const [toDoText, setToDoText] = useState("");

  //Use State hook that handles the state of whether the modal is open or not.
  const [modalVisible, setModalVisible] = useState(false);

  //Create an array of toDo items to display and pass to the FlatList Component
  //Use the useState React hook to moniter the changes of state of the items array.
  //This hook takes two items: The first is a state variable and the second is a function to update the state.
  const [items, setItems] = useState<any[]>([]);

  //Create a constant called renderItem
  //This will destructure the contents of the items array to display in the FlatList Component
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity key={index}>{item}</TouchableOpacity>
  );

  //Use the useEffect hook to display the toDo items that have been saved to local storage
  //This hook will run once when the app is opened.
  useEffect(() => {
    retrieveData();
  }, []);

  const storeData = async (items: any) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(items));
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("items");
      if (value !== null) {
        const parsedItems: any[] = JSON.parse(value);

        const items = parsedItems.map((item) => {
          return <ToDo text={item.props.text}></ToDo>;
        });

        setItems(items);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  //Display ToDo Items and return pop up modal
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={items} renderItem={renderItem} extraData={items} />
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          
          alignItems:'flex-end'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.icon}
        >
          <Ionicons
            name={"add-circle-outline"}
            style={{ alignSelf: "center" }}
            color={"white"}
            size={20}
          ></Ionicons>
        </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          items.pop()
          setItems([...items])
        }}
        style={styles.icon}
      >
        <Ionicons
          name={"remove-circle-outline"}
          style={{ alignSelf: "center" }}
          color={"white"}
          size={20}
        ></Ionicons>
      </TouchableOpacity>
      </View>

      <View style={modalStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setToDoText(text);
                }}
              ></TextInput>
              <Pressable
                style={modalStyles.button}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setItems(
                    items.length
                      ? [...items, <ToDo text={toDoText} />]
                      : [<ToDo text={toDoText} />]
                  );
                  storeData(items);
                }}
              >
                <Text style={modalStyles.textStyle}>Add to Do</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: "tomato",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    height:'100%'
  },
  avoidingView: {},
  title: {
    fontSize: 32,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    margin:10,
    width: "20%",
    height: 50,
    backgroundColor: "tomato",
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
  input: {
    alignSelf: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default HomeScreen;
