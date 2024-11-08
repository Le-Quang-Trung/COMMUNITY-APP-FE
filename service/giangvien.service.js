import { host } from './config';


export const getGiangVienByMaGV = async (maGV) => {
    try {
        const response = await fetch(`${host}/giangvien/${maGV}`);

        if (!response.ok) {
            throw new Error("Lỗi: Không tìm thấy giảng viên với maGV đã cho");
        }

        const sinhvienData = await response.json();
        return sinhvienData;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin giảng viên:', error);
        throw error;
    }
};
