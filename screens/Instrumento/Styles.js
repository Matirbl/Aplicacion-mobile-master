import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  Image: {
    aspectRatio: 1.25,
    height: 250,
    borderRadius: 10,
  },

  LeftIcon: {
    marginLeft: 5,
  },

  RigthIcon: {
    marginHorizontal: 10,
  },
  TextMarca: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 15,
  },

  TextDescripcion: {
    fontSize: 13,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    color: "gray",
  },

  Button: {
    backgroundColor: "#ffc40c",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 100,
  },

  TextButton: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
