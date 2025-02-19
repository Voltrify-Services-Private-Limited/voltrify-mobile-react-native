import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function BottomSheetModal() {
  // const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  return (
    <View style={styles.container}>
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1d0f4e'}}>
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
          <Button title="Close" onPress={handleClosePress} />
        </View>
        <BottomSheetTextInput style={styles.input} />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    // flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    color: '#fff',
  },
  input: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    color: '#fff',
  },
});
