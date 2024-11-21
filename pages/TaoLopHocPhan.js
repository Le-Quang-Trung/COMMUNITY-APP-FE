import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createLopHocPhan, addSinhVienToLopHocPhan } from "../service/quanly.service"; 

const TaoLopHocPhan = () => {
    const navigation = useNavigation();

    // State variables to hold the form data
    const [tenLop, setTenLop] = useState('');
    const [maMonHoc, setMaMonHoc] = useState('');
    const [nganh, setNganh] = useState('');
    const [HK, setHK] = useState('');
    const [Nam, setNam] = useState('');
    const [GV, setGV] = useState('');
    const [maSinhViens, setMaSinhViens] = useState([]); 

    // Function to handle form submission for creating a class
    const handleTaoLopHocPhan = async () => {
        // Check if all fields are filled
        if (tenLop === '' || maMonHoc === '' || nganh === '' || HK === '' || Nam === '' || GV === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const lopHocPhanData = { tenLop, maMonHoc, nganh, HK, Nam, GV };

        try {
            // Call the API to create LopHocPhan
            const result = await createLopHocPhan(lopHocPhanData);
            Alert.alert("Thành công", "Tạo lớp học phần thành công");

            navigation.goBack(); // Go back to the previous screen
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
                <Text style={styles.title}>Tạo Lớp Học Phần</Text>
            </View>

            {/* Ten Lop */}
            <View style={styles.row}>
                <Text style={styles.label}>Tên Lớp:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập tên lớp học" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={tenLop}
                    onChangeText={setTenLop}
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

            {/* Nganh */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Ngành:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập ngành" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={nganh}
                    onChangeText={setNganh}
                />
            </View>

            {/* HK */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Học Kỳ:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập học kỳ (1, 2, 3)" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={HK}
                    onChangeText={setHK}
                />
            </View>

            {/* Nam */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Năm Học:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập năm học (2024)" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={Nam}
                    onChangeText={setNam}
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

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTaoLopHocPhan}>
                    <Text style={styles.buttonText}>TẠO LỚP HỌC PHẦN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaoLopHocPhan;

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