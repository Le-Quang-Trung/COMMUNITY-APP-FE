import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getSinhVienByMSSV } from '../service/sinhvien.service';
import { userPHState, sinhVienDataState } from '../state';

const TraCuu = () => {

    const userPH = useRecoilValue(userPHState);
    const sinhVienData = useRecoilValue(sinhVienDataState);
    const setSinhVienData = useSetRecoilState(sinhVienDataState);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const sinhVienData = await getSinhVienByMSSV(userPH.tenTaiKhoan);
                setSinhVienData(sinhVienData);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
                Alert.alert("Lỗi", "Không thể lấy thông tin người dùng");
            }
        };

        fetchUserData();
    }, [userPH.tenTaiKhoan, setSinhVienData]);

    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('DiemHocKy')}>
                <Text style={styles.optionText}>Xem điểm</Text>
                <Image source={require('../assets/images/tra-cuu-thong-tin.png')} style={styles.optionImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('LichHoc')}>
                <Text style={styles.optionText}>Xem lịch học/lịch thi</Text>
                <Image source={require('../assets/images/tra-cuu-thong-tin.png')} style={styles.optionImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer}>
                <Text style={styles.optionText}>Thanh toán học phí</Text>
                <Image source={require('../assets/images/thanh-toan-hoc-phi.png')} style={styles.optionImage} />
            </TouchableOpacity>
        </View>
    );
};

export default TraCuu;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        padding: 20,
        justifyContent: 'space-evenly',
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10
    },
    text: {
        fontSize: 20,
        marginBottom: 20
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff'
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
    },
    optionImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
});
