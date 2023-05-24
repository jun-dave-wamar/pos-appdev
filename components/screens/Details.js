import React, { useState } from 'react';
import axios from 'axios';
import { styles } from '../styles/styles';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import Header from '../parts/Header';
import Footer from '../parts/Footer';
import { useFonts } from 'expo-font';
import RNPickerSelect from 'react-native-picker-select';
import { useGetProduct } from '../hooks/useGetProduct';
import Sidebar from '../parts/Sidebar';
export default function Details() {
  const { data, isLoading, error } = useGetProduct();

  const [id, setID] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState(0);
  const [pickers, setPickers] = useState([]);
  const [price, setPrice] = useState(0);

  const [totalStock, setTotalStock] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState(0);

  const [fullNameError, setFullNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [pickerErrors, setPickerErrors] = useState(false);
  const [pickerZeroErrors, setPickerZeroErrors] = useState(false);
  const [pickerQuantity, setPickerQuantity] = useState(false);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => handleRemovePicker(index)}>
      <Text style={styles.tableCell5}>X</Text>
      <Text style={styles.tableCell6}>{item.productName}</Text>
      <Text style={styles.tableCell2}>{item.quantity}</Text>
      <Text style={styles.tableCell3}>{item.price}</Text>
    </TouchableOpacity>
  );


  const QuantityChange = (amount) => {
    if (selected != '') {
      if (amount > totalStock || quantity > totalStock) {
        Alert.alert(
          'Error',
          `The stock quantity is limited to ${totalStock}. Please add a sufficient quantity of stock to proceed.`,
          [
            {
              text: 'Close',
              onPress: () => {
                setQuantity(0);
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      } else {
        if (quantity >= 1) {
          if (amount == 1) {
            setQuantity(quantity + 1);
          } else if (amount == -1) {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          } else {
            if (quantity > 1) {
              setQuantity(amount);
            }
          }
        } else {
          Alert.alert(
            'Error',
            `The stock quantity is greater or equals than 1. Please try again`,
            [
              {
                text: 'Close',
                onPress: () => {
                  setQuantity(1);
                },
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
        }
      }
    }
  };
  const handleAddPicker = () => {
    if (selected != '') {
      const newPickedProduct = data.find(
        (item) => item.productName === selected
      );

      if (newPickedProduct.stock === 0) {
        Alert.alert(
          'Error',
          'The stock quantity is currently zero. Please add a sufficient quantity of stock to proceed.',
          [
            {
              text: 'Close',
              onPress: () => {
                setSelected('');
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      } else {
        const newPickedProductWithQuantity = {
          ...newPickedProduct,
          quantity: quantity,
          totalProductPrice: newPickedProduct.price * quantity,
        };
        const newPickers = [...pickers, newPickedProductWithQuantity];
        setPickers(newPickers);
        setTotalPrice(
          newPickers.reduce(
            (total, picker) => total + picker.price * picker.quantity,
            0
          )
        );
        setSelected('');
        setQuantity(0);
        setTotalStock(0);
        setPrice(0);
      }
    } else {
      Alert.alert(
        'Error',
        `Please add a item.`,
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

  const handleRemovePicker = (pickerIndex) => {
    const newPickers = [...pickers];
    newPickers.splice(pickerIndex, 1);
    setPickers(newPickers);
    setTotalPrice(
      newPickers.reduce((total, picker) => total + picker.price, 0)
    );
  };

  const handleProductChange = (value) => {
    if (value) {
      const newPickedProduct = data.find((item) => item.productName === value);

      if (newPickedProduct.stock == 0) {
        Alert.alert(
          'Error',
          'The stock quantity is currently zero. Please add a sufficient quantity of stock to proceed.',
          [
            {
              text: 'Close',
              onPress: () => {
                setSelected('');
                setQuantity(0);
                setTotalStock(0);
                setPrice(0);
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      } else {
        setSelected(value);
        setQuantity(1);
        setTotalStock(newPickedProduct.stock);
        setPrice(newPickedProduct.price);
      }
    }
  };

  const handleTextChange = (text) => {
    // Remove special characters and numbers using regex
    const filteredText = text.replace(/[^a-zA-Z ]/g, '');
    setFullName(filteredText);
  };

  const handleSubmit = async () => {
    try {
      setPickerZeroErrors(false);
      setFullNameError(false);
      setContactNumberError(false);
      setPickerErrors(false);
      setPickerQuantity(false);
      if (!fullName || !contactNumber) {
        setFullNameError(!fullName);
        setContactNumberError(!contactNumber);
        return;
      }

      let hasQuantityError = false;
      let hasNoQuantityError = false;

      pickers.forEach((picker) => {
        if (picker.prevQuantity === 0) {
          hasQuantityError = true;
        } else if (picker.quantity === 0) {
          hasNoQuantityError = true;
        }
      });

      if (hasQuantityError) {
        setPickerZeroErrors(true);
        return;
      } else if (hasNoQuantityError) {
        setPickerQuantity(true);
        return;
      }

      const response = await axios.post(
        'https://pos-appdev-api.vercel.app/api/customer',
        {
          name: fullName,
          number: contactNumber,
          product: pickers,
        }
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          'Success',
          'Successfully data added',
          [
            {
              text: 'Close',
              onPress: () => {
                setFullName('');
                setContactNumber('');
                setPickers([]);
                setTotalStock(0);
                setTotalPrice(0);
                setPickerZeroErrors(false);
                setFullNameError(false);
                setContactNumberError(false);
                setPickerErrors(false);
                setPickerQuantity(false);
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      const errorMsg = err.response?.data?.msg || err.message;
      const statusCode = err.response?.status;
      Alert.alert(
        'Error',
        `Something went wrong with the submission. Please try again. Status code: ${statusCode}. Error message: ${errorMsg}`,
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
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!fontsLoaded) {
    return null;
  }

  const route = 'Details';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Sidebar />
      <Header route={route} />

      <View style={styles.mainInfo}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Add Customer</Text>
          <View>
            {fullNameError ? (
              <Text style={styles.errText}>Name is Required!</Text>
            ) : (
              ''
            )}
            <TextInput
              style={styles.detailInput}
              placeholderTextColor="gray"
              placeholder="Name"
              value={fullName}
              onChangeText={handleTextChange}
            />

            {contactNumberError ? (
              <Text style={styles.errText}>Contact Number is Required!</Text>
            ) : (
              ''
            )}
            <TextInput
              style={styles.detailInput}
              placeholderTextColor="gray"
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={setContactNumber}
            />

            {pickerErrors ? (
              <Text style={styles.errText}>Please select a product(s)</Text>
            ) : (
              ''
            )}
            {pickerZeroErrors ? (
              <Text style={styles.errText}>
                No stock available. Please add more or contact admin.
              </Text>
            ) : (
              ''
            )}
            {pickerQuantity ? (
              <Text style={styles.errText}>
                No quantity added. Please add a quantity.
              </Text>
            ) : (
              ''
            )}

            <View style={styles.pickerContainer}>
              <RNPickerSelect
                style={{
                  inputIOS: {
                    flex: 1,
                    height: 50,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    paddingLeft: 15,
                    // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    flex: 1,
                    height: 50,
                    paddingHorizontal: 10,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    paddingLeft: 15,
                    // to ensure the text is never behind the icon
                  },
                }}
                onValueChange={(value) => handleProductChange(value)}
                items={data.map((item) => ({
                  label: item.productName,
                  value: item.productName,
                }))}
                value={selected}
              />
            </View>

            <View style={styles.column2}>
              <View style={styles.buttonSection}>
                <Text style={styles.marginTop}>Total Price: {price}</Text>
              </View>
              <View style={styles.buttonSection}>
                <Text style={styles.marginTop}>Total Stock: {totalStock}</Text>
              </View>
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => QuantityChange(-1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={(value) => {
                  QuantityChange(value);
                }}
              />
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => QuantityChange(1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleAddPicker()}>
              <Text style={styles.submitButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={pickers?.reverse()}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            ListHeaderComponent={
              <View style={styles.tableContainer2}>
                <Text style={styles.tableHeader5}></Text>
                <Text style={styles.tableHeader6}>Product Name</Text>
                <Text style={styles.tableHeader2}>Quantity</Text>
                <Text style={styles.tableHeader3}>Price</Text>
              </View>
            }
          />

          <Text style={styles.marginTop}>Total Price: {totalPrice}</Text>
          <TouchableOpacity
            style={pickers[0] ? styles.submitButton : styles.disabledButton}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Footer route={route} />
    </SafeAreaView>
  );
}
