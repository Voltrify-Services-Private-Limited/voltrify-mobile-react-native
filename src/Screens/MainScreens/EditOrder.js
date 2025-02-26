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
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    { label: 'Not Working', value: '1' },
    { label: 'Jam', value: '2' },
];
const EditOrder = ({ route }) => {
    const [text, setText] = useState('');
    const [company, setCompany] = useState('');
    const [modal, setModal] = useState('');
    const [condition, setCondition] = useState('');
    const navigation = useNavigation();

    //////////////////// Device Condition Get Api /////////////

    const paymentBtn = () => {
        navigation.navigate("PaymentScreen");
    }
    return (
        <View style={styles.mainView}>
            <View style={styles.topHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../Icons/leftArrow.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Order</Text>
            </View>
            <ScrollView>
            <View style={{ padding: 10 }}>
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
                <View>
                    <Text style={styles.lableText}>Device Condition</Text>
                    <TextInput
                        style={styles.textarea}
                        multiline
                        numberOfLines={4}
                        onChangeText={text => setCondition(text)}
                        value={condition}
                        placeholderTextColor={'#000066'}
                        placeholder="Text here..."
                        textAlignVertical="top" // Ensures text starts at the top
                    />
                </View>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => paymentBtn()}>
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
};
export default EditOrder;
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


