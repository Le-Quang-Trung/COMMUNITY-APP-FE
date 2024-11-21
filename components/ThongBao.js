import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getThongBaoByMSSV } from '../service/thongbao.service';
import { getThongBaoByMaGV } from '../service/thongbao.service';
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

    console.log("đây là thông báo:", notifications)

    useEffect(() => {
        const fetchThongBao = async () => {
            setLoading(true);
            setError(null);
            try {
                let data;
                if (user.role === "sinh viên" && sinhVienData.mssv) {
                    data = await getThongBaoByMSSV(sinhVienData.mssv);
                } else if (user.role === "giảng viên" && giangVienData.maGV) {
                    data = await getThongBaoByMaGV(giangVienData.maGV);
                }
                setNotifications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Trigger the fetchThongBao when the role or student/teacher data changes
        fetchThongBao();
    }, [user.role, sinhVienData.mssv, giangVienData.maGV]);

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
                <Text style={styles.notificationContainer}>Không có thông báo nào.</Text>
                {user.role === "sinh viên" && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('XinNghiPhep')}>
                            <Text style={styles.buttonText}>XIN NGHỈ PHÉP</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {user.role === "giảng viên" && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TaoThongBaoGV')}>
                            <Text style={styles.buttonText}>TẠO THÔNG BÁO</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    if (notifications.length === 0) {
        return (
            <View style={styles.Container}>
                <Text style={styles.textHeader}>Thông Báo</Text>
                <Text style={styles.notificationContainer}>Không có thông báo nào.</Text>
                {user.role === "sinh viên" && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('XinNghiPhep')}>
                            <Text style={styles.buttonText}>XIN NGHỈ PHÉP</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {user.role === "giảng viên" && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TaoThongBaoGV')}>
                            <Text style={styles.buttonText}>TẠO THÔNG BÁO</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
                        <Text style={styles.notificationTitle}>{item.tieuDeThongBao}</Text>
                        <Text style={styles.notificationContent}>{item.noiDungThongBao}</Text>
                        {user.role === "giảng viên" &&(
                            <Text style={styles.notificationContent}>Nguyên nhân: {item.lyDo}</Text>
                        )}
                        <Text style={styles.notificationContent}>Ngày: {new Date(item.ngayGioThongBao).toLocaleDateString()}</Text>
                        <Text style={styles.notificationFooter}>{item.tenNguoiThongBao}</Text>
                        
                    </View>
                )}
            />
            {user.role === "sinh viên" && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('XinNghiPhep')}>
                        <Text style={styles.buttonText}>XIN NGHỈ PHÉP</Text>
                    </TouchableOpacity>
                </View>
            )}

            
            {user.role === "giảng viên" && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TaoThongBaoGV')}>
                        <Text style={styles.buttonText}>TẠO THÔNG BÁO</Text>
                    </TouchableOpacity>
                </View>
            )}
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
});
