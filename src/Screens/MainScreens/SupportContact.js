import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const SupportContact = ({route}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Contact</Text>
      </View>
      <View>
        <View style={styles.card}>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.lable}>Contact No. : </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.value}>07514508462 (09:00 AM - 06:00 PM)</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.lable}>Email Id : </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.value}>complaint@voltrify.in</Text>
          </View>
        </View>
        <View
          style={[
            styles.card,
            {flexDirection: 'none', height: 'auto', paddingVertical: 10},
          ]}>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.lable}>Office Address : </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.value}>Basement, Shri sai kala building, Char shahar ka naka, Gwalior, Madhya Pradesh, India</Text>
          </View>
        </View>
        
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
    borderBottomColor: '#A09CAB',
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

  textStyle: {
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 13,
    textAlign: 'center',
    color: '#161616',
  },
  card: {
    width: '100%',
    height: 50,
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FB923C',
  },
  lable: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    fontSize: 12,
    fontWeight: 500,
    color: '#000',
  },
});

export default SupportContact;
