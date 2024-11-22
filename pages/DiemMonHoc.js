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

    console.log("aaa", subject)
    console.log("bbb", subjectDetails)
    console.log("ccc", diemSo)

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
                    {/* <Text style={styles.credits}>{diemSo.credits} tín chỉ</Text> */}
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
                            {/* <View style={styles.detailRow}>
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
                            </View> */}
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
