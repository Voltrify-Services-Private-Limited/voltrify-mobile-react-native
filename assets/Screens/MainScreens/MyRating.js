import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const MyRating = props => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Ratings</Text>
      </View>
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Image source={require('../../Icons/userRatingIcon.png')} />
        <Text style={styles.textStyle}>You Currently have no ratings</Text>
      </View>
    </View>
  );
};
export default MyRating;
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
});


