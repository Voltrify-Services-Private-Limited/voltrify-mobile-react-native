import React, { useContext, useEffect, useRef, useState } from 'react';
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


const OtpScreen = ({ route, navigation }) => {
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const { phoneNumber } = route.params;

  const otpNumber = f1 + f2 + f3 + f4 + f5 + f6;


  const VerifyOtpApi = async () => {
    try {
      let data = {
        phoneNumber: phoneNumber,
        otp: otpNumber,
      };

      // Prepare the body of the request
      const body = new URLSearchParams(data).toString();

      // Perform the fetch request
      const res = await fetch('http://api.voltrify.in/auth/user/generate-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body,
        },
      );

      // Check if the response is OK (status code 200-299)
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response as JSON
      const result = await res.json();

      console.log('otp data set res --- ', result);

      // Check if OTP generation was successful
      if (result.statusCode === 200) {
        // await AsyncStorage.setItem('userData', JSON.stringify(result.data));
        // Store tokens securely
        await AsyncStorage.setItem('access_token',JSON.stringify(result.data.accessToken.token));
        await AsyncStorage.setItem('refresh_token', JSON.stringify(result.data.refreshToken.token));
        navigation.navigate('LocationScreen', {
          tokens: result.data.accessToken.token,
        });
      } else {
        ToastAndroid.show('Something Wrong!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      ToastAndroid.show(
        'Please check the credentials or try again later!',
        ToastAndroid.BOTTOM,
      );
      console.log('Get OTP error ---- ', err);
    }
  };


  // // Login function
  // const login = async (username, password) => {
  //   try {
  //     const response = await fetch('https://your-backend.com/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await response.json();

  //     // Store tokens securely
  //     await AsyncStorage.setItem('access_token', data.access_token);
  //     await AsyncStorage.setItem('refresh_token', data.refresh_token);
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };


  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.main_view}>
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
        <Text style={styles.text_3}>Enter OTP</Text>
        <Text style={styles.text_4}>
          Please enter your OTP {'\n'}sent on your mobile number
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              ref={et1}
              value={f1}
              keyboardType="numeric"
              style={[
                styles.inputOtp,
                { borderColor: f1.length >= 1 ? '#FB923C' : '#D7D7D7' },
              ]}
              onChangeText={txt => {
                setF1(txt);
                if (txt.length >= 1) {
                  et2.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              ref={et2}
              value={f2}
              keyboardType="numeric"
              style={[
                styles.inputOtp,
                { borderColor: f2.length >= 1 ? '#FB923C' : '#D7D7D7' },
              ]}
              onChangeText={txt => {
                setF2(txt);
                if (txt.length >= 1) {
                  et3.current.focus();
                } else if (txt.length < 1) {
                  et1.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              ref={et3}
              value={f3}
              keyboardType="numeric"
              style={[
                styles.inputOtp,
                { borderColor: f3.length >= 1 ? '#FB923C' : '#D7D7D7' },
              ]}
              onChangeText={txt => {
                setF3(txt);
                if (txt.length >= 1) {
                  et4.current.focus();
                } else if (txt.length < 1) {
                  et2.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              ref={et4}
              value={f4}
              keyboardType="numeric"
              style={[
                styles.inputOtp,
                { borderColor: f4.length >= 1 ? '#FB923C' : '#D7D7D7' },
              ]}
              onChangeText={txt => {
                setF4(txt);
                if (txt.length >= 1) {
                  et5.current.focus();
                } else if (txt.length < 1) {
                  et3.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              ref={et5}
              value={f5}
              keyboardType="numeric"
              style={[
                styles.inputOtp,
                { borderColor: f5.length >= 1 ? '#FB923C' : '#D7D7D7' },
              ]}
              onChangeText={txt => {
                setF5(txt);
                if (txt.length >= 1) {
                  et6.current.focus();
                } else if (txt.length < 1) {
                  et4.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              ref={et6}
              value={f6}
              keyboardType="numeric"
              style={[
                styles.inputOtp,
                { borderColor: f6.length >= 1 ? '#FB923C' : '#D7D7D7' },
              ]}
              onChangeText={txt => {
                setF6(txt);
                if (txt.length >= 1) {
                  et6.current.focus();
                } else if (txt.length < 1) {
                  et5.current.focus();
                }
              }}
            />
          </View>
        </View>
        <TouchableOpacity style={[styles.button]} onPress={() => VerifyOtpApi()}>
          <Text style={styles.text_5}>Submit</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity >
          <Text style={styles.text_6}>Resend OTP</Text>
        </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

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
    height: 418,
    position: 'absolute',
    bottom: 0,
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
  button: {
    width: 328,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 50,
    marginVertical: 8,
    alignSelf: 'center',
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
    top: 59,
    textAlign: 'right',
    right: 46,
  },
  inputOtp: {
    width: 55,
    height: 55,
    borderRadius: 14,
    borderWidth: 1,
    top: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});