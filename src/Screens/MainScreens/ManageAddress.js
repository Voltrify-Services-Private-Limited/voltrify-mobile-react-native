import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageAddress = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [popModal, setPopModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPicode] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user_id, setUser_id] = useState([]);
  const [addresId, setAddressId] = useState("");

  const ProfileEdit = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/user/address', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
        // Fields that to be updated are passed
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          landmark: landmark,
          city: city,
          state: state,
          pincode: pincode,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.log('get Address err --- ', err);
    }
    setModalVisible(!modalVisible);
    console.log("---------Address-----Data", resData)
    console.log("=========Token====", token);
  };

  const deleteAddress = async (id) => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    try {
      const response = await fetch(`http://api.voltrify.in/user/address/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
      });
      setData(data.filter(item => item.id !== id));
      if (response.ok) {
        console.log('Success', 'Item deleted successfully');
      } else {
        console.log('Error', 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Error', 'An error occurred while deleting the item');
    }

   setPopModal(!popModal);

  };

  useEffect(() => {
    getAllAddress();

  }, []);

  const getAllAddress = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/user/address', {
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
      setId(JSON.stringify(resData.data.id));
      Alert.alert(id);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };
  console.log('profile', data);

  const renderItem = ({ item }) => (
    <View style={styles.box2}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.boxText3}>Home</Text>
        <TouchableOpacity onPress={() => setPopModal(true)}>
          <Image source={require('../../Icons/horizontalIcon.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.boxText4}>
        {item.addressLine1} {item.addressLine2} {item.landmark} {item.city} {item.state} {item.pincode} {'\n'} 
        Ph: +91 {item.phoneNumber} 
      </Text>
      
      {/* ================= Delete Modal Start ========= */}
      <Modal
        animationType="none"
        transparent={true}
        visible={popModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setPopModal(!popModal);
        }}>
        <View style={styles.centeredViewPop}>
          <View style={styles.modalViewPop}>
            <TouchableOpacity
              style={[styles.buttonPop, styles.buttonClosePop]}
              onPress={() => setPopModal(!popModal)}>
              <Text style={styles.textStylePop}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonPop, styles.buttonClosePop]}
              onPress={() => deleteAddress(item.id)}>
              <Text style={styles.textStylePop}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ================= Delete Modal End ========= */}

      {/* ================= Edit Modal Start========= */}
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
            <View style={{ width: '100%', height: 190 }}>
              <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>
            <View style={{ paddingHorizontal: 30 }}>
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
                  onChangeText={x => setAddressLine1(x)}
                  value={addressLine1}
                />
              </View>
              <View style={styles.input_boxModal}>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor="#A09CAB"
                  keyboardType="default"
                  style={styles.text_7Modal}
                  onChangeText={x => setCity(x)}
                  value={city}
                />
              </View>
              <View style={styles.input_boxModal}>
                <TextInput
                  placeholder="Landmark (Optional)"
                  placeholderTextColor="#A09CAB"
                  keyboardType="default"
                  style={styles.text_7Modal}
                  onChangeText={x => setState(x)}
                  value={state}
                />
              </View>
              <View style={{ flexDirection: 'row', marginTop: 50 }}>
                <TouchableOpacity style={styles.btn1Modal}>
                  <Text style={styles.btnText1Modal}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2Modal}>
                  <Text style={styles.btnText2Modal}>Others</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.input_box2Modal}
                onPress={() => ProfileEdit()}>
                <Text style={styles.text_6Modal}>Save changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* ================= Edit Modal End========= */}
    </View>
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Address</Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.box1}>
            <View style={{ justifyContent: 'center', marginHorizontal: 5 }}>
              <Image source={require('../../Icons/addIcon.png')} />
            </View>
            <View style={{ justifyContent: 'center', marginHorizontal: 5 }}>
              <Text style={styles.boxText1}>Add New Address</Text>
            </View>
          </View>
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};
export default ManageAddress;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topHeader: {
    marginVertical: 10,
    marginHorizontal: 10,
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
  section: {
    marginHorizontal: 10,
  },
  box1: {
    width: 'auto',
    height: 54,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#FB923C',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  boxText1: {
    fontSize: 16,
    fontWeight: 400,
    color: '#000000',
  },

  box2: {
    width: 'auto',
    height: 105,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#FB923C',
    padding: 10,
    marginVertical: 10,
  },
  boxText3: {
    fontSize: 16,
    fontWeight: 600,
    color: '#161616',
    lineHeight: 19.2,
  },
  boxText4: {
    fontSize: 14,
    fontWeight: 500,
    color: '#A09CAB',
    lineHeight: 21,
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
  centeredViewPop: {
    flex: 1,
    position: "absolute",
    right: 0,
    top: 2,
    alignItems: 'center',
  },
  modalViewPop: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    width: 160,
    height: "auto",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStylePop: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16.71,
    marginVertical: 4
  },
});


