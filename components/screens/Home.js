import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { useFonts } from 'expo-font';
import { styles } from '../styles/styles';
import RNPickerSelect from 'react-native-picker-select';
import { useGetProduct } from '../hooks/useGetProduct';
import moment from 'moment';
import { useGetCustomer } from '../hooks/useGetCustomer';
import { useStore } from '../hooks/authStore';
import axios from 'axios';
import Header from '../parts/Header';
import Footer from '../parts/Footer';
import Sidebar from '../parts/Sidebar';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import NumberCarousel  from '../hooks/NumberCarousel';


export default function Home() {
  const flatListRef = useRef(null);
  const role = useStore((state) => state.role);
  // Use the useGetProduct hook to fetch and store product data
  const {
    isLoading: isProductLoading,
    data: productData,
    error: productError,
  } = useGetProduct();

  const {
    isLoading: isCustomerLoading,
    data: customerData,
    error: customerError,
    refetch: customerRefetch,
  } = useGetCustomer();

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    if (contentOffset.y === 0) {
      customerRefetch();
    }
  };

  const handleRefresh = () => {
    customerRefetch();
  };

  const [showModal, setShowModal] = useState(false);

  const [id, setID] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState(0);
  const [pickers, setPickers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState('');


  const [quantity, setQuantity] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [fullNameError, setFullNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [pickerErrors, setPickerErrors] = useState(false);


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
        if (amount == 1) {
          setQuantity(quantity + 1);
        } else if (amount == -1) {
          setQuantity(quantity - 1);
        } else {
          setQuantity(amount);
        }
      }
    }
  };
  const [fontsLoaded] = useFonts({
    'PPGatwick-Bold': require('../../assets/fonts/PPGatwick-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const route = 'Home';
  const renderItemProducts = ({ item, index }) => (
    <TouchableOpacity
      style={styles.tableRow}
      onPress={() => handleRemovePicker(index)}>
      <Text style={styles.tableCell5}>X</Text>
      <Text style={styles.tableCell6}>
        {item.selectedProduct || item.productName}
      </Text>
      <Text style={styles.tableCell2}>{item.quantity}</Text>
      <Text style={styles.tableCell3}>
        {item.productPrice || item.totalProductPrice}
      </Text>
    </TouchableOpacity>
  );

  const showDetails = (value) => {
    setProducts(productData);
    const selectedCustomer = customerData.find(
      (customers) => customers.name === value
    );
    setID(selectedCustomer._id);
    setFullName(selectedCustomer.name);
    setContactNumber(selectedCustomer.number);
    setPickers(selectedCustomer.product);

    setTotalPrice(
      selectedCustomer.product.reduce(
        (total, picker) => total + picker.productPrice,
        0
      )
    );
    setShowModal(true);
  };

  const handleProductChange = (value) => {
    if (value) {
      const newPickedProduct = productData.find(
        (item) => item.productName === value
      );

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

  const handleRemovePicker = (pickerIndex) => {
    const newPickers = [...pickers];
    newPickers.splice(pickerIndex, 1);
    setPickers(newPickers);
    setTotalPrice(
      newPickers.reduce((total, picker) => total + picker.price, 0)
    );
  };

  const handleAddPicker = () => {
    if (selected != '') {
      const newPickedProduct = productData.find(
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
                setQuantity(0);
                setPrice(0);
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      } else {
        const newQuantity = parseInt(quantity);
        const newPrice = parseFloat(newPickedProduct.price);

        if (isNaN(newQuantity) || isNaN(newPrice)) {
          // Handle NaN values
        } else {
          const newPickedProductWithQuantity = {
            ...newPickedProduct,
            quantity: newQuantity,
            productPrice: newPrice * newQuantity,
            totalProductPrice: newPrice * newQuantity,
          };

          const newPickers = [...pickers, newPickedProductWithQuantity];
          setPickers(newPickers);

          const totalProductPrice = newPickers.reduce((total, picker) => {
            if (isNaN(picker.productPrice)) {
              console.log('NaN value' + picker.productPrice);
              return total;
            } else {
              return total + parseFloat(picker.productPrice);
            }
          }, 0);

          if (isNaN(totalProductPrice)) {
            console.log('NaN value');
          } else {
            setTotalPrice(totalProductPrice);
          }

          setSelected('');
          setQuantity(0);
          setTotalStock(0);
          setPrice(0);
        }
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

  const handleSubmit = async () => {
    try {
      setFullNameError(false);
      setContactNumberError(false);
      setPickerErrors(false);

      if (!fullName || !contactNumber) {
        setFullNameError(!fullName);
        setContactNumberError(!contactNumber);
      } else {
        const dataToSend = {
          id: id,
          name: fullName,
          number: contactNumber,
          product: pickers,
        };

        const response = await axios.post(
          'https://pos-appdev-api.vercel.app/api/update-customer',
          {
            id,
            name: fullName,
            number: contactNumber,
            product: pickers,
          }
        );

        Alert.alert(
          'Success',
          'Successfully data added',
          [
            {
              text: 'Close',
              onPress: () => {
                handleRefresh();
                setFullName('');
                setContactNumber();
                setShowModal(false);
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
            onPress: () => {
              setShowModal(false);
            },
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleRemove = async () => {
    try {
      const response = await axios.post(
        'https://pos-appdev-api.vercel.app/api/remove-customer',
        { id }
      );

      if (response.status === 200) {
        Alert.alert(
          'Success',
          'Successfully data removed',
          [
            {
              text: 'Close',
              onPress: () => {
                handleRefresh();
                setShowModal(false);
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
            onPress: () => {
              setShowModal(false);
            },
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };
  const renderItem = ({ item, index }) => {
    const isEven = index % 2 === 0;
    const totalPurchased = item.product.reduce(
      (acc, pPrice) => acc + pPrice.productPrice,
      0
    );

    return (
      <View style={[styles.mainSections, isEven && styles.evenMainSections]}>
        <View style={styles.heightFull}>
          <View style={styles.mainBottom}>
            {item.product && (
              <View>
                <Text style={styles.mainHeading}>₱{totalPurchased}</Text>
                <Text style={styles.mainText}>Total Purchased:</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => showDetails(item.name)}>
              <Image source={require('../../assets/images/btn-right.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.mainTop}>
            <Text style={styles.mainHeading}>{item.name.substring(0, 7)}</Text>
            <Text style={styles.mainText}>{item.number}</Text>
          </View>
        </View>
      </View>
    );
  };

  const handlePrint = async () => {
    try {
      
      // const formattedDate = moment().format('MMMM DD, YYYY');
      const formattedDate = "May 23, 2023";
      const htmlContent = `
      

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title> Order confirmation </title>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width; initial-scale=1.0;" />
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
    body { margin: 0; padding: 0; background: #e1e1e1; }
    div, p, a, li, td { -webkit-text-size-adjust: none; }
    .ReadMsgBody { width: 100%; background-color: #ffffff; }
    .ExternalClass { width: 100%; background-color: #ffffff; }
    body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    html { width: 100%; }
    p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
    .visibleMobile { display: none; }
    .hiddenMobile { display: block; }

    @media only screen and (max-width: 600px) {
    body { width: auto !important; }
    table[class=fullTable] { width: 96% !important; clear: both; }
    table[class=fullPadding] { width: 85% !important; clear: both; }
    table[class=col] { width: 45% !important; }
    .erase { display: none; }
    }

    @media only screen and (max-width: 420px) {
    table[class=fullTable] { width: 100% !important; clear: both; }
    table[class=fullPadding] { width: 85% !important; clear: both; }
    table[class=col] { width: 100% !important; clear: both; }
    table[class=col] td { text-align: left !important; }
    .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
    .visibleMobile { display: block !important; }
    .hiddenMobile { display: none !important; }
    }
  </style>


  <!-- Header -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tr>
      <td height="20"></td>
    </tr>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
          <tr class="hiddenMobile">
            <td height="40"></td>
          </tr>
          <tr class="visibleMobile">
            <td height="30"></td>
          </tr>

          <tr>
            <td>
              <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                <tbody>
                  <tr>
                    <td>
                      <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                        <tbody>
                          <tr>
                            <td align="left"> <img src="https://i.ibb.co/zHL0nf7/starbucks.png" width="100" height="69" alt="logo" border="0" /></td>
                          </tr>
                          <tr class="hiddenMobile">
                            <td height="40"></td>
                          </tr>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                              Hello, ${fullName}.
                              <br> Thank you for shopping from our store and for your order.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                        <tbody>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td height="5"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 21px; color: #00623B; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                              Receipt
                            </td>
                          </tr>
                          <tr>
                          <tr class="hiddenMobile">
                            <td height="50"></td>
                          </tr>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                              <small>ORDER ID: ${id} </small> <br />
                              <small>DATE ${formattedDate}</small> 
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- /Header -->
  <!-- Order Details -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                          Product
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                          Price
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                          Quantity
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                          Subtotal
                        </th>
                      </tr>
                      <tr>
                        <td height="1" style="background: #bebebe;" colspan="4"></td>
                      </tr>
                      <tr>
                        <td height="10" colspan="4"></td>
                      </tr>
                      ${pickers
                          .map(
                            (picker, index) => `
                          <tr>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #04352B;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article">${picker.selectedProduct}</td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="center">${picker.productPrice}</td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="center">${picker.quantity}</td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">${picker.productPrice * picker.quantity}</td>
                          </tr>
                        `
                          )
                          .join('')}
                    
                      <tr>
                        <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="20"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Order Details -->
  <!-- Total -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
                <td>

                  <!-- Table Total -->
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                          Subtotal
                        </td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                          ${pickers.reduce(
                              (acc, cur) => acc + cur.productPrice * cur.quantity,
                              0
                            )}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                          <strong>Grand Total (Incl.Tax)</strong>
                        </td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                          <strong>${pickers.reduce(
                              (acc, cur) => acc + cur.productPrice * cur.quantity,
                              0
                            )}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- /Table Total -->

                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Total -->
  <!-- Information -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">

                            <tbody>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>BILLING INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  Pantaleon<br> del Rosario<br> Street,<br> Cebu City, Cebu<br> T: (032) 238 2380
                                </td>
                              </tr>
                            </tbody>
                          </table>


                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                            <tbody>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>PAYMENT METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  Credit Card<br> Credit Card Type: Visa<br> 
                                  <a href="#" style="color:#b0b0b0;">Right of Withdrawal</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                            <tbody>
                              <tr class="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>CUSTOMER INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  ${fullName} <br>Pantaleon del <br>Rosario Street,<br> Cebu City, Cebu<br> T: ${contactNumber}
                                </td>
                              </tr>
                            </tbody>
                          </table>


                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                            <tbody>
                              <tr class="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>SHIPPING METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  ACT Express Delivery
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="30"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Information -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">

    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
          <tr>
            <td>
              <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                <tbody>
                  <tr>
                    <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                      Have a nice day.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr class="spacer">
            <td height="50"></td>
          </tr>

        </table>
      </td>
    </tr>
    <tr>
      <td height="20"></td>
    </tr>
  </table>
      `;
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      Sharing.shareAsync(uri);
    } catch (error) {
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
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Sidebar />
        <StatusBar barStyle="light-content" />

        <Header route={route} />

           <NumberCarousel />


        <View style={styles.mainInfo}>
          <View style={styles.boxInfo}></View>
          <FlatList
            ref={flatListRef}
            data={customerData?.reverse()}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ListHeaderComponent={
              <>
              <View style={styles.column2}>

              <View style={styles.buttonSection}> 
                <Text style={styles.heading}>Customer History</Text>
              </View>
              <View style={styles.buttonSection}> 
               <TouchableOpacity style={{paddingRight: 5}}  onPress={handleRefresh}>
                 <Text style={{color: '#9A9C9D', textAlign:'right'}}>Refresh</Text>
              </TouchableOpacity>
              </View>

                 </View>
              </>
            }
            ListFooterComponent={
              <>
                {isCustomerLoading && <Text>Loading...</Text>}
                {customerError && <Text>Error fetching customers</Text>}
              </>
            }
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 30 }}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={10}
          />

     
        </View>
        <Modal animationType="slide" visible={showModal}>
          <ScrollView
            contentContainerStyle={{ paddingTop: 20, marginHorizontal: 5 }}>
            <View style={styles.mainInfo}>
              <View style={styles.headerModal}>
                <>
                  <Text style={styles.columnText}>View Customer</Text>
                </>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setShowModal(false);
                    setProducts([]);
                    setPickers([]);
                  }}>
                  <Text style={styles.submitButtonText}>X</Text>
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.headingModal}>Name</Text>
                {fullNameError ? (
                  <Text style={styles.errText}>Full name is Required!</Text>
                ) : (
                  ''
                )}
                <TextInput
                  style={styles.detailInput}
                  placeholderTextColor="gray"
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                />

                <Text style={styles.headingModal}>Contact Number</Text>
                {contactNumberError ? (
                  <Text style={styles.errText}>
                    Contact Number is Required!
                  </Text>
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

                <Text style={styles.headingModal}>Products</Text>
                {pickerErrors ? (
                  <Text style={styles.errText}>Please select a product(s)</Text>
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
                    items={products.map((item) => ({
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
                    <Text style={styles.marginTop}>
                      Total Stock: {totalStock}
                    </Text>
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

                <FlatList
                  data={pickers?.reverse()}
                  renderItem={renderItemProducts}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  ListHeaderComponent={
                    <View style={styles.tableContainer2}>
                      <Text style={styles.tableHeader5}></Text>
                      <Text style={styles.tableHeader6}>Product Name</Text>
                      <Text style={styles.tableHeader2}>Quantity</Text>
                      <Text style={styles.tableHeader3}>Total Price</Text>
                    </View>
                  }
                />

                <Text style={styles.marginTop}>Total Price: {totalPrice}</Text>
                {role === 'admin' ? (
                  <>
                    <View style={styles.column2}>
                      <View style={styles.buttonSection}>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={handleRemove}>
                          <Text style={styles.submitButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.buttonSection}>
                        <TouchableOpacity
                          style={styles.submitButton}
                          onPress={handleAddPicker}>
                          <Text style={styles.submitButtonText}>
                            Add Product
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleAddPicker}>
                    <Text style={styles.submitButtonText}>Add Product</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.column2}>
                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handlePrint}>
                      <Text style={styles.submitButtonText}>Print</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      style={
                        pickers[0] ? styles.submitButton : styles.disabledButton
                      }
                      onPress={handleSubmit}>
                      <Text style={styles.submitButtonText}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <Footer route={route} />
      </SafeAreaView>
    </View>
  );
}
