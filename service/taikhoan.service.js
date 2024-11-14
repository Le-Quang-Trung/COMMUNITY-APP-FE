import { host } from './config';

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

export const changePassword = async (id, lastPassword, newPassword) => {
    try {
        const response = await fetch(`${host}/taikhoan/changePassword/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastpassword: lastPassword,
                newpassword: newPassword,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to change password');
        }

        const updatedAccount = await response.json();
        return updatedAccount;
    } catch (error) {
        console.error('Error changing password:', error.message);
        throw error;
    }
};


