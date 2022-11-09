import React, {useState} from 'react';
import {Text, TouchableHighlight, View, StyleSheet} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ScrollingTextEffect = () => {
  const createPDF = async () => {
    let options = {
      html: '<h1>PDF TEST 1234</h1>',
      fileName: 'test123',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    alert(file.filePath);
  };

  return (
    <View style={styles.centeredView}>
      <TouchableHighlight style={styles.button} onPress={createPDF}>
        <Text style={styles.text}>Create PDF</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ScrollingTextEffect;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'white',
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
    margin: 12,
    padding: 10,
  },
});
