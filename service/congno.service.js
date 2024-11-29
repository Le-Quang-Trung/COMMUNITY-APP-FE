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

export const getCongNo = async (mssv, nganh, hocKy) => {
    try {
        const url = `${host}/congno/getCongNo/${mssv}/${nganh}/${hocKy}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch công nợ");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching công nợ:", error);
        throw error;
    }
};

export const getKhauTruByMSSV = async (MSSV) => {
    try {
        const response = await fetch(`${host}/congno/getKhauTru/${MSSV}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching KhauTru: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching KhauTru:', error);
        throw error; // Để xử lý lỗi ở component sử dụng
    }
};

export const thanhToanCongNo = async (MSSV, nganh, hocKy, bankCode = 'NCB', language = 'vn') => {
    try {
        const url = `${host}/congno/thanhToan/${MSSV}/${nganh}/${hocKy}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bankCode,
                language,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.vnpUrl; // URL thanh toán từ backend
    } catch (error) {
        console.error('Error in thanhToanCongNo:', error);
        throw error;
    }
};
