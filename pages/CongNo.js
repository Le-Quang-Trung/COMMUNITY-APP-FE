import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, FlatList, Button, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getCongNo, getKhauTruByMSSV, thanhToanCongNo } from '../service/congno.service';
import { useRecoilValue } from 'recoil';
import { sinhVienDataState } from '../state';
import { openBrowserAsync } from 'expo-web-browser';

const CongNo = () => {
    const navigation = useNavigation();
    const sinhVienData = useRecoilValue(sinhVienDataState);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [debtData, setDebtData] = useState([]);
    const [khauTruData, setKhauTruData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [error, setError] = useState(null);

    const hocKy = [
        { key: 'Học kỳ 1', hocKy: 'HK1' },
        { key: 'Học kỳ 2', hocKy: 'HK2' },
        { key: 'Học kỳ 3', hocKy: 'HK3' },
        { key: 'Học kỳ 4', hocKy: 'HK4' },
        { key: 'Học kỳ 5', hocKy: 'HK5' },
        { key: 'Học kỳ 6', hocKy: 'HK6' },
        { key: 'Học kỳ 7', hocKy: 'HK7' },
        { key: 'Học kỳ 8', hocKy: 'HK8' },
        { key: 'Học kỳ 9', hocKy: 'HK9' },
    ];


    const handleSelectSemester = async (semester) => {
        setSelectedSemester(semester.hocKy);
        setModalVisible(false);

        // Gọi API để lấy danh sách công nợ
        setLoading(true);
        setError(null);
        try {
            const hocKyCode = semester.hocKy;

            // Lấy dữ liệu công nợ
            const debtData = await getCongNo(sinhVienData.mssv, sinhVienData.nganh, hocKyCode);
            setDebtData(debtData);

            // Lấy dữ liệu khấu trừ
            const khauTruData = await getKhauTruByMSSV(sinhVienData.mssv);
            setKhauTruData(khauTruData);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!selectedSemester) {
            alert('Vui lòng chọn học kỳ trước khi thanh toán.');
            return;
        }
    
        try {
            setLoading(true);
            setIsPaying(true);
    
            const result = await thanhToanCongNo(sinhVienData.mssv, sinhVienData.nganh, selectedSemester);
            console.log('Payment result:', result);

            if (result) {
                openBrowserAsync(result); // Open URL in browser
            } else {
                alert(result.message || 'Thanh toán thành công!');
            }
    
            // Refresh debt data after payment
            handleSelectSemester({ hocKy: selectedSemester });
        } catch (err) {
            alert(`Lỗi thanh toán: ${err.message || 'Có lỗi xảy ra'}`);
        } finally {
            setLoading(false);
            setIsPaying(false);
        }
    };

    return (
        <ScrollView style={styles.Container}>
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
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleSelectSemester(item)}
                                >
                                    <Text style={styles.modalItemText}>{item.key}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button title="Đóng" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            {loading && <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>}
            {error && <Text style={styles.errorText}>Lỗi: {error}</Text>}
            {!loading && debtData.length > 0 && (
                <View style={styles.detailsContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Mã môn</Text>
                        <Text style={styles.tableHeaderText}>Tín chỉ</Text>
                        <Text style={styles.tableHeaderText}>Số tiền</Text>
                        <Text style={styles.tableHeaderText}>Trạng thái</Text>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {debtData.map((item, index) => (
                            <View style={styles.tableRow} key={item._id || index}>
                                <Text style={styles.tableCell}>{item.maMonHoc}</Text>
                                <Text style={styles.tableCell}>{item.tinChi}</Text>
                                <Text style={styles.tableCell}>{item.soTien.toLocaleString()} VND</Text>
                                <Text style={styles.tableCell}>{item.trangThai}</Text>
                            </View>

                        ))}
                        <TouchableOpacity
                            style={[styles.payButton, isPaying && styles.disabledPayButton]}
                            onPress={handlePayment}
                            disabled={isPaying}
                        >
                            <Text style={styles.payButtonText}>Thanh Toán</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            )}
            {!loading && debtData.length === 0 && selectedSemester && !error && (
                <Text style={styles.noDataText}>Không có dữ liệu công nợ cho học kỳ này.</Text>
            )}


            {!loading && khauTruData.length > 0 && (
                <View style={styles.khauTruContainer}>
                    <Text style={styles.sectionTitle}>Khấu trừ</Text>
                    <ScrollView>
                        {khauTruData.map((item, index) => (
                            <View style={styles.tableRow} key={item._id || index}>
                                <Text style={styles.tableCell}>{item.maKhauTru}</Text>
                                <Text style={styles.tableCell}>{item.soTien.toLocaleString()} VND</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
            {!loading && khauTruData.length === 0 && !error && (
                <Text style={styles.noDataText}>Không có dữ liệu khấu trừ.</Text>
            )}
        </ScrollView>
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
    loadingText: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 20,
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
    },
    noDataText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
    khauTruContainer: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },

    payButton: {
        padding: 15,
        backgroundColor: '#0977FE',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 20,
    },
    disabledPayButton: {
        backgroundColor: '#ccc',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});