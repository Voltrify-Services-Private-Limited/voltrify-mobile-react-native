import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceScreen = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllService();
  }, []);

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
      setData(resData.data);
    } catch (err) {
      console.log('get Service err --- ', err);
    }
  };
  console.log('Service', data);

  const renderItem_first = ({ item }) => (
    <View>
      <ImageBackground
        style={styles.cardBox2}
        source={require('../../Icons/image7.png')}
        resizeMode="cover">
        <LinearGradient
          colors={['#FFFFFF00', '#FFFFF000', '#FB923C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.linerStyle}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ServiceDetails', {
              service_id: item.id,
            })}>
            <Text style={styles.textCard}>{item.name}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  const renderItem_second = ({ item }) => (
    <TouchableOpacity
    onPress={() => navigation.navigate('ServiceDetails', {
      service_id: item.id,
    })}>
      
    <View style={styles.cardBox}>
      <Image
        source={require('../../Icons/serviceImage.png')}
        style={{ width: '100%', borderRadius: 10 }}
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
    </View>
  </TouchableOpacity>
  );

  const renderItem_Third = ({ item }) => (
    <View>
      <ImageBackground
        style={styles.cardBox2}
        source={require('../../Icons/image7.png')}
        resizeMode="cover">
        <LinearGradient
          colors={['#FFFFFF00', '#FFFFFF00', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.linerStyle}>
          <TouchableOpacity
             onPress={() => navigation.navigate('ServiceDetails', {
              service_id: item.id,
            })}>
            <Text style={styles.textCard}>{item.name}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <Image source={require('../../Icons/locationIcon.png')} />
          <Text style={styles.headerText_1}>
            B-22, Veena Nagar, MR-10, Indore
          </Text>
          <Image source={require('../../Icons/downArrow.png')} style={{width:12,height:12}}  />
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
          placeholder="Search for ‘AC Repair’"
          placeholderTextColor="#00000066"
          style={styles.searchInput}
        />
      </View>

      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Text style={styles.heading1}>AC & Appliance Repair</Text>
            <Text style={styles.heading2}>See all</Text>
          </View>

          <View style={styles.sliderList}>
            <View style={styles.sliderCard}>
              <FlatList
                horizontal={true}
                data={data}
                renderItem={renderItem_first}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Text style={styles.heading1}>Quick Home Repairs</Text>
            <Text style={styles.heading2}>See all</Text>
          </View>

          <View style={styles.sliderList}>
            <View style={styles.sliderCard}>
              <FlatList
                horizontal={true}
                data={data}
                renderItem={renderItem_second}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 10,
          }}>
          <Text style={styles.heading1}>Quick Home Repairs</Text>
          <Text style={styles.heading2}>See all</Text>
        </View>
        {/* <View style={styles.sliderCard}>
          <ImageBackground
            style={styles.cardBox2}
            source={require('../../Icons/image7.png')}
            resizeMode="cover">
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF00', '#000000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linerStyle}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ServiceDetails')}>
                <Text style={styles.textCard}>AC Service & Repair</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
          <ImageBackground
            style={styles.cardBox2}
            source={require('../../Icons/image7.png')}
            resizeMode="cover">
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF00', '#000000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linerStyle}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ServiceDetails')}>
                <Text style={styles.textCard}>AC Service & Repair</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
          <ImageBackground
            style={styles.cardBox2}
            source={require('../../Icons/image7.png')}
            resizeMode="cover">
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF00', '#000000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linerStyle}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ServiceDetails')}>
                <Text style={styles.textCard}>AC Service & Repair</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
          <ImageBackground
            style={styles.cardBox2}
            source={require('../../Icons/image7.png')}
            resizeMode="cover">
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF00', '#000000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linerStyle}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ServiceDetails')}>
                <Text style={styles.textCard}>AC Service & Repair</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        </View> */}

        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem_Third}
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
    width: '50%',
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
    height: "auto",
    marginHorizontal: 5,
  },
  cardBox2: {
    width: 86,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cardText2: {
    fontSize: 8,
    fontWeight: 600,
    lineHeight: 12,
  },
  cardNameText: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 4,
    lineHeight: 12,
    marginTop: 4,
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
  textCard: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 12,
    color: '#FFFFFF',
    marginTop: 80,
    marginHorizontal: 5,
  },
  linerStyle: {
    flex: 1,
    width: 86,
    height: 120,
    borderRadius: 10,
  },
});


