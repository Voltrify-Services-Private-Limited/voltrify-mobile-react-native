import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Dimensions
} from 'react-native';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get screen height to help constrain modal
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// --- Mock Loader Component ---
const Loader = ({ visible }) => {
  if (!visible) return null;
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <ActivityIndicator size="large" color="#FB923C" />
      </View>
    </Modal>
  );
};

const AddressModal = React.memo(({ modalVisible, setModalVisible, getAllAddress }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const addNewAddress = async () => {
    try {
      if (
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !addressLine1 ||
        !city ||
        !state ||
        !pincode
      ) {
        Alert.alert(
          'Missing Fields',
          'Please fill in all required fields scroll down if any left.',
        );
        return; 
      }
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); 
      
      const response = await fetch('https://api.voltrify.in/user/address', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
        }),
      });

      if (!response.ok) {
        const resData = await response.json();
        console.log('address response: ', resData);
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const resData = await response.json();
        console.log('address response: ', resData);
        setModalVisible(!modalVisible);
        // Reset Form
        setFirstName('');
        setLastName('');
        setAddressLine1('');
        setPhoneNumber('');
        setAddressLine2('');
        setLandmark('');
        setCity('');
        setState('');
        setPincode('');
        await getAllAddress();
      }
    } catch (err) {
      console.log('get Address err --- ', err);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      
      {/* FIX FOR KEYBOARD PUSHING CONTENT OFF-SCREEN:
        1. Use KeyboardAvoidingView as the root container.
        2. Set flex: 1 so it takes full screen.
        3. Use behavior 'padding' for iOS, 'height' for Android.
      */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.centeredViewModal}>
            {/* Close modal when tapping empty space */}
            <TouchableOpacity 
                style={{flex: 1, width: '100%'}} 
                activeOpacity={1} 
                onPress={() => setModalVisible(false)} 
            />

            {/* Modal Content 
               maxHeight: '80%' ensures that if the keyboard pushes it up, 
               it doesn't try to be taller than the available visible area.
            */}
            <View style={[styles.modalViewModal, { maxHeight: '85%' }]}>
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
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

                <View style={{ paddingHorizontal: 30, paddingBottom: 20, flexShrink: 1 }}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        
                        <View style={[styles.input_boxModal, { marginTop: 10 }]}>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="#A09CAB"
                            style={styles.text_7Modal}
                            onChangeText={setFirstName}
                            value={firstName}
                        />
                        </View>
                        <View style={styles.input_boxModal}>
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="#A09CAB"
                            style={styles.text_7Modal}
                            onChangeText={setLastName}
                            value={lastName}
                        />
                        </View>
                        <View style={styles.input_boxModal}>
                        <TextInput
                            placeholder="Address 1"
                            placeholderTextColor="#A09CAB"
                            style={styles.text_7Modal}
                            onChangeText={setAddressLine1}
                            value={addressLine1}
                        />
                        </View>
                        <View style={styles.input_boxModal}>
                        <TextInput
                            placeholder="Address 2"
                            placeholderTextColor="#A09CAB"
                            style={styles.text_7Modal}
                            onChangeText={setAddressLine2}
                            value={addressLine2}
                        />
                        </View>
                        <View style={styles.input_boxModal}>
                        <TextInput
                            placeholder="Phone"
                            placeholderTextColor="#A09CAB"
                            keyboardType="number-pad"
                            maxLength={10}
                            style={styles.text_7Modal}
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
                        />
                        </View>

                        <View style={styles.input_boxModal}>
                        <TextInput
                            placeholder="Landmark"
                            placeholderTextColor="#A09CAB"
                            style={styles.text_7Modal}
                            onChangeText={setLandmark}
                            value={landmark}
                        />
                        </View>
                        <View style={styles.input_boxModal}>
                        <TextInput
                            placeholder="City"
                            placeholderTextColor="#A09CAB"
                            style={styles.text_7Modal}
                            onChangeText={setCity}
                            value={city}
                        />
                        </View>
                        <View style={styles.input_boxModal}>
                        <TextInput
                            placeholder="State"
                            placeholderTextColor="#A09CAB"
                            style={styles.text_7Modal}
                            onChangeText={setState}
                            value={state}
                        />
                        </View>
                        <View style={[styles.input_boxModal, { marginBottom: 20 }]}>
                        <TextInput
                            placeholder="Pincode"
                            placeholderTextColor="#A09CAB"
                            maxLength={6}
                            keyboardType="number-pad"
                            style={styles.text_7Modal}
                            onChangeText={setPincode}
                            value={pincode}
                        />
                        </View>
                        
                        <TouchableOpacity
                            style={styles.input_box2Modal}
                            onPress={async () => await addNewAddress()}>
                            <Text style={styles.text_6Modal}>Save changes</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const SelectAddress = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [popModal, setPopModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addresId, setAddressId] = useState('');
  
  // Safety check for route params
  const condition_Id = route?.params?.condition_Id;
  
  const [selectedIndex, setSelectedIndex] = useState(null);

  const deleteAddress = async id => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData);
    try {
      const response = await fetch(
        `http://api.voltrify.in/user/address/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setData(data.filter(item => item.id !== id));
      if (response.ok) {
        console.log('Success', 'Item deleted successfully');
      } else {
        console.log('Error', 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setPopModal(!popModal);
  };

  const getAllAddress = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData);
      
      if(condition_Id) {
        await AsyncStorage.setItem('conditionId', condition_Id);
      }
      
      const response = await fetch('http://api.voltrify.in/user/address', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resData = await response.json();
      setData(resData.data);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  }, [condition_Id]);

  useEffect(() => {
    getAllAddress();
  }, [getAllAddress]);

  const createOrder = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem('access_token');
      const coupons_code = await AsyncStorage.getItem('coupanCode');
      const service_description = await AsyncStorage.getItem('service_description');
      const timeSlot = await AsyncStorage.getItem('time_slot');
      const dateSlot = await AsyncStorage.getItem('slot_no_day');
      const cart_id = await AsyncStorage.getItem('cartId');
      const itemCount = await AsyncStorage.getItem('itemCount');
      
      const token = JSON.parse(userData);
      const time = timeSlot ? JSON.parse(timeSlot) : null;
      const date = dateSlot ? JSON.parse(dateSlot) : null;
      
      const url = 'https://api.voltrify.in/user/orders';
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: cart_id,
          address_id: addresId,
          condition_id: condition_Id,
          time_slot: time,
          coupons_code: coupons_code,
          payment_mode: 'online',
          service_description: service_description,
          date: date,
          deviceCount: itemCount ? parseInt(itemCount) : 1
        }),
      });

      const response = await result.json();
      console.log('order data========', response);
      if(response?.data?.payment_order_id){
          navigation.navigate('PaymentScreen', {
            order_id: response.data.payment_order_id,
          });
      } else {
        Alert.alert("Error", "Could not create order");
      }

    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const seletAddressId = async id => {
    await AsyncStorage.setItem('addressId', id.toString());
    setAddressId(id);
  };

  const handleSelectItem = index => {
    setSelectedIndex(index);
  };

  const memoizedModal = useMemo(
    () => (
      <AddressModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        getAllAddress={getAllAddress}
      />
    ),
    [modalVisible, getAllAddress],
  );

  const renderItem = ({ item, index }) => {
    const borderColor = index === selectedIndex ? '#1fc435' : '#FB923C';
    return (
      <View style={[styles.box2, { borderColor: borderColor }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.boxText3}>{`${item.firstName} ${item.lastName}`}</Text>
          <TouchableOpacity onPress={() => setPopModal(true)}>
             {/* Text placeholder for image asset */}
             <Text style={{fontSize: 20, color: '#FB923C', paddingHorizontal: 5}}>•••</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            seletAddressId(item.id);
            handleSelectItem(index);
          }}>
          <Text style={styles.boxText4}>
            {item.addressLine1} {item.addressLine2} {item.landmark} {item.city}{' '}
            {item.state} {item.pincode} {'\n'}
            Ph: +91 {item.phoneNumber}
          </Text>
        </TouchableOpacity>

        {/* Delete/Edit Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={popModal}
          onRequestClose={() => setPopModal(!popModal)}>
          <TouchableOpacity 
             style={styles.centeredViewPop} 
             activeOpacity={1} 
             onPress={() => setPopModal(false)}
          >
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
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  function handleAddAddress() {
    setModalVisible(true);
  }

  return (
    <>
      {memoizedModal}
      <SafeAreaView style={styles.mainView}>
        {loading && <Loader visible={loading} />}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
             {/* Text placeholder for image asset */}
             <Text style={{color: 'white', fontWeight: 'bold'}}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Select Address</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={handleAddAddress}>
            <View style={styles.box1}>
              <View style={{ justifyContent: 'center', marginHorizontal: 5 }}>
                {/* Text placeholder for image asset */}
                <Text style={{fontSize: 24, color: '#FB923C', lineHeight: 28}}>+</Text>
              </View>
              <View style={{ justifyContent: 'center', marginHorizontal: 5 }}>
                <Text style={styles.boxText1}>Add New Address</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <View style={{flex: 1}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.input_box2}
            onPress={() => createOrder()}>
            <Text style={styles.text_6Modal}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SelectAddress;

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
    fontWeight: '700',
    lineHeight: 40,
    marginHorizontal: 20,
    color: '#FB923C',
  },
  section: {
    marginHorizontal: 10,
    flex: 1,
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
    alignItems: 'center'
  },
  boxText1: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  box2: {
    width: 'auto',
    minHeight: 125,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#FB923C',
    padding: 10,
    marginVertical: 10,
  },
  boxText3: {
    fontSize: 16,
    fontWeight: '600',
    color: '#161616',
    lineHeight: 19.2,
  },
  boxText4: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A09CAB',
    lineHeight: 21,
    marginTop: 5,
  },
  
  // --- MODAL STYLES ---
  centeredViewModal: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns modal to bottom
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalViewModal: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // Note: paddingBottom handled by ScrollView contentContainerStyle 
    // to allow scrolling all the way down
  },
  input_boxModal: {
    width: '100%',
    height: 45,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  input_box2Modal: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text_6Modal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  text_7Modal: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    width: '100%',
    height: '100%',
  },
  
  // --- POPUP STYLES ---
  centeredViewPop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'flex-end', 
    paddingRight: 20
  },
  modalViewPop: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    width: 160,
    elevation: 5,
    marginTop: -100
  },
  textStylePop: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 4,
  },
  
  // --- BOTTOM BUTTON ---
  bottomContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  input_box2: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});