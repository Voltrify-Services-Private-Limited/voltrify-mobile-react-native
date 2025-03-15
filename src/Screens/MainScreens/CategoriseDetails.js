import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ProgressBarAndroid,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import Progress from 'react-native-progress';

const CategoriseDetails = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { id } = route.params;
  useEffect(() => {
    console.log('Categorise Id', data);
    getCategoriseId();
  }, []);


  const getCategoriseId = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
      console.log(token);
      const response = await fetch(`http://api.voltrify.in/devices/category/${id}`, {
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
      console.log(resData.data);
    } catch (err) {
      console.log('get Order err --- ', err);
    }
  };

  const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.listCard}
         onPress={() => navigation.navigate('ServiceDetails', {
          deviceId: item.id,
          service_description: item.description,
        })}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={ { uri: item.images[0]}}
            style={{ width: 80, borderRadius: 10, height: 80 }}
          />
          <View style={{ marginHorizontal: 8,}}>
            <Text style={styles.text_2}>{item.name}</Text>
            <Text style={styles.text_1}>
              {item.description.length > 20 ? `${item.description.substring(0, 20)}...` : item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Categorise Details</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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

  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: 'auto',
    height: 'auto',
    backgroundColor: "#fff",
    elevation: 5,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth:1,
    borderColor:'#FB923C',
  },
  text_1: {
    fontSize: 12,
    fontWeight: 500,
    color: '#A09CAB',
  },
  text_2: {
    fontSize: 18,
    fontWeight: 600,
    color: '#000000',
  },
  text_3: {
    fontSize: 12,
    fontWeight: 400,
    color: '#1C1B1F',
  },
});

export default CategoriseDetails;
