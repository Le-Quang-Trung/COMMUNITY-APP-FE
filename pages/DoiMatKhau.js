import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { userState } from '../state';
import { changePassword } from "../service/taikhoan.service";

const DoiMatKhau = () => {
    const navigation = useNavigation();

    const user = useRecoilValue(userState);
    const { data } = user;

    const [lastPassword, setLastPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (lastPassword === '' || newPassword === '' || confirmPassword === '') {
            Alert.alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu mới và mật khẩu xác nhận không khớp");
            return;
        }
        
        try {
            await changePassword(data._id, lastPassword, newPassword);  // `data.id` là ID của người dùng
            Alert.alert("Thành công", "Đổi mật khẩu thành công");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign 
                    name="arrowleft" 
                    size={22} 
                    color="white" 
                    onPress={() => navigation.goBack()} 
                    style={styles.searchIcon} 
                />
                <Text style={styles.title}>Đổi mật khẩu</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Mật khẩu hiện tại:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập mật khẩu hiện tại" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={lastPassword}
                    onChangeText={setLastPassword}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Mật khẩu mới:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập mật khẩu mới" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Nhập lại mật khẩu mới:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập lại mật khẩu mới" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>ĐỔI MẬT KHẨU</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default DoiMatKhau;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F9FFFF',
    },
    header: {
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 15,
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
        top: 15,
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '5%',
        marginVertical: 10,
    },
    label: {
        width: '80%',
        color: '#000',
    },
    inputContainer: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        height: 40,
    },
    inputBorder: {
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(58, 131, 244, 0.4)',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});