// //MovieCards en tutorial
// import {
//   Text,
//   View,
//   FlatList,
//   Pressable,
//   Image,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { Styles } from "./Styles";
// import React, { useState } from "react";
//import instrumentos from "../../data/Instruments";
// import Header from "../Header/Header";
//  import { useNavigation } from "@react-navigation/native";

//const CardsInstruments = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMoreLoading, setIsMoreLoading] = useState(false);
// const data = instrumentos; //REALIZAR CAMBIOS PARA TRAER DESDE DB
// const navigation = useNavigation();

//   //https://www.youtube.com/watch?v=S8AGpWn9qrM&ab_channel=BugNinza
//   renderFooter = () => {
//     if (!isMoreLoading) return true;
//     return (
//       <ActivityIndicator
//         size="large"
//         color="orange"
//         style={Styles.ActivityIndicator}
//       />
//     );
//   };

//   onRefresh = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   };

//   getMore = () => {
//     setIsMoreLoading(true);
//     setTimeout(() => {
//       setIsMoreLoading(false);
//     }, 2000);
//   };

//   return (
//     <View style={Styles.TopView}>
//       <FlatList
//         showsVerticalScrollIndicator={true}
//         numColumns={2}
//         ListHeaderComponent={Header}
//         data={data}
//         ListFooterComponent={renderFooter}
//         refreshControl={
//           <RefreshControl refreshing={isMoreLoading} onRefresh={onRefresh} />
//         }
//         onEndReachedThreshold={0.5}
//         initialNumToRender={3}
//         onMomentumScrollBegin={() => {
//           onEndReachedCalledDuringMomentum = false;
//         }}
//         onEndReached={() => {
//           if (!onEndReachedCalledDuringMomentum) {
//             getMore();
//             onEndReachedCalledDuringMomentum = true;
//           }
//         }}
//         renderItem={({ item }) => (
//           <Pressable style={{ margin: 20 }}>
//             <Image style={Styles.Image} source={{ uri: item.imagen }} />
//             <Text style={Styles.Marca}>{item.marca.substring(0.16)}</Text>
//             <Text>{item.modelo}</Text>
//             <Pressable
//               onPress={() =>
//                 navigation.navigate("UnInstrumento", {
//                   marca: item.marca,
//                   modelo: item.modelo,
//                   imagen: item.imagen,
//                   boton: item.boton,
//                   descripcion: item.descripcion,
//                 })
//               }
//               style={Styles.Pressable}
//             >
//               <Text style={Styles.TextButton}>Ver más</Text>
//             </Pressable>
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// };

// export default CardsInstruments;
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
import firebase, { getPaginatedData } from "../../src/config/firebase";
import { Firestore } from "firebase/firestore";

const instrumentsList = () => {
  const [instruments, setInstruments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const navigation = useNavigation();

  const [isNoMoreData, setIsNoMoreData] = useState(false);
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState(null);

  // Función para obtener más datos
  const fetchMore = async () => {
    if (!isNoMoreData) {
      setIsMoreLoading(true);

      // Cambia el límite a 4
      const nextData = await getPaginatedData(lastDocumentSnapshot, 4);

      if (nextData.docs.length > 0) {
        setInstruments((instruments) => [
          ...instruments,
          ...nextData.docs.map((doc) => doc.data()),
        ]);
        setLastDocumentSnapshot(nextData.docs[nextData.docs.length - 1]);
      } else {
        setIsNoMoreData(true);
      }

      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("productos")
      .limit(4)
      .onSnapshot((querySnapshot) => {
        const documents = [];
        querySnapshot.docs.forEach((doc) => {
          documents.push(doc.data());
        });
        console.log(documents);
        setInstruments(documents);
      });

    return unsubscribe;
  }, []);

  const renderFooter = () => {
    if (!isMoreLoading) return true;
    return (
      <ActivityIndicator
        size="large"
        color="orange"
        style={Styles.ActivityIndicator}
      />
    );
  };

  const onRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const getMore = async () => {
    setIsMoreLoading(true);
    await fetchMore();
    setIsMoreLoading(false);
  };

  return (
    <View style={Styles.TopView}>
      <FlatList
        showsVerticalScrollIndicator={true}
        numColumns={2}
        ListHeaderComponent={Header}
        data={instruments}
        //Controlamos el paginado
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isMoreLoading} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0}
        onEndReached={() => getMore()}
        //creamos cada card
        renderItem={({ item }) => (
          <Pressable style={{ margin: 20 }}>
            <Image style={Styles.Image} source={{ uri: item.imagen }} />
            <Text style={Styles.Marca}>{item.marca}</Text>
            <Text>{item.modelo}</Text>
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
