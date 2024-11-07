export const host = "http://192.168.1.15:8080"

export const loginSinhVien = {
    loginSV: async (tenTaiKhoan, matKhau) => {
        try {
            const response = await fetch(`${host}/taikhoan/loginsv`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ tenTaiKhoan, matKhau }) 
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Login failed.'); 
            }

            const data = await response.json(); 
            return data; 
        } catch (error) {
            console.error('Login error:', error.message);
            throw new Error('Login failed. Please try again later.'); 
        }
    }
};

export const loginGiangVien = {
    loginGV: async (tenTaiKhoan, matKhau) => {
        try {
            const response = await fetch(`${host}/taikhoan/logingv`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ tenTaiKhoan, matKhau }) 
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Login failed.'); 
            }

            const data = await response.json(); 
            return data; 
        } catch (error) {
            console.error('Login error:', error.message);
            throw new Error('Login failed. Please try again later.'); 
        }
    }
};

export const logout = async (tenTaiKhoan) => {
    try {
        const response = await fetch(`${host}/taikhoan/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tenTaiKhoan })
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};


