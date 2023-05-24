import React, { useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

import { useStore } from "../hooks/authStore";
export default function Header({ route }) {
  const setOpen = useStore((state) => state.setOpen);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();

  const toggleSidebar = () => {
    setOpen(!isSidebarOpen);
  };
  const arrowBack = () => {
    navigation.goBack();
  };
  return (
    <>
      {route === "About" ? (
        <>
          <View
            style={{
              height: 150,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",

              zIndex: 7,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                zIndex: -1,
                alignSelf: "flex-start",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                
              }}
              source={require("../../assets/images/topBG.jpg")}
            />

            <View style={{ paddingHorizontal: 15, justifyContent: "space-between", flexDirection: "row", alignItems: "center", width: '100%' }}>
              <TouchableOpacity
                style={styles.headerProfile}
                onPress={arrowBack}
              >
                <Image
                  style={{ width: 0, height: 0, resizeMode: "contain" }}
                  source={require("../../assets/images/arrowLeft.png")}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "NeuMontreal-Medium",
                }}
              >
                About Us
              </Text>
              <TouchableOpacity
                style={styles.headerProfile}
                onPress={toggleSidebar}
              >
                <Image
                  style={{ width: 28, height: 28, resizeMode: "contain" }}
                  source={require("../../assets/images/menu.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#ffffff",
                width: "100%",
                height: 60,
                position: "absolute",
                bottom: 0,
                zIndex: -2,
              }}
            />
          </View>
        </>
      ) : 
      route === "TeamProfile" ?
      <>
      <View
        style={{
          height: 150,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",

          zIndex: 7,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            zIndex: -1,
            alignSelf: "flex-start",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            
          }}
          source={require("../../assets/images/topBG.jpg")}
        />

        <View style={{ paddingHorizontal: 15, justifyContent: "space-between", flexDirection: "row", alignItems: "center", width: '100%' }}>
          <TouchableOpacity
            style={styles.headerProfile}
            onPress={arrowBack}
          >
            <Image
              style={{ width: 30, height: 30, resizeMode: "contain" }}
              source={require("../../assets/images/arrowLeft.png")}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontFamily: "NeuMontreal-Medium",
            }}
          >
            Profile
          </Text>
          <TouchableOpacity
            style={styles.headerProfile}
            onPress={toggleSidebar}
          >
            <Image
              style={{ width: 28, height: 28, resizeMode: "contain" }}
              source={require("../../assets/images/menu.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            height: 60,
            position: "absolute",
            bottom: 0,
            zIndex: -2,
          }}
        />
      </View>
    </>
      :
      
      (
        <>
          <View
            style={{
              backgroundColor: "#00412A",
              height: 100,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity
              style={styles.headerProfile}
              onPress={toggleSidebar}
            >
              <Image
                style={{ width: 28, height: 28, resizeMode: "contain" }}
                source={require("../../assets/images/notif.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleSidebar}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  textAlign: "center",
                }}
                source={require("../../assets/images/logo2.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerProfile}
              onPress={toggleSidebar}
            >
              <Image
                style={{ width: 28, height: 28, resizeMode: "contain" }}
                source={require("../../assets/images/menu.png")}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}
