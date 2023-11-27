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
import firebase from "../../src/config/firebase";

const instrumentsList = () => {
  const [instruments, setInstruments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("productos")
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

  const getMore = () => {
    setIsMoreLoading(true);
    setTimeout(() => {
      setIsMoreLoading(false);
    }, 2000);
  };

  return (
    <View style={Styles.TopView}>
      <FlatList
        showsVerticalScrollIndicator={true}
        numColumns={2}
        ListHeaderComponent={Header}
        data={instruments}
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
        //Controlamos el paginado
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isMoreLoading} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          let onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            getMore();
            onEndReachedCalledDuringMomentum = true;
          }
        }}
      />
    </View>
  );
};

export default instrumentsList;
