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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

// import Progress from 'react-native-progress';

const OrdersDetails = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  // State to hold the selected date
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCurrent, setSelectCurrent] = useState(null);
  const { order_id } = route.params;
  const { device_id } = route.params;
  const [idDevice, setIdDevice] = useState('');
  const [modalCancle, setModalCancle] = useState(false);

  useEffect(() => {
    getAllService();
    getDeviceId();
    console.log('===== Order Detail ======', device_id);
  }, []);

  const getDeviceId = async () => {
    setIdDevice(device_id);
    console.log("aabsbubabau", data.service_charge);
  }

  const getAllService = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
      const latitude = await AsyncStorage.getItem("latitude");
      setCurrentLocation(latitude);
      const response = await fetch(`http://api.voltrify.in/user/orders/${order_id}`, {
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
      console.log(resData)
    } catch (err) {
      console.log('get Order err --- ', err);
    }
  };



  const cancleOrder = async () => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    try {
      const response = await fetch(`http://api.voltrify.in/user/orders/cancel/${order_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
      });
      const jsonResponse = await response.json();
      console.log('Success', 'Data updated successfully!', jsonResponse);
      navigation.navigate('CancleOrder');
    } catch (error) {
      console.log('Error', error.message, [{ text: 'OK' }]);
    }
  };
  const RescheduleOrder = async () => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    const timeSlot = await AsyncStorage.getItem('time_slot')
    const time = JSON.parse(timeSlot);
    try {
      const response = await fetch(`http://api.voltrify.in/user/orders/reschedule/${order_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
        body: JSON.stringify({
          time_slot: time,
        }), // Replace with your data structure
      });
      const jsonResponse = await response.json();
      console.log('Success', 'Data updated successfully!', jsonResponse);
    } catch (error) {
      console.log('Error', error.message, [{ text: 'OK' }]);
    }
  };

  const selectSlotOpen = () => {
    setModalVisible(!modalVisible);
  }
  const selectSlotClose = () => {
    setModalVisible(!modalVisible);
    RescheduleOrder();
  }

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


  const setOrderRequire = async (id) => {
    navigation.navigate("EditOrder", { id_Device: idDevice })
    await AsyncStorage.setItem('orderId', id)
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../Icons/leftArrow.png')} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Order Details</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setOrderRequire(data.id)}>
            <Image source={require('../../Icons/edit.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.orderText1}>{data.service_type}</Text>
        <Text style={styles.orderText2}>{data.user_description} </Text>
        <View style={styles.listView}>
          <View style={styles.listItem}>
            <View style={styles.leftSide}>
              <Text style={styles.lable}>Date</Text>
              <Text style={styles.value}>{data.date}</Text>
            </View>
            <View style={styles.leftSide}>
              <Text style={styles.lable}>Time</Text>
              <Text style={styles.value}>{data.time_slot}</Text>
            </View>
          </View>
          <View style={[styles.listView, { paddingHorizontal: 0 }]}>
            <View style={styles.listItem}>
              <View style={styles.leftSide}>
                <Text style={styles.lable}>Device Brand</Text>
                {data.user_device_brand == null ? (
                  <Text style={styles.value}>NA</Text>
                ) : (<Text style={styles.value}>{data.user_device_brand}</Text>)}
              </View>
              <View style={styles.leftSide}>
                <Text style={styles.lable}>Price</Text>
                <Text style={styles.value}>₹ {data.final_amount}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <View style={styles.listItem}>
            <View style={styles.leftSide}>
              <Text style={styles.lable}>Device Modal</Text>
              {data.user_device_model == null ? (
                <Text style={styles.value}>NA</Text>
              ) : (<Text style={styles.value}>{data.user_device_model}</Text>)}
            </View>
            <View style={styles.leftSide}>
              <Text style={styles.lable}>Payment Mode</Text>
              <Text style={styles.value}>{data.payment_mode}</Text>
            </View>
          </View>
          <View style={[styles.listView, { paddingHorizontal: 0 }]}>
            <View style={styles.listItem}>
              <View style={styles.leftSide}>
                <Text style={styles.lable}>Status</Text>
                <Text style={styles.value}>{data.status}</Text>
              </View>
            </View>
          </View>
          {data.status === 'pending' ? (
            <View>

            </View>
          ) : (
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => selectSlotOpen()}>
                <Text style={styles.buttonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FB923C' }]} onPress={() => setModalCancle(true)}>
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                  Cancle order
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
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
              <Text style={styles.headerText_1}>
                {currentLocation}
              </Text>
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
            <TouchableOpacity style={styles.buttonBottomModal} onPress={() => selectSlotClose()}>
              <Text style={styles.buttonText}>Reschedule Order </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ================= Add Service Modal End========= */}


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalCancle}
        onRequestClose={() => {
          setModalCancle(!modalCancle);
        }}
      >
        <View style={styles.mainViewCancle}>
          <View style={styles.modalViewCancle}>
            <Text style={styles.modalTextCancle}>Please Cancle Your Order!</Text>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setModalCancle(false)}>
                <Text style={styles.modalBtnText}>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={() => cancleOrder()}  >
                <Text style={styles.modalBtnText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

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
    justifyContent: "space-between",
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
  orderText1: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 16.8,
    color: '#000000',
    marginHorizontal: 10,
  },
  orderText2: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 16,
    color: '#000',
    marginHorizontal: 10,
  },
  listView: {
    height: 120,
    padding: 10,
  },
  listItem: {
    borderTopWidth: 0.87,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
    borderTopColor: '#E5E8EB',
  },
  leftSide: {
    alignItems: 'flex-start',
    width: '50%',
    paddingTop: 5,
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    width: '49%',
    height: 40,
    borderWidth: 1,
    borderColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
  },
  progress_1: {
    width: 155,
    height: 7.38,
    borderRadius: 4,
    backgroundColor: '#D1DBE8',
  },
  progress_2: {
    width: 133,
    height: 7.38,
    borderRadius: 4,
    backgroundColor: '#FB923C',
  },
  progress_3: {
    width: 28,
    height: 7.38,
    borderRadius: 4,
    backgroundColor: '#FB923C',
  },
  progress_3: {
    width: 0,
    height: 7.38,
    borderRadius: 4,
    backgroundColor: '#FB923C',
  },
  barText1: {
    fontSize: 13,
    fontWeight: 400,
    color: '#000000',
    marginRight: 10,
  },
  barText2: {
    fontSize: 13,
    fontWeight: 400,
    color: '#000000',
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 33,
    fontWeight: 900,
    color: '#000000',
  },
  reviewsText: {
    fontSize: 14,
    fontWeight: 400,
    color: '#000000',
    marginTop: 5,
  },

  buttonBottom: {
    width: 'auto',
    height: 54,
    borderWidth: 1,
    borderColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    top: 25,
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
  mainViewCancle: {
    flex: 1,
    justifyContent: "center",
    shadowColor: '#000',
    backgroundColor: 'rgba(31, 31, 31, 0.5)',
  },
  modalViewCancle: {
    margin: 20,
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextCancle: {
    marginBottom: 15,
    marginTop: 20,
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 16.8,
    color: '#fff',
  },
  modalBtn: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FB923C",
    borderRadius: 5,
    marginTop: 20,
  },
  lable: {
    fontSize: 15,
    fontWeight: 600,
    color: '#000000',
    textTransform: 'capitalize',
  },

  value: {
    fontSize: 14,
    fontWeight: 400,
    color: '#000000',
    textTransform: 'capitalize',
  },
  headerText_1: {
    fontSize: 8,
    fontWeight: 500,
    lineHeight: 9.6,
    color: '#000000B2',
    marginHorizontal: 5,
    marginTop: 1,
  },

});

export default OrdersDetails;
