import { View } from 'react-native';
import React from 'react';
import Navigation from '../navigation/Navigation';
import { RecoilRoot } from 'recoil'; 

// Ghi đè console.error để tắt thông báo lỗi
if (__DEV__) {
  console.error = () => {};  // Tắt console.error trong môi trường phát triển
  console.warn = () => {};   // Tắt console.warn trong môi trường phát triển
}

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
