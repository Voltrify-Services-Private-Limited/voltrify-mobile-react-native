import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const AccountSecond = props => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>I want to change my mobile number</Text>
        <Image source={require('../../Icons/rightArrow.png')} />
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>How can I check my saved addresses</Text>
        <Image source={require('../../Icons/rightArrow.png')} />
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>I want to change my email</Text>
        <Image source={require('../../Icons/rightArrow.png')} />
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          How can I see my saved payment methods
        </Text>
        <Image source={require('../../Icons/rightArrow.png')} />
      </View>
    </View>
  );
};

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
  listItem: {
    borderBottomWidth: 0.2,
    marginHorizontal: 10,
    borderBottomColor:'#A09CAB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  listText: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 14,
    color: '#1C1B1F',
  },
});

export default AccountSecond;
