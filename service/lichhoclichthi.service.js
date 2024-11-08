import { host } from './config';

export const getLichHocByMSSV = async (mssv) => {
    try {
        const response = await fetch(`${host}/lichhoc/getLichHoc/${mssv}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching schedule:', error.message);
        throw error;
    }
}
