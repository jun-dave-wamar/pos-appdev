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
} from 'react-native';
import Header from '../parts/Header';
import Footer from '../parts/Footer';
import { useFonts } from 'expo-font';
import { useGetProduct } from '../hooks/useGetProduct';
import Sidebar from '../parts/Sidebar';
export default function Inventory() {
  const { data, isLoading, isError, refetch } = useGetProduct();

  const handleRefresh = () => {
    refetch();
  };

  const [productName, setProductName] = useState('');
  const [stocks, setStocks] = useState(0);
  const [price, setPrice] = useState(0);

  const [id, setID] = useState('');
  const [productId, setProductId] = useState('');
  const [productNameEdit, setProductNameEdit] = useState('');
  const [stocksEdit, setStocksEdit] = useState(0);
  const [priceEdit, setPriceEdit] = useState(0);

  const [idError, setIDErrors] = useState(false);
  const [productNameError, setProductNameError] = useState(false);
  const [stocksError, setStocksError] = useState(false);
  const [priceErrors, setPriceErrors] = useState(false);

  const [productNameErrorEdit, setProductNameErrorEdit] = useState(false);
  const [stocksErrorEdit, setStocksErrorEdit] = useState(false);
  const [priceErrorsEdit, setPriceErrorsEdit] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

    const handleTextChange = (text) => {
    // Remove special characters and numbers using regex
    const filteredText = text.replace(/[^a-zA-Z ]/g, '');
    setProductName(filteredText);
  };
   const handleTextChangeEdit = (text) => {
    // Remove special characters and numbers using regex
    const filteredText = text.replace(/[^a-zA-Z ]/g, '');
    setProductNameEdit(filteredText);
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => {
        itemFind(item._id, index);
      }}>
      <Text style={styles.tableCell1}>{item.productName}</Text>
      <Text style={styles.tableCell2}>{item.price}</Text>
      <Text style={styles.tableCell3}>{item.stock}</Text>
    </TouchableOpacity>
  );

  const itemFind = (id, index) => {
    const item = data.find((product) => product._id === id);

    if (item) {
      // Do something with the found item
      setShowModalEdit(true);

      setProductNameEdit('');
      setStocksEdit(0);
      setPriceEdit(0);

      setID(item._id);
      setProductId(item._id);
      setProductNameEdit(item.productName);
      setStocksEdit(item.stock.toString());
      setPriceEdit(item.price.toString());
    } else {
      // Item not found
      console.log('Item not found');
    }
  };

  const handleSubmit = async () => {
    try {
      setProductNameError(false);
      setStocksError(false);
      setPriceErrors(false);
      setProductNameErrorEdit(false);
      setStocksErrorEdit(false);
      setPriceErrorsEdit(false);

      if (!productName || !stocks || !price) {
        setProductNameError(!productName);
        setStocksError(!stocks);
        setPriceErrors(!price);
      } else {
        const dataToSend = {
          productName,
          price,
          stock: stocks,
        };

        const response = await axios.post(
          'https://pos-appdev-api.vercel.app/api/products',
          dataToSend
        );

        handleRefresh();
        Alert.alert(
          'Success',
          'Successfully data added',
          [
            {
              text: 'Close',
              onPress: () => {
                setShowModal(false);
                setProductName('');
                setStocks(0);
                setPrice(0);
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
      setProductNameErrorEdit(false);
      setStocksErrorEdit(false);
      setPriceErrorsEdit(false);

      if (!productNameEdit || !priceEdit || !stocksEdit) {
        setProductNameEdit(!productNameEdit);
        setPriceErrorsEdit(!priceEdit);
        setStocksEdit(!stocksEdit);
      } else {
        const dataToSend = {
          id,
          productName: productNameEdit,
          price: priceEdit,
          stock: stocksEdit,
        };

        const response = await axios.post(
          'https://pos-appdev-api.vercel.app/api/update-products',
          dataToSend
        );
        handleRefresh();
        console.log(response);
        Alert.alert(
          'Success',
          'Successfully data updated',
          [
            {
              text: 'Close',
              onPress: () => {
                setShowModalEdit(false);
                setProductNameEdit('');
                setPriceErrorsEdit(0);
                setStocksEdit(0);
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
        'https://pos-appdev-api.vercel.app/api/remove-products',
        { id: productId }
      );

      if (response.status == 200) {
        handleRefresh();
        Alert.alert(
          'Success',
          'Successfully data removed',
          [
            {
              text: 'Close',
              onPress: () => {
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

  const route = 'Inventory';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Sidebar />
      <Header route={route} />

      <View style={styles.mainInfo}>
      <Text style={styles.heading}>Inventory</Text>
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
                <Text style={styles.tableHeader1}>Product Name</Text>
                <Text style={styles.tableHeader2}>Price</Text>
                <Text style={styles.tableHeader3}>Stocks</Text>
              </View>
            }
            ListFooterComponent={
              <>
                {isLoading && <Text>Loading...</Text>}
                {isError && <Text>Error fetching Inventory</Text>}
              </>
            }
          />
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setShowModal(true)}>
          <Text style={styles.submitButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={showModal}>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainInfo}>

          
            <View style={styles.headerModal}>
              <>
                <Text style={styles.columnText}>Add Product</Text>
              </>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}>
                <Text style={styles.submitButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headingModal}>Product</Text>
            <View>
              {productNameError ? (
                <Text style={styles.errText}>Product name is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Product Name"
                value={productName}
              onChangeText={(value)=> {handleTextChange(value)}}
              />

              <Text style={styles.headingModal}>Stocks</Text>
              {stocksError ? (
                <Text style={styles.errText}>Stock is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Stocks"
                keyboardType="phone-pad"
                value={stocks}
                onChangeText={setStocks}
              />

              <Text style={styles.headingModal}>Price</Text>
              {priceErrors ? (
                <Text style={styles.errText}>Price is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Price"
                keyboardType="phone-pad"
                value={price}
                onChangeText={setPrice}
              />

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
                <Text style={styles.columnText}>Edit Product</Text>
              </>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModalEdit(false)}>
                <Text style={styles.submitButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.headingModal}>Product</Text>
              {productNameErrorEdit ? (
                <Text style={styles.errText}>Product name is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Product Name"
                value={productNameEdit}
                onChangeText={(value)=> {handleTextChangeEdit(value)}}
              />
              <Text style={styles.headingModal}>Stocks</Text>
              {stocksErrorEdit ? (
                <Text style={styles.errText}>Stock is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Stocks"
                keyboardType="phone-pad"
                value={stocksEdit}
                onChangeText={setStocksEdit}
              />
              <Text style={styles.headingModal}>Price</Text>
              {priceErrorsEdit ? (
                <Text style={styles.errText}>Price is Required!</Text>
              ) : (
                ''
              )}
              <TextInput
                style={styles.detailInput}
                placeholderTextColor="gray"
                placeholder="Price"
                keyboardType="phone-pad"
                value={priceEdit}
                onChangeText={setPriceEdit}
              />

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
