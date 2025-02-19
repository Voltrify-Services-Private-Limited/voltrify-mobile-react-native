import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ServiceViewCart = ({ route }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainView}>
            <View style={styles.topHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../Icons/leftArrow.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.backButton2}
                        onPress={() => props.navigation.navigate('ServiceSearch')}>
                        <Image source={require('../../Icons/searchIcon2.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.backButton2}
                        onPress={() => props.navigation.goBack()}>
                        <Image source={require('../../Icons/shareIcon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.banner}>
                <Image
                    source={require('../../Icons/serviceBanner.png')}
                    style={{
                        width: '100%',
                        height: 200,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                    }}
                />
            </View>
            <View style={styles.serviceContent}>
                <View style={styles.content}>
                    <Text style={styles.contentText1}>AC & Appliance Repair</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../../Icons/starfill.png')}
                            style={styles.starImg}
                        />
                        <Image
                            source={require('../../Icons/starfill.png')}
                            style={styles.starImg}
                        />
                        <Image
                            source={require('../../Icons/starfill.png')}
                            style={styles.starImg}
                        />
                        <Image
                            source={require('../../Icons/starfill.png')}
                            style={styles.starImg}
                        />
                        <Image
                            source={require('../../Icons/starfill.png')}
                            style={styles.starImg}
                        />
                        <Text style={styles.contentText2}>329 Reviews</Text>
                    </View>

                    <View style={styles.cardBox}>
                        <View style={styles.card}>
                            <Image source={require('../../Icons/serviceImage.png')} />
                            <Text style={styles.cardText}>Service</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../Icons/serviceImage.png')} />
                            <Text style={styles.cardText}>Service</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../Icons/serviceImage.png')} />
                            <Text style={styles.cardText}>Service</Text>
                        </View>
                    </View>

                    <View style={styles.serviceBox}>
                        <Text style={styles.contentText3}>Service</Text>
                    </View>
                    <View style={styles.listCard}>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderBottomWidth: 0.2,
                                borderStyle: 'dashed',
                                marginHorizontal: 1,
                                justifyContent: 'space-between',
                                width: 'auto',
                                paddingBottom: 5,
                            }}>
                            <View>
                                <Text style={styles.contentText4}>Power saver AC service</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Text style={styles.contentText2}>329 Reviews</Text>
                                </View>
                                <Text style={styles.contentText5}>Starts at ₹499</Text>
                                <Text style={styles.contentText6}>
                                    ₹100 Off on your first service
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: 5 }}>
                                <Image source={require('../../Icons/serviceImage2.png')} />
                                <TouchableOpacity style={styles.addBtn}>
                                    <Text style={styles.addBtnText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[styles.contentText5, { fontWeight: 400 }]}>
                            Cleaning of indoor unit with foam-spray
                        </Text>
                        <Text style={[styles.contentText6, { color: '#FB923C' }]}>
                            View Details
                        </Text>
                    </View>
                    <View style={styles.listCard}>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderBottomWidth: 0.2,
                                borderStyle: 'dashed',
                                marginHorizontal: 1,
                                justifyContent: 'space-between',
                                width: 'auto',
                                paddingBottom: 5,
                            }}>
                            <View>
                                <Text style={styles.contentText4}>Power saver AC service</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Text style={styles.contentText2}>329 Reviews</Text>
                                </View>
                                <Text style={styles.contentText5}>Starts at ₹499</Text>
                                <Text style={styles.contentText6}>
                                    ₹100 Off on your first service
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: 5 }}>
                                <Image source={require('../../Icons/serviceImage2.png')} />
                                <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                                    <Text style={styles.addBtnText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[styles.contentText5, { fontWeight: 400 }]}>
                            Cleaning of indoor unit with foam-spray
                        </Text>
                        <Text style={[styles.contentText6, { color: '#FB923C' }]}>
                            View Details
                        </Text>
                    </View>
                    <View style={styles.listCard}>
                        <View
                            style={{
                                flexDirection: 'row',
                                borderBottomWidth: 0.2,
                                borderStyle: 'dashed',
                                marginHorizontal: 1,
                                justifyContent: 'space-between',
                                width: 'auto',
                                paddingBottom: 5,
                            }}>
                            <View>
                                <Text style={styles.contentText4}>Power saver AC service</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Image
                                        source={require('../../Icons/starfill.png')}
                                        style={styles.starImg}
                                    />
                                    <Text style={styles.contentText2}>329 Reviews</Text>
                                </View>
                                <Text style={styles.contentText5}>Starts at ₹499</Text>
                                <Text style={styles.contentText6}>
                                    ₹100 Off on your first service
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: 5 }}>
                                <Image source={require('../../Icons/serviceImage2.png')} />
                                <TouchableOpacity style={styles.addBtn}>
                                    <Text style={styles.addBtnText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[styles.contentText5, { fontWeight: 400 }]}>
                            Cleaning of indoor unit with foam-spray
                        </Text>
                        <Text style={[styles.contentText6, { color: '#FB923C' }]}>
                            View Details
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomSheet}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 24 }}>₹499</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("SummaryScreen")} style={{backgroundColor:"#FB923C", width: 164, height: 40, borderRadius: 10, borderWidth: 1, justifyContent: 'center', borderColor: '#FB923C' }}>
                    <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 24, textAlign: 'center',color:"#fff" }}>View Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    topHeader: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        zIndex: 1,
    },
    backButton: {
        width: 32,
        height: 32,
        backgroundColor: '#FB923C',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 200,
    },
    backButton2: {
        width: 32,
        height: 32,
        backgroundColor: '#FB923C',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    serviceContent: {
        top: 150,
    },
    content: {
        marginHorizontal: 10,
    },
    contentText1: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 40,
        color: '#1C1B1F',
    },
    contentText2: {
        fontSize: 9.9,
        fontWeight: 400,
        color: '#1C1B1F',
    },
    starImg: {
        width: 6.6,
        height: 6.6,
        marginVertical: 2,
    },
    cardBox: {
        width: 'auto',
        height: 95,
        backgroundColor: '#F7F7F7',
        paddingVertical: 5,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginVertical: 5,
    },
    cardText: {
        fontSize: 8,
        fontWeight: 400,
        textAlign: 'center',
        color: '#1C1B1F',
    },
    serviceBox: {
        marginVertical: 10,
    },
    contentText3: {
        fontSize: 14,
        fontWeight: 700,
        color: '#1C1B1F',
        lineHeight: 16.8,
        height: 27,
        borderBottomWidth: 0.2,
        borderBottomColor: '#A09CAB',
    },
    listCard: {
        height: 94,
        marginBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: '#A09CAB',
    },
    contentText4: {
        fontSize: 14,
        fontWeight: 600,
        color: '#1C1B1F',
    },
    contentText5: {
        fontSize: 6,
        fontWeight: 700,
        color: '#000000',
        marginTop: 5,
    },
    contentText6: {
        fontSize: 6,
        fontWeight: 400,
        color: '#4ADE80',
    },
    addBtn: {
        width: 30,
        height: 12,
        borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: -6,
        backgroundColor: '#FFFFFF',
        borderColor: '#A09CAB',
        borderRadius: 4,
        justifyContent: 'center',
    },
    addBtnText: {
        fontSize: 6,
        fontWeight: 400,
        color: '#FB923C',
        textAlign: 'center',
    },
    bottomSheet: {
        width: "100%",
        height: 68,
        position: 'absolute',
        bottom: 0,
        elevation: 2,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10,
        paddingVertical:15,
    }
});

export default ServiceViewCart;
