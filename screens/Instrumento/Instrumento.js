import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
import { Styles } from "./Styles";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const InstrumentoScreen = () => {
  const route = useRoute();

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 35,
        }}
      >
        <GoBackButton />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Ionicons name="search" size={24} color="black" />

          <Ionicons
            style={Styles.RigthIcon}
            name="ios-filter-outline"
            size={24}
            color="black"
          />
          <Ionicons
            style={Styles.RigthIcon}
            name="share-outline"
            size={24}
            color="black"
          />
        </View>
      </View>

      <View style={{ alignItems: "center", padding: 20 }}>
        <Image style={Styles.Image} source={{ uri: route.params.imagen }} />
      </View>

      <Text style={Styles.TextMarca}>{route.params.marca}</Text>
      <View>
        <Text style={Styles.TextDescripcion}>{route.params.descripcion}</Text>
      </View>
      <View style={Styles.Button}>
        <Text
          style={Styles.TextButton}
          onPress={() => Linking.openURL(route.params.boton)}
        >
          Visitar
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignContent: "center", padding: 10 }}
      >
        <AntDesign name="Safety" size={24} color="orange" />
        <Text>Your safety is our priority</Text>
      </View>
    </SafeAreaView>
  );
};

export default InstrumentoScreen;
