import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { updateSinhVien, getSinhVienByMSSV } from "../service/sinhvien.service";

const CapNhatSinhVien = ({ route }) => {
    const navigation = useNavigation();
    const {mssv } = route.params;
    // State để lưu dữ liệu
    const [hoTen, setHoTen] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [lop, setLop] = useState('');
    const [bacDaoTao, setBacDaoTao] = useState('');
    const [khoa, setKhoa] = useState('');
    const [nganh, setNganh] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [soDT, setSoDT] = useState('');


    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0'); // Thêm số 0 vào trước nếu ngày chỉ có 1 chữ số
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 vào trước nếu tháng chỉ có 1 chữ số
        const year = d.getFullYear();
        return `${day}-${month}-${year}`; // Định dạng ngày theo dd-MM-yyyy
    };

    // Fetch student data when MSSV changes or component mounts
    useEffect(() => {
        if (mssv) {
            const fetchStudentData = async () => {
                try {
                    const student = await getSinhVienByMSSV(mssv);
                    // Set form fields with the fetched student data
                    setHoTen(student.hoTen || '');
                    setTrangThai(student.trangThai || '');
                    setGioiTinh(student.gioiTinh || '');
                    setNgaySinh(student.ngaySinh ? formatDate(student.ngaySinh) : '');
                    setLop(student.lop || '');
                    setBacDaoTao(student.bacDaoTao || '');
                    setKhoa(student.khoa || '');
                    setNganh(student.nganh || '');
                    setDiaChi(student.diaChi || '');
                    setSoDT(student.soDT || '');
                } catch (error) {
                    Alert.alert('Lỗi', 'Không thể lấy thông tin sinh viên.');
                }
            };

            fetchStudentData();
        }
    }, [mssv]); // Effect runs when MSSV changes

    const handleCapNhatSinhVien = async () => {
        const formatDateToISO = (dateString) => {
            const [day, month, year] = dateString.split('-');
            const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
            return date.toISOString();
        };

        const updatedData = {
            hoTen,
            trangThai,
            gioiTinh,
            ngaySinh: formatDateToISO(ngaySinh),
            lop,
            bacDaoTao,
            khoa,
            nganh,
            diaChi,
            soDT,
        };
    
        try {
            await updateSinhVien(mssv, updatedData);
            Alert.alert('Thành công', 'Cập nhật thông tin sinh viên thành công!');
            navigation.goBack(); // Quay lại trang trước
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi cập nhật thông tin sinh viên');
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
                <Text style={styles.title}>Cập Nhật Thông Tin Sinh Viên</Text>
            </View>

            {/* Form nhập liệu */}
            {[ 
                { label: 'Mã Số Sinh Viên', value: mssv },
                { label: 'Họ tên', value: hoTen, onChange: setHoTen },
                { label: 'Trạng Thái', value: trangThai, onChange: setTrangThai },
                { label: 'Giới tính', value: gioiTinh, onChange: setGioiTinh },
                { label: 'Ngày Sinh', value: ngaySinh, onChange: setNgaySinh  },
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

            {/* Nút thêm sinh viên */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCapNhatSinhVien}>
                    <Text style={styles.buttonText}>CẬP NHẬT SINH VIÊN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CapNhatSinhVien;

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
