import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import { FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getLichHocByMSSV } from '../service/lichhoclichthi.service';
import { getSinhVienByMSSV } from '../service/sinhvien.service';
import { getGiangVienByMaGV } from '../service/giangvien.service';
import { getQuanLyByMaQL } from '../service/quanly.service';
import { userState, sinhVienDataState, giangVienDataState, quanLyDataState } from '../state';

const TrangChu = () => {
    const user = useRecoilValue(userState);
    const sinhVienData = useRecoilValue(sinhVienDataState);
    const giangVienData = useRecoilValue(giangVienDataState);
    const quanLyData = useRecoilValue(quanLyDataState);
    const setSinhVienData = useSetRecoilState(sinhVienDataState);
    const setGiangVienData = useSetRecoilState(giangVienDataState);
    const setQuanLyData = useSetRecoilState(quanLyDataState);
    const navigation = useNavigation();
    const [todaySchedule, setTodaySchedule] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user.role === 'sinh viên') {
                    const sinhVienData = await getSinhVienByMSSV(user.data.tenTaiKhoan);
                    setSinhVienData(sinhVienData); // Cập nhật thông tin sinh viên vào Recoil
                    fetchTodaySchedule(sinhVienData.mssv); // Gọi hàm lấy lịch hôm nay
                } else if (user.role === 'giảng viên') {
                    const giangVienData = await getGiangVienByMaGV(user.data.tenTaiKhoan);
                    setGiangVienData(giangVienData); // Cập nhật thông tin giảng viên vào Recoil
                } else if (user.role === 'quản lý') {
                    const quanLyData = await getQuanLyByMaQL(user.data.tenTaiKhoan);
                    setQuanLyData(quanLyData); // Cập nhật thông tin quản lý vào Recoil
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
                Alert.alert("Lỗi", "Không thể lấy thông tin người dùng");
            }
        };

        fetchUserData();
    }, [user.role, user.data.tenTaiKhoan, setSinhVienData, setGiangVienData]);

    const fetchTodaySchedule = async (mssv) => {
        try {
            const schedules = await getLichHocByMSSV(mssv);
            const today = moment();
            const todayFormatted = today.format('YYYY-MM-DD');

            const todayData = schedules.filter(schedule => {
                const startDate = moment(schedule.ngayBatDau);
                const endDate = moment(schedule.ngayKetThuc);

                // Kiểm tra nếu hôm nay nằm trong khoảng thời gian học
                if (today.isBetween(startDate, endDate, 'days', '[]')) {
                    // Kiểm tra lịch học có trùng ngày trong tuần của hôm nay không
                    const dayOfWeek = today.isoWeekday(); // 1 (Thứ 2) -> 7 (Chủ nhật)
                    return schedule.lichHoc.some(lich => lich.ngayHoc === dayOfWeek);
                }
                return false;
            });

            setTodaySchedule(todayData.length > 0 ? todayData : null); // Cập nhật state lịch hôm nay
        } catch (error) {
            console.error('Lỗi khi lấy lịch hôm nay:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerText}>
                        Xin chào, {user.role === 'sinh viên' ? sinhVienData?.hoTen : user.role === 'giảng viên' ? giangVienData?.tenGV : 'Người Quản Lý'}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Thông Báo')}>
                        <FontAwesome name="bell" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Schedule inside Header */}
                <TouchableOpacity style={styles.scheduleContainer} onPress={() => navigation.navigate('LichHoc')}>
                    <Image
                        style={styles.scheduleImage}
                        source={require('../assets/images/calendar.png')}
                    />
                    <View>
                        <Text style={styles.scheduleTitle}>Lịch hôm nay:</Text>
                        <Text style={styles.scheduleContent}>
                            {todaySchedule
                                ? `Bạn có ${todaySchedule.length} lịch học hôm nay`
                                : 'Không tìm thấy lịch học/lịch thi'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Functionalities */}
            {user.role === 'sinh viên' && (
                <>
                    <Text style={styles.functionsTitle}>Chức năng</Text>
                    <View style={styles.functionsContainer}>
                        {functionsDataSV.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.functionItem} onPress={() => navigation.navigate(item.navigateTo)}>
                                <View style={styles.iconContainer}>{item.iconComponent()}</View>
                                <Text style={styles.functionText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            {user.role === 'giảng viên' && (
                <>
                    <Text style={styles.functionsTitle}>Chức năng</Text>
                    <View style={styles.functionsContainer}>
                        {functionsDataGV.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.functionItem} onPress={() => navigation.navigate(item.navigateTo)}>
                                <View style={styles.iconContainer}>{item.iconComponent()}</View>
                                <Text style={styles.functionText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            {user.role === 'quản lý' && (
                <>
                    <Text style={styles.functionsTitle}>Chức năng</Text>
                    <View style={styles.functionsContainer}>
                        {functionsDataQL.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.functionItem} onPress={() => navigation.navigate(item.navigateTo)}>
                                <View style={styles.iconContainer}>{item.iconComponent()}</View>
                                <Text style={styles.functionText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

// Thông tin các chức năng
const functionsDataSV = [
    { title: 'Chương trình khung', iconComponent: () => <Ionicons name="book-outline" size={40} color="green" />, navigateTo: 'ChuongTrinhKhung' },
    { title: 'Xem điểm', iconComponent: () => <Ionicons name="cash-outline" size={40} color="blue" />, navigateTo: 'DiemHocKy' },
    { title: 'Lịch học/ lịch thi', iconComponent: () => <Ionicons name="calendar-outline" size={40} color="orange" />, navigateTo: 'LichHoc' },
    { title: 'Thông báo', iconComponent: () => <Ionicons name="notifications-outline" size={40} color="red" />, navigateTo: 'Thông Báo' },
    { title: 'Phiếu thu tổng hợp', iconComponent: () => <Ionicons name="file-tray-full-outline" size={40} color="lightblue" />, navigateTo: 'PhieuThu' },
    // { title: 'Thanh toán học phí', iconComponent: () => <FontAwesome5 name="search-dollar" size={40} color="black" /> },
    { title: 'Công nợ', iconComponent: () => <Ionicons name="document-text-outline" size={40} color="pink" />, navigateTo: 'CongNo' },
];

// Thông tin các chức năng
const functionsDataGV = [
    // { title: 'Tạo điểm', iconComponent: () => <Ionicons name="document-text-outline" size={40} color="green" />, navigateTo: 'TaoDiemSo' },
    // { title: 'Cập nhật điểm số', iconComponent: () => <Ionicons name="document-text" size={40} color="blue" />, navigateTo: 'CapNhatDiemSo' },
    { title: 'Xem thông tin lớp học', iconComponent: () => <Ionicons name="calendar-outline" size={40} color="orange" />, navigateTo: 'XemThongTinLopHoc' },
    { title: 'Thông báo', iconComponent: () => <Ionicons name="notifications-outline" size={40} color="red" />, navigateTo: 'Thông Báo' },
];

// Thông tin các chức năng
const functionsDataQL = [
    { title: 'Danh sách sinh viên', iconComponent: () => <Ionicons name="duplicate-outline" size={40} color="green" />, navigateTo: 'DanhSachSinhVien' },
    { title: 'Danh sách lớp học phần', iconComponent: () => <Ionicons name="duplicate-outline" size={40} color="lightblue" />, navigateTo: 'DanhSachLopHocPhan' },
    { title: 'Thông tin sinh viên', iconComponent: () => <Ionicons name="apps" size={40} color="blue" />, navigateTo: 'ThongTinSinhVien' },
    { title: 'Tạo lớp học phần', iconComponent: () => <Ionicons name="add-circle-outline" size={40} color="red" />, navigateTo: 'TaoLopHocPhan' },
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
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    functionText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        color: '#333',
    },
});
