// components/CustomModal.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoding from 'react-native-geocoding';
import { GOOGLE_KEY } from '../EnvFolder/env';

const AddressModal = ({ visible, onClose }) => {
  const [modalCondition, setModalCondition] = useState(false);
  const [locationBtn, setLocationBtn] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  }); // Initial location (defaults to a center)
  useEffect(() => {
    // Initialize Google Geocoding API
    Geocoding.init(GOOGLE_KEY); // Replace with your API key
  }, []);
  ///////////// Profile Id Start //////////////////


  const searchLocation = async (text) => {
    setLocationBtn(true);
    setQuery(text);
    if (text.length > 2) {  // Trigger search after 3 characters
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_KEY}&language=en`;
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        if (json.predictions) {
          setResults(json.predictions);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setResults([]); // Clear results when query is too short
    }
  };

  const handleSelectLocation = async (item) => {
    setLocationBtn(!locationBtn);
    setQuery(item.description);
    setResults([]);

    // Fetch place details to get coordinates
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${GOOGLE_KEY}`;

    try {
      const response = await fetch(detailsUrl);
      const json = await response.json();
      const { lat, lng } = json.result.geometry.location;

      setSelectedLocation({
        description: item.description,
        latitude: lat,
        longitude: lng,
      });
      await AsyncStorage.setItem('finalAddress', JSON.stringify(selectedLocation.description));
      Alert.alert("Location Selected", item.description);
    } catch (error) {
      console.error(error);
    }
  };
  // const getPhoneNumber = async () => {
  //   const phoneNumber = await AsyncStorage.getItem('phoneNumber');
  //   const convertNumber = JSON.parse(phoneNumber)
  //   setNumber(convertNumber);
  // }
  const handleLocationSearch = async () => {
    await AsyncStorage.setItem('finalAddress', JSON.stringify(selectedLocation.description));
    setModalCondition(true);
  };


  ///////////// Profile Id End //////////////////

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredViewModal}>
        <View style={styles.modalViewModal}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              width: '100%',
              height: 48,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 32,
                height: 4,
                borderRadius: 8,
                backgroundColor: '#79747E',
                alignSelf: 'center',
              }}></View>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 10 }}>
              <View style={styles.searchBar}>
                <View style={{ justifyContent: 'center' }}>
                  <Image source={require('../Icons/accountIcon2.png')} style={{ width: 20, height: 20 }} />
                </View>
                <View style={{ justifyContent: 'center', width: '90%' }}>
                  <TextInput
                    placeholder="Search for a location"
                    value={query}
                    placeholderTextColor={'#000'}
                    onChangeText={searchLocation}
                    style={{ height: 40, width: 'auto' }}
                  />
                </View>
              </View>
              {selectedLocation && (
                <Text style={{ marginBottom: 10 }}>
                  {selectedLocation.description}
                </Text>
              )}
              {locationBtn == false ? (
                <View></View>
              ) : (
                <View style={{ width: '100%', height: 200, position: 'absolute', top: 95, zIndex: 10, backgroundColor: '#fff', left: 10, borderRadius: 10, elevation: 6 }}>
                  <FlatList
                    data={results}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleSelectLocation(item)}>
                        <Text style={{ padding: 10 }}>{item.description}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>

            {selectedLocation && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                  title={selectedLocation.description}
                />
              </MapView>
            )}

            <View style={{ flexDirection: 'row', marginTop: 50, marginHorizontal: 20,position:'absolute',bottom:0, }}>
              {modalCondition == false ?(
                <TouchableOpacity
                style={styles.input_box2Modal}
                onPress={() => handleLocationSearch()}>
                <Text style={styles.text_6Modal}>Save Location</Text>
              </TouchableOpacity>
              ):(
                <TouchableOpacity
                style={styles.input_box2Modal}
                onPress={onClose}>
                <Text style={styles.text_6Modal}>Next</Text>
              </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  modalViewModal: {
    backgroundColor: 'white',
    width: '100%',
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // paddingHorizontal: 30,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
  buttonModalModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpenModal: {
    backgroundColor: '#F194FF',
  },
  buttonCloseModal: {
    backgroundColor: '#2196F3',
  },
  textStyleModal: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextModal: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItem: 'center',
    height: '75%',
  },

  main_viewModal: {
    flex: 1,
    backgroundColor: '#FB923C',
  },
  text_1Modal: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 4,
  },
  text_7Modal: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'left',
    color: '#000',
    width: '100%',
  },
  second_viewModal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#ffffff',
  },
  text_3Modal: {
    fontSize: 18,
    fontWeight: 500,
    color: '#000000',
    lineHeight: 18,
    textAlign: 'left',
    marginTop: 16,
  },
  text_4Modal: {
    fontSize: 15,
    fontWeight: 400,
    color: '#797979',
    lineHeight: 20,
    textAlign: 'left',
    marginTop: 10,
    lineHeight: 25,
  },
  input_boxModal: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  input_box3Modal: {
    width: '49%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input_box2Modal: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    marginVertical: 20,
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonModal: {
    width: 328,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 50,
    marginVertical: 8,
  },
  text_5Modal: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    textAlign: 'center',
    paddingVertical: 16,
  },
  text_6Modal: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    paddingVertical: 16,
    marginHorizontal: 5,
  },
  lineBoxModal: {
    width: 328,
    height: 14,
    top: 36,
    marginVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  lineTextModal: {
    fontSize: 12,
    fontWeight: 600,
    color: '#00000033',
    lineHeight: 14.4,
    marginHorizontal: 5,
  },

  lineModal: {
    width: 145,
    height: 1,
    top: 2,
    backgroundColor: '#00000033',
    marginVertical: 16,
    alignItems: 'center',
  },

  btn1Modal: {
    width: 60,
    height: 33,
    borderWidth: 1,
    borderColor: '#FB923C',
    backgroundColor: '#FB923C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  btn2Modal: {
    width: 60,
    height: 33,
    borderWidth: 1,
    borderColor: '#FB923C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  btnText1Modal: {
    fontSize: 12,
    fontWeight: 500,
    color: '#ffffff',
    lineHeight: 14.4,
  },
  btnText2Modal: {
    fontSize: 12,
    fontWeight: 500,
    color: '#FB923C',
    lineHeight: 14.4,
  },
  map: {
    width: '100%',
    height: '60%',
  },
  searchBar: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: '#FB923C',
  }

});

export default AddressModal;
