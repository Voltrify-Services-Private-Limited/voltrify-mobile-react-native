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
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceType } from '../../Component/utils';


const dataService = [
  { id: 1, city: 'gwalior', typeService: 'REPAIR', imageUrl: require('../../Icons/repair.png'), },
  { id: 2, city: 'gwalior', typeService: 'MAINTENANCE', imageUrl: require('../../Icons/maintenance.jpg'), },
  { id: 3, city: 'gwalior', typeService: 'UPGRADE', imageUrl: require('../../Icons/upgrade.png'), },
]


const ServiceDetails = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const { service_id } = route.params;
  const { service_description } = route.params;
  const { deviceId } = route.params;
  // const [typeList, setTypeList] = useState(ServiceType);
  const [type, setType] = useState("");
  const [city, setCity] = useState("");

  // Function to handle text press
  const handlePressDay = async (typeService) => {
    setType(typeService);
    getAllService(typeService);
    console.log(typeService);
  };


  const addCartBtn = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('ServiceViewCart');
  }

  useEffect(() => {
    getAllService('REPAIR');

  }, []);

  const getAllService = async (typeService) => {
    try {
      const userData = await AsyncStorage.getItem('access_token');
      const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
      const response = await fetch(`http://api.voltrify.in/service/${deviceId}?city=gwalior&type=${typeService}`, {
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
      console.log(resData.data);
      await AsyncStorage.setItem('deviceId', deviceId);
    } catch (err) {
      console.log('get Device err --- ', err);
    }
  };

  const createCart = async (id) => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    const user_id = await AsyncStorage.getItem('userId');
    console.log("adsssdd", token);
    result = await fetch('http://api.voltrify.in/user/cart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, depending on your API requirements
      },
      body: JSON.stringify({
        service_id: id,
        user_id: user_id,
      }),

    });
    // setData(data.filter(item => item.id !== id));
    response = await result.json();
    console.log('create Order', response);
    navigation.navigate("SummaryScreen");
  }

  const serviceAddBtn = async (id) => {
    const userData = await AsyncStorage.getItem('access_token');
    const token = JSON.parse(userData); // Assuming userData is a JSON string containing the token
    const user_id = await AsyncStorage.getItem('userId');
    const url = 'http://api.voltrify.in/user/cart';
    console.log("adsssdd", id);
    result = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Optional, depending on your API requirements
      },
      body: JSON.stringify({
        service_id: id,
        user_id: user_id,
      }),

    });
    setData(data.filter(item => item.id !== id));
    response = await result.json();
    console.log('login data', response);
    navigation.navigate("SummaryScreen");
  }

  const navigateOther = async (id) => {
    navigation.navigate('SummaryScreen');
    await AsyncStorage.setItem('serviceId', id);
  }

  const deviceIdItem = ({ item }) => (
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
          <Text style={styles.contentText4}>{item.name}</Text>
          <Text style={styles.contentText6} >{item.description.length > 15 ? `${item.description.substring(0, 50)}...` : item.description}</Text>
          <Text style={styles.contentText5}>Service charge starts at ₹{item.price}</Text>
          <Text style={styles.contentText7}>Visit charge ₹{item.visitingCharge}</Text>
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Image source={
            item.deviceImage?.length > 0
              ? { uri: item.deviceImage[0] }
              : require('../../Icons/serviceImage.png')
          }
            style={{ width: 50, borderRadius: 5, height: 50, }} />
          <TouchableOpacity style={styles.addBtn} onPress={() => { createCart(item.id), navigateOther(item.id) }}>
            <Text style={styles.addBtnText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressDay(item.typeService)}>
      <View style={{ marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', width: 80, height: 80, backgroundColor: '#fff', elevation: 4, padding: 5, borderRadius: 10, marginVertical: 10, }}>
        <Image source={item.imageUrl}
          style={{ width: 60, borderRadius: 10, height: 60 }} />
        <Text style={styles.cardText}>{item.typeService}</Text>
      </View>
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
        {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.backButton2}
            onPress={() => navigation.navigate('ServiceSearch')}>
            <Image source={require('../../Icons/searchIcon2.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton2}
            onPress={() => props.navigation.goBack()}>
            <Image source={require('../../Icons/shareIcon.png')} />
          </TouchableOpacity>
        </View> */}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.serviceContent}>
          {/* ================= Add Service Modal End========= */}
          <View style={styles.content}>
            <Text style={styles.contentText1}>{type}</Text>
            <View style={styles.cardBox}>
              <FlatList
                data={dataService}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>

            {/* <View style={styles.serviceBox}>
              {data.length > 0 && (
                <View key={data[0].type}>
                  <Text style={styles.contentText1}>{data[0].name}</Text>
                </View>
              )}
            </View> */}

            <View style={{ marginBottom: 200 }}>
              <FlatList
                data={data}
                renderItem={deviceIdItem}
                keyExtractor={(item) => item.id.toString()}
              />

            </View>
          </View>
        </View>
      </ScrollView>
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
    zIndex: 6,
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
    zIndex: 4,
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
    height: 'auto',
    backgroundColor: '#F7F7F7',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  cardText: {
    fontSize: 8,
    fontWeight: 500,
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
    fontSize: 10,
    fontWeight: 700,
    color: '#FB923C',
    marginTop: 5,
  },
  contentText6: {
    fontSize: 12,
    fontWeight: 400,
    color: '#000',
  },
  contentText7: {
    fontSize: 10,
    fontWeight: 700,
    color: '#4ADE80',
    marginTop: 5,
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

  modalViewModal: {
    backgroundColor: 'white',
    width: '100%',
    height: 400,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignItem: 'center',
    height: 360,
  },

  main_viewModal: {
    flex: 1,
    backgroundColor: '#FB923C',
  },
  text_1Modal: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 4,
  },
  text_7Modal: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'left',
    color: '#00000066',
    width: '100%',
  },
  second_viewModal: {
    width: '100%',
    height: 360,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
  text_3Modal: {
    fontSize: 24,
    fontWeight: 700,
    color: '#000000',
    lineHeight: 28,
    textAlign: 'left',
    marginTop: 16,
  },
  text_4Modal: {
    fontSize: 15,
    fontWeight: 400,
    color: '#797979',
    lineHeight: 20,
    textAlign: 'left',
    marginTop: 10,
    lineHeight: 25,
  },
  buttonModal: {
    width: 328,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 50,
    marginVertical: 8,
  },
  text_5Modal: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    textAlign: 'center',
    paddingVertical: 16,
  },
  text_6Modal: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    paddingVertical: 16,
    marginHorizontal: 5,
  },
  lineBoxModal: {
    width: 328,
    height: 14,
    top: 36,
    marginVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  lineTextModal: {
    fontSize: 12,
    fontWeight: 600,
    color: '#00000033',
    lineHeight: 14.4,
    marginHorizontal: 5,
  },

  lineModal: {
    width: 145,
    height: 1,
    top: 2,
    backgroundColor: '#00000033',
    marginVertical: 16,
    alignItems: 'center',
  },

  btn1Modal: {
    width: 60,
    height: 33,
    borderWidth: 1,
    borderColor: '#FB923C',
    backgroundColor: '#FB923C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  btn2Modal: {
    width: 60,
    height: 33,
    borderWidth: 1,
    borderColor: '#FB923C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  btnText1Modal: {
    fontSize: 12,
    fontWeight: 500,
    color: '#ffffff',
    lineHeight: 14.4,
  },
  btnText2Modal: {
    fontSize: 12,
    fontWeight: 500,
    color: '#FB923C',
    lineHeight: 14.4,
  },
  modalCard: {
    width: 75,
    height: 70,
    borderRadius: 4,
    borderWidth: 0.2,
    padding: 4,
    borderColor: '#A09CAB',
    marginHorizontal: 4,
  },
  modalHeading: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 15,
    color: '#000',
  },
  modalReviewText: {
    fontSize: 6,
    fontWeight: 400,
    color: "#1C1B1F",
    marginTop: 2
  },
  starImgModal: {
    width: 6,
    height: 6,
    marginVertical: 2,
  },
  modalPriceText: {
    fontSize: 6,
    fontWeight: 700,
    lineHeight: 18,
    color: '#000',
  },
  addBtnModal: {
    width: 30,
    height: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#A09CAB',
    justifyContent: 'center',
  },
  addBtnTextModal: {
    fontSize: 6,
    fontWeight: 400,
    textAlign: 'center',
    color: "#FB923C"
  }
});

export default ServiceDetails;
