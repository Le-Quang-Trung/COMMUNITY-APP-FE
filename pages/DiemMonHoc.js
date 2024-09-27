import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

const DiemMonHoc = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { subject } = route.params;

    const subjectDetails = {
        thuongKy1: 8,
        thuongKy2: 7.5,
        thuongKy3: 9,
        giuaKy: 8.5,
        cuoiKy: 9,
        gpa10: 8.5,
        gpa4: 3.7,
        letterGrade: 'A',
        classification: 'Giỏi',
    };

    return (
        <View style={styles.Container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Điểm môn học</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ChuongTrinhKhung')}>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.subjectRow}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.credits}>{subject.credits} tín chỉ</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Thường kỳ 1:</Text>
                        <Text style={styles.detailValue}>{subjectDetails.thuongKy1}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Thường kỳ 2:</Text>
                        <Text style={styles.detailValue}>{subjectDetails.thuongKy2}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Thường kỳ 3:</Text>
                        <Text style={styles.detailValue}>{subjectDetails.thuongKy3}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Giữa kỳ:</Text>
                        <Text style={styles.detailValue}>{subjectDetails.giuaKy}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Cuối kỳ:</Text>
                        <Text style={styles.detailValue}>{subjectDetails.cuoiKy}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Điểm trung bình (thang 10):</Text>
                        <Text style={styles.detailValue}>{subjectDetails.gpa10}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Điểm trung bình (thang 4):</Text>
                        <Text style={styles.detailValue}>{subjectDetails.gpa4}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Điểm chữ:</Text>
                        <Text style={styles.detailValue}>{subjectDetails.letterGrade}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Xếp loại:</Text>
                        <Text style={styles.detailValue}>{subjectDetails.classification}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DiemMonHoc;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0977FE',
        padding: 10,
    },
    Headers: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
    content: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    subjectRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subjectName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    credits: {
        fontSize: 16,
        color: 'gray',
        marginTop: 5,
    },
    detailsContainer: {
        marginTop: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    detailLabel: {
        fontSize: 16,
        color: 'black',
    },
    detailValue: {
        fontSize: 16,
        color: 'black',
    },
});