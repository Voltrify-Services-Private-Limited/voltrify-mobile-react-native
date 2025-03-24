import {View, Text, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
// import {ActivityIndicator} from 'react-native-paper';
const Loader = ({visible}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#2F80ED" />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent overlay
  },
  loader: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default Loader;
