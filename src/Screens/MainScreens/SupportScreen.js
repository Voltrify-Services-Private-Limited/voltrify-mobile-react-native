import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SupportScreen = ({route}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    // URL you want to open
    const url = 'https://voltrify.in/';
    
    // Open the URL using the Linking API
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <Text style={styles.headerText}>Support</Text>
      </View>
      <View style={styles.listView}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('AccountSecond')}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/supportIcon1.png')} />
            <Text style={styles.listText}>Account</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress()}>
      <View style={styles.listItem}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/supportIcon2.png')} />
            <Text style={styles.listText}>Getting Started with Voltrify</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
      </TouchableOpacity>
   <TouchableOpacity onPress={() => handlePress()}>
   <View style={styles.listItem}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/supportIcon3.png')} />
            <Text style={styles.listText}>Payments </Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
   </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress()}>
      <View style={styles.listItem}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/supportIcon4.png')} />
            <Text style={styles.listText}>Terms & Conditions</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
      </TouchableOpacity>
     <TouchableOpacity onPress={() => handlePress()}>
     <View style={styles.listItem}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/supportIcon5.png')} />
            <Text style={styles.listText}>Privacy Policy</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </View>
     </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('FrequentlyScreen')}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/supportIcon6.png')} />
            <Text style={styles.listText}>FAQs</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('SupportContact')}>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/mobileIcon.png')} style={{width:20,height:20,marginTop:4,}} />
            <Text style={styles.listText}>Contact</Text>
          </View>
          <View style={styles.rightSide}>
            <Image source={require('../../Icons/rightArrow.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SupportScreen;

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
    marginBottom:20,
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
    fontSize: 14,
    fontWeight: 600,
    color: '#1C1B1F',
    lineHeight:16.8,
    marginTop:7,
    marginHorizontal:10,
  },
});


