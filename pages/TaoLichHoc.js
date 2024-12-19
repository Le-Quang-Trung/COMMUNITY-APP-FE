import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, Modal, FlatList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createLichHoc } from "../service/quanly.service";

const TaoLichHoc = ({ route }) => {
    const navigation = useNavigation();
    const { maLHP, maMonHoc } = route.params;

    const [ngayBatDau, setNgayBatDau] = useState('');
    const [ngayKetThuc, setNgayKetThuc] = useState('');
    const [GV, setGV] = useState('');


    const [lichHoc, setLichHoc] = useState([]);

    const [ngayHoc, setNgayHoc] = useState('');
    const [tietHoc, setTietHoc] = useState('');
    const [phongHoc, setPhongHoc] = useState('');
    const [phanLoai, setPhanLoai] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

    const optionsNgayHoc = [
        { label: "Thứ 2", value: "1" },
        { label: "Thứ 3", value: "2" },
        { label: "Thứ 4", value: "3" },
        { label: "Thứ 5", value: "4" },
        { label: "Thứ 6", value: "5" },
        { label: "Thứ 7", value: "6" },
        { label: "Chủ nhật", value: "7" },
    ];

    const optionsTietHoc = [
        { label: "1-3", value: "1-3" },
        { label: "4-6", value: "4-6" },
        { label: "7-9", value: "7-9" },
        { label: "10-12", value: "10-12" },
    ];

    const openModal = (type) => {
        setModalType(type);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleOptionSelect = (value) => {
        if (modalType === "ngayHoc") setNgayHoc(value);
        if (modalType === "tietHoc") setTietHoc(value);
        closeModal();
    };

    const handleCreateLichHoc = async () => {
        if (!ngayHoc || !tietHoc || !phongHoc || !ngayBatDau || !ngayKetThuc || !GV || !phanLoai) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const parsedLichHoc = [
            {
                ngayHoc: parseInt(ngayHoc),
                tietHoc,
                phongHoc,
                phanLoai,
            },
        ];

        const data = {
            maLHP,
            maMonHoc,
            lichHoc: parsedLichHoc,
            ngayBatDau,
            ngayKetThuc,
            GV,

        };

        try {
            const result = await createLichHoc(data);
            Alert.alert("Thành công", "Tạo lịch học thành công!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    name="arrowleft"
                    size={22}
                    color="white"
                    onPress={() => navigation.goBack()}
                    style={styles.searchIcon}
                />
                <Text style={styles.title}>Tạo Lịch Học</Text>
            </View>

            {/* Ma Lop Hoc Phan*/}
            <View style={styles.row}>
                <Text style={styles.label}>Mã Lớp Học Phần: {maLHP}</Text>
            </View>

            {/* Ma Mon Hoc */}
            <View style={[styles.row, { marginTop: 20 }]} >
                <Text style={styles.label}>Mã Môn Học: {maMonHoc}</Text>
            </View>


            {/* Ngày Học */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text>Ngày Học:  </Text>
                <TouchableOpacity
                    style={styles.optionButton}  // Thêm style cho button
                    onPress={() => openModal("ngayHoc")}
                >
                    <Text style={styles.optionText}>
                        {ngayHoc ? `Thứ ${["2", "3", "4", "5", "6", "7", "Chủ nhật"][ngayHoc - 1]}` : "Chọn ngày học"}
                    </Text>
                </TouchableOpacity>
            </View>


            {/* Tiết Học */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text>Tiết Học:  </Text>
                <TouchableOpacity
                    style={styles.optionButton}  // Thêm style cho button
                    onPress={() => openModal("tietHoc")}
                >
                    <Text style={styles.optionText}>{tietHoc || "Chọn tiết học"}</Text>
                </TouchableOpacity>
            </View>




            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={modalType === "ngayHoc" ? optionsNgayHoc : optionsTietHoc}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleOptionSelect(item.value)}
                                >
                                    <Text>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.modalClose}
                            onPress={closeModal}
                        >
                            <Text>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Phòng Học */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Phòng Học:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập phòng học"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={phongHoc}
                    onChangeText={setPhongHoc}
                />
            </View>

            {/* Phan Loai */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Phân Loại:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    placeholder="Nhập phân loại"
                    value={phanLoai}
                    onChangeText={setPhanLoai}
                />
            </View>

            {/* Giang Vien */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Giảng Viên:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nhập mã giảng viên"
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    value={GV}
                    onChangeText={setGV}
                />
            </View>


            {/* Ngay Bat Dau */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Ngày Bắt Đầu:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    placeholder="01-01-2024"
                    value={ngayBatDau}
                    onChangeText={setNgayBatDau}
                />
            </View>

            {/* Ngay Ket Thuc */}
            <View style={[styles.row, { marginTop: 20 }]}>
                <Text style={styles.label}>Ngày Kết Thúc:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#D9D9D9"
                    style={[styles.input, styles.inputBorder]}
                    placeholder="31-01-2024"
                    value={ngayKetThuc}
                    onChangeText={setNgayKetThuc}
                />
            </View>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCreateLichHoc}>
                    <Text style={styles.buttonText}>TẠO LỊCH HỌC</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default TaoLichHoc;

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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    modalClose: {
        marginTop: 10,
        alignItems: "center",
    },
    optionButton: {
        width: '35%',
        paddingVertical: 3,
        backgroundColor: '#F9FFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        color: '#333',
        textAlign: 'center',
    },
});