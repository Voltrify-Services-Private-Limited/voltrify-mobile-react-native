import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  StatusBar,
  Image,
  Alert,
} from 'react-native';


// dimension

const SplashScreen = ({route}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.splash__main}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Image
        source={require('../../Icons/icon_1.png')}
        style={{
          height: 100,
          width: '100%',
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splash__main: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
