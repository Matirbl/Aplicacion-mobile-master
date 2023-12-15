import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { Styles } from "./Styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <ImageBackground
        style={Styles.imgBackground}
        source={{
          uri: "https://cdn.pixabay.com/photo/2021/09/01/10/43/music-6591030_1280.jpg",
        }}
      >
        <View style={Styles.ButtonTop}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <View>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Nuevo instrumento
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "gray",
                  marginTop: 4,
                }}
              >
                Agregar instrumento
              </Text>
            </View>

            <Pressable
              onPress={() => {
                navigation.navigate("Add");
              }}
              style={Styles.Button}
            >
              <Text style={Styles.TextButton}> + Agregar</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={{ marginTop: 30 }} />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      ></ScrollView>
    </View>
  );
};
export default Header;
