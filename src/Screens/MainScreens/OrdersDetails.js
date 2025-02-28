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
// import Progress from 'react-native-progress';

const OrdersDetails = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dayData, setDayData] = useState(ChooseDay);
  const [timeData, setTime] = useState(ChooseTime);
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const { order_id } = route.params;

  useEffect(() => {
    getAllService();
    console.log('===== Order Detail ======', order_id);
  }, []);

  const getAllService = async () => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token

      const response = await fetch(`http://api.voltrify.in/service/${order_id}`, {
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
        body: JSON.stringify({ data }), // Replace with your data structure
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      console.log('Success', 'Data updated successfully!', [{ text: 'OK' }]);
      Alert.alert(jsonResponse);
    } catch (error) {
      console.log('Error', error.message, [{ text: 'OK' }]);
    }
  }; const RescheduleOrder = async () => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    try {
      const response = await fetch(`http://api.voltrify.in/user/orders/reschedule/${order_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional, depending on your API requirements
        },
        body: JSON.stringify({
          time_slot: selectedTime,
        }), // Replace with your data structure
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      console.log('Success', 'Data updated successfully!', [{ text: 'OK' }]);
      Alert.alert(jsonResponse);
    } catch (error) {
      console.log('Error', error.message, [{ text: 'OK' }]);
    }
  };

  const selectSlot = () => {
    setModalVisible(!modalVisible);
    RescheduleOrder();
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
            onPress={() => navigation.navigate("EditOrder")}>
            <Image source={require('../../Icons/edit.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView scrollEnabled={false}>
        {data.map(item => (
          <View key={item}>
            <Text style={styles.orderText1}>{item.name}</Text>
          </View>
        ))}
        {data.map(item => (
          <View key={item}>
            <Text style={styles.orderText2}>
              {item.description}
            </Text>
          </View>
        ))}
        <View style={styles.listView}>
          <View style={styles.listItem}>
            <View style={styles.leftSide}>
              <Text>Date</Text>
              <Text>22/07/23</Text>
            </View>
            <View style={styles.leftSide}>
              <Text>Time</Text>
              <Text>09:00 AM</Text>
            </View>
          </View>
          <View style={styles.listItem}>
            <View style={styles.leftSide}>
              <Text>Service provider</Text>
              <Text>Sylvia</Text>
            </View>
            <View style={styles.leftSide}>
              <Text>Price</Text>
              <Text>₹499</Text>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <View style={styles.listItem}>
            <View style={styles.leftSide}>
              <Text>Cleaning tools</Text>
              <Text>Included</Text>
            </View>
            <View style={styles.leftSide}>
              <Text>Detergent</Text>
              <Text>Included</Text>
            </View>
          </View>
          <View style={styles.listItem}>
            <View style={styles.leftSide}>
              <Text>Eco fee</Text>
              <Text>₹100</Text>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => selectSlot()}>
              <Text style={styles.buttonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FB923C' }]} onPress={() => cancleOrder()}>
              <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                Cancle order
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 1,
            }}> */}
          {/* <View>
              <Text style={styles.ratingText}>5</Text>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starblank2.png')} />
              </View>
              <Text style={styles.reviewsText}>12 reviews</Text>
            </View> */}
          {/* <View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>5</Text>
                <View style={{ justifyContent: 'center' }}>
                  {/* <Progress.Bar
                  progress={0.9}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
          {/* <View style={styles.progress_1}>
                    <View style={styles.progress_2}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>90%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>4</Text>
                <View style={{ justifyContent: 'center' }}> */}
          {/* <Progress.Bar
                  progress={0.1}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
          {/* <View style={styles.progress_1}>
                    <View style={styles.progress_3}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>10%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>3</Text>
                <View style={{ justifyContent: 'center' }}> */}
          {/* <Progress.Bar
                  progress={0.0}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
          {/* <View style={styles.progress_1}>
                    <View style={styles.progress_4}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>0%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>2</Text>
                <View style={{ justifyContent: 'center' }}> */}
          {/* <Progress.Bar
                  progress={0.0}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
          {/* <View style={styles.progress_1}>
                    <View style={styles.progress_4}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>0%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>1</Text>
                <View style={{ justifyContent: 'center' }}> */}
          {/* <Progress.Bar
                  progress={0.0}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
          {/* <View style={styles.progress_1}>
                    <View style={styles.progress_4}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>0%</Text>
              </View> 
            </View> 
          </View> */}
          {/* 
          <TouchableOpacity style={styles.buttonBottom}>
            <Text style={styles.buttonText}>Submit review</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
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
              <Image source={require('../../Icons/downArrow.png')} style={{width:12,height:12}}  />
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
            <TouchableOpacity style={styles.buttonBottomModal} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Proceed to checkout </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ================= Add Service Modal End========= */}

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
  },
  orderText2: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 16,
    color: '#A09CAB',
  },
  listView: {
    height: 127,
    padding: 10,
    marginVertical: 10,
  },
  listItem: {
    borderTopWidth: 0.87,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 58,
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

export default OrdersDetails;
