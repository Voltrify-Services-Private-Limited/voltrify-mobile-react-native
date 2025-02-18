import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ProgressBarAndroid,
    ScrollView,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useNavigation } from '@react-navigation/native';
  // import Progress from 'react-native-progress';
  
  const CategoriseDetails = ({ route }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const {id} = route.params;
   useEffect(() => {
     console.log('Categorise Id', id);
   }, []);
    return (
      <View style={styles.mainView}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../Icons/leftArrow.png')} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Categorise Details</Text>
        </View>
         
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 10,
    },
    topHeader: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
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
  });
  
  export default CategoriseDetails;
  