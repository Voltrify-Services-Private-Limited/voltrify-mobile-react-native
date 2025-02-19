import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ----------screens ----------------//

import SplashScreen from '../Screens/AuthScreens/SplashScreen';
import LoginScreenMobile from '../Screens/AuthScreens/LoginScreenMoblie';
import LoginScreenEmail from '../Screens/AuthScreens/LoginScreenEmail';
import RegisterScreen from '../Screens/AuthScreens/RegisterScreen';
import LocationScreen from '../Screens/AuthScreens/LocationScreen';
import OtpScreen from '../Screens/AuthScreens/OtpScreen';
import ResendOtp from '../Screens/AuthScreens/ResendOtp';
// ------ screens -----\\

const authstack = createNativeStackNavigator();

const Authroute = () => {
  return (
    <authstack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginScreenMobile">
      <authstack.Screen name="SplashScreen" component={SplashScreen} />
      <authstack.Screen
        name="LoginScreenMobile"
        component={LoginScreenMobile}
      />
      <authstack.Screen name="RegisterScreen" component={RegisterScreen} />
      <authstack.Screen name="LoginScreenEmail" component={LoginScreenEmail} />
      <authstack.Screen name="LocationScreen" component={LocationScreen} />
      <authstack.Screen name="OtpScreen" component={OtpScreen} />
      <authstack.Screen name="ResendOtp" component={ResendOtp} />
    </authstack.Navigator>
  );
};

export default Authroute;
