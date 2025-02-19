import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { AuthContext } from '../../Component/AuthContext';
import { showToast } from '../../Component/Toast';
const LocationScreen = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [location, setLocation] = useState('');
  const [enablelocation, setenbaleLocation] = useState('');
    const {login} = React.useContext(AuthContext);
    const {tokens} = route.params;
  const numberData = async () => {
    await AsyncStorage.setItem('location', addressLine1, location, landmark); 
  };
  const UserLoginApi = async () => {
    const url = 'http://api.voltrify.in/user/address';
    result = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        addressLine1: location,
        addressLine2: addressLine2,
        landmark: landmark,
      }),
    });

    response = await result.json();
    console.log('login data', response);
    Alert.alert(JSON.stringify(response));
    setVisible(true);
  };

  const loginData = () => {
    _numberLogin();
    numberData();
  };

  const _numberLogin = () => {
    if (addressLine2 == '') {
      showToast({text: 'Please enter your Phone Number.', navBar: false});
    } else if (location == '') {
      showToast({
        text: 'Correct Your Phone Number.',
        navBar: false,
      });
    } else if (landmark == '') {
      showToast({
        text: 'Correct Your Phone Number.',
        navBar: false,
      });
    } else {
      UserLoginApi();
      props.navigation.navigate('BottomTab', {
        addressLine1: location,
        addressLine2: addressLine2,
        landmark: landmark,
      });
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setenbaleLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
    console.log("======= Location Data =======",enablelocation);
    login(tokens);
  };


  return (
    <View style={styles.main_view}>
      <View style={{top: 92, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text_1}>Welcome to</Text>
        <Image source={require('../../Icons/text_logo1.png')} />
        <Text style={styles.text_1}>Your One Stop Solution</Text>
      </View>
      <View style={styles.second_view}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredViewModal}>
            <View style={styles.modalViewModal}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
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
              <View style={{width: '100%', height: 190}}>
                <MapView
                  style={{width: '100%', height: '100%'}}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </View>
              <View style={{paddingHorizontal: 30}}>
                <Text style={styles.text_3Modal}>Sagar, Madhya Pradesh</Text>
                <Text style={styles.text_4Modal}>
                  Krishna Nagar, Makronia, Sagar (M.P.) {'\n'}
                  Ph: +91 1234567890
                </Text>
                <View style={styles.input_boxModal}>
                  <TextInput
                    placeholder="House/Flat Number*"
                    placeholderTextColor="#A09CAB"
                    keyboardType="default"
                    style={styles.text_7Modal}
                    onChangeText={x => setAddressLine2(x)}
                    value={addressLine2}
                  />
                </View>
                <View style={styles.input_boxModal}>
                  <TextInput
                    placeholder="Address"
                    placeholderTextColor="#A09CAB"
                    keyboardType="default"
                    style={styles.text_7Modal}
                    onChangeText={x => setLocation(x)}
                    value={location}
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
                <View style={{flexDirection: 'row', marginTop: 50}}>
                  <TouchableOpacity style={styles.btn1Modal}>
                    <Text style={styles.btnText1Modal}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn2Modal}>
                    <Text style={styles.btnText2Modal}>Others</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.input_box2Modal}
                  onPress={() => loginData()}>
                  <Text style={styles.text_6Modal}>Save changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
        <Text style={styles.text_3}>Enable Location</Text>
        <Text style={styles.text_4}>
          Please enable your location {'\n'} so that we can serve you better
        </Text>
        <Image source={require('../../Icons/Group.png')} />
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => getLocation()}>
          <Text style={styles.text_5}>Enable Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.text_5}>Enter Location Manually</Text>
        </TouchableOpacity>
        <Text style={styles.text_4}>No, I’ll do it later</Text>
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
    color: '#00000066',
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
    top: 40,
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
