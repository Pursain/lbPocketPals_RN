import { AppRegistry, View } from 'react-native';
import React from 'react';
import Header from './src/components/Header';
import DogDetail from './src/components/DogDetail';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerText='lbPocketPals' />
      <DogDetail />
    </View>
  );
};

AppRegistry.registerComponent('lbPocketPals', () => App);
