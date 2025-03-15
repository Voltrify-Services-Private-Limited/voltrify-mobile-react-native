import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
    Alert,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    { label: 'Not Working', value: '1' },
    { label: 'Jam', value: '2' },
];
const DeviceCondition = ({ route }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [condition, setCondition] = useState([]);
    const [text, setText] = useState('');
    const [company, setCompany] = useState('');
    const [modal, setModal] = useState('');
    const navigation = useNavigation();
    const [clicked, setClicked] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [conditionId, setConditonId] = useState('');
    const { time_slot } = route.params;
    //////////////////// Device Condition Get Api /////////////

    const getAllCart = async () => {
        try {
          const userData = await AsyncStorage.getItem('access_token');
          const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    
          const response = await fetch('http://api.voltrify.in/user/cart', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Optional, depending on your API requirements
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const resData = await response.json();
          await AsyncStorage.setItem('cartId',resData.data[0].id);
          console.log(resData.data[0].id);
        } catch (err) {
          console.log('get Order err --- ', err);
        }
      }; 
      const getAllAddress = async () => {
        try {
          const userData = await AsyncStorage.getItem('access_token');
          const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    
          const response = await fetch('http://api.voltrify.in/user/address', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Optional, depending on your API requirements
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const resData = await response.json();
          await AsyncStorage.setItem('addressId',resData.data[0].id);
          console.log('address id',resData.data[0].id);
        } catch (err) {
          console.log('get Order err --- ', err);
        }
      };

    useEffect(() => {
        getdeviceCondition();
        console.log(conditionId)
        setdeviceCondition();
        getAllCart();
        getAllAddress();
    }, []);

    const setdeviceCondition = async () => {
        await AsyncStorage.setItem('condition_id', conditionId);
    }

    const getdeviceCondition = async () => {
        try {
            const userData = await AsyncStorage.getItem('access_token');
            const deviceId = await AsyncStorage.getItem('deviceId');
            const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

            const response = await fetch(`http://api.voltrify.in/device-condition/${deviceId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Optional, depending on your API requirements
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resData = await response.json();
            setCondition(resData.data.conditions);
        } catch (err) {
            console.log('Condition Data err --- ', err);
        }
    };

    const paymentBtn = async() => {
        navigation.navigate("PaymentScreen", { condition_Id: conditionId});
        await AsyncStorage.setItem('timeSlot', JSON.stringify(time_slot));
    }
    return (
        <View style={styles.mainView}>
            <View style={styles.topHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../Icons/leftArrow.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Device Condition</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={styles.lableText}>Select Device</Text>
                <TouchableOpacity
                    style={styles.dropdownStyle}
                    onPress={() => {
                        setClicked(!clicked);
                    }}>
                    <Text style={{ fontWeight: '600' }}>
                        {selectedCountry == '' ? 'Select Condition' : selectedCountry}
                    </Text>
                    {clicked ? (
                        <Image
                            source={require('../../Icons/downArrow.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    ) : (
                        <Image
                            source={require('../../Icons/downArrow.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    )}
                </TouchableOpacity>
                {clicked ? (
                    <View
                        style={{
                            elevation: 5,
                            marginTop: 100,
                            height: 'auto',
                            alignSelf: 'center',
                            width: '100%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            zIndex: 4,
                            position: 'absolute',
                        }}>

                        {condition.map(item => (
                            <View key={item}>
                                <TouchableOpacity
                                    style={{
                                        width: '85%',
                                        alignSelf: 'center',
                                        height: 50,
                                        justifyContent: 'center',
                                        borderBottomWidth: 0.5,
                                        borderColor: '#8e8e8e',
                                    }}
                                    onPress={() => {
                                        setSelectedCountry(item.condition);
                                        setConditonId(item.id);
                                        setClicked(!clicked);
                                    }}>
                                    <Text style={styles.orderText2}>
                                        {item.condition}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : null}
                <View>
                    <Text style={styles.lableText}>User Description</Text>
                    <TextInput
                        style={styles.textarea}
                        multiline
                        numberOfLines={4}
                        onChangeText={text => setText(text)}
                        value={text}
                        placeholderTextColor={'#000066'}
                        placeholder="Text here..."
                        textAlignVertical="top" // Ensures text starts at the top
                    />
                </View>
                <View>
                    <Text style={styles.lableText}>Device Company</Text>
                    <TextInput
                        style={styles.textarea}
                        multiline
                        numberOfLines={4}
                        onChangeText={text => setCompany(text)}
                        value={company}
                        placeholderTextColor={'#000066'}
                        placeholder="Text here..."
                        textAlignVertical="top" // Ensures text starts at the top
                    />
                </View>
                <View>
                    <Text style={styles.lableText}>Device Modal</Text>
                    <TextInput
                        style={styles.textarea}
                        multiline
                        numberOfLines={4}
                        onChangeText={text => setModal(text)}
                        value={modal}
                        placeholderTextColor={'#000066'}
                        placeholder="Text here..."
                        textAlignVertical="top" // Ensures text starts at the top
                    />
                </View>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => paymentBtn()}>
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        </View>
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
        fontWeight: 700,
        lineHeight: 40,
        marginHorizontal: 20,
        color: '#FB923C',
    },
    lableText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
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
        color: '#000',
        alignSelf: 'center',
        alignItems: 'center',
    },
    textarea: {
        height: 150, // Adjust height as needed
        borderColor: '#FB923C',
        borderWidth: 1,
        color: '#000',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        textAlignVertical: 'top', // Ensures text starts at the top
    },

    buttonBottom: {
        width: 'auto',
        height: 54,
        borderWidth: 1,
        borderColor: '#FB923C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        top: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 600,
        color: '#000000',
    },
});


