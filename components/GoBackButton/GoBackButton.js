import { Styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const GoBackButton = () => {
  const navigation = useNavigation();
  return (
    <Ionicons
      onPress={() => navigation.goBack()}
      style={Styles.LeftIcon}
      name="arrow-back"
      size={34}
      color="black"
    />
  );
};

export default GoBackButton;
