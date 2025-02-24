import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import BottomTab from './BottomTab';
import YourCart from '../Screens/MainScreens/YourCart';
import OrdersDetails from '../Screens/MainScreens/OrdersDetails';
import ServiceDetails from '../Screens/MainScreens/ServiceDetails';
import EditProfile from '../Screens/MainScreens/EditProfile';
import AccountSecond from '../Screens/MainScreens/AccountSecond';
import NotificationScreen from '../Screens/MainScreens/NotificationScreen';
import ServiceSearch from '../Screens/MainScreens/ServiceSearch';
import ChangeMobile from '../Screens/MainScreens/ChangeMobile';
import MyRating from '../Screens/MainScreens/MyRating';
import FrequentlyScreen from '../Screens/MainScreens/FrequentlyScreen';
import ManageAddress from '../Screens/MainScreens/ManageAddress';
import SummaryScreen from '../Screens/MainScreens/SummaryScreen';
import PaymentScreen from '../Screens/MainScreens/PaymentScreen';
import AboutUs from '../Screens/MainScreens/AboutUs';
import ServiceViewCart from '../Screens/MainScreens/ServiceViewCart';
import CategoriseDetails from '../Screens/MainScreens/CategoriseDetails';
import DeviceCondition from '../Screens/MainScreens/DeviceCondition';


// ------ screens -----\\

const authstack = createNativeStackNavigator();

const Mainroute = () => {
  return (
    <authstack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTab">
      <authstack.Screen name="BottomTab" component={BottomTab} />
      <authstack.Screen name="YourCart" component={YourCart} />
      <authstack.Screen name="OrdersDetails" component={OrdersDetails} />
      <authstack.Screen name="ServiceDetails" component={ServiceDetails} />
      <authstack.Screen name="ServiceViewCart" component={ServiceViewCart} />
      <authstack.Screen name="EditProfile" component={EditProfile} />
      <authstack.Screen name="AccountSecond" component={AccountSecond} />
      <authstack.Screen name="NotificationScreen" component={NotificationScreen}/>
      <authstack.Screen name="ServiceSearch" component={ServiceSearch} />
      <authstack.Screen name="ChangeMobile" component={ChangeMobile} />
      <authstack.Screen name="MyRating" component={MyRating} />
      <authstack.Screen name="FrequentlyScreen" component={FrequentlyScreen} />
      <authstack.Screen name="ManageAddress" component={ManageAddress} />
      <authstack.Screen name="SummaryScreen" component={SummaryScreen} />
      <authstack.Screen name="PaymentScreen" component={PaymentScreen} />
      <authstack.Screen name="AboutUs" component={AboutUs} />
      <authstack.Screen name="CategoriseDetails" component={CategoriseDetails} />
      <authstack.Screen name="DeviceCondition" component={DeviceCondition} />
    </authstack.Navigator>
  );
};

export default Mainroute;
