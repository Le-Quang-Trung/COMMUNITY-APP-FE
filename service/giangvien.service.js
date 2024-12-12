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


export const  getLopHocPhan = async (maGV, nganh, hocKy) => {
    
    try {
        const response = await fetch(`${host}/giangvien/getLopHocPhan/${maGV}/${nganh}/${hocKy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Xử lý lỗi từ backend
            const error = await response.json();
            throw new Error(error.message || 'Có lỗi xảy ra khi lấy danh sách lớp học phần.');
        }

        // Trả về danh sách lớp học phần
        return await response.json();
    } catch (error) {
        console.error('Error fetching LopHocPhan:', error.message);
        throw error;
    }
}

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


export const taoThongBaoLopHP = async (data) => {
    try {
        const response = await fetch(`${host}/giangvien/thongBaoLopHP`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi tạo thông báo');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in taoThongBaoLopHP:', error);
        throw error;
    }
};

