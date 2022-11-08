import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import TextTicker from 'react-native-text-ticker';

const ScrollingTextEffect = () => {
  const [text, setText] = useState(null);
  const [duration, setDuration] = useState(20000);
  const [fontSize, setFontSize] = useState(20);
  const [modalVisible, setModalVisible] = useState(false);
  const handlePressOnOff = () => {
    console.log(text);
    console.log(duration);
    console.log(fontSize);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{width: '90%', borderWidth: 1}}
        multiline={true}
        numberOfLines={6}
        onChangeText={setText}
        value={text}
        placeholder="enter content"
      />
      <TextInput
        style={styles.input}
        onChangeText={setFontSize}
        value={fontSize}
        placeholder="font size"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDuration}
        value={duration}
        placeholder="enter speed"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePressOnOff()}>
        <Text style={{color: 'white', textAlign: 'center'}}>OK</Text>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={[styles.centeredView]}
            onPress={() => setModalVisible(!modalVisible)}>
            <TextTicker
              style={{color: 'white', fontSize: fontSize}}
              duration={duration}
              loop
              bounce
              scrollSpeed={1000}
              repeatSpacer={50}
              marqueeDelay={1000}>
              {text ?? 'scrolling text animation react native'}
            </TextTicker>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default ScrollingTextEffect;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    textAlign: 'center',
    height: 40,
    width: 80,
    margin: 12,
    padding: 10,
  },
});
