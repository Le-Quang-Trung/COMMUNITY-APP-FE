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

