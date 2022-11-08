import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FlashCamera from './src/screens/FlashCamera';
import MapRN from './src/screens/MapRN';
import ScrollingTextEffect from './src/screens/ScrollingTextEffect';

const Tab = createBottomTabNavigator();
const App = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={FlashCamera}
          options={{
            tabBarBadge: 3,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="flashlight"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapRN}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ScrollingTextEffect"
          component={ScrollingTextEffect}
          options={{
            tabBarLabel: 'ScrollingTextEffect',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="text-shadow"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
