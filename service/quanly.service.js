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