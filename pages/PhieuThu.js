import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PhieuThu = () => {
    const navigation = useNavigation();
    const phieuThuList = [
        { soPhieu: 'PT001', ngayGioChuyen: '2023-10-01 10:00', nganHang: 'Vietcombank', soTien: '1,000,000 VND' },
        { soPhieu: 'PT002', ngayGioChuyen: '2023-10-02 11:00', nganHang: 'Techcombank', soTien: '2,000,000 VND' },
        { soPhieu: 'PT003', ngayGioChuyen: '2023-10-03 12:00', nganHang: 'BIDV', soTien: '3,000,000 VND' },
        // Thêm các phiếu thu khác tương tự
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Phiếu thu</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                {phieuThuList.map((phieu, index) => (
                    <View key={index} style={styles.phieuThuItem}>
                        <View style={styles.row}>
                            <Text style={styles.phieuThuText}>Số phiếu: {phieu.soPhieu}</Text>
                            <Text style={styles.phieuThuText}>{phieu.ngayGioChuyen}</Text>
                        </View>
                        <Text style={styles.nganHangText}>{phieu.nganHang}</Text>
                        <View style={styles.row}>
                            <Text style={styles.soTienLabel}>Số tiền:</Text>
                            <Text style={styles.soTienText}>{phieu.soTien}</Text>
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Xem hóa đơn điện tử</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    scrollView: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    phieuThuItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    phieuThuText: {
        fontSize: 16,
        marginBottom: 5,
    },
    nganHangText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    soTienLabel: {
        fontSize: 16,
        color: 'gray',
    },
    soTienText: {
        fontSize: 16,
        color: 'orange',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#33CCFF',
    },
});

export default PhieuThu;