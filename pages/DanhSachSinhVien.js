import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { deleteSinhVien, getAllSinhVien } from '../service/sinhvien.service';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DanhSachSinhVien = () => {
    const navigation = useNavigation();
    const [sinhVienList, setSinhVienList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSinhViens = async () => {
            try {
                const data = await getAllSinhVien();
                setSinhVienList(data);
            } catch (error) {
                Alert.alert('Lỗi', error.message || 'Không thể tải danh sách sinh viên');
            } finally {
                setLoading(false);
            }
        };

        fetchSinhViens();
    }, []);

    // Hàm để xóa sinh viên
    const handleDeleteSinhVien = async (id) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa sinh viên này không?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    onPress: async () => {
                        try {
                            await deleteSinhVien(id);
                            Alert.alert('Thành công', 'Đã xóa sinh viên');
                            setSinhVienList((prevList) => prevList.filter((sv) => sv._id !== id)); // Cập nhật danh sách
                        } catch (error) {
                            Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi xóa sinh viên');
                        }
                    },
                },
            ]
        );
    };

    const renderSinhVien = ({ item }) => (
        <ScrollView style={styles.sinhVienItem}>
            <Text style={styles.hoTen}>{item.hoTen}</Text>
            <Text style={styles.mssv}>MSSV: {item.mssv}</Text>
            <Text style={styles.nganh}>Ngành: {item.nganh}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleDeleteSinhVien(item._id)}>
                    <Text style={styles.buttonText}>XÓA SINH VIÊN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('CapNhatSinhVien', {
                        mssv: item.mssv,
                    })}>
                    <Text style={styles.buttonText}>CẬP NHẬT SINH VIÊN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

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
                <Text style={styles.title}>Danh Sách Sinh Viên</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={sinhVienList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderSinhVien}
                />
            )}
        </View>
    );
};

export default DanhSachSinhVien;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
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
    sinhVienItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    hoTen: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mssv: {
        fontSize: 14,
        color: '#555',
    },
    nganh: {
        fontSize: 14,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        marginTop: 20,
        width: '40%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});
