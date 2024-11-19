// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const XinChao = () => {
//     const navigation = useNavigation();

//     return (
//         <View style={styles.Container}>
//             <Text style={styles.textHeader}>Xin chào,</Text>
//             <Text style={styles.text}>Đại học Công nghiệp Thành phố Hồ Chí Minh</Text>
//             <Text style={styles.text}>Vui lòng chọn tùy chọn để tiếp tục</Text>

//             <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('DangNhap', { role: 'sinh viên' })}>
//                 <Text style={styles.optionText}>Sinh viên</Text>
//                 <Image source={require('../assets/images/college-student.png')} style={styles.optionImage} />
//             </TouchableOpacity>


//             <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('TraCuuThongTin')}>
//                 <Text style={styles.optionText}>Phụ huynh</Text>
//                 <Image source={require('../assets/images/parents-vector.png')} style={styles.optionImage} />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('DangNhap', { role: 'giảng viên' })}>
//                 <Text style={styles.optionText}>Giảng viên</Text>
//                 <Image source={require('../assets/images/college-teacher.png')} style={styles.optionImage} />
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default XinChao;

// const styles = StyleSheet.create({
//     Container: {
//         flex: 1,
//         backgroundColor: 'rgba(58, 131, 244, 0.4)',
//         padding: 20,
//     },
//     textHeader: {
//         fontWeight: 'bold',
//         fontSize: 40,
//         marginBottom: 10
//     },
//     text: {
//         fontSize: 20,
//         marginBottom: 20
//     },
//     optionContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#000',
//         borderRadius: 10,
//         marginBottom: 15,
//         backgroundColor: '#fff'
//     },
//     optionText: {
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     optionImage: {
//         width: 70,
//         height: 70,
//         resizeMode: 'contain',
//     },
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const XinChao = () => {
    const navigation = useNavigation();
    const [isRoleModalVisible, setRoleModalVisible] = useState(false);

    const handleRoleSelect = (role) => {
        setRoleModalVisible(false); // Đóng modal
        navigation.navigate('DangNhap', { role }); // Chuyển hướng đến trang đăng nhập với role
    };

    return (
        <View style={styles.Container}>
            <Text style={styles.textHeader}>Xin chào,</Text>
            <Text style={styles.text}>Đại học Công nghiệp Thành phố Hồ Chí Minh</Text>
            <Text style={styles.text}>Vui lòng chọn tùy chọn để tiếp tục</Text>

            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('DangNhap', { role: 'sinh viên' })}>
                <Text style={styles.optionText}>Sinh viên</Text>
                <Image source={require('../assets/images/college-student.png')} style={styles.optionImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('TraCuuThongTin')}>
                <Text style={styles.optionText}>Phụ huynh</Text>
                <Image source={require('../assets/images/parents-vector.png')} style={styles.optionImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={() => setRoleModalVisible(true)}>
                <Text style={styles.optionText}>Giảng viên</Text>
                <Image source={require('../assets/images/college-teacher.png')} style={styles.optionImage} />
            </TouchableOpacity>

            {/* Modal để chọn vai trò */}
            <Modal
                visible={isRoleModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setRoleModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Chọn vai trò</Text>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleRoleSelect('giảng viên')}>
                            <Text style={styles.modalOptionText}>Giảng viên</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleRoleSelect('quản lý')}>
                            <Text style={styles.modalOptionText}>Quản lý</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalClose} onPress={() => setRoleModalVisible(false)}>
                            <Text style={styles.modalCloseText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default XinChao;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        padding: 20,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalOption: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalOptionText: {
        fontSize: 18,
    },
    modalClose: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    modalCloseText: {
        fontSize: 16,
        color: '#333',
    },
});
