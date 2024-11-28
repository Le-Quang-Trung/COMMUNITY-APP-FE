import React, { useState } from 'react'; // Import useState để quản lý trạng thái
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { loginSinhVien, loginGiangVien } from '../service/taikhoan.service';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state';
import { AntDesign } from '@expo/vector-icons'; // Import icon thư viện

const DangNhap = ({ route }) => {
    const { role } = route.params; // Lấy vai trò từ route params
    const navigation = useNavigation();

    // Khai báo các state để lưu thông tin đăng nhập
    const setUserState = useSetRecoilState(userState);
    const [tenTaiKhoan, setTenTaiKhoan] = useState('');
    const [matKhau, setMatKhau] = useState('');

    // State quản lý ẩn/hiện mật khẩu
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    // Hàm handleLogin điều chỉnh để gọi API đúng dựa vào role
    const handleLogin = async () => {
        if (tenTaiKhoan === '' || matKhau === '') {
            Alert.alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            let userData;
            if (role === 'sinh viên') {
                userData = await loginSinhVien.loginSV(tenTaiKhoan, matKhau);
            } else if (role === 'giảng viên' || role === 'quản lý') {
                userData = await loginGiangVien.loginGV(tenTaiKhoan, matKhau);
            }
            console.log('User data:', userData);

            setUserState({ role, data: userData });
            navigation.navigate('TabScreen');
        } catch (error) {
            Alert.alert('Lỗi: Vui lòng đăng nhập lại');
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
                            placeholder={`Nhập mã ${role}`}
                            placeholderTextColor={'gray'}
                            value={tenTaiKhoan}
                            onChangeText={setTenTaiKhoan} // Cập nhật state khi người dùng nhập
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder='Nhập mật khẩu'
                                placeholderTextColor={'gray'}
                                secureTextEntry={!isPasswordVisible} // Dùng trạng thái để ẩn/hiện
                                value={matKhau}
                                onChangeText={setMatKhau}
                                style={styles.passwordInput}
                            />
                            <TouchableOpacity
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle trạng thái
                            >
                                <AntDesign
                                    name={isPasswordVisible ? 'eyeo' : 'eye'}
                                    size={25}
                                    color="gray"
                                    style={styles.eyeIcon}
                                />
                            </TouchableOpacity>
                        </View>
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        marginLeft: 10,
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
    text: {
        fontSize: 20,
        marginBottom: 20
    },
});
