import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createAccount } from "../service/taikhoan.service";

const TaoTaiKhoan = () => {
    const navigation = useNavigation();

    const [tenTaiKhoan, setTenTaiKhoan] = useState('');

    const handleTaoTaiKhoan = async () => {
        if (tenTaiKhoan === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập tên tài khoản');
            return;
        }

        const matKhau = '1111';  // Mật khẩu mặc định

        try {
            // Gọi API tạo tài khoản
            await createAccount(tenTaiKhoan, matKhau);
            Alert.alert("Thành công", "Tạo tài khoản thành công");
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
                <Text style={styles.title}>Tạo Tài Khoản Cho Sinh Viên</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Tên Tài Khoản:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập tên tài khoản" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={tenTaiKhoan}
                    onChangeText={setTenTaiKhoan}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTaoTaiKhoan}>
                    <Text style={styles.buttonText}>TẠO TÀI KHOẢN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaoTaiKhoan;

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
