import { StatusBar } from "expo-status-bar";
import StackNavigator from "./components/StackNavigator/StackNavigator";

export default function App() {
  return (
    <>
      <StackNavigator />
      <StatusBar style="auto" />
    </>
  );
}
