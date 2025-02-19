import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ChangeMobile = props => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>I want to change my mobile number</Text>
      <Text style={styles.text2}>
        You can change your mobile number from the profile section after {'\n'}
        verifying it with OTP
      </Text>
      <TouchableOpacity style={styles.buttonChange}>
        <Text style={styles.btnText}>Change mobile number</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 5,
          justifyContent: 'space-between',
          marginVertical:20,
        }}>
        <Text style={styles.text3}>Was this article helpful?</Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../Icons/liketumb.png')}
            style={{marginHorizontal: 4}}
          />
          <Image
            source={require('../../Icons/unliketumb.png')}
            style={{marginHorizontal: 4}}
          />
        </View>
      </View>
    </View>
  );
};
export default ChangeMobile;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
  },
  topHeader: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
  },
  backButton: {
    width: 32,
    height: 32,
    backgroundColor: '#FB923C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 14,
    height: 40,
  },
  text2: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 15,
    height: 40,
  },
  buttonChange: {
    width: 136,
    height: 26,
    backgroundColor: '#FB923C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  btnText: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 14,
    color: '#FFFFFF',
  },
  text3: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 12,
    color: '#1C1B1F',
  },
});


