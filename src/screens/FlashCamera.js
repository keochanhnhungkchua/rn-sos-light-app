import Paho from 'paho-mqtt';

import {useState, useEffect} from 'react';
import {StyleSheet, Text, Button, View, Image, Pressable} from 'react-native';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    if (message.destinationName === 'esp32/test123')
      console.log(message.payloadString);
    setValue(parseInt(message.payloadString));
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log('Connected!');
        client.subscribe('esp32/test123');
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log('Failed to connect!');
      },
    });
  }, []);

  function changeValue(c, text) {
    const message = new Paho.Message(text.toString());
    message.destinationName = 'esp32/test123';
    c.send(message);
  }
  const uriCam = 'http://192.168.1.8/jpg';
  const uriCamRTSP = 'rtsp://192.168.1.8:8554/mjpeg/1';

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 400,
          height: 300,
          backgroundColor: 'blue',
        }}>
        <Text>esp32 cam ip : http://192.168.1.8</Text>
        <WebView
          source={{
            uri: 'http://192.168.1.8',
            // uri: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
          }}
          style={{
            marginTop: 20,
            maxHeight: 300,
            width: '100%',
            flex: 1,
            backgroundColor: 'red',
          }}
        />
      </View>
      <Text>Value is: {value}</Text>

      <View>
        <View style={{marginLeft: 60}}>
          <MaterialCommunityIcons
            name="arrow-up-thick"
            color="black"
            size={40}
            onPress={() => {
              changeValue(client, 'up');
            }}
          />
        </View>
        <View style={{flexDirection: 'row', gap: 40, marginTop: 20}}>
          <Pressable
            onPressIn={() => {
              changeValue(client, 'left');
            }}
            onPressOut={() => {
              changeValue(client, 'off');
            }}>
            <MaterialCommunityIcons
              name="arrow-left-thick"
              color="black"
              size={40}
            />
          </Pressable>

          <MaterialCommunityIcons
            name="arrow-down-thick"
            color="black"
            size={40}
            style={{paddingHorizontal: 20}}
            onPress={() => {
              changeValue(client, 'down');
            }}
          />
          <MaterialCommunityIcons
            name="arrow-right-thick"
            color="black"
            size={40}
            onPress={() => {
              changeValue(client, 'right');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
