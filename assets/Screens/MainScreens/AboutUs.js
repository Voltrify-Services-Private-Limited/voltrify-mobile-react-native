import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const AboutUs = props => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  // Geocoder.init('AIzaSyADCbG2wOVyGFLwnuHQ5XJCo67OlD_Y3YM');

  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ latitude, longitude });
  //       getAddressFromCoordinates(latitude, longitude);
  //     },
  //     (error) => console.warn(error.message),
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };

  // const getAddressFromCoordinates = (latitude, longitude) => {
  //   Geocoder.from(latitude, longitude)
  //     .then((json) => {
  //       const address = json.results[0].formatted_address;
  //       setAddress(address);
  //     })
  //     .catch((error) => console.warn(error));
  // };
  
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
        {/* <View>
      <TouchableOpacity onPress={() => getLocation()} >
        <Text>Get Location</Text>
      </TouchableOpacity>
      {location && (
        <Text>
          address: {address}
        </Text>
      )}
      
      {address && <Text>Address: {address}</Text>}
    </View> */}
      </View>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Image source={require('../../Icons/logo2.png')} />
      </View>
      <Text style={styles.text_1}>
        Voltrify Services Pvt Ltd is an upcoming online platform dedicated to
        revolutionizing the electronic and electrical repair industry. We're
        building a network of skilled technicians and partnering with local
        repair shops to provide fast, reliable, and convenient repair services
        right at your doorstep.
      </Text>
      <View style={{marginVertical: 20}}>
        <Text style={styles.text_2}>How It Works</Text>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text_3}>Quick Response</Text>
          <Text style={styles.text_4}>
            Our technicians will reach you within 10-30 minutes of your service
            request.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text_3}>On-Site Service</Text>
          <Text style={styles.text_4}>
            Enjoy the convenience of professional repairs right at your
            doorstep.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text_3}>Wide Network</Text>
          <Text style={styles.text_4}>
            We're partnering with local repair shops to provide comprehensive
            service coverage.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text_5}>Contact Us</Text>
          <Text style={styles.text_6}>info@voltrifyservices.com</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text_5}>Coverage</Text>
          <Text style={styles.text_6}>Gwalior, Madhya Pradesh, India</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text_5}>Website</Text>
          <Text style={styles.text_6}>https://voltrify.in/</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text_5}>Follow Us</Text>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../../Icons/linked.png')} />
            <Image source={require('../../Icons/instagram.png')} />
            <Image source={require('../../Icons/twitter.png')} />
            <Image source={require('../../Icons/facebook.png')} />
          </View>
        </View>
   
      </View>
    </View>
  );
};
export default AboutUs;
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
  text_1: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21,
    color: '#000000',
    textAlign: 'justify',
  },

  text_2: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 22,
    color: '#FB923C',
  },
  text_3: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 16.8,
    color: '#000000',
  },
  text_4: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    color: '#A09CAB',
  },
  text_5: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
    color: '#A09CAB',
  },
  text_6: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 16.8,
    color: '#000000',
  },
});


