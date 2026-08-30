import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image, // Kept Image import in case you restore your icons later
    SafeAreaView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeviceCondition = ({ route }) => {
    // --- State Management ---
    const [selectedValue, setSelectedValue] = useState(null);
    const [condition, setCondition] = useState([]);
    const [text, setText] = useState('');
    const [company, setCompany] = useState('');
    const [modal, setModal] = useState('');
    const [clicked, setClicked] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [conditionId, setConditonId] = useState('');
    const [error, setError] = useState(false);

    const navigation = useNavigation();
    
    // Safety check for route params to prevent crashes if undefined
    const time_slot = route?.params?.time_slot;

    // --- API Calls ---

    const getAllCart = async () => {
        try {
            const userData = await AsyncStorage.getItem('access_token');
            const token = JSON.parse(userData);

            const response = await fetch('http://api.voltrify.in/user/cart', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resData = await response.json();
            
            // Check if data exists before accessing index
            if (resData.data && resData.data.length > 0) {
                await AsyncStorage.setItem('cartId', resData.data[0].id);
                console.log("cart get all api pick one: ", resData.data[0].id);
            }
        } catch (err) {
            console.log('get Order err --- ', err);
        }
    };

    const getdeviceCondition = async () => {
        try {
            const userData = await AsyncStorage.getItem('access_token');
            const deviceId = await AsyncStorage.getItem('deviceId');
            const token = JSON.parse(userData);
            
            // Validate deviceId exists
            if (!deviceId) return;

            const response = await fetch(`http://api.voltrify.in/device-condition/${deviceId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resData = await response.json();
            if (resData.data && resData.data.conditions) {
                setCondition(resData.data.conditions);
            }
        } catch (err) {
            console.log('Condition Data err --- ', err);
        }
    };

    const setdeviceCondition = async () => {
        if (conditionId) {
            await AsyncStorage.setItem('condition_id', conditionId.toString());
        }
    }

    useEffect(() => {
        getdeviceCondition();
        setdeviceCondition();
        getAllCart();
    }, []);

    // --- Handlers ---

    const paymentBtn = async () => {
        if (!conditionId) {
            setError(true);
        } else {
            navigation.navigate("SelectAddress", { condition_Id: conditionId });
            if (time_slot) {
                await AsyncStorage.setItem('timeSlot', JSON.stringify(time_slot));
            }
        }
    }

    // --- Render ---

    return (
        <SafeAreaView style={styles.mainView}>
            {/* Header */}
            <View style={styles.topHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    {/* Replaced local image path with Text for stability in this view. 
                        Uncomment the Image component below and add your local asset back in your project. */}
                    {/* <Image source={require('../../Icons/leftArrow.png')} /> */}
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Device Condition</Text>
            </View>

            {/* KEY FIX: KeyboardAvoidingView 
               - Wraps the ScrollView to handle keyboard interactions.
               - 'behavior' is platform specific.
               - 'keyboardVerticalOffset' accounts for header height.
            */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1, padding: 10, paddingBottom: 100 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ padding: 10 }}>
                        {error && <Text style={{ color: 'red', marginBottom: 5 }}>This field is required</Text>}
                        
                        <Text style={styles.lableText}>Select Condition<Text style={{ color: 'red' }}>*</Text></Text>
                        
                        {/* Dropdown Trigger */}
                        <TouchableOpacity
                            style={styles.dropdownStyle}
                            onPress={() => {
                                setClicked(!clicked);
                            }}>
                            <Text style={{ fontWeight: '600', color: selectedCountry ? '#000' : '#888' }}>
                                {selectedCountry === '' ? 'Select Condition' : selectedCountry}
                            </Text>
                            {/* Replaced local image with Text arrow for stability */}
                            <Text style={{color: '#FB923C'}}>{clicked ? '▲' : '▼'}</Text>
                        </TouchableOpacity>

                        {/* Dropdown Options */}
                        {clicked ? (
                            <View style={styles.dropdownContainer}>
                                {condition.map(item => (
                                    <TouchableOpacity
                                        key={item.id || Math.random()}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedCountry(item.condition);
                                            setConditonId(item.id);
                                            setClicked(false);
                                            setError(false); 
                                        }}>
                                        <Text style={styles.orderText2}>
                                            {item.condition}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : null}

                        {/* Text Inputs */}
                        <View>
                            <Text style={styles.lableText}>Device Description</Text>
                            <TextInput
                                style={styles.textarea}
                                multiline
                                numberOfLines={4}
                                onChangeText={setText}
                                value={text}
                                placeholderTextColor={'#000066'}
                                placeholder="Text here..."
                                textAlignVertical="top"
                            />
                        </View>

                        <View>
                            <Text style={styles.lableText}>Device Company</Text>
                            <TextInput
                                style={styles.textarea}
                                multiline
                                numberOfLines={4}
                                onChangeText={setCompany}
                                value={company}
                                placeholderTextColor={'#000066'}
                                placeholder="Text here..."
                                textAlignVertical="top"
                            />
                        </View>

                        <View>
                            <Text style={styles.lableText}>Device Model</Text>
                            <TextInput
                                style={styles.textarea}
                                multiline
                                numberOfLines={4}
                                onChangeText={setModal}
                                value={modal}
                                placeholderTextColor={'#000066'}
                                placeholder="Text here..."
                                textAlignVertical="top"
                            />
                        </View>

                        <TouchableOpacity style={styles.buttonBottom} onPress={paymentBtn}>
                            <Text style={styles.buttonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default DeviceCondition;

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
        fontWeight: '700',
        lineHeight: 40,
        marginHorizontal: 20,
        color: '#FB923C',
    },
    lableText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginTop: 15,
    },
    dropdownStyle: {
        height: 50,
        width: '100%',
        borderColor: '#FB923C',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        elevation: 5,
        marginTop: 5,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#eee',
        borderWidth: 1,
        zIndex: 10,
        marginBottom: 10,
    },
    dropdownItem: {
        width: '90%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    textarea: {
        height: 100, // Slightly reduced height for better viewport fit
        borderColor: '#FB923C',
        borderWidth: 1,
        color: '#000',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
    },
    buttonBottom: {
        width: '100%',
        height: 54,
        borderWidth: 1,
        borderColor: '#FB923C',
        backgroundColor: '#FFF', // Added background color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        marginTop: 30,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    orderText2: {
        color: '#000',
        fontSize: 14,
    }
});