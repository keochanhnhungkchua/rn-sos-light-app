import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Torch from 'react-native-torch';

let handIstorch = false;

const FlashCamera = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [time, setTime] = useState(1);

  const delay = delay => {
    return new Promise(resolve => setTimeout(resolve, delay * 1000));
  };

  const handlePressOnOff = () => {
    setIsTorchOn(!isTorchOn);
    handIstorch = !handIstorch;
  };

  useEffect(() => {
    const t = async () => {
      while (handIstorch) {
        Torch.switchState(true);
        await delay(time);
        Torch.switchState(false);
      }
    };
    t();
  }, [isTorchOn]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setTime}
            value={time}
            placeholder="enter the number of seconds"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePressOnOff()}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {handIstorch ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#2196f3',
    textAlign: 'center',
    height: 40,
    margin: 12,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default FlashCamera;
