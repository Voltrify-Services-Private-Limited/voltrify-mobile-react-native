import {View, Text, Modal, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={Styles.modalView}>
        <View style={Styles.mainView}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modalView: {
    width: Width,
    height: Height,
    backgroundColor: 'rgba(0,0,0,.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
