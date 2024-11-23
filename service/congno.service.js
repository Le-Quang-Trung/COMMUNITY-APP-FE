import { host } from './config';

// Hàm lấy danh sách Phiếu Thu theo MSSV
export const getPhieuThuByMSSV = async (MSSV) => {
    try {
        const response = await fetch(`${host}/congno/getPhieuThu/${MSSV}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch PhieuThu');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching PhieuThu:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};
