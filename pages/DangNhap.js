import React, { useState } from 'react'; // Import useState để quản lý trạng thái
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { loginSinhVien } from '../service/taikhoan.service';

const DangNhap = () => {
    const navigation = useNavigation();
    
    // Khai báo các state để lưu thông tin đăng nhập
    const [tenTaiKhoan, setTenTaiKhoan] = useState('');
    const [matKhau, setMatKhau] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await loginSinhVien.loginSV(tenTaiKhoan, matKhau);
            console.log('User data:', userData); // Xử lý dữ liệu người dùng sau khi đăng nhập thành công
            navigation.navigate('TabScreen'); // Chuyển hướng sau khi đăng nhập thành công
        } catch (error) {
            Alert.alert('Lỗi', error.message); // Hiển thị thông báo lỗi
        }
    };

    return (
        <View style={styles.Container}>
            <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} imageStyle={styles.imageStyle}></Image>
            {/* lights */}
            <View style={styles.containerLight}>
                <Image style={styles.light1} source={require('../assets/images/light.png')} />
                <Image style={styles.light2} source={require('../assets/images/light.png')} />
            </View>

            {/* title and form */}
            <View style={styles.titleContainer}>
                {/* title */}
                <View style={styles.titleLogin}>
                    <Text style={styles.login}>Đăng nhập</Text>
                </View>

                {/* form */}
                <View style={styles.containerForm}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Nhập mã sinh viên'
                            placeholderTextColor={'gray'}
                            value={tenTaiKhoan}
                            onChangeText={setTenTaiKhoan} // Cập nhật state khi người dùng nhập
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Nhập mật khẩu'
                            placeholderTextColor={'gray'}
                            secureTextEntry
                            value={matKhau}
                            onChangeText={setMatKhau} // Cập nhật state khi người dùng nhập
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DangNhap;

const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    containerLight: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute'
    },
    light1: {
        height: 215,
        width: 80,
    },
    light2: {
        height: 160,
        width: 65,
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    titleContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: "space-around",
        paddingTop: 240,
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
        fontSize: 40,
    },
    containerForm: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 16,
        spaceY: 16,            
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
        padding: 20,         
        borderRadius: 20,   
        width: '100%',
        marginBottom: 13,   
    },
    buttonContainer: {
        width: '100%',       
    },
    button: {
        backgroundColor: '#38bdf8', 
        padding: 12,           
        borderRadius: 20,     
        marginBottom: 12,      
    },
    buttonText: {
        fontSize: 20,         
        fontWeight: 'bold',   
        color: 'white',       
        textAlign: 'center',  
    },
});
