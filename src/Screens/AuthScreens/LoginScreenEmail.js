import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const LoginScreenEmail = (props) => {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={styles.main_view}>
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
        <Text style={styles.text_3}>Login via Email</Text>
        <Text style={styles.text_4}>Enter your Email to Login/Signup</Text>
        <View style={styles.input_box}>
          <TextInput
            placeholder="Enter Your Email"
            placeholderTextColor="#00000066"
            style={styles.text_7}
          />
        </View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => props.navigation.navigate('OtpScreen')}>
          <Text style={styles.text_5}>Send OTP</Text>
        </TouchableOpacity>
        <View style={styles.lineBox}>
          <View style={styles.line}></View>
          <Text style={styles.lineText}>or</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.input_box2}
          onPress={() => props.navigation.navigate('LoginScreenMobile')}>
          <Text style={styles.text_6}>Signin with Mobile Number</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreenEmail;

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
    position:'absolute',
    bottom:0,
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#ffffff',
  },
  text_7: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'left',
    color: '#000',
    marginLeft:4,
    width: '100%',
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
