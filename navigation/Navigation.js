import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import XinChao from "../pages/XinChao";
import TraCuu from "../pages/TraCuu";
import DangNhap from "../pages/DangNhap";
import LichHoc from "../pages/LichHoc";
import DiemHocKy from "../pages/DiemHocKy";
import DiemMonHoc from "../pages/DiemMonHoc";
import ChuongTrinhKhung from "../pages/ChuongTrinhKhung";

import TrangChu from "../components/TrangChu";
import ThongBao from "../components/ThongBao";
import LichHocLichThi from "../components/LichHocLichThi";
import CaNhan from "../components/CaNhan";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12, 
          marginBottom: 5, 
        },
        tabBarActiveTintColor: '#0000FF', 
        tabBarInactiveTintColor: 'black', 
      }}
    >
      <Tab.Screen
        name="Trang Chủ"
        component={TrangChu}
        options={{
          tabBarLabel: 'Trang Chủ', // Chữ khi focus
          tabBarIcon: ({ focused, color }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                  name={focused ? "home" : "home-outline"} // Đổi icon khi focus
                  size={24}
                  color={color} // Màu thay đổi theo focus
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Thông Báo"
        component={ThongBao}
        options={{
          tabBarLabel: 'Thông Báo',
          tabBarIcon: ({ focused, color }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                  name={focused ? "notifications" : "notifications-outline"}
                  size={24}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Lịch Học"
        component={LichHocLichThi}
        options={{
          tabBarLabel: 'Lịch Học',
          tabBarIcon: ({ focused, color }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={24}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={CaNhan}
        options={{
          tabBarLabel: 'Cá Nhân',
          tabBarIcon: ({ focused, color }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                  name={focused ? "person-circle" : "person-circle-outline"}
                  size={24}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>

  );
};


const Navigation = () => {
  return (
    // Nếu có `NavigationContainer` khác bên ngoài, thêm `independent={true}` vào đây
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="XinChao">
        <Stack.Screen name="TabScreen" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="XinChao" component={XinChao} options={{ headerShown: false }} />
        <Stack.Screen name="TraCuu" component={TraCuu} options={{ headerShown: false }} />
        <Stack.Screen name="DangNhap" component={DangNhap} options={{ headerShown: false }} />
        <Stack.Screen name="LichHoc" component={LichHoc} />
        <Stack.Screen name="DiemHocKy" component={DiemHocKy} />
        <Stack.Screen name="DiemMonHoc" component={DiemMonHoc} />
        <Stack.Screen name="ChuongTrinhKhung" component={ChuongTrinhKhung} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
