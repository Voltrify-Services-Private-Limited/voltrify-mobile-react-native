import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';

import UserIcon from "../Icons/nav/user.js";
import HomeIcon from "../Icons/nav/home.js";
import SupportIcon from "../Icons/nav/support.js";
import CartIcon from "../Icons/nav/cart.js";
import ServiceIcon from "../Icons/nav/service.js";

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
            const color = focused
              ? "#FB923C"
              : "#A09CAB";
            return <HomeIcon color={color} />;
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
            const color = focused
              ? "#FB923C"
              : "#A09CAB";
            return <ServiceIcon color={color} />;
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
            const color = focused
              ? "#FB923C"
              : "#A09CAB";
            return <CartIcon color={color} />;
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
            const color = focused
              ? "#FB923C"
              : "#A09CAB";
            return <SupportIcon color={color} />;
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
            const color = focused
              ? "#FB923C"
              : "#A09CAB";
            return <UserIcon color={color} />;
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
