import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentCard = ({ route }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [number, setNumber] = useState('');
    const [paymentCard, setPaymentCard] = useState([]);

    ////////////// Payment Methods ///////////////

    // const paymentHandle = async () => {
    //   const options = {
    //     description: 'Credits towards consultation',
    //     image: 'https://i.imgur.com/3g7nmJC.png',
    //     currency: 'INR',
    //     key: '', // Your api key
    //     amount: '5000',
    //     name: 'foo',
    //     prefill: {
    //       email: 'void@razorpay.com',
    //       contact: '9191919191',
    //       name: 'Razorpay Software'
    //     },
    //     theme: { color: '#F37254' }
    //   }
    //   RazorpayCheckout.open(options).then((data) => {
    //     // handle success
    //     alert(`Success: ${data.razorpay_payment_id}`);
    //   }).catch((error) => {
    //     // handle failure
    //     alert(`Error: ${error.code} | ${error.description}`);
    //   });
    // }
    useEffect(() => {
        getAllPaymentCard();
        // Alert.alert(JSON.stringify(paymentCard));
        console.log("======= card Data ======", paymentCard);
    }, []);
    const createOrder = async () => {
        const userData = await AsyncStorage.getItem('access_token');
        const time_slot = await AsyncStorage.getItem('time_slot');
        const coupons_code = await AsyncStorage.getItem('coupanCode');
        const service_description = await AsyncStorage.getItem('service_description');
        const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
        const url = 'http://api.voltrify.in/user/orders';
        result = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Optional, depending on your API requirements
            },
            body: JSON.stringify({
                cart_id: "176bb606-5360-4f47-9b94-b840e0496fcf",
                address_id: "a3163034-c326-4a68-ac9e-ce203b206180",
                condition_id: "955c0518-a52f-4d39-add6-7dba0c9f5791",
                time_slot: time_slot,
                coupons_code: coupons_code,
                payment_mode: "offline",
                service_description: service_description,
            }),
        });

        response = await result.json();
        console.log('order data========', response);
        Alert.alert(JSON.stringify(response));
    };

    ////////////////// Payment Card Api Call Start ////////////////
    const getAllPaymentCard = async () => {
        try {
            const userData = await AsyncStorage.getItem('access_token');
            const user_id = await AsyncStorage.getItem('userId');
            const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

            const response = await fetch(`http://api.voltrify.in/user/card/${user_id}`, {
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
            setPaymentCard(resData.data);

        } catch (err) {
            console.log('Service Data err --- ', err);
        }
    };

    const deleteCard = async (cardId) => {
        const userData = await AsyncStorage.getItem('access_token');
        const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
        console.log(id);
        try {
            const response = await fetch(`http://api.voltrify.in//user/cart/${cardId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Optional, depending on your API requirements
                },
            });
            setPaymentCard(paymentCard.filter(item => item.cardId !== cardId));
            if (response.ok) {
                console.log('Success', 'Item deleted successfully');
            } else {
                console.log('Error', 'Failed to delete item');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Error', 'An error occurred while deleting the item');
        }

    };


    return (
        <View style={styles.mainView}>
            <View style={styles.topHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../Icons/leftArrow.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Manage Payment Methods</Text>
            </View>
            <View>
                <View style={{ marginVertical: 5 }}>
                    <Text style={styles.text_1}>Debit or Credit Card</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.paymentList}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../Icons/debit.png')} />
                                <Text style={styles.text_2}>Add a card</Text>
                            </View>
                            <Image source={require('../../Icons/rightArrow.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {paymentCard.map(item => (
                <View key={item} style={{ marginVertical: 5 }}>
                    <View style={styles.paymentList}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#FB923C', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#fff', fontWeight: '600' }}>C</Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.text_2}>({item.createdBy})</Text>
                                <Text style={styles.text_8}>{item.expiryDate}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity onPress={() => deleteCard(item.cardId)} style={{ marginRight: 5 }}>
                                    <Image source={require('../../Icons/recylebin.png')} />
                                </TouchableOpacity>
                                <Image source={require('../../Icons/rightArrow.png')} />
                            </View>
                        </View>
                    </View>
                </View>
            ))}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={{
                                width: '100%',
                                height: 48,
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                            <View
                                style={{
                                    width: 32,
                                    height: 4,
                                    borderRadius: 8,
                                    backgroundColor: '#79747E',
                                    alignSelf: 'center',
                                }}></View>
                        </TouchableOpacity>
                        <Text style={styles.text_3}>Add a card</Text>
                        <Text style={styles.text_4}>Enter your card details</Text>
                        <View style={styles.input_box}>
                            <Image
                                source={require('../../Icons/debit.png')}

                            />
                            <TextInput
                                placeholder="Card Number"
                                placeholderTextColor="#A09CAB"
                                keyboardType="numeric"
                                maxLength={10}
                                style={styles.text_7}
                                onChangeText={x => setNumber(x)}
                                value={number}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 328,
                                marginTop: 50,
                            }}>
                            <View style={styles.input_box3}>
                                <TextInput
                                    placeholder="MM/YY"
                                    placeholderTextColor="#A09CAB"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    style={styles.text_7}
                                    onChangeText={x => setNumber(x)}
                                    value={number}
                                />
                            </View>
                            <View style={styles.input_box3}>
                                <TextInput
                                    placeholder="CVV"
                                    placeholderTextColor="#A09CAB"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    style={styles.text_7}
                                    onChangeText={x => setNumber(x)}
                                    value={number}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 15,
                            }}>
                            <Text style={{ fontSize: 10 }}>
                                Save the card details (except CVV) securely.{'  '}
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        color: '#FB923C',
                                        fontSize: 10,
                                        textDecorationLine: 'underline',
                                    }}>
                                    Know more
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.input_box2}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.text_6}>Save details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default PaymentCard;
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
    paymentList: {
        flexDirection: 'row',
        marginHorizontal: 5,
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    text_1: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 22,
        color: '#000',
    },
    text_2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 16.8,
        color: '#000',
        marginHorizontal: 10,
    },
    text_8: {
        fontSize: 10,
        fontWeight: 400,
        lineHeight: 16.8,
        color: '#000',
        marginHorizontal: 10,
    },
    text_9: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 16.8,
        color: '#FB923C',
        marginHorizontal: 10,
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#fff',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },

    main_view: {
        flex: 1,
        backgroundColor: '#FB923C',
    },
    text_1: {
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
        color: '#ffffff',
        paddingVertical: 4,
    },
    text_7: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'left',
        color: '#00000066',

        width: '100%',
    },
    second_view: {
        width: '100%',
        height: 418,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#ffffff',
    },
    text_3: {
        fontSize: 24,
        fontWeight: 700,
        color: '#000000',
        lineHeight: 28,
        textAlign: 'center',
        marginTop: 16,
    },
    text_4: {
        fontSize: 15,
        fontWeight: 400,
        color: '#797979',
        lineHeight: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    input_box: {
        width: 328,
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 16,
        borderColor: '#FB923C',
        top: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input_box3: {
        width: '49%',
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 16,
        borderColor: '#FB923C',
        flexDirection: 'row',
    },
    input_box2: {
        width: 328,
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 16,
        borderColor: '#FB923C',
        marginVertical: 40,
        flexDirection: 'row',
        alignItem: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 328,
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 16,
        borderColor: '#FB923C',
        top: 50,
        marginVertical: 8,
    },
    text_5: {
        fontSize: 16,
        fontWeight: 600,
        color: '#000000',
        lineHeight: 19.2,
        textAlign: 'center',
        paddingVertical: 16,
    },
    text_6: {
        fontSize: 16,
        fontWeight: 600,
        color: '#000000',
        lineHeight: 19.2,
        paddingVertical: 16,
        marginHorizontal: 5,
    },
    lineBox: {
        width: 328,
        height: 14,
        top: 36,
        marginVertical: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    lineText: {
        fontSize: 12,
        fontWeight: 600,
        color: '#00000033',
        lineHeight: 14.4,
        marginHorizontal: 5,
    },

    line: {
        width: 145,
        height: 1,
        top: 2,
        backgroundColor: '#00000033',
        marginVertical: 16,
        alignItems: 'center',
    },
});


