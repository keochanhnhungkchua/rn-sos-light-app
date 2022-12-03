import Paho from 'paho-mqtt';

import {useState, useEffect} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';

// client = new Paho.Client(
//   'broker.hivemq.com',
//   Number(8000),
//   `mqtt-async-test-${parseInt(Math.random() * 100)}`,
// );
client = new Paho.Client(
  'broker.emqx.io',
  Number(8083),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`,
);
export default function App() {
  const [value, setValue] = useState(0);

  function onMessage(message) {
    if (message.destinationName === 'esp32/test')
      console.log(message.payloadString);
    setValue(parseInt(message.payloadString));
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log('Connected!');
        client.subscribe('esp32/test');
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log('Failed to connect!');
      },
    });
  }, []);

  function changeValue(c) {
    const message = new Paho.Message((value + 1).toString());
    message.destinationName = 'esp32/test';
    c.send(message);
  }

  return (
    <View style={styles.container}>
      <Text>Value is: {value}</Text>
      <Button
        onPress={() => {
          changeValue(client);
        }}
        title="Press Me"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
