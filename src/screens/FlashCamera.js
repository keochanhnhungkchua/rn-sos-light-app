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
const UP = 2;
const DOWN = 1;
const LEFT = 3;
const RIGHT = 4;
const STOP = 0;
export default function App() {
  const [value, setValue] = useState('off');

  function onMessage(message) {
    if (message.destinationName === 'esp32/test123')
      console.log(message.payloadString);
    setValue(message.payloadString);
  }
  const [connectToServer, setConnectToServer] = useState('no connect !');
  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log('Connected!');
        setConnectToServer('Connected!');
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
  const uriCam = 'http://192.168.1.8:81/stream';
  const uriCamRTSP = 'rtsp://192.168.1.8:8554/mjpeg/1';

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 400,
          height: 300,
          backgroundColor: 'blue',
        }}>
        <Text style={{color: 'white', marginTop: 5, paddingLeft: 5}}>
          connect to sever : {connectToServer}
        </Text>
        <WebView
          source={{
            uri: uriCam,
            // uri: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
          }}
          style={{
            marginTop: 10,
            maxHeight: 300,
            width: '100%',
            flex: 1,
            backgroundColor: 'red',
          }}
          onHttpError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn(
              'WebView received error status code: ',
              nativeEvent.statusCode,
            );
          }}
        />
      </View>
      <Text>Status: {value}</Text>

      <View>
        <View style={{marginLeft: 60}}>
          <Pressable
            onPressIn={() => {
              changeValue(client, UP); //up
            }}
            onPressOut={() => {
              changeValue(client, STOP); //stop
            }}>
            <MaterialCommunityIcons
              name="arrow-up-thick"
              // color={({pressed}) => {
              //   const data = pressed ? 'red' : 'black';
              //   console.log(data);
              //   // return data;
              // }}
              color="black"
              size={40}
            />
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', gap: 40, marginTop: 20}}>
          <Pressable
            onPressIn={() => {
              changeValue(client, LEFT);
            }}
            onPressOut={() => {
              changeValue(client, STOP);
            }}>
            <MaterialCommunityIcons
              name="arrow-left-thick"
              color="black"
              size={40}
            />
          </Pressable>
          <Pressable
            style={{paddingHorizontal: 20}}
            onPressIn={() => {
              changeValue(client, DOWN);
            }}
            onPressOut={() => {
              changeValue(client, STOP);
            }}>
            <MaterialCommunityIcons
              name="arrow-down-thick"
              color="black"
              size={40}
            />
          </Pressable>
          <Pressable
            onPressIn={() => {
              changeValue(client, RIGHT);
            }}
            onPressOut={() => {
              changeValue(client, STOP);
            }}>
            <MaterialCommunityIcons
              name="arrow-right-thick"
              color="black"
              size={40}
            />
          </Pressable>
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
