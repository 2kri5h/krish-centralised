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
        const response = await axios.post(`${BASE_URL}?action=register-verify-email`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Something went wrong" };
    }
};

export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}password/?action=reset-password-email`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Something went wrong" };
    }
};