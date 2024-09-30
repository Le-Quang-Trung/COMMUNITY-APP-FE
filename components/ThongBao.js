import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ThongBao = () => {
    const navigation = useNavigation();

    const notifications = [
        { id: '1', message: 'Buổi học ngày 22 tháng 9 từ 12h30 - 15h: Đi học đúng giờ' },
        { id: '2', message: 'Buổi học ngày 23 tháng 9 từ 14h00 - 16h30: Vắng' },
        // Thêm các thông báo khác tương tự
    ];

    return (
        <View style={styles.Container}>
            <Text style={styles.textHeader}>Thông Báo</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notificationContainer}>
                        <Text style={styles.notificationText}>{item.message}</Text>
                    </View>
                )}
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
        justifyContent: 'space-evenly',
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10,
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
    notificationText: {
        fontSize: 18,
        fontWeight: '500',
    },
});