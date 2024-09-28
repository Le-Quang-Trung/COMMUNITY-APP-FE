import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import XinChao from "../pages/XinChao";
import TraCuu from "../pages/TraCuu";
import DangNhap from "../pages/DangNhap";
import LichHoc from "../pages/LichHoc";
import DiemHocKy from "../pages/DiemHocKy";
import DiemMonHoc from "../pages/DiemMonHoc";
import ChuongTrinhKhung from "../pages/ChuongTrinhKhung";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    // Nếu có `NavigationContainer` khác bên ngoài, thêm `independent={true}` vào đây
    <NavigationContainer independent={true}> 
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="XinChao" component={XinChao} options={{ headerShown: false }}/>
        <Stack.Screen name="TraCuu" component={TraCuu} options={{ headerShown: false}}/>
        <Stack.Screen name="DangNhap" component={DangNhap} options={{ headerShown: false}}/>
        <Stack.Screen name="LichHoc" component={LichHoc} />
        <Stack.Screen name="DiemHocKy" component={DiemHocKy} />
        <Stack.Screen name="DiemMonHoc" component={DiemMonHoc} />
        <Stack.Screen name="ChuongTrinhKhung" component={ChuongTrinhKhung} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
