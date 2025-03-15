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
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoding from 'react-native-geocoding';
import { GOOGLE_KEY } from '../EnvFolder/env';

const AddressModal = ({ visible, onClose }) => {
  const [FaltNumber, setFlatNumber] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [finalAddress, setFinalAddres] = useState('');
  const [number, setNumber] = useState('');
  const [locationBtn, setLocationBtn] = useState(true);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  }); // Initial location (defaults to a center)
  useEffect(() => {
    getPhoneNumber();
    // Initialize Google Geocoding API
    Geocoding.init(GOOGLE_KEY); // Replace with your API key
  }, []);
  ///////////// Profile Id Start //////////////////

  const getPhoneNumber = async () => {
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    const convertNumber = JSON.parse(phoneNumber)
    setNumber(convertNumber);
  }
  const handleLocationSearch = async () => {
    const allAddress = FaltNumber + address + landmark;
    setFinalAddres(allAddress);
    await AsyncStorage.setItem('finalAddress', JSON.stringify(allAddress));
    console.log(allAddress);

    if (!allAddress) {
      return;
    }

    try {
      // Geocode the address entered by the user
      const result = await Geocoding.from(allAddress);
      const { lat, lng } = result.results[0].geometry.location;
      setLocation({ latitude: lat, longitude: lng }); // Set the new location on map
    } catch (error) {
      Alert.alert('Error', 'Unable to find the location. Please try again.');
    }
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
          <View style={{ width: '100%', height: 190 }}>
            <MapView
              style={{ width: '100%', height: '100%' }}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={location} />
            </MapView>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <Text style={styles.text_3Modal}>{finalAddress}</Text>
            <Text style={styles.text_4Modal}>
              Ph: +91 {number}
            </Text>
            <View style={{ height: 200, marginTop: 10, }}>
              <View style={styles.input_boxModal}>
                <TextInput
                  placeholder="House/Flat Number*"
                  placeholderTextColor="#A09CAB"
                  keyboardType="default"
                  style={styles.text_7Modal}
                  onChangeText={x => setFlatNumber(x)}
                  value={FaltNumber}
                />
              </View>
              <View style={styles.input_boxModal}>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor="#A09CAB"
                  keyboardType="default"
                  style={styles.text_7Modal}
                  onChangeText={x => setAddress(x)}
                  value={address}
                />
              </View>
              <View style={styles.input_boxModal}>
                <TextInput
                  placeholder="Landmark (Optional)"
                  placeholderTextColor="#A09CAB"
                  keyboardType="default"
                  style={styles.text_7Modal}
                  onChangeText={x => setLandmark(x)}
                  value={landmark}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 50, }}>
                  {locationBtn === true ? (
              <TouchableOpacity
                style={styles.input_box2Modal}
                onPress={async () => {
                  await handleLocationSearch(); // Ensure the location search is completed first
                  setLocationBtn(false); // Only update the state after the location has been updated
                }}>
                <Text style={styles.text_6Modal}>Save Location</Text>
              </TouchableOpacity>
            ) : (
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
    height: 418,
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

});

export default AddressModal;
