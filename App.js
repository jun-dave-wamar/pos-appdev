import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/screens/Home';
import Details from './components/screens/Details';
import Inventory from './components/screens/Inventory';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import User from './components/screens/User';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useStore } from './components/hooks/authStore';
import useCustomFonts from './components/styles/font';
import About from './components/screens/About';
import TeamProfile from './components/hooks/TeamProfile';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
   const token = useStore(state => state.token);
// const token = "wqqe";
 const fontsLoaded = useCustomFonts();

 if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={token ? 'About' : 'About'}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} /> 
          <Stack.Screen name="Inventory" component={Inventory} /> 
          <Stack.Screen name="Login" component={Login} /> 
          <Stack.Screen name="Register" component={Register} /> 
          <Stack.Screen name="User" component={User} /> 
           <Stack.Screen name="About" component={About} /> 
           <Stack.Screen name="TeamProfile" component={TeamProfile} /> 

        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
