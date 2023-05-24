import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { profileData } from "./profileData";
import { useStore } from "./authStore";
import Header from "../parts/Header";
import Sidebar from "../parts/Sidebar";

const { width: windowWidth } = Dimensions.get("window");

const TeamProfile = () => {
//   const teamID = useStore((state) => state.teamID);
 
  const teamID = 1;
  const member = profileData.find((members) => members.id === teamID);
  const route = "TeamProfile";


  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: StatusBar.currentHeight,
          height: "100%",
        }}
      >
        <Sidebar />
        <StatusBar barStyle="light-content" />
        <Header route={route} />
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 15,
            marginTop: 150,
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>

            <View>
                <View>
                 
                    {member ?
                    <>
                    <Image style={{width: 130, height: 130, resizeMode: 'contain'}} source={{uri: member.profilePic}}  />
                    </>
                    : ""
                }
                </View>
                <View>
                     <Text style={{ fontFamily: "NeuMontreal-Medium", color: "#1a1a1a", fontSize: 20, textAlign: "center", marginBottom: 5, }} > {member ? member.name : ""} </Text>
                     <Text style={{textAlign: 'center', color: '#A3ADB2', fontSize: 14, fontFamily: "NeuMontreal-Regular",}}>{member ? member.position : ""}</Text>
                </View>
            </View>
            
            <View
              style={{
                backgroundColor: "#00623B",
                width: 64,
                height: 8,
                borderRadius: 20,
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: "NeuMontreal-Medium",
                fontSize: 18,
                color: "#1a1a1a",
                marginBottom: 20,
              }}
            >
              Team Profile
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
    paddingVertical: 25,
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

export default TeamProfile;
