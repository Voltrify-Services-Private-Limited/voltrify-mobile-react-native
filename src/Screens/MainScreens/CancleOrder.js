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
import { useNavigation } from '@react-navigation/native';
const CancleOrder = ({ route }) => {
     const navigation = useNavigation();
      useEffect(() => {
            // Hide splash screen after 2 seconds and navigate to HomeScreen
            const timer = setTimeout(() => {
              navigation.navigate('BottomTab'); // Navigate to Home screen
            }, 2000);
        
            return () => clearTimeout(timer);
          }, []);
    
     return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <View style={styles.check_circle}>
                    <Image source={require('../../Icons/recylebin.png')} style={{ width: 100, height: 100, }} />
                </View>
                <Text style={styles.orderText}>Your Order Cancle</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
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
    topView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    check_circle: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        elevation: 10,
    },
    orderText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginVertical: 20,
    },
    detailBox: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        elevation: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },

    headingText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 40,
        color: '#000',
    },

    textStyle: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 40,
        color: '#000',
    },
    line: {
        width: 140,
        height: 0,
        borderWidth: 2,
        justifyContent: 'center',
        marginTop: 9,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderColor: '#fff'

    },
    textDetails: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
});

export default CancleOrder;
