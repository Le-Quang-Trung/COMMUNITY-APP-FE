export const host = "http://192.168.1.15:8080"

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
