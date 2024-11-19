import { host } from './config';

export async function getThongBaoByMSSV(mssv) {
    try {
        const response = await fetch(`${host}/thongbaosv/getThongBaoSV/${mssv}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch ThongBao');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ThongBao by MSSV:', error);
        throw error;
    }
}
