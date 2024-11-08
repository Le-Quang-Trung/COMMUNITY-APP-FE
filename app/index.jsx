import { View } from 'react-native';
import React from 'react';
import Navigation from '../navigation/Navigation';
import { RecoilRoot } from 'recoil'; 

const Index = () => {
  return (
    <RecoilRoot>
      <View style={{ flex: 1 }}>
        <Navigation />
      </View>
    </RecoilRoot>
  );
};

export default Index;
