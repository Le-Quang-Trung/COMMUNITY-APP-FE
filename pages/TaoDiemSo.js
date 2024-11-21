import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { taoDiem } from "../service/diemso.service";

const TaoDiemSo = () => {
    const navigation = useNavigation();

    // State để lưu dữ liệu
    const [lopHoc, setLopHoc] = useState('');
    const [monHoc, setMonHoc] = useState('');
    const [diemTK1, setDiemTK1] = useState('');
    const [diemTK2, setDiemTK2] = useState('');
    const [diemTK3, setDiemTK3] = useState('');
    const [diemGK, setDiemGK] = useState('');
    const [diemCK, setDiemCK] = useState('');
    const [MSSV, setMSSV] = useState('');
    const [maMonHoc, setMaMonHoc] = useState('');

    const handleTaoDiem = async () => {
        // Chuẩn bị dữ liệu gửi
        const diemSoData = {
            lopHoc,
            monHoc,
            diemTK1: diemTK1 || null,
            diemTK2: diemTK2 || null,
            diemTK3: diemTK3 || null,
            diemGK: diemGK || null,
            diemCK: diemCK || null,
            MSSV,
            maMonHoc,
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

            {/* Form nhập liệu */}
            {[
                { label: 'Lớp Học', value: lopHoc, onChange: setLopHoc },
                { label: 'Môn Học', value: monHoc, onChange: setMonHoc },
                { label: 'Điểm TK1', value: diemTK1, onChange: setDiemTK1 },
                { label: 'Điểm TK2', value: diemTK2, onChange: setDiemTK2 },
                { label: 'Điểm TK3', value: diemTK3, onChange: setDiemTK3 },
                { label: 'Điểm GK', value: diemGK, onChange: setDiemGK },
                { label: 'Điểm CK', value: diemCK, onChange: setDiemCK },
                { label: 'Mã Số Sinh Viên', value: MSSV, onChange: setMSSV },
                { label: 'Mã Môn Học', value: maMonHoc, onChange: setMaMonHoc },
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
                            keyboardType={['Điểm TK1', 'Điểm TK2', 'Điểm TK3', 'Điểm GK', 'Điểm CK'].includes(field.label) ? 'numeric' : 'default'}
                        />
                    </View>
                </View>
            ))}

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
