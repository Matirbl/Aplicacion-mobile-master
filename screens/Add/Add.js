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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
//import firebase
import { db, storage } from "../../src/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

let resImagen;

export default function CreateProduct() {
  global.resImagen;

  const navigation = useNavigation();

  const initialState = {
    boton: "",
    descripcion: "",
    imagen: "",
    marca: "",
    modelo: "",
  };

  const [state, setState] = useState(initialState);
  // const [files, setFiles] = useState([]);

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
        const blob = await response.blob(); //se pasa a blob(binario)
        const storageRef = ref(storage, "Datos/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob); //guardar los datos de la imagen en firestore

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
                //console.log("File available at", downloadURL);

                await addDoc(collection(db, "productos"), {
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

      //...state es una copia de la variable de estado del componente
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}></Text>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Boton"
          onChangeText={(value) => handleChangeText(value, "boton")}
          value={state.boton}
        />
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Descripcion"
          onChangeText={(value) => handleChangeText(value, "descripcion")}
          value={state.descripcion}
        />
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Marca"
          onChangeText={(value) => handleChangeText(value, "marca")}
          value={state.marca}
        />
      </View>
      <View style={styles.inputgroup}>
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
        <TouchableOpacity
          onPress={pickImage}
          style={{
            width: 60,
            height: 60,
            left: 130,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
        >
          <Ionicons name="image" size={34} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.Button}>
        <Button title="Guardar producto" onPress={saveProduct} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  Button: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
    marginBottom: 20,
  },
});
