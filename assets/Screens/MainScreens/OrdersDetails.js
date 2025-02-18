import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ProgressBarAndroid,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import Progress from 'react-native-progress';

const OrdersDetails = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
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
        body: JSON.stringify({data}), // Replace with your data structure
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      console.log('Success', 'Data updated successfully!', [{ text: 'OK' }]);
      console.log(jsonResponse);
    } catch (error) {
      console.log('Error', error.message, [{ text: 'OK' }]);
    }
  };

  // const cancleOrder = async () => {
  //   const userData = await AsyncStorage.getItem('userData');
  //   const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
  //   try {
  //     const response = await fetch(`http://api.voltrify.in/user/orders/cancel/${order_id}`, {
  //       method: 'PUT',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json', // Optional, depending on your API requirements
  //       },
  //     });

  //     if (response.ok) {
  //       console.log('Success', 'Item Cancle Order successfully');
  //     } else {
  //       console.log('Error', 'Failed to cancle Order item');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     console.log('Error', 'An error occurred while deleting the item');
  //   }

  // };

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Details</Text>
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
              <Text>09:00AM</Text>
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
              onPress={() => navigation.navigate('SummaryScreen')}>
              <Text style={styles.buttonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FB923C' }]} onPress={() => cancleOrder()}>
              <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                Cancle order
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 1,
            }}>
            <View>
              <Text style={styles.ratingText}>5</Text>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starFill2.png')} />
                <Image source={require('../../Icons/starblank2.png')} />
              </View>
              <Text style={styles.reviewsText}>12 reviews</Text>
            </View>
            <View>
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
                  <View style={styles.progress_1}>
                    <View style={styles.progress_2}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>90%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>4</Text>
                <View style={{ justifyContent: 'center' }}>
                  {/* <Progress.Bar
                  progress={0.1}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
                  <View style={styles.progress_1}>
                    <View style={styles.progress_3}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>10%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>3</Text>
                <View style={{ justifyContent: 'center' }}>
                  {/* <Progress.Bar
                  progress={0.0}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
                  <View style={styles.progress_1}>
                    <View style={styles.progress_4}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>0%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>2</Text>
                <View style={{ justifyContent: 'center' }}>
                  {/* <Progress.Bar
                  progress={0.0}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
                  <View style={styles.progress_1}>
                    <View style={styles.progress_4}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>0%</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.barText1}>1</Text>
                <View style={{ justifyContent: 'center' }}>
                  {/* <Progress.Bar
                  progress={0.0}
                  animated={false}
                  color="#FB923C"
                  unfilledColor="#D1DBE8"
                  height={7.38}
                  borderRadius={4}
                  borderWidth={0}
                /> */}
                  <View style={styles.progress_1}>
                    <View style={styles.progress_4}></View>
                  </View>
                </View>
                <Text style={styles.barText2}>0%</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonBottom}>
            <Text style={styles.buttonText}>Submit review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});

export default OrdersDetails;
