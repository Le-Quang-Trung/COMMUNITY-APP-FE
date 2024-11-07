export const host = "http://192.168.1.15:8080"


export const getMonHocByHocKy = async (mssv, hocky) => {
  try {
 
    const response = await fetch(`${host}/monhoc/getMonHoc/${mssv}/${hocky}`);
    
    if (!response.ok) {
      throw new Error('Lỗi khi lấy dữ liệu môn học');
    }

    const data = await response.json(); 
    return data;  
  } catch (error) {
    console.error('Error fetching MonHoc:', error);
    throw error;  
  }
};

