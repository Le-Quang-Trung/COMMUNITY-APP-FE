import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addSinhVien } from "../service/sinhvien.service";
import { createAccount } from "../service/taikhoan.service";

const ThongTinSinhVien = () => {
    const navigation = useNavigation();
    
    // State để lưu dữ liệu
    const [hoTen, setHoTen] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [mssv, setMssv] = useState('');
    const [lop, setLop] = useState('');
    const [bacDaoTao, setBacDaoTao] = useState('');
    const [khoa, setKhoa] = useState('');
    const [nganh, setNganh] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [soDT, setSoDT] = useState('');

    const handleThemSinhVien = async () => {
        // Chuẩn bị dữ liệu để gửi
        const sinhVienData = {
            hoTen,
            trangThai,
            gioiTinh,
            ngaySinh,
            mssv,
            lop,
            bacDaoTao,
            khoa,
            nganh,
            diaChi,
            soDT,
        };

        try {
            // Thêm sinh viên
            await addSinhVien(sinhVienData);

            // Tạo tài khoản với MSSV là tên tài khoản và mật khẩu mặc định '1111'
            const matKhau = '1111';
            await createAccount(mssv, matKhau); // Tạo tài khoản sử dụng mã sinh viên

            Alert.alert('Thành công', 'Sinh viên và tài khoản đã được tạo thành công!');
            navigation.goBack(); // Quay lại trang trước
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi thêm sinh viên hoặc tạo tài khoản');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <AntDesign 
                    name="arrowleft" 
                    size={22} 
                    color="white" 
                    onPress={() => navigation.goBack()} 
                    style={styles.searchIcon} 
                />
                <Text style={styles.title}>Thông Tin Sinh Viên</Text>
            </View>

            {/* Form nhập liệu */}
            {[ 
                { label: 'Họ tên', value: hoTen, onChange: setHoTen },
                { label: 'Trạng Thái', value: trangThai, onChange: setTrangThai },
                { label: 'Giới tính', value: gioiTinh, onChange: setGioiTinh },
                { label: 'Ngày Sinh', value: ngaySinh, onChange: setNgaySinh },
                { label: 'Mã Số Sinh Viên', value: mssv, onChange: setMssv },
                { label: 'Lớp', value: lop, onChange: setLop },
                { label: 'Bậc Đào Tạo', value: bacDaoTao, onChange: setBacDaoTao },
                { label: 'Khoa', value: khoa, onChange: setKhoa },
                { label: 'Ngành', value: nganh, onChange: setNganh },
                { label: 'Địa Chỉ', value: diaChi, onChange: setDiaChi },
                { label: 'Số Điện Thoại', value: soDT, onChange: setSoDT },
            ].map((field, index) => (
                <View key={index}>
                    <View style={[styles.row, { marginTop: 20 }]}>
                        <Text style={styles.label}>{field.label}:</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={`Nhập ${field.label.toLowerCase()}`}
                            placeholderTextColor="#D9D9D9"
                            style={[styles.input, styles.inputBorder]}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                    </View>
                </View>
            ))}

            {/* Nút thêm sinh viên và tạo tài khoản */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleThemSinhVien}>
                    <Text style={styles.buttonText}>THÊM SINH VIÊN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ThongTinSinhVien;

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
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(58, 131, 244, 0.4)',
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});
