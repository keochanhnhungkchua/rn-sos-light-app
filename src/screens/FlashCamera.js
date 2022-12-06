import Paho from 'paho-mqtt';

import {useState, useEffect} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import {WebView} from 'react-native-webview';

client = new Paho.Client(
  'broker.hivemq.com', //host connect ws
  Number(8000), //port
  `mqtt-async-test-${parseInt(Math.random() * 100)}`, //client id
);
export default function App() {
  const [value, setValue] = useState(0);
  console.log(client);
  function onMessage(message) {
    if (message.destinationName === 'mqtt-async-test/value123')
      console.log(message);
    setValue(parseInt(message.payloadString));
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log('Connected!');
        client.subscribe('mqtt-async-test/value123');
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log('Failed to connect!');
      },
    });
  }, []);

  function changeValue(c) {
    const message = new Paho.Message((value + 1).toString());
    message.destinationName = 'mqtt-async-test/value123';
    c.send(message);
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Text>Show webview</Text>
      <WebView
        source={{
          uri: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
        }}
        style={{
          marginTop: 20,
          maxHeight: 300,
          width: '100%',
          flex: 1,
        }}
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
