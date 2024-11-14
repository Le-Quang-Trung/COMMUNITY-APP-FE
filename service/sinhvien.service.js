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

