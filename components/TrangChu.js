import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getSinhVienByMSSV } from '../service/sinhvien.service';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, sinhVienDataState } from '../state';

const TrangChu = () => {
    const user = useRecoilValue(userState);
    const sinhVienData = useRecoilValue(sinhVienDataState);
    const setSinhVienData = useSetRecoilState(sinhVienDataState);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSinhVienData = async () => {
            try {
                const sinhVienData = await getSinhVienByMSSV(user.data.tenTaiKhoan);
                setSinhVienData(sinhVienData); // Cập nhật vào Recoil
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sinh viên:', error);
                Alert.alert("Lỗi", "Không thể lấy thông tin sinh viên");
            }
        };

        fetchSinhVienData();
    }, [user.data.tenTaiKhoan, setSinhVienData]);
   
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerText}>Xin chào, {sinhVienData?.hoTen}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Thông Báo')}>
                        <FontAwesome name="bell" size={24} color="white" />
                    </TouchableOpacity>

                </View>

                {/* Schedule inside Header */}
                <TouchableOpacity style={styles.scheduleContainer}
                    onPress={() => navigation.navigate('LichHoc')}
                >
                    <Image
                        style={styles.scheduleImage}
                        source={require('../assets/images/calendar.png')}
                    />
                    <View>
                        <Text style={styles.scheduleTitle}>Lịch hôm nay:</Text>
                        <Text style={styles.scheduleContent}>Không tìm thấy lịch học/lịch thi</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Functionalities */}
            <Text style={styles.functionsTitle}>Chức năng</Text>
            <View style={styles.functionsContainer}>
                {functionsData.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.functionItem}
                        onPress={() => navigation.navigate(item.navigateTo)}
                    >
                        <View style={styles.iconContainer}>
                            {item.iconComponent()}
                        </View>
                        <Text style={styles.functionText}>{item.title}</Text>
                    </TouchableOpacity>

                ))}
            </View>
        </View>
    );
};

const functionsData = [
    { title: 'Chương trình khung', iconComponent: () => <Ionicons name="book-outline" size={40} color="green" />, navigateTo: 'ChuongTrinhKhung' },
    { title: 'Xem điểm', iconComponent: () => <Ionicons name="cash-outline" size={40} color="blue" />, navigateTo: 'DiemHocKy' },
    { title: 'Lịch học/ lịch thi', iconComponent: () => <Ionicons name="calendar-outline" size={40} color="orange" />, navigateTo: 'LichHoc' },
    { title: 'Thông báo', iconComponent: () => <Ionicons name="notifications-outline" size={40} color="red" />, navigateTo: 'Thông Báo' },
    { title: 'Phiếu thu tổng hợp', iconComponent: () => <Ionicons name="file-tray-full-outline" size={40} color="lightblue" />, navigateTo: 'PhieuThu' },
    { title: 'Thanh toán học phí', iconComponent: () => <FontAwesome5 name="search-dollar" size={40} color="black" /> },
    { title: 'Công nợ', iconComponent: () => <Ionicons name="document-text-outline" size={40} color="pink" />, navigateTo: 'CongNo' },
];

export default TrangChu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FFFF',
    },
    header: {
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 15,
        height: 130,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scheduleContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: -30,
        alignSelf: 'center',
        width: '95%',
    },
    scheduleImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    scheduleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    scheduleContent: {
        fontSize: 14,
        color: '#666',
    },
    functionsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 30,
        padding: 10,
    },
    functionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    functionItem: {
        width: '28%',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',  // Màu nền trắng cho vòng tròn
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,  // Hiệu ứng đổ bóng
    },
    functionText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        color: '#333',
    },
});
