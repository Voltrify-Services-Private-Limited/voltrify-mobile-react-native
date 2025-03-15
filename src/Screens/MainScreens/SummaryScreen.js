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
import moment from 'moment';

const SummaryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coupanModal, setCoupanModal] = useState(false);
  const [coupanData, setCoupanData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [coupanCode, setCoupanCode] = useState('');
  const [data, setData] = useState([]);
  const [manuallyLocation, setManuallyLocation] = useState('');
  const [isRefersh, setIsRefersh] = useState(false);
  const [manuallyAddress, setManuallyAddress] = useState('false');
  // State to hold the selected date
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCurrent, setSelectCurrent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectSlot = () => {
    setModalVisible(!modalVisible);
    setIsVisible(!isVisible);
  }

  const paymentBtn = () => {
    navigation.navigate("PaymentScreen");
  }
  useEffect(() => {
    getCoupans();
    console.log(coupanData);
    getServiceId();
    Manually_and_enable();
    service_name();
    service_type();
  }, []);

  const Manually_and_enable = async () => {
    const manuallyAddress_Key = await AsyncStorage.getItem("manuallyAddress");
    setManuallyAddress(manuallyAddress_Key);
    console.log(manuallyAddress_Key);
    // Check if manuallyAddress is set to true, and accordingly handle locations.
    if (manuallyAddress_Key === 'true') {
      const manually = await AsyncStorage.getItem("finalAddress");
      setManuallyLocation(JSON.parse(manually));
      setCurrentLocation(''); // Clear currentLocation if manuallyLocation is being used
    } else {
      const latitude = await AsyncStorage.getItem("latitude");
      setCurrentLocation(JSON.parse(latitude));
      setManuallyLocation(''); // Clear manuallyLocation if currentLocation is being used
    }
  };
  const getServiceId = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
      const serviceId = await AsyncStorage.getItem("serviceId");
      const latitude = await AsyncStorage.getItem("latitude");
      const geoLocation = JSON.parse(latitude);
      setCurrentLocation(geoLocation);
      console.log('service id asscc', serviceId);
      const response = await fetch(`http://api.voltrify.in/service/${serviceId}`, {
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
      setData(resData.data);
      console.log("assbcbkbskc", resData.data)
    } catch (err) {
      console.log('get Order err --- ', err);
    }
  }

  const getCoupans = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const latitude = await AsyncStorage.getItem("latitude");
      const geoLocation = JSON.parse(latitude);
      setCurrentLocation(geoLocation);
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
      console.log("coupan data", resData.data.data[0]);
    } catch (err) {
      console.log('Coupans Data err --- ', err);
    }
  };

  const handlePressCode = async (code) => {
    await AsyncStorage.setItem("coupanCode", code);
    setCoupanCode(code);
  }
  const handleSelectItem = (index) => {
    setSelectedIndex(index); // Set the selected index to change the background color
  };


  const CoupannsItem = ({ item, index }) => {
    const backgroundColor = index === selectedIndex ? '#FB923C' : '#d0d0d0';
    const color = index === selectedIndex ? '#000' : '#FB923C';
    return (
      <View style={{ width: 'auto', marginBottom: 20, marginHorizontal: 5 }}>
        <TouchableOpacity onPress={() => { handlePressCode(item.code), discountCode1(item.discount), handleSelectItem(index) }}>
          <View
            style={[styles.coupanCard, { backgroundColor }]}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.dicount, { color }]}>{item.discount}%</Text>
            <Text style={styles.code}>{item.code}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

  };
  const deviceCondition = async (deviceId) => {
    setModalVisible(!modalVisible);
    await AsyncStorage.setItem('deviceId', deviceId);
    navigation.navigate("DeviceCondition", { time_slot: selectedCurrent });
  }

  ////////////// Get Address Start ///////////////

  // const getAddress = async () => {
  //   const getAdd_1 = await AsyncStorage.getItem("address1");
  //   const getAdd_2 = await AsyncStorage.getItem("address2");
  //   const getLandmark = await AsyncStorage.getItem("landmark");
  //   const getCity = await AsyncStorage.getItem("city");
  //   const getState = await AsyncStorage.getItem("state");
  //   const getPincode = await AsyncStorage.getItem("pincode");
  //   setFlatNo(getAdd_1 + getAdd_2 + getLandmark + getCity + getState + getPincode);
  // }

  ////////////// Get Address Start ///////////////

  const [priceOriginal, setPriceOrginal] = useState(''); // Original price
  const [discountCode, setDiscountCode] = useState('');
  const [visitingPrice, setVisitingPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [totalAmout, setTotalAmount] = useState('');


  // Start with 12:30 PM
  const startTime = moment().set('hour', 12).set('minute', 30).set('second', 0).set('millisecond', 0);

  // Create an array to store the times
  const times = [];

  // Loop to generate the next 12 times, each 1 hour after the previous one
  for (let i = 0; i < 20; i++) {
    const time = startTime.clone().add(i, 'hours').format('hh:mm A');
    times.push(time);
  }

  // State to store the selected time (only one time can be selected at a time)
  // Function to render times in 4 columns
  const renderTimesInRows = (times) => {
    let rows = [];
    for (let i = 0; i < times.length; i += 5) {
      rows.push(times.slice(i, i + 5));  // Slice out each set of 4 times
    }
    return rows;
  };


  const startDate = moment();

  // Create an array to store the days and dates (without times)
  const daysAndDates = [];

  // Loop to generate the next 10 days (1 week)
  for (let i = 0; i < 10; i++) {
    const day = startDate.clone().add(i, 'days').format('DD-MM-YYYY'); // Add 1 day for each iteration
    daysAndDates.push(day);
  }
  const renderWeekInRows = (daysAndDates) => {
    let rows = [];
    for (let i = 0; i < daysAndDates.length; i += 5) {
      rows.push(daysAndDates.slice(i, i + 5));  // Slice out each set of 5 dates
    }
    return rows;
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date); // Set the selected date to state
    await AsyncStorage.setItem("slot_no_day", JSON.stringify(date));
  };

  const handleTimeSelect = async (current) => {
    setSelectCurrent(current); // Set the selected date to state
    await AsyncStorage.setItem("time_slot", JSON.stringify(current));
  };


  const discountCode1 = async (dicount) => {
    console.log(dicount);
    const originalPrice = priceOriginal;
    const discountPercentage = dicount;

    // Calculate the discount price
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
    setTotalAmount(discountedPrice);
    setDiscountCode(discountAmount);
  };
  const discountPrice1 = async (price) => {
    setPriceOrginal(price);
    console.log(price);

  };

  const totalItemPrice = async (visitingCharge) => {
    console.log(visitingCharge);
    setVisitingPrice(visitingCharge);
  }

  const finalPricePay = async () => {
    // Ensure that discountCode and visitingPrice are numeric values
    const discountPrice = parseFloat(totalAmout) || 0; // Default to 0 if not a valid number
    const visitingPriceValue = parseFloat(visitingPrice) || 0; // Default to 0 if not a valid number

    // Calculate the total price by adding discount price and visiting price
    const finalItemPrice = discountPrice + visitingPriceValue;

    // Set the final price to your state or wherever you're storing it
    setFinalPrice(finalItemPrice);

    // Log the final price for debugging
    console.log('final Price', finalItemPrice);

    // Save the final price in AsyncStorage (ensure you're saving the correct variable)
    await AsyncStorage.setItem("final_price", JSON.stringify(finalItemPrice));
    setCoupanModal(!coupanModal);
  };

  const service_type = async (type) => {
    await AsyncStorage.setItem("serviceType", type);
  };
  const service_name = async (name) => {
    await AsyncStorage.setItem("serviceName", name);
  }

  const summaryData = async ({ item }) => {

    const totalPriceVisiting = item.price + item.visitingCharge;
    // Alert.alert(JSON.stringify(totalPriceVisiting));

    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.text_1, { marginLeft: 20, }]}>{item.type}</Text>
        <View style={styles.section_1}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.text_2}>{item.name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', width: 68 }}>
              <Text style={styles.text_4}>₹{item.price}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section_2}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={require('../../Icons/cupan.png')} />
            <Text style={styles.text_5}>Coupons & Offers : <Text style={{ color: '#FB923C', fontWeight: 'bold', marginLeft: 5, }}>{coupanCode}</Text></Text>

          </View>
          <TouchableOpacity onPress={() => {
            discountPrice1(item.price),
              totalItemPrice(item.visitingCharge),
              service_type(item.type),
              service_name(item.name),
              setCoupanModal(true);
          }}>
            <Text style={styles.text_6}>Offers </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section_4}>
          <Text style={styles.text_10}>Payment summary</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text_11}>Service Charge</Text>
            <Text style={styles.text_12}>₹{item.price}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text_11}>Discount</Text>
            {discountCode === '' ? (
              <Text style={styles.text_12}>₹0</Text>
            ) : (
              <Text style={styles.text_12}>-₹{discountCode}</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text_11}>Visiting Charge</Text>
            <Text style={styles.text_12}>₹{item.visitingCharge}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text_11}>Item Total</Text>
          {isTrue === false ? (
            <Text style={styles.text_12}>₹{item.price}</Text>
          ) : (
            <Text style={styles.text_12}>₹{totalPrice}</Text>)}
        </View> */}
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
            {finalPrice == "" ? (
              <Text style={styles.text_13}>₹{totalPriceVisiting}</Text>
            ) : (
              <Text style={styles.text_13}>₹{finalPrice}</Text>
            )}
          </View>
        </View>

        <View style={styles.section_3}>
          <Text style={styles.text_7}>Cancellation & rechedule</Text>
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.text_14}>
              Free cancellation/reschedules if done more than 4 hrs before the
              service.
            </Text>
            <Text style={styles.text_15}>Learn more</Text>
          </View>
        </View>

        <View>
          <View style={styles.section_5}>
            <View>
              <Text style={styles.text_16}>Pay Online (Visiting Charge) : <Text>{item.visitingCharge}</Text></Text>
            </View>
            <View>
              {totalAmout == "" ? (
                <Text style={styles.text_16}>Pay to field engineer after service or device inspection {'\n'}(Service charge) : {totalPriceVisiting} </Text>
              ) : (
                <Text style={styles.text_16}>Pay to field engineer after service or device inspection {'\n'}(Service charge) : {totalAmout} </Text>
              )}
            </View>
          </View>
          <View style={[styles.section_5, { flexDirection: 'row' }]}>
            <Text style={[styles.text_7, { color: '#FB923C', marginRight: 5, }]}>Note :</Text>
            <Text style={styles.text_2}>Price can increase on site after device inspection by engineer.</Text>
          </View>
        </View>
        {/* ================= Coupons Offers Modal Start========= */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={coupanModal}
          onRequestClose={() => {
            setCoupanModal(!coupanModal);
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
              <TouchableOpacity style={styles.CoupanbuttonBottom} onPress={() => finalPricePay()}>
                <Text style={styles.CoupanbuttonText}>Coupan Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* ================= Coupons Offers Modal End========= */}

        {/* ================= Add Service Modal Start========= */}
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
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
                <View style={{ justifyContent: 'center' }}>
                  {manuallyAddress == 'true' ? (
                    <>
                      <Text style={styles.headerText_1}>
                        {manuallyLocation}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.headerText_1}>
                        {currentLocation.length > 80 ? `${currentLocation.substring(0, 75)}...` : currentLocation}
                      </Text>
                    </>
                  )}
                </View>
                <Image source={require('../../Icons/downArrow.png')} style={{ width: 12, height: 12 }} />
              </View>
              <Text style={{ fontSize: 12, fontWeight: 600, lineHeight: 14.4, color: "#1C1B1F" }}>When should the professional arrive?</Text>
              <Text style={{ fontSize: 10, lineHeight: 15, fontWeight: 400, color: "#A09CAB" }}>Your service will take approx. 40 Mins</Text>
              <View style={{ marginVertical: 10, }}>
                <Text style={{ fontSize: 10, fontWeight: 500, lineHeight: 15, color: '#000000' }}>Choose Date & Time</Text>
                {renderWeekInRows(daysAndDates).map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((date, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dayCard,
                          selectedDate === date && styles.selectedDateButton // Change background color if selected
                        ]}
                        onPress={() => handleDateSelect(date)}
                      >
                        <Text style={[styles.dateText, selectedDate === date && styles.selectedDateButton]}>{date}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}

              </View>
              <View style={styles.modalHeader}>
                <Image source={require('../../Icons/debit.png')} />
                <View style={{ justifyContent: 'center', marginHorizontal: 4, }}>
                  <Text style={styles.modalHeaderTitle}>Online payment only for selected date</Text>
                </View>
              </View>
              {renderTimesInRows(times).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((current, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeCard,
                        selectedCurrent === current && styles.selectedDateButton // Change background color if selected
                      ]}
                      onPress={() => handleTimeSelect(current)}
                    >
                      <Text style={[styles.time_text, selectedCurrent === current && styles.selectedDateButton]}>{current}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
              <TouchableOpacity style={styles.buttonBottomModal} onPress={() => deviceCondition(item.deviceId)}>
                <Text style={styles.buttonText}>Proceed to checkout </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* ================= Add Service Modal End========= */}

      </View>
    )
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={data}
          renderItem={summaryData}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.topHeader2}>
          <View style={styles.headerLeft}>
            <View style={{ justifyContent: 'center' }}>  <Image source={require('../../Icons/locationIcon.png')} /></View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.headerText_1}>
                {manuallyAddress == 'true' ? (
                  <>
                    <Text style={styles.headerText_1}>
                      {manuallyLocation}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.headerText_1}>
                      {currentLocation.length > 80 ? `${currentLocation.substring(0, 75)}...` : currentLocation}
                    </Text>
                  </>
                )}
                {/* {flat_no} */}
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Image source={require('../../Icons/downArrow.png')} style={{ width: 12, height: 12 }} />
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('SelectAddress')}>
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
    paddingHorizontal: 4,
    flexDirection: 'row',
    marginHorizontal: 20,
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
    position: 'absolute',
    height: 120,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    elevation: 5,
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
  CoupanbuttonBottom: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    backgroundColor: '#FB923C',
    borderColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginVertical: 5,
  },
  CoupanbuttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
    color: '#fff',
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
    width: 65,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: '#A09CAB',
    marginHorizontal: 2,
    marginVertical: 4,
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
    borderRadius: 5,
    elevation: 5,
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
    width: 65,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: '#A09CAB',
    marginHorizontal: 2,
    marginVertical: 4,
    justifyContent: "center",
  },
  time_text: {
    fontSize: 10,
    fontWeight: 400,
    color: '#000000',
    lineHeight: 12,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateText: {
    fontSize: 10, fontWeight: 500, lineHeight: 12, textAlign: "center", color: '#000',
  },

  selectedDateButton: {
    backgroundColor: '#FB923C',
    color: '#fff',
    borderColor: '#FB923C', // Background color when selected
  },


  section_5: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
  },

  text_16: {
    fontSize: 12,
    fontWeight: 500,
    color: '#1C1B1F',
  },
});


