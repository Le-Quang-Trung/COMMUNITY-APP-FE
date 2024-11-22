import { host } from './config';


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


export const getTenLopHocPhan = async (mssv, maMonHoc) => {
    try {
        const response = await fetch(`${host}/monhoc/getTenLopHocPhan/${mssv}/${maMonHoc}`);
        
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

export const getMonHocById = async (maMonHoc) => {
  try {
      // Gửi yêu cầu GET tới API với maMonHoc
      const response = await fetch(`${host}/monhoc/getMonHoc/${maMonHoc}`);

      if (!response.ok) {
          throw new Error('Không thể lấy thông tin môn học');
      }

      // Lấy dữ liệu từ phản hồi
      const monHoc = await response.json();
      return monHoc; // Trả về dữ liệu môn học
  } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      throw error; 
  }
};