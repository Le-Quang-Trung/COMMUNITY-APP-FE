import { host } from './config';

export const getQuanLyByMaQL = async (maQL) => {
    try {
        const response = await fetch(`${host}/quanly/${maQL}`);

        if (!response.ok) {
            throw new Error("Lỗi: Không tìm thấy quản lý với maQL đã cho");
        }

        const quanlyData = await response.json();
        return quanlyData;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin quản lý:', error);
        throw error;
    }
};

export const createLopHocPhan = async (lopHocPhanData) => {
    try {
        const response = await fetch(`${host}/quanly/createLopHocPhan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lopHocPhanData), // Dữ liệu lớp học phần
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi tạo lớp học phần');
        }

        const result = await response.json();
        return result; // Trả về kết quả thành công

    } catch (error) {
        console.error('Error creating LopHocPhan:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
    }
};

export const addSinhVienToLopHocPhan = async (maLHP, maSinhViens) => {
    try {
        const response = await fetch(`${host}/quanly/addSinhVienToLopHocPhan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                maLHP, 
                maSinhViens
            }), // Tham số gửi lên API
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi thêm sinh viên vào lớp học phần');
        }

        const result = await response.json();
        return result; // Trả về kết quả thành công
    } catch (error) {
        console.error('Error adding SinhVien to LopHocPhan:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
    }
};

export const createLichHoc = async (data) => {
    try {
        const response = await fetch(`${host}/quanly/createLichHoc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Không thể tạo lịch học');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating LichHoc:', error.message);
        throw error;
    }
};

