import { host } from './config';

export const getSinhVienByMSSV = async (mssv) => {
    try {
        const response = await fetch(`${host}/sinhvien/${mssv}`);

        if (!response.ok) {
            throw new Error("Lỗi: Không tìm thấy sinh viên với MSSV đã cho");
        }

        const sinhvienData = await response.json();
        return sinhvienData;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sinh viên:', error);
        throw error;
    }
};

export const getSinhVienByPhuHuynh = async (mssv, hoTen, ngaySinh, soDienThoai) => {
    try {
        const response = await fetch( `${host}/sinhvien/getSinhVien/${mssv}/${hoTen}/${ngaySinh}/${soDienThoai}`);

        // Kiểm tra xem phản hồi có thành công không
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Chuyển đổi phản hồi thành JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching SinhVien:', error);
        throw error;
    }
};

export const addSinhVien = async (sinhVienData) => {
    try {
        const response = await fetch(`${host}/sinhvien/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sinhVienData),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Có lỗi xảy ra khi thêm sinh viên');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Lỗi trong addSinhVien:', error);
        throw error;
    }
};

export const updateSinhVien = async (mssv, updatedData) => {
    try {
        const response = await fetch(`${host}/sinhvien/mssv/${mssv}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật sinh viên');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Lỗi cập nhật sinh viên:', error.message);
        throw error;
    }
};

export const deleteSinhVien = async (id) => {
    try {
        const response = await fetch(`${host}/sinhvien/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi xóa sinh viên');
        }

        const result = await response.json();
        return result; // Trả về thông tin sinh viên đã bị xóa
    } catch (error) {
        console.error('Lỗi xóa sinh viên:', error.message);
        throw error;
    }
};

export const getAllSinhVien = async () => {
    try {
        const response = await fetch(`${host}/sinhvien/`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi lấy danh sách sinh viên');
        }

        const result = await response.json();
        return result; // Trả về danh sách sinh viên
    } catch (error) {
        console.error('Lỗi lấy danh sách sinh viên:', error.message);
        throw error;
    }
};


