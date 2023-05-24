import React, { useState } from 'react';
import axios from 'axios';
import { styles } from '../styles/styles';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../parts/Header';
import Footer from '../parts/Footer';
import { useFonts } from 'expo-font';
import {useGetUser} from '../hooks/useGetUser';
import Sidebar from '../parts/Sidebar';

export default function User() {
  const { data, isLoading, isError, refetch } = useGetUser();
  const roles = [{role: 'admin', label:'Admin'}, {role: 'cashier', label:'Cashier'}];
  const handleRefresh = () => {
    refetch();
  };

  const [id, setID] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  
  const [usernameEdit, setUsernameEdit] = useState('');
  const [passwordEdit, setPasswordEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [roleEdit, setRoleEdit] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => {
        itemFind(item._id, index);
      }}>
      <Text style={styles.tableCell1}>{item.email}</Text>
      <Text style={styles.tableCell2}>{item.username}</Text>
      <Text style={styles.tableCell3}>{item.role}</Text>
    </TouchableOpacity>
  );

  const itemFind = (id, index) => {
    const item = data.find((user) => user._id === id);

    if (item) {
      // Do something with the found item
      setShowModalEdit(true);

      setID(item._id);
      setUsernameEdit(item.username);
    
      setEmailEdit(item.email);
      setRoleEdit(item.role);


    } else {
      // Item not found
      console.log('Item not found');
    }
  };

  const handleSubmit = async () => {
    try {
      setUsernameError(false);
      setPasswordError(false);
      setEmailError(false);
      setRoleError(false);

      if (!username || !password || !email || !role) {
      setUsernameError(!username);
      setPasswordError(!password);
      setEmailError(!email);
      setRoleError(!role);

      } else {


        const response = await axios.post(
          'https://pos-appdev-api.vercel.app/api/register',
          {
            username,
            password,
            email,
            role
          }
        );

        handleRefresh();
        Alert.alert(
          'Success',
          'Successfully user added',
          [
            {
              text: 'Close',
              onPress: () => {
                setShowModal(false);
                setUsername('');
                setPassword('');
                setEmail('');
                setRole('');
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      setUsernameError(false);
      setPasswordError(false);
      setEmailError(false);
      setRoleError(false);

      if (!usernameEdit || !passwordEdit || !emailEdit || !roleEdit) {
        setUsernameError(!usernameEdit);
        setPasswordError(!passwordEdit);
        setEmailError(!emailEdit);
        setRoleError(!roleEdit);
      } else {
        
       
        const response = await axios.post(
          'https://pos-appdev-api.vercel.app/api/update-user',
          {
            id,
            username: usernameEdit,
            password: passwordEdit,
            email: emailEdit,
            role: roleEdit
          }
        );

       
        Alert.alert(
          'Success',
          'Successfully user updated',
          [
            {
              text: 'Close',
              onPress: () => {
                 handleRefresh();
                setShowModalEdit(false);
                setUsernameEdit('');
                setPasswordEdit('');
                setEmailEdit('');
                setRoleEdit('');


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

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        'https://pos-appdev-api.vercel.app/api/remove-user',
        {id}
      );

      if (response.status == 200) {
      
        Alert.alert(
          'Success',
          'Successfully user removed',
          [
            {
              text: 'Close',
              onPress: () => {
                  handleRefresh();
                setShowModalEdit(false);
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
  const [fontsLoaded] = useFonts({
    'PPGatwick-Bold': require('../../assets/fonts/PPGatwick-Bold.otf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  const route = 'User';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Sidebar />
      <Header route={route} />

      <View style={styles.mainInfo}>
    <Text style={styles.heading}>Add Users</Text>
        {isError ? (
          <Text>Error fetching data</Text>
        ) : (
          <FlatList
            data={data?.reverse()}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            ListHeaderComponent={
              <View style={styles.tableContainer}>
                <Text style={styles.tableHeader1}>Email</Text>
                <Text style={styles.tableHeader2}>Username</Text>
                <Text style={styles.tableHeader3}>Role</Text>
              </View>
            }
            ListFooterComponent={
              <>
                {isLoading && <Text>Loading...</Text>}
                {isError && <Text>Error fetching Users</Text>}
              </>
            }
          />
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setShowModal(true)}>
          <Text style={styles.submitButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={showModal}>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainInfo}>

          
            <View style={styles.headerModal}>
              <>
                <Text style={styles.columnText}>Add User</Text>
              </>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}>
                <Text style={styles.submitButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <View>
             <Text style={styles.headingModal}>Username</Text>
              {usernameError ? (
                <Text style={styles.errText}>Username is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />

              <Text style={styles.headingModal}>Password</Text>

              {passwordError ? (
                <Text style={styles.errText}>Password is Required!</Text>
              ) : (
                ''
              )}
                <TextInput
                  style={styles.detailInput}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  placeholderTextColor="gray"
                  onChangeText={setPassword}
                />
                
              <Text style={styles.headingModal}>Email</Text>
              {emailError ? (
                <Text style={styles.errText}>Email is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
                <Text style={styles.headingModal}>Roles</Text>
                  {roleError ? (
                <Text style={styles.errText}>Role is Required!</Text>
              ) : (
                ''
              )}

              <View style={styles.pickerContainer}>
               <RNPickerSelect
                  style={{
                    inputIOS: {
                        height: 50,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingLeft: 15,
                    },
                    inputAndroid: {
                        height: 50,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingLeft: 15,
                    },
                  }}
                  onValueChange={(value) => setRole(value)}
                  items={roles.map((item) => ({
                      label: item.label,
                      value: item.role,
                    }))}
                  value={role}// <-- use roleEdit instead of role
                />
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal animationType="slide" visible={showModalEdit}>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainInfo}>
            <View style={styles.headerModal}>
              <>
                <Text style={styles.columnText}>Edit User</Text>
              </>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModalEdit(false)}>
                <Text style={styles.submitButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.headingModal}>Username</Text>
              {usernameError ? (
                <Text style={styles.errText}>Username name is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Product Name"
                value={usernameEdit}
                onChangeText={setUsernameEdit}
              />
              <Text style={styles.headingModal}>Password</Text>
              {passwordError ? (
                <Text style={styles.errText}>Password is Required!</Text>
              ) : (
                ''
              )}
               <TextInput
                  style={styles.detailInput}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={passwordEdit}
                 placeholderTextColor="gray"
                  onChangeText={(text) => setPasswordEdit(text)}
                />
              <Text style={styles.headingModal}>Email</Text>
              {emailError ? (
                <Text style={styles.errText}>Email is Required!</Text>

              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Email"
                keyboardType="phone-pad"
                value={emailEdit}
                onChangeText={setEmailEdit}
              />


               <Text style={styles.headingModal}>Role</Text>
              {roleError ? (
                <Text style={styles.errText}>Email is Required!</Text>
              ) : (
                ''
              )}

                <View style={styles.pickerContainer}>
             <RNPickerSelect
                    style={{
                      inputIOS: {
                        height: 50,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingLeft: 15,
                      },
                      inputAndroid: {
                        height: 50,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingLeft: 15,
                      },
                    }}
                    onValueChange={(value) => setRoleEdit(value)}
                    items={roles.map((item) => ({
                      label: item.label,
                      value: item.role,
                    }))}
                    value={roleEdit} // <-- use roleEdit instead of "Admin"
                  />
                  </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleUpdate}>
                <Text style={styles.submitButtonText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}>
                <Text style={styles.submitButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Footer route={route} />
    </SafeAreaView>
  );
}
