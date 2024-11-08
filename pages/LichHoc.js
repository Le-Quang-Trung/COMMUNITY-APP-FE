import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const sampleData = {
  "maLichHoc": "LH001",
  "maLHP": "LHP001",
  "maMonHoc": "MH001",
  "lichHoc": [
    {
      "ngayHoc": 2,  // Thứ Ba
      "tietHoc": "1-3",
      "phongHoc": "A101"
    },
    {
      "ngayHoc": 4,  // Thứ Năm
      "tietHoc": "1-3",
      "phongHoc": "A102"
    }
  ],
  "ngayBatDau": "2024-11-01",
  "ngayKetThuc": "2024-12-15",
  "GV": "Nguyen Van A",
  "phanLoai": "Ly thuyet",
  "tenMonHoc": "Toan cao cap 1"
};

const LichHoc = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(null);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [scheduledDays, setScheduledDays] = useState({});

  useEffect(() => {
    const startDate = moment(sampleData.ngayBatDau);
    const endDate = moment(sampleData.ngayKetThuc);
    const days = {};

    for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate); date.add(1, 'days')) {
      const dayOfWeek = date.isoWeekday(); // 1 (Monday) to 7 (Sunday)
      const scheduledDay = sampleData.lichHoc.find(item => item.ngayHoc === dayOfWeek);

      if (scheduledDay) {
        days[date.format('YYYY-MM-DD')] = {
          subject: sampleData.tenMonHoc,
          room: scheduledDay.phongHoc,
          time: scheduledDay.tietHoc,
          teacher: sampleData.GV
        };
      }
    }

    setScheduledDays(days);
  }, []);

  const startOfWeek = currentDate.clone().startOf('isoWeek');
  const days = [];

  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'));
  }

  const handleDayPress = (day) => {
    if (scheduledDays[day]) {
      setSelectedDay(scheduledDays[day]);
    } else {
      setSelectedDay(null);
    }
  };

  const goToNextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, 'week'));
  };

  const goToPreviousWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'week'));
  };

  const showMonthModal = () => {
    setMonthModalVisible(true);
  };

  const selectDate = (date) => {
    setCurrentDate(moment(date));
    setMonthModalVisible(false);
  };

  const renderCalendar = () => {
    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.clone().startOf('month');
    const startDayOfWeek = firstDayOfMonth.clone().startOf('isoWeek');
    const endDayOfWeek = firstDayOfMonth.clone().endOf('month').endOf('isoWeek');

    const calendarDays = [];
    let day = startDayOfWeek.clone();

    while (day.isBefore(endDayOfWeek, 'day')) {
      calendarDays.push(day.clone().format('YYYY-MM-DD'));
      day.add(1, 'day');
    }

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{currentDate.format('MMMM YYYY')}</Text>
        <View style={styles.calendarGrid}>
          {calendarDays.map((day) => {
            const hasSchedule = scheduledDays[day];
            return (
              <TouchableOpacity
                key={day}
                style={[styles.calendarDay, hasSchedule && styles.hasSchedule]}
                onPress={() => selectDate(day)}
              >
                <Text style={[styles.dayText, hasSchedule && styles.hasScheduleText]}>{moment(day).date()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.Headers}>Thời khóa biểu</Text>
      </View>
      <View style={styles.dateHeader}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showMonthModal}>
          <Text style={styles.dateText}>{currentDate.format('MMMM YYYY')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextWeek}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysContainer}>
        <FlatList
          data={days}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = item === moment().format('YYYY-MM-DD');
            const hasSchedule = scheduledDays[item];
            return (
              <View style={styles.dayContainer}>
                <TouchableOpacity 
                  style={[
                    styles.dayButton, 
                    isSelected && styles.selectedDay,
                    hasSchedule && styles.hasSchedule,
                  ]}
                  onPress={() => handleDayPress(item)}
                >
                  <Text style={styles.dayText}>{moment(item).format('ddd')}</Text>
                  <Text style={styles.dateText}>{moment(item).format('DD')}</Text>
                </TouchableOpacity>
                {hasSchedule && (
                  <View style={styles.scheduleDot} />
                )}
              </View>
            );
          }}
        />
      </View>

      {selectedDay && (
        <View style={styles.scheduleDetails}>
          <Text style={styles.detailText}>Môn học: {selectedDay.subject}</Text>
          <Text style={styles.detailText}>Phòng học: {selectedDay.room}</Text>
          <Text style={styles.detailText}>Giờ học: {selectedDay.time}</Text>
          <Text style={styles.detailText}>Giáo viên: {selectedDay.teacher}</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={monthModalVisible}
        onRequestClose={() => setMonthModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {renderCalendar()}
          <Button title="Đóng" onPress={() => setMonthModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

export default LichHoc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(58, 131, 244, 0.4)',
    padding: 10,
  },
  Headers: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
  },
  daysContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 30,
    width: '100%',
    height: 100,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 5,
  },
  dayButton: {
    alignItems: 'center',
    padding: 5,
  },
  dayText: {
    fontSize: 16,
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  selectedDay: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'blue',
  },
  scheduleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginTop: 5,
  },
  scheduleDetails: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  detailText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  calendarDay: {
    width: '14%', // Mỗi ô chiếm khoảng 14% chiều rộng
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 2,
    elevation: 2, // Đổ bóng cho ô
  },
  hasSchedule: {
    backgroundColor: 'lightblue',
  },
  hasScheduleText: {
    fontWeight: 'bold',
    color: 'darkblue',
  },
});
