import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
//import firebase
import { db, storage } from "../../src/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import { Styles } from "./Styles";

let resImagen;

export default function CreateProduct() {
  global.resImagen;

  const navigation = useNavigation();

  const initialState = {
    enlace: "",
    descripcion: "",
    imagen: "",
    marca: "",
    modelo: "",
  };

  const [state, setState] = useState(initialState);
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };
  async function pickImage() {
    resImagen = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
  }

  const saveProduct = async () => {
    try {
      if (!resImagen.canceled) {
        let uri = resImagen.assets[0].uri;
        // upload the image
        const response = await fetch(uri);
        //se pasa a blob(binario)
        const blob = await response.blob();
        const storageRef = ref(storage, "Datos/" + new Date().getTime());
        //guardar los datos de la imagen en firestore
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await addDoc(collection(db, "productos"), {
                  //...state es una copia de la variable de estado del componente y podemos definir que atributo modificar
                  ...state,
                  imagen: downloadURL,
                });
                Alert.alert("Alerta", "Guardado con éxito");
                navigation.navigate("Home");
              }
            );
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={Styles.container}>
      <GoBackButton />
      <Text style={Styles.titulo}></Text>
      <View style={Styles.inputgroup}>
        <TextInput
          placeholder="Enlace"
          onChangeText={(value) => handleChangeText(value, "enlace")}
          value={state.enlace}
        />
      </View>
      <View style={Styles.inputgroup}>
        <TextInput
          placeholder="Descripcion"
          onChangeText={(value) => handleChangeText(value, "descripcion")}
          value={state.descripcion}
        />
      </View>
      <View style={Styles.inputgroup}>
        <TextInput
          placeholder="Marca"
          onChangeText={(value) => handleChangeText(value, "marca")}
          value={state.marca}
        />
      </View>
      <View style={Styles.inputgroup}>
        <TextInput
          placeholder="Modelo"
          onChangeText={(value) => handleChangeText(value, "modelo")}
          value={state.modelo}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          // data={files}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => {
            if (item.fileType === "image") {
              return (
                <Image
                  source={{ uri: item.url }}
                  style={{ width: "54%", height: 100 }}
                />
              );
            } else {
            }
          }}
          numColumns={3}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ gap: 2 }}
        />
        <TouchableOpacity onPress={pickImage} style={Styles.selector}>
          <Ionicons name="image" size={34} color="white" />
        </TouchableOpacity>
      </View>

      <View style={Styles.containerButton}>
        <Pressable style={Styles.button} onPress={saveProduct}>
          <Text style={Styles.TextButton}> Cargar </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
