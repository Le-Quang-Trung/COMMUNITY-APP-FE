import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addSinhVienToLopHocPhan } from '../service/quanly.service';

const ThemSVVaoLopHP = ({ route }) => {
    const { maLHP } = route.params; 
    const [maSinhViens, setMaSinhViens] = useState(''); 
    const [loading, setLoading] = useState(false); 

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
            setMaSinhViens(''); // Xóa input sau khi thêm thành công
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Không thể thêm sinh viên');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thêm Sinh Viên Vào Lớp Học Phần</Text>
            <Text style={styles.text}>Mã Lớp Học Phần: {maLHP}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập danh sách mã sinh viên, cách nhau bằng dấu phẩy"
                value={maSinhViens}
                onChangeText={setMaSinhViens}
            />
            <Button
                title={loading ? 'Đang xử lý...' : 'Xác nhận'}
                onPress={handleAddStudents}
                disabled={loading} // Disable button khi đang loading
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});

export default ThemSVVaoLopHP;
