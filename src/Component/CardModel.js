import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'


const CardModel = () => {
  return (
    <View>
      <Modal
             animationType="slide"
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => {
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
                     source={require('../Icons/debit.png')}
                     
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
                   <Text style={{fontSize: 10}}>
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
                   onPress={() => props.navigation.navigate('LoginScreenEmail')}>
                   <Text style={styles.text_6}>Save details</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </Modal>
    </View>
  )
}

export default CardModel

const styles = StyleSheet.create({
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
    alignItems:'center'
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
})