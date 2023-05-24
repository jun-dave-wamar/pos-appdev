import React,{useState, useRef} from "react";
import { Dimensions, StatusBar,Modal, SafeAreaView, Text, View, ScrollView,TouchableOpacity,Image } from "react-native";
import Header from '../parts/Header';
import Footer from '../parts/Footer';
import Sidebar from '../parts/Sidebar';
import { styles } from '../styles/styles';
import ProfileCarousel from "../hooks/ProfileCarousel";
import { profileData } from "../hooks/profileData";
import ImageCarousel from "../hooks/imageCarousel";
export default function About() {
  const { height, width } = Dimensions.get('window');
  const [showModal, setShowModal] = useState(false);
  const [showID, setID] = useState(0);

  const member = profileData?.find((value) => value.id == showID);
  

  const route = "About";
  return (
    <View style={{ flex: 1}}>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: StatusBar.currentHeight, height: '100%'}}>
          <Sidebar />
          <StatusBar barStyle="light-content" />
          <Header route={route} />
          <View style={{backgroundColor: '#fff', flex: 1, justifyContent:'center', paddingHorizontal: 15, marginTop: 150}}>
              <View style={{width: '100%', alignItems: 'center'}}>
                  <Text style={{fontFamily: 'NeuMontreal-Regular', color:"#1a1a1a", fontSize: 15, textAlign: 'center', marginBottom: 18}}>Versatile team of skilled professionals comprising of a full stack developer, database manager, graphic designer, and UI/UX designer, collaborating to develop a POS mobile app for our school project.</Text>
                  <View style={{ backgroundColor: '#00623B', width: 64, height: 8, borderRadius: 20 }}/>
              </View>

              <View>
                <Text style={{fontFamily:'NeuMontreal-Medium', fontSize: 18, color: "#1a1a1a", marginBottom: 20}}>Team Profile</Text>
                <ProfileCarousel setShowModal={setShowModal} setID={setID}/>
              </View>
          </View>
          <Footer route={route} />


          <Modal animationType="slide" visible={showModal}>
          <ScrollView
            contentContainerStyle={{ paddingTop: 20, marginHorizontal: 5 }}>
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
                  onPress={() => {
                      setShowModal(false);
                    }}
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
              >
                <Image
                  style={{ width: 0, height: 0, resizeMode: "contain" }}
                  source={require("../../assets/images/menu.png")}
                />
              </TouchableOpacity>
            </View>
            </View>

            
      
              <View style={{zIndex: 55, position: 'relative', marginTop: 60}}>
          
                  <View style={{justifyContent:'center', alignItems:'center', marginTop: 20}}>
                   <Image source={member ? member.profilePic : require('../../assets/images/profile/dave5.png')} style={{width: 135, height:135 }}/>
                  </View>
                
                <View style={{justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection:'row', marginTop: 10}}>
        
                  <Text style={{color: '#1A1A1A', fontFamily:'NeuMontreal-Medium', fontSize: 25, marginLeft: 10}}>{member ? member.name : ""}</Text>
                  <Image source={require('../../assets/images/icons/tick.png')} style={{width: 24, height:24}}/>
                </View>
                <Text style={{color: '#A3ADB2', fontFamily:'NeuMontreal-Medium', fontSize: 14, textAlign:'center', marginTop:5}}>{member ? member.position : ""} @starbucks</Text>
              </View>

              <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center', alignContent:'center', marginTop: 20}}>
                <TouchableOpacity style={{backgroundColor: '#00623B', width: '45%', height:50, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', alignItems:'center', alignContent:'center', borderRadius: 10}}>
                  <Image source={require('../../assets/images/icons/hire.png')} style={{width: 26.95, height:15.5}}/>
                  <Text style={{fontFamily:'NeuMontreal-Regular', fontSize: 15, color: "#1a1a1a", marginBottom: 5, color: '#fff', marginLeft: 15}}>Hire Me</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#1a1a1a', width: '45%', height:50, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', alignItems:'center', alignContent:'center', borderRadius: 10, marginLeft: 10}}>
                
                  <Text style={{fontFamily:'NeuMontreal-Regular', fontSize: 15, color: "#1a1a1a", marginBottom: 5, color: '#fff'}}>Follow</Text>
                </TouchableOpacity>
              </View>
              

              <View style={{justifyContent:'space-between', flexDirection:'row', flexWrap: 'wrap', alignItems:'center', paddingHorizontal: 25, marginTop: 15}}>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                     <Text style={{color: '#A3ADB2', fontSize: 12}}>Friends</Text>
                     <View style={{flexDirection: 'row', justifyContent:'flex-start', flexWrap:'wrap', alignContent:'center', alignItems:'center', marginTop: 5}}>
                       <Image source={require('../../assets/images/social/1.png')} style={{width: 22, height:22}}/>
                       <Image source={require('../../assets/images/social/2.png')} style={{width: 22, height:22, left: -12}}/>
                       <Image source={require('../../assets/images/social/3.png')} style={{width: 22, height:22, left: -22}}/>
                       <Text style={{left: -15}}>{member ? member.friends : 320}</Text>
                     </View>
                  </View>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                     <Text style={{color: '#A3ADB2', fontSize: 12}}>Content</Text>
                     <View style={{flexDirection: 'row', justifyContent:'flex-start', flexWrap:'wrap', alignContent:'center', alignItems:'center', marginTop: 5}}>
                       <Image source={require('../../assets/images/social/1.png')} style={{width: 22, height:22}}/>
                       <Image source={require('../../assets/images/social/2.png')} style={{width: 22, height:22, left: -12}}/>
                       <Image source={require('../../assets/images/social/3.png')} style={{width: 22, height:22, left: -22}}/>
                       <Text style={{left: -15}}>{member ? member.content : 320}</Text>
                     </View>
                  </View>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                     <Text style={{color: '#A3ADB2', fontSize: 12}}>Followers</Text>
                     <View style={{flexDirection: 'row', justifyContent:'flex-start', flexWrap:'wrap', alignContent:'center', alignItems:'center', marginTop: 5}}>
                       <Image source={require('../../assets/images/social/1.png')} style={{width: 22, height:22}}/>
                       <Image source={require('../../assets/images/social/2.png')} style={{width: 22, height:22, left: -12}}/>
                       <Image source={require('../../assets/images/social/3.png')} style={{width: 22, height:22, left: -22}}/>
                       <Text style={{left: -15}}>{member ? member.followers : 320}</Text>
                     </View>
                  </View>
              </View>

                <View style={{paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
                    <ImageCarousel memberID={member ? showID : 1}/>

                    <Text style={{textAlign:'center', fontSize: 15, fontFamily: "NeuMontreal-Medium",}}>{member ? member.quote : "An inspiring Dev"}</Text>
                    <View style={{backgroundColor:'#00623B', width:63, height:8, borderRadius: 20, marginTop: 15}}/>
                </View>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    </View>
  );
}


