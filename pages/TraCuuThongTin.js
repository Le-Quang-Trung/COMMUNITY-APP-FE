import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSinhVienByPhuHuynh } from "../service/sinhvien.service";
import { useSetRecoilState } from 'recoil';
import { sinhVienDataState } from '../state';

const TraCuuThongTin = () => {
    const navigation = useNavigation();
    const [maSinhVien, setMaSinhVien] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [error, setError] = useState('');
    const setSinhVienData = useSetRecoilState(sinhVienDataState);

    const handleTraCuu = async () => {
        if (!maSinhVien || !hoTen || !ngaySinh || !soDienThoai) {
            setError('Vui lòng điền đầy đủ thông tin các trường bắt buộc');
        } else {
            try {
                setError('');
                const data = await getSinhVienByPhuHuynh(maSinhVien, hoTen, ngaySinh, soDienThoai);
                setSinhVienData(data); // Lưu vào Recoil state
                navigation.navigate('TraCuu'); // Chuyển hướng sau khi tìm kiếm thành công
            } catch (error) {
                setError('Không tìm thấy thông tin sinh viên');
                console.error('Error fetching SinhVien:', error);
            }
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
                            placeholder='Nhập mã sinh viên'
                            placeholderTextColor={'gray'}
                            value={maSinhVien}
                            onChangeText={setMaSinhVien}
                        />
                        <Text style={styles.required}>(*)</Text>
                    </View>
                    <View style={styles.inputLabelContainer}>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='Nhập họ và tên'
                            placeholderTextColor={'gray'}
                            value={hoTen}
                            onChangeText={setHoTen}
                        />
                        <Text style={styles.required}>(*)</Text>
                    </View>
                    <View style={styles.inputLabelContainer}>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='01-01-1999'
                            placeholderTextColor={'gray'}
                            value={ngaySinh}
                            onChangeText={setNgaySinh}
                        />
                        <Text style={styles.required}>(*)</Text>
                    </View>
                    <View style={styles.inputLabelContainer}>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='Nhập số điện thoại'
                            placeholderTextColor={'gray'}
                            value={soDienThoai}
                            onChangeText={setSoDienThoai}
                        />
                        <Text style={styles.required}>(*)</Text>
                    </View>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    required: {
        color: 'red',
        marginLeft: 8,
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