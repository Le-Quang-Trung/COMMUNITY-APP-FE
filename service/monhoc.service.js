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


export const getMaLopHocPhan = async (mssv, maMonHoc) => {
    try {
        const response = await fetch(`${host}/monhoc/getMaLopHocPhan/${mssv}/${maMonHoc}`);
        
        // Kiểm tra nếu không thành công
        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu mã lớp học phần');
        }
        
        const data = await response.json();  // Chuyển đổi dữ liệu trả về sang JSON
        return data;  // Trả về danh sách maLHP từ backend
    } catch (error) {
        console.error("Error fetching maLHP:", error);
        throw new Error(error.message || 'Không thể lấy mã lớp học phần');
    }
};

