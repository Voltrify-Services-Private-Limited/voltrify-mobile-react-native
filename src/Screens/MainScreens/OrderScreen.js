import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]); // All orders
  const [filteredData, setFilteredData] = useState([]); // Filtered orders based on search query
  const [loading, setLoading] = useState(true); // Loading state for fetching orders
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

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
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resData = await response.json();
      setData(resData.data);
      console.log(resData.data);
      setFilteredData(resData.data); // Initially show all orders
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.log('get Order err --- ', err);
      setError(err.message);
      setLoading(false); // Ensure loading is stopped if there's an error
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter data when there is a search query
    if (query === '') {
      setFilteredData(data); // If query is empty, show all orders
    } else {
      const filtered = data.filter((order) => {
        // Safely handle null/undefined values by providing a fallback (empty string)
        const serviceTypeMatch = (order.service_type?.toLowerCase() || '').includes(query.toLowerCase());
        const statusMatch = (order.status?.toLowerCase() || '').includes(query.toLowerCase());
        const userDescMatch = (order.user_description?.toLowerCase() || '').includes(query.toLowerCase());

        return serviceTypeMatch || statusMatch || userDescMatch; // Check if any of the fields match
      });

      setFilteredData(filtered); // Update filtered data
    }
  };

  const renderItem_first = ({ item }) => (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => navigation.navigate('OrdersDetails', {
        order_id: item.id,
        device_id: item.device_id,
      })}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={item.deviceImages?.length > 0
            ? { uri: item.deviceImages[0] }
            : require('../../Icons/serviceImage.png')
          }
          style={{ width: 100, borderRadius: 10, height: 100 }}
        />
        <View style={{ marginHorizontal: 5 }}>
        <Text style={styles.text_2}>{item.name}</Text>
        <Text style={styles.text_2}>{item.service_type}</Text>
          <Text style={styles.text_1}>{item.status}</Text>
          <Text style={styles.text_3}>Visiting Charge (₹{item.visiting_charge})</Text>
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
          value={searchQuery} // Bind the input to the search query state
          onChangeText={handleSearch} // Trigger handleSearch when the text changes
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Show loading spinner when data is being fetched */}
        {loading ? (
          <ActivityIndicator size="large" color="#FB923C" style={styles.loader} />
        ) : (
          <FlatList
            data={filteredData} // Display filtered data
            renderItem={renderItem_first}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
              <Text style={styles.searchText}>No Orders Found</Text>
            </View>} // Show a message when no orders match
          />
        )}
      </ScrollView>
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
    textTransform:'capitalize',
  },
  text_2: {
    fontSize: 12,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 14.4,
  },
  text_3: {
    fontSize: 12,
    fontWeight: 600,
    color: '#000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  searchText:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#FB923C',
    marginTop:'50%',
  }
});
