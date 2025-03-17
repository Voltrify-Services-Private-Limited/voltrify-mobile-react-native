import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoding from 'react-native-geocoding';
import ModalComponent from '../../Component/AddressModal';
const DashboardScreen = ({ route }) => {
  const [serviceData, setServiceData] = useState([]);
  const [categoriesData, setCategorise] = useState([]);
  const [devicesData, setDevicesData] = useState([]);
  const [flat_no, setFlatNo] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [manuallyLocation, setManuallyLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [isRefersh, setIsRefersh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [manuallyAddress, setManuallyAddress] = useState('false');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Keep track of the current page

  const navigation = useNavigation();

  useEffect(() => {
    getAllService();
    getAllCategorise();
    getAllDevices();
    refreshTokenApi();
    getAddress();
    Manually_and_enable();
  }, []);

  const handleRefersh = async () => {
    setIsRefersh(true);

    Manually_and_enable();
    // await getAllService();
    // await getAllCategorise();
    // await getAllDevices();
    await refreshTokenApi();
    //  await getAddress();
    setIsRefersh(false);
  }

  ////////////////// Categorises Api Call Start ////////////////
  const getAllCategorise = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const latitude = await AsyncStorage.getItem("latitude");
      setCurrentLocation(JSON.parse(latitude));
      const manually = await AsyncStorage.getItem("finalAddress");
      setManuallyLocation(JSON.parse(manually));
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
      const response = await fetch('http://api.voltrify.in/categories', {
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
      setCategorise(resData.data);
    } catch (err) {
      console.log('Categories Data err --- ', err);
    }
  };

  const categoriseItem = ({ item }) => (
    <View style={styles.serviceCard}>
      <TouchableOpacity onPress={() => navigation.navigate('CategoriseDetails', {
        id: item.id,
      })}
        style={[styles.card, { backgroundColor: '#FB923C' }]}>
        <Text style={[styles.cardText, { color: '#fff' }]}>
          {item.name}
        </Text>
        <Image
          source={{ uri: item.image }}
          style={{ marginVertical: 5, width: 50, height: 50, resizeMode: 'contain' }}
        />
      </TouchableOpacity>
    </View>
  );

  ////////////////// Categorises Api Call End ////////////////
  
  ////////////////// Services Api Call Start ////////////////
  const getAllService = async (page = 1) => {
    if (loading) return; // Prevent multiple simultaneous requests
    setLoading(true);

    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch(`http://api.voltrify.in/service?page=${page}&limit=10`, { // Add pagination params
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
      
      setServiceData((prevData) => [...prevData, ...resData.data]); // Append new data
    } catch (err) {
      console.log('Service Data err --- ', err);
    } finally {
      setLoading(false);
    }
  };


  const navigateOther = async (id) => {
    navigation.navigate('SummaryScreen',);
    // Alert.alert(JSON.stringify(price));
    await AsyncStorage.setItem('serviceId', id);
  }


  const serviceItem = ({ item }) => (
    <View style={styles.sliderCard}>
      <TouchableOpacity
        style={styles.cardBox}
        onPress={() => { createCart(item.id), navigateOther(item.id) }}>
        <Image
          source={
            item.deviceImage?.length > 0
              ? { uri: item.deviceImage[0] }
              : require('../../Icons/serviceImage.png')
          }
          style={{ width: '100%', borderRadius: 10, height: '100' }}
        />
        <Text style={styles.cardNameText}>
          {item.name}
        </Text>
        <Text style={styles.cardText2}>
          {/* {item.description} */}
          {item.description.length > 80 ? `${item.description.substring(0, 50)}...` : item.description}
        </Text>
        {/* <View style={{ flexDirection: 'row' }}>
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 3,
          }}>
          <Text style={styles.text_2}>({item.visitingCharge})</Text>
          <Text style={styles.text_3}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  ////////////////// Services Api Call End ////////////////
  ////////////////// Devices Api Call Start ////////////////
  const getAllDevices = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/devices', {
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
      setDevicesData(resData.data);
    } catch (err) {
      console.log('Service Data err --- ', err);
    }
  };

  const devicesItem = ({ item }) => (
    <View style={styles.sliderCard}>
      <TouchableOpacity
        style={styles.cardBox}
        onPress={() => navigation.navigate('ServiceDetails', {
          deviceId: item.id,
          service_description: item.description,
        })}>
        <Image
          source={{ uri: item.images[0] }}
          style={{ width: '100%', borderRadius: 10, height: '100' }}
        />
        <Text style={styles.cardNameText}>
          {item.name}
        </Text>
        {/* <Text style={styles.cardText2}>
          {item.description}
        </Text> */}
      </TouchableOpacity>
    </View>
  );

  ////////////////// Services Api Call End ////////////////

  ////////////// Refersh Token Api Call Start ///////////////

  const refreshTokenApi = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    const token = JSON.parse(accessToken); // Assuming userData is a JSON string containing the token
    const refresh = JSON.parse(refreshToken);
    // setRefresh_Token(token);
    const url = 'http://api.voltrify.in/auth/user/renew-token';
    result = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, depending on your API requirements
      },
      body: JSON.stringify({
        refreshToken: refresh,
      }),
    });

    response = await result.json();
    console.log('Refresh Token', JSON.stringify(response.data.accessToken));
    await AsyncStorage.setItem('access_token', JSON.stringify(response.data.accessToken));
    // Alert.alert(JSON.stringify(response.data.accessToken));
  };
  ////////////// Refersh Token Api Call End ///////////////

  ////////////// Get Address Start ///////////////

  const getAddress = async () => {
    const getAdd_1 = await AsyncStorage.getItem("address1");
    const getAdd_2 = await AsyncStorage.getItem("address2");
    const getLandmark = await AsyncStorage.getItem("landmark");
    const getCity = await AsyncStorage.getItem("city");
    const getState = await AsyncStorage.getItem("state");
    const getPincode = await AsyncStorage.getItem("pincode");
    setFlatNo(getAdd_1 + getAdd_2 + getLandmark + getCity + getState + getPincode);
  }

  ////////////// Get Address Start ///////////////

  ////////////// Create Cart Start ///////////////

  const createCart = async (id) => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    const user_id = await AsyncStorage.getItem('userId');
    await AsyncStorage.setItem("serviceId", id);
    result = await fetch('http://api.voltrify.in/user/cart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, depending on your API requirements
      },
      body: JSON.stringify({
        service_id: id,
        user_id: user_id,
      }),
    });
    response = await result.json();
    console.log('login data', response);
  }

  const filteredServiceData = serviceData.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredCategoriesData = categoriesData.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDevicesData = devicesData.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Manually_and_enable = async () => {
    const manuallyAddress_Key = await AsyncStorage.getItem("manuallyAddress");
    setManuallyAddress(manuallyAddress_Key);

    // Check if manuallyAddress is set to true, and accordingly handle locations.
    if (manuallyAddress_Key === 'true') {
      const manually = await AsyncStorage.getItem("finalAddress");
      setManuallyLocation(JSON.parse(manually));
      setCurrentLocation(''); // Clear currentLocation if manuallyLocation is being used
    } else {
      const latitude = await AsyncStorage.getItem("latitude");
      setCurrentLocation(JSON.parse(latitude));
      setManuallyLocation(''); // Clear manuallyLocation if currentLocation is being used
    }
  };

  const updateManaullyAddress = async () => {
    setModalVisible(!modalVisible);
    await AsyncStorage.removeItem('conriamLocation');
    const manuallyAddress = 'true';
    await AsyncStorage.setItem("manuallyAddress", manuallyAddress);
    const manually = await AsyncStorage.getItem("finalAddress");
    setManuallyLocation(JSON.parse(manually));
  }
  const updateManaullyTrue = async () => {
    const manually = await AsyncStorage.getItem("finalAddress");
    setManuallyLocation(JSON.parse(manually));
    setModalVisible(true);
    const confiram = await AsyncStorage.getItem("conriamLocation");
    console.log(confiram);
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <View style={{ justifyContent: 'center' }}>
            <Image source={require('../../Icons/locationIcon.png')} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            {manuallyAddress == 'true' ? (
              <>
                <Text style={styles.headerText_1}>
                {manuallyLocation.length > 75 ? `${manuallyLocation.substring(0, 75)}...` : manuallyLocation}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.headerText_1}>
                  {currentLocation.length > 75 ? `${currentLocation.substring(0, 75)}...` : currentLocation}
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity onPress={() => updateManaullyTrue()} style={{ justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center' }}>
              <Image source={require('../../Icons/downArrow.png')} style={{ width: 12, height: 12 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          {/* <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Image source={require('../../Icons/well.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('YourCart')}
            style={styles.iconButton}>
            <Image source={require('../../Icons/oderIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image source={require('../../Icons/searchIcon.png')} style={{ marginVertical: 10 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#00000066"
          style={styles.searchInput}
          value={searchQuery} // Bind the search query
          onChangeText={(text) => setSearchQuery(text)} // Update the query state
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefersh} onRefresh={handleRefersh} />}
      >
        <View style={styles.banner}>
          <Image
            source={require('../../Icons/banner.png')}
            style={{ width: '100%', borderRadius: 10 }}
          />
        </View>

        {/* Filtered Categories */}
        <View style={{ marginVertical: 5, }}>
          <Text style={styles.heading1}>Most Used Categories</Text>
          <Text style={styles.text_1}>Find the right categories for you!</Text>
        </View>
        <View style={{ height: 'auto', }}>
          <FlatList
            key={'#'}
            data={filteredCategoriesData} // Use filtered categories
            numColumns={2}
            renderItem={categoriseItem}
            keyExtractor={(item) => '#' + item.id.toString()}
          />
        </View>

        {/* Filtered Services */}
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.heading1}>Most Booked Services</Text>
          <Text style={styles.text_1}>Book the right services for you!</Text>
        </View>
        <View style={styles.sliderList}>
          {/* <FlatList
            horizontal={true}
            data={filteredServiceData} // Use filtered services
            renderItem={serviceItem}
            keyExtractor={(item) => item.id.toString()}
          /> */}
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filteredServiceData} // Use filtered services
            renderItem={serviceItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => {
              if (!loading) {
                setPage(prevPage => prevPage + 1); // Increment page number when the end is reached
                getAllService(page + 1); // Fetch the next page
              }
            }}
            onEndReachedThreshold={0.5} // Trigger when the list is 50% from the end
            ListFooterComponent={loading ? (<View style={{ justifyContent: 'center', marginVertical: 40, alignItems: 'center' }}><ActivityIndicator size="large" color="#FB923C" /></View>) : (null)} // Show loader at the bottom
          />

        </View>

        {/* Filtered Devices */}
        <View style={{ marginVertical: 5, }}>
          <Text style={styles.heading1}>Most Devices</Text>
          <Text style={styles.text_1}>Book the Devices for you!</Text>
        </View>
        <View style={styles.sliderList}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filteredDevicesData} // Use filtered devices
            renderItem={devicesItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <ModalComponent visible={modalVisible} onClose={() => updateManaullyAddress()} />
      </ScrollView>
    </View>
  );
}
export default DashboardScreen;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  topHeader: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText_1: {
    width: '100%',
    fontSize: 9,
    fontWeight: 500,
    lineHeight: 9.6,
    color: '#000000B2',
    marginHorizontal: 5,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: '#FB923C',
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  searchBar: {
    width: 'auto',
    height: 40,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#FB923C',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom:10,
  },
  searchInput: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00000066',
    width: '90%',
    lineHeight: 14.4,
  },
  banner: {
    marginVertical: 10,
    height: 160,
  },
  heading1: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1C1B1F',
  },
  text_1: {
    fontSize: 12,
    fontWeight: 400,
    color: '#A09CAB',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  serviceCard: {
    width: '48%',
    margin: 5,
  },
  card: {
    height: 72.18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cardText: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 15.73,
    marginVertical: 25,
  },
  sliderList: {
    marginVertical: 5,
    height: 200,
  },
  sliderCard: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  cardBox: {
    width: 86,
    height: 'auto',
    marginHorizontal: 5,
  },
  cardText2: {
    fontSize: 8,
    fontWeight: 600,
    lineHeight: 12,
  },
  text_3: {
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 24,
  },
  text_2: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 24,
  },
  cardNameText: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 4,
    lineHeight: 12,
    marginTop: 4,
  },
});


