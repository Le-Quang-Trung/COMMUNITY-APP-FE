import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ChuongTrinhKhung = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);

    const semesters = Array.from({ length: 9 }, (_, i) => `Học kỳ ${i + 1}`);

    const semesterDetails = {
        'Học kỳ 1': { totalCredits: 20, requiredCredits: 15, electiveCredits: 5 },
        'Học kỳ 2': { totalCredits: 18, requiredCredits: 12, electiveCredits: 6 },
        // Thêm các học kỳ khác tương tự
    };

    const subjects = {
        'Học kỳ 1': {
            required: [
                { name: 'Toán cao cấp', credits: 3 },
                { name: 'Lý thuyết mạch', credits: 2 },
            ],
            elective: [
                { name: 'Kỹ thuật lập trình', credits: 3 },
                { name: 'Cơ sở dữ liệu', credits: 2 },
            ],
        },
        'Học kỳ 2': {
            required: [
                { name: 'Vật lý đại cương', credits: 3 },
                { name: 'Hóa học đại cương', credits: 2 },
            ],
            elective: [
                { name: 'Mạng máy tính', credits: 3 },
                { name: 'Hệ điều hành', credits: 2 },
            ],
        },
        // Thêm các học kỳ khác tương tự
    };

    const handleSelectSemester = (semester) => {
        setSelectedSemester(semester);
        setModalVisible(false);
    };

    return (
        <View style={styles.Container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Chương trình khung</Text>
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
            {selectedSemester && semesterDetails[selectedSemester] && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Tổng số tín chỉ: {semesterDetails[selectedSemester].totalCredits}</Text>
                    <Text style={styles.detailText}>Tín chỉ học phần bắt buộc: {semesterDetails[selectedSemester].requiredCredits}</Text>
                    <Text style={styles.detailText}>Tín chỉ học phần tự chọn: {semesterDetails[selectedSemester].electiveCredits}</Text>
                    <Text style={styles.subjectHeader}>Học phần bắt buộc:</Text>
                    <FlatList
                        data={subjects[selectedSemester]?.required || []}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View style={styles.subjectRow}>
                                <Text style={styles.subjectName}>{item.name}</Text>
                                <Text style={styles.subjectCredits}>{item.credits}</Text>
                            </View>
                        )}
                    />
                    <Text style={styles.subjectHeader}>Học phần tự chọn:</Text>
                    <FlatList
                        data={subjects[selectedSemester]?.elective || []}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View style={styles.subjectRow}>
                                <Text style={styles.subjectName}>{item.name}</Text>
                                <Text style={styles.subjectCredits}>{item.credits}</Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default ChuongTrinhKhung;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0977FE',
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
    detailsContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    detailText: {
        fontSize: 16,
        color: 'black',
        marginVertical: 2,
    },
    subjectHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
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
});