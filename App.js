import React, {useReducer, useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/Component/AuthContext';


import SplashScreen from './src/Screens/AuthScreens/SplashScreen';
import Authroute from './src/Routes/AuthRoute';
import Mainroute from './src/Routes/MainRoute';

const App = () => {
  let initialState = {
    isLoading: true,
    userToken: null,
  };

  // Auth Reducer.

  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.userToken,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userToken: null,
        };
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.userToken,
        };
    }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Auth Memo.

  const authContext = useMemo(() => ({
    login: async userToken => {
      try {
        await AsyncStorage.setItem('access_token', JSON.stringify(userToken));
        dispatch({type: 'LOGIN', userToken});
      } catch (err) {
        console.log('log ---- err ', err);
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('access_token');
        dispatch({type: 'LOGOUT'});
      } catch (err) {}
    },
  }));

  // Retrieve Token.

  useEffect(() => {
    const retrieve_Token = async () => {
      const userToken = await AsyncStorage.getItem('access_token');
      dispatch({
        type: 'RETRIEVE_TOKEN',
        userToken: userToken ? JSON.parse(userToken) : null,
      });
    };
    setTimeout(() => {
      retrieve_Token();
    }, 2000);
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.isLoading ? (
          <SplashScreen />
        ) : authState.userToken == null ? (
          <Authroute />
        ) : (
          <Mainroute />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';

// const App = () => {
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const startPayment = () => {
//     var options = {
//       description: 'Purchase Description',
//       image: 'https://your-logo-url.com',
//       currency: 'INR',
//       key: 'rzp_test_hlMav0jYthWSud', // Your Razorpay API Key
//       amount: '50000', // Amount in paise (50000 = INR 500.00)
//       name: 'Your Company Name',
//       prefill: {
//         email: 'customer@example.com',
//         contact: '9123456789',
//         name: 'Customer Name'
//       },
//       theme: { color: '#F37254' }
//     };

//     RazorpayCheckout.open(options).then((data) => {
//       // Handle success
//       setPaymentSuccess(true);
//       console.log('Payment Successful:', data);
//     }).catch((error) => {
//       // Handle error
//       console.error('Payment Failed:', error);
//       setPaymentSuccess(false);
//     });
//   };

//   return (
//     <View>
//       <Button title="Pay with Razorpay" onPress={startPayment} />
//     </View>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';
// const API_KEY = 'AIzaSyD33wZr809ySlFdDUF_UnxRB0TO91R3uqY';
// import Geocoding from 'react-native-geocoding';

// const App = () => {
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null,
//     error: null,
//   });
//   const [error, setError] = useState('');
//   const [UserAddress, setUserAddress] = useState('');

//   console.log(location, UserAddress);
//   console.log('adresss---------------',UserAddress);

//   useEffect(() => {
//     const latitude = 37.7749; // Example latitude (San Francisco)
//     const longitude = -122.4194; // Example longitude (San Francisco)

//     // Ensure API is initialized with a valid key
//     Geocoding.init('AIzaSyD33wZr809ySlFdDUF_UnxRB0TO91R3uqY');

//     // Call reverse geocoding
//     Geocoding.from(location.latitude, location.longitude)
//       .then((json) => {
//         if (json.results && json.results.length > 0) {
//           const formattedAddress = json.results[0].formatted_address;
//           setUserAddress(formattedAddress);
//         } else {
//           setError('No address found for these coordinates.');
//         }
//       })
//       .catch((err) => {
//         setError('Error: ' + err.message);
//       });
//   }, []);
  



//   const getCurrentPosition = async () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           error: null,
//         });

//       },
//       (error) => {
//         setLocation({
//           ...location,
//           error: error.message,
//         });
//       }
//     );
//   };

//   useEffect(() => {
//     getCurrentPosition();
// }, []);


//   // useEffect(() => {
//   //   axios
//   //     .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${API_KEY}`)
//   //     .then(response => {
//   //       const address = response.data.results[0].formatted_address;
//   //       setUserAddress(address);
//   //     })
//   //     .catch(error => {
//   //       console.error(error);
//   //     });
//   // }, [location.latitude, location.longitude]);

//   return (
//     <View style={{flex:1, backgroundColor:'#fff'}}>
//       <Text style={{fontSize:22, color:'#000'}}>{UserAddress}</Text>
//     </View>
//   );
// };

// export default App;


