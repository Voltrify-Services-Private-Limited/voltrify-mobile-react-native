import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState('');

  ////////////// Payment Methods ///////////////

  const paymentHandle = async () => {
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: '', // Your api key
      amount: '5000',
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software'
      },
      theme: { color: '#F37254' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  const createOrder = async () => {
    const userData = await AsyncStorage.getItem('access_token');
    const time_slot = await AsyncStorage.getItem('time_slot');
    const coupons_code = await AsyncStorage.getItem('coupanCode');
    const service_description = await AsyncStorage.getItem('service_description');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    const url = 'http://api.voltrify.in/user/orders';
    result = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, depending on your API requirements
      },
      body: JSON.stringify({
        cart_id: "69827782-308b-4a93-81e3-2d450ee0b224",
        address_id: "5923974f-b7de-4fb0-9f2a-53ca554df5c0",
        condition_id: "e26ab9a8-dc0b-47da-8ea3-e8cde9d3bc64",
        time_slot: "02:00 PM",
        coupons_code: "WELCOME",
        payment_mode: "online",
        service_description: "damaged",
      }),
    });

    response = await result.json();
    console.log('order data========', response);
    Alert.alert(JSON.stringify(response));
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Payment Methods</Text>
      </View>
      <View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.text_1}>Debit or Credit Card</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.paymentList}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../Icons/debit.png')} />
                <Text style={styles.text_2}>Add a card</Text>
              </View>
              <Image source={require('../../Icons/rightArrow.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.text_1}>Wallet</Text>
          <View style={styles.paymentList}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../Icons/paytm.png')} />
              <Text style={styles.text_2}>Paytm</Text>
            </View>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
          <View style={styles.paymentList}>
          <TouchableOpacity onPress={() => createOrder()}>
          <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../Icons/phonePe.png')} />
              <Text style={styles.text_2}>Phone Pe</Text>
            </View>
          </TouchableOpacity>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
          <View style={styles.paymentList}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../Icons/googlePe.png')} />
              <Text style={styles.text_2}>Google Pe</Text>
            </View>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.text_1}>UPI</Text>
          <View style={styles.paymentList}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../Icons/upi.png')} />
              <Text style={styles.text_2}>Pay via UPI ID</Text>
            </View>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.text_1}>Net Banking</Text>
          <View style={styles.paymentList}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../Icons/bank.png')} />
              <Text style={styles.text_2}>See all banks</Text>
            </View>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.text_1}>Pay after service</Text>
          <View style={styles.paymentList}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../Icons/onlinePe.png')} />
              <Text style={styles.text_2}>Pay online after service</Text>
            </View>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
          <View style={styles.paymentList}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../Icons/cashPe.png')} />
              <Text style={styles.text_2}>Pay cash after service</Text>
            </View>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
            <Text style={styles.text_3}>Add a card</Text>
            <Text style={styles.text_4}>Enter your card details</Text>
            <View style={styles.input_box}>
              <Image
                source={require('../../Icons/debit.png')}

              />
              <TextInput
                placeholder="Card Number"
                placeholderTextColor="#A09CAB"
                keyboardType="numeric"
                maxLength={10}
                style={styles.text_7}
                onChangeText={x => setNumber(x)}
                value={number}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 328,
                marginTop: 50,
              }}>
              <View style={styles.input_box3}>
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor="#A09CAB"
                  keyboardType="numeric"
                  maxLength={10}
                  style={styles.text_7}
                  onChangeText={x => setNumber(x)}
                  value={number}
                />
              </View>
              <View style={styles.input_box3}>
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor="#A09CAB"
                  keyboardType="numeric"
                  maxLength={10}
                  style={styles.text_7}
                  onChangeText={x => setNumber(x)}
                  value={number}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Text style={{ fontSize: 10 }}>
                Save the card details (except CVV) securely.{'  '}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#FB923C',
                    fontSize: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Know more
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.input_box2}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.text_6}>Save details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default PaymentScreen;
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
  paymentList: {
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  text_1: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 22,
    color: '#000',
  },
  text_2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 16.8,
    color: '#000',
    marginTop: 6,
    marginHorizontal: 10,
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },

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
  text_7: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'left',
    color: '#00000066',

    width: '100%',
  },
  second_view: {
    width: '100%',
    height: 418,
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
  },
  input_box: {
    width: 328,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input_box3: {
    width: '49%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    flexDirection: 'row',
  },
  input_box2: {
    width: 328,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    marginVertical: 40,
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 328,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 50,
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
  lineBox: {
    width: 328,
    height: 14,
    top: 36,
    marginVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  lineText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#00000033',
    lineHeight: 14.4,
    marginHorizontal: 5,
  },

  line: {
    width: 145,
    height: 1,
    top: 2,
    backgroundColor: '#00000033',
    marginVertical: 16,
    alignItems: 'center',
  },
});


