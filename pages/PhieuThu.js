import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getPhieuThuByMSSV } from '../service/congno.service';
import { useRecoilValue } from 'recoil';
import { sinhVienDataState } from '../state';

const PhieuThu = ({ route }) => {
    const navigation = useNavigation();

    const sinhVienData = useRecoilValue(sinhVienDataState);
    const [phieuThuList, setPhieuThuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPhieuThu = async () => {
            try {
                setLoading(true);
                const data = await getPhieuThuByMSSV(sinhVienData.mssv);
                setPhieuThuList(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPhieuThu();
    }, [sinhVienData.mssv]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0977FE" />
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Không có phiếu thu nào</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.errorButton}>Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

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
                            <Text style={styles.phieuThuText}>Số phiếu: {phieu.maPhieuThu}</Text>
                            <Text style={styles.phieuThuText}>
                                {new Date(phieu.ngayThu).toLocaleString('vi-VN')}
                            </Text>
                        </View>
                        <Text style={styles.nganHangText}>{phieu.nganHang}</Text>
                        <View style={styles.row}>
                            <Text style={styles.soTienLabel}>Số tiền:</Text>
                            <Text style={styles.soTienText}>
                                {Number(phieu.soTien).toLocaleString('vi-VN')} VND
                            </Text>
                        </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    errorButton: {
        fontSize: 16,
        color: '#0977FE',
        marginTop: 10,
    },
});

export default PhieuThu;
