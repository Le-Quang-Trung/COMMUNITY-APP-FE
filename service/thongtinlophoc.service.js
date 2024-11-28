import { host } from './config';

export const getTTLopHocPhan = async (maGV) => {
    try {
        const response = await fetch(`${host}/thongtinlophoc/getTTLopHocPhan/${maGV}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching TTLopHocPhan:', error);
        throw error;
    }
};

export const getDanhSachSinhVien = async (maLHP) => {
    try {
        const response = await fetch(`${host}/thongtinlophoc/getDanhSachSinhVien/${maLHP}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch student list');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching student list:', error);
        throw error;
    }
};
