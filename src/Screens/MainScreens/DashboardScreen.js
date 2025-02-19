import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ route }) => {
  const [getData, setGetData] = useState('');
  const [serviceData, setServiceData] = useState([]);
  const [categoriesData, setCategorise] = useState([])
  const [getImage, setGetImage] = useState([]);
  const navigation = useNavigation();
  const dataView = async () => {
    const data = await AsyncStorage.getItem('location', addressLine1, location, landmark);
    setGetData(data);
    console.log(data);
  };
  useEffect(() => {
    dataView();
    getAllService();
    getAllCategorise();
    refreshTokenApi();
    console.log("============= Image ===========",getImage);
  }, []);


  const getAllCategorise = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
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

  const getAllService = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/service', {
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
      setServiceData(resData.data);
      setGetImage(resData.data.image)
    } catch (err) {
      console.log('Service Data err --- ', err);
    }
  };

  const categoriseItem = ({ item }) => (
    <View style={styles.serviceCard}>
      <TouchableOpacity   onPress={() => navigation.navigate('CategoriseDetails',{
              id:item.id,
            })}
        style={[styles.card, { backgroundColor: '#FB923C' }]}>
        <Text style={[styles.cardText, { color: '#fff' }]}>
          {item.name}
        </Text>
        <Image
          source={{uri:item.image}}
          style={{ marginVertical: 5,width: 50, height: 50, resizeMode:'contain' }}
        />
      </TouchableOpacity>
    </View>
  );

  const serviceItem = ({ item }) => (
    <View style={styles.sliderCard}>
      <TouchableOpacity
        style={styles.cardBox}
        onPress={() => navigation.navigate('ServiceDetails', {
          service_id: item.id,
        })}>
        <Image
          source={require('../../Icons/image1.png')}
          style={{ width: '100%', borderRadius: 10,height:'100' }}
        />
        <Text style={styles.cardNameText}>
          {item.name}
        </Text>
        <Text style={styles.cardText2}>
          {item.description}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
          <Image source={require('../../Icons/starfill.png')} />
        </View>
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

  ////////////// Refersh Token Api Call ///////////////

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
        Authorization: `Bearer ${accessToken}`,
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

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <Image source={require('../../Icons/locationIcon.png')} />
          <Text style={styles.headerText_1}>
            B-22, Veena Nagar, MR-10, {getData}
          </Text>
          <Image source={require('../../Icons/downArrow.png')} />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => props.navigation.navigate('NotificationScreen')}>
            <Image source={require('../../Icons/well.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('YourCart')}
            style={styles.iconButton}>
            <Image source={require('../../Icons/oderIcon.png')} />
          </TouchableOpacity>
        </View>
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
      <ScrollView>
        <View style={styles.banner}>
          <Image
            source={require('../../Icons/banner.png')}
            style={{ width: '100%', borderRadius: 10 }}
          />
        </View>
        <View>
          <Text style={styles.heading1}>Most Used Services</Text>
          <Text style={styles.text_1}>Find the right services for you!</Text>
        </View>
        <View style={styles.serviceView}>
          <FlatList
            key={'#'}
            data={categoriesData}
            numColumns={2}
            renderItem={categoriseItem}
            keyExtractor={(item) => '#' + item.id.toString()}
          />
        </View>

        <View>
          <Text style={styles.heading1}>Most Booked Services</Text>
          <Text style={styles.text_1}>Book the right services for you!</Text>

          <View style={styles.sliderList}>
            <FlatList
              horizontal={true}
              data={serviceData}
              renderItem={serviceItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
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
    fontSize: 8,
    fontWeight: 500,
    lineHeight: 9.6,
    color: '#000000B2',
    marginHorizontal: 5,
    marginTop: 1,
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


