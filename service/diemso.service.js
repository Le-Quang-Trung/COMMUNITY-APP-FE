import { host } from './config';

export const getDiemSo = async (mssv, maMonHoc, maLopHoc) => {
    try {
        const response = await fetch(`${host}/diemso/getDiem/${mssv}/${maMonHoc}/${maLopHoc}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Không thể lấy điểm số');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching diem so:', error);
        throw new Error(error.message || 'Không thể lấy điểm số');
    }
};

export async function taoDiem(diemSoData) {
    try {
        const response = await fetch(`${host}/diemso/taoDiem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(diemSoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi tạo điểm số');
        }

        return await response.json(); // Dữ liệu phản hồi từ backend
    } catch (error) {
        console.error('Lỗi trong service taoDiem:', error.message);
        throw error;
    }
}


export async function capNhatDiem(diemSoData) {
    try {
        const response = await fetch(`${host}/diemso/capNhatDiem`, {
            method: 'POST', // Hoặc 'PUT' nếu API sử dụng phương thức PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(diemSoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Lỗi khi cập nhật điểm số');
        }

        return await response.json(); // Dữ liệu phản hồi từ backend
    } catch (error) {
        console.error('Lỗi trong service capNhatDiem:', error.message);
        throw error;
    }
}