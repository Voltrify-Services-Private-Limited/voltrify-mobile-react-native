import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceServiceScreen from '../../Component/DeviceServiceScreen';

const ServiceScreen = ({ route }) => {
  const navigation = useNavigation();
  const [devicesData, setDevicesData] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [manuallyLocation, setManuallyLocation] = useState('');
  const [isRefersh, setIsRefersh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [manuallyAddress, setManuallyAddress] = useState('false');
  useEffect(() => {
    getAllDevices();
    Manually_and_enable();
  }, []);

  useEffect(() => {
    // Filter devices when searchQuery changes
    if (searchQuery === '') {
      setFilteredDevices(devicesData);
    } else {
      setFilteredDevices(
        devicesData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, devicesData]);

  const getAllDevices = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData);
      const latitude = await AsyncStorage.getItem("latitude");
      const geoLocation = JSON.parse(latitude);
      setCurrentLocation(geoLocation);

      const response = await fetch('http://api.voltrify.in/devices', {
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
      setDevicesData(resData.data);
      setFilteredDevices(resData.data); // Initially, set filtered devices as all devices
    } catch (err) {
      console.log('Service Data err --- ', err);
    }
  };

  const devicesItem = ({ item }) => (
    <View style={styles.sliderCard}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingHorizontal: 10,
          width: '100%',
        }}>
        <Text style={styles.heading1}>{item.name}</Text>
      </View>
      <DeviceServiceScreen deviceitemid={item.id} />
    </View>
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
        </View>
        <View style={styles.headerRight}>
          {/* <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Image source={require('../../Icons/well.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('YourCart')} style={styles.iconButton}>
            <Image source={require('../../Icons/oderIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.searchBar}>
        <Image source={require('../../Icons/searchIcon.png')} style={{ marginVertical: 10 }} />
        <TextInput
          placeholder="Search for ‘AC Repair’"
          placeholderTextColor="#00000066"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update the search query state on text change
        />
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={filteredDevices} // Use filteredDevices instead of devicesData
          renderItem={devicesItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default ServiceScreen;

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
    fontSize: 9,
    fontWeight: 500,
    lineHeight: 9,
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
    paddingRight: 5,
    borderBottomWidth: 2,
    paddingBottom: 2,
    borderBottomColor: '#FB923C',
  },
  sliderCard: {
    height: 200,
    width: 'auto',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    elevation: 4,
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
 