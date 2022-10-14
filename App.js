import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import Torch from 'react-native-torch';

const App = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);

  const delay = delayInms => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

  const handlePress = () => {
    setIsTorchOn(!isTorchOn);
  };

  useEffect(() => {
    const t = async () => {
      console.log('99', isTorchOn);

      while (isTorchOn) {
        console.log(isTorchOn);
        Torch.switchState(true);
        await delay(3000);
        Torch.switchState(false);
      }
    };
    t();
  }, [isTorchOn]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Button title="Press me 123" onPress={() => handlePress()} />
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
});

export default App;
