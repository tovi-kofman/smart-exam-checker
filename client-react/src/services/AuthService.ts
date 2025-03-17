import instance from "../Utils/axiosConfig";
import { UserType } from "../models/User";
import axios from "axios";

function saveAccessToken(authResult: { token: string }) {
    localStorage.setItem("token", authResult.token);
    setAuthorizationBearer();
}

function setAuthorizationBearer() {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
}

setAuthorizationBearer()//זה גורם למשתמש להשאר גם ברפרוש??

axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.status === 401) {
        return (window.location.href = "/login");
      }
      return Promise.reject(error);
    }
  );


  
export default {
    
    logout:()=>{
      localStorage.setItem("token", "");
    },
  
    register: async (userData:Partial<UserType>) => {
      //console.log({UserName: userData.firstName, Password: userData.password})
      const res = await instance.post("/auth/register",{ UserName: userData.firstName, Password: userData.password });
      saveAccessToken(res.data);
      return res.data;
    },
  
    login: async (userData:Partial<UserType>) => {
      //console.log({UserName: userData.firstName, Password: userData.password})
      const res = await instance.post("/auth/login", { UserName: userData.firstName, Password: userData.password});
      saveAccessToken(res.data);
      return res.data;
    },  
  };
  