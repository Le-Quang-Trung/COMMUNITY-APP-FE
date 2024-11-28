import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getTenLopHocPhan } from '../service/monhoc.service';
import { getDiemSo } from '../service/diemso.service';
import { useRecoilValue } from 'recoil';
import { sinhVienDataState } from '../state';

const DiemMonHoc = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { subject } = route.params;
    const sinhVienData = useRecoilValue(sinhVienDataState);
    const [subjectDetails, setSubjectDetails] = useState(null);
    const [diemSo, setDiemSo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Tính điểm tổng kết thang 10
    const calculateTotalScore = (diemTK1, diemTK2, diemTK3, diemGK, diemCK) => {
        const tbThuongKy = (diemTK1 + diemTK2 + diemTK3) / 3;
        const diemTongKet10 = ((tbThuongKy * 20) + (diemGK * 30) + (diemCK * 50)) / 100;

        // Quy đổi điểm thang 10 sang thang điểm 4
        const diemThang4 = ((diemTongKet10 - 5) / 5) * 4;

        // Xác định điểm chữ
        let letterGrade = '';
        if (diemTongKet10 >= 9.0) {
            letterGrade = 'A+';
        } else if (diemTongKet10 >= 8.5) {
            letterGrade = 'A';
        } else if (diemTongKet10 >= 8.0) {
            letterGrade = 'B+';
        } else if (diemTongKet10 >= 7.0) {
            letterGrade = 'B';
        } else if (diemTongKet10 >= 6.0) {
            letterGrade = 'C+';
        } else if (diemTongKet10 >= 5.5) {
            letterGrade = 'C';
        } else if (diemTongKet10 >= 5.0) {
            letterGrade = 'D+';
        }

        // Xếp loại
        const classification = calculateClassification(letterGrade);

        return {
            diemTongKet10,
            diemThang4,
            letterGrade,
            classification
        };
    };

    const calculateClassification = (letterGrade) => {
        switch (letterGrade) {
            case 'A+':
                return 'Xuất sắc';
            case 'A':
                return 'Giỏi';
            case 'B+':
                return 'Khá Giỏi';
            case 'B':
                return 'Khá';
            case 'C+':
                return 'Trung Bình Khá';
            case 'C':
                return 'Trung Bình';
            case 'D+':
                return 'Trung Bình';
            default:
                return 'Chưa xếp loại';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch subject details first
                const maLopHocPhan = await getTenLopHocPhan(sinhVienData.mssv, subject.maMonHoc);
                setSubjectDetails(maLopHocPhan);

                // Fetch scores after subject details
                if (maLopHocPhan) {
                    const data = await getDiemSo(sinhVienData.mssv, subject.maMonHoc, maLopHocPhan);
                    setDiemSo(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sinhVienData.mssv, subject.maMonHoc]); // Only depend on mssv and maMonHoc

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    // Calculate scores
    const { diemTongKet10, diemThang4, letterGrade, classification } = calculateTotalScore(
        diemSo.diemTK1,
        diemSo.diemTK2,
        diemSo.diemTK3,
        diemSo.diemGK,
        diemSo.diemCK
    );

    return (
        <View style={styles.Container}>
            <View style={styles.headerbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.Headers}>Điểm môn học</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.subjectRow}>
                    <Text style={styles.subjectName}>{diemSo.monHoc}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    {subjectDetails && (
                        <>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Thường kỳ 1:</Text>
                                <Text style={styles.detailValue}>{diemSo.diemTK1}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Thường kỳ 2:</Text>
                                <Text style={styles.detailValue}>{diemSo.diemTK2}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Thường kỳ 3:</Text>
                                <Text style={styles.detailValue}>{diemSo.diemTK3}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Giữa kỳ:</Text>
                                <Text style={styles.detailValue}>{diemSo.diemGK}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Cuối kỳ:</Text>
                                <Text style={styles.detailValue}>{diemSo.diemCK}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Điểm tổng kết (thang 10):</Text>
                                <Text style={styles.detailValue}>{diemTongKet10.toFixed(2)}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Thang điểm 4:</Text>
                                <Text style={styles.detailValue}>{diemThang4.toFixed(2)}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Điểm chữ:</Text>
                                <Text style={styles.detailValue}>{letterGrade}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Xếp loại:</Text>
                                <Text style={styles.detailValue}>{classification}</Text>
                            </View>
                        </>
                    )}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});
