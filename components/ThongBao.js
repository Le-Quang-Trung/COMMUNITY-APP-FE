import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ThongBao = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Thông Báo!</Text>
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
