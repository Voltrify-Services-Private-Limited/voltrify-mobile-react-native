import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ProgressBarAndroid,
    ScrollView,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderVerify = ({ route }) => {
    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [deviceName, setDeviceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => { 
        OrdersDetails();
        // Hide splash screen after 2 seconds and navigate to HomeScreen
        const timer = setTimeout(() => {
            navigation.navigate('BottomNavigation'); // Navigate to Home screen
        }, 2000);

        return () => clearTimeout(timer);
       
    }, []);

    const OrdersDetails = async()=>{
        const timeSlot = await AsyncStorage.getItem('time_slot');
        const dateSlot = await AsyncStorage.getItem('slot_no_day');
        const type = await AsyncStorage.getItem('serviceType');
        const name = await AsyncStorage.getItem('serviceName');
        const timeconvert = JSON.parse(timeSlot);
        const datecovert = JSON.parse(dateSlot);
        setDate(datecovert);
        setTime(timeconvert);
        setServiceType(type);
        setDeviceName(name);
        console.log("aaaassssss", date + time + type + name)
    }

    return (
        <View style={styles.mainView}>
            {/* <View style={styles.topHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('BottomTab')}>
                    <Image source={require('../../Icons/leftArrow.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Back To Home</Text>
            </View> */}
            <View style={styles.topView}>
                <View style={styles.check_circle}>
                    <Image source={require('../../Icons/checkmark.png')} style={{ width: 50, height: 50, }} />
                </View>
                <Text style={styles.orderText}>Your Order Is Placed</Text>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 0, width: '100%',
                height: 250,
                backgroundColor: '#bbb',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25, paddingHorizontal: 20 }}>
                    <View style={styles.line}></View> <Text style={styles.textDetails}>Order Details</Text> <View style={styles.line}></View>
                </View>
                <View style={styles.detailBox}>
                    <Text style={styles.headingText}>Device Name : <Text style={styles.textStyle}>{deviceName}</Text></Text>
                    <Text style={styles.headingText}>Service Type : <Text style={styles.textStyle}>{serviceType}</Text></Text>
                    <Text style={styles.headingText}>Date : <Text style={styles.textStyle}>{date}</Text></Text>
                    <Text style={styles.headingText}>Time : <Text style={styles.textStyle}>{time}</Text></Text>
                </View>
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
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FB923C'
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
        color: '#fff',
        marginVertical: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
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

export default OrderVerify;
