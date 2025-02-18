import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/user/orders', {
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
    } catch (err) {
      console.log('get Order err --- ', err);
    }
  };
  console.log('Order', data);

  const renderItem_first = ({ item }) => (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => navigation.navigate('OrdersDetails',{
        order_id:item.id,
      })}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../../Icons/oderImage.png')} />
        <View style={{ marginHorizontal: 5 }}>
          <Text style={styles.text_2}>{item.service_type}</Text>
          <Text style={styles.text_1}>
           {item.user_description}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../Icons/starOder.png')} />
            <Image source={require('../../Icons/starOder.png')} />
            <Image source={require('../../Icons/starOder.png')} />
            <Image source={require('../../Icons/starOder.png')} />
            <Image source={require('../../Icons/starOder.png')} />
          </View>

          <Text style={styles.text_3}>Rate this service</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Image source={require('../../Icons/rightArrowColor.png')} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      <View style={styles.searchBar}>
        <Image
          source={require('../../Icons/searchIcon.png')}
          style={{ marginVertical: 10 }}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#00000066"
          style={styles.searchInput}
        />
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem_first}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};
export default OrderScreen;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topHeader: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  searchBar: {
    width: 'auto',
    height: 40,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#FB923C',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  searchInput: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00000066',
    width: '90%',
    lineHeight: 14.4,
  },
  heading1: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1C1B1F',
  },
  heading2: {
    fontSize: 12,
    fontWeight: 400,
    color: '#FB923C',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#FB923C',
  },
  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#A09CAB',
    paddingBottom: 10,
    marginVertical: 10,
  },
  text_1: {
    fontSize: 10,
    fontWeight: 500,
    color: '#A09CAB',
    lineHeight: 16,
  },
  text_2: {
    fontSize: 12,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 14.4,
  },
  text_3: {
    fontSize: 9,
    fontWeight: 400,
    color: '#1C1B1F',
  },
});


