import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ServiceSearch = props => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Image
            source={require('../../Icons/searchIcon.png')}
            style={{marginVertical: 10}}
          />
          <TextInput
            placeholder="Search for ‘AC Repair’"
            placeholderTextColor="#00000066"
            style={styles.searchInput}
          />
        </View>
      </View>
    </View>
  );
};
export default ServiceSearch;
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
    borderBottomWidth: 0.5,
    height: 58,
    borderBottomColor: '#A09CAB',
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

  searchBar: {
    width: 'auto',
    height: 40,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#FB923C',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft: 10,
  },
  searchInput: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00000066',
    width: '90%',
    lineHeight: 14.4,
  },
});


