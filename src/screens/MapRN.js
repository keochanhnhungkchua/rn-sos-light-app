import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MarkerAnimated,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};
const MapRN = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0,
    longitudeDelta: 0.05,
  });
  const [distance, setDistance] = useState(500);
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const delay = delay => {
    return new Promise(resolve => setTimeout(resolve, delay * 1000));
  };

  const d1 = 21.23041507658777;
  const l1 = 105.52999511508325;
  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (earthRadiusKm * c).toFixed(2);
  }

  const handlePressOnOff = async () => {
    try {
      await Geolocation.getCurrentPosition(({coords}) => {
        const newLocation = {
          ...currentLocation,
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        };

        setCurrentLocation(newLocation);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handlePressOnOff();
  }, []);

  return (
    <View>
      <View
        style={{
          height: 60,
          padding: 10,
        }}>
        {/* 
          <TextInput
            style={styles.input}
            onChangeText={setDistance}
            value={distance}
            placeholder="Distance in meters"
          /> */}
        <GooglePlacesAutocomplete
          styles={{
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
              borderColor: '#999',
              borderWidth: 1,
              paddingTop: 10,
              paddingHorizontal: 20,
            },
          }}
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          placeholder="Search"
          query={{
            key: 'AIzaSyDC8wuryEBM0YTH7XXCQZnGuc-jKY3p8Fg',
            language: 'en', // language of the results
          }}
          onPress={(data, details = null) => console.log(data)}
          onFail={error => console.error(error)}
          predefinedPlaces={[homePlace, workPlace]}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={currentLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
        toolbarEnabled={true}
        followsUserLocation={true}
        // onUserLocationChange={e => console.log(e.nativeEvent.coordinate)}
        onLongPress={e => {
          setPin(e.nativeEvent.coordinate);
        }}>
        <Marker
          title={'Your location'}
          draggable
          coordinate={pin}
          onDragEnd={e => {
            setPin(e.nativeEvent.coordinate);
          }}
        />
      </MapView>
    </View>
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
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginRight: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapRN;
