import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

import { useStore } from '../hooks/authStore';

export default function Sidebar() {
  const setOpen = useStore((state) => state.setOpen);
  const isOpen = useStore((state) => state.isOpen);
  const clearStore = useStore((state) => state.clearStore);
  const email = useStore((state) => state.email);
  const user = useStore((state) => state.user);
  const role = useStore((state) => state.role);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigation = useNavigation();

  const toggleSidebar = () => {
    setOpen(!isSidebarOpen);
  };

  const logout = () => {
    setOpen(false);
    clearStore();
    navigation.navigate('Login');
  };

  const profile = () => {
    setOpen(false);
    navigation.navigate('About');
  };

  const addUser = () => {
    setOpen(false);
    navigation.navigate('User');
  };

  return (
    <>
      {isOpen && (
        <View style={{  position: 'absolute', zIndex: 9999,top: 0,left: 0, width: '60%',backgroundColor:'#1a1a1a', height: '150%', borderTopLeftRadius: 5,borderBottomLeftRadius: 5,  paddingTop: 20, borderColor: '#ffffff', borderLeftWidth: 1,}}>
        
          <View style={styles.sidebar}>
         
            <TouchableOpacity
              style={{   width: 50,height: 50,  alignSelf: 'flex-end', borderRadius: 5, marginTop: 10, marginBottom: 20,alignItems: 'center',justifyContent: 'center', position: 'absolute', top: 10, zIndex: 999}}
              onPress={toggleSidebar}>
              <Text style={styles.submitButtonText}>X</Text>
            </TouchableOpacity>


            <View style={{ width: '100%',textAlign: 'center',justifyContent: 'space-around',alignItems:'center', flexDirection:'row', marginTop: 20}}>
              <TouchableOpacity
                style={{  width: '20%',alignItems: 'center'}}
                onPress={toggleSidebar}>
                <Image
                  style={{ width: 50,height: 50, resizeMode: 'contain',}}
                  source={require('../../assets/images/picture.png')}
                />
              </TouchableOpacity>
              
              <View>
               <Text style={{fontSize: 15, fontFamily: 'NeuMontreal-Bold', color: "#ffffff"}}>{user}</Text>
               <Text style={styles.textRight}>{email}</Text>
              </View>
             
            </View>

            <View style={{  marginTop: 50, paddingLeft: 10,}}>
              {role === 'admin' ? (
                <>
                  <TouchableOpacity onPress={addUser}>
                    <Text style={{ fontSize: 15,fontFamily:'NeuMontreal-Regular',marginBottom: 20, color: '#fff',}}>Add User</Text>
                  </TouchableOpacity>
                </>
              ) : (
                ''
              )}
                <TouchableOpacity onPress={profile}>
                <Text style={{ fontSize: 15,fontFamily:'NeuMontreal-Regular',marginBottom: 20, color: '#fff',}}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <Text style={{ fontSize: 15,fontFamily:'NeuMontreal-Regular',marginBottom: 20, color: '#fff',}}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
