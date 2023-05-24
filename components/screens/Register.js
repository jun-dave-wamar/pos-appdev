import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const Register = () => {
  const data = [
    {
      roleName: 'admin',
    },
    {
      roleName: 'cashier',
    },
  ];

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [role, setRole] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleRegister = async () => {
    try {
      setUsernameError(false);
      setPasswordError(false);
      setEmailError(false);
      setNumberError(false);
      setRoleError(false);

      if (!username || !password || !email || !number) {
        setUsernameError(!username);
        setPasswordError(!password);
        setEmailError(!email);
        setNumberError(!number);
      } else {
        const response = await axios.post(
          'https://pos-appdev-api.vercel.app/api/register',
          {
            username,
            password,
            email,
            number,
            role,
          }
        );

        Alert.alert(
          'Success',
          'Successfully Logged in',
          [
            {
              text: 'Close',
              onPress: () => {
                setUsername('');
                setPassword('');
                setEmail('');
                setNumber('');
                navigation.navigate('Home');
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      Alert.alert(
        'Error',
        `Something went wrong with the submission. Please try again. Error message: ${err}`,
        [
          {
            text: 'Close',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };

  const NavigateRegister = () => {
    navigation.navigate('Login');
  };

  const [fontsLoaded] = useFonts({
    'PPGatwick-Bold': require('../../assets/fonts/PPGatwick-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.heading}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        placeholderTextColor="#fff"
        onChangeText={(text) => setUsername(text)}
      />
      {usernameError ? (
        <Text style={styles.errText}>Please input usename!</Text>
      ) : (
        ''
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        placeholderTextColor="#fff"
        onChangeText={(text) => setPassword(text)}
      />

      {numberError ? (
        <Text style={styles.errText}>Please input number!</Text>
      ) : (
        ''
      )}

      <TextInput
        style={styles.input}
        placeholder="Number"
        value={number}
        placeholderTextColor="#fff"
        onChangeText={(text) => setNumber(text)}
      />
      {passwordError ? (
        <Text style={styles.errText}>Please input password!</Text>
      ) : (
        ''
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor="#fff"
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? (
        <Text style={styles.errText}>Please input email!</Text>
      ) : (
        ''
      )}

      <View style={styles.pickerContainer}>
        <RNPickerSelect
          style={{
            inputIOS: {
              flex: 1,
              height: 50,
              borderColor: '#fff',
              borderRadius: 5,
              paddingLeft: 15,
              color: '#fff',
              // to ensure the text is never behind the icon
            },
            inputAndroid: {
              flex: 1,
              height: 50,
              paddingHorizontal: 10,
              borderColor: '#fff',
              borderRadius: 5,
              paddingLeft: 15,
              color: '#fff',
              // to ensure the text is never behind the icon
            },
          }}
          onValueChange={(value) => setRole(value)}
          items={data.map((item) => ({
            label: item.roleName,
            value: item.roleName,
          }))}
          value=""
        />
      </View>
      {roleError ? (
        <Text style={styles.errText}>Please select a role!</Text>
      ) : (
        ''
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={NavigateRegister}>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00412A',
  },
  link: {
    marginTop: 20,
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'PPGatwick-Bold',
    color: '#ffffff',
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    color: '#ffffff',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errText: {
    color: '#FF0000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '80%',
    height: 50,
  },
});

export default Register;
