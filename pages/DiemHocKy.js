import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const DiemHocKy = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);

    const semesters = Array.from({ length: 9 }, (_, i) => `Học kỳ ${i + 1}`);
    const subjects = {
        'Học kỳ 1': [
            { name: 'Toán cao cấp', credits: 3 },
            { name: 'Lý thuyết mạch', credits: 2 },
        ],
        'Học kỳ 2': [
            { name: 'Vật lý đại cương', credits: 3 },
            { name: 'Hóa học đại cương', credits: 2 },
        ],
        // Thêm các học kỳ khác tương tự
    };

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

    const handleSelectSemester = (semester) => {
        setSelectedSemester(semester);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Điểm học phần</Text>
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
            {selectedSemester && (
                <>
                    <FlatList
                        data={subjects[selectedSemester] || []}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.subjectRow}
                                onPress={() => navigation.navigate('DiemMonHoc', { subject: item })}
                            >
                                <Text style={styles.subjectName}>{item.name}</Text>
                                <Text style={styles.subjectCredits}>{item.credits}</Text>
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
                            <Text style={styles.gradeText}>Điểm trung bình học kỳ: {semesterGrades[selectedSemester].gpa}</Text>
                            <Text style={styles.gradeText}>Điểm trung bình học kỳ (thang 4): {semesterGrades[selectedSemester].gpa4}</Text>
                            <Text style={styles.gradeText}>Điểm chữ: {semesterGrades[selectedSemester].letterGrade}</Text>
                            <Text style={styles.gradeText}>Xếp loại: {semesterGrades[selectedSemester].classification}</Text>
                            <Text style={styles.gradeText}>Số tín chỉ đã đạt: {semesterGrades[selectedSemester].creditsEarned}</Text>
                            <Text style={styles.gradeText}>Số tín chỉ nợ: {semesterGrades[selectedSemester].creditsOwed}</Text>
                        </View>
                    ) : (
                        <View style={styles.gradesContainer}>
                            <Text style={styles.gradeText}>Không có dữ liệu cho học kỳ này</Text>
                        </View>
                    )}
                </>
            )}
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