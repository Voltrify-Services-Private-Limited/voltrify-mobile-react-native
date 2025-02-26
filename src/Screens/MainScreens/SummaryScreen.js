import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChooseDay = [
  { id: 1, day: 'Mon', selected: false },
  { id: 2, day: 'Tue', selected: false },
  { id: 3, day: 'Wed', selected: false },
  { id: 4, day: 'Thu', selected: false },
  { id: 5, day: 'Fri', selected: false },
  { id: 6, day: 'Sat', selected: false },
]
const ChooseTime = [
  { id: 1, time: '08:00 AM', selected: false },
  { id: 2, time: '08:10 AM', selected: false },
  { id: 3, time: '08:20 AM', selected: false },
  { id: 4, time: '08:30 AM', selected: false },
  { id: 5, time: '08:40 AM', selected: false },
  { id: 6, time: '08:50 AM', selected: false },
  { id: 7, time: '09:00 AM', selected: false },
  { id: 8, time: '09:10 AM', selected: false },
  { id: 9, time: '09:20 AM', selected: false },
  { id: 10, time: '09:30 AM', selected: false },
  { id: 11, time: '09:40 AM', selected: false },
  { id: 12, time: '09:50 AM', selected: false },
  { id: 13, time: '10:00 AM', selected: false },
  { id: 14, time: '10:10 AM', selected: false },
  { id: 15, time: '10:20 AM', selected: false },
  { id: 16, time: '10:30 AM', selected: false },
  { id: 17, time: '10:40 AM', selected: false },
  { id: 18, time: '10:50 AM', selected: false },
  { id: 19, time: '11:00 AM', selected: false },
  { id: 20, time: '11:10 AM', selected: false },
]

const SummaryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coupanModal, setCoupanModal] = useState(false);
  const [coupanData, setCoupanData] = useState([]);
  const [coupanCode, setCoupanCode] = useState("");
  const [dayData, setDayData] = useState(ChooseDay);
  const [timeData, setTime] = useState(ChooseTime);
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const selectSlot = () => {
    setModalVisible(!modalVisible);
    setIsVisible(!isVisible);
  }
  const paymentBtn = () => {
    navigation.navigate("PaymentScreen");
  }

  // Function to handle text press
  const handlePressDay = async (day) => {
    // Change the text color on press
    Alert.alert(JSON.stringify(day));
    if (selectedId.includes(day)) {
      // If the item is already selected, remove it from the selectedIds array
      setSelectedId(selectedId.filter(selectedId => selectedId !== day));
    } else {
      // If the item is not selected, add it to the selectedIds array
      setSelectedId([...selectedId, day]);
    }
    await AsyncStorage.setItem("slot_no_day", JSON.stringify(selectedId));
  };  // Function to handle text press
  const handlePressTime = async (time) => {
    // Change the text color on press
    Alert.alert(JSON.stringify(time));
    if (selectedTime.includes(time)) {
      // If the item is already selected, remove it from the selectedIds array
      setSelectedTime(selectedTime.filter(selectedTime => selectedTime !== time));
    } else {
      // If the item is not selected, add it to the selectedIds array
      setSelectedTime([...selectedTime, time]);
    }
    await AsyncStorage.setItem("time_slot", JSON.stringify(selectedTime));
  };

  useEffect(() => {
    getCoupans();
    console.log(coupanData);
  }, []);

  const getCoupans = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const lat_long = await AsyncStorage.getItem("userAddress");
      setCurrentLocation(lat_long);
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch('http://api.voltrify.in/user/coupons', {
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
      setCoupanData(resData.data.data);
    } catch (err) {
      console.log('Coupans Data err --- ', err);
    }
  };

  const handlePressCode = async(code) =>{
    await AsyncStorage.setItem("coupanCode", code);
    setCoupanModal(!coupanModal);
  }


  const CoupannsItem = ({ item }) => (
    <View style={{ width: 'auto', margin: 5 }}>
    <TouchableOpacity onPress={() => handlePressCode(item.code) }>
    <ImageBackground
        style={styles.coupanCard}
        source={require('../../Icons/coupan.png')}
        resizeMode="cover">
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.dicount}>{item.discount} %</Text>
        <Text style={styles.code}>{item.code}</Text>
      </ImageBackground>
    </TouchableOpacity>
    </View>
  );
  const Choose_Day_Date = ({ item }) => {
    const backgroundColor = selectedId.includes(item.day) ? 'orange' : 'white';
    const textColor = selectedId.includes(item.day) ? 'white' : 'black';
    const borderColor = selectedId.includes(item.day) ? 'orange' : 'black';
    return (
      <TouchableOpacity
        onPress={() => handlePressDay(item.day)}
        style={[styles.dayCard, { backgroundColor, borderColor: borderColor }]}
      >
        <Text style={{ fontSize: 10, fontWeight: 400, lineHeight: 12, textAlign: "center", color: textColor }}>{item.day}</Text>
        <Text style={{ fontSize: 10, fontWeight: 600, lineHeight: 12, textAlign: "center", color: textColor }}>{item.id}</Text>
      </TouchableOpacity>
    );
  };
  const Choose_Time = ({ item }) => {
    const backgroundColor = selectedTime.includes(item.time) ? 'orange' : 'white';
    const textColor = selectedTime.includes(item.time) ? 'white' : 'black';
    const borderColor = selectedTime.includes(item.time) ? 'orange' : 'black';
    return (
      <TouchableOpacity onPress={() => handlePressTime(item.time)}>
        <View style={[styles.timeCard, { backgroundColor, justifyContent: 'center', borderColor: borderColor }]}>
          <Text style={[styles.time_text, { color: textColor }]}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const deviceCondition = () =>{
    setModalVisible(!modalVisible);
    navigation.navigate("DeviceCondition");
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Summary</Text>
      </View>
      <ScrollView>
        <Text style={styles.text_1}>Power saver AC service</Text>
        <View style={styles.section_1}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.text_2}>Splic AC</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <View style={styles.mid_section}>
                <Text style={styles.text_3}>-</Text>
                <Text style={styles.text_3}>1</Text>
                <Text style={styles.text_3}>+</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center', width: 68 }}>
              <Text style={styles.text_4}>₹499</Text>
            </View>
          </View>
        </View>
        <View style={styles.section_2}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={require('../../Icons/mobileIcon.png')} />
            <Text style={styles.text_5}>Ashutosh Soni, +1234567890</Text>
          </View>
          <View>
            <Text style={styles.text_6}>View Details</Text>
          </View>
        </View>
        {/* <Text style={styles.heading1}>Frequenty added together</Text>

        <View style={styles.sliderList}>
          <View style={styles.sliderCard}>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => navigation.navigate('FrequentlyScreen')}>
              <Image
                source={require('../../Icons/image3.png')}
                style={{ width: '100%', borderRadius: 10 }}
              />
              <Text style={styles.cardText2}>
                AC Repair with proper Deep CleaningAC Repair with proper Deep
                Cleaning
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 3,
                }}>
                <Text style={styles.text_3}>₹ 499</Text>
                <View style={styles.addBtn}>
                  <Text style={styles.addText}>Add</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => navigation.navigate('FrequentlyScreen')}>
              <Image
                source={require('../../Icons/image3.png')}
                style={{ width: '100%', borderRadius: 10 }}
              />
              <Text style={styles.cardText2}>
                AC Repair with proper Deep CleaningAC Repair with proper Deep
                Cleaning
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 3,
                }}>
                <Text style={styles.text_3}>₹ 499</Text>
                <View style={styles.addBtn}>
                  <Text style={styles.addText}>Add</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => navigation.navigate('FrequentlyScreen')}>
              <Image
                source={require('../../Icons/image3.png')}
                style={{ width: '100%', borderRadius: 10 }}
              />
              <Text style={styles.cardText2}>
                AC Repair with proper Deep CleaningAC Repair with proper Deep
                Cleaning
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 3,
                }}>
                <Text style={styles.text_9}>₹ 499</Text>
                <View style={styles.addBtn}>
                  <Text style={styles.addText}>Add</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => navigation.navigate('FrequentlyScreen')}>
              <Image
                source={require('../../Icons/image3.png')}
                style={{ width: '100%', borderRadius: 10 }}
              />
              <Text style={styles.cardText2}>
                AC Repair with proper Deep CleaningAC Repair with proper Deep
                Cleaning
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 3,
                }}>
                <Text style={styles.text_3}>₹ 499</Text>
                <View style={styles.addBtn}>
                  <Text style={styles.addText}>Add</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.section_3}>
          <Text style={styles.text_7}>Service preference</Text>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Image source={require('../../Icons/Check.png')} />
            <Text style={styles.text_8}>
              Avoid calling before reaching the location.
            </Text>
          </View>
        </View>

        <View style={styles.section_2}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={require('../../Icons/cupan.png')} />
            <Text style={styles.text_5}>Coupons & Offers</Text>
          </View>
          <TouchableOpacity onPress={() => setCoupanModal(true)}>
            <Text style={styles.text_6}>2 offers </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section_4}>
          <Text style={styles.text_10}>Payment summary</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text_11}>Item Total</Text>
            <Text style={styles.text_12}>₹99</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text_11}>Item Total</Text>
            <Text style={styles.text_12}>₹99</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 0.5,
              marginTop: 5,
              paddingVertical: 5,
              borderTopColor: '#A09CAB',
            }}>
            <Text style={styles.text_13}>Total</Text>
            <Text style={styles.text_13}>₹178</Text>
          </View>
        </View>

        <View style={styles.section_3}>
          <Text style={styles.text_7}>Cancellation & rechedule policy</Text>
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.text_14}>
              Free cancellation/reschedules if done more than 4 hrs before the
              service.
            </Text>
            <Text style={styles.text_15}>Learn more</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomView}>
        <View style={styles.topHeader2}>
          <View style={styles.headerLeft}>
            <Image source={require('../../Icons/locationIcon.png')} />
            <Text style={styles.headerText_1}>
              {currentLocation}
            </Text>
            <Image source={require('../../Icons/downArrow.png')} />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('ManageAddress')}>
              <Image source={require('../../Icons/edit.png')} />
            </TouchableOpacity>

          </View>
        </View>
        {isVisible ? <TouchableOpacity style={styles.buttonBottom} onPress={() => paymentBtn()}>
          <Text style={styles.buttonText}>Proceed to pay </Text>
        </TouchableOpacity> :
          <TouchableOpacity style={styles.buttonBottom} onPress={() => selectSlot()}>
            <Text style={styles.buttonText}>Select slot</Text>
          </TouchableOpacity>}
      </View>
      {/* ================= Add Service Modal Start========= */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredViewModal}>
          <View style={styles.modalViewModal}>
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
            <View style={styles.addressView}>
              <Image source={require('../../Icons/locationIcon.png')} />
              <Text style={styles.headerText_1}>
                {currentLocation}
              </Text>
              <Image source={require('../../Icons/downArrow.png')} />
            </View>
            <Text style={{ fontSize: 12, fontWeight: 600, lineHeight: 14.4, color: "#1C1B1F" }}>When should the professional arrive?</Text>
            <Text style={{ fontSize: 10, lineHeight: 15, fontWeight: 400, color: "#A09CAB" }}>Your service will take approx. 40 Mins</Text>
            <View style={{ marginVertical: 10, }}>
              <Text style={{ fontSize: 10, fontWeight: 500, lineHeight: 15, color: '#000000' }}>Choose Day & Date</Text>
              <FlatList
                data={dayData}
                horizontal={true}
                renderItem={Choose_Day_Date}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={styles.modalHeader}>
              <Image source={require('../../Icons/debit.png')} />
              <View style={{ justifyContent: 'center', marginHorizontal: 4, }}>
                <Text style={styles.modalHeaderTitle}>Online payment only for selected date</Text>
              </View>
            </View>
            <FlatList
              data={timeData}
              key={'#'}
              renderItem={Choose_Time}
              keyExtractor={item => "#" + item.id}
              numColumns={4}
            />
            <TouchableOpacity style={styles.buttonBottomModal} onPress={() => deviceCondition()}>
              <Text style={styles.buttonText}>Proceed to checkout </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ================= Add Service Modal End========= */}


      {/* ================= Coupons Offers Modal Start========= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={coupanModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!coupanModal);
        }}>
        <View style={styles.centeredViewCoupans}>
          <View style={styles.modalViewCoupans}>
            <TouchableOpacity
              onPress={() => setCoupanModal(!coupanModal)}
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

            <FlatList
              horizontal={true}
              data={coupanData}
              renderItem={CoupannsItem}
              keyExtractor={(item) => '#' + item.id.toString()}
            />
            <TouchableOpacity
              style={styles.input_box2Coupans}
              onPress={() => setCoupanModal(!coupanModal)}>
              <Text style={styles.text_6Coupans}>Save details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ================= Coupons Offers Modal End========= */}
    </View>
  );
};
export default SummaryScreen;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topHeader: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
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
  text_1: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 40,
    color: '#1C1B1F',
    marginHorizontal: 10,
  },
  section_1: {
    width: 'auto',
    height: 40,
    borderLeftWidth: 1,
    borderLeftColor: '#A09CAB',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
  text_3: {
    fontSize: 8,
    fontWeight: 700,
    color: '#FB923C',
  },
  text_4: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'right',
    color: '#000000',
  },
  text_2: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1C1B1F',
  },
  mid_section: {
    justifyContent: 'space-between',
    width: 42,
    borderWidth: 0.5,
    borderColor: '#A09CAB',
    borderRadius: 4,
    height: 14,
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  section_2: {
    width: '100%',
    height: 30,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  text_5: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 15,
    marginHorizontal: 10,
    color: '#000',
  },

  text_6: {
    fontSize: 10,
    fontWeight: 400,
    color: '#FB923C',
    lineHeight: 24,
    textDecorationLine: 'underline',
  },

  sliderList: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  sliderCard: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  heading1: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1C1B1F',
    marginHorizontal: 10,
  },
  cardBox: {
    width: 86,
    height: 180,
  },
  cardText2: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 12,
    marginVertical: 8,
  },
  text_9: {
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 24,
  },
  text_2: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 24,
  },
  addBtn: {
    width: 30,
    height: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A09CAB',
    marginTop: 5,
  },
  addText: {
    fontSize: 6,
    fontWeight: 400,
    color: '#FB923C',
  },
  section_3: {
    width: '100%',
    height: 56,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 5,
  },
  text_7: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1C1B1F',
  },
  text_8: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 12,
    marginHorizontal: 8,
  },
  section_4: {
    width: '100%',
    height: 114,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 5,
  },
  text_10: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1C1B1F',
    marginBottom: 10,
  },

  text_11: {
    fontSize: 10,
    fontWeight: 400,
    color: '#000000',
  },
  text_12: {
    fontSize: 12,
    fontWeight: 500,
    color: '#1C1B1F',
  },
  text_13: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1C1B1F',
  },
  text_14: {
    fontSize: 8,
    fontWeight: 400,
    color: '#000000',
  },
  text_15: {
    fontSize: 8,
    fontWeight: 400,
    color: '#FB923C',
    textDecorationLine: 'underline',
  },
  bottomView: {
    width: '100%',
    height: 110,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    padding: 10,
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
  topHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText_1: {
    fontSize: 8,
    fontWeight: 500,
    lineHeight: 9.6,
    color: '#000000B2',
    marginHorizontal: 5,
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: '#FB923C',
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  modalViewModal: {
    backgroundColor: 'white',
    width: '100%',
    height: 550,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  buttonModalModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpenModal: {
    backgroundColor: '#F194FF',
  },
  buttonCloseModal: {
    backgroundColor: '#2196F3',
  },
  textStyleModal: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextModal: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredViewModal: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: '100%',
  },

  main_viewModal: {
    flex: 1,
    backgroundColor: '#FB923C',
  },
  addressView: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  dayCard: {
    width: 36,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: '#A09CAB',
    marginHorizontal: 4,
  },

  buttonBottomModal: {
    width: "100%",
    height: 54,
    borderWidth: 1,
    borderColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    position: "absolute",
    marginHorizontal: 16,
    bottom: 20,
  },
  /*============ Coupanns ==========*/
  modalViewCoupans: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
  buttonCoupans: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpenCoupans: {
    backgroundColor: '#F194FF',
  },
  buttonCloseCoupans: {
    backgroundColor: '#2196F3',
  },
  textStyleCoupans: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextCoupans: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredViewCoupans: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  main_viewCoupans: {
    flex: 1,
    backgroundColor: '#FB923C',
  },
  input_box2Coupans: {
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
  text_6Coupans: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    paddingVertical: 16,
    marginHorizontal: 5,
  },
  coupanCard: {
    width: 'auto',
    height: 120,
    alignItems: "center",
    paddingVertical: 10,
    padding: 15,
  },
  code: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 600,
  },
  dicount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FB923C',
    marginVertical: 6,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 500,
  },
  modalHeader: {
    width: '100%',
    height: 30,
    backgroundColor: '#F3F3F3',
    borderRadius: 4,
    marginVertical: 4,
    flexDirection: "row",
  },
  modalHeaderTitle: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 12,
    letterSpacing: 0,
    color: '#1C1B1F',
  },
  timeCard: {
    width: 64,
    height: 24,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  time_text: {
    fontSize: 10,
    fontWeight: 400,
    color: '#000000',
    lineHeight: 12,
    textAlign: "center",
  }

});


