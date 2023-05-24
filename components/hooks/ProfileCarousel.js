import React, { useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image} from "react-native";
import Carousel from "react-native-anchor-carousel";
import { profileData } from "./profileData";
import { useNavigation } from '@react-navigation/native';
const { width: windowWidth } = Dimensions.get("window");
import { useStore } from "./authStore";

const ProfileCarousel = ({setShowModal, setID}) => {
  const numberCarousel = useRef(null);
  const navigation = useNavigation();


const setTeamID = useStore((state) => state.setTeamID);
const setURL = useStore((state) => state.setURL);

const redirect = (value, url) => {
    setShowModal(true);
    setID(value);
  };

  const renderItem = ({ item, index }) => {


    const profile = profileData[index];
    const teamID = profileData[index].id;
    const backgroundColor =
      index === 0 ? "#00412A" : index === 1 ? "#00412A" : "#00412A";

    return (
      <>
      <View
        style={[styles.item, { backgroundColor }]}
       
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Not working */}
          <Image
            source={profile.profilePic}
            style={{
              width: 134.63,
              height: 134.63,
              resizeMode: "cover",
              marginBottom: 15,
            }}
          />

          <Text style={{fontFamily:'NeuMontreal-Medium', fontSize: 18, color: "#fff"}}>{profile.name}</Text>
          <Text style={styles.h6}>{profile.position}</Text>
        </View>

        <TouchableOpacity  onPress={()=>{redirect(teamID, profile.profilePic)}} style={{width:'80%', height: 50,backgroundColor: '#1a1a1a', borderRadius: 5, marginTop: 5, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color: '#fff', fontSize: 14, fontFamily:'NeuMontreal-Medium'}}>Visit Profile</Text>
        </TouchableOpacity>
      </View>
      </>
    );
  };

  const data = [null, 0, null]; // create a new data array with length 3

  return (
    <Carousel
      style={styles.carousel}
      data={profileData}
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
    height: 330,
    paddingVertical: 15,
  },
  item: {
    position: "relative",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 5,
    height: "100%",
    paddingHorizontal: 25,
    overflow: "hidden",
    alignItems: "center",
    paddingVertical:25
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

export default ProfileCarousel;
