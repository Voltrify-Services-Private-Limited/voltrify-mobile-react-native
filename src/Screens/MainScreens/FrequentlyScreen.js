import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

const FrequentlyScreen = props => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const faqData = [
    {
      question: 'What are the charges for different services?',
      answer: 'The charges vary based on the type of service. You can view pricing on the services page.',
    },
    {
      question: 'Can I pay online after the service is done?',
      answer: 'Yes, we support UPI, cards, and other online payment methods after service completion.',
    },
    // Add more FAQs as needed
  ];
  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../Icons/leftArrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Frequently Asked Questions</Text>
      </View>

      <View style={styles.searchBar}>
        <Image
          source={require('../../Icons/searchIcon.png')}
          style={{marginVertical: 10, width: 14, height: 14}}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#00000066"
          style={styles.searchInput}
        />
      </View>
      
      {faqData.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            onPress={() => setExpandedIndex(index === expandedIndex ? null : index)}>
            <Text style={[styles.listText, { flex: 1, flexShrink: 1, marginRight: 8 }]} numberOfLines={2} ellipsizeMode="tail">{item.question}</Text>
            <Image source={require('../../Icons/rightArrow.png')} style={{ flexShrink: 0 }} />
          </TouchableOpacity>
          {expandedIndex === index && (
            <Text style={styles.answerText}>{item.answer}</Text>
          )}
        </View>
      ))}
    </View>
  );
};
export default FrequentlyScreen;
const styles = StyleSheet.create({
  answerText: {
    color: '#444',
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 5,
  },
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
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#FB923C',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00000066',
    width: '90%',
    lineHeight: 14.4,
  },
  listItem: {
    display: 'flex',
    borderBottomWidth: 0.2,
    marginHorizontal: 10,
    borderBottomColor: '#A09CAB',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  listText: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 14,
    color: '#1C1B1F',
  },
});


