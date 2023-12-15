import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  titulo: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputgroup: {
    flex: 1,
    paddin: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  containerButton: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
    marginBottom: 10,
  },
  selector: {
    width: 60,
    height: 60,
    left: 130,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },

  button: {
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
