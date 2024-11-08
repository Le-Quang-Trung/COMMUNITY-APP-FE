import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getChuongTrinhKhung } from '../service/chuongtrinhkhung.service';
import { useRecoilValue } from 'recoil';
import { sinhVienDataState } from '../state';

const ChuongTrinhKhung = () => {
    const navigation = useNavigation();
    const sinhVienData = useRecoilValue(sinhVienDataState);

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

        const hocKyNumber = `HK${semester.split(" ")[2]}`;

        try {
            const data = await getChuongTrinhKhung(sinhVienData.mssv, hocKyNumber);
            setSemesterData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}

            {semesterData && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Tổng số tín chỉ: {semesterData.chuongtrinhkhung.tinChiBatBuoc + semesterData.chuongtrinhkhung.tinChiTuChon}</Text>
                    <Text style={styles.detailText}>Tín chỉ bắt buộc: {semesterData.chuongtrinhkhung.tinChiBatBuoc}</Text>
                    <Text style={styles.detailText}>Tín chỉ tự chọn: {semesterData.chuongtrinhkhung.tinChiTuChon}</Text>

                    <Text style={styles.subjectHeader}>Học phần bắt buộc:</Text>
                    <FlatList
                        data={semesterData.monHocs.filter(mon => mon.phanLoai === 'Bắt buộc')}
                        keyExtractor={(item) => item.maMonHoc}
                        renderItem={({ item }) => (
                            <View style={styles.subjectRow}>
                                <Text style={styles.subjectName}>{item.tenMonHoc}</Text>
                                <Text style={styles.subjectCredits}>{item.tinChi}</Text>
                            </View>
                        )}
                    />

                    <Text style={styles.subjectHeader}>Học phần tự chọn:</Text>
                    <FlatList
                        data={semesterData.monHocs.filter(mon => mon.phanLoai === 'Tự chọn')}
                        keyExtractor={(item) => item.maMonHoc}
                        renderItem={({ item }) => (
                            <View style={styles.subjectRow}>
                                <Text style={styles.subjectName}>{item.tenMonHoc}</Text>
                                <Text style={styles.subjectCredits}>{item.tinChi}</Text>
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
    subjectHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    subjectRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    subjectName: { fontSize: 16, color: 'black' },
    subjectCredits: { fontSize: 16, color: 'black' },
    errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
});
