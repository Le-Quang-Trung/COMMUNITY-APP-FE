import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const XinChao = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.Container}>
            <Text style={styles.textHeader}>Xin chào,</Text>
            <Text style={styles.text}>Đại học Công nghiệp Thành phố Hồ Chí Minh</Text>
            <Text style={styles.text}>Vui lòng chọn tùy chọn để tiếp tục</Text>

            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('DangNhap', { role: 'sinh viên' })}>
                <Text style={styles.optionText}>Sinh viên</Text>
                <Image source={require('../assets/images/college-student.png')} style={styles.optionImage} />
            </TouchableOpacity>


            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('TraCuu')}>
                <Text style={styles.optionText}>Phụ huynh</Text>
                <Image source={require('../assets/images/parents-vector.png')} style={styles.optionImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('DangNhap', { role: 'giảng viên' })}>
                <Text style={styles.optionText}>Giảng viên</Text>
                <Image source={require('../assets/images/college-teacher.png')} style={styles.optionImage} />
            </TouchableOpacity>
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
});
