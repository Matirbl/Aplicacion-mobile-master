import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  imgBackground: {
    aspectRatio: 5 / 2,
    height: 180,
  },

  Section: {
    fontWeight: "100",
    margin: 10,
    borderColor: "C0C0C0",
    borderWidth: 3,
    borderRadius: 25,
    padding: 12,
    backgroundColor: "#6855ca",
    marginTop: 70,
  },

  TextSection: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "300",
    color: "#000000",
  },

  ButtonTop: {
    position: "absolute",
    height: 90,
    backgroundColor: "#f0f0e4",
    padding: 15,
    borderRadius: 8,
    top: 125,
    left: 50,
    width: "65%",
    borderColor: "C0C0C0",
    borderWidth: 3,
    justifyContent: "center",
  },

  Button: {
    backgroundColor: "#ffc40c",
    padding: 10,
    borderRadius: 8,
  },
  TextButton: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
