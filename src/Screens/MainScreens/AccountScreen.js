import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AuthContext} from '../../Component/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = ({route}) => {
  const {logout} = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  useEffect(() => {
    getProfile();
    console.log("-------------user Data",user)
  }, []);
 const getProfile = async () => {
   try {
     const userData = await AsyncStorage.getItem('access_token');
     const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

     const response = await fetch('http://api.voltrify.in/user', {
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
     setUser(JSON.stringify(resData.data));
   } catch (err) {
     console.log('get profile err --- ', err);
   }
 };
  console.log('profile', user);

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <Text style={styles.headerText}>Account</Text>
      </View>
      <View style={styles.listView}>
        <View style={styles.listItem}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/user.png')} />
            <View style={{justifyContent: 'center'}}>
              {/* <Text style={styles.userText}>{user.data.firstName}</Text>
              <Text style={styles.numberText}>+91 {user.data.phoneNumber}</Text> */}
            </View>
          </View>
          <View style={styles.rightSide}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfile')}>
              <Image source={require('../../Icons/edit.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('MyRating')}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/accountIcon1.png')} />
            <Text style={styles.listText}>My Ratings</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('ManageAddress')}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/accountIcon2.png')} />
            <Text style={styles.listText}>Manage Addresses</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.listItem}>
          <TouchableOpacity
            style={styles.rightSide}
            onPress={() => navigation.navigate('PaymentScreen')}>
            <Image source={require('../../Icons/accountIcon3.png')} />
            <Text style={styles.listText}>Manage Payment Methods </Text>
          </TouchableOpacity>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
        <View style={styles.listItem}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/accountIcon4.png')} />
            <Text style={styles.listText}>Settings</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('AboutUs')}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/supportIcon2.png')} />
            <Text style={styles.listText}>About Voltrify</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.giftBox}>
        <View style={styles.left}>
          <Text style={styles.giftHeading}>Refer & Earn ₹100</Text>
          <Text style={styles.giftText}>
            Get ₹100 when your friend completes their {'\n'} first order.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            <TouchableOpacity style={styles.referButton}>
              <Text style={styles.buttonText}>Refer now</Text>
            </TouchableOpacity>
            <Text style={styles.referViewText}>View T&C*</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Image
            source={require('../../Icons/gift.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
        <Image source={require('../../Icons/logout.png')} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AccountScreen;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  topHeader: {
    marginVertical: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#FB923C',
    marginBottom: 20,
  },
  listView: {
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  rightSide: {
    flexDirection: 'row',
  },
  listText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
    color: '#1C1B1F',
    lineHeight: 16.8,
    marginTop: 7,
    marginHorizontal: 10,
  },
  editButton: {
    width: 45,
    height: 45,
    backgroundColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },

  userText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1C1B1F',
    lineHeight: 24,
    marginHorizontal: 10,
  },
  numberText: {
    fontSize: 12,
    fontWeight: 400,
    color: '#A09CAB',
    lineHeight: 20,
    marginHorizontal: 10,
  },
  giftBox: {
    marginHorizontal: 10,
    width: 'auto',
    height: 130,
    borderRadius: 14,
    marginTop: 26,
    backgroundColor: '#FFE8D5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  right: {
    width: 140,
  },
  left: {
    width: 229,
  },
  giftHeading: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 19.2,
    color: '#1C1B1F',
  },
  giftText: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 14.4,
    color: '#1C1B1F',
  },
  referButton: {
    width: 80,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#FB923C',
    marginRight: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 14.4,
    color: '#ffffff',
    textAlign: 'center',
  },
  referViewText: {
    fontSize: 8,
    fontWeight: 400,
    color: '#1C1B1F',
    textDecorationLine: 'underline',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  logoutBtn: {
    width: 'auto',
    height: 54,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FB923C',
    borderRadius: 14,
    marginVertical: 26,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#FB923C',
    marginHorizontal: 5,
  },
});
