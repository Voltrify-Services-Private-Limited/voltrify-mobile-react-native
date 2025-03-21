import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Modal
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {AuthContext} from '../../Component/AuthContext';
import Geocoding from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '../../Component/AddressModal';
import {GOOGLE_KEY} from '../../EnvFolder/env';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';

const LocationScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [user, setUser] = useState([]);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [UserAddress, setUserAddress] = useState('');
  const {login} = React.useContext(AuthContext);
  const {tokens} = route.params;

  console.log('adresss: ', UserAddress);

  useEffect(() => {
    getProfile_id();
  }, []);

  const setUserId = async () => {
    await AsyncStorage.setItem('userId', user);
  };

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

  // Request permission for location (Android only)
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    // Initialize Geocoding API with your key
    Geocoding.init(GOOGLE_KEY); // Replace with your actual API Key
  }, []);

  // Request location permission on Android
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need access to your location to get your address.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to get the current position
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      setLoading(true); // Show loader

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude, error: null});

          fetchAddress(latitude, longitude)
            .then(address => {
              setUserAddress(address); // Ensure state updates
              setLoading(false); // Hide loader after fetching address
              resolve(address); // Return the address
            })
            .catch(err => {
              console.log('Address Fetch Error:', err);
              setLoading(false);
              reject(err);
            });
        },
        error => {
          setLocation(prevState => ({...prevState, error: error.message}));
          setLoading(false);
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 90000, maximumAge: 10000},
      );
    });
  };

  // Function to fetch address using reverse geocoding
  const fetchAddress = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      Geocoding.from(latitude, longitude)
        .then(json => {
          if (json.results && json.results.length > 0) {
            const formattedAddress = json.results[0].formatted_address;
            resolve(formattedAddress); // Return address
          } else {
            console.log('No address found for these coordinates.');
            reject(new Error('No address found'));
          }
        })
        .catch(err => {
          console.log('Error: ' + err.message);
          reject(err); // Reject on error
        });
    });
  };

  async function checkGPSEnabled() {
    if (Platform.OS === 'android') {
      const checkEnabled = await isLocationEnabled();
      console.log('checkEnabled', checkEnabled);
      return checkEnabled;
    }
    return false;
  }
  async function enabledGPSPopup() {
    try {
      const enableResult = await promptForEnableLocationIfNeeded();
      console.log('enableResult', enableResult);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  const LocationLogin = async () => {
    const isGPSEnabled = await checkGPSEnabled();
    if (!isGPSEnabled) {
      if (Platform.OS === 'android') {
        await enabledGPSPopup();
      }
    }
    // Ensure location fetching completes
    const address = await getCurrentPosition();

    if (address) {
      await AsyncStorage.setItem('latitude', JSON.stringify(address)); // Store the fetched address
      setUserId(); // Set user ID only after address is fetched
      login(tokens); // Ensure login happens after all async tasks complete
    } else {
      console.log('address:', address);

      console.error('Failed to fetch address. Login aborted.');
    }
  };
  const LocationFrom = async () => {
    const manuallyAddress = 'true';
    await AsyncStorage.setItem('manuallyAddress', manuallyAddress);
    setUserId();
    login(tokens);
  };

  const Loader = ({ visible }) => {
    return (
      <Modal transparent={true} animationType="fade" visible={visible}>
        <View style={styles.container}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#2F80ED" />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.main_view}>
      {loading && <Loader visible={loading} />}
      <View style={{top: 92, alignItems: 'center', justifyContent: 'center'}}>
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

        <ModalComponent
          visible={locationModal}
          onClose={() => LocationFrom()}
        />

        <Text style={styles.text_3}>Enable Location </Text>
        <Text style={styles.text_4}>
          Please enable your location {'\n'} so that we can serve you better
        </Text>
        <Image source={require('../../Icons/Group.png')} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => LocationLogin()}>
          <Text style={styles.text_5}>Enable Location</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent overlay
  },
  loader: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
