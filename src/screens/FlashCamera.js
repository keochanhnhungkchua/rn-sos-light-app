import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Image,
  Button,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

import {post} from '../../api/api';

let options = {
  mediaType: 'mixed',
  includeBase64: true,
  saveToPhotos: true,
};
const FlashCamera = () => {
  const [permissionsCamera, setPermissionsCamera] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (!permissionsCamera) {
      grantedcamera();
    }
  }, []);

  const grantedcamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        setPermissionsCamera;
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const pikupCamera = async () => {
    const result = await launchCamera(options);
    setImg(result?.assets[0]);
  };
  const pikupImage = async () => {
    const result = await launchImageLibrary(options);
    console.log(result?.assets[0]);
    setImg(result?.assets[0]);
  };
  const uploadFile = async () => {
    const data = await post('', img);
    console.log(data);
  };
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setSingleFile([pickerResult]);
      console.log(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };
  const handleError = e => console.log(e);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.wrapperButton}>
        <TouchableOpacity style={styles.button} onPress={() => pikupCamera()}>
          <Text style={{color: 'white'}}>camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => pikupImage()}>
          <Text style={{color: 'white'}}>pikup Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => uploadFile()}>
          <Text style={{color: 'white'}}>upload</Text>
        </TouchableOpacity>
        <Button
          title="open picker for single file selection"
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
              });
              setSingleFile([pickerResult]);
            } catch (e) {
              handleError(e);
            }
          }}
        />
        <Button
          title="open picker for multi file selection"
          onPress={() => {
            DocumentPicker.pickMultiple()
              .then(setSingleFile)
              .catch(handleError);
          }}
        />
      </View>
      <Image style={styles.stretch} source={{uri: img?.uri}} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  wrapperButton: {
    marginTop: 50,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#00a3f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 100,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    width: 100,
    borderBottomColor: '#009688bf',
    borderBottomWidth: 1.5,
    color: 'white',
  },
  stretch: {
    width: '80%',
    height: 300,
  },
});

export default FlashCamera;
