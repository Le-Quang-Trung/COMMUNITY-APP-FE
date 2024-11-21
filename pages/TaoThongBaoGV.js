import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { danhGiaHocTap } from '../service/giangvien.service'; 
import { useRecoilValue } from 'recoil';
import { giangVienDataState } from '../state';

const TaoThongBaoGV = () => {
    const navigation = useNavigation();

    const giangVienData = useRecoilValue(giangVienDataState);

    const [tieuDeThongBao, setTieuDeThongBao] = useState('');
    const [noiDungThongBao, setNoiDungThongBao] = useState('');
    const [doiTuongThongBao, setDoiTuongThongBao] = useState('');
    const [taoThongBao, setTaoThongBao] = useState(giangVienData?.maGV || '');

    const handleTaoThongBao = async () => {
        if (!tieuDeThongBao || !noiDungThongBao || !doiTuongThongBao || !taoThongBao) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            // Gọi API tạo thông báo
            const response = await danhGiaHocTap({
                tieuDeThongBao,
                noiDungThongBao,
                doiTuongThongBao,
                taoThongBao,
            });
            Alert.alert("Thành công", "Thông báo đã được tạo thành công");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign 
                    name="arrowleft" 
                    size={22} 
                    color="white" 
                    onPress={() => navigation.goBack()} 
                    style={styles.searchIcon} 
                />
                <Text style={styles.title}>Tạo Thông Báo</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Tiêu Đề:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập tiêu đề thông báo" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={tieuDeThongBao}
                    onChangeText={setTieuDeThongBao}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Nội Dung:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập nội dung thông báo" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={noiDungThongBao}
                    onChangeText={setNoiDungThongBao}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Đối Tượng Thông Báo:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nhập mã số sinh viên" 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={doiTuongThongBao}
                    onChangeText={setDoiTuongThongBao}
                />
            </View>

            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Người Tạo Thông Báo:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={taoThongBao}
                    editable={false} 
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTaoThongBao}>
                    <Text style={styles.buttonText}>TẠO THÔNG BÁO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaoThongBaoGV;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F9FFFF',
    },
    header: {
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 15,
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
        top: 15,
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '5%',
        marginVertical: 10,
    },
    label: {
        width: '80%',
        color: '#000',
    },
    inputContainer: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        height: 40,
    },
    inputBorder: {
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(58, 131, 244, 0.4)',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});
