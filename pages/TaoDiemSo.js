import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { taoDiem } from "../service/diemso.service";
import { getMonHocById } from "../service/monhoc.service";

const TaoDiemSo = ({ route }) => {
    const navigation = useNavigation();
    const { maMonHoc, tenLHP } = route.params;

    // State variables
    const [monHocData, setMonHocData] = useState("");  

    const [diemTK1, setDiemTK1] = useState('');
    const [diemTK2, setDiemTK2] = useState('');
    const [diemTK3, setDiemTK3] = useState('');
    const [diemGK, setDiemGK] = useState('');
    const [diemCK, setDiemCK] = useState('');
    const [MSSV, setMSSV] = useState('');

     // Fetch MonHoc data when component mounts or maMonHoc changes
     useEffect(() => {
        const fetchMonHocData = async () => {
            try {
                const data = await getMonHocById(maMonHoc);  // Call the API
                setMonHocData(data);  // Set the fetched data
            } catch (error) {
                console.error('Error fetching MonHoc:', error);
                Alert.alert('Lỗi', 'Không thể lấy thông tin môn học');
            }
        };
        fetchMonHocData();
    }, [maMonHoc]); 

    const handleTaoDiem = async () => {
        // Chuẩn bị dữ liệu gửi
        const diemSoData = {
            lopHoc: tenLHP,
            monHoc: monHocData?.tenMonHoc,
            maMonHoc: maMonHoc,
            MSSV,
            diemTK1: diemTK1 || null,
            diemTK2: diemTK2 || null,
            diemTK3: diemTK3 || null,
            diemGK: diemGK || null,
            diemCK: diemCK || null,

        };

        try {
            const response = await taoDiem(diemSoData);
            Alert.alert('Thành công', `Điểm số với mã ${response.maDiem} đã được tạo!`);
            navigation.goBack(); // Quay lại trang trước
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi tạo điểm số');
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
                <Text style={styles.title}>Tạo Điểm Số</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Tên Lớp Học: {tenLHP}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Mã Môn Học: {maMonHoc}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Tên Môn Học: {monHocData.tenMonHoc}</Text>
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Mã Số Sinh Viên:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập mã số sinh viên"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={MSSV}
                    onChangeText={setMSSV}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm TK1:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập điểm TK1"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={diemTK1}
                    onChangeText={setDiemTK1}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm TK2:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập điểm TK2"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={diemTK2}
                    onChangeText={setDiemTK2}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm TK3:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập điểm TK3"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={diemTK3}
                    onChangeText={setDiemTK3}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm GK:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập điểm GK"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={diemGK}
                    onChangeText={setDiemGK}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm CK:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập điểm CK"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={diemCK}
                    onChangeText={setDiemCK}
                />
            </View>

            {/* Nút gửi */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTaoDiem}>
                    <Text style={styles.buttonText}>TẠO ĐIỂM SỐ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default TaoDiemSo;

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
        marginTop: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});
