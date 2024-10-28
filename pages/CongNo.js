import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, FlatList, Button, ScrollView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const CongNo = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);

    const hocKy = Array.from({ length: 9 }, (_, i) => `Học kỳ ${i + 1}`);

    const chiTietHocPhi = {
        'Học kỳ 1': {
            khauTru: 500000,
            monHoc: [
                { ten: 'Toán cao cấp', hocPhi: 1500000, daNop: 1000000 },
                { ten: 'Lý thuyết mạch', hocPhi: 1000000, daNop: 500000 },
                { ten: 'Hóa học đại cương', hocPhi: 2500000, daNop: 1500000 },
                // Thêm các môn học khác tương tự
            ],
        },
        'Học kỳ 2': {
            khauTru: 600000,
            monHoc: [
                { ten: 'Vật lý đại cương', hocPhi: 2000000, daNop: 1000000 },
                { ten: 'Hóa học đại cương', hocPhi: 1500000, daNop: 1000000 },
                { ten: 'Sinh học đại cương', hocPhi: 2500000, daNop: 2000000 },
                // Thêm các môn học khác tương tự
            ],
        },
        // Thêm các học kỳ khác tương tự
    };

    const handleSelectSemester = (semester) => {
        setSelectedSemester(semester);
        setModalVisible(false);
    };

    const calculateDebt = (hocPhi, daNop, khauTru) => {
        const remainingKhauTru = Math.max(0, khauTru - (hocPhi - daNop));
        const usedKhauTru = khauTru - remainingKhauTru;
        return { debt: hocPhi - daNop - usedKhauTru, usedKhauTru, remainingKhauTru };
    };

    const calculateTotalDebt = (monHoc) => {
        return monHoc.reduce((total, item) => {
            const { debt } = calculateDebt(item.hocPhi, item.daNop, chiTietHocPhi[selectedSemester].khauTru);
            return total + debt;
        }, 0);
    };

    return (
        <View style={styles.Container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Công Nợ</Text>
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
                            data={hocKy}
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
            {selectedSemester && chiTietHocPhi[selectedSemester] && (
                <View style={styles.detailsContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Mức học phí</Text>
                        <Text style={styles.tableHeaderText}>Đã nộp</Text>
                        <Text style={styles.tableHeaderText}>Khấu trừ</Text>
                        <Text style={styles.tableHeaderText}>Công nợ</Text>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {chiTietHocPhi[selectedSemester].monHoc.map((item, index) => {
                            const { debt, usedKhauTru, remainingKhauTru } = calculateDebt(item.hocPhi, item.daNop, chiTietHocPhi[selectedSemester].khauTru);
                            chiTietHocPhi[selectedSemester].khauTru = remainingKhauTru;
                            return (
                                <View>
                                    <Text style={styles.subjectName}>{item.ten}</Text>
                                    <View style={styles.tableRow} key={index}>

                                        <View style={styles.tableCell}>

                                            <Text style={styles.subjectFee}>{item.hocPhi} VND</Text>
                                        </View>
                                        <Text style={styles.tableCell}>{item.daNop} VND</Text>
                                        <Text style={styles.tableCell}>{usedKhauTru} VND</Text>
                                        <Text style={styles.tableCell}>{debt} VND</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.totalDebtContainer}>
                        <Text style={styles.totalDebtText}>Tổng công nợ:</Text>
                        <Text style={styles.totalDebtAmount}>{calculateTotalDebt(chiTietHocPhi[selectedSemester].monHoc)} VND</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default CongNo;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginHorizontal: 20,
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
        flex: 1,
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginHorizontal: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    tableHeaderText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    tableCell: {
        fontSize: 16,
        color: 'black',
        flex: 1,
        textAlign: 'center',
    },
    subjectName: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    subjectFee: {
        fontSize: 16,
        color: 'black',
    },
    totalDebtContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginHorizontal: 20,
    },
    totalDebtText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    totalDebtAmount: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
});