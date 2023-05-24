import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { useGetCustomer } from './useGetCustomer';
import moment from 'moment';
const { width: windowWidth } = Dimensions.get('window');

const NumberCarousel = () => {
  const {
    isLoading: isCustomerLoading,
    data: customerData,
    error: customerError,
    refetch: customerRefetch,
  } = useGetCustomer();

  const todayS = new Date().toISOString().slice(0, 10);

  const salesToday = customerData
  ?.filter((customer) => customer.datecreated.includes(todayS))
  .reduce((total, customer) => {
    const sales = customer.product.reduce((total, picker) => total + picker.productPrice, 0);
    return total + sales;
  }, 0) || 0;


  const totalSales =
    customerData?.reduce((total, customer) => {
      const sales = customer.product.reduce(
        (total, picker) => total + picker.productPrice,
        0
      );
      return total + sales;
    }, 0) || 0;

  const totalLength = customerData?.length || 0;


  const numberCarousel = useRef(null);
 const formattedDate = moment().format('MMMM DD, YYYY');
  const renderItem = ({ item, index }) => {
    const handlePress = (index) => {};

    const backgroundColor =
      index === 0
        ? '#1a1a1a'
        : index === 1
        ? 'rgba(251, 225, 132, 0.83)'
        : '#1a1a1a';

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor }]}
        onPress={handlePress(index)}>
        {index === 0 ? (
          <>
            <View>
              <Text style={styles.h6}>Sales Today</Text>
              <Text style={styles.h2}>
                {isCustomerLoading ? '' : `₱${salesToday}`}
              </Text>
              <Text style={styles.h5}>{formattedDate}</Text>
            </View>
          </>
        ) : index === 1 ? (
          <>
            <View>
              <Text style={styles.h6}>Total Sales</Text>
              <Text style={styles.h2}>
                {isCustomerLoading ? '' : `₱${totalSales}`}
              </Text>
              <Text style={styles.h5}>{formattedDate}</Text>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text style={styles.h6}>Total Customer</Text>
              <Text style={styles.h2}>
                {isCustomerLoading ? '' : `${totalLength}`}
              </Text>
              <Text style={styles.h5}>{formattedDate}</Text>
            </View>
          </>
        )}

        <Image
          style={styles.image}
          source={require('../../assets/images/logo2.png')}
        />
      </TouchableOpacity>
    );
  };

  const data = [null, 0, null]; // create a new data array with length 3

  return (
    <Carousel
      style={styles.carousel}
      data={data}
      renderItem={renderItem}
      itemWidth={windowWidth * 0.8}
      separatorWidth={0}
      containerWidth={windowWidth}
      ref={numberCarousel}
      initialIndex={1} // set the initial index to 1 to make the second item the center item
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    height: 170,
    backgroundColor: '#00412A',
    paddingVertical: 15,
  },
  item: {
    position: 'relative',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    height: '100%',
    paddingHorizontal: 25,
    overflow: 'hidden',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'NeuMontreal-Bold',
    color: '#fff',
  },
  h5: {
    fontSize: 12,
    fontStyle: 'NeuMontreal-Regular',
    color: '#fff',
    marginTop: 20,
  },
  h6: {
    fontSize: 12,
    fontStyle: 'NeuMontreal-Regular',
    color: '#fff',
    marginBottom: 10,
  },
  image: {
    position: 'absolute',
    top: 20,
    right: -70,
    width: 200,
    height: '100%',
    resizeMode: 'contain',
  },
});

export default NumberCarousel;
