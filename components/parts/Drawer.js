
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from '../hooks/authStore';


import Home from '../screens/Home';
import Details from '../screens/Details';
import Inventory from '../screens/Inventory';
import User from '../screens/User';

const Drawer = createDrawerNavigator();

export default function Sidebar() {

   <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={Details} />
      </Drawer.Navigator>
    </NavigationContainer>

}