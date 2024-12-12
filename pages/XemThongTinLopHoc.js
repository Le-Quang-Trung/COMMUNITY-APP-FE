import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getLopHocPhan } from '../service/giangvien.service';
import { useRecoilValue } from 'recoil';
import { giangVienDataState } from '../state';

const XemThongTinLopHoc = () => {
    const navigation = useNavigation();
    const giangVienData = useRecoilValue(giangVienDataState);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [semesterData, setSemesterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const semesters = Array.from({ length: 9 }, (_, i) => `Học kỳ ${i + 1}`);


    const handleSelectSemester = async (semester) => {
        setSelectedSemester(semester);
        setModalVisible(false);
        setLoading(true);
        setError(null);
    
        // Extract semester number
        const hocKyNumber = `HK${semester.split(" ")[2]}`;
    
        try {
            // Call the updated API function
            const data = await getLopHocPhan(giangVienData.maGV,  giangVienData.nganh, hocKyNumber);
    
            setSemesterData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    const renderCourseItem = ({ item }) => {
        return (
            <View style={styles.courseItem}>
                <Text style={styles.courseName}>{item.tenLHP}</Text>
                <Text style={styles.courseCode}>Mã môn học: {item.maMonHoc}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DanhSachSinhVienLHP', {
                        maLHP: item.maLHP, maMonHoc: item.maMonHoc,
                        tenLHP: item.tenLHP,
                    })}
                >
                    {item.sinhVien.length > 0 ? (
                        <Text style={styles.enrollment}>Sĩ số: {item.sinhVien.length} sinh viên</Text>
                    ) : (
                        <Text style={styles.noStudents}>Chưa có sinh viên đăng ký</Text>
                    )}
                </TouchableOpacity>
                {item.lichHoc.length > 0 ? (
                    <Text style={styles.schedule}>Lịch học: {item.lichHoc.join(', ')}</Text>
                ) : (
                    <Text style={styles.noSchedule}>Chưa có lịch học</Text>
                )}
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
    detailsContainer: { marginTop: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
    detailText: { fontSize: 16, color: 'black', marginVertical: 2 },
    courseItem: { marginBottom: 15, padding: 10, backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
    courseName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    courseCode: { fontSize: 16, color: '#555' },
    enrollment: { fontSize: 14, color: 'green' },
    noStudents: { fontSize: 14, color: 'red' },
    schedule: { fontSize: 14, color: '#555' },
    noSchedule: { fontSize: 14, color: 'orange' },
    errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
});

export default XemThongTinLopHoc;
