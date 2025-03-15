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
import TextLogo_1 from '../../SvgImage/TextLogo_1';


// dimension

const SplashScreen = ({route}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.splash__main}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <TextLogo_1 height={100} width={100} />
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
