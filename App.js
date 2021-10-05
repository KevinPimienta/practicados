import React from 'react';
import DigimonProvider from './Context/DigimonContext';
import {NavigationContainer} from '@react-navigation/native';
import BottomTap from './Navigations/BottomTap';


export default function App() {
  return (
    <DigimonProvider>
    <NavigationContainer>
      <BottomTap/>
    </NavigationContainer>
  </DigimonProvider>
  );
}

