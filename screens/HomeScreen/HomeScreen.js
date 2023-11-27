import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Instrumentos from "../../components/Instrumentos/Instrumentos";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#F0F0F0", flex: 1 }}>
      <Instrumentos />
    </SafeAreaView>
  );
};

export default HomeScreen;
