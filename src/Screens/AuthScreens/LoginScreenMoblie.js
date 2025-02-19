import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../Component/Toast';
import { useNavigation } from '@react-navigation/native';
const LoginScreenMobile = (props) => {
  const navigation = useNavigation();

  const [phone_number, setPhoneNumber] = useState();

  const numberData = async () => {
    await AsyncStorage.setItem('phone_number', phone_number);
    console.log(phone_number);
  };
  const UserLoginApi = async () => {
    const url = 'http://api.voltrify.in/otp/generate-otp';
    result = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone_number: phone_number,
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
    if (phone_number == '') {
      showToast({text: 'Please enter your Phone Number.', navBar: false});
    } else if (phone_number.length < 10) {
      showToast({
        text: 'Correct Your Phone Number.',
        navBar: false,
      });
    } else {
      UserLoginApi();
      props.navigation.navigate('OtpScreen', {phoneNumber: phone_number});
    }
  };
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
        <Text style={styles.text_3}>Login Mobile Number.</Text>
        <Text style={styles.text_4}>Enter your Mobile Number to Login</Text>
        <View style={styles.input_box}>
          <Image
            source={require('../../Icons/flag_india.png')}
            style={{marginVertical: 14}}
          />
          <TextInput
            placeholder="Enter Your Mobile Number"
            placeholderTextColor="#00000066"
            keyboardType="numeric"
            maxLength={10}
            style={styles.text_7}
            onChangeText={x => setPhoneNumber(x)}
            value={phone_number}
          />
        </View>
        <TouchableOpacity style={[styles.button]} onPress={() => loginData()}>
          <Text style={styles.text_5}>Send OTP</Text>
        </TouchableOpacity>
        <View style={styles.lineBox}>
          <View style={styles.line}></View>
          <Text style={styles.lineText}>or</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.input_box2}
          onPress={() => props.navigation.navigate('LoginScreenEmail')}>
          <Image
            source={require('../../Icons/google.png')}
            style={{marginVertical: 14, marginLeft: 30}}
          />
          <Text style={styles.text_6}>Sign in with Google</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <Text style={{fontSize: 15, color: '#000'}}>
            You don't have an account ?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#FB923C'}}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreenMobile;

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
    marginLeft:4,
    width: '100%',
  },
  second_view: {
    width: '100%',
    height: 'auto',
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
    alignItems:'center'
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
    marginTop:40,
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
