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
  const [text, setText] = useState('');
  const [duration, setDuration] = useState(20);
  const [fontSize, setFontSize] = useState(20);
  const [modalVisible, setModalVisible] = useState(false);

  const handleClear = () => {
    setText('');
    setDuration('');
    setFontSize('');
  };

  return (
    <View style={styles.container}>
      <Text> Input content : </Text>
      <TextInput
        style={[styles.input, {height: 'auto'}]}
        multiline
        numberOfLines={5}
        onChangeText={setText}
        value={text}
        placeholder="enter content"
      />
      <Text> Input front size : </Text>
      <TextInput
        style={styles.input}
        onChangeText={setFontSize}
        value={fontSize}
        placeholder="font size"
        keyboardType="numeric"
      />
      <Text> Input speed : </Text>
      <TextInput
        style={styles.input}
        onChangeText={setDuration}
        value={duration}
        placeholder="enter speed"
        keyboardType="numeric"
      />
      <View style={styles.wraperButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={{color: 'white', textAlign: 'center'}}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleClear()}>
          <Text style={{color: 'white', textAlign: 'center'}}>CLEAR</Text>
        </TouchableOpacity>
      </View>

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
              style={{
                color: 'white',
                fontSize: Number(fontSize ? fontSize : 20),
              }}
              duration={duration ? duration * 1000 : 20000}
              loop
              bounce>
              {text
                ? text
                : 'scrolling text animation react native scrolling text animation react native'}
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
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    height: 45,
    margin: 12,
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
  wraperButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
