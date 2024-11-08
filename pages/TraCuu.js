import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TraCuu = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('TraCuuThongTin')}>
                <Text style={styles.optionText}>Tra cứu thông tin</Text>
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
