import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Component/AuthContext';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = props => {
  const {login} = React.useContext(AuthContext);
  const navigation = useNavigation();
  // State hooks to store input values
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(false);

  // Handle form submission

  const handleRegister = async () => {
    try {
      if (
        firstName == '' ||
        email == '' ||
        lastName == '' ||
        phoneNumber == ''
      ) {
        ToastAndroid.show('Some fields are empty!', ToastAndroid.BOTTOM);
      } else {
        let data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
        };

        // Prepare the body of the request
        const body = new URLSearchParams(data).toString();

        // Perform the fetch request
        const res = await fetch('http://api.voltrify.in/auth/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body,
        });

        // Parse the response as JSON
        const result = await res.json();

        console.log('opt res --- ', result);

        // Check if registration was successful and handle OTP
        if (result.statusCode === 201) {
          generateOtp();
        } else {
          ToastAndroid.show('Please check the number!', ToastAndroid.BOTTOM);
        }
      }
    } catch (err) {
      ToastAndroid.show(
        'Please check the credentials or try again later!',
        ToastAndroid.BOTTOM,
      );
      console.log('Get OTP error ---- ', err);
    }
  };

  const generateOtp = async () => {
    try {
      let data = {
        phone_number: phoneNumber,
      };

      // Prepare the body of the request
      const body = new URLSearchParams(data).toString();

      // Perform the fetch request
      const res = await fetch('http://api.voltrify.in/otp/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });

      // Check if the response is OK (status code 200-299)
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response as JSON
      const result = await res.json();

      console.log('otp data set res --- ', result);

      // Check if OTP generation was successful
      if (result.statusCode === 201) {
        navigation.navigate('OtpScreen', {
          phoneNumber,
        });
      } else {
        ToastAndroid.show('Please check the number!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      ToastAndroid.show(
        'Please check the credentials or try again later!',
        ToastAndroid.BOTTOM,
      );
      console.log('Get OTP error ---- ', err);
    }
  };

  // const generateOtp = async () => {
  //   await fetch('http://api.voltrify.in/otp/generate-otp', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       phone_number: phoneNumber,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       navigation.navigate('OtpScreen');
  //     })
  //     .done();
  // };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.main_view}>
      <View style={{top: 92, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text_1}>Welcome to</Text>
        <Image source={require('../../Icons/text_logo1.png')} />
        <Text style={styles.text_1}>Your One Stop Solution</Text>
      </View>
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
          <Text style={styles.text_3}>Registration</Text>
          <Text style={styles.text_4}>Enter your details</Text>
          <View style={styles.input_box}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#00000066"
              keyboardType="default"
              style={styles.text_7}
              onChangeText={x => setFirstName(x)}
              value={firstName}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#00000066"
              keyboardType="default"
              style={styles.text_7}
              onChangeText={x => setLastName(x)}
              value={lastName}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#00000066"
              keyboardType="email-address"
              style={styles.text_7}
              onChangeText={x => setEmail(x)}
              value={email}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#00000066"
              keyboardType="numeric"
              maxLength={10}
              style={styles.text_7}
              onChangeText={x => setPhoneNumber(x)}
              value={phoneNumber}
            />
          </View>
          <TouchableOpacity
            style={styles.input_box2}
            onPress={() => handleRegister()}>
            <Text style={styles.text_6}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
  text_7: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'left',
    color: '#000',
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 30,
    // alignItems: 'center',
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
    width: '100%',
    alignItem: 'center',
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
    width: '100%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  input_box3: {
    width: '49%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input_box2: {
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
    marginTop: 40,
    backgroundColor: '#FB923C',
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
    color: '#fff',
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

  btn1: {
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
  btn2: {
    width: 60,
    height: 33,
    borderWidth: 1,
    borderColor: '#FB923C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  btnText1: {
    fontSize: 12,
    fontWeight: 500,
    color: '#ffffff',
    lineHeight: 14.4,
  },
  btnText2: {
    fontSize: 12,
    fontWeight: 500,
    color: '#FB923C',
    lineHeight: 14.4,
  },
});
