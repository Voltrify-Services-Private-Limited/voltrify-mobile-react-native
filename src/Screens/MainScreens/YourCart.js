import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourCart = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [orderId, setOrderId] = useState([]);

  useEffect(() => {
    getAllOrder();
    console.log("cart Id",orderId);

  }, []);

  const getAllOrder = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/user/cart', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resData = await response.json();
      setData(resData.data);
      await AsyncStorage.setItem("cart_id", data[0].id);
    } catch (err) {
      console.log('get Order err --- ', err);
    }
  };


  const deleteCart = async (id) => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    console.log(id);
    try {
      const response = await fetch(`http://api.voltrify.in//user/cart/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
      });
      setData(data.filter(item => item.id !== id));
      if (response.ok) {
        console.log('Success', 'Item deleted successfully');
      } else {
        console.log('Error', 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Error', 'An error occurred while deleting the item');
    }

  };



  const renderItem_first = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.leftSide}>
        <Image source={require('../../Icons/cartImage1.png')} />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.listTextHeading}>AC Service & Repair</Text>
          <Text>1 {item.id} </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteCart(item.id)} style={{justifyContent:'center'}}>
      <View style={{ justifyContent: 'center' }}>
        <Image source={require('../../Icons/recylebin.png')} />
      </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Cart</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem_first}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.lineText}>
        . Power Saver AC Service with Cleaning
      </Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FB923C' }]} onPress={() => navigation.navigate('PaymentScreen')}>
          <Text style={[styles.buttonText, { color: '#ffffff' }]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  topHeader: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    backgroundColor: '#FB923C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 40,
    marginHorizontal: 20,
    color: '#FB923C',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#A09CAB',
    marginTop: 20,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listTextHeading: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1C1B1F',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    marginVertical: 20,
  },
  button: {
    width: 190,
    height: 40,
    borderWidth: 1,
    borderColor: '#FB923C',
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
  },
  lineText: {
    fontSize: 4,
    fontWeight: 400,
    marginVertical: 4,
  }
});

export default YourCart;
