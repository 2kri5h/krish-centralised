import axios from "axios";

const BASE_URL = "https://centralised.sarc-iitb.org/api/auth/";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}?action=login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Something went wrong" };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}?action=register`, userData);
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

export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}password/?action=reset-password-email`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Something went wrong" };
    }
};