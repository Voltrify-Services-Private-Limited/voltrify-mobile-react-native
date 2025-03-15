import React, {useReducer, useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/Component/AuthContext';


import SplashScreen from './src/Screens/AuthScreens/SplashScreen';
import Authroute from './src/Routes/AuthRoute';
import Mainroute from './src/Routes/MainRoute';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
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
