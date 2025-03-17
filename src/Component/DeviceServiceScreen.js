import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeviceServiceScreen = ({ route, deviceitemid }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [totalPages, setTotalPages] = useState(null); // Track total pages

  useEffect(() => {
    deviceIdStore();
    getAllDeviceService(deviceitemid, page);
  }, [page]); 

  const deviceIdStore = async () => {
    await AsyncStorage.setItem('deviceStoreId', deviceitemid);
  };

  const getAllDeviceService = async (itemmid, pageNum) => {
    if (loading || !hasMoreData) return;

    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData);

      const response = await fetch(
        `http://api.voltrify.in/service/${itemmid}?city=gwalior&type=${type}&pageNo=${pageNum}&recordsPerPage=10`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resData = await response.json();
      const newData = resData.data;

      if (pageNum === 1) {
        setData(newData); // Reset data on first page load
      } else {
        setData(prevData => [...prevData, ...newData]);
      }

      const calculatedTotalPages = Math.ceil(resData.totalRecords / 10); // Assuming 10 records per page
      if (!totalPages) setTotalPages(calculatedTotalPages);

      if (newData.length === 0 || pageNum >= calculatedTotalPages) {
        setHasMoreData(false);
      }
    } catch (err) {
      console.log('Error fetching device services:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCart = async (id) => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData);
    const user_id = await AsyncStorage.getItem('userId');

    const result = await fetch('http://api.voltrify.in/user/cart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: id,
        user_id: user_id,
      }),
    });

    const response = await result.json();
    console.log('create Order', response);
    navigation.navigate("SummaryScreen");
  };

  const navigateOther = async (id) => {
    navigation.navigate('SummaryScreen');
    await AsyncStorage.setItem('serviceId', id);
  };

  const renderItem = ({ item }) => (
    <View style={{ borderRadius: 10 }}>
      <TouchableOpacity onPress={() => { createCart(item.id); navigateOther(item.id); }}>
        <ImageBackground
          style={styles.cardBox2}
          source={item.deviceImage?.length > 0 ? { uri: item.deviceImage[0] } : require('../Icons/serviceImage.png')}
          resizeMode="cover"
          imageStyle={{ borderRadius: 10 }}
        >
          <LinearGradient
            colors={['#FFFFFF00', '#FFFFF000', '#FB923C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.linerStyle}
          >
            <TouchableOpacity onPress={() => { createCart(item.id); navigateOther(item.id); }}>
              <Text style={styles.textCard}>{item.name}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainView}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!loading && hasMoreData && page < totalPages) {
            setPage(prevPage => prevPage + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? (
          <View style={{ justifyContent: 'center', marginVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FB923C" />
          </View>
        ) : null}
        ListEmptyComponent={hasMoreData ? null : <Text>No more data available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  cardBox2: {
    width: 86,
    height: "100%",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  linerStyle: {
    flex: 1,
    width: 86,
    height: "100%",
    borderRadius: 10,
  },
  textCard: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 12,
    color: '#FFFFFF',
    marginTop: 80,
    marginHorizontal: 5,
  },
});

export default DeviceServiceScreen;
