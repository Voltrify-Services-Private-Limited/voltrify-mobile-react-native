import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { AuthContext } from '../../Component/AuthContext';
import Geocoding from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import GoogleMap from '../../Component/GoogleMap';
import ModalComponent from '../../Component/AddressModal';
import { GOOGLE_KEY } from '../../EnvFolder/env';
// import Geolocation from '@react-native-community/geolocation'; // For location
// import Geocoding from 'react-native-geocoding'; // For reverse geocoding
// import { PermissionsAndroid } from 'react-native'; // For requesting location permission on Android

const LocationScreen = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [landmark, setLandmark] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState([]);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [error, setError] = useState('');
  const [UserAddress, setUserAddress] = useState('');
  const { login } = React.useContext(AuthContext);
  const { tokens } = route.params;

  console.log(location, UserAddress);
  console.log('adresss---------------', UserAddress);

  useEffect(() => {
    getProfile_id();
  }, []);


  const setUserId = async () => {
    await AsyncStorage.setItem("userId", user);
  }

  ///////////// Profile Id Start //////////////////

  const getProfile_id = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
      const response = await fetch('http://api.voltrify.in/user', {
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
      setUser(resData.data.id);
      await AsyncStorage.setItem('userName', resData.data.firstName);
      await AsyncStorage.setItem('userNumber', resData.data.phoneNumber);
      await AsyncStorage.setItem('userEmail', resData.data.email);

    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };


  ///////////// Profile Id End //////////////////

  const UserLoginApi = async () => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    const url = 'http://api.voltrify.in/user/address';
    result = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, depending on your API requirements
      },
      body: JSON.stringify({
        user_id: user,
        firstName: firstName,
        lastName: lastName,
        city: city,
        addressLine2: addressLine2,
        addressLine1: addressLine1,
        landmark: landmark,
        phoneNumber: phone,
        state: state,
        pincode: pincode,
      }),
    });

    await AsyncStorage.setItem("address1", addressLine1);
    await AsyncStorage.setItem("address2", addressLine2);
    await AsyncStorage.setItem("landmark", landmark);
    await AsyncStorage.setItem("city", city);
    await AsyncStorage.setItem("state", state);
    await AsyncStorage.setItem("pincode", pincode);
    response = await result.json();
    console.log('login data', response);
    setModalVisible(!modalVisible);
    setUserId();
    login(tokens);
  };

  // Request permission for location (Android only)
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    // Initialize Geocoding API with your key
    Geocoding.init(GOOGLE_KEY);  // Replace with your actual API Key
  }, []);

  // Request location permission on Android
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "We need access to your location to get your address."
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted");
      } else {
        setError("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to get the current position
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude, error: null });

        // Once the location is fetched, trigger geocoding to get address
        fetchAddress(latitude, longitude);
      },
      (error) => {
        setLocation({ ...location, error: error.message });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Function to fetch address using reverse geocoding
  const fetchAddress = (latitude, longitude) => {
    Geocoding.from(latitude, longitude)
      .then((json) => {
        if (json.results && json.results.length > 0) {
          const formattedAddress = json.results[0].formatted_address;
          setUserAddress(formattedAddress);
        } else {
          setError('No address found for these coordinates.');
        }
      })
      .catch((err) => {
        setError('Error: ' + err.message);
      });
  };


  const setLocationLogin = async () => {
    getCurrentPosition();
    await AsyncStorage.setItem('latitude', JSON.stringify(UserAddress));
    
  }
  const LocationLogin = async () => {
    getCurrentPosition();
    await AsyncStorage.setItem('latitude', JSON.stringify(UserAddress));
    setUserId();
    login(tokens);
  }
   const LocationFrom = async () => {
    const manuallyAddress = 'true';
    await AsyncStorage.setItem("manuallyAddress", manuallyAddress);
    setModalVisible(true);
    setUserId();
    login(tokens);
  }
  

  return (
    <View style={styles.main_view}>
      <View style={{ top: 92, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text_1}>Welcome to</Text>
        <Image source={require('../../Icons/text_logo1.png')} />
        <Text style={styles.text_1}>Your One Stop Solution</Text>
      </View>
      <View style={styles.second_view}>
        <View
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
        </View>


        <ModalComponent visible={locationModal} onClose={() => LocationFrom()} />


        <Text style={styles.text_3}>Enable Location </Text>
        <Text style={styles.text_4}>
          Please enable your location {'\n'} so that we can serve you better
        </Text>
        <Image source={require('../../Icons/Group.png')} />
        {UserAddress == '' ? (<TouchableOpacity
          style={[styles.button]}
          onPress={() => setLocationLogin()}>
          <Text style={styles.text_5}>Enable Location</Text>
        </TouchableOpacity>) : (<TouchableOpacity
          style={[styles.button]}
          onPress={() => LocationLogin()}>
          <Text style={styles.text_5}>Enable Location</Text>
        </TouchableOpacity>)}
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => setLocationModal(true)}>
          <Text style={styles.text_5}>Enter Location Manually</Text>
        </TouchableOpacity>
        {/* <Text style={styles.text_4}>No, I’ll do it later</Text> */}
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    backgroundColor: '#FB923C',
  },
  text_1: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 4,
  },
  second_view: {
    width: '100%',
    height: 539,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#ffffff',
  },
  text_3: {
    fontSize: 24,
    fontWeight: 700,
    color: '#000000',
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 16,
  },
  text_4: {
    fontSize: 15,
    fontWeight: 400,
    color: '#797979',
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  button: {
    width: 328,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 10,
    marginVertical: 8,
  },
  text_5: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    textAlign: 'center',
    paddingVertical: 16,
  },
  text_6: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    paddingVertical: 16,
    marginHorizontal: 5,
  },
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
    fontSize: 24,
    fontWeight: 700,
    color: '#000000',
    lineHeight: 28,
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
