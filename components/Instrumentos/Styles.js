import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  TopView: {
    marginTop: 35,
  },
  Image: {
    aspectRatio: 0.65,
    height: 240,
    borderRadius: 10,
    shadowColor: "purple",
  },
  Marca: {
    fontSize: 14,
    fontWeight: "700",
    width: 100,
    marginTop: 5,
  },
  Modelo: {
    fontSize: 14,
    fontWeight: "300",
    width: 100,
    marginTop: 5,
    marginBottom: 15,
  },
  Pressable: {
    backgroundColor: "#ffc40c",
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  TextButton: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  ActivityIndicator: {
    marginBottom: 10,
  },
});
