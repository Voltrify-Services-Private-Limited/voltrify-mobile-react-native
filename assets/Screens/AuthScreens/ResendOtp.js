import React from 'react';
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

const ResendOtp = props => {
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
        <Text style={styles.text_3}>Enter OTP</Text>
        <Text style={styles.text_4}>
          Please enter your OTP {'\n'}sent on your mobile number
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              keyboardType="numeric"
              style={styles.inputOtp}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              keyboardType="numeric"
              style={styles.inputOtp}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              keyboardType="numeric"
              style={styles.inputOtp}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              placeholderTextColor="black"
              maxLength={1}
              keyboardType="numeric"
              style={styles.inputOtp}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => props.navigation.navigate('LocationScreen')}>
          <Text style={styles.text_5}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('ResendOtp')}>
          <Text style={styles.text_6}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResendOtp;

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
  input_box: {
    width: 50,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    top: 40,
    marginHorizontal: 8,
    alignItems: 'center',
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
    color: '#A09CAB',
    lineHeight: 19.2,
    top: 59,
    textAlign: 'right',
    right: 46,
  },
  inputOtp: {
    fontSize: 26,
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
    lineHeight: 31,
  },
});

