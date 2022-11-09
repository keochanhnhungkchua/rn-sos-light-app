import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [pin, setPin] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [distance, setDistance] = useState(0.5);
  const [curentDistance, setCurentDistance] = useState(0);

  const storeAsyncStorageData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userLocation', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const getAsyncStorageData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userLocation');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  function distanceInKmBetweenEarthCoordinates(
    latitude1,
    longitude1,
    latitude2,
    longitude2,
  ) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(latitude2 - latitude1);
    var dLon = degreesToRadians(longitude2 - longitude1);

    latitude1 = degreesToRadians(latitude1);
    latitude2 = degreesToRadians(latitude2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(latitude1) *
        Math.cos(latitude2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setCurentDistance((earthRadiusKm * c).toFixed(2));
    return (earthRadiusKm * c).toFixed(2) < distance; // to km
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
        // setPin(newLocation);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    distanceInKmBetweenEarthCoordinates(
      currentLocation.latitude,
      currentLocation.longitude,
      pin.latitude,
      pin.longitude,
    );
  }, [pin, distance, currentLocation]);

  useEffect(() => {
    handlePressOnOff();

    const getData = async () => {
      const location = await getAsyncStorageData();
      console.log(location);
      setPin(location);
    };
    getData();
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
          placeholder="Search...coming soon"
          query={{
            key: Config.GOOGLE_SEARCH_PLACE_API_KEY,
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
        onLongPress={e => {
          setPin(e.nativeEvent.coordinate);
          storeAsyncStorageData(e.nativeEvent.coordinate);
        }}>
        <Polyline
          strokeColor="red"
          strokeWidth={3}
          geodesic={true}
          tappable={true}
          coordinates={[currentLocation, pin]}
        />

        <Marker
          pinColor="red"
          title={'Your location'}
          draggable
          coordinate={pin}
          onDragEnd={e => {
            setPin(e.nativeEvent.coordinate);
            storeAsyncStorageData(e.nativeEvent.coordinate);
          }}>
          <View>
            <Text style={{color: 'red', fontWeight: '600'}}>
              {curentDistance}km
            </Text>
            <Image
              style={styles.googleMapsPin}
              source={require('../../assets/images/googleMapsPin.png')}
            />
          </View>
        </Marker>
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
  googleMapsPin: {
    width: 20,
    height: 30,
    marginLeft: 12,
  },
});

export default MapRN;
