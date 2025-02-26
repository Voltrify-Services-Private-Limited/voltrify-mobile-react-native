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
    const [newData, setNewData] = useState([]);
    const navigation = useNavigation();

    //////////////////// Device Condition Get Api /////////////


    useEffect(() => {
        getdeviceCondition();
        console.log(condition);
    }, []);

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
            setNewData(JSON.stringify(condition));
        } catch (err) {
            console.log('Condition Data err --- ', err);
        }
    };

    const paymentBtn = () => {
        navigation.navigate("PaymentScreen");
    }

    // Convert object values to an array
    // const newArray = [...Object.values(condition)]; // This is valid

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ width: "auto", height: 100, }}>
            <Text style={{ color: '#000', fontSize: 20, }}>{item}</Text>
        </TouchableOpacity>
    );
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
                {/* <FlatList
                    data={newData}
                    renderItem={renderItem}
                    horizontal={true}
                    keyExtractor={item => item.id} />
                */}
                <Dropdown
                    style={styles.dropdownStyle}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholderStyle={{color:'#000'}}
                    placeholder="Select Device Condition"
                    value={selectedValue}
                    onChange={item => {
                        setSelectedValue(item.deviceId);
                    }}
                />
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
        borderColor: '#FB923C',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: '#000',
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


