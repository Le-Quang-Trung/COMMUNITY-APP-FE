import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addSinhVienToLopHocPhan } from '../service/quanly.service';

const ThemSVVaoLopHP = ({ route }) => {
    const { maLHP } = route.params;
    const [maSinhViens, setMaSinhViens] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const handleAddStudents = async () => {
        if (!maSinhViens.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập danh sách mã sinh viên');
            return;
        }

        setLoading(true);

        try {
            const maSinhVienList = maSinhViens.split(',').map((item) => item.trim()); // Chuyển chuỗi thành mảng
            const result = await addSinhVienToLopHocPhan(maLHP, maSinhVienList); // Gửi API
            Alert.alert('Thành công', `Thêm sinh viên thành công`);
            navigation.goBack(); 
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Không thể thêm sinh viên');
        } finally {
            setLoading(false);
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
                <Text style={styles.title}>Thêm Sinh Viên Vào Lớp</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Mã Lớp Học Phần: {maLHP}</Text>
            </View>
             <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Danh Sách Sinh Viên:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="20001111, 20023333"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={maSinhViens}
                    onChangeText={setMaSinhViens}
                />
            </View>
             {/* Submit Button */}
             <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}  onPress={handleAddStudents}>
                    <Text style={styles.buttonText}>XÁC NHẬN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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

export default ThemSVVaoLopHP;
