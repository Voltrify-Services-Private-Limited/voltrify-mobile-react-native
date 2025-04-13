import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = (props) => {

  const decrease = () => {
    if (props.count > 1) {
      props.setCount(props.count - 1);
    }
  };

  const increase = () => {
    if (props.count < 10) {
      props.setCount(props.count + 1);
    }
  };

  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrease}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>

      <Text style={styles.count}>{props.count}</Text>

      <TouchableOpacity style={styles.button} onPress={increase}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  button: {
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 20,
    color: '#f57c00', // orange
  },
  count: {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#f57c00',
  },
});
