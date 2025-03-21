import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';



const OrderVerify = () => {
    const navigation = useNavigation();
    const [deviceName, setDeviceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
        fetchOrderDetails();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

    }, []);
  

    const fetchOrderDetails = async () => {
        const timeSlot = await AsyncStorage.getItem('time_slot');
        const dateSlot = await AsyncStorage.getItem('slot_no_day');
        const type = await AsyncStorage.getItem('serviceType');
        const name = await AsyncStorage.getItem('serviceName');

        setDate(JSON.parse(dateSlot));
        setTime(JSON.parse(timeSlot));
        setServiceType(type);
        setDeviceName(name);
    };

    return (
        <LinearGradient colors={['#FF9800', '#FF5722']} style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={[styles.circle, { opacity: fadeAnim }]}> 
                    <View style={styles.container}>
                        <Image source={require('../../Icons/done-tick.png')} style={styles.icon} />
                    </View>
                </Animated.View>
                <Text style={styles.orderText}>Order Confirmed!</Text>
                <Text style={styles.subText}>Your service has been scheduled successfully</Text>
                
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailHeading}>Order Summary</Text>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Device:</Text><Text style={styles.detailValue}>{deviceName}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Service Type:</Text><Text style={styles.detailValue}>{serviceType}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Date:</Text><Text style={styles.detailValue}>{date}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Time:</Text><Text style={styles.detailValue}>{time}</Text></View>
                </View>
                
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('BottomNavigation')}>
                    <Text style={styles.buttonText}>Go to Home</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        tintColor: '#fff',
    },
    content: {
        alignItems: 'center',
        width: '90%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 120,
        height: 120,
        backgroundColor: '#4CAF50', // Green color like success animation
        borderRadius: 60, // Make it circular
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, // Shadow effect
    },
    orderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 8,
    },
    detailHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },
    homeButton: {
        marginTop: 20,
        backgroundColor: '#FFC107',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 4,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },
});

export default OrderVerify;
