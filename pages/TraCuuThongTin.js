import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginSinhVien } from '../service/taikhoan.service';
import { useSetRecoilState } from 'recoil';
import { userPHState } from '../state';

const TraCuuThongTin = () => {
    const navigation = useNavigation();

    // Khai báo các state để lưu thông tin đăng nhập
    const setUserPHState = useSetRecoilState(userPHState);
    const [tenTaiKhoan, setTenTaiKhoan] = useState('');
    const [matKhau, setMatKhau] = useState('');

    // Hàm handleTraCuu điều chỉnh để gọi API
    const handleTraCuu = async () => {
        try {
            userData = await loginSinhVien.loginSV(tenTaiKhoan, matKhau);
            console.log('User data:', userData);
            setUserPHState(userData);
            navigation.navigate('TraCuu');
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        }
    };

    return (
        <View style={styles.Container}>
            <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} imageStyle={styles.imageStyle} />
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/iuh_logo.png')} style={styles.optionImage} />
            </View>

            <View style={styles.titleLogin}>
                <Text style={styles.login}>Tra cứu thông tin</Text>
            </View>

            {/* form */}
            <View style={styles.titleContainer}>
                <View style={styles.containerForm}>
                    <View style={styles.inputLabelContainer}>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder={`Nhập mã sinh viên`}
                            placeholderTextColor={'gray'}
                            value={tenTaiKhoan}
                            onChangeText={setTenTaiKhoan} // Cập nhật state khi người dùng nhập
                        />
                    </View>

                    <View style={styles.inputLabelContainer}>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='Nhập mật khẩu'
                            placeholderTextColor={'gray'}
                            secureTextEntry
                            value={matKhau}
                            onChangeText={setMatKhau} // Cập nhật state khi người dùng nhập
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleTraCuu}>
                            <Text style={styles.buttonText}>Tra cứu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default TraCuuThongTin;

const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    optionImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    titleContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: "space-around",
        paddingTop: 150,
        paddingBottom: 40,
        marginBottom: 40,
    },
    titleLogin: {
        flex: 1,
        alignItems: 'center',
    },
    login: {
        color: '#0977FE',
        fontWeight: 'bold',
        letterSpacing: 1.5,
        fontSize: 38,
    },
    containerForm: {
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 70,
    },
    inputLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 13,
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 15,
        borderRadius: 20,
        flex: 1,
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: '#38bdf8',
        padding: 10,
        borderRadius: 20,
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});