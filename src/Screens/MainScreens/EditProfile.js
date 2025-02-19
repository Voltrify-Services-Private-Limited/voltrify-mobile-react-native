import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditProfile = ({ route }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const ProfileEdit = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/user', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
        // Fields that to be updated are passed
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
    navigation.goBack();
    console.log("--------------Data",resData )
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.userCard} onPress={() => props.navigation.navigate('AboutUs')}>
          <Image source={require('../../Icons/userImage.png')} />
          <View style={styles.editBtn}>
            <Image source={require('../../Icons/edit.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 5, marginVertical: 5 }}>
        <Text style={styles.lableText}>First Name</Text>
        <TextInput
          keyboardType="default"
          style={styles.inputStyle}
          onChangeText={x => setFirstName(x)}
          value={firstName} />
      </View>
      <View style={{ marginHorizontal: 5, marginVertical: 5 }}>
        <Text style={styles.lableText}>Last Name</Text>
        <TextInput
          keyboardType="default"
          style={styles.inputStyle}
          onChangeText={x => setLastName(x)}
          value={lastName} />
      </View>
      <View style={{ marginHorizontal: 5, marginVertical: 5 }}>
        <Text style={styles.lableText}>Email</Text>
        <TextInput
          keyboardType="default"
          style={styles.inputStyle}
          onChangeText={x => setEmail(x)}
          value={email} />
      </View>
      <TouchableOpacity style={styles.buttonBottom} onPress={() => ProfileEdit()}>
        <Text style={styles.buttonText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    height: '100%',
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
  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  userCard: {
    width: 127,
    height: 127,
    marginVertical: 30,
  },
  inputStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#FB923C',
    color: '#000',
    fontSize: 18,
    fontWeight: 600,
  },

  lableText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
    color: '#A09CAB',
  },

  buttonBottom: {
    width: 'auto',
    height: 54,
    borderWidth: 1,
    borderColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    top: 350,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
  },
});

export default EditProfile;
