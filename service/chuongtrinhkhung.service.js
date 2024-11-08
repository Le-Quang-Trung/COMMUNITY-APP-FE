import { host } from './config';

export const getChuongTrinhKhung = async (MSSV, hocky) => {
    try {
        const response = await fetch(`${host}/chuongtrinhkhung/getChuongTrinhKhung/${MSSV}/${hocky}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch ChuongTrinhKhung');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getChuongTrinhKhung service:', error);
        throw error;
    }
};
