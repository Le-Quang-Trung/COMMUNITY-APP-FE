import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'

const CaNhan = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>Thông tin sinh viên</Text>
                <Image
                    style={styles.profileImage}
                    source={require('../assets/images/parents-vector.png')}
                />
                <Text style={styles.name}>Lê Quang Trung</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Trạng thái:</Text>
                    <Text style={styles.value}>Đang học</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Giới tính:</Text>
                    <Text style={styles.value}>Nam</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Ngày sinh:</Text>
                    <Text style={styles.value}>31/05/2002</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>MSSV:</Text>
                    <Text style={styles.value}>20004621</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Lớp:</Text>
                    <Text style={styles.value}>DHKTPM16ATT</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Bậc đào tạo:</Text>
                    <Text style={styles.value}>Đại học</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Khoa:</Text>
                    <Text style={styles.value}>Công nghệ thông tin</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Chuyên ngành:</Text>
                    <Text style={styles.value}>Kỹ thuật phần mềm - 7480103</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Địa chỉ:</Text>
                    <Text style={styles.value}>Thành phố Hồ Chí Minh</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Số điện thoại:</Text>
                    <Text style={styles.value}>0886574809</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('DangNhap')}>
                <View style={styles.buttonContainer}>
                    <FontAwesome name="sign-out" size={20} color="white" />
                    <Text style={styles.buttonText}>Đăng xuất</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CaNhan;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F9FFFF',
    },
    header: {
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        paddingVertical: 10,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#FFF',
        borderWidth: 2,
    },
    name: {
        color: '#FFF',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    infoContainer: {
        padding: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    label: {
        fontSize: 16,
        color: '#333',
        width: '40%',
    },
    value: {
        color: '#000',
        width: '60%',
        textAlign: 'left',
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        flexDirection: 'row',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 300,
        height: 50,
        backgroundColor: 'rgba(58, 131, 244, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        left: 10,
        color: 'white',
    },
});
