import { host } from './config';

export const getGiangVienByMaGV = async (maGV) => {
    try {
        const response = await fetch(`${host}/giangvien/${maGV}`);

        if (!response.ok) {
            throw new Error("Lỗi: Không tìm thấy giảng viên với maGV đã cho");
        }

        const giangvienData = await response.json();
        return giangvienData;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin giảng viên:', error);
        throw error;
    }
};


export async function danhGiaHocTap(payload) {
    try {
        const response = await fetch(`${host}/giangvien/danhGiaHocTap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi gửi yêu cầu');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi trong dịch vụ danhGiaHocTap:', error);
        throw error;
    }
}
