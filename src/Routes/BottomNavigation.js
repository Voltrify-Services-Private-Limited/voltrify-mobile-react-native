import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BottomTab from './BottomTab';

const BottomNavigation =(props) => {
  return (
    <View style={styles.mainView}>
     <BottomTab/>
    </View>
  );
};
export default BottomNavigation;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});


