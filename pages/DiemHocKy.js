import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getMonHocByHocKy } from '../service/monhoc.service';
import { useRecoilValue } from 'recoil';
import { sinhVienDataState } from '../state';

const DiemHocKy = () => {
    const navigation = useNavigation();
    const sinhVienData = useRecoilValue(sinhVienDataState);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [semesterData, setSemesterData] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const semesters = Array.from({ length: 9 }, (_, i) => `Học kỳ ${i + 1}`);

    const semesterGrades = {
        'Học kỳ 1': {
            gpa: 3.5,
            gpa4: 3.2,
            letterGrade: 'B+',
            classification: 'Khá',
            creditsEarned: 15,
            creditsOwed: 3,
        },
        'Học kỳ 2': {
            gpa: 3.8,
            gpa4: 3.5,
            letterGrade: 'A',
            classification: 'Giỏi',
            creditsEarned: 18,
            creditsOwed: 0,
        },
        // Thêm các học kỳ khác tương tự
    };

    const handleSelectSemester = async (semester) => {
        setSelectedSemester(semester);
        setModalVisible(false);
        setLoading(true);
        setError(null);

        const hocKyNumber = `HK${semester.split(" ")[2]}`;

        try {
            const data = await getMonHocByHocKy(sinhVienData.mssv, hocKyNumber);
            setSemesterData(data); // Update semesterData with the fetched data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Điểm học phần</Text>
            </View>

            {/* Dropdown chọn học kỳ */}
            <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
                <Text style={styles.dropdownText}>
                    {selectedSemester ? selectedSemester : 'Chọn học kỳ'}
                </Text>
                <AntDesign name="down" size={16} color="black" />
            </TouchableOpacity>

            {/* Modal chọn học kỳ */}
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

            {/* Hiển thị môn học và điểm học kỳ nếu có */}
            {semesterData && (
                <>
                    <FlatList
                        data={semesterData}
                        keyExtractor={(item) => item.maMonHoc}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.subjectRow}
                                onPress={() => navigation.navigate('DiemMonHoc', { subject: item })}
                            >
                                <Text style={styles.subjectName}>{item.tenMonHoc}</Text>
                                <Text style={styles.subjectCredits}>{item.tinChi}</Text>
                            </TouchableOpacity>
                        )}
                        ListHeaderComponent={() => (
                            <View style={styles.subjectHeader}>
                                <Text style={styles.subjectHeaderText}>Tên học phần</Text>
                                <Text style={styles.subjectHeaderText}>Số tín chỉ</Text>
                            </View>
                        )}
                    />
                    {semesterGrades[selectedSemester] ? (
                        <View style={styles.gradesContainer}>
                            <Text style={styles.gradeText}>
                                Điểm trung bình học kỳ: {semesterGrades[selectedSemester]?.gpa}
                            </Text>
                            <Text style={styles.gradeText}>
                                Điểm trung bình học kỳ (thang 4): {semesterGrades[selectedSemester]?.gpa4}
                            </Text>
                            <Text style={styles.gradeText}>
                                Điểm chữ: {semesterGrades[selectedSemester]?.letterGrade}
                            </Text>
                            <Text style={styles.gradeText}>
                                Xếp loại: {semesterGrades[selectedSemester]?.classification}
                            </Text>
                            <Text style={styles.gradeText}>
                                Số tín chỉ đã đạt: {semesterGrades[selectedSemester]?.creditsEarned}
                            </Text>
                            <Text style={styles.gradeText}>
                                Số tín chỉ nợ: {semesterGrades[selectedSemester]?.creditsOwed}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.gradesContainer}>
                            <Text style={styles.gradeText}>Không có dữ liệu cho học kỳ này</Text>
                        </View>
                    )}
                </>
            )}

            {/* Hiển thị loading khi đang tải dữ liệu */}
            {loading && <Text>Đang tải dữ liệu...</Text>}
        </View>
    );
};

export default DiemHocKy;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        padding: 10,
    },
    Headers: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginTop: 20,
    },
    dropdownText: {
        fontSize: 16,
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
        color: 'black',
    },
    subjectRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    subjectName: {
        fontSize: 16,
        color: 'black',
    },
    subjectCredits: {
        fontSize: 16,
        color: 'black',
    },
    subjectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    subjectHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    gradesContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    gradeText: {
        fontSize: 16,
        color: 'black',
        marginVertical: 2,
    },
});
