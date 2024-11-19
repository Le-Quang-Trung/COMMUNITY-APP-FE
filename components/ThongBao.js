import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getThongBaoByMSSV } from '../service/thongbao.service';
import { useRecoilValue } from 'recoil';
import { sinhVienDataState } from '../state';

const ThongBao = () => {
    const navigation = useNavigation();
    const sinhVienData = useRecoilValue(sinhVienDataState);
    console.log("đây là dữ liệu sinh viên ở trang thông báo:", sinhVienData);

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThongBao = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getThongBaoByMSSV(sinhVienData.mssv);
                setNotifications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (sinhVienData.mssv) {
            fetchThongBao();
        }
    }, [sinhVienData.mssv]);

    if (loading) {
        return (
            <View style={styles.Container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Đang tải thông báo...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.Container}>
                {/* <Text style={styles.errorText}>Lỗi: {error}</Text> */}
                <Text style={styles.textHeader}>Thông Báo</Text>
                <Text style={styles.notificationContainer}>Không có thông báo nào.</Text>
            </View>
        );
    }

    if (notifications.length === 0) {
        return (
            <View style={styles.Container}>
                <Text style={styles.textHeader}>Thông Báo</Text>
                <Text>Không có thông báo nào.</Text>
            </View>
        );
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.textHeader}>Thông Báo</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.notificationContainer}>
                        <Text style={styles.notificationTitle}>{item.tieuDe}</Text>
                        <Text style={styles.notificationContent}>{item.noiDung}: Buổi học ngày {new Date(item.ngayGioThongBao).toLocaleDateString()}</Text>
                        <Text style={styles.notificationFooter}>GV: {item.tenNguoiThongBao}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ThongBao;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        padding: 20,
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 20,
        textAlign: 'center',
    },
    notificationContainer: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    notificationContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    notificationFooter: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#555',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});