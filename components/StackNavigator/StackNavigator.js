import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import Add from "../../screens/Add/Add";
import Instrumento from "../../screens/Instrumento/Instrumento";
const StackNavigator = () => {
  //En esta parte creo los screens por los cuales puedo navegar
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="UnInstrumento"
          component={Instrumento}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
