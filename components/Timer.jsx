import Svg, { Path, LinearGradient, Stop, Defs } from "react-native-svg";
import { useCountdown } from "react-native-countdown-circle-timer";
import { StyleSheet, Text, View, Vibration, Button } from "react-native";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef } from "react";

export default function UrgeWithPleasureComponent() {
  const [toggle, setToggle] = useState(false);
  const children = (remainingTime) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  function pressHandler(e) {
    setToggle(!toggle);
    console.log(e.target.textContent);
    toggle
      ? (e.target.textContent = "Start Timer")
      : (e.target.textContent = "Pause Timer");
  }

  const pickerRef = useRef();

  const [duration, setDuration] = useState(1500);
  const [reset, setReset] = useState();
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({
    isPlaying: toggle,
    duration,
    onComplete: () => {
      Vibration.vibrate(500);
      setDuration(1500);
    },
    children,
    colors: "url(#your-unique-id)",
  });

  console.log(typeof duration);
  return (
    <>
      <View style={styles.container}>
        <View style={{ width: size, height: size, position: "relative" }}>
          <Svg width={size} height={size}>
            <Defs>
              <LinearGradient id='your-unique-id' x1='1' y1='0' x2='0' y2='0'>
                <Stop offset='5%' stopColor='#fff' />
                <Stop offset='95%' stopColor='#c70d5a' />
              </LinearGradient>
            </Defs>
            <Path
              d={path}
              fill='none'
              stroke='white'
              strokeWidth={strokeWidth}
            />
            {elapsedTime !== duration && (
              <Path
                d={path}
                fill='none'
                stroke={stroke}
                strokeLinecap='butt'
                strokeWidth={strokeWidth}
                strokeDasharray={pathLength}
                strokeDashoffset={strokeDashoffset}
              />
            )}
          </Svg>
          <View style={styles.time}>
            <Text style={{ fontSize: 36, color: "white", margin: 2 }}>
              {Math.round(remainingTime / 60)}
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              {" "}
              Minutes Left...{" "}
            </Text>
          </View>
        </View>
      </View>
      {toggle ? (
        <View style={(styles.card, { margin: 10 })}>
          <Text style={{ color: "white", textAlign: "center", margin: 10 }}>
            {" "}
            Focusing...{" "}
          </Text>
        </View>
      ) : (
        <View style={(styles.card, { marginBottom: 40 })}>
          <Text style={{ color: "white", textAlign: "center", margin: 10 }}>
            {" "}
            Select Minutes{" "}
          </Text>
          <View
            style={{
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 5,
              padding: 10,
            }}>
            <Picker
              style={{ color: "black" }}
              selectedValue={duration}
              ref={pickerRef}
              onValueChange={(itemValue, itemIndex) =>
                setDuration(parseInt(itemValue))
              }>
              <Picker.Item label='25' value='1500' />
              <Picker.Item label='15' value='900' />
              <Picker.Item label='10' value='10' />
            </Picker>
          </View>
        </View>
      )}
      <Button color={"#c8145a"} title='Start Timer' onPress={pressHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  time: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  card: {
    borderWidth: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    color: "white",
    marginTop: 10,
    marginLeft: 4,
  },
});
