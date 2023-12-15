import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Styles } from "./Styles";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import firebase from "../../src/config/firebase";

const instrumentsList = () => {
  const [instruments, setInstruments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    fetchMore(null, 2);

    // Fetch more data
    const intervalId = setInterval(() => {
      if (hasMoreData && !isLoading) {
        fetchMore(lastDocumentSnapshot, 2);
      }
    });

    return () => clearInterval(intervalId);
  }, []);

  // Fetch data
  async function fetchMore(lastDocumentSnapshot, limit) {
    if (!hasMoreData) return;

    setIsLoading(true);
    const nextData = await getPaginatedData(lastDocumentSnapshot, limit);

    if (nextData.docs.length === 0) {
      setHasMoreData(false);
    } else {
      setInstruments((instruments) => [
        ...instruments,
        ...nextData.docs.map((doc) => doc.data()),
      ]);
      setLastDocumentSnapshot(nextData.docs[nextData.docs.length - 1]);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  async function getPaginatedData(lastDocumentSnapshot, limit) {
    let query = firebase.db.collection("productos");

    if (lastDocumentSnapshot) {
      query = query.startAfter(lastDocumentSnapshot);
    }
    const nextData = await query.limit(limit).get();
    return nextData;
  }

  // Render footer
  const RenderFooter = () => {
    console.log(isLoading);
    if (!isLoading) return null;
    console.log("activity indicator");
    return (
      <ActivityIndicator
        size="large"
        color="orange"
        style={Styles.ActivityIndicator}
      />
    );
  };

  const llegaFin = () => {
    if (!hasMoreData || isLoading) return;
    fetchMore(lastDocumentSnapshot, 2);
  };

  const refresca = () => {
    setIsLoading(true);
    fetchMore(null, 2);
  };

  return (
    <View style={Styles.TopView}>
      <FlatList
        showsVerticalScrollIndicator={true}
        numColumns={2}
        ListHeaderComponent={Header}
        data={instruments}
        //Controlamos el paginado
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresca} />
        }
        onEndReachedThreshold={0}
        onEndReached={() => llegaFin()}
        ListFooterComponent={RenderFooter()}
        //creamos cada card
        renderItem={({ item }) => (
          <Pressable style={{ margin: 20 }}>
            <Image style={Styles.Image} source={{ uri: item.imagen }} />
            <Text style={Styles.Marca}>{item.marca}</Text>
            <Text style={Styles.Modelo}>{item.modelo}</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("UnInstrumento", {
                  marca: item.marca,
                  modelo: item.modelo,
                  imagen: item.imagen,
                  boton: item.boton,
                  descripcion: item.descripcion,
                })
              }
              style={Styles.Pressable}
            >
              <Text style={Styles.TextButton}>Ver más</Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
};

export default instrumentsList;
