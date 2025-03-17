// components/CustomModal.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const CustomModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text_6}>Trun On Location </Text>
          <TouchableOpacity
            style={[styles.button]}
            onPress={onClose}>
            <Text style={styles.text_5}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    height: 200,
    justifyContent: 'center'
  },

  text_6: {
    fontSize: 18,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    paddingVertical: 16,
    marginHorizontal: 5,
  },
  
  button: {
    width: '80%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#FB923C',
    top: 20,
    marginVertical: 20,
  },
  text_5: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000000',
    lineHeight: 19.2,
    textAlign: 'center',
    paddingVertical: 16,
  },
});

export default CustomModal;
