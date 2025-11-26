import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const BannerCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    // Only set interval if we have more than 1 item
    if (data.length <= 1) return;

    const timer = setInterval(() => {
      // Calculate next index
      const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
      
      // Scroll to next index
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 2000); // 5 seconds interval

    return () => clearInterval(timer);
  }, [currentIndex, data.length]);

  // Handle manual scroll updates to reset timer logic visually
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Render a single banner item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover" 
        />
      </View>
    );
  };

  // Render pagination dots
  const renderDotIndicators = () => {
    return (
      <View style={styles.dotContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? '#FB923C' : '#D9D9D9' },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
            length: screenWidth - 20, // Width of one item (screen width - padding)
            offset: (screenWidth - 20) * index,
            index,
        })}
      />
      {renderDotIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 160, 
    borderRadius: 10,
    overflow: 'hidden', 
  },
  itemContainer: {
    // Width corresponds to screenWidth minus parent padding (10px left + 10px right)
    width: screenWidth - 20, 
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default BannerCarousel;