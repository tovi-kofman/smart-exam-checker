
import { UserType } from "../models/User";
import axios from "../Utils/axiosConfig"


function setAuthorizationBearer() {
    const token = localStorage.getItem("token")
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
}

setAuthorizationBearer()

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // if (error.response.status === 401) {
        //     return (window.location.href = "/authFotm");
        // }
        return Promise.reject(error);
    }
);
export default {
    updateUser: async (userId: Number, userData: Partial<UserType>) => {
        try {
        console.log(userId,userData);

            const response = await axios.put(`User/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Update failed";
        }
    },

    getUserById: async (userId: Number  ) => { 
        try {
            const response = await axios.get(`User/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Get User failed";
        }
    }
};


