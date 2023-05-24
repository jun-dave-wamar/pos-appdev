import React, { useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image} from "react-native";
import Carousel from "react-native-anchor-carousel";
import { profileData } from "./profileData";
import { useNavigation } from '@react-navigation/native';
const { width: windowWidth } = Dimensions.get("window");
import { useStore } from "./authStore";

const ImageCarousel = ({memberID}) => {
  const numberCarousel = useRef(null);

const member = profileData?.find((item)=> item.id === memberID );

const images = [member.image1, member.image2, member.image3];


  const renderItem = ({ item, index }) => {

    return (
        <>
        <View
          style={{
            width: "100%",
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            alignContent:'center',
            marginTop: 15,
          }}
        >
    
          <Image
            source={item}
            style={{
              width: '95%',
              height:  '100%',
              resizeMode: "cover",
              marginBottom: 15,
              borderRadius: 15
            }}
          />

    
        </View>
      </>
    );
  };

  return (
    <Carousel
      style={styles.carousel}
      data={images}
      renderItem={renderItem}
      itemWidth={windowWidth * 0.8}
      separatorWidth={0}
      containerWidth={windowWidth}
      ref={numberCarousel}
      initialIndex={0} // set the initial index to 1 to make the second item the center item
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    height: 220,
    paddingVertical: 15,
  },
  item: {
    position: "relative",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 15,
    height: "100%",
    paddingHorizontal: 30,
    overflow: "hidden",
    alignItems: "center",
    paddingVertical:25,
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "NeuMontreal-Bold",
    color: "#fff",
    textAlign: "center",
  },
  h5: {
    fontSize: 12,
    fontStyle: "NeuMontreal-Regular",
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
  h6: {
    fontSize: 12,
    fontStyle: "NeuMontreal-Regular",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    position: "absolute",
    top: 20,
    right: -70,
    width: 200,
    height: "100%",
    resizeMode: "contain",
  },
});

export default ImageCarousel;
