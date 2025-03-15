import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';



import DashboardScreen from '../Screens/MainScreens/DashboardScreen';
import ServiceScreen from '../Screens/MainScreens/ServiceScreen';
import OrderScreen from '../Screens/MainScreens/OrderScreen';
import SupportScreen from '../Screens/MainScreens/SupportScreen';
import AccountScreen from '../Screens/MainScreens/AccountScreen';

// ------ screens -----\\

const mainstack = createBottomTabNavigator();

const BottomTab = (props) => {
  return (
    <mainstack.Navigator
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 73,
          paddingHorizontal: 10,
        },
      }}
      initialRouteName="Home">
      <mainstack.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('../Icons/home.png')
              : require('../Icons/home3.png');
            return <Image source={icon} />;
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarActiveTintColor: '#FB923C',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 13.2,
          },
        }}
      />
      <mainstack.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('../Icons/serviceActive.png')
              : require('../Icons/service.png');
            return <Image source={icon} />;
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarActiveTintColor: '#FB923C',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 13.2,
          },
        }}
      />
      <mainstack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('../Icons/orderActive.png')
              : require('../Icons/oders.png');
            return <Image source={icon} />;
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarActiveTintColor: '#FB923C',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 13.2,
          },
        }}
      />
      <mainstack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('../Icons/supportActive.png')
              : require('../Icons/support2.png');
            return <Image source={icon} />;
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarActiveTintColor: '#FB923C',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 13.2,
          },
        }}
      />
      <mainstack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('../Icons/accountActive.png')
              : require('../Icons/account.png');
            return <Image source={icon} />;
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarActiveTintColor: '#FB923C',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 13.2,
          },
        }}
      />
    </mainstack.Navigator>
  );
};

export default BottomTab;
