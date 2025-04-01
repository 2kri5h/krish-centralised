import axios from "axios";

const BASE_URL = "https://centralised.sarc-iitb.org/api/auth/";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/api/auth/', {
            email,
            password,
            action: 'login'
        });
        
        console.log('Login response from API:', response.data);
        
        return {
            token: response.data.token,
            user: response.data.user || { email }
        };
    } catch (error) {
        console.error('Login error from API:', error.response?.data || error);
        throw error.response?.data || error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}?action=register-verify-email`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Something went wrong" };
    }
};

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}profile/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Something went wrong" };
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};

export const forgotPassword = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}password/?action=reset-password-email`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: 'Something went wrong' };
    }
};

export const resetPassword = async (uid, token, data) => {
    try {
        const response = await axios.post(`${BASE_URL}password/${uid}/${token}/`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: 'Something went wrong' };
    }
};

export const verifyEmail = async (uid, token) => {
    try {
        const response = await axios.get(`${BASE_URL}register-verify/${uid}/${token}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: 'Something went wrong' };
    }
};