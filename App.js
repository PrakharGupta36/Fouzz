import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Button,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import UrgeWithPleasureComponent from "./components/Timer";
import { global } from "./styles/global";

export default function App() {
  const [modelToggle, setModelToggle] = useState(false);
  const [focusedItem, setFocusedItem] = useState("");
  const [focusedArr, setFocusedArr] = useState([]);

  function modalView() {
    focusedItem.length > 3
      ? setModelToggle(!modelToggle)
      : Alert.alert("To short", "Task should be atleast 4 letter long", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain}>
        <View style={{ marginTop: 40 }}>
          <View>
            <TextInput
              placeholder='Select Task...'
              onChangeText={(e) => {
                setFocusedItem(e);
                console.log(e);
              }}
              style={global.input}
            />
            <View style={{ width: "50%", margin: "auto" }}>
              <Button color={"#c8145a"} title='+' onPress={modalView} />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
                marginTop: 60,
              }}>
              {" "}
              Tasked you focused on..{" "}
            </Text>
            {focusedArr.length > 0 ? (
              focusedArr.map((i) => {
                return (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 15,
                    }}>
                    {i}
                  </Text>
                );
              })
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 40,
                }}>
                None
              </Text>
            )}
          </View>
        </View>

        <StatusBar style='auto' />
      </SafeAreaView>
      <Modal animationType='fade' visible={modelToggle}>
        <SafeAreaView style={styles.container}>
          <View>
            <UrgeWithPleasureComponent />
          </View>

          <StatusBar style='auto' />
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  containerMain: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#0C120C",
  },
});
