import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getThongBaoByMSSV, getThongBaoByMaGV } from '../service/thongbao.service';
import { useRecoilValue } from 'recoil';
import { sinhVienDataState, giangVienDataState, userState } from '../state';

const ThongBao = () => {
    const navigation = useNavigation();
    const user = useRecoilValue(userState);
    const sinhVienData = useRecoilValue(sinhVienDataState);
    const giangVienData = useRecoilValue(giangVienDataState);

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let intervalId;
        const fetchThongBao = async () => {
            // Bắt đầu việc gọi API, setLoading là true
            setLoading(true);
            setError(null);
    
            try {
                let data = [];
                if (user.role === "sinh viên" && sinhVienData?.mssv) {
                    data = await getThongBaoByMSSV(sinhVienData.mssv);
                } else if (user.role === "giảng viên" && giangVienData?.maGV) {
                    data = await getThongBaoByMaGV(giangVienData.maGV);
                }
                
                // Sắp xếp thông báo theo ngày (mới nhất lên đầu)
                data.sort((a, b) => new Date(b.ngayGioThongBao) - new Date(a.ngayGioThongBao));
                
                console.log("Dữ liệu thông báo sau khi sắp xếp:", data); // Log dữ liệu đã sắp xếp
                setNotifications(data);
            } catch (err) {
                console.error("Lỗi API:", err); // Log lỗi nếu có
                setError(err.message);
            } finally {
                // Đảm bảo set loading là false sau khi hoàn thành
                setLoading(false);
            }
        };
    
        // Gọi API lần đầu khi component mount
        fetchThongBao();
    
        // Thiết lập interval để gọi API sau mỗi 5 phút 
        intervalId = setInterval(fetchThongBao, 500000);
    
        // Cleanup interval khi component unmount
        return () => clearInterval(intervalId);
    }, [user.role, sinhVienData?.mssv, giangVienData?.maGV]);
    
    
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
                <Text style={styles.textHeader}>Thông Báo</Text>
                <Text style={styles.errorText}>Đã xảy ra lỗi: {error}</Text>
                {renderButton()}
            </View>
        );
    }

    if (notifications.length === 0) {
        return (
            <View style={styles.Container}>
                <Text style={styles.textHeader}>Thông Báo</Text>
                <Text style={styles.notificationContainer}>Không có thông báo nào.</Text>
                {renderButton()}
            </View>
        );
    }

    const renderButton = () => {
        if (user.role === "sinh viên") {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('XinNghiPhep')}>
                        <Text style={styles.buttonText}>XIN NGHỈ PHÉP</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if (user.role === "giảng viên") {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TaoThongBaoLHP')}>
                        <Text style={styles.buttonText}>TẠO THÔNG BÁO</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.Container}>
            <Text style={styles.textHeader}>Thông Báo</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.notificationContainer}>
                        <Text style={styles.notificationTitle}>{item.tieuDeThongBao}</Text>
                        <Text style={styles.notificationContent}>{item.noiDungThongBao}</Text>
                        {user.role === "giảng viên" && item.lyDo && (
                            <Text style={styles.notificationContent}>Nguyên nhân: {item.lyDo}</Text>
                        )}
                        <Text style={styles.notificationContent}>Ngày: {new Date(item.ngayGioThongBao).toLocaleDateString()}</Text>
                        <Text style={styles.notificationFooter}>{item.tenNguoiThongBao}</Text>
                    </View>
                )}
                ListFooterComponent={renderButton}
                contentContainerStyle={styles.flatListContainer} // Thêm khoảng trống dưới
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
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
    flatListContainer: {
        paddingBottom: 40,
    },
});
