import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createLichHoc } from "../service/quanly.service";

const TaoLichHoc = () => {
    const navigation = useNavigation();

    const [maLHP, setMaLHP] = useState('');
    const [maMonHoc, setMaMonHoc] = useState('');
    const [ngayBatDau, setNgayBatDau] = useState('');
    const [ngayKetThuc, setNgayKetThuc] = useState('');
    const [GV, setGV] = useState('');
    const [phanLoai, setPhanLoai] = useState('');
    const [lichHoc, setLichHoc] = useState([]);

    const handleCreateLichHoc = async () => {
        if (lichHoc === '' || maLHP === '' || maMonHoc === '' || ngayBatDau === '' || ngayKetThuc === '' || GV === '' || phanLoai === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
    
        // Xử lý dữ liệu `lichHoc`
        const parsedLichHoc = lichHoc.split(',').map((item) => {
            const [ngayHoc, tietHoc, phongHoc] = item.split(':');
            return { ngayHoc: parseInt(ngayHoc), tietHoc, phongHoc };
        });
    
        const data = {
            maLHP,
            maMonHoc,
            lichHoc: parsedLichHoc,
            ngayBatDau,
            ngayKetThuc,
            GV,
            phanLoai,
        };
    
        try {
            const result = await createLichHoc(data);
            Alert.alert('Thành công', 'Tạo lịch học thành công!');
            console.log('Lịch học đã tạo:', result);
            navigation.goBack(); 
        } catch (error) {
            Alert.alert('Lỗi', error.message);
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
                <Text style={styles.title}>Tạo Lịch Học</Text>
            </View>

            {/* Ma Lop Hoc Phan*/}
            <View style={styles.row}>
                <Text style={styles.label}>Mã Lớp Học Phần:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập tên lớp học"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={maLHP}
                    onChangeText={setMaLHP}
                />
            </View>

            {/* Ma Mon Hoc */}
            <View style={[styles.row, { marginTop: 20 }]} >
                <Text style={styles.label}>Mã Môn Học:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập mã môn học"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={maMonHoc}
                    onChangeText={setMaMonHoc}
                />
            </View>

            {/* Lich Hoc */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Lịch Học:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    placeholder="ngayHoc: ;tietHoc: ;phongHoc:"
                    value={lichHoc}
                    onChangeText={setLichHoc}
                />
            </View>

            {/* Ngay Bat Dau */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Ngày Bắt Đầu:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    placeholder="YYYY-MM-DD"
                    value={ngayBatDau}
                    onChangeText={setNgayBatDau}
                />
            </View>

            {/* Ngay Ket Thuc */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Ngày Kết Thúc:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    placeholder="YYYY-MM-DD"
                    value={ngayKetThuc}
                    onChangeText={setNgayKetThuc}
                />
            </View>

            {/* Giang Vien */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Giảng Viên:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập mã giảng viên"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={GV}
                    onChangeText={setGV}
                />
            </View>

            {/* Phan Loai */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Phân Loại:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    placeholder="Nhập phân loại"
                    value={phanLoai}
                    onChangeText={setPhanLoai}
                />
            </View>


            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCreateLichHoc}>
                    <Text style={styles.buttonText}>TẠO LỊCH HỌC</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaoLichHoc;

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