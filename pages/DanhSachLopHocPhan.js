import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getTTLopHocPhan } from '../service/thongtinlophoc.service';
import { getGiangVienByMaGV } from '../service/giangvien.service';

const DanhSachLopHocPhan = () => {
    const navigation = useNavigation();

    const [maGV, setMaGV] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [semesterData, setSemesterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const semesters = Array.from({ length: 9 }, (_, i) => `Học kỳ ${i + 1}`);

    const handleFetchGiangVien = async () => {
        if (!maGV.trim()) {
            throw new Error('Vui lòng nhập mã giảng viên');
        }

        try {
            const data = await getGiangVienByMaGV(maGV);
            return data; // Trả về dữ liệu giảng viên
        } catch (err) {
            throw new Error('Không tìm thấy giảng viên');
        }
    };


    const handleSelectSemester = async (semester) => {
        setSelectedSemester(semester);
        setModalVisible(false);
        setLoading(true);
        setError(null);

        const hocKyNumber = `HK${semester.split(" ")[2]}`; // Tách học kỳ (ví dụ: HK1 từ "Học kỳ 1")

        try {
            // Gọi API lấy thông tin giảng viên
            const giangVienData = await handleFetchGiangVien();

            // Gọi API lấy thông tin lớp học phần
            const data = await getTTLopHocPhan(maGV);

            // Lọc lớp học phần theo mã học kỳ
            const filteredData = data.filter(item => item.maHK.startsWith(hocKyNumber));

            setSemesterData(filteredData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderCourseItem = ({ item }) => {
        return (
            <View style={styles.courseItemContainer}>
                <View style={styles.courseItem} >
                    <Text style={styles.courseName}>{item.tenLHP}</Text>
                    <Text style={styles.courseCode}>Mã môn học: {item.maMonHoc}</Text>
                    {item.sinhVien.length > 0 ? (
                        <Text style={styles.enrollment}>Sĩ số: {item.sinhVien.length} sinh viên</Text>
                    ) : (
                        <Text style={styles.noStudents}>Chưa có sinh viên đăng ký</Text>
                    )}
                    {item.lichHoc.length > 0 ? (
                        <Text style={styles.schedule}>Lịch học: {item.lichHoc.join(', ')}</Text>
                    ) : (
                        <Text style={styles.noSchedule}>Chưa có lịch học</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        {/* Nút "Thêm Sinh viên" */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate('ThemSVVaoLopHP', {
                                    maLHP: item.maLHP,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Thêm Sinh viên</Text>
                        </TouchableOpacity>

                        {/* Nút "Tạo Lịch học" */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate('TaoLichHoc', {
                                    maLHP: item.maLHP,
                                    maMonHoc: item.maMonHoc,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Tạo Lịch học</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        );
    };

    return (
        <View style={styles.Container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Thông tin lớp học phần</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.inputBorder]}
                    placeholder="Nhập mã giảng viên"
                    placeholderTextColor="gray"
                    value={maGV}
                    onChangeText={setMaGV}
                />
            </View>
            <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
                <Text style={styles.dropdownText}>
                    {selectedSemester ? selectedSemester : 'Chọn học kỳ'}
                </Text>
                <AntDesign name="down" size={16} color="black" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={semesters}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleSelectSemester(item)}
                                >
                                    <Text style={styles.modalItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button title="Đóng" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}

            {semesterData && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Tổng số lớp học phần: {semesterData.length}</Text>
                    <FlatList
                        data={semesterData}
                        keyExtractor={(item) => item.maLHP}
                        renderItem={renderCourseItem}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    headerbar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0977FE', padding: 10 },
    Headers: { color: 'white', fontSize: 20, marginLeft: 10 },
    dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5, marginTop: 20 },
    dropdownText: { fontSize: 16, color: 'black' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' },
    modalItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    modalItemText: { fontSize: 16, color: 'black' },
    detailsContainer: { marginTop: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5, flex: 1  },
    detailText: { fontSize: 16, color: 'black', marginVertical: 2 },
    courseItem: { marginBottom: 15, padding: 10, backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
    courseName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    courseCode: { fontSize: 16, color: '#555' },
    enrollment: { fontSize: 14, color: 'green' },
    noStudents: { fontSize: 14, color: 'red' },
    schedule: { fontSize: 14, color: '#555' },
    noSchedule: { fontSize: 14, color: 'orange' },
    errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
    inputContainer: {
        marginTop: 25,
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
        borderColor: 'rgba(58, 131, 244, 0.4)',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});

export default DanhSachLopHocPhan;