import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { capNhatDiem, getDiemSo } from "../service/diemso.service";
import { getMonHocById } from "../service/monhoc.service";

const CapNhatDiemSo = ({ route }) => {
    const navigation = useNavigation();
    const { maMonHoc, tenLHP, mssv } = route.params;

    // State variables
    const [monHocData, setMonHocData] = useState("");
    const [diemTK1, setDiemTK1] = useState('');
    const [diemTK2, setDiemTK2] = useState('');
    const [diemTK3, setDiemTK3] = useState('');
    const [diemGK, setDiemGK] = useState('');
    const [diemCK, setDiemCK] = useState('');

    // Fetch MonHoc data when component mounts or maMonHoc changes
    useEffect(() => {
        const fetchMonHocData = async () => {
            try {
                const data = await getMonHocById(maMonHoc);  // Fetch MonHoc data
                setMonHocData(data);  // Set MonHoc data
            } catch (error) {
                console.error('Error fetching MonHoc:', error);
                Alert.alert('Lỗi', 'Không thể lấy thông tin môn học');
            }
        };
        fetchMonHocData();
    }, [maMonHoc]);

    // Fetch student's current scores when component mounts
    useEffect(() => {
        const fetchDiemSo = async () => {
            try {
                const data = await getDiemSo(mssv, maMonHoc, tenLHP);
                setDiemTK1(data.diemTK1 || '');
                setDiemTK2(data.diemTK2 || '');
                setDiemTK3(data.diemTK3 || '');
                setDiemGK(data.diemGK || '');
                setDiemCK(data.diemCK || '');
            } catch (error) {
                console.error('Error fetching Diem So:', error);
                Alert.alert('Lỗi', 'Không thể lấy điểm số của sinh viên');
            }
        };

        fetchDiemSo();
    }, [mssv, maMonHoc, tenLHP]);

    // Handle the form submission to update scores
    const handleCapNhatDiemSo = async () => {

        // Convert inputs to numbers for validation
        const diemSoValues = [diemTK1, diemTK2, diemTK3, diemGK, diemCK].map(Number);

        // Validate that all scores are between 0 and 10
        const isValid = diemSoValues.every((score) => score >= 0 && score <= 10);

        if (!isValid) {
            Alert.alert('Lỗi','Chỉ được nhập điểm từ 0-10.');
            return;
        }

        const diemSoData = {
            lopHoc: tenLHP,
            monHoc: monHocData?.tenMonHoc,
            maMonHoc: maMonHoc,
            MSSV: mssv,
            diemTK1,
            diemTK2,
            diemTK3,
            diemGK,
            diemCK,
        };

        try {
            const updatedDiemSo = await capNhatDiem(diemSoData);
            Alert.alert('Thành công', 'Điểm số đã được cập nhật thành công!');
            console.log('Điểm số cập nhật:', updatedDiemSo);
            navigation.goBack(); // Quay lại trang trước
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi cập nhật điểm số');
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
                <Text style={styles.title}>Cập Nhật Điểm Số</Text>
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
                <Text style={styles.label}>Mã Số Sinh Viên: {mssv}</Text>
            </View>

            {/* Input fields for scores */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm TK1:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={diemTK1 ? diemTK1.toString() : ''}
                    onChangeText={setDiemTK1}
                    keyboardType="numeric"
                    style={[styles.input, styles.inputBorder]}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm TK2:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={diemTK2 ? diemTK2.toString() : ''}
                    onChangeText={setDiemTK2}
                    keyboardType="numeric"
                    style={[styles.input, styles.inputBorder]}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm TK3:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={diemTK3 ? diemTK3.toString() : ''}
                    onChangeText={setDiemTK3}
                    keyboardType="numeric"
                    style={[styles.input, styles.inputBorder]}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm GK:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={diemGK ? diemGK.toString() : ''}
                    onChangeText={setDiemGK}
                    keyboardType="numeric"
                    style={[styles.input, styles.inputBorder]}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Điểm CK:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={diemCK ? diemCK.toString() : ''}
                    onChangeText={setDiemCK}
                    keyboardType="numeric"
                    style={[styles.input, styles.inputBorder]}
                />
            </View>

            {/* Submit button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCapNhatDiemSo}>
                    <Text style={styles.buttonText}>CẬP NHẬT ĐIỂM SỐ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CapNhatDiemSo;

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
        paddingBottom: 20,
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

